import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(root,"media-replacement-manifest.json"),"utf8"));
const rows = manifest.filter(r=>r.status==="restored original editorial image — owner permission attested");
const html = fs.readFileSync(path.join(root,"dist/index.html"),"utf8");
test("all 26 original editorial images match source Git blob hashes",()=>{
  assert.equal(rows.length,26);
  for(const r of rows){
    const b=fs.readFileSync(path.join(root,"dist",r.file));
    assert.equal(b.length,r.bytes,r.file);
    assert.equal(b.toString("ascii",0,4),"RIFF",r.file);
    assert.equal(b.toString("ascii",8,12),"WEBP",r.file);
    assert.equal(createHash("sha1").update("blob "+b.length).update(Buffer.from([0])).update(b).digest("hex"),r.git_blob_sha,r.file);
    assert.equal(r.source_commit,"b073ac6492efae12c131b4a8fa1be786bc80af81");
    assert.ok(html.includes("./"+r.file),r.file+" is missing from homepage");
  }
});
test("restored homepage media no longer uses placeholder alt labels",()=>{
 const tags=html.match(/<img\b[^>]*(?:agency-meeting|believe-|idea-hand|idea-laptop)[^>]*>/g)||[];
 assert.equal(tags.length,11);
 for(const tag of tags)assert.doesNotMatch(tag,/approved media pending/);
});
