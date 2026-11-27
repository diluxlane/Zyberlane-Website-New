import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "dist");
const read = p => fs.readFileSync(path.join(root, p), "utf8");
function scan(dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e => {
    const full=path.join(dir,e.name);
    return e.isDirectory() ? scan(full) : (e.name.endsWith(".html") ? [full] : []);
  });
}
const files=scan(root).filter(f=>!f.endsWith(path.join("brand-kit","brand-book.html"))).sort();
function svg(html, cssClass) {
  return html.match(new RegExp('<svg class="' + cssClass + '"[\\s\\S]*?<\\/svg>'))?.[0];
}
function pathData(vector) {
  return [...(vector||"").matchAll(/<path transform="translate\(\d+ 0\)" d="([^"]+)"/g)].map(x=>x[1]);
}
const originalMark=read("assets/zyberlane/logo-white.svg");
const sourceGlyphs=pathData(read("assets/brand/zyberlane-wordmark.svg").replace(/data-glyph="[^"]+" /g,""));
test("brand audit covers every 43 marketing HTML page",()=>assert.equal(files.length,43));
test("standalone wordmark is vector, original and independent of loaded fonts",()=>{
  const word=read("assets/brand/zyberlane-wordmark.svg");
  const lock=read("assets/brand/zyberlane-lockup.svg");
  assert.equal((word.match(/data-glyph="/g)||[]).length,9);
  assert.match(word, /ZYBERLANE/);
  assert.doesNotMatch(word, /<text[^>]*>ZYBERLANE/);
  assert.match(lock,/TECHNOLOGY &amp; TRANSFORMATION COMPANY/);
  assert.match(originalMark, /viewBox="0 0 100 100"/);
});
test("header, intro, footer, identity and tagline agree on every route",()=>{
  const refVector=pathData(svg(read("index.html"),"hdr-brand__word"));
  assert.equal(refVector.length,9);
  for(const file of files){
    const page=path.relative(root,file);
    const html=fs.readFileSync(file,"utf8");
    assert.match(html, /<meta name="application-name" content="Zyberlane \| Technology &amp; Transformation Company">/,page);
    assert.match(html, /<span class="zl-header-type">/,page);
    assert.match(html, /class="zl-intro-word"/,page);
    assert.match(html, /class="zl-intro-company">TECHNOLOGY &amp; TRANSFORMATION COMPANY/,page);
    assert.match(html, /class="zl-footer-mark"/,page);
    assert.match(html, /TECHNOLOGY &amp; TRANSFORMATION COMPANY/,page);
    assert.match(html, /class="ft-bar__motto">BUILT BEYOND BOUNDARIES\./,page);
    assert.match(html, /class="ft-bar__line">Built Beyond Boundaries\./,page);
    assert.doesNotMatch(html, /BUILT DIFFERENT\. BUILT FOR YOU\./,page);
    assert.doesNotMatch(html, /Digital experiences, built around you\./,page);
    assert.doesNotMatch(html, /Creative Technology Company/i,page);
    assert.doesNotMatch(html, /Creative(?:\s|&nbsp;|\u00a0)+Studios/i,page);
    assert.doesNotMatch(html, /textlength="1474"/i,page);
    const intro=svg(html,"zl-intro-word");
    const footer=svg(html,html.includes('class="ft-bar__brand"')?"ft-bar__word":"zl-bigmark-word");
    assert.ok(intro && footer,'Missing intro/footer vector in '+page);
    assert.deepEqual(pathData(svg(html,"hdr-brand__word")),refVector,page+": header paths");
    assert.deepEqual(pathData(intro),refVector,page+": intro paths");
    assert.deepEqual(pathData(footer),refVector,page+": footer paths");
    if(page.startsWith("projects/"))assert.match(html,/data-cc-page="project"/,page);
  }
});
test("shared stylesheet has responsive lockups and accessible motion override",()=>{
  const css=read("styles.css");
  assert.match(css,/ZYBERLANE UNIFIED BRAND IDENTITY/);
  assert.match(css,/\.hdr-brand \.zl-header-type/);
  assert.match(css,/\.ft__bigmark \.zl-bigmark-type/);
  assert.match(css,/@media \(prefers-reduced-motion:reduce\)/);
  assert.match(css,/--bg:#000/);
});
