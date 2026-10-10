// =====================================================================
//  Parser for the in-game "statistics export" text.
//  Pure functions, no DOM. Works in the browser (window.ITRTGParser) and in Node (module.exports).
//  If a game update renames something, fix it here or in the `export` field in challenges.js.
// =====================================================================
(function (root) {
  // --- number formats ----------------------------------------------------
  // The export follows the in-game number format setting. Below a million every format prints plain
  // numbers with thousands commas ("644,492"). From a million up:
  //   Suffix       "413.112 million"     word names, 3 digits per name
  //   Scientific   "4.13112 E+8"
  //   Engineering  "413.112 E+6"         exponent is a multiple of 3
  //   Roman        "4.131 VIII"          scientific with the exponent as a Roman numeral
  //   Fun          "413.112 Weakest"     engineering with a name per exponent (some names are two words)
  // Name lists as the game defines them for its number display (checked 2026-10-06). Item i is 10^(6 + 3i).
  // Some of the game's names have stray trailing spaces; they're trimmed here.
  const NUMBER_NAMES = [
    "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion",
    "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quattuordecillion", "quindecillion",
    "sexdecillion", "septendecillion", "octodecillion", "novemdecillion", "vigintillion", "unvigintillion",
    "duovigintillion", "trevigintillion", "quattuorvigintillion", "quinvigintillion", "sexvigintillion",
    "septenvigintillion", "octovigintillion", "novemvigintillion", "trigintillion", "untrigintillion",
    "duotrigintillion", "trestrigintillion", "quattuortrigintillion", "quinquatrigintillion", "sextrigintillion",
    "septentrigintillion", "octotrigintillion", "noventrigintillion", "quadragintillion", "unquadragintillion",
    "duoquadragintillion", "trequadragintillion", "quattuorquadragintillion", "quinquadragintillion",
    "sexquadragintillion", "septquadragintillion", "octoquadragintillion", "novemquadragintillion",
    "quinquagintillion", "unquinquagintillion", "duoquinquagintillion", "trequinquagintillion",
    "quattuorquinquagintillion", "quinquinquagintillion", "sexquinquagintillion", "septquinquagintillion",
    "octoquinquagintillion", "novemquinquagintillion", "sexagintillion", "unsexagintillion", "duosexagintillion",
    "tresexagintillion", "quattuorsexagintillion", "quinsexagintillion", "sexsexagintillion", "septsexagintillion",
    "octosexagintillion", "novemsexagintillion", "septuagintillion", "unseptuagintillion", "duoseptuagintillion",
    "treseptuagintillion", "quattuorseptuagintillion", "quinseptuagintillion", "sexseptuagintillion",
    "septseptuagintillion", "octoseptuagintillion", "novemseptuagintillion", "octogintillion", "unoctogintillion",
    "duooctogintillion", "treoctogintillion", "quattuoroctogintillion", "quinoctogintillion", "sexoctogintillion",
    "septoctogintillion", "octooctogintillion", "novemoctogintillion", "nonagintillion", "unnonagintillion",
    "duononagintillion", "trenonagintillion", "quattuornonagintillion", "quinnonagintillion", "sexnonagintillion",
    "septnonagintillion", "octononagintillion", "novemnonagintillion", "centillion", "uncentillion", "cendotillion",
    "centretillion", "cenquattuortillion", "cenquintillion", "censextillion", "censeptentillion", "cenoctotillion",
    "cennovemtillion", "cendecillion", "cenundecillion", "cendodecillion", "centredecillion", "cenquattuordecillion",
    "cenquindecillion", "censexdecillion", "censeptendecillion", "cenoctodecillion", "cennovemdecillion",
    "cenvigintillion", "cenunvigintillion", "cendovigintillion", "centrevigintillion", "cenquattuorvigintillion",
    "cenquinvigintillion", "censexvigintillion", "censeptenvigintillion", "cenoctovigintillion",
    "cennovemvigintillion", "centrigintillion", "cenuntrigintillion", "cendotrigintillion"
  ];
  const FUN_NAMES = [
    "Weakest", "Weak", "Not Weak", "Average", "Better", "Almost Strong", "Cute", "Strong", "Powerful", "Supaaa",
    "Hyperion", "Itztli", "Gaia", "Shu", "Suijin", "Gefion", "Hathor", "Pontus", "Diana", "Izanagi", "Nephthys",
    "Cybele", "Artemis", "Eros", "Freya", "Poseidon", "Laima", "Athena", "Susano O", "Zeus", "Nyx", "Luna", "Jupiter",
    "Odin", "Amaterasu", "Coatlicue", "Chronos", "Tyrant Overlord Baal", "Monster Queen", "Important", "Atom",
    "Atomic", "Nuclear", "Albert", "Snail", "Turtle", "Mouse", "Elephant", "Bunny", "Bunny Girl", "Hidden", "Secret",
    "Invisible", "Random", "Number", "Internet", "Game", "Hacker", "John Doe", "Player", "Planet Eater",
    "Godly Tribunal", "Living Sun", "God Above All", "Missing Name", "Unbelievable", "Searching", "For", "The",
    "Missing", "Name", "Found", "It", "It's", "ITRTG!", "Helpless", "Boring", "No Future", "Idling", "Nothing",
    "Poor", "Hard", "Time", "Runs", "Away", "New Start", "Learning", "Improving", "Patience", "Results", "Good Job",
    "Profit", "Happy", "End?", "Climate", "Thunder", "Tornado", "Doomsday", "Ragnarok", "Big Crunch", "Big Bang"
  ];
  // The game also has a FunNames2 list (an easter egg: "You want to improve nothing ? Click My Other Games ...").
  // It's not used here: several of its words repeat at different exponents ("then", "Hyperion"), so they can't be read back.
  const WORDS = {}, FUN = {};
  NUMBER_NAMES.forEach((n, i) => { WORDS[n] = 6 + 3 * i; });
  FUN_NAMES.forEach((n, i) => { FUN[n] = 6 + 3 * i; });
  const FUN_BY_LENGTH = FUN_NAMES.slice().sort((x, y) => y.length - x.length);   // "Not Weak" before "Weak"
  // Roman format: the game's RomanNumbers list, item i is 10^(i + 1). It's standard numerals up to CCCX except
  // for typos the export will show as they are: 239 is "CCCCXXXIX" and 290-299 are "CCXCC" ... "CCXCCIX".
  const ROMAN = {};
  (function () {
    const R = [[100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    for (let n = 1; n <= 310; n++) {
      let x = n, r = "";
      for (const [v, sym] of R) while (x >= v) { r += sym; x -= v; }
      ROMAN[r] = n;
    }
    ROMAN["CCCCXXXIX"] = 239;
    ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"].forEach((u, i) => { ROMAN["CCXCC" + u] = 290 + i; });
  })();

  const reEsc = x => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Suffix after the number: E notation, a word name, a Fun name or a Roman numeral. Longest names first, and
  // each must end at a non-letter, so "Weak" can't match the start of "Weakest" and "I" can't start "Idling".
  const SUFFIX = String.raw`\s*[eE]\s*[+-]?\d+|\s+(?:` +
    [...NUMBER_NAMES, ...FUN_NAMES].sort((x, y) => y.length - x.length).map(reEsc).join("|") +
    String.raw`|[IVXLCDM]+)(?![A-Za-z])`;
  // One number in any format, as a capture group. Used by every stat regex.
  const NUM = String.raw`(-?\d[\d,]*(?:\.\d+)?(?:` + SUFFIX + `)?)`;

  // Read one number in any of the formats above, e.g. "1,234" "4.04979 E+8" "413.112 E+6" "15.920 billion"
  // "4.131 VIII" "413.112 Weakest" "∞" "53.23%". Returns null when a suffix is there but not recognized
  // (a wrong small number would be worse than a missing one).
  function parseNumber(str) {
    if (str == null) return null;
    const s = String(str).trim();
    if (/^∞|^infinity/i.test(s)) return Infinity;
    const m = s.match(/^(-?\d[\d,]*(?:\.\d+)?)\s*(.*)$/);
    if (!m) return null;
    const v = parseFloat(m[1].replace(/,/g, ""));
    const rest = m[2];
    const scale = e => v * Math.pow(10, e);
    let e;
    if ((e = rest.match(/^[eE]\s*([+-]?\d+)/))) return scale(parseInt(e[1], 10));
    if (!rest || /^[%(),:;/*+\-]/.test(rest)) return v;                 // plain number
    for (const n of FUN_BY_LENGTH) if (rest.startsWith(n) && !/[A-Za-z]/.test(rest.charAt(n.length))) return scale(FUN[n]);
    const word = rest.match(/^[A-Za-z]+/);
    if (word) {
      const w = word[0];
      if (w.toLowerCase() in WORDS) return scale(WORDS[w.toLowerCase()]);
      if (w in ROMAN) return scale(ROMAN[w]);
      if (/^(hours?|days?|minutes?|mins?|seconds?|times?|levels?)$/i.test(w)) return v;   // units after a plain number
    }
    return null;
  }

  // Which number format the export uses (shown with the import, helps with bug reports)
  function detectFormat(text) {
    const big = [...text.matchAll(new RegExp(String.raw`(?:^|[\s(])` + NUM, "gm"))].map(m => m[1]).filter(x => /[A-Za-z]/.test(x));
    if (!big.length) return "plain";
    const has = re => big.some(x => re.test(x));
    if (has(/\d\s*e\s*[+-]?\d/i)) return big.some(x => /^-?\d{2,3}(?:\.\d+)?\s*e/i.test(x.replace(/,/g, ""))) ? "engineering" : "scientific";
    if (has(/illion/i)) return "suffix";
    if (has(/\s[IVXLCDM]+$/)) return "roman";
    return "fun";
  }

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
    ["bsTotal", /^Building Speed:[ \t]*([^%(\r\n]+?)\s*%/m],   // "5,437 %" (early game has commas) or "6.09 E+7 %"
    ["csTotal", /^Creating Speed:[ \t]*([^%(\r\n]+?)\s*%/m],
    ["totalMight", /^Total Might:\s*(.+)$/m],
    ["gpBank", /^Available GP:\s*(.+)$/m],
    ["chpPlanet", /^Chp Planet Level:\s*(.+)$/mi],
    ["bsCP", new RegExp("^Building Speed:.*?" + NUM + "\\s*%\\s*from crystal power", "m")],
    ["csGP", new RegExp("^Creating Speed:.*?" + NUM + "\\s*%\\s*from god power", "m")],
    ["bsGP", new RegExp("^Building Speed:.*?" + NUM + "\\s*%\\s*from god power", "m")],
    // pet equipment multiplier ("* 7.19453 from pet equip"), turned into % below (+619.45%)
    ["bsPetEquipX", new RegExp("^Building Speed:.*?\\*\\s*" + NUM + "\\s*from pet equip", "m")],
    ["csPetEquipX", new RegExp("^Creating Speed:.*?\\*\\s*" + NUM + "\\s*from pet equip", "m")],
    ["progress", /^Overall Game Progress:\s*([\d.]+)\s*%/m],
    // The export's tooltip in game: total dungeon levels of the player's top 50 pets (not all pets).
    ["petDungeonTop50", /^Total Pet Dungeon Levels:\s*(.+)$/m],
  ];

  const CH_LINE = new RegExp("^(.+?):\\s*" + NUM + "\\s*/\\s*" + NUM + "\\s*$");

  function norm(s) {
    return s.toLowerCase().replace(/ch\.s\b/g, "challenges").replace(/challenges?\b/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  }

  function parseExport(text, challenges) {
    const res = { player: null, platform: null, stats: {}, rates: {}, done: {}, cap: {}, scores: {}, unknown: [], found: 0 };
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
    const perms = [...text.matchAll(/^(.+?) perm level:\s*(.+)$/gm)].map(m => {
      const v = parseNumber(m[2]);
      if (v != null) res.stats["perm:" + m[1].trim()] = v;   // e.g. "perm:Space Dim" (used by statHint)
      return v;
    }).filter(v => v != null);
    if (perms.length) res.stats.rtiPermMin = Math.min(...perms);
    // Building Speed % from god power + crystal power (OCCC's recommendation)
    if (res.stats.bsGP != null && res.stats.bsCP != null) res.stats.bsGPCP = res.stats.bsGP + res.stats.bsCP;
    // Building / Creating Speed % from pet equipment, as the newer exports also list it ("Pet equip building speed
    // bonus: 619.45%"). Read from the multiplier so older exports have it too.
    if (res.stats.bsPetEquipX != null) res.stats.bsPetEquip = (res.stats.bsPetEquipX - 1) * 100;
    if (res.stats.csPetEquipX != null) res.stats.csPetEquip = (res.stats.csPetEquipX - 1) * 100;
    // ChP purchases ("Chp Crystal Sacrifice boost: 50%", "Chp Quest Overtime: True") and Overflow Points upgrades
    // ("OfP Might Speed: 0%"), as "chp:<name>" / "ofp:<name>". True/False read as 1/0. Exports from before
    // 2026-10 don't have these lines, and some purchases (Crystal Sacrifice itself, Early SpaceDim) aren't listed.
    for (const m of text.matchAll(/^(Chp|OfP) (.+?):\s*(.+)$/gm)) {
      const raw = m[3].trim(), v = /^true$/i.test(raw) ? 1 : /^false$/i.test(raw) ? 0 : parseNumber(raw);
      if (v != null && !isNaN(v)) res.stats[m[1].toLowerCase() + ":" + m[2].trim()] = v;
    }
    // NRDC unlock: top 36 pets' dungeon levels > 450. The export gives the top 50's total. The best 36 of those
    // average at least as much as all 50, so total × 36 / 50 is a floor for the top 36 (a low one when a few pets
    // hold most of the levels, but never too high). With 36 pets or fewer the total is the top 36 exactly.
    if (res.stats.petDungeonTop50 != null) {
      const n = Math.min(res.stats.pets != null ? res.stats.pets : 50, 50);
      res.stats.petDungeonTop36Floor = n <= 36 ? res.stats.petDungeonTop50 : Math.floor(res.stats.petDungeonTop50 * 36 / n);
    }

    // Per-hour rates, real time (offline included). Each stat has a "since beginning" line (since the game started
    // tracking it) and a "since <time>" line the player can reset in game, so that window can be any length.
    // Light Clones has only the second kind. res.rates[stat] = { all?, recent?, recentHours? }.
    const RATE_KEY = { "Pet Growth": "petGrowth", "Might": "totalMight", "Crystal Power": "cp", "Light Clones": "lightClones", "God Power": "gp" };
    for (const m of text.matchAll(new RegExp("^(.+?) / hour since (beginning|.+? hours?):\\s*" + NUM, "gm"))) {
      const key = RATE_KEY[m[1].trim()], rate = parseNumber(m[3]);
      if (!key || rate == null || isNaN(rate)) continue;
      const r = res.rates[key] = res.rates[key] || {};
      if (m[2] === "beginning") { r.all = rate; continue; }
      const w = m[2].match(/^(?:([\d,]+)\s*days?,\s*)?(\d+):(\d+):(\d+)/);
      if (w) { r.recent = rate; r.recentHours = parseNumber(w[1] || "0") * 24 + +w[2] + w[3] / 60 + w[4] / 3600; }
    }

    res.format = detectFormat(text);

    // challenge list
    const byExport = {};
    for (const c of challenges) if (c.export) byExport[norm(c.export)] = c.code;
    const start = text.search(/^Challenges\s*$/m);
    const body = start >= 0 ? text.slice(start) : text;
    for (const line of body.split(/\r?\n/)) {
      let m = line.match(CH_LINE);
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
    // Minimum planet level (wiki Planet > Upgrading): 5 from the tutorial sacrifices, +1 per UUC (the export's
    // count includes the 10 from UCC; levels stop at the cap), +1 per P.Baal in the best DBC, + ChP purchases.
    // Only known once UUC or DBC has been done (both need a level 5 planet). Older exports have no ChP line,
    // so it's a lower bound there.
    const uuc = res.done.UUC, dbc = res.scores.DBC;
    if (uuc > 0 || dbc > 0) {
      res.stats.planetLevel = 5 + Math.min(uuc || 0, res.cap.UUC || 55) + (dbc || 0) + (res.stats.chpPlanet || 0);
      res.stats.planetLevelExact = res.stats.chpPlanet != null;
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

  // Time until a {stat, min} condition is met at the player's rate. The resettable window is used when it covers at
  // least a day (shorter is too noisy), otherwise the since-beginning rate. Returns null when there's nothing to
  // estimate (met, no rate, not a minimum), or { hours (Infinity when not growing), rate, basis, windowHours }.
  const MIN_RATE_WINDOW_H = 24;
  function rateFor(stat, imp) {
    const r = imp && imp.rates && imp.rates[stat];
    if (!r) return null;
    if (r.recent != null && r.recentHours >= MIN_RATE_WINDOW_H) return { rate: r.recent, basis: "recent", windowHours: r.recentHours };
    if (r.all != null) return { rate: r.all, basis: "all" };
    return null;
  }
  function etaFor(k, imp) {
    if (!imp || !k || !k.stat || k.min == null || k.max != null) return null;
    const v = imp.stats[k.stat];
    if (v == null || v >= k.min) return null;
    const r = rateFor(k.stat, imp);
    if (!r) return null;
    return Object.assign({ hours: r.rate > 0 ? (k.min - v) / r.rate : Infinity }, r);
  }

  const api = { parseNumber, detectFormat, parseExport, evalCond, statusOf, unlockState, rateFor, etaFor, STAT_PARSERS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ITRTGParser = api;
})(typeof window !== "undefined" ? window : globalThis);
