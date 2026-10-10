// =====================================================================
//  ITRTG Challenge Chart - DATA FILE
//  This is the only file you normally need to edit.
//
//  Per challenge:
//    code, name, type (N, MR, GP, D, U, HM, R), wiki (URL)
//    unlock      : text lines shown in boxes
//    requires    : [[code, arrow label], ...]  first = tree parent, rest = dashed links
//    max, playstyle (Lazy/Moderate/Semi-active/Active), rewardRating (1-5, from the guide), notes
//    (what each challenge rewards lives in rewards.js, not here)
//    chp         : ChP per completion (from the guide)
//    stages      : { step: "guide text" }  steps 0..10, see BANDS below
//    check       : unlock conditions used by the stats import:
//                   {ch:"DRC", n:5}          5 DRC completions
//                   {stat:"maxClones", min}  a stat from the export (see app.js STAT_PARSERS)
//                   {stat:"planetLevel", min:5}  worked out by stats-parser.js (UUC, DBC, ChP levels)
//                   {score:"RTI", min:140}   a day-challenge best score
//                   {note:"text"}            can't be checked from the export
//                   {any:[...]}              any one of these. With a {note} in it, the check can confirm
//                                            but never fail (NRCPC: a boost above 0% proves the purchase)
//                   label: "text"            optional, replaces the generated text for a condition
//                   haveLabel: "... {v} ..." optional, replaces "have <value>" next to it
//    statHint    : the wiki's "Recommended stats", only the parts the export can check. A list of
//                  {to?, label?, need:[conditions like check]}; the first entry whose "to" covers the next
//                  completion applies (day challenges: RTI uses the score target, others 1 = first run).
//                  Used by the Recommended tab to move a row up or down one timing group.
//                  soft: "reason" on a condition = one part of a total (BS from pet equipment): shown, and
//                  needed for "Moved up", but missing it never moves a row down.
//    recLater    : true = the Recommended tab always puts it in Later (community consensus that almost
//                  anything else is a better use of time; UAC)
//    scoreCap    : day challenges only - the best score where ChP stops increasing {value, label, short, chp}
//    export      : the name used in the in-game statistics export
//    tools       : [[label, url], ...]  guides / calculators
//    wikiInfo    : short excerpts from the wiki page (desc, unlock, restr, rec, strat)
//    history     : lines from the wiki page's History section (version changes), shown as "Change history"
//    wikiRev     : timestamp of the wiki page revision these were taken from (the update prompt uses it to spot changed pages)
//
//  Timing/order: "ITRTG Challenge Guide" by Sim, Realtum, Bulborbish (2026-03-27)
//  Opening order (DRC, GPC, UBC, DPC, then DMC/DNDC before UPC): Womba's
//    "Challenge Progression helper" (2026-02-28)
//  Unlocks, max, excerpts: itrtg.wiki.gg (checked 2026-09-29)
//  wikiInfo excerpts: shortened from ITRTG Wiki pages by its contributors, licensed CC BY-SA 4.0
//  (https://creativecommons.org/licenses/by-sa/4.0/). Keep that licence on this text if you edit it.
// =====================================================================
window.ITRTG = {
 "updated": "2026-10-06",
 "sources": {
  "guide": {
   "label": "ITRTG Challenge Guide",
   "by": "Sim, Realtum, Bulborbish",
   "date": "2026-03-27",
   "url": "https://docs.google.com/spreadsheets/d/1nz1_oKo0WvRaBNrRkeHX5hY5w9iHQoyigKt-0cWnmXk/edit?gid=0#gid=0"
  },
  "compiled": {
   "label": "ITRTG Compiled",
   "url": "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit"
  },
  "wiki": {
   "label": "ITRTG Wiki - Challenges",
   "url": "https://itrtg.wiki.gg/wiki/Challenges"
  },
  "helper": {
   "label": "Challenge progress helper (doc)",
   "url": "https://docs.google.com/document/d/1p6dLsATwL4yfvjjXlDjw6StQLqHn_4OHDgtkZDt-ldI/edit?tab=t.0"
  },
  "changelog": {
   "label": "Official changelog (shugasu.com)",
   "url": "https://shugasu.com/games/itrtg/changelog.html"
  }
 },
 "types": {
  "N": {
   "label": "Normal",
   "color": "#009900",
   "light": "#99FF99",
   "blurb": "Does not reset Multipliers"
  },
  "MR": {
   "label": "Multi Reset",
   "color": "#009999",
   "light": "#99FFFF",
   "blurb": "Resets Multipliers"
  },
  "GP": {
   "label": "GP Reset",
   "color": "#994C00",
   "light": "#FFB266",
   "blurb": "Resets Multipliers and God Power"
  },
  "D": {
   "label": "Day / Score",
   "color": "#6600CC",
   "light": "#CC99FF",
   "blurb": "24-hour limit (RTI: 7 days); best score counts"
  },
  "U": {
   "label": "Unlimited",
   "color": "#999900",
   "light": "#FFFF99",
   "blurb": "Rewards from every completion, no cap"
  },
  "HM": {
   "label": "Hard Mode",
   "color": "#990000",
   "light": "#FF9999",
   "blurb": "Harder repeats of a maxed challenge; gives HM points"
  },
  "R": {
   "label": "Root",
   "color": "#CC0066",
   "light": "#FF99CC",
   "blurb": "Your stats raised to an exponent; gives 1-5 HM points"
  }
 },
 "bands": [
  {
   "label": "After Tutorial",
   "steps": [
    0
   ]
  },
  {
   "label": "< 3k ChP",
   "steps": [
    1,
    2
   ]
  },
  {
   "label": "3k - 10k ChP",
   "steps": [
    3,
    4
   ]
  },
  {
   "label": "10k - 25k ChP",
   "steps": [
    5,
    6
   ]
  },
  {
   "label": "25k - 35k ChP",
   "steps": [
    7,
    8
   ]
  },
  {
   "label": "35k+ ChP",
   "steps": [
    9,
    10
   ]
  }
 ],
 "roots": [
  {
   "code": "rDGC",
   "wiki": "https://itrtg.wiki.gg/wiki/Div_Gen_Challenge",
   "kind": "Normal"
  },
  {
   "code": "rEMC",
   "wiki": "https://itrtg.wiki.gg/wiki/Expensive_Monument_Challenge",
   "kind": "Normal"
  },
  {
   "code": "rMAC",
   "wiki": "https://itrtg.wiki.gg/wiki/Might_Accumulation_Challenge",
   "kind": "Normal"
  },
  {
   "code": "rMMC",
   "wiki": "https://itrtg.wiki.gg/wiki/Monument_Multi_Challenge",
   "kind": "Normal"
  },
  {
   "code": "rNDMC",
   "wiki": "https://itrtg.wiki.gg/wiki/No_Div_Monument_Challenge",
   "kind": "Normal"
  },
  {
   "code": "rSPLC",
   "wiki": "https://itrtg.wiki.gg/wiki/Super_Pet_Level_Challenge",
   "kind": "Normal"
  },
  {
   "code": "rUUC",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Universe_Challenge",
   "kind": "Normal"
  },
  {
   "code": "rDRC",
   "wiki": "https://itrtg.wiki.gg/wiki/Double_Rebirth_Challenge",
   "kind": "Multi Reset"
  },
  {
   "code": "rGSC",
   "wiki": "https://itrtg.wiki.gg/wiki/God_Skip_Challenge",
   "kind": "Multi Reset"
  },
  {
   "code": "rTGSC",
   "wiki": "https://itrtg.wiki.gg/wiki/True_God_Skip_Challenge",
   "kind": "Multi Reset"
  },
  {
   "code": "rUGC",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Gods_Challenge",
   "kind": "Multi Reset"
  }
 ],
 "challenges": [
  {
   "code": "GPC",
   "name": "God Power Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/God_Power_Challenge",
   "unlock": [
    "1 DRC"
   ],
   "requires": [
    [
     "DRC",
     "1"
    ]
   ],
   "max": "25",
   "playstyle": "Active",
   "rewardRating": 1,
   "notes": "First time unlocks GP pet. The rest: speeding / speedfalling",
   "chp": 37,
   "stages": {
    "0": "Do 1 as the 2nd challenge",
    "3": "Rest"
   },
   "check": [
    {
     "ch": "DRC",
     "n": 1
    }
   ],
   "export": "God Power Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "GPC simply requires you to obtain some God Power, by any means you wish.  The amount required is (n+1)*50: 100 for the first challenge, 150 for the second, 200 for the third, and so on, up to 1300 for the 25th.",
    "unlock": "Finish 1 DRC.",
    "restr": "None.",
    "rec": "It's probably good to do the first one early for the pet.  Once the pet is unlocked, you might want to wait until you're able to do them somewhat quickly.\nHaving pets that are able to obtain lots of God Power from campaigns and/or dungeons is greatly helpful.…",
    "strat": "Run God Power campaigns and the dungeons that give God Power (scrapyard 1, volcano 2, etc.).  Beat UBs and UBv2s.  You can even open Lucky Draws, although those are not a reliable large God Power source. \nBecause this is a normal challenge, and your multis are not reset, starting at a higher god will give you an advantage over starting at a lower one."
   },
   "history": [],
   "wikiRev": "2023-02-06T13:53:04Z"
  },
  {
   "code": "UUC",
   "name": "Ultimate Universe Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Universe_Challenge",
   "unlock": [
    "Planet level 5"
   ],
   "requires": [],
   "max": "45",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": "Shouldn't take longer than 3h. Best done in speedruns <30 min",
   "chp": 82,
   "stages": {
    "0": "Not worth it early on!",
    "1": "1 for AAC unlock",
    "2": "All before PMC"
   },
   "check": [
    {
     "stat": "planetLevel",
     "min": 5
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "maxClones",
       "min": 500000
      },
      {
       "stat": "csTotal",
       "min": 1000
      },
      {
       "stat": "bsTotal",
       "min": 5000
      }
     ]
    }
   ],
   "export": "Ultimate Universe Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "The Ultimate Universe Challenge (UUC) doesn't reset anything, you simply make a universe on your next rebirth to finish this challenge.",
    "unlock": "Have a level 5 Planet.",
    "restr": "None.",
    "rec": "UUC is doable with very minimal stats but it is recommended that you are able to build at least a 10/30/30 div gen in under a day while still being able to defend against all UB’s. 500k clones, 1k CS, 5k BS should be more than enough.",
    "strat": "Be able to build a 0/25/25 or higher divinity generator while defeating all 5 ultimate beings to maximize your divinity income. This means around 800k clones and 4-5k BS. 22+ CC allows you to save a lot of divinity by manually creating the necessary materials instead of auto buying. For example, creating moons and above with 22 CC reduces the total divinity requirement to 1.72 quintillion (1.72E18).\nWhen you're ready to build your universe, turn off auto buying on moons or planets and above, then use the creation…"
   },
   "history": [
    "Ultimate Universe Challenge was introduced in version 1.40.471",
    "Root Ultimate Universe Challenge was introduced in version 4.50.1627"
   ],
   "wikiRev": "2026-06-19T18:56:08Z"
  },
  {
   "code": "MMC",
   "name": "Monument Multi Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Monument_Multi_Challenge",
   "unlock": [
    "1,000% Build Speed",
    "200k clones"
   ],
   "requires": [],
   "max": "40",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": null,
   "chp": 240,
   "stages": {
    "1": "While easy, up to #35",
    "2": "Last 5"
   },
   "check": [
    {
     "stat": "bsTotal",
     "min": 1000
    },
    {
     "stat": "maxClones",
     "min": 200000
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "maxClones",
       "min": 2000000
      },
      {
       "stat": "cc",
       "min": 50
      },
      {
       "stat": "bsGP",
       "min": 4000
      }
     ]
    }
   ],
   "export": "Monument Multi Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "Achieve a Monument Multiplier of 60 billion / (41 - n): 1.5 billion for the 1st, 1.538 billion for the 2nd, and so on, with 60 billion required for the 40th.  Monument Multiplier equals 1 + (the sum of your multiplier to each stat from monuments)/2.\nWhat…",
    "unlock": "1000% Build Speed and 200k clones",
    "restr": "None.",
    "rec": "To begin your first MMC, having around 2mil Clones, 50 CC, 4000% BS (from God Power), and high growth pets will allow you to complete the challenges in about 2-3 hours. Having Black Hole Challenge done before MMCs 35-40 will make them much easier. While doing…",
    "strat": "Every 5 completed challenges, the current lowest monument no longer increases the multiplier. This means as you move through the series, you have less options for \n• MMC 1: Mighty Statues+ provides Monument Multiplier\n• MMC 6: Mystic Garden+ provides Monument Multiplier\n• MMC 11: Tomb of Gods+ provides Monument Multiplier\n• MMC 16: Everlasting Lighthouse+ provides Monument Multiplier\n• MMC 21: Godly Statue+ provides Monument Multiplier\n• MMC 26: Pyramids of Power+ provides Monument Multipliers\n• MMC 31: Temple of…"
   },
   "history": [],
   "wikiRev": "2026-04-06T17:29:22Z"
  },
  {
   "code": "AAC",
   "name": "All Achievements Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/All_Achievements_Challenge",
   "unlock": [
    "1 UUC"
   ],
   "requires": [
    [
     "UUC",
     "1"
    ]
   ],
   "max": "25",
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": "After UBCs, all v4s, new RTI, for the most gains",
   "chp": 1260,
   "stages": {
    "1": "1 for BHC unlock",
    "3": "Climb for new pets, RTI permalevels. Or AAC Skip (100 UBCs)"
   },
   "check": [
    {
     "ch": "UUC",
     "n": 1
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "maxClones",
       "min": 200000
      },
      {
       "stat": "planetLevel",
       "min": 6
      }
     ]
    }
   ],
   "export": "All Achievements Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (length of AAC calc)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "This challenge does not reset anything and simply tasks you with completing every in-game achievement. This means reaching level 10 million on all trainings, 10 million kills on all monsters and every creating achievement from 500 Light to 3 Universes.",
    "unlock": "Complete one UUC.",
    "restr": "None.",
    "rec": "The ability to make 3 universes in under 3 days 8 hrs. This is fairly easy to do with almost no stats. 200-300k clones, the level 6 planet you'll have from completing the UUC, and the BS/CS from your first few runs should be more than enough.\nNote that each…",
    "strat": "The table below shows the minimum time needed to complete each AAC.\n(see the table on the wiki)\nIn total, this is 67 days, 14 hours, 42 minutes and 30 seconds minimum from start to finish.\nAs long as you have the ability to make 3 universes within 2 days and hit BB speed on killing Monster Queen, then you're doing AACs as quickly as possible. There are no other means to speed AACs up. On the bright side, each additional one goes slightly faster. Once you arrive at challenge #11 of 25 you are already halfway there in terms of the…"
   },
   "history": [
    "The completion cap of AAC was changed from 50 to 25 and the reward was doubled in game version 4.45.1579. The extra AACs granted by UCC was changed to 3, though the maximum AAC reward remains 55%. (2025-08-07)",
    "The statistics multi reward was increased from 750,000 to 7,500,000 in game version 4.21.1445 (2024-01-26).",
    "The statistics multi reward increased to 25,000,000 some time later in 2024 (no changelog entry?)."
   ],
   "wikiRev": "2026-10-05T14:26:03Z"
  },
  {
   "code": "BHC",
   "name": "Black Hole Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Black_Hole_Challenge",
   "unlock": [
    "1 AAC"
   ],
   "requires": [
    [
     "AAC",
     "1"
    ]
   ],
   "max": "40",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": "Spend GP for div",
   "chp": 120,
   "stages": {
    "1": "All"
   },
   "check": [
    {
     "ch": "AAC",
     "n": 1
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "maxClones",
       "min": 3200000
      },
      {
       "stat": "csTotal",
       "min": 5500
      },
      {
       "stat": "bsTotal",
       "min": 6000
      }
     ]
    }
   ],
   "export": "Black Hole Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "Think of this as one step up from the UUC. You lose no multipliers but have to make 1 black hole, with 1 upgrade to complete this challenge.",
    "unlock": "Complete one All Achievements Challenge.",
    "restr": "None.",
    "rec": "This is not much harder than a UUC and gets easier as you progress. If you can complete a UUC in under a day, then a BHC will be no problem.\nFor BHCs within 2-4 hours, having around 3.2mil clones, 5.5k CS, 6k BS, and 7+ pets with 8k growth or higher should…",
    "strat": "The first BHC will likely take 10-15 times the divinity needed for a UUC.  With 100 CC you need about 13 quintillions (1.3E19) divinity for a 1/1 Black Hole, while later challenges will require substantially less.\nIMPORTANT: Due to the variable nature of how much galaxies and universes are required to complete a Black Hole Challenge, it is recommended to use the community Compiled Spreadsheet to determine the next ats required for each creation. If you have questions on how to use the spreadsheet for this purpose,…"
   },
   "history": [],
   "wikiRev": "2025-05-03T14:22:12Z"
  },
  {
   "code": "UPC",
   "name": "Ultimate Pet Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Pet_Challenge",
   "unlock": [
    "10k total pet growth",
    "or 20 pets"
   ],
   "requires": [],
   "max": "20",
   "playstyle": "Active",
   "rewardRating": 5,
   "notes": "Train pets, optimal 1h item camps",
   "chp": 240,
   "stages": {
    "1": "After DRC, DMC and DNDC"
   },
   "check": [
    {
     "any": [
      {
       "stat": "petGrowth",
       "min": 10000
      },
      {
       "stat": "pets",
       "min": 20
      }
     ]
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "petGrowth",
       "min": 40000
      },
      {
       "stat": "pets",
       "min": 12
      }
     ]
    }
   ],
   "export": "Ultimate Pet Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "This is like a normal rebirth. This challenge is much different than most. In this challenge, you will not fight any gods yourself, but your pets will instead fight the gods for you.",
    "unlock": "Have a total of 10k+ growth from all your pets OR 20 total pets, whichever comes first.",
    "restr": "Only your pets can fight gods until you (or they) defeat Baal. Banked GP does not help (except to make your god withstand the attacks), and planet multi has no effect.",
    "rec": "40k pet growth is considered a good baseline to finish this in a reasonable time as well as 12+ pets.",
    "strat": "First, how it works: on top of your basic pet stats, you have 3 multipliers:\n• Gods defeated\n• Each god multiplies the gods defeated multiplier by 4 when defeated for the first time. Defeating them again after rebirthing does not give any more. This reaches 18 quintillion (1.8e16) with the defeat of Chronos.\n• Monuments\n• Monuments and their upgrades provide a multiplier to pet stats of 1 + (the sum of your god multiplier to each stat from monuments)/2.\n• Pet pills\n• Pet pills come from item campaigns done during…"
   },
   "history": [],
   "wikiRev": "2025-08-13T19:04:15Z"
  },
  {
   "code": "PLC",
   "name": "Pet Level Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Pet_Level_Challenge",
   "unlock": [
    "2 UPC"
   ],
   "requires": [
    [
     "UPC",
     "2"
    ]
   ],
   "max": "25",
   "playstyle": "Moderate",
   "rewardRating": 2,
   "notes": null,
   "chp": 37,
   "stages": {
    "1": "All"
   },
   "check": [
    {
     "ch": "UPC",
     "n": 2
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "petGrowth",
       "min": 100000
      }
     ]
    }
   ],
   "export": "Pet Level Challenges",
   "tools": [
    [
     "Compiled sheet › PetLevel",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1514194412"
    ]
   ],
   "wikiInfo": {
    "desc": "This is like a normal rebirth in which you train your pets with shadow clones or via Level Campaign to a total pet level between all of your pets.\nEach challenge requires your total pet levels to be 1500 + (1500 * PLCs Completed)",
    "unlock": "Completed 2 UPC.",
    "rec": "Having the ChP and Pet Stone purchases that increase the rate at which pets gain levels from clones (Auto Half Stats, Custom Half Stats, XP Overflow) will speed up this challenge. Decent total pet growth (~100k+), which should be achievable about the time you…",
    "strat": "If you have Custom Half Stats, set the ratio to 1/556/550 for the fastest rate of leveling. If your pets die from this, or you cannot play as actively, try increasing the Physical ratio to 10 or 20 to level your pets slightly slower and with less chance of dying.\nThe challenge gets easier the more pets and the more growth you have. If you have low amounts of either of these, the later challenges may take a while. If the challenge takes longer than a couple hours, the return on fighting clones begins to diminish,…"
   },
   "history": [],
   "wikiRev": "2022-11-23T14:17:33Z"
  },
  {
   "code": "SPLC",
   "name": "Super Pet Level Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Super_Pet_Level_Challenge",
   "unlock": [
    "30M total pet growth"
   ],
   "requires": [],
   "max": "20",
   "playstyle": "Moderate",
   "rewardRating": 3,
   "notes": "A more balanced growth floor will clear faster",
   "chp": 600,
   "stages": {
    "10": "All"
   },
   "check": [
    {
     "stat": "petGrowth",
     "min": 30000000
    }
   ],
   "export": "Super Pet Level Challenges",
   "tools": [
    [
     "Compiled sheet › PetLevel",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1514194412"
    ]
   ],
   "wikiInfo": {
    "desc": "This is like a normal rebirth in which you train your pets with shadow clones or via Level Campaign to a total pet level across all of your pets.\nThis challenge is more difficult than the Pet Level Challenge, requiring 15,000,000 * (1 + # of completions) pet…",
    "unlock": "Have 30 Million Total Pet Growth",
    "rec": "30 milion pet growth as a base requirement makes couple of starting repetitions of this challenge doable in reasonable time, but then additional help is required. The ability to reach softcap on SD Symbiotic Link in around an hour is highly recommended, and…",
    "strat": "For the earlier challenges, completion can be done typically under an hour. Set your Strategy Room to a ratio that favors a high Battle stat to speed up the leveling process (50/84/276 is optimal at max level), give your Llysnafedda a Growth Egg (if owned) and set your pets to fight clones at a ratio of 1/556/550. \nFor later challenges, for completions 10+, it is helpful to start dedicating Light Clones to level the Symbiotic Link Spacedim element and to send your Anni Cake pet on Food camps. Both of these will…"
   },
   "history": [],
   "wikiRev": "2026-09-02T15:18:15Z"
  },
  {
   "code": "CPC",
   "name": "Crystal Power Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Crystal_Power_Challenge",
   "unlock": [
    "1,000 Crystal Power"
   ],
   "requires": [],
   "max": "30",
   "playstyle": "Moderate",
   "rewardRating": 3,
   "notes": "Can be delayed for more crystal slots + ICU",
   "chp": 450,
   "stages": {
    "2": "A few",
    "3": "All"
   },
   "check": [
    {
     "stat": "cp",
     "min": 1000
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "planetLevel",
       "min": 5
      },
      {
       "stat": "maxClones",
       "min": 500000
      }
     ]
    }
   ],
   "export": "Crystal Power Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (CPC strategy by run length)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ],
    [
     "Compiled sheet › Crystal",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=789971626"
    ]
   ],
   "wikiInfo": {
    "desc": "Crystal Power Challenge is a freeform challenge where you collect Crystal Power across multiple rebirths. You need 100 + (20 * number of challenges completed).",
    "unlock": "Have at least 1000 Crystal Power.",
    "restr": "None",
    "rec": "Level 5 planet. 500k - 1m clones. NRCs, PMCs, and Extra crystal slots are also a huge bonus.",
    "strat": "As this is just a normal rebirth, it's all about killing UBs to gather energy and level up Crystal factory.\nIf you want to do short runs (that is, 3h10m runs), it's advised to do 4 PMC before, as it will allow you to get an extra level on one of the basic factories at the 3h mark.\nIt is also helpful to have the Improved Crystal Upgrade (300,000 pet stones or available in the Permanent purchases tab), Crystal Upgrade Boost (available for challenge points), maxed Crystal Slots (available from lucky draws, 250,000…"
   },
   "history": [],
   "wikiRev": "2024-02-14T14:09:10Z"
  },
  {
   "code": "TMC",
   "name": "Total Might Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Total_Might_Challenge",
   "unlock": [
    "1 1KC"
   ],
   "requires": [
    [
     "1KC",
     "1"
    ]
   ],
   "max": "25",
   "playstyle": "Semi-active",
   "rewardRating": 2,
   "notes": "Use DMC calc to optimize might/hr; want 1KBHC completed",
   "chp": 375,
   "stages": {
    "6": "All"
   },
   "check": [
    {
     "ch": "1KC",
     "n": 1
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "ch": "DRC",
       "n": 25
      },
      {
       "ch": "1KC",
       "n": 40
      },
      {
       "stat": "maxClones",
       "min": 5000000
      }
     ]
    }
   ],
   "export": "Total Might Challenges",
   "tools": [
    [
     "Compiled sheet › Might",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1602109296"
    ]
   ],
   "wikiInfo": {
    "desc": "This challenge will reset your Total Might to zero, but return it after finishing the challenge.\nThe goal is to generate a total of 5000 + (1000 * # challenges finished). DRC counts, but CBC doesn't.",
    "unlock": "Finish one 1KC.",
    "restr": "CBCs do not count towards Total Might earned.",
    "rec": "All DRCs completed for Might-runs is the bare minimum for this challenge. The earlier challenges can be completed at a reasonable pace with maxed 1KCs and at least 5 million Shadow Clones to make training worthwhile.\nYou really want to be able to generate at…",
    "strat": "The doubled stats from completing TMCs is beneficial, but not worth grinding for through Might-runs in the early game.\nYou should determine the number of rebirths you'll need for each challenge by dividing the total Might required by the amount of Might you can gain from an optimal 3-hour rebirth. For instance, with the recommended stats, you should be able to gain around 5000 Might in 3 hours, meaning that the first challenge can be cleanly completed with a single optimal rebirth, the sixth challenge (10k Might)…"
   },
   "history": [],
   "wikiRev": "2025-11-18T17:30:36Z"
  },
  {
   "code": "MAC",
   "name": "Might Accumulation Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Might_Accumulation_Challenge",
   "unlock": [
    "5 TMC"
   ],
   "requires": [
    [
     "TMC",
     "5"
    ]
   ],
   "max": "20",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": null,
   "chp": 360,
   "stages": {
    "6": "All"
   },
   "check": [
    {
     "ch": "TMC",
     "n": 5
    }
   ],
   "export": "Might Accumulation Challenges",
   "tools": [
    [
     "Compiled sheet › Might",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1602109296"
    ]
   ],
   "wikiInfo": {
    "desc": "Have a combined might level of 2000 within one rebirth.\nThe required sum of might levels increases by 2000 with each completion, requiring 40000 for the last one. Within UCC, the requirement is 30000.",
    "unlock": "Complete 5 Total Might Challenges.",
    "restr": "This is like a normal rebirth. DRC and CBC might levels both count toward the total Might requirement.",
    "rec": "Since this challenge can be solved simply by waiting, it is up to each person to decide when they feel ready for it. DRC, CBC, 1KC, and the first 20 UCC will all make this challenge easier. For the final challenges, the upper Mights must be brought to over…",
    "strat": "Max clone count is by far the single biggest input. DRC, CBC, 1KC, and the first 20 UCC will all make this challenge faster, as can more Light clones, but nothing compares to a higher max clone count.\nThe Recursive Memory SpaceDim bonus is relevant. Since your clones can't work on Might for the first 94 minutes, you might as well do RTI SpaceDim with them during that time, and consider focusing Light clones on Recursive Memory.\nSince not all Mights train at the same speed, you can optimize the run by setting…"
   },
   "history": [],
   "wikiRev": "2026-08-20T14:34:45Z"
  },
  {
   "code": "PUC",
   "name": "Powerful Unleash Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Powerful_Unleash_Challenge",
   "unlock": [
    "DMC score 40,000+"
   ],
   "requires": [
    [
     "DMC",
     "score 40k"
    ]
   ],
   "max": "10",
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": null,
   "chp": 150,
   "stages": {
    "7": "Here"
   },
   "check": [
    {
     "score": "DMC",
     "min": 40000
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "maxClones",
       "min": 150000000
      },
      {
       "ch": "UCC",
       "n": 20
      }
     ]
    }
   ],
   "export": "Powerful Unleash Challenges",
   "tools": [
    [
     "Compiled sheet › Might (unleash calc)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1602109296"
    ]
   ],
   "wikiInfo": {
    "desc": "Have your lowest Might unleash duration at 6 minutes + 6 minutes per completion.",
    "unlock": "Day Might Challenge Score of 40,000+",
    "rec": "The primary focus of this challenge is might training speed to achieve specific might levels. The methods to decrease challenge time are:\n• Increasing Your total Clone count\n• Increasing your Might Speed from 1KC completions, Recursive Memory space dimension…",
    "strat": "The SpaceDim element Recursive Memory boosts Might training speed, so put shadow clones on RTI SpaceDim pre-Might, and light clones on Recursive Memory.  Move shadow clones to Might once it unlocks.\nThe table below has the total might levels (as a sum of regular might and ghost might) required to complete each PUC. For individual player next ats, use the following formula for each individual element.\n(Table Might) - (Ghost Might) = Next At Value\n(see the table on the wiki)\nBecause the required levels are basically all the same, you…"
   },
   "history": [],
   "wikiRev": "2024-05-12T18:53:48Z"
  },
  {
   "code": "PMC",
   "name": "Planet Multi Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Planet_Multi_Challenge",
   "unlock": [
    "1 UUC",
    "500k clones"
   ],
   "requires": [
    [
     "UUC",
     "1"
    ]
   ],
   "max": "50",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": null,
   "chp": 900,
   "stages": {
    "3": "After NRC + UBV2C"
   },
   "check": [
    {
     "ch": "UUC",
     "n": 1
    },
    {
     "stat": "maxClones",
     "min": 500000
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "planetLevel",
       "min": 50
      },
      {
       "stat": "maxClones",
       "min": 3000000
      }
     ]
    }
   ],
   "export": "Planet Multi Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (next PMC)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "Your goal is to get a Planet Multiplier of 20 billion (2.0 E+10 %). Every completed PMC increases the goal by another 20 billion. (20 billion + 20 billion * PMCs completed.)",
    "unlock": "Complete at least one Ultimate Universe Challenge and have at least 500,000 shadow clones.",
    "restr": "None.",
    "rec": "Have a level 50 planet minimum, and be able to defeat all UBv2s. Black-barring Powersurge is a bonus, but not necessary. 3-5 million clones minimum. DRC, CBC, and 1KC help a lot to reduce the training time on might. NRCs also speed up the rate of UBs. UBV2C…",
    "strat": "If you try and complete the challenge with just clones assigned to Powersurge, it will take a long time even working at the maximum rate possible. Because of this, you will want to leverage other multipliers to Planet Multiplier to complete the series as quickly as possible.\nUltimate Beings multiplier to Planet is the first, and most basic, of these boosts, and ensures that the challenge can always be completed in a practical timeframe. Each Ultimate Being defeat is multiplicative with the existing multiplier, so…"
   },
   "history": [],
   "wikiRev": "2025-10-05T11:17:33Z"
  },
  {
   "code": "1KBHC",
   "name": "1K Clones Black Hole Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/1K_Clones_Black_Hole_Challenge",
   "unlock": [
    "1 1KC",
    "100k Build Speed"
   ],
   "requires": [
    [
     "1KC",
     "1"
    ]
   ],
   "max": "20",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": "Use pills",
   "chp": 1050,
   "stages": {
    "3": "1 for might",
    "4": "Rest"
   },
   "check": [
    {
     "ch": "1KC",
     "n": 1
    },
    {
     "stat": "bsTotal",
     "min": 100000
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "bsTotal",
       "min": 200000
      }
     ]
    }
   ],
   "export": "1K Clones Black Hole Ch.s",
   "tools": [],
   "wikiInfo": {
    "desc": "Black hole challenges are too easy? Do it with one thousand clones!  You must defeat Tyrant Overlord Baal and create a 1/1 Black Hole with only 1000 clones.",
    "unlock": "Finish 1 1KC. Have 100k BS.",
    "restr": "• You only have 1000 clones, and cannot obtain more.\n• You cannot open Lucky Draws.\n• No GP or ad point divinity purchases.\n• Ultimate Beings show up, but they do not attack you.",
    "rec": "While the unlock condition is 100k BS, top players are recommending over 200-300k BS to complete it in a reasonable amount of time; even with 100k BS and both types of chakra pills, building 1 Black Hole takes more than 24 hours.\nNDCs as well as the Highest…",
    "strat": "Since this challenge does not take away your multipliers, defeating Tyrant Overlord Baal should be very easy.\nBe sure to equip as much BS boosting pet equipment (Earth gear) as possible. Having good RTI perm levels for BS will benefit you as well. While the reward from UfCC can help, it is unlikely you will do enough for them to be beneficial before you do this challenge. If you are able to maintain a high P. Baal, or have purchased Early SpaceDim, the v40 and v55 SpaceDim elements will increase your BS (directly,…"
   },
   "history": [],
   "wikiRev": "2025-04-07T01:47:17Z"
  },
  {
   "code": "UBV2C",
   "name": "UBV2 Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/UBV2_Challenge",
   "unlock": [
    "1 UBC",
    "5M clones"
   ],
   "requires": [
    [
     "UBC",
     "1"
    ]
   ],
   "max": "11",
   "playstyle": "Lazy",
   "rewardRating": 4,
   "notes": "Extra bonus for clearing the 11th",
   "chp": 150,
   "stages": {
    "2": "After 1KC"
   },
   "check": [
    {
     "ch": "UBC",
     "n": 1
    },
    {
     "stat": "maxClones",
     "min": 5000000
    }
   ],
   "export": "Ultimate Beings V2 Challenges",
   "tools": [
    [
     "Compiled sheet › UBv2",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=465833529"
    ],
    [
     "One player's UBV2C run log (Steam)",
     "https://steamcommunity.com/app/466170/discussions/0/3010053344553662422/#c3010053344555337975"
    ]
   ],
   "wikiInfo": {
    "desc": "Beat harder versions of each UBV2.",
    "unlock": "To unlock this challenge you need to have at least 5 million clones and finish at least one UBC.",
    "restr": "• UBv2s will attack twice per turn, meaning you cannot completely prevent it from acting by feeding, and god-speed merely matches its speed.\n• UBv2 HP and Attack increased.\n• Reflection damage decreased, making Clairvoyance and Reflection Barrier harder to use effectively.\n• Non-poisoned creations…",
    "rec": "You will need lots of clones for this one, both for levelling might and for fighting the UBV2s. Finishing all of your 1KCs will also make a big difference. Having a high creation count (and creation crystals with DNDC) will help too with rebuilding your…",
    "strat": "Focus on levelling your Physical Attack+ and Mystic Defense+ might. The first challenge can be easily completed with might levels around 600/600. The 10th challenge can be completed with difficulty at level 1300/1300, but you will find level 2000/2000 to be much more comfortable. You will need 20 to 60 Fakeverses to beat ITRTGv2, depending on your might levels and fighting methods.\nDuring your UBV2 fights, don't worry about getting their damage reduction as low as possible. If you can only get 1 evil creation in…"
   },
   "history": [],
   "wikiRev": "2026-05-16T12:56:45Z"
  },
  {
   "code": "UBV4C",
   "name": "UBV4 Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/UBV4_Challenge",
   "unlock": [
    "Defeat ITRTGv4"
   ],
   "requires": [],
   "max": "5",
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": null,
   "chp": 150,
   "stages": {
    "6": "Hereish"
   },
   "check": [
    {
     "stat": "v4Defeated",
     "min": 1
    }
   ],
   "export": "Ultimate Beings V4 Challenges",
   "tools": [
    [
     "Compiled sheet › v4",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=593547165"
    ]
   ],
   "wikiInfo": {
    "desc": "Defeat ITRTGv4 with increased difficulty.",
    "unlock": "Defeat ITRTGv4 normally.",
    "restr": "The stat nerf that the UBv4s normally receive is reduced by (1 + challenges completed) * 20%.  This means that for the final challenge, you will be facing them with their full stats.",
    "rec": "You'll need to be able to defeat the UBV4s without the stat nerfing from UB fights to complete the final challenge.",
    "strat": "The first UBV4 Challenge is comparable in difficulty/length to the time it takes to defeat the UBV4s normally.  You might need to wait a little longer, for an extra ITRTG fight or two, if you're relying on the stat nerfing.\nLater UBV4 Challenges -- and in particular the final challenge -- are not recommended unless you can defeat the UBV4s without the stat nerfing.  Without that, the only real power growth you can obtain for fighting the UBV4s comes from the \"Physical HP+\" and \"Mystic Regen+\" Mights, and the…"
   },
   "history": [],
   "wikiRev": "2026-05-26T00:18:06Z"
  },
  {
   "code": "NDMC",
   "name": "No Div Monument Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/No_Div_Monument_Challenge",
   "unlock": [
    "100 Creation Count"
   ],
   "requires": [],
   "max": "21",
   "playstyle": "Moderate",
   "rewardRating": 3,
   "notes": "Use liquids",
   "chp": 630,
   "stages": {
    "2": "First 9-10",
    "4": "Rest of them"
   },
   "check": [
    {
     "stat": "cc",
     "min": 100
    }
   ],
   "export": "No Div Monument Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (NDMC next-ats)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "This is like a normal rebirth. You can't buy anything with divinity, meaning divinity is useless in this challenge.\nThe goal is to have a specific monument with a given level and upgrade level while only using creations you manually make in a single rebirth.…",
    "unlock": "A creation count (CC) of 100 or higher.",
    "restr": "You can't buy anything with divinity, meaning divinity is useless in this challenge.\nYou can Overcap creating on all Creations.",
    "rec": "CS and CC: the more, the better. The first 9 challenges are fairly easy (requiring Mountains, Forests, and Villages) but Oceans are an extreme difficulty spike. For the harder challenges, it is important to have a CS in great excess of the expensive…",
    "strat": "For the more difficult challenges, use Godly Liquids V1 and V2. Build RTI CS bonus, as well as SpaceDim bonuses for CS and CC.\nRemember that this challenge removes the creation speed cap for ALL creations. If your CS exceeds the speed cap of expensive target creations like Oceans, you will receive a proportional multiplier to creation count without additional prerequisite expense. For example, Oceans typically blackbar at 2M%; with a CS of 4M%, you would effectively double your CC for free, and thus only have to…"
   },
   "history": [],
   "wikiRev": "2026-09-29T17:28:42Z"
  },
  {
   "code": "GGC",
   "name": "Greedy God Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Greedy_God_Challenge",
   "unlock": [
    "9k Creation Speed from GP",
    "125 Creation Count"
   ],
   "requires": [],
   "max": "26",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": "Use liquids and GGC spreadsheet next-ats",
   "chp": 780,
   "stages": {
    "4": "When easy; come back as you progress"
   },
   "check": [
    {
     "stat": "csGP",
     "min": 9000
    },
    {
     "stat": "cc",
     "min": 125
    }
   ],
   "export": "Greedy God Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (GGC next-ats)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ],
    [
     "JY's Formulae (GGC calculator)",
     "https://docs.google.com/spreadsheets/d/1UjiffX9dlVDNy5VpbVRhwVwlwsFBDto3FS5hzXOvhPk/edit?pli=1#gid=1913080035"
    ]
   ],
   "wikiInfo": {
    "desc": "Gods will steal your creations per tick and you wont be able to buy creations in this challenge. However you will be able to overcap creations. \nThe goal is to defeat the target god and have 1 million of their creation.",
    "unlock": "9,000 Creation Speed from god power purchases and 125 Creation Count.",
    "restr": "• Unable to buy creations with Divinity.\n• All gods up to and including the target god will \"steal\" your creations, at a rate of thousands per tick (tens/hundreds of thousands per second). The challenge description is misleading.\n• You can Overcap creating on all creations.",
    "rec": "This is a challenge you will tackle in chunks. When you first unlock, you will be able to do the first few. #1 - #13 are relatively easy, before you face a big jump in difficult with #14 (Oceans).",
    "strat": "This is one of the most complicated challenges in the game. Beware: there is much arithmetic involved.\nThe challenge increases dramatically in difficulty at the 14th run (Oceans), and the 23rd run (Suns). The last 3 runs are allegedly easier than Suns (in terms of time required), albeit more complicated (in terms of arithmetic/steps required).\nFor runs where you need more than a few minutes, use Godly liquids (+v2) if desired. Once you've got shadow clones defending the crystal factory, put the rest in RTI…"
   },
   "history": [],
   "wikiRev": "2024-12-11T21:21:07Z"
  },
  {
   "code": "LCv4C",
   "name": "Limited Clone v4 Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Limited_Clone_v4_Challenge",
   "unlock": [
    "Defeat ITRTGv4 in <3h"
   ],
   "requires": [],
   "max": "10 (+1)",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": "Difficulty depends on Light Clones, RTI and v4 Mage attack",
   "chp": 600,
   "stages": {
    "9": "All. The weaker your dungeons, the later"
   },
   "check": [
    {
     "stat": "v4Hours",
     "max": 3
    }
   ],
   "statHint": [
    {
     "to": 10,
     "need": []
    },
    {
     "label": "the 11th",
     "need": [
      {
       "stat": "maxClones",
       "min": 1000000000
      },
      {
       "stat": "lightClones",
       "min": 4000000
      }
     ]
    }
   ],
   "export": "Limited Clone v4 Challenges",
   "tools": [
    [
     "Compiled sheet › v4",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=593547165"
    ]
   ],
   "wikiInfo": {
    "desc": "This is like a normal rebirth. \nIn this challenge you need to beat UBv4s with only a few Light Clones. It gets harder each time, beginning with 5120 Light Clones, and ending with 10 at the 10th completion. You could also do an 11th completion (with 1 Light…",
    "unlock": "Defeat ITRTGv4 in less than 3 hours.",
    "restr": "You can only assign a maximum of 10 * [2^(9 - Challenges Completed)] Light Clones to participate in Ultimate Being v4 fights.  This is 5,120 Light Clones during the first challenge completion, then halving after each completion (2,560 ... 1,280 ... 640 ... 320 ... 160 ... 80 ... 40 ... 20 ... 10…",
    "rec": "This challenge is very difficult, and will require a lategame pet and god gamestate.\nThe 11th instance can be done with 1 billion shadow clones and 4 million light clones, with pets doing D4-6 dungeons, in about 5 days."
   },
   "history": [
    "This challenge was released in game version 4.33.1508 (2024-12-20).",
    "In the initial release, the challenge was incorrectly unlocked for players who had never defeated ITRTG v4 at all."
   ],
   "wikiRev": "2025-07-25T05:50:39Z"
  },
  {
   "code": "DGC",
   "name": "Div Gen Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Div_Gen_Challenge",
   "unlock": [
    "Holy ITRTG Book unlocked"
   ],
   "requires": [],
   "max": "25",
   "playstyle": "Moderate",
   "rewardRating": 2,
   "notes": null,
   "chp": 937,
   "stages": {
    "4": "When easy; come back as you progress"
   },
   "check": [
    {
     "note": "Holy ITRTG Book unlocked"
    }
   ],
   "statHint": [
    {
     "to": 3,
     "need": [
      {
       "stat": "bsTotal",
       "min": 50000
      },
      {
       "stat": "maxClones",
       "min": 10000000
      }
     ]
    },
    {
     "label": "the later ones",
     "need": [
      {
       "stat": "maxClones",
       "min": 200000000
      },
      {
       "stat": "bsPetEquip",
       "min": 300,
       "soft": "Other Building Speed can make up for it"
      },
      {
       "score": "RTI",
       "min": 140
      },
      {
       "stat": "perm:Space Dim",
       "min": 1000000
      },
      {
       "stat": "perm:Building Speed",
       "min": 1000000
      },
      {
       "stat": "perm:Divinity",
       "min": 1000000
      }
     ]
    }
   ],
   "export": "Div Gen Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "In this challenge, you will need to build a divinity generator as high as possible.",
    "unlock": "Holy ITRTG Book unlocked.",
    "restr": "None.",
    "rec": "The first few DGCs can be done with 50K+ BS and 10M+ Clones. Due to scaling, you will want to take this challenge in pieces and complete one or two more as you have a considerable increase in power.  For the later ones, you want strong BS% from pet equipment…",
    "strat": "Each Level from 2+ doubles the Div/sec requirement.  A simple formula for figuring out the next level's required divinity gain and conversion speed levels is below:\n1.414*A\nwhere A = the divinity gain/convert speed level needed for the previous divgen (assuming equal levels in both).\nThis is assuming no changes to the FSM bonus, Crystal levels or any other bonus to div gen. \nIn practice, boosts from Fusion Retrofitting spacedim and Divinity RTI will massively lower the divgen levels needed for successive DGCs. At…"
   },
   "history": [],
   "wikiRev": "2026-09-12T14:33:40Z"
  },
  {
   "code": "MCC",
   "name": "Max Crystal Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Max_Crystal_Challenge",
   "unlock": [
    "50 PMC",
    "Crystal Factory",
    "Crystal Improvement purchase"
   ],
   "requires": [
    [
     "PMC",
     "50"
    ]
   ],
   "max": "30",
   "playstyle": "Lazy",
   "rewardRating": 4,
   "notes": null,
   "chp": 1350,
   "stages": {
    "5": "When you need a lazy challenge"
   },
   "check": [
    {
     "ch": "PMC",
     "n": 50
    },
    {
     "note": "Crystal Factory + Crystal Improvement purchase"
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "chp:Crystal Upgrade boost",
       "min": 3
      }
     ]
    }
   ],
   "export": "Max Crystal Challenges",
   "tools": [
    [
     "Compiled sheet › Crystal",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=789971626"
    ]
   ],
   "wikiInfo": {
    "desc": "In this challenge you will need to create maxed crystals, starting with a Physical crystal and ending with a God crystal. After completing all types, the amount of crystals you need is doubled until it is maxed at 30. For example:\n• Completion #1 requires 1x…",
    "unlock": "Crystal Factory unlocked, 50 Planet Multi Challenges completed and have bought the Crystal Improvement purchase with either money or pet stones.",
    "restr": "None.",
    "rec": "Owning all six crystal slots to benefit other crystal-related challenges such as CPC along with NRC and most or all of the ChP  Crystal Upgrade Chance purchases. \nThe extra PMC, NRC, and CPC completions from finishing 20 UCC will greatly benefit you,…",
    "strat": "This challenge is easier the more crystal-related challenges you have done, such as NRC and CPC, along with the additional bonuses received from UCC. The Crystal upgrade boost from ChP is highly recommended. The table below detailing the time to completion assumes you have all of these Crystal bonuses from challenges and ChP. \nOptimal Play assumes you are levelling only the required Crystal module every single time it is available to be upgraded. This is very active play.\nNon-Optimal Play assumes you are…"
   },
   "history": [
    "The statistics multi reward was increased from 7.5M to 30M in game version 4.21.1445 (2024-01-26)."
   ],
   "wikiRev": "2026-05-13T16:27:52Z"
  },
  {
   "code": "SDC",
   "name": "SpaceDim Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/SpaceDim_Challenge",
   "unlock": [
    "10k Light Clones"
   ],
   "requires": [],
   "max": "20",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": null,
   "chp": 450,
   "stages": {
    "5": "Hereish"
   },
   "check": [
    {
     "stat": "lightClones",
     "min": 10000
    }
   ],
   "export": "SpaceDim Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (next SDC)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "The goal is to level up one specific SpaceDim element to level 100 x (1 + challenges finished). Ghost SpaceDim levels from SAC do not count. The first challenge requires levelling the element unlocked by defeating PBaal V5, progressing through all of them…",
    "unlock": "Have at least 10,000 light clones.",
    "rec": "The relevant stats are the number of light clones and the SpaceDim Speed bonus from RTI, but you also need to unlock the element to be levelled through either reaching the corresponding P.Baal or having the Early SpaceDim Challenge Point purchase.",
    "strat": "It is a normal rebirth outside of putting light clones onto the element required. The most important thing is knowing how long the challenge will take you, so the following table shows you how many Light Clones are needed to complete the SDC in the given timeframe. Note that this can be sped up significantly depending on your RTI stats for SD.\n(see the table on the wiki)\nThe reward for this challenge has been factored into those calculations, but not bonuses from Road to Infinity and Adventure research. Time may be longer if you…"
   },
   "history": [],
   "wikiRev": "2026-08-09T10:49:41Z"
  },
  {
   "code": "SDAC",
   "name": "SpaceDim Accumulation Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/SpaceDim_Accumulation_Challenge",
   "unlock": [
    "Early SpaceDim ChP purchase"
   ],
   "requires": [],
   "max": "25",
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": null,
   "chp": 750,
   "stages": {
    "6": "When easy; come back as you progress"
   },
   "check": [
    {
     "note": "Early SpaceDim ChP purchase"
    }
   ],
   "statHint": [
    {
     "to": 3,
     "need": []
    },
    {
     "label": "the later ones",
     "need": [
      {
       "stat": "maxClones",
       "min": 200000000
      },
      {
       "stat": "lightClones",
       "min": 1500000
      },
      {
       "score": "RTI",
       "min": 140
      }
     ]
    }
   ],
   "export": "SpaceDim Accumulation Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (next SAC)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "Have a combined level of 1000 * (1 + completions) between all SpaceDim elements.",
    "unlock": "Purchase the Early SpaceDim Challenge Point purchase.",
    "restr": "This is like a normal rebirth.",
    "rec": "While the first few challenges can be completed as soon as you unlock this challenge, to finish the final challenge in under a day, having around 200m clones and 1.5m light clones may be sufficient with a CL 60 Blacksmith and an RTI score of 140.  If you keep…",
    "strat": "Put your best Blacksmith on RTI, use all of your clones to level SpaceDim RTI, spread all Light Clones evenly, wait.\nNote that the ghost levels obtained from this challenge do not count toward future completions of this challenge; only the base levels count.  Therefore, the first challenge requires 50 base levels in all SpaceDim elements, and the last challenge requires 1250 base levels even though you'll have 48 ghost levels at that time."
   },
   "history": [],
   "wikiRev": "2026-06-21T13:33:11Z"
  },
  {
   "code": "TLC",
   "name": "RTI Temp Level Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/RTI_Temp_Level_Challenge",
   "unlock": [
    "100k permanent levels, all RTI elements"
   ],
   "requires": [
    [
     "RTI",
     "100k perm lvls"
    ]
   ],
   "max": "20",
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": null,
   "chp": 750,
   "stages": {
    "6": "First few",
    "7": "Rest"
   },
   "check": [
    {
     "stat": "rtiPermMin",
     "min": 100000
    }
   ],
   "statHint": [
    {
     "to": 10,
     "need": [
      {
       "score": "RTI",
       "min": 100
      }
     ]
    },
    {
     "label": "the last ones",
     "need": [
      {
       "score": "RTI",
       "min": 120
      }
     ]
    }
   ],
   "export": "RTI Temp Level Challenges",
   "tools": [
    [
     "Compiled sheet › RTI",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=334530179"
    ]
   ],
   "wikiInfo": {
    "desc": "Get at least 100 temp levels for all RTI elements * challenge number.\nThis challenge is often referred to as TLC (Temp Level Challenge).",
    "unlock": "Have at least 100,000 permanent levels for all RTI elements.",
    "rec": "The more clones you have, the better. Having pets in RTI for each slot will help considerably. Having an RTI >100 for the first 10 challenges, and having an RTI >120 for the last few challenges if you want them done in 1-2 days (depends on clone count). Pets…",
    "strat": "Set the next at levels to the target score to see how long it will take (either spread clones or multiply time by 10). You can also do this outside of the challenge but do note if you try and work out later challenges in the series you might overestimate time needed slightly due to not having the reward from prior completions.\nThe following table shows the number of clones required to complete the given TLC challenge in 1 day without any pets assigned to RTI slots. (taken from…"
   },
   "history": [],
   "wikiRev": "2022-09-25T06:42:24Z"
  },
  {
   "code": "UfCC",
   "name": "Universes for Clones Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Universes_for_Clones_Challenge",
   "unlock": [
    "20M clones"
   ],
   "requires": [],
   "max": "25",
   "playstyle": "Semi-active",
   "rewardRating": 3,
   "notes": null,
   "chp": 1125,
   "stages": {
    "7": "A few",
    "9": "The rest"
   },
   "check": [
    {
     "stat": "maxClones",
     "min": 20000000
    }
   ],
   "statHint": [
    {
     "to": 3,
     "need": [
      {
       "stat": "bsTotal",
       "min": 1000000
      },
      {
       "stat": "csTotal",
       "min": 100000
      },
      {
       "stat": "cc",
       "min": 1000
      }
     ]
    },
    {
     "need": []
    }
   ],
   "export": "Universes for Clones Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "Reach a maximum shadow clone count of 20 million. You will start the challenge with a set amount of shadow clones and each challenge the starting clones will be halved from the previous challenge. You cannot raise max clones through god power and instead must…",
    "unlock": "Have at least 20 million Clones",
    "rec": "For the first few challenges:\n• 1 million build speed, 100k creating speed, 1000 CC\n• 4 or more crystal slots\n• RTI unlocked.  A high permanent RTI level in Divinity may help.\n• A strong set of Divinity Camp pets won't hurt.",
    "strat": "Note: You cannot buy divinity with gp during this challenge. Lucky Draw and Divinity from ad points are also disabled. \nNote: You can find the Universe to Clone conversion under the Creating page, universe buy tab.  I.e. click the Buy button on the line that says Universe.\nPet Divinity Campaigns are allowed, and recommended.  Godly liquids (+V2) and Chakra pills (+V2) are helpful.\nKeep auto-buy off for Towns upward, and slowly turn on more auto-buys as your Divinity Generator builds up.  For every batch of…"
   },
   "history": [],
   "wikiRev": "2026-07-19T03:08:45Z"
  },
  {
   "code": "USC",
   "name": "Ultimate Stats Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Stats_Challenge",
   "unlock": [
    "P.Baal v50 in RTI"
   ],
   "requires": [
    [
     "RTI",
     "v50"
    ]
   ],
   "max": "25",
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": null,
   "chp": 750,
   "stages": {
    "3": "First time",
    "5": "When easy; come back as you progress"
   },
   "check": [
    {
     "score": "RTI",
     "min": 50
    }
   ],
   "statHint": [
    {
     "to": 1,
     "need": []
    },
    {
     "label": "the later ones",
     "need": [
      {
       "stat": "maxClones",
       "min": 150000000
      },
      {
       "score": "RTI",
       "min": 120
      },
      {
       "stat": "bsPetEquip",
       "min": 200,
       "soft": "Other Building Speed can make up for it"
      }
     ]
    }
   ],
   "export": "Ultimate Stats Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (USC calc / next USC)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "This challenge is a normal rebirth in which you get points depending on your universes created, powersurge levels, pet class exp gained, pet stats, black holes + upgrades, RTI levels, unleash power, god power gained and pet growth gained. The starting goal…",
    "unlock": "Defeat P.Baal 50 in RTI.",
    "rec": "Doing the first one after you unlock the challenge can be good just to unlock the Rune Patch. This is a free piece of equipment that can add a lot of power to a dungeon pet. \nEventually, you want to finish the challenge series to get the crafting bonus from…",
    "strat": "Points are calculated like this (only stats from the current rebirth count):\n(universes created * pet class exp (not from free exp) * Planet Multiplier % * combined Pet Multiplier % * Black Holes * Black Hole upgrades * combined RTI temp levels * attack unleash % * god power earned * combined pet growth)^0.1\nThe points are shown in the tooltip, which is recalculated on a timed event (every few seconds).\n• You can force the tooltip numbers to be recalculated by clicking the text that says \"Time since RB\" at the…"
   },
   "history": [],
   "wikiRev": "2025-12-23T14:46:01Z"
  },
  {
   "code": "UMC",
   "name": "Ultimate Multiverse Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Multiverse_Challenge",
   "unlock": [
    "DUC score 1M universes"
   ],
   "requires": [
    [
     "DUC",
     "score 1M"
    ]
   ],
   "max": "21",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": "First one unlocks the Multiverse tab. Use liquids",
   "chp": 787,
   "stages": {
    "6": "Hereish"
   },
   "check": [
    {
     "score": "DUC",
     "min": 1000000
    }
   ],
   "export": "Ultimate Multiverse Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "Starting this challenge is like performing a normal rebirth. \nIf this if your first UMC, you will gain access to the Multiverse tab.\nYour goal is to level up the Multiverse using Universes. The first UMC requires building a level 1 Multiverse, and the nth UMC…",
    "unlock": "Have a Day Universe Challenge score of at least 1 million Universes created.",
    "restr": "None. You can buy Divinity with GP and from opening Lucky Draws.",
    "rec": "The amount of Universes and time to level increases every Multiverse level, so higher stats are needed for each subsequent challenge. Doing the first one to gain access to the tab is recommended, as you can use as an extra power source. \nWith minimum stats to…",
    "strat": "Focus clones on building a powerful DivGen to supply the Universes needed, and on the relevant RTI elements (Divinity, SpaceDim, Building/Creating Speed). SpaceDim elements to focus on are ones that increase your CS, BS, CC, and CP, to help build DivGen and level up the Multiverse faster. \nSend pets on Divinity campaigns to create Universes. Millions of Universes are needed for this challenge, so you need all the Divinity you can get. Creation crystals help reduce time/divinity needed as long as you've done a…"
   },
   "history": [],
   "wikiRev": "2025-06-02T12:04:37Z"
  },
  {
   "code": "EMC",
   "name": "Expensive Monument Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Expensive_Monument_Challenge",
   "unlock": [
    "10 UBHC"
   ],
   "requires": [
    [
     "UBHC",
     "10"
    ]
   ],
   "max": "25",
   "playstyle": "Moderate",
   "rewardRating": 4,
   "notes": "Reward weak until the finisher gives overcap",
   "chp": 1125,
   "stages": {
    "9": "When sub-24h (check compiled)"
   },
   "check": [
    {
     "ch": "UBHC",
     "n": 10
    }
   ],
   "export": "Expensive Monument Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "Build all types of monuments with upgrades. For each monument type (MS = tier 1, up to ToG = tier 7), you must build:\n• 100 * (8 - tier) * (1 + challenges completed) monuments\n• 50 * (8 - tier) * (1 + challenges completed) upgrades\nFor black holes it is (1 + challenges completed) monuments and upgrades instead.",
    "unlock": "Completed 10 UBHC.",
    "restr": "Monuments are much more expensive (250,000x build time increase to monuments and 1,000,000x build time increase to upgrades, 10,000,000x cost increase to both) in this challenge but the divinity generator is unlocked by default.\nLucky Draws cannot be opened while in this challenge.\nDivinity cannot be purchased with God Power while in this challenge.",
    "rec": "A few people have reported completing the full series with under 1 billion shadow clones.",
    "strat": "Did you remember Chakra Pills (and v2)?\nYou can't buy divinity with GP, nor can you double it with Lucky Draws.  Divinity Campaigns still work, so use those, after building up a large Divinity Generator.\nThe following table shows the amount of each monument/upgrade required to complete each challenge.\n(see the table on the wiki)"
   },
   "history": [
    "The Expensive Monument Challenge was added in game version 3.91.1323 (2022-06-15)."
   ],
   "wikiRev": "2026-10-04T17:11:53Z"
  },
  {
   "code": "SDGC",
   "name": "Super Divinity Generator Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Super_Divinity_Generator_Challenge",
   "unlock": [
    "DivGen 100k/100k/100k",
    "(or a prior SDGC)"
   ],
   "requires": [],
   "max": "20",
   "playstyle": "Lazy",
   "rewardRating": 4,
   "notes": null,
   "chp": 1050,
   "stages": {
    "9": "When easy; come back as you progress"
   },
   "check": [
    {
     "note": "DivGen 100k/100k/100k (or a prior SDGC)"
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "ch": "UfCC",
       "n": 25
      },
      {
       "score": "RTI",
       "min": 147
      },
      {
       "stat": "bsPetEquip",
       "min": 300,
       "soft": "Other Building Speed can make up for it"
      }
     ]
    }
   ],
   "export": "Super Divinity Generator Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "Build a Super Divinity Generator, which is an upgrade to the ordinary Divinity Generator.",
    "unlock": "Have your Divinity Generator at 100k/100k/100k, or have completed a prior SDGC.",
    "restr": "Acts like a Normal rebirth.",
    "rec": "This is considered an endgame challenge and will best be saved for very late into the game when most, or all, challenges are completed. Having all UfCC finished and several hundred% of BS from pet equip, along with a very high v147+ RTI.",
    "strat": "Typical build speed heavy challenge. Focus on BS boosting SpaceDim elements, and BS and SD levels in RTI (with high CL Supporter and Blacksmith). Chakra Pills will be a great benefit here. \nPets can't do too much to benefit you here, other than holding wood equipment to boost BS further."
   },
   "history": [],
   "wikiRev": "2023-03-27T13:38:01Z"
  },
  {
   "code": "BSC",
   "name": "Base Speed Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Base_Speed_Challenge",
   "unlock": [
    "250M clone cap"
   ],
   "requires": [],
   "max": "25",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": "Needs strong RTI and >500M clones for <24h",
   "chp": 937,
   "stages": {
    "8": "When short enough"
   },
   "check": [
    {
     "stat": "maxClones",
     "min": 250000000
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "maxClones",
       "min": 500000000
      }
     ]
    }
   ],
   "export": "Base Speed Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (BSC next-ats)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "This challenge will set your building speed and creating speed to 100%. This speed can only be increased with RTI bonuses.\nThe challenge will be completed when you build (1+Challenges Completed) Black Holes and Black Hole Upgrades, maxing at 25 BH/BHU…",
    "unlock": "Have a cap of 250 Million Clones.",
    "restr": "Ultimate Shadow Summons are disabled in this challenge, and items that increase your BS or CS don't have any effect.\nNOTE: For the duration of this challenge, Steam Players will lose access to the 300% creation speed bonus, instead gaining the offline creation system used for mobile.",
    "rec": "The ability to build up a strong RTI Creating Speed (lots of perm levels plus a good Mage) will help. ~2 million perm RTI levels and 500 million clones for good completion time.",
    "strat": "The bulk of the time in this challenge is taken up by creating the initial Galaxy and Universe. Because of this, your clones should be spending the majority of their time on RTI Creating Speed. Due to how offline creation works, if you have all creations required for the universe (up to Suns) created and go offline, the offline calculation will calculate the change in RTI before applying the new creation speed to offline creation.\nIn the early iterations of the challenge, the Building Speed requirements are quite…"
   },
   "history": [
    "On release, BSCs did not have any offline creation benefit enabled for Steam Players. This was changed in patch 4.27.1464 to the current system, where during the course of the challenge Steam Players instead use the Mobile offline creation benefit."
   ],
   "wikiRev": "2026-04-15T10:06:26Z"
  },
  {
   "code": "PCC",
   "name": "Pet Crafting Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Pet_Crafting_Challenge",
   "unlock": [
    "3 Blacksmiths"
   ],
   "requires": [],
   "max": "20",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": "Can be done over multiple rebirths",
   "chp": 750,
   "stages": {
    "4": "When easy; return with stronger crafters"
   },
   "check": [
    {
     "note": "3 Blacksmiths"
    }
   ],
   "export": "Pet Crafting Challenges",
   "tools": [
    [
     "Compiled sheet › Craft",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=2090795977"
    ]
   ],
   "wikiInfo": {
    "desc": "This is like a normal rebirth\nAfter you start this challenge, you will recieve 5 swords, one of each element. The given swords will be useless for pets and are only used for this challenge. You need to upgrade them all to 1 + completed challenges to finish…",
    "unlock": "Have 3 Blacksmiths",
    "restr": "No Restrictions.",
    "rec": "At least one good Blacksmith pet in each element (including neutral). Run length will be bottlenecked by whichever of these pets has the lowest crafting speed.",
    "strat": "All gear in this challenge is treated as equivalent to Tier 1 gear for the purposes of Crafting tier. At the base 100% crafting speed (with the 10% same-element bonus), it will take 8 hours to upgrade a sword from +0 to +1, and 70 days to upgrade from +0 to +20.\nWhen upgrading with off-element blacksmiths, a 80% element crafting speed penalty is imposed, as opposed to the 10% bonus that on-element blacksmiths receive. This makes even the slowest of on-element blacksmiths on equal footing to fast crafters like…"
   },
   "history": [
    "This challenge was released in game version 4.33.1508 (2024-12-20)."
   ],
   "wikiRev": "2025-09-22T12:40:21Z"
  },
  {
   "code": "GPAC",
   "name": "God Power Accumulation Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/God_Power_Accumulation_Challenge",
   "unlock": [
    "25 GPC"
   ],
   "requires": [
    [
     "GPC",
     "25"
    ]
   ],
   "max": "25",
   "playstyle": "Lazy",
   "rewardRating": 1,
   "notes": "Scales poorly midgame on; only worth it with start-of-RB GP",
   "chp": 750,
   "stages": {
    "5": "All"
   },
   "check": [
    {
     "ch": "GPC",
     "n": 25
    }
   ],
   "export": "God Power Accumulation Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "God Power Accumulation Challenges (GPAC) requires you to obtain an amount of God Power in a single rebirth.  The amount required is (n+1)*50: 100 for the first challenge, 150 for the second, 200 for the third, and so on, up to 1300 for the 25th. Unlike in God…",
    "unlock": "Finish 25 GPCs.",
    "restr": "Like a GPC, but rebirthing fails the challenge.",
    "rec": "The first challenge is relatively easy if you can beat the first four Ultimate Beings V2 in a timely manner, while the second one can be completed with a clean sweep of them. Beyond that, it's considerably tougher, requiring a combination of high God Crystal…",
    "strat": "GPC strategy applies except for anything involving rebirthing. Tavern and dungeons are major GP sources that you can run outside of the challenge and bring in ready to be claimed, even more effectively with the overtime Challenge Points upgrades. If you put off the challenge for long enough you'll be able to complete even the final ones in the set with only those and a short rebirth for god and ubv2 gp, and with how weak the rewards are you may want to consider doing that and focusing on other challenges first."
   },
   "history": [],
   "wikiRev": "2025-06-26T19:26:12Z"
  },
  {
   "code": "SDRC",
   "name": "SpaceDim Reset Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/SpaceDim_Reset_Challenge",
   "unlock": [
    "25 LCC"
   ],
   "requires": [
    [
     "LCC",
     "25"
    ]
   ],
   "max": "30",
   "playstyle": "Active",
   "rewardRating": 3,
   "notes": "Balanced around stable P.Baal v150; several days each",
   "chp": 900,
   "stages": {
    "8": "First 5-10",
    "9": "All"
   },
   "check": [
    {
     "ch": "LCC",
     "n": 25
    }
   ],
   "export": "SpaceDim Reset Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (SDRC next-ats / light clones)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "Reach a combined level of 750 x (1 + Challenges Completed) Space Dimension Elements, with Ghost Levels not counting. For the final challenge, you will need a total of 22500 Space Dimension Levels across all of your elements.",
    "unlock": "Have 25 completed Light Clone Challenges",
    "restr": "• Your Light Clone count will be reduced to 0 at the beginning of the challenge. You will get them all back after completion.\n• Baal Power will only drop from P.Baals if your rebirth is longer than 3 hours.\n• Light Clones always cost 1 Baal Power.",
    "rec": "Being able to reach a high PBaal within 3 hours will help.",
    "strat": "There are two distinct parts of this challenge: farming 3-hour rebirths for Light Clones, and then one long rebirth at the end where your Light Clones build the SpaceDim. \nRepeat 3-hour rebirths as long as necessary to build up Light Clones. Don't kill any PBaals until after the three hour mark. Continue building and climbing as you go, but don't let rebirths go much longer than three hours (unless you need to sleep) as it's just wasted time. During this time, set your SpaceDim Next At for Controlled Entropy to…"
   },
   "history": [
    "Prior to version 4.45.1580 (2025-08-07), this was a Multi Reset challenge, with a lower completion target (500x instead of 750x total SpaceDim elements).",
    "Version 4.45.1580 had a serious bug, which would cause permanent loss of your light clones. This was fixed in version 4.45.1581 (2025-08-08)."
   ],
   "wikiRev": "2025-08-08T14:10:01Z"
  },
  {
   "code": "PSC",
   "name": "Powersurge Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Powersurge_Challenge",
   "unlock": [
    "Max PMC (50)"
   ],
   "requires": [
    [
     "PMC",
     "50"
    ]
   ],
   "max": "20",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": "Longer challenge for lategame",
   "chp": 450,
   "stages": {
    "7": "Hereish"
   },
   "check": [
    {
     "ch": "PMC",
     "n": 50
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "maxClones",
       "min": 300000000
      },
      {
       "stat": "planetLevel",
       "min": 100
      }
     ]
    }
   ],
   "export": "Powersurge Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (min Powersurge+ level)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "Reach 2.5 million% multi from Powersurge.\nIn this challenge the multi you gain per completion of Powersurge is always 1 and you need 2 * (1 + completions) as many clones to cap Powersurge.",
    "unlock": "Max completions on Planet Multi Challenges.",
    "rec": "300+ million clones, a 100+ level planet, and a good might speed (capped 1kCC, SpaceDim for Recursive Memory, maybe even OfP purchases for Might speed) to help you get to the black bar clone requirement.\nWhile you can finish this challenge series with lower…",
    "strat": "It is important to understand that you need to hit 2.5 million% in powersurge and not in planet multiplier. This means that UBv1 and UBv2 kills, or the CoP+ might if you have UBv1C completions, will not make these challenges any faster. Powersurge multipliers - OfP and milestone bonuses, as well as the reward from itself - are disabled in the challenge. This means that you want to cap your powersurge as early as possible.\nThis challenge is basically a time gate. If you can black bar your powersurge from the very…"
   },
   "history": [
    "This challenge was introduced in game version 4.41.1554 (2025-04-30)."
   ],
   "wikiRev": "2025-05-22T18:50:14Z"
  },
  {
   "code": "DAC",
   "name": "Divinity Accumulation Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Divinity_Accumulation_Challenge",
   "unlock": [
    "Each DivGen upgrade 10k+",
    "or Super DivGen"
   ],
   "requires": [],
   "max": "10 (+1)",
   "playstyle": "Moderate",
   "rewardRating": 2,
   "notes": null,
   "chp": 150,
   "stages": {
    "6": "All"
   },
   "check": [
    {
     "note": "Each DivGen upgrade 10k+, or Super DivGen"
    }
   ],
   "export": "Divinity Accumulation Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "This is like a normal rebirth\nIn this challenge, you will need to generate 1e25 x (4^Challenges Completed) Divinity in a single rebirth. There are no blocks on where this divinity can be generated from, and can be produced by Battle, the Divinity Generator,…",
    "unlock": "You must meet one of the following requirements:\n• Have each Divinity Generator Upgrade Level be at least 10k\n• Have Super Divinity Generator\n• Complete 1…",
    "restr": "No Restrictions.",
    "strat": "(see the table on the wiki)\nBuild Divinity gen, send Divinity camp, level Divinity RTI. You can also use Lucky Draws and Double Div helps for later ones."
   },
   "history": [
    "This challenge was released in Beta version 4.33.1668  (2026-03-28)."
   ],
   "wikiRev": "2026-04-19T13:46:13Z"
  },
  {
   "code": "BCC",
   "name": "Boosting Capacity Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Boosting_Capacity_Challenge",
   "unlock": [
    "10 DAC"
   ],
   "requires": [
    [
     "DAC",
     "10"
    ]
   ],
   "max": "10 (+1)",
   "playstyle": "Moderate",
   "rewardRating": 3,
   "notes": "DivGen limited to 100k levels per offline calc",
   "chp": 225,
   "stages": {
    "7": "All"
   },
   "check": [
    {
     "ch": "DAC",
     "n": 10
    }
   ],
   "export": "Boosting Capacity Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "This is like a normal rebirth.\nIn this challenge, you will need to level your regular Divinity Generator capacity to 200,000 * (1 + Challenges Completed)\nThis challenge has a bonus 11th completion, that requires leveling your Super Divinity Generator Capacity…",
    "unlock": "Complete 10 Divinity Accumulation Challenges",
    "restr": "No Restrictions.",
    "strat": "(see the table on the wiki)\nBCC1 should take 100 minutes if you can black bar the capacity upgrade throughout the challenge, and will scale up accordingly - BCC10 taking 1000 minutes (or about 17 hours). Make sure you have enough clones on capacity and enough BS to keep the black bar, you don't need div gain or converting speed for this challenge."
   },
   "history": [
    "This challenge was released in Beta version 4.33.1668  (2026-03-28)."
   ],
   "wikiRev": "2026-04-05T23:40:52Z"
  },
  {
   "code": "PWC",
   "name": "Powerful Worker Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Powerful_Worker_Challenge",
   "unlock": [
    "100M max clones"
   ],
   "requires": [],
   "max": "20",
   "playstyle": "Moderate",
   "rewardRating": 4,
   "notes": null,
   "chp": 600,
   "stages": {
    "9": "All"
   },
   "check": [
    {
     "stat": "maxClones",
     "min": 100000000
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "ch": "SDGC",
       "n": 1
      },
      {
       "ch": "BCC",
       "n": 11
      }
     ]
    }
   ],
   "export": "Powerful Worker Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "This is like a normal rebirth.\nIn this challenge, you will need to generate 1e28 x (2^Challenges Completed) Divinity from Overcapping Worker Clones. Only Divinity produced from Divinity Generator directly counts for this challenge.",
    "unlock": "Have 100 Million+ Max Clones",
    "restr": "No Restrictions.",
    "rec": "Have a Super DivGen. Beating BCC #11 is highly recommended and a good measure of the amount of building required for finishing PWC #20.\nAs the target doubles every time, the later challenge instances are significantly longer than the first instances. At 2…",
    "strat": "Divinity output is all that matters here, so your clones should spend most of their time on RTI Divinity, RTI Build Speed, and upgrading your Super DivGen. Some RTI SpaceDim levels will also help. Chakra Pills will help a little bit, by increasing the rate of SDG upgrading.\nLight clones can be focused on Fusion Retrofitting, though this isn't strictly necessary.\n(see the table on the wiki)"
   },
   "history": [
    "This challenge was released in Beta version 4.33.1668  (2026-03-28)."
   ],
   "wikiRev": "2026-05-08T16:51:25Z"
  },
  {
   "code": "DRC",
   "name": "Double Rebirth Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/Double_Rebirth_Challenge",
   "unlock": [
    "None (challenges unlocked)"
   ],
   "requires": [],
   "max": "25",
   "playstyle": "Active",
   "rewardRating": 4,
   "notes": "Improved next-at for 99 GP. 1.5-3h runs make this fast",
   "chp": 450,
   "stages": {
    "0": "Do 1 as the 1st challenge",
    "1": "Top priority"
   },
   "check": [],
   "export": "Double Rebirth Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "This is the most basic challenge and similar to any ascension/rebirth/reset mechanic in most other idle games. You will rebirth twice, setting your multis back to 1. \nThe reward from this will provide a permanent boost to your power and should be one of the…",
    "unlock": "Defeat Tyrant Overlord Baal.",
    "restr": "None.",
    "rec": "None. This is the easiest challenge and great to do early on for any player.",
    "strat": "• This challenge can be easily completed from the moment it is available, as it has no special requirements or restrictions.\n• Banked GP and Crystal Power (CP) for higher stats helps speed up the challenge. As do high pet stats. (3k growth is good, higher is better.)\n• Early rebirths benefit greatly from creation count and creation speed increases, as creating scales strongly with both.\n• Later rebirths (once monuments and upgrades are unlocked) benefit a lot from build speed and clone cap, like P. Baal runs.\n•…"
   },
   "history": [],
   "wikiRev": "2025-03-26T17:05:20Z"
  },
  {
   "code": "GSC",
   "name": "God Skip Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/God_Skip_Challenge",
   "unlock": [
    "1 DRC"
   ],
   "requires": [
    [
     "DRC",
     "1"
    ]
   ],
   "max": "26",
   "playstyle": "Active",
   "rewardRating": 4,
   "notes": null,
   "chp": 372,
   "stages": {
    "2": "All"
   },
   "check": [
    {
     "ch": "DRC",
     "n": 1
    }
   ],
   "export": "God Skip Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "Like a DRC, but one god is missing and so is everything unlocked by defeating that god. First missing god is Chronos, second is Coatlicue, third is Amaterasu, and so on.",
    "unlock": "Complete 1 DRC.",
    "restr": "None for the first few runs. Gets much harder as earlier gods are skipped.\n• Freya - No Monument Upgrades\n• Cybele and Izanagi onward - No Divinity Generator\n• Nephthys - No divinity, just like an NDC\n• Diana - No Monuments\n• Hyperion - No Rebirth (Do NOT do this extra GSC until much later in the…",
    "rec": "Until Freya this challenge is barely harder than a DRC. Beyond Freya, having a high base might (30-50k%) will make most of these relatively trivial by just doing might runs. Pets and your Planet will also help so having a level 50+ planet as well as some pets…",
    "strat": "• Until Freya is not much harder than a DRC, so it is recommended to do at least that much.\n• Freya: Have a ratio of 4:3:3 between Temple of God, Pyramids of Power, and Godly Statue. This corresponds to a ratio of 22:7:2 in the number of clones.\n• From this point on you will be relying heavily on might runs so it is recommended that you have at least 30-50k% might and have completed DRC’s.\n• Cybele: Locks div gen. Fight stronger monsters than you normally would. Save one-time sources of divinity (pet campaigns,…"
   },
   "history": [],
   "wikiRev": "2024-09-19T00:58:40Z"
  },
  {
   "code": "TGSC",
   "name": "True God Skip Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/True_God_Skip_Challenge",
   "unlock": [
    "All 26 GSC"
   ],
   "requires": [
    [
     "GSC",
     "26"
    ]
   ],
   "max": "26",
   "playstyle": "Active",
   "rewardRating": 3,
   "notes": null,
   "chp": 780,
   "stages": {
    "2": "First 12",
    "5": "Next 6",
    "7": "Finish them"
   },
   "check": [
    {
     "ch": "GSC",
     "n": 26
    }
   ],
   "export": "True God Skip Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (TGSC)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "This challenge is similar to a normal GSC, but all gods which were skipped from previous completions will be skipped instead of only one.\nGoal to finish: Defeat Tyrant Overlord Baal.",
    "unlock": "Completed all GSC.",
    "rec": "The stat requirements vary greatly depending on how far you want to push TGSCs.\nThe first couple of completions plays almost exactly like DRC. \nThe middle ones are the ones you could benefit from many clones and good Might.\nAfter that, there is not much you…",
    "strat": "This challenge dramatically varies, depending on how many gods are skipped.\n• Up to Zeus this challenge works almost exactly like DRC, although after that problems start to become visible. The more the gods are missing, the more potential multiplier you lose without defeating them, but this is nothing some more monuments and one additional rebirth cannot solve.\n• Without Susano O you lose the fastest way to increase your multiplier(if you rush to Divinity generator for quick upgrades and purchases), Athena then…"
   },
   "history": [],
   "wikiRev": "2026-09-16T01:12:24Z"
  },
  {
   "code": "MQC",
   "name": "Monster Queen Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/Monster_Queen_Challenge",
   "unlock": [
    "5 DRC"
   ],
   "requires": [
    [
     "DRC",
     "5"
    ]
   ],
   "max": "20",
   "playstyle": "Active",
   "rewardRating": 2,
   "notes": "Clones on non-BB monsters for div buy",
   "chp": 450,
   "stages": {
    "4": "All"
   },
   "check": [
    {
     "ch": "DRC",
     "n": 5
    }
   ],
   "export": "Monster Queen Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "This is a challenge that works like doing two rebirths in a row, resetting your multipliers to their starting values.\nDefeat Monster Queen while the divinity generator is disabled. With every completion, Monster Queen will be stronger than before (base power…",
    "unlock": "Complete 5 DRCs.",
    "restr": "The divinity generator is not available during this challenge.",
    "rec": "Can realistically be done around the same time you would do NDC since the challenges are very similar to each other, but MQC does require you to climb into the P.Baals in order to have high enough multis to kill the Monster Queen. Saving these until you have…",
    "strat": "The table below shows the Monster Queen's increase in power across each MQC.\n(see the table on the wiki)\nPlays out mostly like a DRC.  Use frequent rebirths to drive multis up as quickly as possible.\nThe only significant difference is the lack of the divgen, which effectively prevents you from spamming the higher monument upgrades.  You can (and should) still use GP to purchase divinity to get some/more monument upgrades, because even small numbers of them make a huge impact.\nBecause the reward from this challenge is not that…"
   },
   "history": [],
   "wikiRev": "2025-12-23T14:53:22Z"
  },
  {
   "code": "NDC",
   "name": "No Divinity Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/No_Divinity_Challenge",
   "unlock": [
    "50 Creation Count"
   ],
   "requires": [],
   "max": "25",
   "playstyle": "Active",
   "rewardRating": 3,
   "notes": "Import next-ats each rebirth",
   "chp": 900,
   "stages": {
    "3": "All"
   },
   "check": [
    {
     "stat": "cc",
     "min": 50
    }
   ],
   "export": "No Divinity Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "Before this challenge begins, you perform a Double Rebirth resetting your multiplier. You must defeat Baal while not being able to buy creations with divinity.",
    "unlock": "Have a creation count of at least 50.",
    "restr": "You can't buy anything with divinity.",
    "rec": "A high base might% (30-50k%), a decent-sized planet, and some beefy pets will trivialize these. Otherwise, a high CC and 3.4-10k CS so that you can build some monuments and their upgrades.",
    "strat": "Might-runs with a high base might, and strong pets will reduce the reliance on monuments, but if you are struggling with those areas: have as much Creation Count as possible. 50+ is enough, while 100+ makes them almost as quick as DRCs. Don’t worry about unlocking the DIV gen since it is useless anyways.\nOnce monument upgrades are available, focus on Mighty Statues and Mystic Gardens, since it's practical to manually create 20 mountains and forests in the time it takes to unlock Might each rebirth.\nOverview of…"
   },
   "history": [],
   "wikiRev": "2026-08-22T20:14:49Z"
  },
  {
   "code": "UGC",
   "name": "Ultimate Gods Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Gods_Challenge",
   "unlock": [
    "1 RTI"
   ],
   "requires": [
    [
     "RTI",
     "1"
    ]
   ],
   "max": "20",
   "playstyle": "Semi-active",
   "rewardRating": 3,
   "notes": null,
   "chp": 450,
   "stages": {
    "6": "Whenever you like"
   },
   "check": [
    {
     "score": "RTI",
     "min": 1
    }
   ],
   "statHint": [
    {
     "to": 10,
     "need": [
      {
       "ch": "DRC",
       "n": 25
      },
      {
       "stat": "planetLevel",
       "min": 50
      }
     ]
    },
    {
     "label": "the second half",
     "need": [
      {
       "ch": "UBC",
       "n": 50
      },
      {
       "score": "RTI",
       "min": 100
      },
      {
       "stat": "bsTotal",
       "min": 300000
      },
      {
       "stat": "maxClones",
       "min": 100000000
      }
     ]
    }
   ],
   "export": "Ultimate Gods Challenges",
   "tools": [
    [
     "Compiled sheet › Calcs (BP calculator)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1550953788"
    ]
   ],
   "wikiInfo": {
    "desc": "Before this challenge begins, you perform a Double Rebirth resetting your multiplier. You must defeat P. Baal V11 to finish, increasing by 1 P. Baal per challenge. In this challenge the power of all gods are stronger by (1.2 + 0.2 * UGCs finished) ^ number of…",
    "unlock": "Finish at least one RTI Challenge",
    "restr": "None",
    "rec": "Similar to PBC, UBC/UAC help to defeat the higher level P. Baal. DRC’s completed, some beefy pets, level 50+ planet, 30-50k% Might.\nDue to the scaling of the strength of gods, the first couple challenges can be done fairly early while the second half of the…",
    "strat": "You can treat this very similarly to a PBC at first, but you will need to switch to longer runs of 3-6h rb's once you hit a wall with your current stats. Consider waiting until all UBC are completed first before going too far in this challenge."
   },
   "history": [],
   "wikiRev": "2024-02-14T14:14:31Z"
  },
  {
   "code": "LCC",
   "name": "Light Clone Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/Light_Clone_Challenge",
   "unlock": [
    "All 20 SDC"
   ],
   "requires": [
    [
     "SDC",
     "20"
    ]
   ],
   "max": "25",
   "playstyle": "Moderate",
   "rewardRating": 3,
   "notes": null,
   "chp": 750,
   "stages": {
    "7": "All"
   },
   "check": [
    {
     "ch": "SDC",
     "n": 20
    }
   ],
   "export": "Light Clone Challenges",
   "tools": [
    [
     "LCC spreadsheet",
     "https://docs.google.com/spreadsheets/d/1xA2s-O471Reoaur4Kl0kqXDuuOzNhH4ZfHFf9-Zi_BY/edit#gid=585481951"
    ]
   ],
   "wikiInfo": {
    "desc": "Your average Light Clones gained per rebirth needs to exceed 100. This increases by 100 more LC needed per completion.",
    "unlock": "Complete all 20 SpaceDim Challenges.",
    "restr": "This is a challenge that works like doing two rebirths in a row, resetting your multipliers to their starting values.\nEarly SpaceDim does not work for Self Replicating AI in this challenge -- killing P. Baal v100 is required to use this SpaceDim Element. All other SpaceDim Elements (including…",
    "rec": "As you have capped SpaceDim challenges to unlock this challenge, you are capable of completing these challenges as well.",
    "strat": "Do longer climbing rebirths and pick a reset point (resetting at 1000-1500 burns a few, but not many. Reset at 2000-2500 to avoid burning resets). For the first few, 3-hour rebirths are pretty good; then 6 becomes better. For the final few, you can climb to v100 and use Self Replicating AI to finish them off if desired.  (Note: Early SpaceDim does not work for Self Replicating AI in this challenge -- killing P. Baal v100 is still required.)\nUse light clones on Hyperlane Engine in the first rebirth, and then on…"
   },
   "history": [],
   "wikiRev": "2025-08-08T23:25:17Z"
  },
  {
   "code": "1KC",
   "name": "1000 Clone Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/1000_Clone_Challenge",
   "unlock": [
    "2 DRC"
   ],
   "requires": [
    [
     "DRC",
     "2"
    ]
   ],
   "max": "40",
   "playstyle": "Active",
   "rewardRating": 4,
   "notes": null,
   "chp": 750,
   "stages": {
    "2": "All"
   },
   "check": [
    {
     "ch": "DRC",
     "n": 2
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "ch": "DRC",
       "n": 25
      },
      {
       "stat": "totalMight",
       "min": 100000
      }
     ]
    }
   ],
   "export": "1000 Clones Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "You liked DRCs? Getting pretty and easy and fast at this point, right? Now do them with only 1000 clones.",
    "unlock": "Complete 2 DRC.",
    "restr": "Like a DRC, with the added restriction of having only 1000 clones until you defeat Baal.",
    "rec": "Have at least 100k+ Total Might (as well as having the full DRC challenge series completed) are recommended at a minimum if you choose to run this challenge as a series of might runs.\nFor shorter 1KCs, you will need a substantial amount of Building Speed,…",
    "strat": "Fundamentally, 1000 Clone Challenges play almost identically to Double Rebirth Challenges, just with a severe restriction on clones you can field. To mitigate this issue, you will want to be as efficient as possible with the clones you have. This includes only fighting monsters if you need the Divinity they drop, avoiding training Physical if the Creation Stat is better for HP and Attack (due to CC), and building less Monuments compared to their upgrades (as they are time inefficient).\nSpending God Power on…"
   },
   "history": [],
   "wikiRev": "2026-02-24T21:03:38Z"
  },
  {
   "code": "NTC",
   "name": "No Training Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/No_Training_Challenge",
   "unlock": [
    "All 20 MQC"
   ],
   "requires": [
    [
     "MQC",
     "20"
    ]
   ],
   "max": "20",
   "playstyle": "Active",
   "rewardRating": 2,
   "notes": null,
   "chp": 600,
   "stages": {
    "4": "After MQC"
   },
   "check": [
    {
     "ch": "MQC",
     "n": 20
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "cc",
       "min": 200
      },
      {
       "stat": "csTotal",
       "min": 30000
      },
      {
       "stat": "pbaal",
       "min": 20
      }
     ]
    }
   ],
   "export": "No Training Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "This challenge is a multi-reset, where you have to Beat P.Baal V20 (Mew) with training and skills disabled (this also disables might).\nThe HP Regen from the Battle stat from MQC, which normally doesn't activate until after 15 minutes into a rebirth, will…",
    "unlock": "Completed all MQC.",
    "rec": "CC around 200-ish and CS at 30k% at minimum. If you do not have the ability to beat P.Baal v20 easily under normal circumstances, this will be much harder. Having a few UBC done and a few thousand RTI perm levels in Battle/Creating both help quite a bit.",
    "strat": "Because you are restricted from increasing Physical and Mystic, Battle and Creating will be your only source of stats. Battle will increase your HP regen and attack power, while Creating will increase your Max HP and attack power. Another result of not having Phys/Myst is the lack of pet training. Your pets will defeat clones very quickly and will take an extended amount of time to level them up. Thankfully, PLC still works in this challenge. \nYour clones do not have a regen stat, and the lack of Mystic makes them…"
   },
   "history": [
    "No Training Challenge was introduced in version 3.91.1323 (2022-06-15)",
    "The restriction to No Training Challenge Battle Regen was added 2025-07-31"
   ],
   "wikiRev": "2026-07-21T13:23:22Z"
  },
  {
   "code": "OCCC",
   "name": "One CC Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/One_CC_Challenge",
   "unlock": [
    "10M max clones"
   ],
   "requires": [],
   "max": "25",
   "playstyle": "Active",
   "rewardRating": 2,
   "notes": null,
   "chp": 562,
   "stages": {
    "6": "When you're willing"
   },
   "check": [
    {
     "stat": "maxClones",
     "min": 10000000
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "petGrowth",
       "min": 5000000
      },
      {
       "stat": "bsGPCP",
       "min": 200000
      }
     ]
    }
   ],
   "export": "One CC Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "Your CC and currently held GP are reset, and your max clone count is set to 10 million (+2 million per challenge completed).  You must reach your max clone count. This challenge is capped at 25.\nThis challenge is frequently called \"1CCC\" or even \"OCC\" by…",
    "unlock": "Have more than 10 Million max Clones.",
    "restr": "The typical Multi Reset restrictions apply.  In addition, your CC and GP are reset, and your max clone count is set to 10+(2*OCCC's finished) million.  Buying additional CC is disallowed, as are Ultimate Shadow Summons.\nYou will not earn GP from gods if your previous rebirth was under 30 minutes. …",
    "rec": "Decent pet growth (5M+) to climb gods, 200k%+ Building Speed from GP+CP, and a strong God Crystal RTI module and a refreshed Day God Power Challenge (if going for a more idle strategy). Your max clones, CC, and any banked GP do not matter as they get reset…"
   },
   "history": [],
   "wikiRev": "2026-07-23T14:26:59Z"
  },
  {
   "code": "NRC",
   "name": "No Rebirth Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/No_Rebirth_Challenge",
   "unlock": [
    "1 1KC"
   ],
   "requires": [
    [
     "1KC",
     "1"
    ]
   ],
   "max": "20 (25 after 20 UCC)",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": null,
   "chp": 1500,
   "stages": {
    "3": "All (round 1)",
    "6": "Post-UCC round 2"
   },
   "check": [
    {
     "ch": "1KC",
     "n": 1
    }
   ],
   "statHint": [
    {
     "to": 20,
     "need": [
      {
       "stat": "bsTotal",
       "min": 50000
      },
      {
       "stat": "maxClones",
       "min": 15000000
      },
      {
       "stat": "csTotal",
       "min": 10000
      },
      {
       "stat": "planetLevel",
       "min": 50
      }
     ]
    },
    {
     "label": "the extra 5 after UCC",
     "need": [
      {
       "ch": "UBC",
       "n": 50
      },
      {
       "stat": "gpBank",
       "min": 5000
      }
     ]
    }
   ],
   "export": "No Rebirth Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "You must defeat Baal all while being unable to rebirth. There are no other restrictions beyond your multipliers being reset.\nAn additional 5 NRCs are unlocked after completing UCC 20, and these require you to reach P.Baal v1, with one more for each challenge.",
    "unlock": "Complete one 1KC.",
    "restr": "Like a DRC, but you can't rebirth.",
    "rec": "This is one of the most demanding challenges for a new player, stat-wise. 50k+% building speed, 15m+ clones, 10k+% cs, 100k% Might bonus, able to train up to million+% pet bonus, level 50+ planet and 20k+% unspent GP bonus. Doing an RTI before this with some…",
    "strat": "Similar to a DRC or PBC, you want to maximize pet%, planet% and focus as much as possible on Mighty Statue and Mystic Garden and its upgrades. If you've done an RTI, building Everlasting Lighthouse is better than Mighty Statue since Creation will give more attack power and HP than Physical. Next, ensure that you have sufficient levels in Powersurge+ to blackbar (BB) Powersurge itself (with a level 70+ planet, ~1600 levels will suffice to BB with ~10m clones). Focus your crystals on Physical (Creation instead if…"
   },
   "history": [],
   "wikiRev": "2023-12-27T06:05:55Z"
  },
  {
   "code": "PBC",
   "name": "P. Baal Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/P._Baal_Challenge",
   "unlock": [
    "Defeat P.Baal v5"
   ],
   "requires": [],
   "max": "25 (50 after 20 UCC)",
   "playstyle": "Moderate",
   "rewardRating": 3,
   "notes": null,
   "chp": 1500,
   "stages": {
    "2": "While easy",
    "3": "Rest (round 1)",
    "6": "Post-UCC round 2"
   },
   "check": [
    {
     "stat": "pbaal",
     "min": 5
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "ch": "DRC",
       "n": 25
      },
      {
       "stat": "planetLevel",
       "min": 50
      }
     ]
    }
   ],
   "export": "P. Baal Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "Defeat P.Baal n using no more than 5 rebirths (including the one to start the challenge).",
    "unlock": "Kill P.Baal 5",
    "restr": "This is a challenge that works like doing two rebirths in a row, resetting your multipliers to their starting values.\nYou have 5 rebirths (including the one to start it) to defeat P.Baal #(1 + number of challenges finished).",
    "rec": "DRC’s completed, some beefy pets, level 50+ planet, 30-50k% might. UAC/UBC’s can also help immensely by reducing the stats of later P.Baals exponentially.",
    "strat": "Early runs will be only slightly harder than a DRC. On your first challenge you should be aiming to kill 6-7 gods per rebirth (or more), while later challenges will require up to ten or more gods per rebirth.\nIn terms of stats, you are aiming for 1e59 to kill P Baal 1, so you will need to get at least 1e12 stats per rebirth. This means getting to at least Gefion without rebirthing.\nPBv25 will have stats up to 1e106 (less with UBC’s) so if you can get to Diana (1e18) before might unlocks, then you should be able to…"
   },
   "history": [],
   "wikiRev": "2024-02-13T16:46:18Z"
  },
  {
   "code": "NRDC",
   "name": "No Rebirth Dungeon Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/No_Rebirth_Dungeon_Challenge",
   "unlock": [
    "1 NRC",
    "Top 36 pet dungeon lvls > 450"
   ],
   "requires": [
    [
     "NRC",
     "1"
    ]
   ],
   "max": "20",
   "playstyle": "Lazy",
   "rewardRating": 4,
   "notes": "Kill off D2 teams in D3-10 for more multi overnight",
   "chp": 1200,
   "stages": {
    "4": "All"
   },
   "check": [
    {
     "ch": "NRC",
     "n": 1
    },
    {
     "stat": "petDungeonTop50",
     "min": 451,
     "label": "Top 50 pets' dungeon levels > 450",
     "haveLabel": "your top 50 have {v}"
    },
    {
     "label": "Top 36 pet dungeon levels > 450",
     "any": [
      {
       "stat": "petDungeonTop36Floor",
       "min": 451,
       "haveLabel": "your top 36 have at least {v}"
      },
      {
       "note": "Top 36 pet dungeon levels > 450"
      }
     ]
    }
   ],
   "export": "No Rebirth Dungeon Challenges",
   "tools": [
    [
     "Compiled sheet › Dungeon",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1984141123"
    ]
   ],
   "wikiInfo": {
    "desc": "You're going to head into what seems to be a simple DRC. However, you can't fight the gods yourself; only your pets can. This challenge is very similar to the UPC.",
    "unlock": "Top 36 Pet Dungeon Levels total is above 450.\nComplete 1 NRC.",
    "restr": "Works like doing two rebirths in a row, resetting your multipliers.\nRebirthing will cancel the challenge.\nOnly your pets can attack gods, until Baal is defeated, but the gods (up through Baal) will attack both your pets and you.  Pet strength in god fights is determined by pet stats, a multiplier…",
    "rec": "Pets with the ability to kill the boss on depth 2 at the minimum. More dungeon slots and better equipment will make it easier. If you are unable to kill D2 bosses, then you are better off spending your time on something else.",
    "strat": "The basic mechanics are identical to UPC, except that the pet bonus from item campaigns is replaced by a bonus from dungeon bosses.  Also, since this is a double-rebirth challenge (unlike UPC), your own stat multiplier will be lost; therefore, you need to boost both your pet stats and your own stats.\nAt difficulty 0, defeating the boss of Depth 1 will multiply pet stats by 2. Defeating the boss of Depth 2 will multiply pet stats by 12. Defeating the boss of Depth 3 will multiply pet stats by 70. Higher difficulty…"
   },
   "history": [
    "Rebirth Bacon used to work in this challenge (allowing very quick completions by starting the challenge and then collecting dungeon results). This was a bug, because the Rebirth Bacon description claimed it would not work in NRDC. This bug was fixed at some time in July 2025 (probably version 4.44.1568)."
   ],
   "wikiRev": "2025-11-25T12:55:57Z"
  },
  {
   "code": "NRCPC",
   "name": "No Rebirth Crystal Power Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/No_Rebirth_Crystal_Power_Challenge",
   "unlock": [
    "100k total Crystal Power",
    "Crystal Sacrifice ChP purchase"
   ],
   "requires": [],
   "max": "25",
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": "Only CP from Crystal Sacrifice counts",
   "chp": 2250,
   "stages": {
    "7": "When climbing gods is easy"
   },
   "check": [
    {
     "stat": "cp",
     "min": 100000
    },
    {
     "label": "Crystal Sacrifice ChP purchase",
     "any": [
      {
       "stat": "chp:Crystal Sacrifice boost",
       "min": 0.001,
       "haveLabel": "Crystal Sacrifice boost {v}%, so it's bought"
      },
      {
       "note": "Crystal Sacrifice ChP purchase"
      }
     ]
    }
   ],
   "statHint": [
    {
     "to": 12,
     "need": []
    },
    {
     "label": "the second half",
     "need": [
      {
       "ch": "UMC",
       "n": 1
      },
      {
       "ch": "1KBHC",
       "n": 1
      }
     ]
    }
   ],
   "export": "No Rebirth CP Challenges",
   "tools": [
    [
     "Compiled sheet › Crystal",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=789971626"
    ]
   ],
   "wikiInfo": {
    "desc": "You must gain a specific amount of Crystal Power through Crystal Sacrifice, with the total amount of required Crystal Power increasing every challenge at a rate of 30 * ( completions + 1). \nCrystal Factory module upgrade cost won't increase. \nCrystal Factory…",
    "unlock": "Have 100,000 total Crystal Power, and have the Crystal Sacrifice Challenge Points purchase.",
    "restr": "Multis are reset to 1, and you cannot rebirth.",
    "rec": "You will most likely be waiting longer to get the Crystal Power from sacrificing than you will be waiting to get enough power to kill the necessary P.Baal for the first half of the challenge series. In the second half, the opposite may be true.\nHaving the…",
    "strat": "For killing P.Baals, ad points and lucky draw stat boosts help push your power. Many of the earlier NRCPCs will be mainly waiting on Crystals — the P.Baal killing isn't the issue here. For later challenges, however, you will need to focus more of your clone time on power-increasing areas. Might Unleash, Monuments, RTI, Powersurge, etc. If the challenges take too long to kill the required P.Baal, it might be best to come back after you have stronger stats. \nFor maximizing Crystal Power gains, you can keep to a…"
   },
   "history": [
    "The 3-day limit on Crystal Factory energy was added in game version 4.18.1432 (2023-11-04)."
   ],
   "wikiRev": "2025-05-04T10:52:31Z"
  },
  {
   "code": "ETC",
   "name": "Exhausted Training Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/Exhausted_Training_Challenge",
   "unlock": [
    "2.5M max clones"
   ],
   "requires": [],
   "max": "27",
   "playstyle": "Moderate",
   "rewardRating": 2,
   "notes": null,
   "chp": 486,
   "stages": {
    "2": "First",
    "3": "The rest"
   },
   "check": [
    {
     "stat": "maxClones",
     "min": 2500000
    }
   ],
   "export": "Exhausted Training Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "This challenge is a multi-reset, where you have to Beat Baal while more trainings and skills are gradually locked away. Because of this restriction, might cannot be unlocked in this challenge.\nAdditionaly, your HP, Attack, and Defense will be divided by 8*(1…",
    "unlock": "Have a Max Clones of 2,500,000 (2.5e6)",
    "strat": "The reward of this challenge is not very strong, I would personally recommend delaying a lot and wait you have access to a lot of high growth pets (>100k) as well as an unlocked RTI(∞) Tab and some Creating bonus permanent bonus.\nAs this is a challenge where might is completely disabled, it will be more beneficial to complete this challenge using short rebirths to boost your rebirth multis. \nIn particular, the main multiplier breakpoints are at 2, 3, 4 and 5 minutes for an x3 multiplier, and then 6, 8, 10, 12, 15,…"
   },
   "history": [
    "This challenge was introduced in version 4.46.1587"
   ],
   "wikiRev": "2026-02-06T09:05:54Z"
  },
  {
   "code": "CCC",
   "name": "Clone Creator Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/Clone_Creator_Challenge",
   "unlock": [
    "10 1KC"
   ],
   "requires": [
    [
     "1KC",
     "10"
    ]
   ],
   "max": "20",
   "playstyle": "Moderate",
   "rewardRating": 3,
   "notes": "Easier with more creation count",
   "chp": 450,
   "stages": {
    "5": "All"
   },
   "check": [
    {
     "ch": "1KC",
     "n": 10
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "ch": "UfCC",
       "n": 25
      },
      {
       "ch": "UBC",
       "n": 50
      }
     ]
    }
   ],
   "export": "Clone Creator Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "This challenge is a multi-reset, where you have to beat P.Baal v9 (+3 for every completion). Your clones will be reset back down to 1000 base clones, and you can get more by creating clones.\nYour Max Clones in this challenge is set by the amount of clones you…",
    "unlock": "Have 10 1000 Clone Challenges complete.",
    "rec": "You need a lot of CC to complete these in a reasonable time, or a lot of patience - or both. Since you are going to be clone-limited, build speed is also important. Light clones will help with boosting your CC and BS.\nAs a baseline, if you could finish all of…",
    "strat": "The first few rebirths should be classic speed-climbing. You start off in a situation similar to the 1000 Clone Challenges but you will get a reasonable number of clones as you progress with your rebirths.\nPut time into pet training, build a divgen, build some monuments, and kill v2s manually while you are spending as much time as possible on creating clones, then rebirth. Note: If you use a next-at for Clone Creation, then they may not count for clone softcap. Due to this, it is recommended to not use clone…"
   },
   "history": [
    "This challenge was introduced in version 4.46.1587"
   ],
   "wikiRev": "2025-09-20T02:04:29Z"
  },
  {
   "code": "LCNRC",
   "name": "Limited Clone No Rebirth Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/Limited_Clone_No_Rebirth_Challenge",
   "unlock": [
    "20 NRC",
    "20 1KBHC"
   ],
   "requires": [
    [
     "NRC",
     "20"
    ],
    [
     "1KBHC",
     "20"
    ]
   ],
   "max": "10",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": null,
   "chp": 750,
   "stages": {
    "10": "All"
   },
   "check": [
    {
     "ch": "NRC",
     "n": 20
    },
    {
     "ch": "1KBHC",
     "n": 20
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "petGrowth",
       "min": 50000000
      },
      {
       "stat": "lightClones",
       "min": 5000000
      }
     ]
    }
   ],
   "export": "Limited Clone No Rebirth Challenges",
   "tools": [
    [
     "Compiled sheet › Calcs (BP calculator)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1550953788"
    ]
   ],
   "wikiInfo": {
    "desc": "This challenge is a multi-reset, where you have to beat Tyrant Overlord Baal in a single rebirth with a limited clone cap. You have 2^(9 - Challenges Completed) * 10 max clones in this challenge, starting with 5120 and finishing the final challenge with only…",
    "unlock": "Have 20 No Rebirth Challenges and 20 1000 Clones Black Hole Challenges complete.",
    "rec": "This is an endgame challenge, one of the last ones you should tackle, and even so, you will probably need more power than what you built up for some of the other challenges.\nYou need very high pet growth (50mil+) and while you will barely have any clones, you…",
    "strat": "For the first few, you will have enough clones to train your pets (or at least Lysnafedda). Once you hit the later challenges, this becomes way less appealing especially if you only train Lysnafedda due to how you manually have to create clones for it to fight, but spam some training while you can.\nSend your best pets to the multi camp, and your second best selection of pets, preferably with growth as high as possible, to the level camp.\nBuild a divgen that you are comfortable with, then start building…"
   },
   "history": [
    "This challenge was introduced in version 4.46.1587"
   ],
   "wikiRev": "2026-07-18T16:13:45Z"
  },
  {
   "code": "NMNRC",
   "name": "No Might No Rebirth Challenge",
   "type": "MR",
   "wiki": "https://itrtg.wiki.gg/wiki/No_Might_No_Rebirth_Challenge",
   "unlock": [
    "20 NRC"
   ],
   "requires": [
    [
     "NRC",
     "20"
    ]
   ],
   "max": "20",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": null,
   "chp": 1500,
   "stages": {
    "7": "All"
   },
   "check": [
    {
     "ch": "NRC",
     "n": 20
    }
   ],
   "export": "No Might No Rebirth Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "Defeat P.Baal v1 (then v2, v3, ..., up to v20 in the 20th instance) without rebirthing, and without Might.",
    "unlock": "Complete 20 No Rebirth Challenges.",
    "restr": "• This is a challenge that works like doing two rebirths in a row, resetting your multipliers to their starting values.\n• Rebirthing in this challenge will automatically cancel it (this means you have to finish it in one rebirth.)\n• You are unable to train Might, with the exception of Physical…",
    "strat": "Raise your stats by any means necessary, other than Might. Pet Multiplier (including Multiplier Campaigns), Planet Multiplier, Monuments and RTI will be your biggest bonuses in the first few runs. Crystals will help if the run lasts long enough. Multiverse bonuses may also help, especially in the later runs.\nHP regeneration is the primary bottleneck. Prioritize Mystic stat boosts (Mystic Gardens, RTI Mystic, and Bonus Mystic from banked God Power) wherever possible. Equipping pets with Soul Swords may also help.…"
   },
   "history": [
    "NMNRC was released on patch 4.42.1556 (2025-05-08).",
    "In the initial release, some parts of the Might tab (namely Divinity+ and Planet+) were still available. This was confirmed to be an unintended bug."
   ],
   "wikiRev": "2025-06-09T15:05:17Z"
  },
  {
   "code": "UBC",
   "name": "Ultimate Baal Challenge",
   "type": "GP",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Baal_Challenge",
   "unlock": [
    "None (challenges unlocked)"
   ],
   "requires": [],
   "max": "50",
   "playstyle": "Semi-active",
   "rewardRating": 5,
   "notes": "Buy 30-50k clones, instant clones to softcap, GP into BS or div; 1-3h runs get you under 24h",
   "chp": 1875,
   "stages": {
    "0": "Do 1 as the 3rd challenge (Crystal Factory; might unleash buffs)",
    "3": "Rest of the first 50 (UBC mines)",
    "6": "Next 50 (to skip AACs)"
   },
   "check": [],
   "export": "Ultimate Baal Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (UBC)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ],
    [
     "P.Baal Powerlevels sheet",
     "https://docs.google.com/spreadsheets/d/1iBl7E_VeDYyDjLj2k9t9ANrHehIHzLlehCK56AnQwZ4/"
    ],
    [
     "Steam guide",
     "https://steamcommunity.com/sharedfiles/filedetails/?id=2693864616"
    ],
    [
     "Steam discussion",
     "https://steamcommunity.com/app/466170/discussions/0/3186862118582201248/"
    ],
    [
     "Pastebin notes",
     "https://pastebin.com/x3b11Aqx"
    ]
   ],
   "wikiInfo": {
    "desc": "Ultimate Baal Challenge (UBC) requires the player to defeat Baal with almost all of their statistics reset, similar to having a new game.\nIt is highly recommended to do this challenge very early, as one of the first challenges you do, as it unlocks several…",
    "unlock": "Defeat Tyrant Overlord Baal.",
    "restr": "The challenge resets your GP purchases, unspent GP, CP, and your rebirth multipliers back to their starting values. One-time GP bonuses such as Improved Next At are not kept but can be bought again during the challenge (see Improved Next At for Challenges). Pets don't contribute stats multis to…",
    "rec": "You will likely do one of these early on to unlock the crystal factory. Don't worry about having any other challenges done, except maybe a DPC or GPC prior to doing your first one.\nSubsequent UBCs benefit immensely from 1KC, AAC, TGSC, and CBC, as well as the…",
    "strat": "Doing a UBC as one of your first challenges, you will not have many other challenges done or strong pets. Because of this, it is very common for this challenge to take you several days. This is okay, and very worth it. \nBecause God Power is so limited in the challenge, you will want to earn what you can from alternative sources. The easiest one to access is the Dungeon Event in Scrapyard D1 \"Cursed Chest\", which while requiring a Rogue Class pet and bring a Holy Water item, will give 5-10 GP every time the event…"
   },
   "history": [],
   "wikiRev": "2026-09-28T01:08:48Z"
  },
  {
   "code": "PGC",
   "name": "Patreon Gods Challenge",
   "type": "GP",
   "wiki": "https://itrtg.wiki.gg/wiki/Patreon_Gods_Challenge",
   "unlock": [
    "5 UBC"
   ],
   "requires": [
    [
     "UBC",
     "5"
    ]
   ],
   "max": "25",
   "playstyle": "Semi-active",
   "rewardRating": 5,
   "notes": null,
   "chp": 1125,
   "stages": {
    "5": "When you're willing"
   },
   "check": [
    {
     "ch": "UBC",
     "n": 5
    }
   ],
   "statHint": [
    {
     "to": 2,
     "need": []
    },
    {
     "label": "after the first couple",
     "need": [
      {
       "ch": "UBC",
       "n": 50
      }
     ]
    }
   ],
   "export": "Patreon Gods Challenges",
   "tools": [
    [
     "PGC Cheat Sheet (Steam guide)",
     "https://steamcommunity.com/sharedfiles/filedetails/?id=2423826636"
    ]
   ],
   "wikiInfo": {
    "desc": "Works like a UBC, but you must defeat named P.Baals, while also working under additional restrictions chosen by the Patreon for whom the P.Baal is named.\nThe first challenge requires you to beat P.Baal v1, the second challenge requires P.Baal v2, and so on.",
    "unlock": "Finish at least five UBCs",
    "restr": "All of the UBC restrictions apply; in addition, each instance of the challenge will have a secret twist.  These are not explicitly stated, either in advance or during the challenge; you must figure them out.",
    "rec": "The first couple are a little harder than a UBC.  If you're comfortable doing UBCs, you can probably do the first few PGCs at least. As they begin requiring higher and higher P.Baals, it is wise to wait until you have better pet equipment and more challenges…",
    "strat": "Similar to a UBC, you must also work out the secret challenge restrictions and work around them simultaneously to finish an extended UBC.\nThe first challenge removes your avatar's Physical and Battle stats, meaning that you get all of your Attack power and HP from Creating (with pet equipment bonus, but without the RTI bonus).  However, Creating has a bonus multiplier to make things slightly fairer.  Rebirth frequently to get to the point where you can build Lighthouse monuments and their upgrades.  Spend God…"
   },
   "history": [],
   "wikiRev": "2026-05-22T01:29:07Z"
  },
  {
   "code": "CBC",
   "name": "Clone Buildup Challenge",
   "type": "GP",
   "wiki": "https://itrtg.wiki.gg/wiki/Clone_Buildup_Challenge",
   "unlock": [
    "None (challenges unlocked)"
   ],
   "requires": [],
   "max": "25",
   "playstyle": "Moderate",
   "rewardRating": 2,
   "notes": null,
   "chp": 900,
   "stages": {
    "0": "Not worth it early; easy with strong pets",
    "3": "Some pre-UBC are alright",
    "5": "UCC unlock"
   },
   "check": [],
   "statHint": [
    {
     "need": [
      {
       "ch": "DRC",
       "n": 25
      }
     ]
    }
   ],
   "export": "Clone Buildup Challenges",
   "tools": [
    [
     "CBC guide (Google Doc)",
     "https://docs.google.com/document/d/1xwvUIzBm5PYNn54vBfTkXUC2eGQXadTfMRUVeaxr4QQ/edit"
    ],
    [
     "CBC guide (published doc)",
     "https://docs.google.com/document/d/e/2PACX-1vSS9MHd6pjVIPAGUT3T-o85OyPkXjPjfZT0mOgTgnLkvc1FaI2TjMLXgmJxEHNY0gfmGr-eQBFENqKp/pub"
    ]
   ],
   "wikiInfo": {
    "desc": "You start off without your GP purchases (similar to an UBC) and have to build up your Clone count to 99,999.",
    "unlock": "Unlock Challenges",
    "restr": "Like UBC this challenge resets your GP bonuses, unspent GP, CP, your rebirth multipliers and total Might bonus back to their starting values.\nYou can't buy/increase shadow Clones with GP purchases.\nAfter succeeding, you will get everything other than your multipliers back.\nAll Dungeon runs and…",
    "rec": "Completed DRC’s and Improved Next At For Challenges (regular INA does not work) make this challenge a breeze. Pet XP overflow from challenge points as well as some beefy pets over 5k growth is also a big plus.\nHaving pets like FSM, Nightmare, Clam and/or…",
    "strat": "This Challenge focuses solely on creating and killing off clones. Try to avoid actually sitting at the clone soft cap by assigning clones to fight monsters that are too strong for them and letting the game automatically replenish them as they die. (Warning: this will reduce the total amounts of clones you have free, which can even take away clones from your Training tab. So consider switching off the \"Add clones if defeated\" toggle in the Monster tab if you are worried about that happening.)\nHave as much Pet…"
   },
   "history": [],
   "wikiRev": "2025-05-24T07:57:57Z"
  },
  {
   "code": "UAC",
   "name": "Ultimate Arty Challenge",
   "type": "GP",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Arty_Challenge",
   "unlock": [
    "2 UBC"
   ],
   "requires": [
    [
     "UBC",
     "2"
    ]
   ],
   "max": "2",
   "playstyle": "Lazy",
   "rewardRating": 1,
   "notes": "2nd UAC for Turtle evo + pet token; generally not worth doing",
   "chp": 150,
   "stages": {
    "5": "Whenever, or never"
   },
   "check": [
    {
     "ch": "UBC",
     "n": 2
    }
   ],
   "recLater": true,
   "export": "Ultimate Arty Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "Like a UBC, but you lose even more and can only press the rebirth button 4 times.\nNote: This challenge is entirely optional. Rewards received from UAC can be obtained through other means. Turtle can be unlocked/evolved via Pet Tokens, and the P.Baal reduction…",
    "unlock": "Complete two UBCs.\nPreviously this only required a single UBC to unlock so it is possible to have completed one or more UACs and still have it show as locked.",
    "restr": "On top of everything you lose in a UBC, you also lose your training cap reduction, planet, and access to TBS. Main Game Research in Adventure Mode provides no effects. Pets will be unable to find God Power in campaigns, dungeons, tavern quests, and GP generated from their special abilities. You…",
    "rec": "While there is marginal benefit from a few other aspects of the game in a UAC, it is good to have a basic knowledge of most of the game mechanics, as well as being fairly well read on various strategies.\nHaving certain challenge sets finished will make this…",
    "strat": "The benefits from NRC, 1KC, PUC, AAC, ETC, and OCCC all help with this challenge, including the extra completions from UCCs. Due to this, the challenge is probably best saved as one of the last challenges you should do, because it takes several weeks even in endgame and can take several months early on, with proportionally small rewards. Doing UACs without these challenges completed is not recommended for this reason, as each one individually reduces the required time to complete substantially.\nAs a general rule,…"
   },
   "history": [],
   "wikiRev": "2026-08-19T00:27:11Z"
  },
  {
   "code": "OC",
   "name": "Overflow Challenge",
   "type": "U",
   "wiki": "https://itrtg.wiki.gg/wiki/Overflow_Challenge",
   "unlock": [
    "Defeat PEv4"
   ],
   "requires": [],
   "max": "Unlimited",
   "playstyle": "Lazy",
   "rewardRating": 4,
   "notes": "Rewards are powerful - don't ignore them",
   "chp": "1",
   "stages": {
    "5": "When schedule doesn't fit others; don't neglect!"
   },
   "check": [
    {
     "note": "Defeat PEv4"
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "maxClones",
       "min": 10000000
      }
     ]
    }
   ],
   "export": "Overflow Challenges",
   "tools": [
    [
     "Compiled sheet › Calcs (OC calculators)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1550953788"
    ]
   ],
   "wikiInfo": {
    "desc": "This is an infinitely repeatable challenge. Your goal is to get Overflow Points from a score based on killing UBV4s, building black holes and (a few) BHU, having a high pet multiplier, keeping universes in reserve, and training RTI, Might and SpaceDim.\nThe…",
    "unlock": "Defeat PEV4.",
    "rec": "Requires defeating PEV4, so needs at least 10M clones and strong pets. All stats are helpful for score (CS, BS, CC) and finishing all other challenges except UAC will make progress easier.",
    "strat": "The square root in the scoring means that to get twice the overflow points in a run you need to have 4 times the score. For that reason it is more efficient to do shorter runs (6h/12h) than longer ones (24h+). All sources of points also either get more expensive as you get more (BH, BHU, Might, SpaceDim, UBV4) or have a parameter in the scoring that makes them worth fewer points as they scale up (Universes, Pet Multi).\nYou should be saving most of your universes rather than using them to build upgrades, unless you…"
   },
   "history": [],
   "wikiRev": "2026-07-10T13:00:47Z"
  },
  {
   "code": "TGC",
   "name": "Total Growth Challenge",
   "type": "U",
   "wiki": "https://itrtg.wiki.gg/wiki/Total_Growth_Challenge",
   "unlock": [
    "50 unlocked pets"
   ],
   "requires": [],
   "max": "Unlimited",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": "~+10% growth income while in challenge; good for lazy pets",
   "chp": "10",
   "stages": {
    "4": "When schedule permits; keep < 24h"
   },
   "check": [
    {
     "stat": "pets",
     "min": 50
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "ch": "PGC",
       "n": 25
      },
      {
       "ch": "UMC",
       "n": 1
      },
      {
       "ch": "UOC",
       "n": 1
      }
     ]
    }
   ],
   "export": "Total Growth Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "This is an infinitely repeatable challenge. Your goal is to earn a total of 10000 + (3000 * challenges completed) growth across all your pets combined.",
    "unlock": "Have 50 Unlocked Pets",
    "restr": "• The growth earned from unlocking new pets does not count for this challenge.\n• The growth earned from dungeons and tavern will only count if claimed after 6 hours in this challenge.\n• Rebirthing does not reset growth earned (according to Svent as of 2024-06-09).",
    "rec": "• All PGC completed, Multiverse unlocked (by doing a UMC), MV Pet Growth unlocked (by doing a UOC).\n• Pets capable of Dungeons depth 3 (depth 4 is better).\n• see note under strategy",
    "strat": "The following list of Pet Growth sources may be incomplete:\n• Tavern quests*: Milking (D), Zoo (B), Mage Training (SS)\n• Growth Campaign\n• Feeding\n• Dungeon events*: Scrapyard 3, Mountain 1 and 3, Forest 1 and 3, all Depth 4 mono-element\n• Food Campaign with Lizard or Baby Carno\n• Multiverse Pet Growth\n• Growing Love Pendant\n• Lucky Draw Growth Rewards\n• Dojo pupils\n• Miscellaneous pet special abilities such as Black Hole Chan, Tenko, Leviathan, Vesuvius\n• Growth rewards in Events\n• Only applies after 6 hours have…"
   },
   "history": [],
   "wikiRev": "2026-08-31T21:54:52Z"
  },
  {
   "code": "UBv1C",
   "name": "Ultimate Being v1 Challenge",
   "type": "U",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Being_v1_Challenge",
   "unlock": [
    "All 45 UUC"
   ],
   "requires": [
    [
     "UUC",
     "45"
    ]
   ],
   "max": "Unlimited",
   "playstyle": "Semi-active",
   "rewardRating": 4,
   "notes": "~1-5 early, 5-15 mid, 16-20 late, 21+ endgame",
   "chp": "25",
   "stages": {
    "4": "When easy; come back as you progress"
   },
   "check": [
    {
     "ch": "UUC",
     "n": 45
    }
   ],
   "statHint": [
    {
     "to": 3,
     "need": []
    },
    {
     "label": "going deeper",
     "need": [
      {
       "stat": "maxClones",
       "min": 1000000000
      }
     ]
    }
   ],
   "export": "Ultimate Being V1 Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "This is an infinitely repeatable challenge, and functions as a normal rebirth.\nOh no, Ultimate Beings have taken over your planet - your planet multi now boosts Ultimate Beings instead of you!. Boost ITRTG until it can hold no more power, and then beat it to…",
    "unlock": "Have UUC Series Completed.",
    "restr": "Defender Clones won't defend and defeating UBv2s does not affect your planet multiplier in this challenge. \nWhen fighting UBv1s, you cannot spend Baal Power or the Powerbonus for fights from powersurge to boost the power of your Clones.",
    "rec": "Lots of clones, and good sources of might leveling speed. If you want to get deeper into this challenge without spending days on each, 1b+ clones and up. The first few challenges are not too bad but the target planet multi doubles on each completion while…",
    "strat": "In the early runs, the Powersurge penalty and boost to ITRTGv1 are so insubstantial that you can play fairly normally. You can't finish the run until it spawns, so you're in for at least 3-4 hours no matter what.\nThe rest of this section will assume you're in a later run, where the fight is more difficult.\nTo start, Shadow Clones should level the SpaceDim boost in RTI until Might is unlocked, and Light Clones should initially improve Might training speed. Once that is sufficiently leveled, transition to increasing…"
   },
   "history": [
    "This challenge was released in game version 4.33.1508 (2024-12-20)."
   ],
   "wikiRev": "2026-09-18T18:44:48Z"
  },
  {
   "code": "UOC",
   "name": "Ultimate Overflow Challenge",
   "type": "U",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Overflow_Challenge",
   "unlock": [
    "1 DMVC"
   ],
   "requires": [
    [
     "DMVC",
     "1"
    ]
   ],
   "max": "Unlimited",
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": "First completion unlocks MV RB multi, growth, GP",
   "chp": "10",
   "stages": {
    "9": "When you feel like it"
   },
   "check": [
    {
     "score": "DMVC",
     "min": 1
    }
   ],
   "export": "Ultimate Overflow Challenges",
   "tools": [
    [
     "Compiled sheet › Calcs (UOC calculators)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1550953788"
    ]
   ],
   "wikiInfo": {
    "desc": "Get as many Multiverses, multiverse upgrades, pet multiplier, might levels, divinity /s, rti levels and god power since rebirth as possible.\nThe challenge must be manually finished, with a minimum runtime of 23.5 hours.",
    "unlock": "Complete at least 1 Day Multiverse Challenge.",
    "rec": "TBD, but you'll definitely want to be able to build strong Multiverse/MV Boost levels within 24 hours.",
    "strat": "Godly Liquids will speed up Multiverse components, and Chakra Pills will speed up the DivGen.  Use these if you have extras.\nFinding the proper balance of shadow clones in DivGen, RTI, Might and Multiverse, and the proper balance of light clones in Spacedim, is going to be key.  This optimization problem hasn't been fully solved yet.\nPutting clones into RTI early seems best.  Focus on RTI SpaceDim, Building Speed, Divinity and Creating Speed.  RTI God Power is good too, if you're planning to do a longer run.\nMove…"
   },
   "history": [
    "The base cost for Higher P Baal was reduced from 3000 to 1000 points, in game version 4.50.1633 (2025-12-31)."
   ],
   "wikiRev": "2026-05-17T17:47:29Z"
  },
  {
   "code": "UBHC",
   "name": "Ultimate Black Hole Challenge",
   "type": "U",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Black_Hole_Challenge",
   "unlock": [
    "1 BHC"
   ],
   "requires": [
    [
     "BHC",
     "1"
    ]
   ],
   "max": "Unlimited",
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": "Bonus GP applies after might unlock; great use of div doublers",
   "chp": "30",
   "stages": {
    "3": "When easy; come back as you progress"
   },
   "check": [
    {
     "ch": "BHC",
     "n": 1
    }
   ],
   "export": "Ultimate Black Hole Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "This is a harder version of BHC in which the goal to complete begins with building 2 Black Holes and 2 upgrades. With each completion up to 15 the required number doubles; after that, the required number is multiplied by 1.5.",
    "unlock": "Complete one Black Hole Challenge.",
    "restr": "None.",
    "rec": "Since the challenge starts at only 2 of each black hole and upgrade, the first few won't be too difficult. The required number of black holes and upgrades will double each completion for the first 15 challenges, but after 15 they will begin to increase by 50%…",
    "strat": "For the early runs, build speed bonuses and clone count matter most. In later runs, Divinity bonuses will become equally or more important than build speed bonuses. There are no special tricks here; just big numbers.\nIn the table below, cost is with 40 BHC completions, having the max divinity cost discount from all sources (which sources?), and assuming you purchase all Galaxies and Universes. Divinity costs will be less if you create part or all of the required Galaxies and Universes.\n(see the table on the wiki)\nBuild speed…"
   },
   "history": [],
   "wikiRev": "2025-12-31T14:13:59Z"
  },
  {
   "code": "UCC",
   "name": "Ultimate Challenge Challenge",
   "type": "U",
   "wiki": "https://itrtg.wiki.gg/wiki/Ultimate_Challenge_Challenge",
   "unlock": [
    "Max: UUC PMC NDC 1KC GSC",
    "AAC CPC DRC CBC"
   ],
   "requires": [
    [
     "UUC",
     "all"
    ],
    [
     "PMC",
     "all"
    ],
    [
     "NDC",
     "all"
    ],
    [
     "1KC",
     "all"
    ],
    [
     "GSC",
     "all"
    ],
    [
     "AAC",
     "all"
    ],
    [
     "CPC",
     "all"
    ],
    [
     "DRC",
     "all"
    ],
    [
     "CBC",
     "all"
    ]
   ],
   "max": "= highest P.Baal",
   "playstyle": "Active",
   "rewardRating": 4,
   "notes": "Capped at your highest P.Baal",
   "chp": "45",
   "stages": {
    "6": "First 20 ASAP",
    "8": "When you feel like it"
   },
   "check": [
    {
     "ch": "UUC",
     "n": 45
    },
    {
     "ch": "PMC",
     "n": 50
    },
    {
     "ch": "NDC",
     "n": 25
    },
    {
     "ch": "1KC",
     "n": 40
    },
    {
     "ch": "GSC",
     "n": 26
    },
    {
     "ch": "AAC",
     "n": 25
    },
    {
     "ch": "CPC",
     "n": 30
    },
    {
     "ch": "DRC",
     "n": 25
    },
    {
     "ch": "CBC",
     "n": 25
    }
   ],
   "export": "Ultimate Challenge Challenges",
   "tools": [
    [
     "Compiled sheet › Challenges (UCC score / custom UCC)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ],
    [
     "Compiled sheet › Calcs (OC-UCC balancer, UCC time)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1550953788"
    ]
   ],
   "wikiInfo": {
    "desc": "Complete other challenges (without the normal rewards).\nStarting this challenge does not trigger a Rebirth.  During this challenge you can freely start other challenges as you normally would, with all the normal requirements and restrictions for each. …",
    "unlock": "Fully complete the following challenges: UUC, PMC, NDC, 1KC, GSC, AAC, CPC, DRC, and CBC.",
    "restr": "You will not receive normal rewards, including challenge completions, beyond the stat multi reward for completing other challenges during UCC.\nYou cannot start any Day challenges while in UCC.  Attempting to do so displays an error message popup saying \"You can't start day challenges while you are…",
    "rec": "None.",
    "strat": "Note: The actual length of a challenge is highly dependent upon your relevant stats (clone count, build speed, pet growth, etc.).  Entries in this table were created by people with varying power levels at varying times, and may not accurately predict your own results.\n(see the table on the wiki)\nThe Compiled Spreadsheets contains a UCC challenge calculator."
   },
   "history": [],
   "wikiRev": "2026-09-08T15:35:55Z"
  },
  {
   "code": "DBC",
   "name": "Day Baal Challenge",
   "type": "D",
   "wiki": "https://itrtg.wiki.gg/wiki/Day_Baal_Challenge",
   "unlock": [
    "DRC in < 1 day",
    "Planet level 5"
   ],
   "requires": [
    [
     "DRC",
     "< 1 day"
    ]
   ],
   "max": "Score",
   "scoreCap": {
    "value": 222,
    "label": "P.Baal v222",
    "short": "v222",
    "chp": 666
   },
   "playstyle": "Active",
   "rewardRating": 2,
   "notes": "Not worth a separate DBC anymore; do it as part of RTI",
   "chp": 333,
   "stages": {
    "2": "RTI unlock",
    "3": "Only redo as part of RTI"
   },
   "check": [
    {
     "note": "DRC in < 1 day"
    },
    {
     "stat": "planetLevel",
     "min": 5
    }
   ],
   "export": "Day Baal Challenge",
   "tools": [],
   "wikiInfo": {
    "desc": "You have 24 hours to beat as many P.Baals as possible after losing all your stat multipliers. Depending on your highest killed P.Baal your Planet Level will be increased past the baseline maximum of 5.\nThis challenge is like doing two rebirths in a row,…",
    "unlock": "Complete a DRC in less than 1 day and have a planet of level 5 or higher.",
    "restr": "None.",
    "rec": "This is directly dependent on how many P.Baals you can kill, spending a day to get a reward of +1 would be better spent on a UUC. If you can do a PBC or DRC in under 12 hours, you will probably get to a reasonable level on this challenge. Don’t forget to use…",
    "strat": "Similar to a DRC and PBC. Use those as a gauge for a strategy.\nIMPORTANT: You can turn off Offline progress each time you log in. Spending a day or 2 without offline progress might be worth it if you think the reward is big enough for the extra day needed."
   },
   "history": [
    "In Version 4.60.1682, the Challenge Point Cap was raised to 666. Prior to this patch, the ChP cap was 333."
   ],
   "wikiRev": "2026-05-31T11:46:04Z"
  },
  {
   "code": "DUC",
   "name": "Day Universe Challenge",
   "type": "D",
   "wiki": "https://itrtg.wiki.gg/wiki/Day_Universe_Challenge",
   "unlock": [
    "UUC in < 1 day"
   ],
   "requires": [
    [
     "UUC",
     "< 1 day"
    ]
   ],
   "max": "Score",
   "scoreCap": {
    "value": 1.15e+25,
    "label": "~1.15e25 universes",
    "short": "1.15e25",
    "chp": 666
   },
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": null,
   "chp": 333,
   "stages": {
    "3": "1st DUC",
    "5": "Crit% cap",
    "8": "ChP cap",
    "10": "Damage% cap"
   },
   "check": [
    {
     "note": "UUC in < 1 day"
    }
   ],
   "statHint": [
    {
     "to": 1,
     "need": [
      {
       "stat": "maxClones",
       "min": 2000000
      },
      {
       "stat": "bsTotal",
       "min": 10000
      },
      {
       "stat": "csTotal",
       "min": 3000
      }
     ]
    },
    {
     "need": []
    }
   ],
   "export": "Day Universe Challenge",
   "tools": [
    [
     "Compiled sheet › Challenges (DUC)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "You have 24 hours to obtain as many Universes as possible. At the end, the held amount will be used to calculate how many Bonus Levels you get on TBS after every Rebirth.\nYou rebirth once going into this challenge, so your stat multipliers are not lost.",
    "unlock": "Complete a UUC in less than 1 day.",
    "restr": "Lucky Draws cannot be opened during challenge. Divinity purchases with GP and Ad points are disabled.",
    "rec": "The minimum reward from this day challenge is negligible, therefore it is recommended that you have all GP TBS upgrades, as well as the ability to make at least 2^10 (1024) universes to get a decent reward. 2-3 million clones, several Build Speed consumables…",
    "strat": "Maximize your div gen with increased build speed (Crystals, Chakra Pills, RTI, Spacedim). Killing UBs and sending pets on Divinity campaigns are going to be a strong source of Divinity. If you find yourself in a place where your Div income is exceeding your usage, be sure to change your auto-buy settings on the Create page to auto-buy the next highest creation. Don't be afraid to spend your ad points on the 300% creation speed boost to make Universes faster. \nFor RTI pets, be sure to focus on BS, CS, and Spacedim.…"
   },
   "history": [
    "In Version 4.60.1682, the Challenge Point Cap was raised to 666. Prior to this patch, the ChP cap was 333."
   ],
   "wikiRev": "2026-05-31T11:44:39Z"
  },
  {
   "code": "DPC",
   "name": "Day Pet Challenge",
   "type": "D",
   "wiki": "https://itrtg.wiki.gg/wiki/Day_Pet_Challenge",
   "unlock": [
    "None (challenges unlocked)"
   ],
   "requires": [],
   "max": "Score",
   "scoreCap": {
    "value": 1.14e+30,
    "label": "1.14e30 pet multi",
    "short": "1.14e30",
    "chp": 666
   },
   "playstyle": "Lazy",
   "rewardRating": 4,
   "notes": "Even the minimum reward is worthwhile",
   "chp": 333,
   "stages": {
    "0": "Do 1 as the 4th challenge",
    "2": "2nd DPC",
    "4": "Every 6-12 months for new highscore"
   },
   "check": [],
   "statHint": [
    {
     "to": 1,
     "need": []
    },
    {
     "label": "capping the score",
     "need": [
      {
       "stat": "maxClones",
       "min": 125000000
      },
      {
       "stat": "lightClones",
       "min": 800000
      }
     ]
    }
   ],
   "export": "Day Pet Challenge",
   "tools": [],
   "wikiInfo": {
    "desc": "You have 24 hours to let your Pet Multiplier grow. At the end, the sum of all Pet Multipliers will be used to calculate the reward. Your god's stat multipliers are not reset going into this challenge. The challenge automatically ends after 24 hours have…",
    "unlock": "Unlock Challenges.",
    "restr": "None.",
    "rec": "None. This challenge can be completed with only the initial pets and will still reward a ~10% upgrade to all pet food with little to no effort. A second challenge to increase your score can be done at any time but is best done when you have 20+ pets that are…"
   },
   "history": [
    "In Version 4.60.1682, the Challenge Point Cap was raised to 666. Prior to this patch, the ChP cap was 333."
   ],
   "wikiRev": "2026-07-22T18:13:36Z"
  },
  {
   "code": "DMC",
   "name": "Day Might Challenge",
   "type": "D",
   "wiki": "https://itrtg.wiki.gg/wiki/Day_Might_Challenge",
   "unlock": [
    "None (challenges unlocked)"
   ],
   "requires": [],
   "max": "Score",
   "scoreCap": {
    "value": 1135503,
    "label": "1,135,503 might",
    "short": "1.14e6",
    "chp": 666
   },
   "playstyle": "Semi-active",
   "rewardRating": 3,
   "notes": "40k DMC for book evo",
   "chp": 333,
   "stages": {
    "1": "1st after the rest of DRC - mightruns only"
   },
   "check": [],
   "statHint": [
    {
     "to": 1,
     "need": [
      {
       "ch": "DRC",
       "n": 25
      }
     ]
    },
    {
     "label": "the second run",
     "need": [
      {
       "ch": "1KC",
       "n": 40
      },
      {
       "ch": "CBC",
       "n": 25
      }
     ]
    }
   ],
   "export": "Day Might Challenge",
   "tools": [
    [
     "Compiled sheet › Might (unleash calc)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1602109296"
    ]
   ],
   "wikiInfo": {
    "desc": "Get as many might levels as possible within 24 hrs. The might levels gained every rebirth are combined for your total score. You can get a maximum score of 1,135,503 might. This challenge does not reset your multipliers.",
    "unlock": "None.",
    "restr": "None.",
    "rec": "Your first DMC should be done after finishing all 25 DRC. You will then want to do your second one after finishing all 1kC and CBC. After that, refresh every 6-12 months for a higher score and better unleash. For early DMCs, you will be relying on free DRC…",
    "strat": "For your first DMC, you will mostly be relying on free might from DRC and any CBCs you have done. It is usually best to do mightruns to maximize the free DRC might.\nLater on, the best strategy is to do 8 3hr rebirths.\nYou can either use a calculator for Next Ats (Compiled Spreadsheets has one) or hit \"spread\" on might with all of your clones. The most optimal numbers to have in the spread ratio would be 30 on the non-unleash, 60/40/30/20/15/12 on unleash. It is worth closing the game when away and not using…"
   },
   "history": [
    "In Version 4.60.1682 (2026-05-31), the Challenge Point Cap was raised to 666. Prior to this patch, the ChP cap was 333. The score cap was also increased to 1,135,503 (from 443,556)."
   ],
   "wikiRev": "2026-06-16T17:20:13Z"
  },
  {
   "code": "DNDC",
   "name": "Day No Divinity Challenge",
   "type": "D",
   "wiki": "https://itrtg.wiki.gg/wiki/Day_No_Divinity_Challenge",
   "unlock": [
    "None (challenges unlocked)"
   ],
   "requires": [],
   "max": "Score",
   "scoreCap": {
    "value": 4436000000,
    "label": "4.436e9 points",
    "short": "4.44e9",
    "chp": 666
   },
   "playstyle": "Active",
   "rewardRating": 4,
   "notes": "Use the DNDC calculator in compiled",
   "chp": 333,
   "stages": {
    "1": "1st lazyrun, after DMC",
    "5": "Second for 15%",
    "9": "Every 6-8 months"
   },
   "check": [],
   "statHint": [
    {
     "to": 1,
     "need": []
    },
    {
     "label": "a higher score",
     "need": [
      {
       "stat": "cc",
       "min": 200
      },
      {
       "stat": "csTotal",
       "min": 5000
      }
     ]
    }
   ],
   "export": "Day No Divinity Challenge",
   "tools": [
    [
     "Compiled sheet (has the DNDC calculator)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit"
    ]
   ],
   "wikiInfo": {
    "desc": "While within this challenge, you can't spend any divinity on creations. To help with this, the creation of light up to plants will give additional creations if your creation speed is fast enough. The goal is to reach the highest god you can, all while…",
    "unlock": "None.",
    "restr": "Works like two rebirths in a row, resetting your multipliers.\nMuch like an NDC, you can’t use divinity in this challenge.\nThe creation of light up to plants allows you to Overcap creating.\nWhen starting this challenge, your 300% creation speed boost will be removed.",
    "rec": "This challenge has a unique base reward, much like the DPC, but increasing that can take some serious CC (200+) and CS (5-10k). Base might and beefy pets will also help you get to a higher god.",
    "strat": "• This is an intensive and high micro challenge. Make sure you start it on a day where you can afford to take the time for it.\n• Because each monument is rooted separately you get more points by spreading creations between different monuments.\n• Because monument points are summed between rebirths while rooted within a rebirth, you get more points per monument the more rebirths you split your monuments between.\n• You overcap [light] to [plant] creations, which reduces the value of creation count (it is still…"
   },
   "history": [
    "In Version 4.60.1682, the Challenge Point Cap was raised to 666. Prior to this patch, the ChP cap was 333."
   ],
   "wikiRev": "2026-05-31T11:31:00Z"
  },
  {
   "code": "DNRC",
   "name": "Day No Rebirth Challenge",
   "type": "D",
   "wiki": "https://itrtg.wiki.gg/wiki/Day_No_Rebirth_Challenge",
   "unlock": [
    "1 NRC"
   ],
   "requires": [
    [
     "NRC",
     "1"
    ]
   ],
   "max": "Score",
   "scoreCap": {
    "value": 222,
    "label": "god 222 (P.Baal v194)",
    "short": "god 222",
    "chp": 666
   },
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": null,
   "chp": 333,
   "stages": {
    "6": "Post-mines v10",
    "9": "Every 12 months"
   },
   "check": [
    {
     "ch": "NRC",
     "n": 1
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "ch": "UBC",
       "n": 50
      },
      {
       "stat": "maxClones",
       "min": 75000000
      }
     ]
    }
   ],
   "export": "Day No Rebirth Challenge",
   "tools": [],
   "wikiInfo": {
    "desc": "This is a challenge like doing two rebirths in a row, resetting your multipliers to their starting values.\nYou have 24 hours to defeat as many gods as possible without rebirthing. Rebirthing will cancel this challenge.",
    "unlock": "Complete 1 NRC.",
    "restr": "Unlike some other Day challenges, the use of Lucky Draws as well as ad points are permitted.",
    "rec": "Stats needed vary depending on if using ad points or lucky draws. Be able to do an NRC in less than 24 hours to get at least a decent score. Going for P. Baal v10 takes a bit more work, preferably having all UBC completed and 75m+ clones.",
    "strat": "Push as much current power as you can. Don't worry about rebirth multis, as this challenge is all in one rebirth. Monuments like Mystic Garden and Everlasting Lighthouse (and upgrades) since Creating will be your main Attack stat (given you've done an RTI). If you've done all 1KBHC, Black holes might be your strongest monument if you have enough clones to put into the Black Hole+ Might. \nPowersurge, pet multiplier camps, crystals, and some RTI leveling into Mystic/Creating. Train any beneficial Mights, including…"
   },
   "history": [
    "In Version 4.60.1682, the Challenge Point Cap was raised to 666. Prior to this patch, the ChP cap was 333."
   ],
   "wikiRev": "2026-05-31T11:33:15Z"
  },
  {
   "code": "DGPC",
   "name": "Day God Power Challenge",
   "type": "D",
   "wiki": "https://itrtg.wiki.gg/wiki/Day_God_Power_Challenge",
   "unlock": [
    "All 25 GPC"
   ],
   "requires": [
    [
     "GPC",
     "25"
    ]
   ],
   "max": "Score",
   "scoreCap": {
    "value": 9990,
    "label": "9,990 GP",
    "short": "9,990",
    "chp": 666
   },
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": null,
   "chp": 333,
   "stages": {
    "5": "1st clear",
    "7": "Every 12 months"
   },
   "check": [
    {
     "ch": "GPC",
     "n": 25
    }
   ],
   "export": "Day God Power Challenge",
   "tools": [],
   "wikiInfo": {
    "desc": "Get as much God Power as possible. This challenge finishes automatically after 24 hours, and only God Power earned in the final rebirth will count toward your score.",
    "unlock": "Complete all 25 GPCs.",
    "restr": "Starting this challenge is like doing a double rebirth, resetting your multipliers to 1. This challenge will automatically end after 24 hours, and only the GP earned in your final rebirth contributes to your score. \nDuring the challenge, Lucky Draws cannot be opened. \nGP can be purchased from the…",
    "rec": "Like most other Day challenges, this will likely be redone regularly for a higher score. You can do your first one as soon as it is unlocked, to earn you more passive God Power over time. One of the biggest contributing factors to this challenge is GP from…",
    "strat": "Be sure to remember all the possible sources of God Power. The only source that doesn't contribute to the total is the GP from Dungeons. You still have access to things like Tavern, Pet Campaigns, all Ultimate Beings (regular, v2, and v4), Black Holes and their upgrades, God Crystals, and of course the normal GP you get from killing gods. \nQuests from Tavern refresh when you collect your daily Lucky Draw, so have one or two ready to collect while you're in the challenge to refresh your quest pool. This allows you…"
   },
   "history": [
    "In Version 4.60.1682, the Challenge Point Cap was raised to 666. Prior to this patch, the ChP cap was 333."
   ],
   "wikiRev": "2026-05-31T11:25:07Z"
  },
  {
   "code": "DMVC",
   "name": "Day Multiverse Challenge",
   "type": "D",
   "wiki": "https://itrtg.wiki.gg/wiki/Day_Multiverse_Challenge",
   "unlock": [
    "1 UMC"
   ],
   "requires": [
    [
     "UMC",
     "1"
    ]
   ],
   "max": "Score",
   "scoreCap": {
    "value": 3330,
    "label": "3,330 multiverse levels",
    "short": "3,330",
    "chp": 666
   },
   "playstyle": "Moderate",
   "rewardRating": 3,
   "notes": "Score of 1 unlocks MV Boost",
   "chp": 500,
   "stages": {
    "6": "1st clear",
    "7": "Every 12 months"
   },
   "check": [
    {
     "ch": "UMC",
     "n": 1
    }
   ],
   "export": "Day Multiverse Challenge",
   "tools": [
    [
     "Compiled sheet › Challenges (DMVC calc)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "Get as many Multiverse levels combined as possible within 5 rebirths, within 24 hours.",
    "unlock": "Complete an Ultimate Multiverse Challenge.",
    "restr": "This is like a normal rebirth.\nYou may rebirth as many times as you like, but only the 5 highest multiverse levels will count. The highest level counts twice.",
    "rec": "Do this challenge after you've completed all of the Ultimate Multiverse Challenges, or have reached your stopping point. The Boost mechanic unlocked by completing this day challenge for the first time is very powerful, so even a low score will net you a…",
    "strat": "The number of Multiverses created across 5 rebirths is summed for the final score, with the highest of those 5 numbers being doubled. \nElement levels other than Multiverse will not count, so just focus on levelling Multiverse.\nDo four rebirths (3 to 4 hours each), with one final longer rebirth to maximize on the doubled score.\nUse godly liquids and chakra pills for the full 24 hours. Use v2 items if you have them, but especially use them in the final long rebirth. Make use of offline time or ad points to further…"
   },
   "history": [
    "In Version 4.60.1682, the Challenge Point Cap was raised to 666. Prior to this patch, the ChP cap was 333."
   ],
   "wikiRev": "2026-05-31T11:26:49Z"
  },
  {
   "code": "DEBC",
   "name": "Day Extreme Building Challenge",
   "type": "D",
   "wiki": "https://itrtg.wiki.gg/wiki/Day_Extreme_Building_Challenge",
   "unlock": [
    "1M BS% from spent GP + milestones"
   ],
   "requires": [],
   "max": "Score",
   "scoreCap": {
    "value": 338300000,
    "label": "3.383e8 points",
    "short": "3.38e8",
    "chp": 666
   },
   "playstyle": "Lazy",
   "rewardRating": 3,
   "notes": null,
   "chp": 333,
   "stages": {
    "8": "1st clear",
    "9": "Every 12 months"
   },
   "check": [
    {
     "stat": "bsGP",
     "min": 1000000,
     "approx": "export shows BS% from GP only; milestones not included"
    }
   ],
   "export": "Day Extreme Building Challenge",
   "tools": [],
   "wikiInfo": {
    "desc": "This challenge is like a normal rebirth.\nHave as many monuments as possible at the end of 24 hours. Only the building speed from god power increases your building speed while in this challenge. Each of the monuments will have an adjusted score depending on…",
    "unlock": "Have 1 Million BS% from spent GP and Milestones.",
    "strat": "Chakra Pills, RTI Build Speed, Physical/Ultimate Crystals, Crystal Power, and any other modifiers have no effect on your Build Speed.  Only Build Speed purchased with God Power matters.\nYou will need some divinity, which means a small- to medium-sized DivGen is important.  Clones on Might and RTI work at full speed, so you can raise the RTI Divinity and Might Clones on Divinity+ levels a bit, keep a modest number of workers on the DivGen, and supplement this with GP Divinity purchases and/or Divinity Campaigns as…"
   },
   "history": [
    "In Version 4.60.1682, the Challenge Point Cap was raised to 666. Prior to this patch, the ChP cap was 333."
   ],
   "wikiRev": "2026-05-31T11:58:47Z"
  },
  {
   "code": "RTI",
   "name": "Road to Infinity",
   "type": "D",
   "wiki": "https://itrtg.wiki.gg/wiki/Road_to_Infinity",
   "unlock": [
    "DBC score P.Baal v10"
   ],
   "requires": [
    [
     "DBC",
     "v10"
    ]
   ],
   "max": "Score",
   "scoreCap": {
    "value": 200,
    "label": "P.Baal v200",
    "short": "v200",
    "chp": 1000
   },
   "playstyle": "Active",
   "rewardRating": 5,
   "notes": "Repeat every 6-12 months",
   "chp": 1000,
   "stages": {
    "2": "Unlock ~v30",
    "3": "Seed unlock v50",
    "5": "Post-mines v100",
    "6": "Intermediate v120-130",
    "7": "Seed evo v140",
    "8": "Every 6-12 months"
   },
   "check": [
    {
     "score": "DBC",
     "min": 10
    }
   ],
   "statHint": [
    {
     "to": 99,
     "need": [
      {
       "stat": "maxClones",
       "min": 10000000
      }
     ]
    },
    {
     "label": "v100+",
     "need": [
      {
       "ch": "UBC",
       "n": 50
      },
      {
       "stat": "maxClones",
       "min": 40000000
      },
      {
       "stat": "bsTotal",
       "min": 150000
      },
      {
       "stat": "petGrowth",
       "min": 2000000
      }
     ]
    }
   ],
   "export": "Road to Infinity",
   "tools": [
    [
     "Compiled sheet › Challenges (Odin's RTI calculator)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ],
    [
     "Compiled sheet › RTI",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=334530179"
    ],
    [
     "RTI Benchmark Sheet (Sim, Rykker)",
     "https://docs.google.com/spreadsheets/d/11g8U9_b3zSs3PFUlZXa3-53KpvUpPCIrKl_-V7pRYpc/edit#gid=1876112863"
    ],
    [
     "Malfat's Early Player RTI Guide",
     "https://docs.google.com/document/d/1QB_Cek5x1pw-AZh3hwwqIt3FmjJoz6ehsOFeULvdhy4"
    ],
    [
     "Meeps RTI Calculator",
     "https://docs.google.com/spreadsheets/d/1X44s7QTxetW3ZYPoVNA3PlgD-SkjbhDhUdybKg2TTJU/edit?gid=782907758#gid=782907758"
    ]
   ],
   "wikiInfo": {
    "desc": "Defeat the highest P.Baal you can within 7 days. Only the P.Baal on your last rebirth counts towards the challenge. The first 24 hours function as a DBC and count towards the reward for that as well.",
    "unlock": "Defeat at least P.Baal v10 in a DBC.",
    "restr": "Works like a double rebirth, resetting your multipliers.\nThe challenge ends automatically after 7 days of game time.  You may finish the challenge at any point after 2 days of game time, by clicking a button on the Rebirth panel.  If you click to finish the RTI early, your RTI result will be the…",
    "rec": "About 10+ million clones with a couple of UBC challenges completed if you want the Seed pet reward. For later runs, maxed UBC are vital when pushing for v100+. Because you will be repeating this challenge often for a new high score, definitive stats are…",
    "strat": "You may rebirth as often as you like, and doing so is recommended.  Essentially this is a week-long DBC. You will end up running RTI several times, attempting to reach a higher score each time. If you reached around v50 on your first time with little to no UBCs, you should do an additional RTI after finishing UBCs to reach v100+. Another run for a v120+ score is recommended before going for a v140+ run for Seed evo for increased levelling speed and a higher RTI multi. \nYou can use up to a max of 900 Lucky Draws…"
   },
   "history": [],
   "wikiRev": "2025-12-23T14:46:41Z"
  },
  {
   "code": "HMUUC",
   "name": "Hard Mode Ultimate Universe Challenge",
   "type": "HM",
   "wiki": "https://itrtg.wiki.gg/wiki/Hard_Mode_Ultimate_Universe_Challenge",
   "unlock": [
    "10k ChP",
    "All 45 UUC"
   ],
   "requires": [
    [
     "UUC",
     "all 45"
    ]
   ],
   "max": "Unlimited",
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": null,
   "chp": null,
   "stages": {
    "5": "Do as possible in < 6h"
   },
   "check": [
    {
     "stat": "chp",
     "min": 10000
    },
    {
     "ch": "UUC",
     "n": 45
    }
   ],
   "export": null,
   "tools": [],
   "wikiInfo": {
    "desc": "Similar to a normal Ultimate Universe Challenge but the required number of universes to create is 3^n instead of 1.",
    "unlock": "Have 10k Challenge Points and turn on the Hard Mode toggle in the challenge list. Additionally, complete all 45 Ultimate Universe Challenge",
    "restr": "This is a normal rebirth with no restrictions.",
    "rec": "The first few challenges are not much harder than a basic UUC, and the first 10 or so can be easily cleared by the time you unlock this challenge. \nBecause the goal to complete scales higher and higher, you will do this challenge in pieces and come back as…",
    "strat": "The first challenge requires you to create 3 Universes, with each subsequent challenge multiplying the number needed by 3. Because you need to create all of these Universes by hand, and cannot simply purchase them, you might find yourself limited by CC in the later challenges. \nYou want to focus on Divinity, so putting most of your time in Build Speed boosting areas and throwing your clones into RTI and Div Gen. A strong RTI Blacksmith, Supporter, Rogue, and Mage will increase all relevant stats. \nThis is a…"
   },
   "history": [],
   "wikiRev": "2025-05-30T04:24:36Z"
  },
  {
   "code": "HMDRC",
   "name": "Hard Mode Double Rebirth Challenge",
   "type": "HM",
   "wiki": "https://itrtg.wiki.gg/wiki/Hard_Mode_Double_Rebirth_Challenge",
   "unlock": [
    "10k ChP",
    "All 25 DRC"
   ],
   "requires": [
    [
     "DRC",
     "all 25"
    ]
   ],
   "max": "Unlimited",
   "playstyle": "Active",
   "rewardRating": 2,
   "notes": null,
   "chp": null,
   "stages": {
    "5": "Do as possible in < 6h"
   },
   "check": [
    {
     "stat": "chp",
     "min": 10000
    },
    {
     "ch": "DRC",
     "n": 25
    }
   ],
   "export": null,
   "tools": [],
   "wikiInfo": {
    "desc": "Similar to a normal Double Rebirth Challenge but the target god to kill increases by 10 each time, starting with P.Baal v10.",
    "unlock": "Have 10k Challenge Points and turn on the Hard Mode toggle in the challenge list. Additionally, have all 25 Double Rebirth Challenge completed.",
    "restr": "This behaves like doing two rebirths in a row, resetting your multipliers.",
    "rec": "Since the target god increases by 10 each time, the stats needed to clear the next challenge will continue to increase. The first couple can be easily cleared after unlocking Hard Mode Challenges. Finishing your UBCs will help speed this up.",
    "strat": "Since you are not limited to a specific number of rebirths like PBC and you do not have a time limit like RTI, you can take as long as you need to finish this challenge. The amount of time you devote to it varies based on how much you value more HMChP. \nThe strategy is similar to just about every other climbing challenge in the game. Spend time leveling your pets and sending them on Multiplier/Divinity camps. Level any stat-relevant SpaceDim elements (don't forget Hyperlane Engine for rebirth multis). \nAd Points…"
   },
   "history": [],
   "wikiRev": "2025-05-30T04:26:08Z"
  },
  {
   "code": "HMBHC",
   "name": "Hard Mode Black Hole Challenge",
   "type": "HM",
   "wiki": "https://itrtg.wiki.gg/wiki/Hard_Mode_Black_Hole_Challenge",
   "unlock": [
    "10k ChP",
    "All 40 BHC"
   ],
   "requires": [
    [
     "BHC",
     "all 40"
    ]
   ],
   "max": "Unlimited",
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": "No specific timing in guide; treated like other HM challenges",
   "chp": null,
   "stages": {
    "5": "Do as possible in < 6h"
   },
   "check": [
    {
     "stat": "chp",
     "min": 10000
    },
    {
     "ch": "BHC",
     "n": 40
    }
   ],
   "export": null,
   "tools": [],
   "wikiInfo": {
    "desc": "Similar to a normal Black Hole Challenge or Ultimate Black Hole Challenge except you must create floor(1.5 ^ (completions + 1)) Black Hole(s) and Black Hole upgrade(s).",
    "unlock": "Have 10k Challenge Points and turn on the Hard Mode toggle in the challenge list. Additionally, complete all 40 Black Hole Challenge",
    "restr": "This is like a normal Rebirth.  While in this challenge, only building speed and creating speed from god power work. All other sources or modifications are disabled, including the default creation speed multiplier for having a high Creation stat.",
    "rec": "Universe creation will be 1 minute with a god power creation speed between 700k and 800k. However, because the number of black holes required is initially small it can be started with much lower values.  Each completion is 3/2 more black holes, which is 9/4…",
    "strat": "TBA\nWhile all modifications to creating speed are disabled, the modifications to CC work. So it helps to level RTI for Spacedim and and Matter Compiler in Spacedim. The Creation Crystal is also good for CC and discount of materials.\nBSC boosts the GP purchases of BS and CS retroactively and is allowed in this challenge. So make sure you max it out before doing this challenge."
   },
   "history": [],
   "wikiRev": "2026-03-01T20:00:54Z"
  },
  {
   "code": "HMSAC",
   "name": "Hard Mode SpaceDim Accumulation Challenge",
   "type": "HM",
   "wiki": "https://itrtg.wiki.gg/wiki/Hard_Mode_SpaceDim_Accumulation_Challenge",
   "unlock": [
    "10k ChP",
    "All 25 SDAC"
   ],
   "requires": [
    [
     "SDAC",
     "all 25"
    ]
   ],
   "max": "Unlimited",
   "playstyle": "Lazy",
   "rewardRating": 2,
   "notes": null,
   "chp": null,
   "stages": {
    "7": "Do as possible in < 6h"
   },
   "check": [
    {
     "stat": "chp",
     "min": 10000
    },
    {
     "ch": "SDAC",
     "n": 25
    }
   ],
   "export": null,
   "tools": [
    [
     "Compiled sheet › Challenges (SpaceDim)",
     "https://docs.google.com/spreadsheets/d/1nVzUV0KHgukuujgMwDYIMOHtiL2B8bWG-Bmgk_P4mSc/edit#gid=1507576910"
    ]
   ],
   "wikiInfo": {
    "desc": "Level up each SpaceDim element to at least 300 * (1 + completions)^1.8. Note that as opposed to the base SAC where you need a combined total number of levels, HMSAC requires each SpaceDim element to reach a specific level.\n(see the table on the wiki)",
    "unlock": "Have 10k Challenge Points and turn on the Hard Mode toggle in the challenge list.\nHave all 25 SAC completed.",
    "restr": "This is like a normal rebirth.",
    "rec": "Much like the other HM challenges, come back to do this one every now and then as your stats increase.",
    "strat": "Place your strongest Blacksmith in RTI, and spread all Light Clones evenly in SpaceDim. Spend your clone time leveling the SpaceDim element in RTI, and wait for the Light Clones to do their thing."
   },
   "history": [],
   "wikiRev": "2024-06-01T18:26:56Z"
  },
  {
   "code": "HMUGC",
   "name": "Hard Mode Ultimate Gods Challenge",
   "type": "HM",
   "wiki": "https://itrtg.wiki.gg/wiki/Hard_Mode_Ultimate_Gods_Challenge",
   "unlock": [
    "10k ChP",
    "All 20 UGC"
   ],
   "requires": [
    [
     "UGC",
     "all 20"
    ]
   ],
   "max": "Unlimited",
   "playstyle": "Semi-active",
   "rewardRating": 2,
   "notes": null,
   "chp": null,
   "stages": {
    "7": "Do as possible in < 6h"
   },
   "check": [
    {
     "stat": "chp",
     "min": 10000
    },
    {
     "ch": "UGC",
     "n": 20
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "maxClones",
       "min": 100000000
      }
     ]
    }
   ],
   "export": null,
   "tools": [],
   "wikiInfo": {
    "desc": "Similar to a normal Ultimate Gods Challenge except the goal stays to defeat P.Baal V10 while all Gods are 6 + (0.5 * completions) ^ number of current god stronger.",
    "unlock": "Have 10k Challenge Points and turn on the Hard Mode toggle in the challenge list.\nHave all 20 UGC completed.",
    "restr": "This behaves like doing two rebirths in a row, resetting your multipliers.  \nThe base multiplier from all monuments is reduced to 1 (like Mighty Statues).",
    "rec": "The reward is quite small compared to the time required.  Consider this a late-game challenge.  Say, 100M clones or higher.  Even with late-game stats, it's hard to justify this versus OC.",
    "strat": "Use short rebirths (10 minutes or so) for the climb to Baal.  You won't be able to benefit greatly from monuments, so the climb will take longer than usual.  Don't neglect monuments entirely, though.  Spamming the lower tier ones does help.\nFor the PBaals, longer rebirths (unlocking Might) are recommended.  You'll want to boost rebirth multis using all the tools available -- lower tier monuments, Multiplier Campaigns, SpaceDim Hyperlane Engine."
   },
   "history": [
    "When first introduced in game version 4.12.1406, the challenge could not be completed due to a bug.",
    "In game version 4.12.1409, one bug was fixed, allowing the challenge to be completed. However, it completed one god earlier than intended (beating P.Baal V9 instead of V10).",
    "This bug was fixed some time before 4.63.1698 (2026-08-21) and is no longer true."
   ],
   "wikiRev": "2026-08-29T08:09:48Z"
  },
  {
   "code": "HMDGC",
   "name": "Hard Mode Div Gen Challenge",
   "type": "HM",
   "wiki": "https://itrtg.wiki.gg/wiki/Hard_Mode_Div_Gen_Challenge",
   "unlock": [
    "10k ChP",
    "All 25 DGC"
   ],
   "requires": [
    [
     "DGC",
     "all 25"
    ]
   ],
   "max": "Unlimited",
   "playstyle": null,
   "rewardRating": 2,
   "notes": "No specific timing in guide; treated like other HM challenges",
   "chp": null,
   "stages": {
    "5": "Do as possible in < 6h"
   },
   "check": [
    {
     "stat": "chp",
     "min": 10000
    },
    {
     "ch": "DGC",
     "n": 25
    }
   ],
   "export": null,
   "tools": [],
   "wikiInfo": {
    "desc": "Similar to a normal Div Gen Challenge, except the divinity generator only produces divinity when it has enough clones. Reach the required divinity per second to complete the challenge, which is equal to 1.0e24 * (1.7 ^ Challenges Completed)",
    "unlock": "Have 10k Challenge Points and turn on the Hard Mode toggle in the challenge list. Additionally, you must have completed all 25 [Div Gen Challenges]",
    "restr": "This is like a normal Rebirth.  While in this challenge, the divinity generator only produces divinity when past the \"Cap\" value of clones. Additionally, the amount of stones that clones can fill the divinity generator with is reduced to 0.95 ^ (challenges completed + 1)",
    "rec": "TBA",
    "strat": "This challenge is fairly straightforward. The only surprising aspect is that your Divinity Generator will be nonfunctional most of the time (whenever you don't have clones working in it). You only need to activate it to grab a bit of Divinity (to keep your Divgen upgrades and Crystal factory working), or to check how close you are to completion. At other times, pull your worker clones out of the Divgen and put them to work upgrading the Divgen or boosting RTI.\nBuild a modest Divinity Generator (~5000 Divinity…"
   },
   "history": [],
   "wikiRev": "2025-06-01T16:58:22Z"
  },
  {
   "code": "HMNDMC",
   "name": "Hard Mode No Div Monument Challenge",
   "type": "HM",
   "wiki": "https://itrtg.wiki.gg/wiki/Hard_Mode_No_Div_Monument_Challenge",
   "unlock": [
    "10k ChP",
    "All 21 NDMC"
   ],
   "requires": [
    [
     "NDMC",
     "all 21"
    ]
   ],
   "max": "Unlimited",
   "playstyle": null,
   "rewardRating": 2,
   "notes": "No specific timing in guide; treated like other HM challenges",
   "chp": null,
   "stages": {
    "5": "Do as possible in < 6h"
   },
   "check": [
    {
     "stat": "chp",
     "min": 10000
    },
    {
     "ch": "NDMC",
     "n": 21
    }
   ],
   "statHint": [
    {
     "need": [
      {
       "stat": "csGP",
       "min": 1000000
      }
     ]
    }
   ],
   "export": null,
   "tools": [],
   "wikiInfo": {
    "desc": "Similar to a normal No Div Monument Challenge, but you only get CS directly from GP. Additionally, all CS bonuses are disabled, except from the Quantum Genesis SD Element and from RTI.\nGet a combined monument multiplier of (2^ChallengesCompleted + 1) × e10 to…",
    "unlock": "Complete all 21 No Div Monument Challenge, have 10k Challenge Points and enter the Hard mode tab in the challenge list.",
    "restr": "• This is like a normal Rebirth.\n• No Div Monument Challenge restrictions apply:\n• You cannot buy anything with Divinity.\n• You can Overcap creating on all creations.\n• While in this challenge, only creating speed from god power works, along with the multipliers received from Space Dimension and…",
    "rec": "Due to the massive restrictions on sources of Creation Speed, having at least 1 Million (1e6) GP Creation Speed is recommended to finish the challenge in a practical amount of time.\nAdditionally, the more sources of Creation Count you can obtain, either from…",
    "strat": "Optional: shift Light Clones to Quantum Genesis and Matter Compiler.\nCreate clones, and assign them to RTI Creating Speed and RTI SpaceDim.\nOn the Monuments tab, turn off the Div Gen toggle, because there's no reason to make one, and you don't want your clones to be moved. Set clones to build Tomb of Gods + upgrades. Don't bother with any other monuments; the costs for their upgrades are simply too high.\nFocus on making Stones, Humans, and Villages.  The first challenge can be done with 7000/100 Tomb of Gods +…"
   },
   "history": [],
   "wikiRev": "2026-02-27T09:00:17Z"
  },
  {
   "code": "HMNDC",
   "name": "Hard Mode No Divinity Challenge",
   "type": "HM",
   "wiki": "https://itrtg.wiki.gg/wiki/Hard_Mode_No_Divinity_Challenge",
   "unlock": [
    "10k ChP",
    "All 25 NDC"
   ],
   "requires": [
    [
     "NDC",
     "all 25"
    ]
   ],
   "max": "Unlimited",
   "playstyle": null,
   "rewardRating": 2,
   "notes": "No specific timing in guide; treated like other HM challenges",
   "chp": null,
   "stages": {
    "5": "Do as possible in < 6h"
   },
   "check": [
    {
     "stat": "chp",
     "min": 10000
    },
    {
     "ch": "NDC",
     "n": 25
    }
   ],
   "export": null,
   "tools": [],
   "wikiInfo": {
    "desc": "Similar to a normal No Divinity Challenge, but the required god to reach is increased by 5 for every completion, starting at P.Baal 5 (Feythe?)",
    "unlock": "Have 10k Challenge Points and turn on the Hard Mode toggle in the challenge list. Additionally, must have completed all 25 NDC.",
    "restr": "Shares all the restrictions with No Divinity Challenge",
    "rec": "TBA",
    "strat": "TBA"
   },
   "history": [],
   "wikiRev": "2025-05-30T04:21:44Z"
  },
  {
   "code": "ROOT",
   "name": "Root Challenges (11)",
   "type": "R",
   "wiki": "https://itrtg.wiki.gg/wiki/Challenges#Root_Challenges",
   "unlock": [
    "25k ChP milestone",
    "RTI P.Baal v140"
   ],
   "requires": [
    [
     "RTI",
     "v140"
    ]
   ],
   "max": "50 each",
   "playstyle": null,
   "rewardRating": 2,
   "notes": "Not individually in the guide; guide says Root challenges should not take longer than 6h",
   "chp": null,
   "stages": {
    "7": "Do as possible in < 6h"
   },
   "check": [
    {
     "stat": "chp",
     "min": 25000
    },
    {
     "score": "RTI",
     "min": 140
    }
   ],
   "export": null,
   "tools": [
    [
     "RTI Benchmark Sheet (Sim, Rykker)",
     "https://docs.google.com/spreadsheets/d/11g8U9_b3zSs3PFUlZXa3-53KpvUpPCIrKl_-V7pRYpc/edit#gid=1876112863"
    ]
   ],
   "wikiInfo": {
    "desc": "Harder versions of eleven base challenges: your stats are raised to an exponent (e.g. rUUC and rDRC ^0.6, rMMC ^0.67, rDGC ^0.8). Each is capped at 50 completions.",
    "unlock": "Claim the milestone for reaching 25k ChP and a P.Baal target of v140 in RTI."
   },
   "history": [],
   "wikiRev": "2026-09-25T08:35:02Z"
  },
  {
   "code": "CEC",
   "name": "Class Experience Challenge",
   "type": "N",
   "wiki": "https://itrtg.wiki.gg/wiki/Class_Experience_Challenge",
   "unlock": [
    "Dojo unlocked",
    "1 Dojo upgrade bought"
   ],
   "requires": [],
   "max": "25",
   "playstyle": null,
   "rewardRating": null,
   "notes": "Added in 4.65.1705 (2026-09-21). Not in the community guide yet. Unlock from the in-game text (\"Have dojo unlocked and upgraded at least one element\"), read as any one Dojo upgrade; the wiki doesn't list it yet.",
   "chp": null,
   "stages": {},
   "check": [
    {
     "stat": "dojoAnyMax",
     "min": 0.001,
     "label": "Dojo unlocked and one upgrade bought",
     "haveLabel": "highest Dojo upgrade {v}%"
    }
   ],
   "export": "Class Experience Challenges",
   "tools": [],
   "wikiInfo": {
    "desc": "Get 20*n million class experience for your pets. All experience gained only counts for things started at most 30 mins before this challenge was started. This means if you want your first dungeons or tavern quests to count, you need to restart them shortly…",
    "restr": "Draining pets or giving free exp to pets is disabled in this challenge."
   },
   "isNew": true,
   "history": [
    "Class Experience Challenge was introduced in game version 4.65.1705 (2026-09-21). Originally, starting this challenge cancelled your Dungeons (even if you had rebirth bacon) and Tavern quests. This restriction was changed to count experience only for activities started <= 30 minutes before the challenge in version 4.65.1706 the same day."
   ],
   "wikiRev": "2026-09-25T13:52:52Z"
  }
 ]
};
