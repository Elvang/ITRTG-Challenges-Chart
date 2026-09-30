# ITRTG Challenge Chart

An interactive chart of the recommended challenge order for *Idling to Rule the Gods*, plus the unlock tree for every challenge.

- **Roadmap**: when the community guide says to start each challenge, and when to come back for more.
- **Unlock tree**: what you need to unlock each challenge, following the arrows backwards.
- **Recommended**: after you import your stats, lists only the challenges you can start or continue right now, with what the guide says to aim for next. It's sorted by the guide's reward rating, then by stage. Challenges whose unlock the export can't confirm are left out.
- **Search**: type a code or a name (`UBC`, `pet`, `crystal`). The tree view highlights the whole unlock path.
- **Details**: click any box for the unlock requirements, reward, guide timing, wiki excerpts, and links to calculators.
- **Import stats**: paste the in-game statistics export. Maxed challenges fade out, and each box shows your count, your best score, or whether you can start it yet. The export is saved only in your own browser.

## Files

| File | What it is |
|---|---|
| `index.html` | Page shell |
| `style.css` | Styles (dark by default, light when your system is set to light) |
| `challenges.js` | **All challenge data.** This is the file to edit. |
| `stats-parser.js` | Reads the statistics export text |
| `app.js` | Layouts, animation, search, details panel |

No build step and no dependencies. Open `index.html` directly, or host the folder anywhere static.

Deep links work: `…/#UBC` opens the chart with UBC selected.

## Updating the data

Everything lives in `challenges.js`. The header comment explains every field. Common edits:

- **The guide changes a timing:** edit that challenge's `stages`. Keys are steps 0–10:
  - 0 = After Tutorial
  - 1–2 = <3k ChP
  - 3–4 = 3k–10k ChP
  - 5–6 = 10k–25k ChP
  - 7–8 = 25k–35k ChP
  - 9–10 = 35k+ ChP
- **A new challenge is added to the game:**
  1. Copy an existing entry and change the fields.
  2. Set `export` to the exact name the statistics export uses, for example `"Class Experience Challenges"`.
  3. If the guide doesn't cover it yet, leave `stages` empty. It will show in the "New" row.
- **Unlock requirements change:** edit `unlock` (the text shown) and `check` (what the import tests). `requires` draws the arrows in the tree: the first entry is the parent, and any others become dashed links.

If an import says a line was "not recognized", the game has probably renamed a challenge or added a new one. Fix the `export` name in `challenges.js`.

## Credits

- Challenge order and timing: [ITRTG Challenge Guide](https://docs.google.com/spreadsheets/d/1nz1_oKo0WvRaBNrRkeHX5hY5w9iHQoyigKt-0cWnmXk/edit?gid=0#gid=0) by Sim, Realtum and Bulborbish.
- Calculators: [ITRTG Compiled](https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit) spreadsheet.
- Unlock conditions, max completions and excerpts: [ITRTG Wiki](https://itrtg.wiki.gg/wiki/Challenges).
- Built with help from Claude (Anthropic).

## Licensing

- The wiki excerpts (the `wikiInfo` text in `challenges.js`) are shortened from pages on the [ITRTG Wiki](https://itrtg.wiki.gg/) by its contributors, licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Those excerpts, and any changes to them, stay under CC BY-SA 4.0.
- Each excerpt links back to its wiki page in the details panel.
