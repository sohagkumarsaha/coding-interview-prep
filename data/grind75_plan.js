// Grind 75 Study Plan — Grind 75 and Blind 75 overlap heavily (Grind 75's
// real value-add over Blind 75 is prioritization and pacing, not a
// different problem set), so rather than a third near-duplicate copy of
// ~70 already-covered problems, this is an 8-week, difficulty-ordered
// schedule built over the problems already in this site. Every id below
// must resolve against DSA_PROBLEMS, BLIND75_PROBLEMS, FAANG_EXTRA_PROBLEMS,
// or NEETCODE_EXTRA_PROBLEMS — validated at build time.
const GRIND75_PLAN = [
  {
    week: 1, focus: "Arrays & Hashing Foundations",
    items: [
      { id: "b75-01", minutes: 15 }, { id: "b75-03", minutes: 15 }, { id: "b75-53", minutes: 15 },
      { id: "b75-54", minutes: 25 }, { id: "b75-55", minutes: 15 }, { id: "b75-02", minutes: 20 },
      { id: "b75-04", minutes: 30 }, { id: "b75-31", minutes: 30 }, { id: "b75-05", minutes: 25 },
    ]
  },
  {
    week: 2, focus: "Two Pointers & Sliding Window",
    items: [
      { id: "b75-56", minutes: 15 }, { id: "b75-09", minutes: 35 }, { id: "b75-10", minutes: 25 },
      { id: "b75-50", minutes: 30 }, { id: "b75-51", minutes: 30 }, { id: "b75-52", minutes: 45 },
      { id: "fx-25", minutes: 40 }, { id: "fx-26", minutes: 15 },
    ]
  },
  {
    week: 3, focus: "Stacks, Binary Search & Linked Lists",
    items: [
      { id: "nc-01", minutes: 25 }, { id: "nc-02", minutes: 20 }, { id: "nc-03", minutes: 30 },
      { id: "nc-04", minutes: 25 }, { id: "nc-06", minutes: 15 }, { id: "b75-08", minutes: 30 },
      { id: "b75-07", minutes: 25 }, { id: "b75-40", minutes: 15 }, { id: "b75-42", minutes: 20 },
      { id: "b75-45", minutes: 30 },
    ]
  },
  {
    week: 4, focus: "More Linked Lists & Trees Intro",
    items: [
      { id: "b75-41", minutes: 15 }, { id: "b75-44", minutes: 25 }, { id: "nc-10", minutes: 25 },
      { id: "nc-09", minutes: 30 }, { id: "b75-62", minutes: 15 }, { id: "b75-60", minutes: 15 },
      { id: "b75-61", minutes: 15 }, { id: "nc-11", minutes: 20 }, { id: "nc-12", minutes: 20 },
      { id: "b75-64", minutes: 25 },
    ]
  },
  {
    week: 5, focus: "Trees Deep Dive, Tries & Heaps",
    items: [
      { id: "b75-68", minutes: 25 }, { id: "b75-69", minutes: 25 }, { id: "b75-70", minutes: 20 },
      { id: "nc-13", minutes: 20 }, { id: "b75-67", minutes: 30 }, { id: "b75-63", minutes: 40 },
      { id: "b75-65", minutes: 40 }, { id: "b75-71", minutes: 30 }, { id: "fx-23", minutes: 20 },
      { id: "nc-15", minutes: 20 },
    ]
  },
  {
    week: 6, focus: "Backtracking & Graphs I",
    items: [
      { id: "dsa-21", minutes: 25 }, { id: "fx-19", minutes: 30 }, { id: "fx-20", minutes: 25 },
      { id: "b75-49", minutes: 30 }, { id: "nc-18", minutes: 30 }, { id: "nc-19", minutes: 25 },
      { id: "b75-30", minutes: 25 }, { id: "nc-20", minutes: 20 }, { id: "b75-27", minutes: 25 },
      { id: "b75-28", minutes: 30 },
    ]
  },
  {
    week: 7, focus: "Graphs II & Dynamic Programming I",
    items: [
      { id: "nc-21", minutes: 25 }, { id: "b75-29", minutes: 30 }, { id: "b75-33", minutes: 25 },
      { id: "b75-34", minutes: 25 }, { id: "b75-16", minutes: 15 }, { id: "b75-22", minutes: 20 },
      { id: "b75-23", minutes: 25 }, { id: "b75-17", minutes: 30 }, { id: "b75-18", minutes: 30 },
      { id: "b75-20", minutes: 30 },
    ]
  },
  {
    week: 8, focus: "Dynamic Programming II, Intervals & Final Review",
    items: [
      { id: "b75-19", minutes: 25 }, { id: "nc-23", minutes: 30 }, { id: "b75-25", minutes: 20 },
      { id: "b75-24", minutes: 30 }, { id: "b75-35", minutes: 25 }, { id: "b75-36", minutes: 25 },
      { id: "b75-37", minutes: 25 }, { id: "b75-39", minutes: 30 }, { id: "b75-32", minutes: 35 },
      { id: "b75-75", minutes: 35 },
    ]
  },
];
