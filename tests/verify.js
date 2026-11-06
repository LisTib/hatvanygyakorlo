const fs = require('fs');
const html = fs.readFileSync(require('path').join(__dirname, '..', 'index.html'), 'utf8');
const eng = html.split('// ENGINE START')[1].split('// ENGINE END')[0];
const api = new Function(eng + '; return {TOPICS, makeQuestion};')();
const num = b => typeof b === 'number' ? b : (b.charCodeAt(0) % 5) + 2; // betű helyett számérték
function collect(parts, out) { for (const p of parts) { if (typeof p === 'string') continue; if (p.frac) { collect(p.frac[0], out); collect(p.frac[1], out); } else out.push(p.a); } return out; }
let bad = 0, count = 0;
const close = (x, y) => Math.abs(x - y) <= 1e-9 * Math.max(1, Math.abs(y));
for (const t of api.TOPICS) for (const L of [1, 2, 3]) for (let i = 0; i < 3000; i++) {
  const q = api.makeQuestion(t.id, L, ''); count++;
  const m = q.meta, ans = collect(q.parts, []);
  let ok = true;
  if (m.kind === 'mul') ok = close(m.ex.reduce((p, e) => p * 2 ** e, 1), 2 ** ans[0]);
  else if (m.kind === 'div') { const [a, b, c] = m.ex; const v = c === undefined ? 2 ** a / 2 ** b : 2 ** a * 2 ** b / 2 ** c; ok = close(v, 2 ** ans[0]); }
  else if (m.kind === 'prod') { const A = 2, B = 3; ok = close((A ** m.p * B ** m.q) ** m.n, A ** ans[0] * B ** ans[1]); }
  else if (m.kind === 'quot') { const A = 2, B = 3; ok = close((A ** m.p / B ** m.q) ** m.n, A ** ans[0] / B ** ans[1]); }
  else if (m.kind === 'pow') { const [a, n, k, v] = m.ex; let val;
    if (v === 'nest') val = ((2 ** a) ** n) ** k; else if (v === 'mix') val = (2 ** a) ** n * 2 ** k; else val = (2 ** a) ** n;
    ok = close(val, 2 ** ans[0]); }
  if (!ok || ans.some(x => !Number.isInteger(x))) { bad++; if (bad < 5) console.log('HIBA', t.id, L, q.key, ans, m); }
}
console.log('ellenőrzött feladat:', count, 'hibás:', bad);
