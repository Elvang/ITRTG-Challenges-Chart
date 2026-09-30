// =====================================================================
//  Parser for the in-game "statistics export" text.
//  Pure functions, no DOM. Works in the browser (window.ITRTGParser) and in Node (module.exports).
//  If a game update renames something, fix it here or in the `export` field in challenges.js.
// =====================================================================
(function (root) {
  // --- number words used by the "word" number format -----------------
  const SMALL = { thousand: 3, million: 6, billion: 9, trillion: 12, quadrillion: 15, quintillion: 18,
    sextillion: 21, septillion: 24, octillion: 27, nonillion: 30 };
  const UNITS = [["", 0], ["un", 1], ["duo", 2], ["tre", 3], ["tres", 3], ["quattuor", 4], ["quin", 5], ["quinqua", 5],
    ["sex", 6], ["ses", 6], ["se", 6], ["septen", 7], ["septem", 7], ["octo", 8], ["novem", 9], ["noven", 9]];
  const TENS = [["dec", 1], ["vigint", 2], ["trigint", 3], ["quadragint", 4], ["quinquagint", 5], ["sexagint", 6],
    ["septuagint", 7], ["octogint", 8], ["nonagint", 9]];
  const WORDS = Object.assign({}, SMALL);
  for (const [t, tv] of TENS) for (const [u, uv] of UNITS) WORDS[u + t + "illion"] = 3 * (10 * tv + uv) + 3;
  WORDS["centillion"] = 303;

  // "1,234" "4.04979 E+8" "4.04979E+8" "15.920 billion" "129.947 trestrigintillion" "∞" "53.23%"
  function parseNumber(str) {
    if (str == null) return null;
    const s = String(str).trim();
    if (/^∞|infinity/i.test(s)) return Infinity;
    const m = s.match(/^(-?[\d,]*\.?\d+)\s*(?:[eE]\s*([+-]?\d+))?\s*([A-Za-z]+)?/);
    if (!m) return null;
    let v = parseFloat(m[1].replace(/,/g, ""));
    if (m[2]) v *= Math.pow(10, parseInt(m[2], 10));
    if (m[3]) {
      const w = m[3].toLowerCase();
      if (w in WORDS) v *= Math.pow(10, WORDS[w]);
      else if (w === "k") v *= 1e3;
      else if (w === "m") v *= 1e6;
      else if (w === "b") v *= 1e9;
      else if (w === "t") v *= 1e12;
      // other trailing words (hours, ...) are ignored
    }
    return v;
  }

  // number followed by "% from god power" inside a speed line
  const NUM = String.raw`(-?[\d,]*\.?\d+(?:\s*[eE]\s*[+-]?\d+)?(?:\s+[A-Za-z]+illion)?)`;

  // --- stats used by unlock checks --------------------------------------
  // Each: [key, regex on the whole text, how to read it]
  const STAT_PARSERS = [
    ["maxClones", /^Max Shadow Clones:\s*(.+)$/m],
    ["cp", /^Crystal Power:\s*(.+)$/m],
    ["cc", /^Creation Count:\s*(.+)$/m],
    ["lightClones", /^Light Clones:\s*(.+)$/m],
    ["pets", /^Unlocked Pets:\s*(.+)$/m],
    ["petGrowth", /^Total Pet growth:\s*(.+)$/m],
    ["chp", /^Challenge Points:\s*(.+)$/m],
    ["hmChp", /^Hard mode Challenge points:\s*(.+)$/mi],
    ["bsTotal", /^Building Speed:\s*([^,(]+?)\s*%/m],
    ["csGP", new RegExp("^Creating Speed:.*?" + NUM + "\\s*%\\s*from god power", "m")],
    ["bsGP", new RegExp("^Building Speed:.*?" + NUM + "\\s*%\\s*from god power", "m")],
    ["progress", /^Overall Game Progress:\s*([\d.]+)\s*%/m],
  ];

  function norm(s) {
    return s.toLowerCase().replace(/ch\.s\b/g, "challenges").replace(/challenges?\b/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  }

  function parseExport(text, challenges) {
    const res = { player: null, platform: null, stats: {}, done: {}, cap: {}, scores: {}, unknown: [], found: 0 };
    if (!text || !/statistics export/i.test(text)) {
      res.error = "This doesn't look like an ITRTG statistics export. It should start with \"Idling to Rule the Gods - statistics export\".";
    }
    const head = text.match(/statistics export for (.+?),\s*(.+?) version/i);
    if (head) { res.player = head[1].trim(); res.platform = head[2].trim(); }

    for (const [key, re] of STAT_PARSERS) {
      const m = text.match(re);
      if (m) { const v = parseNumber(m[1]); if (v != null && !isNaN(v)) res.stats[key] = v; }
    }
    // strongest god: "175 (P. Baal v 147)"
    const g = text.match(/^Strongest God defeated:\s*([\d,]+)(?:\s*\(P\.?\s*Baal v\s*([\d,]+)\))?/mi);
    if (g) { res.stats.strongestGod = parseNumber(g[1]); res.stats.pbaal = g[2] ? parseNumber(g[2]) : 0; }
    // ITRTG v4 fastest time
    const v4 = text.match(/^Fastest time to defeat ITRTGV4:\s*(\d+):(\d+):(\d+)/mi);
    if (v4) { res.stats.v4Defeated = 1; res.stats.v4Hours = +v4[1] + v4[2] / 60 + v4[3] / 3600; }
    // RTI permanent levels (lowest element)
    const perms = [...text.matchAll(/^.+? perm level:\s*(.+)$/gm)].map(m => parseNumber(m[1])).filter(v => v != null);
    if (perms.length) res.stats.rtiPermMin = Math.min(...perms);

    // challenge list
    const byExport = {};
    for (const c of challenges) if (c.export) byExport[norm(c.export)] = c.code;
    const start = text.search(/^Challenges\s*$/m);
    const body = start >= 0 ? text.slice(start) : text;
    for (const line of body.split(/\r?\n/)) {
      let m = line.match(/^(.+?):\s*([\d.,]+(?:\s*[eE][+-]?\d+)?(?:\s+[A-Za-z]+)?)\s*\/\s*([\d.,]+(?:\s*[eE][+-]?\d+)?(?:\s+[A-Za-z]+)?)\s*$/);
      if (m) {
        const code = byExport[norm(m[1])];
        if (code) { res.done[code] = parseNumber(m[2]); res.cap[code] = parseNumber(m[3]); res.found++; }
        else res.unknown.push(line.trim());
        continue;
      }
      m = line.match(/^((?:Day .+? Challenge)|(?:Road to Infinity))\s+(?:highest|most|best)\b.*?:\s*(.+)$/i);
      if (m) {
        const code = byExport[norm(m[1])];
        if (code) { res.scores[code] = parseNumber(m[2]); res.found++; }
        else res.unknown.push(line.trim());
      }
    }
    if (!res.error && res.found === 0) res.error = "No challenge lines were found. Paste the whole export, including the \"Challenges\" section at the end.";
    return res;
  }

  // Evaluate one unlock condition: true / false / null (can't tell)
  function evalCond(cond, imp, base) {
    if (!imp) return null;
    if (cond.any) {
      const r = cond.any.map(c => evalCond(c, imp, base));
      return r.some(x => x === true) ? true : r.every(x => x === false) ? false : null;
    }
    if (cond.ch) { const d = imp.done[cond.ch]; return d == null ? null : d >= cond.n; }
    if (cond.score) { const s = imp.scores[cond.score]; return s == null ? false : s >= cond.min; }
    if (cond.stat) {
      const v = imp.stats[cond.stat];
      if (v == null) return cond.stat === "v4Defeated" ? false : null;
      if (cond.max != null) return v < cond.max;
      return v >= cond.min;
    }
    return null; // note
  }

  // status: done | progress | ready | locked | maybe | score | count | none
  function statusOf(c, imp) {
    if (!imp) return { s: "none" };
    const d = imp.done[c.code], cap = imp.cap[c.code];
    if (c.type === "D") {
      const sc = imp.scores[c.code], sCap = c.scoreCap ? c.scoreCap.value : null;
      if (sc != null && sCap != null && sc >= sCap) return { s: "done", v: sc, cap: sCap, score: true };
      if (sc != null) return { s: "score", v: sc, cap: sCap };
    } else if (d != null && cap != null) {
      if (cap >= 9999) return { s: d > 0 ? "count" : (unlockState(c, imp) === false ? "locked" : "ready"), v: d };
      if (d >= cap) return { s: "done", v: d, cap };
      if (d > 0) return { s: "progress", v: d, cap };
    }
    const u = unlockState(c, imp);
    return { s: u === true ? "ready" : u === false ? "locked" : "maybe", v: d, cap };
  }
  function unlockState(c, imp) {
    const r = (c.check || []).map(k => evalCond(k, imp));
    if (r.some(x => x === false)) return false;
    if (r.every(x => x === true)) return true;
    return null;
  }

  const api = { parseNumber, parseExport, evalCond, statusOf, unlockState, STAT_PARSERS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ITRTGParser = api;
})(typeof window !== "undefined" ? window : globalThis);
