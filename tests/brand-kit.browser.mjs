import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import {spawn,execFileSync} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
const root=path.resolve('dist'), out=path.resolve('qa-brand-kit');
fs.mkdirSync(out,{recursive:true});
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.json':'application/json','.pdf':'application/pdf','.zip':'application/zip','.webp':'image/webp','.jpg':'image/jpeg','.mp4':'video/mp4'};
const server=http.createServer((req,res)=>{try{const u=new URL(req.url,'http://localhost'),f=path.resolve(root,'.'+decodeURIComponent(u.pathname));if(f!==root&&!f.startsWith(root+path.sep))throw Error('outside root');const file=fs.statSync(f).isDirectory()?path.join(f,'index.html'):f;res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);}catch{res.writeHead(404);res.end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url='http://127.0.0.1:'+server.address().port+'/brand-kit/';
const profile=fs.mkdtempSync(path.join(os.tmpdir(),'zk-browser-'));
const chrome=process.env.CHROME_BIN||'google-chrome';
const proc=spawn(chrome,['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--disable-background-networking','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore'});
let ws,seq=0;const pending=new Map(),errors=[];
try {
 let port;
 for(let i=0;i<80;i++){try{port=Number(fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0]);if(port)break;}catch{}await delay(100);}
 assert.ok(port,'Chrome debugging port');
 const tabs=await (await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const tab=tabs.find(t=>t.type==='page');assert.ok(tab);
 ws=new WebSocket(tab.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
 ws.addEventListener('message',ev=>{const m=JSON.parse(ev.data);if(m.id&&pending.has(m.id)){const {resolve,reject}=pending.get(m.id);pending.delete(m.id);m.error?reject(Error(JSON.stringify(m.error))):resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text+' '+(m.params.exceptionDetails.exception?.description||''));});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.text);return r.result.value;};
 await send('Page.enable');await send('Runtime.enable');
 const viewports=[[320,720],[360,800],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080],[844,390]];
 const report=[];
 for(const [width,height] of viewports){
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await send('Page.navigate',{url});
  for(let i=0;i<50;i++){if(await evaluate("document.readyState==='complete' && !!document.querySelector('.bk-main')"))break;await delay(100);}
  await evaluate("document.fonts.ready");
  await evaluate("(async()=>{for(const e of document.querySelectorAll('.bk-main section')){e.scrollIntoView();await new Promise(r=>setTimeout(r,70))}scrollTo(0,0);await new Promise(r=>setTimeout(r,250));return true})()");
  const state=await evaluate("(()=>{const m=document.querySelector('.bk-main'),b=m.getBoundingClientRect();return {width:innerWidth,doc:document.documentElement.scrollWidth,mainWidth:m.clientWidth,mainScroll:m.scrollWidth,sections:[...m.querySelectorAll('section[id]')].length,broken:[...m.querySelectorAll('img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute('src')),overflow:[...m.querySelectorAll('a,button,h1,h2,h3,.bk-art,.bk-swatch,.bk-product')].map(e=>({name:e.textContent.trim().slice(0,55),r:e.getBoundingClientRect()})).filter(e=>e.r.width>0&&(e.r.left<b.left-2||e.r.right>b.right+2)).map(e=>e.name),smallControls:[...m.querySelectorAll('a.bk-button,a.bk-download,button')].filter(e=>e.getBoundingClientRect().height<42).length}})()");
  assert.equal(state.sections,9,width+' sections');assert.equal(state.broken.length,0,JSON.stringify(state.broken));assert.equal(state.overflow.length,0,width+' overflow '+JSON.stringify(state.overflow));assert.ok(state.doc<=width+2,width+' document width '+state.doc);assert.ok(state.mainScroll<=state.mainWidth+2,width+' main overflow');assert.equal(state.smallControls,0,width+' small controls');
  const reduced=await evaluate("(()=>{const b=document.querySelector('[data-bk-replay]');b.click();b.focus();return {status:document.querySelector('[data-bk-motion-status]').textContent,focus:document.activeElement===b,animation:getComputedStyle(document.querySelector('.bk-motion .bk-piece')).animationName}})()");
  assert.match(reduced.status,/Reduced motion/);assert.equal(reduced.focus,true);assert.equal(reduced.animation,'none');
  await evaluate("scrollTo(0,0)");
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(out,'viewport-'+width+'x'+height+'.png'),Buffer.from(shot.data,'base64'));
  report.push({width,height,...state,reducedMotion:true});
  console.log('PASS viewport '+width+'x'+height+' | '+JSON.stringify(state));
 }
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 await send('Page.navigate',{url});
 for(let i=0;i<50;i++){if(await evaluate("document.readyState==='complete' && !!document.querySelector('.bk-main')"))break;await delay(100);}
 const motion=await evaluate("(()=>{document.querySelector('[data-bk-replay]').click();return {playing:document.querySelector('.bk-motion').classList.contains('is-playing'),animation:getComputedStyle(document.querySelector('.bk-motion .bk-piece')).animationName}})()");assert.equal(motion.playing,true);assert.equal(motion.animation,'bk-assemble');
 const downloads=await evaluate("[...document.querySelectorAll('.bk-main a[download]')].map(a=>a.href)");
 for(const link of new Set(downloads)){const r=await fetch(link);assert.equal(r.status,200,link);assert.ok((await r.arrayBuffer()).byteLength>0,link);}
 assert.equal(errors.length,0,errors.join('\n'));
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({viewports:report,motion,downloadCount:new Set(downloads).size,errors},null,2));
 console.log('PASS motion, '+new Set(downloads).size+' downloads and zero uncaught exceptions');
}finally{ws?.close();proc.kill();server.close();await delay(150);try{fs.rmSync(profile,{recursive:true,force:true});}catch{}}
