// =====================================================================
//  ITRTG Challenge Chart - REWARD RULES (Rewards tab)
//
//  Each effect is one card on the Rewards tab. Its sources are the challenges that feed it.
//  Effect fields:
//    key, group, label, fmt, mode, unit (optional, small text under the value), cap (optional, on the combined value)
//    fmt  : pct (+12%) | num (+12) | x (×12) | min (12 min) | sph (12 s/h) | flag (unlocked yes/no)
//    lower: true when a smaller number is the good direction (costs, timers). Shown with a minus sign.
//    mode : add (default, values summed) | mul (1+a)(1+b)-1 | reduce 1-(1-a)(1-b)
//  Source fields:
//    ch   : challenge code. f(n) gets the completion count from the import.
//           The completion cap comes from the import ("done / cap", already includes UCC bonuses)
//           unless the source sets capN. Unlimited challenges (cap 9,999) have no max.
//    score: day challenge / RTI code. f(s) gets the best score. maxS = score where the reward stops growing.
//    at   : flags only. Unlocked once n >= at.
//    stat : a number from the export's stats (e.g. hmChp). f(v) gets it. Needs label and type for the tooltip.
//    note : optional text shown in the tooltip line.
//
//  Reward wording: itrtg.wiki.gg challenge pages, "Reward" sections (checked 2026-10-01),
//  CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/).
//  Root and Hard Mode challenges aren't listed one by one in the export. Both pay out Hard Mode points
//  (HM: 1 each, Root: 1-5 each), and the export has that total, so they show up through the HM points cards.
// =====================================================================
(function (root) {
  const min = Math.min, max = Math.max;
  // n per completion, optional cap on completions, optional value once n >= at (the "doubled at max" rewards)
  const per = (p, o = {}) => n => (o.at != null && n >= o.at) ? o.atV : p * (o.capN != null ? min(n, o.capN) : n);
  const log2 = Math.log2;

  // UCC 21+ overflow rewards: 1% per UCC from 21-30, +1% per UCC every 10 more, max 8% per UCC, stops after 150
  const uccRate = k => min(8, Math.floor((k - 21) / 10) + 1);
  function uccOfp(n) { let t = 0; for (let k = 21; k <= min(n, 150); k++) t += uccRate(k); return t; }
  function uccOcCap(n) { let t = 500; for (let k = 21; k <= min(n, 150); k++) t += 10 * min(7, uccRate(k)); return t + 70 * max(0, n - 150); }
  // UCC 1-20: each UCC gives 3 bonus completions, filled in this order, 10 per challenge
  const UCC_FILL = ["UUC", "PMC", "NDC", "1KC", "DRC", "CBC"];
  const uccCredit = code => n => { const i = UCC_FILL.indexOf(code); return max(0, min(10, 3 * min(n, 20) - 10 * i)); };
  // UBV2C: product over the 5 UBv2 tiers of (1 + k + 0.1kn), compared with no completions (×720)
  function ubv2(n) { n = min(n, 11); let p = 1; for (let k = 1; k <= 5; k++) p *= 1 + k + 0.1 * k * n; return p / 720; }

  const groups = [
    { key: "planet", label: "Planet & Ultimate Beings" },
    { key: "gp", label: "God Power & Black Holes" },
    { key: "might", label: "Might & Unleash" },
    { key: "pets", label: "Pets, Campaigns & Dungeons" },
    { key: "crystal", label: "Crystals" },
    { key: "create", label: "Creation & Building" },
    { key: "div", label: "Divinity" },
    { key: "monu", label: "Monuments" },
    { key: "stats", label: "Stats, Rebirth & RTI" },
    { key: "mv", label: "SpaceDim, Multiverse & Overflow" },
    { key: "clones", label: "Clones" },
    { key: "hm", label: "Hard Mode points (Hard Mode + Root challenges)" },
    { key: "ucc", label: "Extra completions from UCC" },
    { key: "unlock", label: "Unlocked extras" },
  ];

  const effects = [
    // ---------- Planet & UBs ----------
    { key: "planetLevel", group: "planet", label: "Planet level", fmt: "num", sources: [
      { ch: "UUC", f: per(1) },
      { score: "DBC", f: s => s, note: "1 per P.Baal killed in your best DBC" } ] },
    { key: "ubEnergy", group: "planet", label: "UB energy drops", fmt: "pct", sources: [ { ch: "PMC", f: per(2) } ] },
    { key: "ubRespawn", group: "planet", label: "UB respawn speed", fmt: "pct", sources: [ { ch: "NRC", f: per(1) } ] },
    { key: "ubMystic", group: "planet", label: "UB GP & energy per Mystic Crystal level", fmt: "pct", unit: "energy part capped at 50%", sources: [ { ch: "UBv1C", f: per(0.15) } ] },
    { key: "planetCoP", group: "planet", label: "Planet multi per Clones on Planet+ level", fmt: "pct", sources: [ { ch: "UBv1C", f: per(0.01) } ] },
    { key: "ubv2Multi", group: "planet", label: "Multiplier from UBv2 kills", fmt: "x", unit: "all 5 UBv2s, compared with no UBV2C", sources: [ { ch: "UBV2C", f: ubv2, capN: 11, note: "11th completion is a hidden bonus" } ] },
    { key: "ubv4Rewards", group: "planet", label: "UBv4 rewards per ITRTGv1 kill", fmt: "pct", unit: "up to 10 kills per rebirth", sources: [ { ch: "LCv4C", f: per(5, { capN: 10 }) } ] },
    { key: "ubv4Timer", group: "planet", label: "UBv4 fight timer", fmt: "min", lower: true, sources: [ { ch: "UBV4C", f: per(1) } ] },

    // ---------- God Power & Black Holes ----------
    { key: "gpPet", group: "gp", label: "GP chance when feeding the God Power pet", fmt: "pct", sources: [ { ch: "GPC", f: per(2, { at: 25, atV: 100 }) } ] },
    { key: "pbaalGP", group: "gp", label: "P.Baal extra GP chance", fmt: "pct", sources: [ { ch: "PBC", f: per(4) } ] },
    { key: "ghostGP", group: "gp", label: "Ghost GP for the GP stat multiplier", fmt: "num", sources: [ { ch: "GPAC", f: per(100, { at: 25, atV: 5000 }) } ] },
    { key: "ubGP", group: "gp", label: "Extra GP per UBv1 GP drop", fmt: "num", unit: "before the Dyson Harvester multiplier", sources: [
      { score: "DGPC", f: s => s > 0 ? max(0, 0.03 * Math.log(s) / Math.log(1.04) - 3) : 0 } ] },
    { key: "bhGP", group: "gp", label: "Extra GP per hour from Black Holes", fmt: "num", unit: "0.05 GP/h for each BH, up to one per BHC", sources: [ { ch: "BHC", f: per(0.05) } ] },
    { key: "bhDouble", group: "gp", label: "Chance to double Black Hole GP", fmt: "pct", sources: [ { ch: "1KBHC", f: per(5) } ] },
    { key: "bhCost", group: "gp", label: "Black Hole & upgrade material cost", fmt: "pct", lower: true, sources: [ { ch: "BHC", f: per(2) } ] },
    { key: "bhuGP", group: "gp", label: "GP from Black Hole upgrades after rebirth", fmt: "pct", unit: "after Might unlock", sources: [ { ch: "UBHC", f: per(5) } ] },
    { key: "bhPlus", group: "gp", label: "BH multi per Black Hole+ might level", fmt: "pct", sources: [ { ch: "1KBHC", f: per(0.01) } ] },
    { key: "uccGP", group: "gp", label: "God Power received from UCC 51+", fmt: "num", unit: "one-time, 10,000 per UCC", sources: [ { ch: "UCC", f: n => n > 50 ? 10000 * (n - 50) : 0 } ] },
    { key: "pbaalGrowth", group: "gp", label: "P.Baal growth reduction", fmt: "pct", lower: true, cap: 50, sources: [
      { ch: "UBC", f: per(1, { capN: 50 }) }, { ch: "UAC", f: per(2) } ] },

    // ---------- Might ----------
    { key: "mightFree", group: "might", label: "Free Might levels when Might unlocks", fmt: "num", unit: "count toward permanent total Might", sources: [ { ch: "DRC", f: per(2) } ] },
    { key: "mightGhost", group: "might", label: "Ghost Might levels", fmt: "num", sources: [ { ch: "CBC", f: per(2) } ] },
    { key: "mightEffect", group: "might", label: "Total Might effect", fmt: "pct", sources: [
      { ch: "TMC", f: per(2, { at: 25, atV: 100 }) }, { ch: "MAC", f: per(5) } ] },
    { key: "mightSpeed", group: "might", label: "Might training speed", fmt: "pct", sources: [
      { ch: "1KC", f: n => min(200, 5 * n) },
      { ch: "MAC", f: (n, cap) => n >= cap ? 10 : 0, note: "+10% once all are done" } ] },
    { key: "unleash", group: "might", label: "Unleash strength", fmt: "pct", sources: [ { ch: "NMNRC", f: per(5, { capN: 20 }) } ] },
    { key: "unleashDMC", group: "might", label: "Unleash boost per usable Might skill level", fmt: "pct", sources: [
      { score: "DMC", f: s => Math.sqrt(min(s, 1150000)) / 500, maxS: 1150000 } ] },
    { key: "unleashCd", group: "might", label: "Unleash cooldown", fmt: "min", lower: true, sources: [ { ch: "PUC", f: per(3, { at: 10, atV: 60 }) } ] },
    { key: "etcClones", group: "might", label: "Fewer clones to cap the ETC training", fmt: "num", sources: [ { ch: "ETC", f: n => n > 1 ? 50000 * min(n - 1, 25) : 0, note: "starts at 1,250,001 clones" } ] },

    // ---------- Pets ----------
    { key: "campaign", group: "pets", label: "Pet campaign rewards", fmt: "pct", sources: [ { ch: "UPC", f: per(5) } ] },
    { key: "campaignTime", group: "pets", label: "Campaign & dungeon tower time", fmt: "sph", lower: true, unit: "seconds saved per hour", sources: [
      { score: "DNRC", f: s => s, note: "1 s per hour for each god in your best DNRC" } ] },
    { key: "petGrowth", group: "pets", label: "Pet growth", fmt: "pct", sources: [ { ch: "PGC", f: per(1, { at: 25, atV: 50 }) } ] },
    { key: "uccGrowth", group: "pets", label: "Base growth per pet from UCC 51+", fmt: "num", unit: "201 to every unlocked pet per UCC", sources: [ { ch: "UCC", f: n => n > 50 ? 201 * (n - 50) : 0 } ] },
    { key: "uccBacon", group: "pets", label: "Rebirth Bacon received from UCC 51+", fmt: "num", unit: "one-time, 500 per UCC", sources: [ { ch: "UCC", f: n => n > 50 ? 500 * (n - 50) : 0 } ] },
    { key: "petStats", group: "pets", label: "Pet normal (non-dungeon) stats", fmt: "pct", sources: [ { ch: "TGC", f: per(2.5) } ] },
    { key: "food", group: "pets", label: "Pet food efficiency", fmt: "pct", sources: [ { score: "DPC", f: s => s > 0 ? min(100, max(0, log2(s * 100))) : 0, maxS: 1.14e30 } ] },
    { key: "petStart", group: "pets", label: "Pet starting levels after rebirth", fmt: "num", sources: [ { ch: "PLC", f: per(20) } ] },
    { key: "petXP", group: "pets", label: "Pet XP from fighting clones", fmt: "pct", sources: [ { ch: "SPLC", f: per(5) } ] },
    { key: "classXP", group: "pets", label: "Class XP outside dungeons", fmt: "pct", sources: [ { ch: "CEC", f: per(2) } ] },
    { key: "dungeonRoom", group: "pets", label: "Dungeon room time", fmt: "pct", lower: true, sources: [ { ch: "NRDC", f: per(1, { capN: 20 }) } ] },
    { key: "craft", group: "pets", label: "Blacksmith crafting speed & quality", fmt: "pct", sources: [
      { ch: "PCC", f: per(0.5) }, { ch: "USC", f: per(1), note: "Rune Patch, when equipped" } ] },

    // ---------- Crystals ----------
    { key: "cpCrystal", group: "crystal", label: "Crystal Power per crystal", fmt: "pct", sources: [ { ch: "MCC", f: n => n <= 20 ? 2.5 * n : 50 + 5 * min(n - 20, 10) } ] },
    { key: "cpBenefit", group: "crystal", label: "Crystal Power benefits", fmt: "pct", sources: [ { ch: "GSC", f: n => n >= 26 ? 100 : 2 * min(n, 25) } ] },
    { key: "cfClones", group: "crystal", label: "Clones needed by crystal modules", fmt: "pct", lower: true, sources: [ { ch: "CPC", f: per(2) } ] },
    { key: "cfCost", group: "crystal", label: "Crystal module creation cost", fmt: "pct", lower: true, sources: [ { ch: "CPC", f: per(1) } ] },
    { key: "cfTime", group: "crystal", label: "Crystal production time", fmt: "pct", lower: true, sources: [ { ch: "CPC", f: per(1) } ] },
    { key: "upgrade", group: "crystal", label: "Crystal upgrade chance", fmt: "pct", sources: [ { ch: "NRCPC", f: per(0.2, { at: 25, atV: 10 }) } ] },

    // ---------- Creation & Building ----------
    { key: "creationCost", group: "create", label: "Creation divinity cost", fmt: "pct", lower: true, mode: "reduce", sources: [
      { ch: "NDC", f: per(0.6), note: "auto-buy cost" }, { ch: "NDMC", f: per(1, { capN: 20 }) } ] },
    { key: "cc", group: "create", label: "Creation Count", fmt: "pct", sources: [ { ch: "GGC", f: per(0.5, { at: 26, atV: 25 }) } ] },
    { key: "ccClones", group: "create", label: "Creation Count when creating shadow clones", fmt: "pct", sources: [ { ch: "OCCC", f: per(1, { at: 25, atV: 50 }) } ] },
    { key: "ccCrystal", group: "create", label: "Extra CC per Creation Crystal level", fmt: "pct", sources: [ { score: "DNDC", f: s => Math.sqrt(s) / 5000 } ] },
    { key: "prereq", group: "create", label: "Fewer prerequisite creations (crystal equipped)", fmt: "pct", lower: true, sources: [
      { score: "DNDC", f: s => s > 1 ? min(15, log2(s) / 2) : 0, maxS: 2 ** 30 } ] },
    { key: "gpSpeed", group: "create", label: "Creating & Building Speed from GP purchases", fmt: "pct", sources: [ { ch: "BSC", f: per(2, { at: 25, atV: 100 }) } ] },
    { key: "buildSpeed", group: "create", label: "Building speed", fmt: "pct", sources: [ { ch: "UfCC", f: per(0.5, { at: 25, atV: 25 }) } ] },

    // ---------- Divinity ----------
    { key: "dgUpg", group: "div", label: "Divinity Generator upgrade cost", fmt: "pct", lower: true, sources: [ { ch: "DAC", f: per(10, { capN: 10 }) } ] },
    { key: "dgGods", group: "div", label: "Extra gods counted for Div Gen stats", fmt: "num", sources: [ { ch: "NDC", f: per(2) } ] },
    { key: "workerFill", group: "div", label: "Worker clone filling speed", fmt: "pct", sources: [ { ch: "DGC", f: per(12) } ] },
    { key: "overcapDiv", group: "div", label: "Divinity from over-capping", fmt: "pct", sources: [ { ch: "DGC", f: per(5) } ] },
    { key: "capMax", group: "div", label: "Divinity from CAP MAX workers", fmt: "pct", sources: [ { ch: "PWC", f: per(10, { capN: 20 }) } ] },
    { key: "sdg", group: "div", label: "Super Divinity Generator efficiency", fmt: "pct", sources: [ { ch: "SDGC", f: n => n > 0 ? min(100, 20 + 4 * n) : 0 } ] },
    { key: "monsterDiv", group: "div", label: "Divinity from monsters", fmt: "pct", sources: [ { ch: "MQC", f: per(10) } ] },
    { key: "dgCap", group: "div", label: "Div Gen divinity per Capacity level^0.4", fmt: "pct", sources: [ { ch: "BCC", f: per(0.1, { capN: 10 }) } ] },

    // ---------- Monuments ----------
    { key: "monuStats", group: "monu", label: "Monument stats from MMC", fmt: "pct", unit: "applies to the lowest monuments first", sources: [
      { ch: "MMC", f: n => n >= 40 ? 50 : 25 * Math.floor(n / 5) / 8 + 5 * (n % 5) / 8,
        note: "average over the 8 monuments: +5% each up to +25%, then +50% for all at 40" } ] },
    { key: "monuRB", group: "monu", label: "Monument rebirth caps", fmt: "pct", mode: "mul", sources: [
      { ch: "PBC", f: per(4) }, { score: "DEBC", f: s => s > 0 ? 35 * s ** 0.15 : 0, maxS: 3.383e8 } ] },
    { key: "monuBuild", group: "monu", label: "Monument build time", fmt: "pct", lower: true, sources: [ { ch: "NDMC", f: n => n >= 21 ? 10 : 0, note: "from the 21st completion" } ] },
    { key: "emc", group: "monu", label: "EMC cross-monument boost factor", fmt: "num", unit: "× level^0.3 / (9 − tier) % per monument", sources: [ { ch: "EMC", f: per(0.04) } ] },

    // ---------- Stats, Rebirth & RTI ----------
    { key: "achBonus", group: "stats", label: "Achievement bonus", fmt: "pct", sources: [ { ch: "AAC", f: n => min(55, 2 * n) } ] },
    { key: "achReq", group: "stats", label: "Achievement level requirements", fmt: "pct", lower: true, sources: [ { ch: "AAC", f: n => min(50, 2 * n) } ] },
    { key: "trainStats", group: "stats", label: "Stats from skills & physical training", fmt: "pct", sources: [ { ch: "NTC", f: per(5) } ] },
    { key: "timeMulti", group: "stats", label: "Rebirth time multiplier", fmt: "pct", sources: [ { ch: "TGSC", f: n => n >= 26 ? 100 : 2 * min(n, 25) } ] },
    { key: "tbs", group: "stats", label: "TBS levels after every rebirth", fmt: "num", sources: [ { score: "DUC", f: s => s > 1 ? log2(s) : 0 } ] },
    { key: "baalPower", group: "stats", label: "Baal Power from P.Baals", fmt: "pct", sources: [ { ch: "UGC", f: per(2, { at: 20, atV: 50 }) } ] },
    { key: "baalPowerUB", group: "stats", label: "Baal Power per UBv1 kill × UB tier", fmt: "pct", unit: "total bonus capped at 300%", sources: [ { ch: "LCNRC", f: per(0.1) } ] },
    { key: "rtiTemp", group: "stats", label: "RTI temp leveling speed", fmt: "pct", sources: [ { ch: "TLC", f: per(1) } ] },
    { key: "pbaalMax", group: "stats", label: "Max P.Baal raised above v147", fmt: "num", unit: "Higher P Baal (UOC points) raises it further; not in the export", sources: [
      { score: "RTI", f: s => max(0, s + 10 - 147), note: "max P.Baal becomes RTI score + 10" } ] },
    { key: "rtiCap", group: "stats", label: "RTI base multiplier cap", fmt: "pct", sources: [ { score: "RTI", f: s => 2 * max(0, s - 100), note: "+2% per P.Baal over v100" } ] },

    // ---------- SpaceDim, Multiverse & Overflow ----------
    { key: "sdSpeed", group: "mv", label: "SpaceDim leveling speed", fmt: "pct", sources: [ { ch: "SDC", f: per(2) } ] },
    { key: "sdGhost", group: "mv", label: "Ghost SpaceDim levels & soft cap", fmt: "num", sources: [ { ch: "SDAC", f: per(2) } ] },
    { key: "mvSpeed", group: "mv", label: "Multiverse leveling speed", fmt: "pct", sources: [ { ch: "UMC", f: n => n > 1 ? min(100, 5 * (n - 1)) : 0, note: "from the 2nd completion" } ] },
    { key: "mvBoost", group: "mv", label: "Multiverse Boost divinity/sec", fmt: "pct", sources: [ { score: "DMVC", f: s => s, maxS: 3330 } ] },
    { key: "psCost", group: "mv", label: "Powersurge overcap cost", fmt: "pct", lower: true, sources: [ { ch: "PSC", f: per(5) } ] },
    { key: "ofp", group: "mv", label: "Overflow point multiplier", fmt: "pct", sources: [ { ch: "UCC", f: uccOfp, note: "from UCC 21" } ] },
    { key: "ocCap", group: "mv", label: "Max points per Overflow Challenge", fmt: "num", unit: "base 500", sources: [ { ch: "UCC", f: n => uccOcCap(n) - 500, note: "from UCC 21" } ] },
    { key: "ocLevels", group: "mv", label: "Free levels on each OC purchase", fmt: "num", sources: [ { ch: "UCC", f: n => n >= 55 ? Math.floor((n - 50) / 5) : 0, note: "1 per 5 UCCs from UCC 55" } ] },

    // ---------- Clones ----------
    { key: "maxClones", group: "clones", label: "Max clones", fmt: "num", sources: [ { ch: "CBC", f: per(20000) } ] },
    { key: "ghostClones", group: "clones", label: "Ghost clones per RTI & Might element", fmt: "pct", unit: "% of max clones", sources: [ { ch: "CCC", f: per(0.01) } ] },
    { key: "lcBuys", group: "clones", label: "Light clones per buy", fmt: "pct", sources: [ { ch: "LCC", f: per(1) } ] },
    { key: "lcBase", group: "clones", label: "Base light clones before the cost rises", fmt: "num", sources: [ { ch: "SDRC", f: per(10) } ] },

    // ---------- Hard Mode points (each HM completion = 1, each Root completion = 1-5) ----------
    { key: "hmStats", group: "hm", label: "Physical, Mystic, Battle & Creating", fmt: "pct", sources: [ { stat: "hmChp", label: "HM pts", type: "HM", f: v => 0.25 * v, note: "0.25% per Hard Mode point" } ] },
    { key: "hmSpeed", group: "hm", label: "Building Speed & Creating Speed", fmt: "pct", sources: [ { stat: "hmChp", label: "HM pts", type: "HM", f: v => 0.25 * v, note: "0.25% per Hard Mode point" } ] },
    { key: "hmRegen", group: "hm", label: "HP Regen", fmt: "pct", sources: [ { stat: "hmChp", label: "HM pts", type: "HM", f: v => 10 * v, note: "10% per Hard Mode point" } ] },

    // ---------- Extra completions from UCC ----------
    // UCC 1-20 add completions (with their rewards) to six challenges, 3 per UCC in this order.
    // UCC 20 also adds completions to GSC, CPC and AAC, and raises the cap of NRC and PBC (cap only: you still have to do them).
    ...["UUC", "PMC", "NDC", "1KC", "DRC", "CBC"].map(c => ({ key: "ucc" + c, group: "ucc", label: c + " completions", fmt: "num", unit: "bonus completions, rewards included",
      sources: [ { ch: "UCC", f: uccCredit(c), capN: 20 } ] })),
    ...[["GSC", 5], ["CPC", 5], ["AAC", 3]].map(([c, v]) => ({ key: "ucc" + c, group: "ucc", label: c + " completions", fmt: "num", unit: "bonus completions at UCC 20, rewards included",
      sources: [ { ch: "UCC", f: n => n >= 20 ? v : 0, capN: 20 } ] })),
    ...[["NRC", 5], ["PBC", 25]].map(([c, v]) => ({ key: "ucc" + c, group: "ucc", label: c + " completion cap", fmt: "num", unit: "higher cap at UCC 20; complete them for the rewards",
      sources: [ { ch: "UCC", f: n => n >= 20 ? v : 0, capN: 20 } ] })),

    // ---------- Unlocked extras (yes / no) ----------
    { key: "fGpPet", group: "unlock", label: "God Power pet can evolve", fmt: "flag", sources: [ { ch: "GPC", at: 25 } ] },
    { key: "fUbv2Auto", group: "unlock", label: "UBv2 auto-kill", fmt: "flag", sources: [ { ch: "UBV2C", at: 10 } ] },
    { key: "fV4Instant", group: "unlock", label: "−1 min UBv4 fight per ITRTGv1 kill", fmt: "flag", sources: [ { ch: "LCv4C", at: 11 } ] },
    { key: "fBhuRB", group: "unlock", label: "Black Hole upgrades +50% rebirth multi", fmt: "flag", sources: [ { ch: "PBC", at: 25 } ] },
    { key: "fMonuOvercap", group: "unlock", label: "Monument overcapping", fmt: "flag", sources: [ { ch: "EMC", at: 25 } ] },
    { key: "fSdCap", group: "unlock", label: "No SpaceDim level cap", fmt: "flag", sources: [ { ch: "SDC", at: "cap" } ] },
    { key: "fDemonLord", group: "unlock", label: "Demon Lord + battle HP recovery", fmt: "flag", sources: [ { ch: "MQC", at: 20 } ] },
    { key: "fNtcRegen", group: "unlock", label: "Battle regen in Mystic Regen+", fmt: "flag", sources: [ { ch: "NTC", at: 20 } ] },
    { key: "fRooms", group: "unlock", label: "60 dungeon rooms", fmt: "flag", sources: [ { ch: "NRDC", at: 20 } ] },
    { key: "fLcResets", group: "unlock", label: "50 light clone resets", fmt: "flag", sources: [ { ch: "LCC", at: 25 } ] },
    { key: "fStones", group: "unlock", label: "Div Gen workers carry +50% stones", fmt: "flag", sources: [ { ch: "NDC", at: 25 } ] },
    { key: "fCapMax", group: "unlock", label: "CAP MAX div for campaigns, Div Gen stays full", fmt: "flag", sources: [ { ch: "PWC", at: 20 } ] },
    { key: "fSdgFree", group: "unlock", label: "Free Super Div Gen upgrades", fmt: "flag", sources: [ { ch: "DAC", at: 11 } ] },
    { key: "fSdgCap", group: "unlock", label: "SDG capacity multiplies divinity", fmt: "flag", sources: [ { ch: "BCC", at: 11 } ] },
    { key: "fUbDiv", group: "unlock", label: "UB divinity scales with Div Gen div/sec", fmt: "flag", sources: [ { ch: "DGC", at: 25 } ] },
    { key: "fEtc", group: "unlock", label: "ETC skill stats doubled", fmt: "flag", sources: [ { ch: "ETC", at: 27 } ] },
    { key: "fOfpCC", group: "unlock", label: "Creation Count overflow upgrade", fmt: "flag", sources: [ { ch: "UCC", at: 30 } ] },
    { key: "fOfpMight", group: "unlock", label: "Might Speed overflow upgrade", fmt: "flag", sources: [ { ch: "UCC", at: 40 } ] },
    { key: "fOfpStats", group: "unlock", label: "Stats Multi overflow upgrade", fmt: "flag", sources: [ { ch: "UCC", at: 50 } ] },
  ];

  // ---------------------------------------------------------------------
  //  Evaluate against a parsed import. Returns [{...effect, total, active, lines:[{code, v, max, have, cap, score}]}]
  // ---------------------------------------------------------------------
  function combine(mode, vals) {
    if (mode === "mul") return (vals.reduce((a, v) => a * (1 + v / 100), 1) - 1) * 100;
    if (mode === "reduce") return (1 - vals.reduce((a, v) => a * (1 - v / 100), 1)) * 100;
    return vals.reduce((a, v) => a + v, 0);
  }
  function evaluate(imp, byCode) {
    if (!imp) return [];
    return effects.map(e => {
      const lines = e.sources.map(s => {
        if (s.stat) {
          const sv = imp.stats[s.stat];
          return { code: s.label, type: s.type, stat: true, have: sv, v: sv != null ? s.f(sv) : 0, max: null, note: s.note };
        }
        if (s.score) {
          const sc = imp.scores[s.score];
          const v = sc != null ? s.f(sc) : 0;
          return { code: s.score, have: sc, score: true, v, max: s.maxS != null ? s.f(s.maxS) : null, note: s.note };
        }
        const n = imp.done[s.ch] || 0;
        let cap = imp.cap[s.ch];
        if (cap == null && byCode && byCode[s.ch]) cap = parseFloat(byCode[s.ch].max) || null;
        const unlimited = cap != null && cap >= 9999;
        const capN = s.capN != null ? s.capN : cap;   // capN on a source overrides the export cap (UBV2C counts an 11th)
        if (e.fmt === "flag") {
          const at = s.at === "cap" ? cap : s.at;
          return { code: s.ch, have: n, cap, v: at != null && n >= at ? 1 : 0, max: 1, at, note: s.note };
        }
        const v = n > 0 ? s.f(capN != null && !unlimited ? min(n, capN) : n, cap) : 0;
        const mx = unlimited || capN == null ? null : s.f(capN, cap);
        return { code: s.ch, have: n, cap, v, max: mx, note: s.note };
      });
      const vals = lines.map(l => l.v);
      let total = e.fmt === "flag" ? (vals.some(Boolean) ? 1 : 0) : e.fmt === "x" ? vals[0] : combine(e.mode, vals);
      if (e.cap != null) total = min(total, e.cap);
      const active = e.fmt === "x" ? total > 1.0000001 : total > 0;
      return Object.assign({}, e, { total, active, lines });
    });
  }

  const api = { groups, effects, evaluate, _test: { uccOfp, uccOcCap, ubv2 } };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ITRTGRewards = api;
})(typeof window !== "undefined" ? window : globalThis);
