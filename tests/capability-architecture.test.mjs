import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const caps=JSON.parse(read('brand/capabilities.json')).capabilities;
const home=read('dist/index.html'), detail=read('dist/what-we-create/index.html'), kb=JSON.parse(read('dist/assets/chat-kb.json'));
test('twelve categories with honest availability',()=>{assert.equal(caps.length,12);assert.equal(new Set(caps.map(c=>c.id)).size,12);assert.deepEqual(['current','innovation','future'].map(g=>caps.filter(c=>c.group===g).length),[6,2,4]);for(const c of caps){assert.ok(home.includes('data-capability="'+c.id+'"'),c.id);assert.ok(detail.includes('data-capability="'+c.id+'"'),c.id);assert.equal(kb.services.find(s=>s.id===c.routeAnchor).status,c.status);if(c.group==='future'){assert.equal(c.status,'future');assert.equal(c.commercialIndexingEligible,false);assert.ok(!read('dist/contact/index.html').includes('value="'+c.name.replaceAll('&','&amp;')+'"'));}}});
test('preview restrictions and demonstration sitemap exclusions',()=>{assert.match(read('dist/robots.txt'),/Disallow: \/(\s|$)/);assert.match(home,/noindex, nofollow, noarchive/);assert.match(detail,/noindex, nofollow, noarchive/);assert.match(read('vercel.json'),/noindex, nofollow, noarchive/);assert.equal((read('dist/sitemap.xml').match(/\/projects\//g)||[]).length,2);assert.doesNotMatch(home,/"@type"\s*:\s*"Service"/);assert.doesNotMatch(detail,/"@type"\s*:\s*"Service"/)});
