// =====================================================================
//  ITRTG Challenge Chart - app
//  Two layouts (Roadmap, Unlock tree) computed from challenges.js.
//  Every challenge is ONE box element; switching views moves it with a CSS transform transition.
// =====================================================================
(function () {
  "use strict";
  const D = window.ITRTG, P = window.ITRTGParser;
  const CH = D.challenges, BY = Object.fromEntries(CH.map(c => [c.code, c]));
  const T = D.types;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) { } },
  };

  // ---------- constants ----------
  const BW = 208;              // box width
  const COLW = 236;            // roadmap step width
  const NSTEP = 11;
  const RX0 = 40, RY0 = 30;    // roadmap origin
  const LX = 300, VG = 14;     // tree column spacing / vertical gap
  const GROUP_ORDER = ["N", "MR", "GP", "U", "D", "HM", "R"];
  const bandOfStep = i => D.bands.find(b => b.steps.includes(i));
  const firstStep = c => { const k = Object.keys(c.stages).map(Number); return k.length ? Math.min(...k) : null; };
  const stars = n => n ? "★".repeat(n) : "";
  // One number format everywhere: whole numbers with commas below a million, scientific (1.03e7) from a million up.
  const sci = v => v.toExponential(2).replace("e+", "e");
  const fmt = (v, forceSci) => {
    if (v == null) return "–";
    if (!isFinite(v)) return "∞";
    const a = Math.abs(v);
    if (a >= 1e6 || (forceSci && a >= 10)) return sci(v);
    return Math.round(v).toLocaleString("en-US");
  };
  // two numbers that get compared side by side use the same notation
  const fmtPair = (a, b) => { const s = Math.max(Math.abs(a || 0), Math.abs(b || 0)) >= 1e6; return [fmt(a, s), fmt(b, s)]; };

  // ---------- state ----------
  let view = ["tree", "rec"].includes(store.get("itrtg.view")) ? store.get("itrtg.view") : "road";
  let imp = null;                // parsed import
  let cam = { x: 0, y: 0, k: 1 };
  const layouts = {};            // view -> {pos: {code:{x,y}}, w, h}
  let collapsed = new Set(JSON.parse(store.get("itrtg.collapsed") || "[]"));  // collapsed Roadmap groups
  const groupOf = c => firstStep(c) == null ? "NEW" : c.type;
  const boxes = {};              // code -> element
  const heights = {};            // code -> px, full box (Roadmap)
  const hC = {};                 // code -> px, compact box (no "when" line; Tree + Recommended)
  const hOf = code => (view === "road" ? heights : hC)[code];

  const world = $("#world"), vp = $("#viewport");
  const L = { road: $("#layer-road"), tree: $("#layer-tree"), rec: $("#layer-rec"), boxes: $("#layer-boxes") };

  // =====================================================================
  //  Boxes
  // =====================================================================
  function unlockText(c) { return c.unlock.join(", "); }
  function boxHTML(c) {
    const t = T[c.type];
    const fs = firstStep(c);
    const maxTxt = c.scoreCap ? `<b>ChP max at</b> ${/^v|god/.test(c.scoreCap.short) ? esc(c.scoreCap.short) : fmt(c.scoreCap.value)}` : `<b>Max</b> ${esc(c.max)}`;
    const act = { Lazy: 1, Moderate: 2, "Semi-active": 3, Active: 4 }[c.playstyle];
    const meter = act ? `<span class="act" title="Playstyle: ${esc(c.playstyle)}" aria-label="Playstyle: ${esc(c.playstyle)}">${[1, 2, 3, 4].map(i => `<i class="${i <= act ? "lit" : ""}"></i>`).join("")}</span>` : "";
    let first = "";
    if (fs != null) first = `▶ ${esc(c.stages[fs])}`;
    else if (c.isNew) first = "New · not in the guide yet";
    const roots = c.code === "ROOT" ? `<div class="roots">${D.roots.map(r => `<i>${r.code}</i>`).join("")}</div>` : "";
    const hstars = c.rewardRating ? `<span class="hstars" title="Reward usefulness (guide): ${c.rewardRating} of 5">${stars(c.rewardRating)}</span>` : "";
    return `<div class="hd"><span class="code">${esc(c.code === "ROOT" ? "Root" : c.code)}</span>${c.isNew ? '<span class="new">NEW</span>' : ""}${hstars}<span class="st" hidden></span></div>
      <div class="bd"><div class="nm">${esc(c.name)}</div>
      <div class="un"><b>Unlock</b> ${esc(unlockText(c))}</div>
      <div class="mt"><span>${maxTxt}</span>${meter}</div>
      ${first ? `<div class="first">${first}</div>` : ""}${roots}</div>`;
  }
  function buildBoxes() {
    for (const c of CH) {
      const el = document.createElement("div");
      el.className = "box";
      el.dataset.code = c.code;
      el.tabIndex = 0;
      el.setAttribute("role", "button");
      el.setAttribute("aria-label", `${c.code} ${c.name}`);
      el.style.setProperty("--c", T[c.type].color);
      el.style.setProperty("--cl", T[c.type].light);
      el.innerHTML = boxHTML(c);
      L.boxes.appendChild(el);
      boxes[c.code] = el;
    }
    measure();
  }
  // box heights for both box variants (full for Roadmap, compact for Tree/Recommended)
  let measuring = false;
  function measure() {
    measuring = true;
    const had = L.boxes.classList.contains("compact");
    L.boxes.classList.remove("compact");
    for (const c of CH) heights[c.code] = boxes[c.code].offsetHeight;
    L.boxes.classList.add("compact");
    for (const c of CH) hC[c.code] = boxes[c.code].offsetHeight;
    L.boxes.classList.toggle("compact", had);
    measuring = false;
  }
  // Box sizes can change after the first layout (web fonts finishing, a status chip wrapping...).
  // When that happens, measure again and redo every layout so nothing overlaps.
  let relayT = null, lastSig = "";
  function sizeSig() { return CH.map(c => heights[c.code] + "/" + hC[c.code]).join(","); }
  function relayoutAll() {
    measure();
    const sig = sizeSig();
    if (sig === lastSig) return;
    lastSig = sig;
    layoutRoad(); layoutTree(); decorateTree(); layoutRec();
    L.boxes.querySelectorAll(".box").forEach(b => b.style.transition = "none");
    placeBoxes();
    applySelection();
    requestAnimationFrame(() => requestAnimationFrame(() => L.boxes.querySelectorAll(".box").forEach(b => b.style.transition = "")));
  }
  const scheduleRelayout = () => { if (measuring) return; clearTimeout(relayT); relayT = setTimeout(relayoutAll, 120); };

  // =====================================================================
  //  Roadmap layout
  // =====================================================================
  function layoutRoad() {
    const pos = {}, frag = [], hidden = new Set();
    const colx = i => RX0 + i * COLW;
    const W = NSTEP * COLW;
    let y = RY0;
    const hdrY = y;
    // band headers
    D.bands.forEach((b, i) => {
      const x = colx(b.steps[0]), w = COLW * b.steps.length;
      frag.push(`<div class="band-h" data-band="${i}" style="left:${x}px;top:${y}px;width:${w}px;height:54px">${esc(b.label)}<small>${b.steps.length > 1 ? "steps " + b.steps.join(" & ") : "step 0"}</small></div>`);
    });
    y += 64;
    const bodyTop = y;
    const repeatWords = /every|come back|return|feel like/i;
    const groups = GROUP_ORDER.map(t => [t, CH.filter(c => c.type === t && firstStep(c) != null)]);
    const unplaced = CH.filter(c => firstStep(c) == null);
    if (unplaced.length) groups.push(["NEW", unplaced]);
    const rows = [];
    for (const [t, list] of groups) {
      const tt = T[t] || { label: "New - not in the guide yet", color: "#5b5670", blurb: "Placed here until the guide covers it" };
      const isCol = collapsed.has(t);
      const extra = `<span class="extras">${t === "HM" ? `<span class="extra hm-points" hidden></span>` : ""}<span class="extra maxed" hidden></span></span>`;
      frag.push(`<div class="group-bar toggle${isCol ? " is-col" : ""}" data-group="${t}" role="button" tabindex="0" aria-expanded="${!isCol}" title="${isCol ? "Expand" : "Collapse"} ${esc(tt.label)}" style="left:${RX0}px;top:${y}px;width:${W}px;height:34px;background:${tt.color}"><span class="chev">▾</span>${esc(tt.label)} <small>${list.length} · ${esc(tt.blurb)}</small>${extra}</div>`);
      if (isCol) {
        for (const c of list) { pos[c.code] = { x: RX0 + 30, y: y - 20 }; hidden.add(c.code); }
        y += 34 + 14;
        continue;
      }
      y += 46;
      // pack items into lanes
      const items = list.map(c => {
        const st = Object.keys(c.stages).map(Number).sort((a, b) => a - b);
        const first = st.length ? st[0] : 0, last = st.length ? st[st.length - 1] : 0;
        const rep = st.length && (repeatWords.test(c.stages[last]) || c.type === "U");
        return { c, st, first, last, rep, end: Math.min(NSTEP - 1, last + (rep ? 1 : 0)) };
      }).sort((a, b) => a.first - b.first || (b.end - b.first) - (a.end - a.first) || CH.indexOf(a.c) - CH.indexOf(b.c));
      const lanes = [];
      for (const it of items) {
        const lane = lanes.find(l => l[l.length - 1].end < it.first);
        lane ? lane.push(it) : lanes.push([it]);
      }
      for (const lane of lanes) {
        let rowh = 0;
        for (const it of lane) {
          const { c, st, first, last, rep, end } = it;
          const color = T[c.type] ? T[c.type].color : "#5b5670";
          const bx = colx(first) + (COLW - BW) / 2;
          pos[c.code] = { x: bx, y };
          let h = heights[c.code];
          const ty = y + 11;
          if (last > first) {
            const x1 = bx + BW - 4, x2 = colx(last) + COLW / 2;
            frag.push(`<div class="track" data-code="${c.code}" style="left:${x1}px;top:${ty}px;width:${x2 - x1}px;background:${color}"></div>`);
          }
          if (rep) {
            const xs = last > first ? colx(last) + COLW / 2 + 92 : bx + BW;
            const xe = end > last ? colx(end) + COLW - 10 : xs;
            if (xe - xs > 30) frag.push(`<div class="repeat" data-code="${c.code}" style="--c:${color};left:${xs}px;top:${ty - 7}px;width:${xe - xs}px"><span>↻ repeat</span></div>`);
          }
          for (const k of st.slice(1)) {
            const txt = c.stages[k];
            const sx = colx(k) + (COLW - 184) / 2;
            const sh = 16 * Math.max(1, Math.ceil((txt.length + c.code.length + 2) / 27)) + 14;
            frag.push(`<div class="station" data-code="${c.code}" data-step="${k}" style="--c:${T[c.type].light};left:${sx}px;top:${y}px"><b>${esc(c.code)}</b>${esc(txt)}</div>`);
            h = Math.max(h, sh);
          }
          rowh = Math.max(rowh, h);
        }
        y += rowh + 16;
      }
      y += 18;
    }
    const H = y + 20;
    // band backgrounds go first (behind)
    const bg = D.bands.map((b, i) => `<div class="band ${i % 2 ? "b" : "a"}" style="left:${colx(b.steps[0])}px;top:${hdrY - 8}px;width:${COLW * b.steps.length}px;height:${H - hdrY}px"></div>`).join("");
    L.road.innerHTML = bg + frag.join("");
    L.road.querySelectorAll(".station").forEach(s => s.style.height = "auto");
    layouts.road = { pos, w: RX0 + W + 40, h: H, hidden };
    decorateRoad();
  }

  // =====================================================================
  //  Unlock-tree layout
  // =====================================================================
  function layoutTree() {
    const pos = {}, frag = [], edges = [];
    const kids = Object.fromEntries(CH.map(c => [c.code, []]));
    const secondary = [];
    const hasParent = new Set();
    for (const c of CH) {
      if (c.code === "UCC" || !c.requires.length) continue;
      const [p, lab] = c.requires[0];
      kids[p].push([c.code, lab]); hasParent.add(c.code);
      for (const [p2, l2] of c.requires.slice(1)) secondary.push([p2, c.code, l2]);
    }
    const roots = CH.filter(c => !hasParent.has(c.code) && kids[c.code].length && c.code !== "UCC").map(c => c.code);
    const solo = CH.filter(c => !hasParent.has(c.code) && !kids[c.code].length && c.code !== "UCC");
    const fsOr = c => { const f = firstStep(BY[c]); return f == null ? 99 : f; };
    for (const k in kids) kids[k].sort((a, b) => kids[b[0]].length - kids[a[0]].length || fsOr(a[0]) - fsOr(b[0]));

    function place(code, depth, y, x0) {
      const h = hC[code];
      if (!kids[code].length) { pos[code] = { x: x0 + depth * LX, y }; return y + h + VG; }
      const top = y; let cur = y;
      for (const [k] of kids[code]) cur = place(k, depth + 1, cur, x0);
      const f = kids[code][0][0], l = kids[code][kids[code].length - 1][0];
      const mid = (pos[f].y + pos[l].y + hC[l]) / 2;
      const py = Math.max(top, mid - h / 2);
      pos[code] = { x: x0 + depth * LX, y: py };
      return Math.max(cur, py + h + VG);
    }
    const X0 = 40, Y0 = 90;
    const big = roots.filter(r => r === "DRC" || r === "UUC");
    const small = roots.filter(r => !big.includes(r)).sort((a, b) => kids[b].length - kids[a].length);
    frag.push(`<div class="tree-title" style="left:${X0}px;top:${Y0 - 66}px;width:${5 * LX}px">Main unlock chains<small>Follow arrows backwards to see what you need first. Labels = how many, or which score.</small></div>`);
    let y = Y0;
    for (const r of big) y = place(r, 0, y, X0) + 30;
    const leftBottom = y;
    const X1 = X0 + 5 * LX + 40;
    frag.push(`<div class="tree-title" style="left:${X1}px;top:${Y0 - 66}px;width:${3 * LX}px">Smaller chains<small>Hard Mode unlocks after maxing the base challenge and reaching 10k ChP.</small></div>`);
    y = Y0;
    for (const r of small) y = place(r, 0, y, X1) + 22;
    // UCC cluster
    y += 24;
    frag.push(`<div class="tree-title" style="left:${X1}px;top:${y}px;width:${3 * LX}px">UCC needs all of these maxed<small>Click a pill to jump to it.</small></div>`);
    y += 56;
    const pillY = {};
    const ucc = BY.UCC;
    ucc.requires.forEach(([p], i) => {
      const py = y + i * 32;
      pillY[p] = py;
      frag.push(`<div class="pill" data-jump="${p}" style="left:${X1}px;top:${py}px;background:${T[BY[p].type].color}">all ${p}</div>`);
    });
    const pillsBottom = y + ucc.requires.length * 32;
    pos.UCC = { x: X1 + LX, y: (y + pillsBottom) / 2 - heights.UCC / 2 };
    for (const [p] of ucc.requires) edges.push({ x1: X1 + 120, y1: pillY[p] + 13, x2: pos.UCC.x, y2: pos.UCC.y + heights.UCC / 2, from: p, to: "UCC", color: T[BY[p].type].light, lab: "" });
    y = Math.max(pillsBottom, pos.UCC.y + heights.UCC) + 30;
    const rightBottom = y;
    // solo panel
    const PX = X1 + 3 * LX + 20, PC = 3, PW = BW + 18;
    frag.push(`<div class="tree-title" style="left:${PX}px;top:${Y0 - 66}px;width:${PC * PW}px">No challenge prerequisite<small>Unlocked by stats alone. Grouped by the guide's starting stage.</small></div>`);
    let sy = Y0;
    const bandsPlus = D.bands.map(b => [b.label, b.steps]).concat([["Not in the guide yet", [null]]]);
    for (const [label, steps] of bandsPlus) {
      const grp = solo.filter(c => steps.includes(firstStep(c)));
      if (!grp.length) continue;
      frag.push(`<div class="group-bar" style="left:${PX}px;top:${sy}px;width:${PC * PW - 18}px;height:28px;background:var(--surface-2);color:var(--fg)">${esc(label)}</div>`);
      sy += 38;
      for (let i = 0; i < grp.length; i += PC) {
        const row = grp.slice(i, i + PC);
        row.forEach((c, j) => pos[c.code] = { x: PX + j * PW, y: sy });
        sy += Math.max(...row.map(c => hC[c.code])) + VG;
      }
      sy += 14;
    }
    // edges
    const mid = code => ({ x: pos[code].x, y: pos[code].y + hC[code] / 2 });
    for (const p in kids) for (const [c, lab] of kids[p]) {
      edges.push({ x1: pos[p].x + BW, y1: mid(p).y, x2: pos[c].x, y2: mid(c).y, from: p, to: c, color: T[BY[p].type].light, lab });
    }
    for (const [p, c, lab] of secondary) edges.push({ x1: pos[p].x + BW, y1: mid(p).y, x2: pos[c].x, y2: mid(c).y, from: p, to: c, color: T[BY[p].type].light, lab, sec: true });
    const W = PX + PC * PW + 40, H = Math.max(leftBottom, rightBottom, sy) + 40;
    const svg = [`<svg class="edges" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`];
    for (const e of edges) {
      const dx = Math.max(40, (e.x2 - e.x1) / 2);
      const d = `M${e.x1},${e.y1} C${e.x1 + dx},${e.y1} ${e.x2 - dx},${e.y2} ${e.x2 - 6},${e.y2}`;
      svg.push(`<g data-from="${e.from}" data-to="${e.to}"><path d="${d}" stroke="${e.color}" class="${e.sec ? "sec" : ""}" marker-end="url(#arr)"/>` +
        (e.lab ? `<text x="${e.x2 - 12}" y="${e.y2 - 6}" text-anchor="end">${esc(e.lab)}</text>` : "") + `</g>`);
    }
    svg.push(`<defs><marker id="arr" viewBox="0 0 10 10" refX="4" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--fg-dim)" stroke="none"/></marker></defs></svg>`);
    L.tree.innerHTML = svg.join("") + frag.join("");
    layouts.tree = { pos, w: W, h: H, edges };
  }

  // =====================================================================
  //  Recommended list (needs an import)
  //  Only challenges the import shows as unlocked; one row each with the guide's next instruction.
  //  Sorted by the guide's reward rating, then by the guide's stage.
  // =====================================================================
  // How many completions a guide instruction asks for (null = no number in it)
  function stageTarget(txt, prev, cap, baseMax) {
    let m;
    if ((m = txt.match(/^(?:first|do)\s+(\d+)(?:\s*-\s*(\d+))?/i))) return +(m[2] || m[1]);
    if ((m = txt.match(/^next\s+(\d+)/i))) return prev + +m[1];
    if ((m = txt.match(/^(\d+)\s+for\b/i))) return +m[1];
    if ((m = txt.match(/^(\d+)(?:st|nd|rd|th)\b/i))) return +m[1];
    if ((m = txt.match(/up to #(\d+)/i))) return +m[1];
    if (/round 1/i.test(txt) && baseMax) return baseMax;
    if (/^(all|rest|finish|last \d+|the rest)|round 2/i.test(txt)) return cap;
    return null;
  }
  function recNext(c, st) {
    const steps = Object.keys(c.stages).map(Number).sort((a, b) => a - b);
    if (!steps.length) return null;
    const isDay = c.type === "D";
    const done = isDay ? (st.v > 0 ? 1 : 0) : (st.v || 0);
    const cap = st.cap || parseInt(c.max, 10) || Infinity;
    let prev = 0;
    for (let i = 0; i < steps.length; i++) {
      const k = steps[i], txt = c.stages[k], last = i === steps.length - 1;
      if (isDay) {
        if (/^every|^only redo/i.test(txt)) continue;                       // recurring re-runs: can't tell from the export
        const v = txt.match(/v\s?(\d+)/i);
        if (v) { if ((st.v || 0) >= +v[1]) continue; return { k, txt, target: "score v" + v[1] }; }
        if (st.v > 0 && (!last || /1st|first|unlock/i.test(txt))) continue;
        return { k, txt };
      }
      if (/not worth/i.test(txt) && !last) continue;
      const tgt = stageTarget(txt, prev, cap, parseInt(c.max, 10));
      if (tgt != null) { if (done >= tgt) { prev = tgt; continue; } return { k, txt, target: tgt }; }
      if (done > 0 && !last) continue;
      return { k, txt };
    }
    return null;
  }
  function layoutRec() {
    const pos = {}, frag = [];
    const vw = vp.getBoundingClientRect().width;
    const narrow = vw < 760;                       // phones: row goes under its box
    const X0 = narrow ? 16 : 40, GAP = 16;
    const RW = narrow ? Math.max(BW, vw - 2 * X0 - 16) : 560;
    const FW = narrow ? RW : BW + GAP + RW;         // full content width
    const W = X0 * 2 + FW + (narrow ? 0 : 40);
    let y = 30;
    if (!imp) {
      frag.push(`<div class="rec-empty" style="left:${X0}px;top:${y}px;width:${FW}px">
        <h2>What can I do next?</h2>
        <p>Import your statistics export and this tab lists every challenge you can start or continue right now, with what the guide says to aim for. It's sorted by how useful the guide rates the reward, then by the guide's stage.</p>
        <p>Only challenges the import can confirm are unlocked are listed. Import again after you finish a batch to refresh it.</p>
        <button type="button" class="btn primary" id="rec-import">Import stats</button></div>`);
      L.rec.innerHTML = frag.join("");
      layouts.rec = { pos, w: W, h: 400 };
      return;
    }
    const bandNow = currentBandIdx();
    const items = [];
    for (const c of CH) {
      const st = P.statusOf(c, imp);
      if (!["ready", "progress", "count", "score"].includes(st.s)) continue;
      if (st.s === "ready" && P.unlockState(c, imp) !== true) continue;
      const nx = recNext(c, st);
      if (!nx) continue;
      items.push({ c, st, nx, band: D.bands.indexOf(bandOfStep(nx.k)) });
    }
    items.sort((a, b) => (b.c.rewardRating || 0) - (a.c.rewardRating || 0) || a.nx.k - b.nx.k || CH.indexOf(a.c) - CH.indexOf(b.c));
    frag.push(`<div class="tree-title" style="left:${X0}px;top:${y}px;width:${FW}px">Available now for ${esc(imp.player || "you")} · ${items.length} challenges<small>Sorted by reward rating, then by the guide's stage. Unlocks the export can't confirm are left out.</small></div>`);
    y += 62;
    let lastR = -1;
    for (const it of items) {
      const r = it.c.rewardRating || 0;
      if (r !== lastR) {
        frag.push(`<div class="group-bar rec-h" style="left:${X0}px;top:${y}px;width:${FW}px;height:30px">${r ? `<span class="stars">${stars(r)}</span> reward` : "No reward rating (Hard Mode, Root)"}</div>`);
        y += 42; lastR = r;
      }
      const { c, st, nx, band } = it;
      pos[c.code] = { x: X0, y };
      let prog = "";
      if (st.s === "progress") prog = `You have <b>${st.v}/${st.cap}</b>`;
      else if (st.s === "count") prog = `You have <b>${st.v}</b> completions`;
      else if (st.s === "score") { const [fv, fc] = fmtPair(st.v, c.scoreCap ? c.scoreCap.value : null); prog = `Your best: <b>${fv}</b>` + (c.scoreCap ? ` · ChP maxes at <b>${/^v|god/.test(c.scoreCap.short) ? esc(c.scoreCap.short) : fc}</b>` : ""); }
      else prog = "Not started";
      if (typeof nx.target === "number" && nx.target < (st.cap || Infinity)) prog += ` · aim for <b>${nx.target}</b>`;
      else if (typeof nx.target === "string") prog += ` · aim for <b>${esc(nx.target)}</b>`;
      const ahead = bandNow != null && band > bandNow ? `<span class="tag ahead">Guide says later</span>` : "";
      const h = hC[c.code];
      const rx = narrow ? X0 : X0 + BW + GAP, ry = narrow ? y + h + 6 : y;
      frag.push(`<div class="rec-row" data-code="${c.code}" style="--c:${T[c.type].color};left:${rx}px;top:${ry}px;width:${RW}px;min-height:${narrow ? 0 : h}px">
        <div class="what">▶ ${esc(nx.txt)}</div>
        <div class="meta"><span class="tag">${esc(D.bands[band].label)}</span>${ahead}<span>${prog}</span></div>
        ${c.reward ? `<div class="rw">${esc(c.reward)}</div>` : ""}</div>`);
      y += narrow ? h + 6 + 16 * Math.ceil((nx.txt.length + 4) / 40) + (c.reward ? 18 * Math.ceil(c.reward.length / 48) : 0) + 58 : Math.max(h, 96) + 12;
    }
    L.rec.innerHTML = frag.join("");
    // second pass: stack everything using the real rendered heights
    let yy = 30;
    for (const el of L.rec.children) {
      if (el.classList.contains("rec-row")) {
        const code = el.dataset.code, h = hC[code];
        pos[code].y = yy;
        if (narrow) { el.style.top = (yy + h + 6) + "px"; yy += h + 6 + el.offsetHeight + 18; }
        else { el.style.top = yy + "px"; yy += Math.max(h, el.offsetHeight) + 12; }
      } else { el.style.top = yy + "px"; yy += el.offsetHeight + (el.classList.contains("rec-h") ? 12 : 22); }
    }
    layouts.rec = { pos, w: W, h: yy + 40 };
  }

  // =====================================================================
  //  Apply view
  // =====================================================================
  function placeBoxes() {
    const lay = layouts[view];
    L.boxes.classList.toggle("compact", view !== "road");
    for (const c of CH) {
      const p = lay.pos[c.code];
      if (p) boxes[c.code].style.transform = `translate(${p.x}px, ${p.y}px)`;
      boxes[c.code].classList.toggle("collapsed", !p || (view === "road" && lay.hidden && lay.hidden.has(c.code)));
    }
    world.style.width = lay.w + "px"; world.style.height = lay.h + "px";
  }
  function applyView(animate) {
    const lay = layouts[view];
    placeBoxes();
    L.road.classList.toggle("off", view !== "road");
    L.tree.classList.toggle("off", view !== "tree");
    L.rec.classList.toggle("off", view !== "rec");
    document.querySelectorAll(".seg button").forEach(b => b.setAttribute("aria-pressed", b.dataset.view === view));
    document.body.dataset.view = view;
    store.set("itrtg.view", view);
    if (!animate) L.boxes.querySelectorAll(".box").forEach(b => { b.style.transition = "none"; });
    applySelection();
    if (selCode && layouts[view].pos[selCode] && !(view === "road" && layouts.road.hidden.has(selCode))) centerOn(selCode, null, animate);
    else fitWidth(animate);
    if (!animate) requestAnimationFrame(() => requestAnimationFrame(() => L.boxes.querySelectorAll(".box").forEach(b => b.style.transition = "")));
  }
  function setView(v) { if (v === view) return; view = v; applyView(true); }
  function saveCollapsed() { store.set("itrtg.collapsed", JSON.stringify([...collapsed])); }
  function toggleGroup(key, open) {
    const want = open == null ? collapsed.has(key) : open;   // want = expanded
    if (want === !collapsed.has(key)) return false;
    want ? collapsed.delete(key) : collapsed.add(key);
    saveCollapsed();
    layoutRoad();
    if (view === "road") placeBoxes();
    applySelection();
    return true;
  }
  function expandFor(code) {
    const g = groupOf(BY[code]);
    return collapsed.has(g) ? toggleGroup(g, true) : false;
  }

  // =====================================================================
  //  Camera (pan / zoom)
  // =====================================================================
  // keep at least a strip of the chart on screen so it can't be scrolled off into empty space
  function clampCam(c) {
    const lay = layouts[view]; if (!lay) return c;
    const r = vp.getBoundingClientRect();
    const w = lay.w * c.k, h = lay.h * c.k;
    const mx = Math.min(240, r.width * 0.4), my = Math.min(240, r.height * 0.4);
    const x = Math.min(Math.max(c.x, mx - w), r.width - mx);
    const y = Math.min(Math.max(c.y, my - h), r.height - my);
    return { x, y, k: c.k };
  }
  function setCam(c, animate) {
    cam = clampCam(c);
    world.classList.toggle("cam-anim", !!animate);
    world.style.transform = `translate(${cam.x}px, ${cam.y}px) scale(${cam.k})`;
    if (animate) setTimeout(() => world.classList.remove("cam-anim"), 750);
  }
  const clampK = k => Math.min(2.5, Math.max(0.12, k));
  function fitWidth(animate) {
    const lay = layouts[view], r = vp.getBoundingClientRect();
    const k = clampK(Math.min(1, Math.max((r.width - 32) / lay.w, r.width > 720 ? 0.72 : 0.5)));
    const x = lay.w * k <= r.width ? (r.width - lay.w * k) / 2 : 8;
    setCam({ x, y: 12, k }, animate);
  }
  function fitAll(animate) {
    const lay = layouts[view], r = vp.getBoundingClientRect();
    const k = clampK(Math.min((r.width - 32) / lay.w, (r.height - 24) / lay.h));
    setCam({ x: (r.width - lay.w * k) / 2, y: (r.height - lay.h * k) / 2, k }, animate);
  }
  function zoomAt(f, cx, cy, animate) {
    const k = clampK(cam.k * f);
    const wx = (cx - cam.x) / cam.k, wy = (cy - cam.y) / cam.k;
    setCam({ x: cx - wx * k, y: cy - wy * k, k }, animate);
  }
  function centerOn(code, k, animate = true) {
    const p = layouts[view].pos[code], r = vp.getBoundingClientRect();
    const drawerW = $("#drawer").classList.contains("open") && r.width > 720 ? $("#drawer").offsetWidth : 0;
    const drawerH = $("#drawer").classList.contains("open") && r.width <= 720 ? $("#drawer").offsetHeight : 0;
    k = clampK(k || Math.max(cam.k, 0.9));
    const cx = (r.width - drawerW) / 2, cy = (r.height - drawerH) / 2;
    setCam({ x: cx - (p.x + BW / 2) * k, y: cy - (p.y + hOf(code) / 2) * k, k }, animate);
  }

  // pointer handling: drag to pan, pinch to zoom, click passes through when not dragged
  const pts = new Map(); let drag = null, moved = false;
  vp.addEventListener("pointerdown", e => {
    if (e.target.closest("a, button, input, textarea, .legend, .zoom, .credit, .drawer")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;   // only the left button pans
    // stop the browser from starting a text selection or a native drag of whatever is under the cursor
    if (e.pointerType === "mouse") e.preventDefault();
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) { drag = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y }; moved = false; }
    if (pts.size === 2) {
      const [a, b] = [...pts.values()];
      drag = { pinch: Math.hypot(a.x - b.x, a.y - b.y), k: cam.k, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, cx: cam.x, cy: cam.y };
    }
  });
  vp.addEventListener("pointermove", e => {
    if (!pts.has(e.pointerId) || !drag) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const r = vp.getBoundingClientRect();
    if (drag.pinch && pts.size === 2) {
      const [a, b] = [...pts.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const k = clampK(drag.k * d / drag.pinch);
      const mx = drag.mx - r.left, my = drag.my - r.top;
      const wx = (mx - drag.cx) / drag.k, wy = (my - drag.cy) / drag.k;
      setCam({ x: mx - wx * k, y: my - wy * k, k });
      moved = true;
    } else if (!drag.pinch) {
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!moved && Math.hypot(dx, dy) < 5) return;
      if (!moved) { moved = true; vp.setPointerCapture(e.pointerId); vp.classList.add("dragging"); }
      setCam({ x: drag.cx + dx, y: drag.cy + dy, k: cam.k });
    }
  });
  // keyboard focus / find-in-page can scroll the clipped viewport; turn that into a camera pan instead
  const pane = $("#pane");
  pane.addEventListener("scroll", () => {
    if (!pane.scrollLeft && !pane.scrollTop) return;
    setCam({ x: cam.x - pane.scrollLeft, y: cam.y - pane.scrollTop, k: cam.k });
    pane.scrollLeft = 0; pane.scrollTop = 0;
  });
  vp.addEventListener("dragstart", e => { if (!e.target.closest(".drawer, .legend")) e.preventDefault(); });
  vp.addEventListener("mousedown", e => { if (e.button === 0 && !e.target.closest("a, button, input, textarea, .legend, .zoom, .credit, .drawer")) e.preventDefault(); });
  const endPtr = e => { pts.delete(e.pointerId); if (!pts.size) { drag = null; vp.classList.remove("dragging"); } };
  vp.addEventListener("pointerup", endPtr); vp.addEventListener("pointercancel", endPtr);
  vp.addEventListener("wheel", e => {
    e.preventDefault();
    const r = vp.getBoundingClientRect();
    if (e.ctrlKey || e.metaKey || e.altKey) zoomAt(Math.exp(-e.deltaY * 0.0022), e.clientX - r.left, e.clientY - r.top);
    else if (e.shiftKey && !e.deltaX) setCam({ x: cam.x - e.deltaY, y: cam.y, k: cam.k });
    else setCam({ x: cam.x - e.deltaX, y: cam.y - e.deltaY, k: cam.k });
  }, { passive: false });
  // clicks on boxes / stations / pills
  vp.addEventListener("click", e => {
    if (moved) { moved = false; return; }
    const gb = e.target.closest(".group-bar.toggle");
    if (gb) { toggleGroup(gb.dataset.group); return; }
    if (e.target.closest("#rec-import")) { openModal(); return; }
    const b = e.target.closest(".box, .station, .track, .pill, .rec-row");
    if (!b) return;
    const code = b.dataset.jump || b.dataset.code;
    if (code === selCode && !b.dataset.jump) { deselect(); return; }
    select(code, !!b.dataset.jump);
  });
  vp.addEventListener("keydown", e => {
    const gb = e.target.closest(".group-bar.toggle");
    if (gb && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggleGroup(gb.dataset.group); return; }
    const b = e.target.closest(".box");
    if (b && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); b.dataset.code === selCode ? deselect() : select(b.dataset.code, false); }
  });

  // =====================================================================
  //  Search + highlight
  // =====================================================================
  let selCode = null;
  const input = $("#search"), list = $("#suggest");
  const index = CH.map(c => ({ code: c.code, name: c.name, type: c.type }))
    .concat(D.roots.map(r => ({ code: r.code, name: "Root " + BY[r.code.slice(1)]?.name, type: "R", target: "ROOT" })));
  function rank(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    const out = [];
    for (const it of index) {
      const c = it.code.toLowerCase(), n = (it.name || "").toLowerCase();
      let s = -1;
      if (c === q) s = 0; else if (c.startsWith(q)) s = 1; else if (n.split(/\s+/).some(w => w.startsWith(q))) s = 2;
      else if (c.includes(q)) s = 3; else if (n.includes(q)) s = 4;
      else { const ini = n.split(/\s+/).map(w => w[0]).join(""); if (ini.startsWith(q)) s = 2.5; }
      if (s >= 0) out.push([s, it]);
    }
    return out.sort((a, b) => a[0] - b[0] || a[1].code.length - b[1].code.length).slice(0, 9).map(x => x[1]);
  }
  let sel = 0, results = [];
  function renderSuggest() {
    results = rank(input.value);
    list.hidden = !results.length;
    list.innerHTML = results.map((r, i) => `<li role="option" id="opt-${i}" aria-selected="${i === sel}" data-i="${i}"><span class="dot" style="background:${T[r.type].color}"></span><b>${esc(r.code)}</b><span>${esc(r.name)}</span></li>`).join("");
    input.setAttribute("aria-expanded", String(!list.hidden));
  }
  input.addEventListener("input", () => { sel = 0; renderSuggest(); });
  input.addEventListener("keydown", e => {
    if (e.key === "ArrowDown") { sel = Math.min(sel + 1, results.length - 1); renderSuggest(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { sel = Math.max(sel - 1, 0); renderSuggest(); e.preventDefault(); }
    else if (e.key === "Enter" && results[sel]) { choose(results[sel]); e.preventDefault(); }
    else if (e.key === "Escape") { list.hidden = true; deselect(); }
  });
  list.addEventListener("pointerdown", e => { const li = e.target.closest("li"); if (li) { e.preventDefault(); choose(results[+li.dataset.i]); } });
  input.addEventListener("blur", () => setTimeout(() => list.hidden = true, 120));
  $("#search-clear").addEventListener("click", () => { list.hidden = true; deselect(); input.focus(); });
  function choose(r) {
    input.value = r.code + " · " + r.name;
    list.hidden = true;
    select(r.target || r.code, true, r.code + " · " + r.name);
  }
  function ancestors(code, set = new Set()) {
    for (const [p] of BY[code].requires) if (!set.has(p)) { set.add(p); ancestors(p, set); }
    return set;
  }
  // One selected challenge at a time. Tree view dims everything except it and its unlock path;
  // Roadmap and Recommended only ring it.
  function select(code, move, label) {
    if (!BY[code]) return;
    selCode = code;
    input.value = label || (code === "ROOT" ? "Root challenges" : code + " · " + BY[code].name);
    if (view === "road") expandFor(code);
    openInfo(code);
    applySelection();
    const lay = layouts[view];
    const onScreen = lay.pos[code] && !(view === "road" && lay.hidden.has(code));
    if (onScreen && (move || isCovered(code))) centerOn(code);
  }
  function deselect() {
    selCode = null;
    input.value = "";
    closeInfo();
    applySelection();
  }
  // true when the box is off-screen or under the details panel
  function isCovered(code) {
    const r = boxes[code].getBoundingClientRect(), v = vp.getBoundingClientRect();
    const d = drawer.getBoundingClientRect();
    const right = drawer.classList.contains("open") && v.width > 720 ? d.left : v.right;
    const bottom = drawer.classList.contains("open") && v.width <= 720 ? d.top : v.bottom;
    return r.left < v.left || r.right > right || r.top < v.top || r.bottom > bottom;
  }
  function applySelection() {
    document.querySelectorAll(".dim, .hit, .path, .on, .box.sel").forEach(el => el.classList.remove("dim", "hit", "path", "on", "sel"));
    if (!selCode) return;
    boxes[selCode].classList.add("hit");
    if (view !== "tree") return;
    const path = ancestors(selCode);
    for (const c of CH) {
      const b = boxes[c.code];
      if (path.has(c.code)) b.classList.add("path");
      else if (c.code !== selCode) b.classList.add("dim");
    }
    L.tree.querySelectorAll("svg.edges g").forEach(g => {
      const onPath = (g.dataset.to === selCode || path.has(g.dataset.to)) && path.has(g.dataset.from);
      g.classList.add(onPath ? "on" : "dim");
    });
    L.tree.querySelectorAll(".pill").forEach(p => {
      const k = p.dataset.jump;
      p.classList.add(k === selCode ? "hit" : path.has(k) ? "path" : "dim");
    });
  }

  // =====================================================================
  //  Details drawer
  // =====================================================================
  const drawer = $("#drawer");

  function currentBandIdx() {
    if (!imp || imp.stats.chp == null) return null;
    const v = imp.stats.chp;
    return v <= 0 ? 0 : v < 3000 ? 1 : v < 10000 ? 2 : v < 25000 ? 3 : v < 35000 ? 4 : 5;
  }
  function condText(k) {
    if (k.ch) return `${k.n} ${k.ch}`;
    if (k.score) return `${BY[k.score].code} score ≥ ${fmt(k.min)}`;
    if (k.stat) {
      const names = { maxClones: "max clones", cp: "Crystal Power", cc: "Creation Count", lightClones: "Light Clones", pets: "unlocked pets",
        petGrowth: "total pet growth", chp: "ChP", bsTotal: "Building Speed %", csGP: "Creation Speed % from GP", bsGP: "Building Speed % from GP",
        pbaal: "P.Baal version", rtiPermMin: "lowest RTI perm level", v4Defeated: "ITRTGv4 defeated", v4Hours: "fastest ITRTGv4 (hours)" };
      if (k.stat === "v4Defeated") return "Defeat ITRTGv4";
      if (k.max != null) return `${names[k.stat] || k.stat} < ${k.max}`;
      return `${fmt(k.min)} ${names[k.stat] || k.stat}`;
    }
    if (k.note) return k.note;
    if (k.any) return k.any.map(condText).join(" or ");
    return "";
  }
  function haveText(k) {
    if (!imp) return "";
    if (k.ch) return imp.done[k.ch] != null ? `have ${imp.done[k.ch]}` : "";
    if (k.score) return imp.scores[k.score] != null ? `best ${fmt(imp.scores[k.score])}` : "not played";
    if (k.stat) { const v = imp.stats[k.stat]; if (v == null) return ""; if (k.stat === "v4Hours") return `best ${v.toFixed(2)}h`; return k.stat === "v4Defeated" ? "" : `have ${fmt(v)}`; }
    if (k.any) return k.any.map(haveText).filter(Boolean).join(", ");
    return "can't tell from the export";
  }
  function openInfo(code) {
    const c = BY[code]; if (!c) return;
    const t = T[c.type];
    drawer.style.setProperty("--c", t.color);
    const st = P.statusOf(c, imp);
    const bandNow = currentBandIdx();
    const parts = [];
    // progress
    if (imp) {
      let prog = "";
      const scoreBar = (v, cap) => {
        const pct = Math.min(100, cap > 1e6 ? 100 * Math.log10(Math.max(v, 1)) / Math.log10(cap) : 100 * v / cap);
        const [fv, fc] = fmtPair(v, cap);
        return `<div class="prog"><div class="barx"><i style="width:${pct}%"></i></div><b>${fv} / ${fc}</b></div>`;
      };
      if (st.score) prog = scoreBar(st.v, st.cap) + `<p class="muted" style="margin:6px 0 0">Best score has reached the ChP cap (${esc(c.scoreCap.label)} = ${c.scoreCap.chp} ChP). Other parts of the reward can still grow.</p>`;
      else if (st.s === "done" || st.s === "progress") {
        const pct = Math.min(100, 100 * st.v / st.cap);
        prog = `<div class="prog"><div class="barx"><i style="width:${pct}%"></i></div><b>${st.v} / ${st.cap}</b></div>`;
      } else if (st.s === "count") prog = `<p><b>${st.v}</b> completions</p>`;
      else if (st.s === "score") prog = (st.cap != null ? scoreBar(st.v, st.cap) : "") + `<p class="muted" style="margin:6px 0 0">Best score <b>${fmt(st.v)}</b>${c.scoreCap ? `. ChP stops increasing at ${esc(c.scoreCap.label)} (${c.scoreCap.chp} ChP)` : ""}.</p>`;
      else if (c.type === "HM") prog = `<p class="muted">The export only lists Hard Mode points in total (you have <b>${imp.stats.hmChp ?? "?"}</b>), not per challenge.</p>`;
      else if (c.code === "ROOT") prog = `<p class="muted">Root challenges aren't listed in the export.</p>`;
      else prog = `<p class="muted">${st.v === 0 ? "0 completions." : "Not in your export."}</p>`;
      const checks = (c.check || []).map(k => {
        const r = P.evalCond(k, imp);
        const m = r === true ? '<span class="m y">✓</span>' : r === false ? '<span class="m n">✗</span>' : '<span class="m q">?</span>';
        const h = haveText(k);
        return `<li>${m}<span>${esc(condText(k))}${h ? ` <small>(${esc(h)})</small>` : ""}</span></li>`;
      }).join("");
      parts.push(`<section><h3>Your progress · ${esc(imp.player || "imported")}</h3>${prog}${checks ? `<h3 style="margin-top:12px">Unlock check</h3><ul class="checks">${checks}</ul>` : ""}</section>`);
    }
    // at a glance
    parts.push(`<section><h3>At a glance</h3><dl>
      <dt>Unlock</dt><dd>${esc(c.unlock.join("; "))}</dd>
      <dt>${c.scoreCap ? "ChP cap" : "Max"}</dt><dd>${c.scoreCap ? `${esc(c.scoreCap.label)} (${c.scoreCap.chp} ChP)` : esc(c.max)}</dd>
      ${c.chp ? `<dt>ChP each</dt><dd>${esc(c.chp)}</dd>` : ""}
      ${c.playstyle ? `<dt>Playstyle</dt><dd>${esc(c.playstyle)}</dd>` : ""}
      ${c.reward ? `<dt>Reward</dt><dd>${c.rewardRating ? `<span class="stars">${stars(c.rewardRating)}</span> ` : ""}${esc(c.reward)}</dd>` : ""}
    </dl></section>`);
    // timeline
    const st2 = Object.keys(c.stages).map(Number).sort((a, b) => a - b);
    if (st2.length) {
      parts.push(`<section><h3>When the guide says to do it</h3><ul class="timeline">${st2.map(k => {
        const bi = D.bands.indexOf(bandOfStep(k));
        return `<li class="${bi === bandNow ? "cur" : ""}"><span>${esc(D.bands[bi].label)}</span><span>${esc(c.stages[k])}</span></li>`;
      }).join("")}</ul>${c.notes ? `<p style="margin:10px 0 0">${esc(c.notes)}</p>` : ""}</section>`);
    } else if (c.notes) parts.push(`<section><h3>Notes</h3><p style="margin:0">${esc(c.notes)}</p></section>`);
    // unlock path
    const needs = c.requires.map(([p, l]) => `<button class="chip" style="--c:${T[BY[p].type].color}" data-go="${p}">${p} <small>${esc(l)}</small></button>`).join("");
    const unlocks = CH.filter(x => x.requires.some(([p]) => p === code)).map(x => `<button class="chip" style="--c:${T[x.type].color}" data-go="${x.code}">${x.code}</button>`).join("");
    if (needs || unlocks) parts.push(`<section><h3>Unlock path</h3>${needs ? `<p class="muted" style="margin:0 0 6px">Needs</p><div class="chips">${needs}</div>` : ""}${unlocks ? `<p class="muted" style="margin:10px 0 6px">Leads to</p><div class="chips">${unlocks}</div>` : ""}</section>`);
    // root list
    if (code === "ROOT") parts.push(`<section><h3>The eleven Root challenges</h3><ul class="links">${D.roots.map(r => `<li><a href="${esc(r.wiki)}" target="_blank" rel="noopener">${esc(r.code)} <span class="muted">(${esc(r.kind)})</span></a></li>`).join("")}</ul></section>`);
    // links
    const links = [[`${c.name} on the wiki`, c.wiki]].concat(c.tools || []);
    parts.push(`<section><h3>Guides & tools</h3><ul class="links">${links.map(([l, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(l)}</a></li>`).join("")}</ul></section>`);
    // wiki excerpts
    const w = c.wikiInfo || {};
    const wl = [["desc", "Description"], ["restr", "Restrictions"], ["rec", "Recommended stats"], ["strat", "Strategy"]].filter(([k]) => w[k]);
    if (wl.length) parts.push(`<section class="wiki"><h3>From the wiki</h3>${wl.map(([k, h], i) =>
      i === 0 ? `<p>${esc(w[k])}</p>` : `<details${k === "strat" ? "" : ""}><summary>${h}</summary><p>${esc(w[k])}</p></details>`).join("")}
      <p class="muted" style="font-size:12px">Shortened excerpts from <a href="${esc(c.wiki)}" target="_blank" rel="noopener">${esc(c.name)}</a> by ITRTG Wiki contributors, licensed <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>. Read the full page for everything.</p></section>`);

    // change history (from the wiki page's History section)
    const hist = c.history || [];
    const cl = D.sources.changelog;
    parts.push(`<section class="wiki"><details${hist.length ? "" : ""}><summary>Change history${hist.length ? ` <span class="muted">(${hist.length})</span>` : ""}</summary>
      ${hist.length ? `<ul class="hist">${hist.map(h => `<li>${esc(h)}</li>`).join("")}</ul>` : `<p class="muted">The wiki page has no history notes for this challenge.</p>`}
      <p class="muted" style="font-size:12px">${hist.length ? `From the History section of <a href="${esc(c.wiki)}" target="_blank" rel="noopener">${esc(c.name)}</a> (CC BY-SA 4.0). ` : ""}Full record: <a href="${esc(cl.url)}" target="_blank" rel="noopener">${esc(cl.label)}</a>.</p></details></section>`);

    $("#drawer-head").innerHTML = `<div class="row"><h2>${esc(code === "ROOT" ? "Root" : code)}</h2><span class="type">${esc(t.label)}</span><button class="x" id="drawer-x" aria-label="Close details">×</button></div><p>${esc(c.name)}</p>`;
    $("#drawer-body").innerHTML = parts.join("");
    $("#drawer-body").scrollTop = 0;
    drawer.classList.add("open");
    vp.classList.add("drawer-open");
    try { history.replaceState(null, "", "#" + code); } catch (e) { }
    drawer.setAttribute("aria-hidden", "false");
    $("#drawer-x").addEventListener("click", deselect);
  }
  function closeInfo() {
    drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true");
    vp.classList.remove("drawer-open");
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { }
  }
  drawer.addEventListener("click", e => {
    const go = e.target.closest("[data-go]");
    if (go) select(go.dataset.go, true);
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !$("#modal").hidden) { closeModal(); return; }
    if (e.key === "Escape" && selCode) deselect();
    if (e.key === "/" && document.activeElement !== input && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
  });

  // =====================================================================
  //  Import
  // =====================================================================
  const modal = $("#modal");
  function openModal() { modal.hidden = false; $("#import-text").focus(); $("#import-result").hidden = true; }
  function closeModal() { modal.hidden = true; }
  $("#btn-import").addEventListener("click", openModal);
  $("#import-cancel").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  $("#import-go").addEventListener("click", () => {
    const text = $("#import-text").value;
    const r = P.parseExport(text, CH);
    const out = $("#import-result");
    out.hidden = false;
    if (r.error) { out.className = "result err"; out.textContent = r.error; return; }
    store.set("itrtg.export", text);
    applyImport(r, true);
    const counts = summarize();
    out.className = "result";
    out.innerHTML = `Imported <b>${esc(r.player || "your stats")}</b>: ${r.found} challenge lines. ${counts}` +
      (r.unknown.length ? `<br><span class="muted">Not recognized (maybe a new challenge): ${esc(r.unknown.join("; "))}</span>` : "");
    setTimeout(closeModal, r.unknown.length ? 2600 : 900);
  });
  $("#import-text").addEventListener("keydown", e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) $("#import-go").click(); });
  function summarize() {
    const n = { done: 0, progress: 0, ready: 0, locked: 0 };
    for (const c of CH) { const s = P.statusOf(c, imp).s; if (s in n) n[s]++; }
    return `${n.done} maxed, ${n.progress} in progress, ${n.ready} ready to start, ${n.locked} locked.`;
  }
  function chipText(s) {
    switch (s.s) {
      case "done": return s.score ? ["✓ ChP maxed", "done"] : ["✓ " + s.v + "/" + s.cap, "done"];
      case "progress": return [s.v + "/" + s.cap, ""];
      case "count": return ["×" + s.v, ""];
      case "score": return [s.cap != null ? fmtPair(s.v, s.cap).join(" / ") : "best " + fmt(s.v), ""];
      case "ready": return ["Ready", "ready"];
      case "locked": return ["Locked", "locked"];
      case "maybe": return ["? check", "maybe"];
      default: return null;
    }
  }
  function applyImport(r, autoCollapse) {
    imp = r;
    for (const c of CH) {
      const s = P.statusOf(c, imp);
      const el = boxes[c.code], chip = el.querySelector(".st");
      const ct = chipText(s);
      if (ct) { chip.hidden = false; chip.textContent = ct[0]; chip.className = "st " + ct[1]; chip.title = s.s === "maybe" ? "Everything the export shows is met. Still check: " + (c.check || []).filter(k => P.evalCond(k, imp) === null).map(condText).join("; ") : s.s === "locked" ? "Not met: " + (c.check || []).filter(k => P.evalCond(k, imp) === false).map(condText).join("; ") : ""; }
      else chip.hidden = true;
      el.classList.toggle("is-done", s.s === "done");
      el.classList.toggle("is-locked", s.s === "locked");
      el.classList.toggle("is-maybe", s.s === "maybe");
    }
    const bi = currentBandIdx();
    $("#player").hidden = false;
    $("#player-text").innerHTML = `<b>${esc(r.player || "Imported")}</b> · ${fmt(r.stats.chp)} ChP${bi != null ? " · " + esc(D.bands[bi].label) : ""}`;
    if (autoCollapse) {
      // collapse every Roadmap group whose challenges are all maxed; expand the rest
      const groups = {};
      for (const c of CH) (groups[groupOf(c)] = groups[groupOf(c)] || []).push(c);
      collapsed = new Set(Object.keys(groups).filter(g => groups[g].every(c => P.statusOf(c, imp).s === "done")));
      saveCollapsed();
      layoutRoad();
      if (view === "road") placeBoxes();
    } else decorateRoad();
    decorateTree();
    layoutRec();
    if (view === "rec") placeBoxes();
    if (selCode) openInfo(selCode);
    applySelection();
  }
  // import-dependent decorations on the Roadmap layer (re-run after every re-layout)
  function decorateRoad() {
    const st = {};
    if (imp) for (const c of CH) st[c.code] = P.statusOf(c, imp).s;
    L.road.querySelectorAll("[data-code]").forEach(el => el.classList.toggle("is-done", st[el.dataset.code] === "done"));
    const bi = currentBandIdx();
    L.road.querySelectorAll(".band-h").forEach(h => h.classList.toggle("here", +h.dataset.band === bi));
    L.road.querySelectorAll(".here-flag").forEach(x => x.remove());
    if (bi != null) {
      const h = L.road.querySelector(`.band-h[data-band="${bi}"]`);
      const f = document.createElement("div");
      f.className = "here-flag"; f.textContent = "You are here";
      f.style.left = (parseFloat(h.style.left) + parseFloat(h.style.width) / 2) + "px";
      f.style.top = (parseFloat(h.style.top) - 14) + "px";
      L.road.appendChild(f);
    }
    L.road.querySelectorAll(".group-bar.toggle").forEach(g => {
      const key = g.dataset.group, members = CH.filter(c => groupOf(c) === key);
      const tracked = members.filter(c => imp && ["done", "progress", "ready", "locked", "maybe", "score"].includes(st[c.code]) && c.type !== "HM" && c.code !== "ROOT" && !(imp.cap[c.code] >= 9999) && (c.type !== "D" || c.scoreCap));
      const done = tracked.filter(c => st[c.code] === "done").length;
      const m = g.querySelector(".maxed");
      m.hidden = !imp || !tracked.length;
      if (!m.hidden) m.textContent = (done === tracked.length ? `All ${done} maxed` : `${done}/${tracked.length} maxed`) + (key === "D" ? " (ChP)" : "");
      const hm = g.querySelector(".hm-points");
      if (hm) { hm.hidden = !imp || imp.stats.hmChp == null; if (!hm.hidden) hm.textContent = `${imp.stats.hmChp} HM points`; }
    });
  }
  function decorateTree() {
    L.tree.querySelectorAll(".pill").forEach(p => p.classList.toggle("is-done", !!imp && P.statusOf(BY[p.dataset.jump], imp).s === "done"));
  }
  function clearImport() {
    imp = null; store.set("itrtg.export", null);
    for (const c of CH) { boxes[c.code].querySelector(".st").hidden = true; boxes[c.code].classList.remove("is-done", "is-locked", "is-maybe"); }
    $("#player").hidden = true;
    decorateRoad(); decorateTree();
    layoutRec();
    if (view === "rec") placeBoxes();
    if (selCode) openInfo(selCode);
  }
  $("#player-clear").addEventListener("click", clearImport);

  // =====================================================================
  //  Legend + misc controls
  // =====================================================================
  function buildLegend() {
    $("#legend-types").innerHTML = GROUP_ORDER.map(k => `<li><span class="sw" style="background:${T[k].color}"></span><span><b>${esc(T[k].label)}</b> <span class="muted">${esc(T[k].blurb)}</span></span></li>`).join("");
    const s = D.sources;
    $("#legend-sources").innerHTML = `<li>Order &amp; timing: <a href="${s.guide.url}" target="_blank" rel="noopener">${esc(s.guide.label)}</a> by ${esc(s.guide.by)} (${esc(s.guide.date)})</li>
      <li>Calculators: <a href="${s.compiled.url}" target="_blank" rel="noopener">${esc(s.compiled.label)}</a></li>
      <li>Unlocks &amp; excerpts: <a href="${s.wiki.url}" target="_blank" rel="noopener">${esc(s.wiki.label)}</a> by ITRTG Wiki contributors, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>. Excerpts are shortened.</li>
      <li><a href="${s.helper.url}" target="_blank" rel="noopener">${esc(s.helper.label)}</a></li>
      <li class="muted">Data checked ${esc(D.updated)}</li>`;
    $("#credit").innerHTML = `Order from the <a href="${s.guide.url}" target="_blank" rel="noopener">Challenge Guide</a> by ${esc(s.guide.by)} · data from the <a href="${s.wiki.url}" target="_blank" rel="noopener">ITRTG wiki</a>`;
  }
  const legend = $("#legend");
  $("#btn-legend").addEventListener("click", () => { legend.hidden = !legend.hidden; store.set("itrtg.legend", legend.hidden ? "0" : "1"); });
  $("#legend-close").addEventListener("click", () => { legend.hidden = true; store.set("itrtg.legend", "0"); });
  $("#opt-dim").addEventListener("change", e => { document.body.classList.toggle("no-dim", !e.target.checked); store.set("itrtg.dim", e.target.checked ? "1" : "0"); });
  document.querySelectorAll(".seg button").forEach(b => b.addEventListener("click", () => setView(b.dataset.view)));
  $("#z-in").addEventListener("click", () => { const r = vp.getBoundingClientRect(); zoomAt(1.25, r.width / 2, r.height / 2, true); });
  $("#z-out").addEventListener("click", () => { const r = vp.getBoundingClientRect(); zoomAt(0.8, r.width / 2, r.height / 2, true); });
  $("#z-fit").addEventListener("click", () => fitAll(true));
  let rsz; window.addEventListener("resize", () => { clearTimeout(rsz); rsz = setTimeout(() => { layoutRec(); if (view === "rec") placeBoxes(); fitWidth(false); }, 150); });

  // =====================================================================
  //  Boot
  // =====================================================================
  function boot() {
    buildLegend();
    buildBoxes();
    layoutRoad();
    layoutTree();
    layoutRec();
    lastSig = sizeSig();
    applyView(false);
    if ("ResizeObserver" in window) { const ro = new ResizeObserver(scheduleRelayout); CH.forEach(c => ro.observe(boxes[c.code])); }
    if (document.fonts) { document.fonts.addEventListener("loadingdone", scheduleRelayout); document.fonts.ready.then(scheduleRelayout); }
    if (store.get("itrtg.legend") === "1") legend.hidden = false;
    if (store.get("itrtg.dim") === "0") { $("#opt-dim").checked = false; document.body.classList.add("no-dim"); }
    const saved = store.get("itrtg.export");
    if (saved) { const r = P.parseExport(saved, CH); if (!r.error) applyImport(r); }
    const h = (location.hash || "").slice(1).toUpperCase();
    const hit = h && CH.find(c => c.code.toUpperCase() === h);
    if (hit) select(hit.code, true);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
