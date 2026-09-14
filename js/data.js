/* ============================================================
   DAXSARA — CONTENT DATA
   Edit this file to add, remove, or change events, projects,
   and thoughts. No other file needs to change.
   ============================================================ */

const DAXSARA_EVENTS = [
  {
    slug: "thought-bringers-tehran",
    status: "upcoming",
    date: "2026-10-09",
    dateLabel: { day: "09", month: "OCT", year: "2026" },
    title: "Thought Bringers, Vol. 1",
    city: "Tehran",
    venue: "Hedish, Main Atrium",
    category: "Salon",
    short: "An evening of ideas staged as a physical encounter — not a panel, a walk-through.",
    description:
      "Thought Bringers is Daxsara's recurring salon: a single evening in which one idea is built into a room. Guests move through a sequence of spaces, each holding a different way of encountering the same question, before arriving at a shared conversation. The first edition takes as its subject the abundance of intelligence — what changes when thinking is no longer scarce.",
    speakers: ["Daxsara Studio", "Guest researcher (TBA)"],
    image: "geo-1"
  },
  {
    slug: "spain-x-iran-isfahan",
    status: "upcoming",
    date: "2026-10-24",
    dateLabel: { day: "24", month: "OCT", year: "2026" },
    title: "Spain × Iran",
    city: "Isfahan",
    venue: "Naqsh-e Jahan Pavilion",
    category: "Cultural Exchange",
    short: "Two geometries of thought — Andalusian and Persian — placed in the same room.",
    description:
      "A cultural exchange built around a simple observation: Persian and Andalusian traditions each developed a mathematics of pattern out of the same impulse, centuries apart. Spain × Iran brings craftspeople, architects, and thinkers from both traditions into Isfahan for a day of shared making, conversation, and a public installation left behind in the city.",
    speakers: ["Delegation from Andalusia", "Isfahan guild artisans"],
    image: "geo-2"
  },
  {
    slug: "ai-abundance-salon",
    status: "upcoming",
    date: "2026-11-14",
    dateLabel: { day: "14", month: "NOV", year: "2026" },
    title: "When Intelligence Becomes Abundant",
    city: "Tehran",
    venue: "Daxsara Studio",
    category: "Working Session",
    short: "A closed working session with founders and operators building through the AI shift.",
    description:
      "A working session, not a conference — twenty operators building products and companies through the current AI shift, gathered to think in public about what changes structurally: org design, hiring, the shape of a team of one. Daxsara facilitates; the room does the thinking.",
    speakers: ["Daxsara Studio", "Invited operators"],
    image: "geo-3"
  },
  {
    slug: "labs-showcase-2026",
    status: "past",
    date: "2026-06-20",
    dateLabel: { day: "20", month: "JUN", year: "2026" },
    title: "Labs — First Cohort Showcase",
    city: "Tehran",
    venue: "Hedish, Main Atrium",
    category: "Academy",
    short: "The first cohort of Daxsara Labs presented what three months of building produced.",
    description:
      "The closing manifestation of Daxsara Labs' first three-month cycle. Eighteen participants presented the work they built — not assignments, but real propositions carried from question to object. Open to families, mentors, and the public inside Hedish.",
    speakers: ["Labs Cohort 01"],
    image: "geo-4"
  }
];

const DAXSARA_PROJECTS = [
  {
    slug: "labs-hedish",
    title: "Daxsara Labs at Hedish",
    tag: "Academy · Ongoing",
    summary: "A three-month experience-based program for teenagers, built inside a shopping mall rather than a school.",
    image: "geo-1"
  },
  {
    slug: "letter-to-hedish",
    title: "A Letter, Before a Proposal",
    tag: "Writing · Foundational",
    summary: "The document that became the philosophical foundation of Daxsara's partnership with Hedish: organizations as answers to enduring questions.",
    image: "geo-2"
  },
  {
    slug: "thought-bringers-series",
    title: "Thought Bringers",
    tag: "Events · Recurring",
    summary: "A recurring salon format — one idea, built into a room, encountered rather than explained.",
    image: "geo-3"
  },
  {
    slug: "public-presence-hedish",
    title: "Public Presence",
    tag: "Installation · Ongoing",
    summary: "A visible, physical layer of Daxsara's transformation work inside Hedish — the mall as a stage for what the company is building.",
    image: "geo-4"
  }
];

const DAXSARA_THOUGHTS = [
  {
    slug: "intelligence-abundant",
    date: "2026-08-02",
    dateLabel: "AUG 2026",
    title: "What happens when intelligence becomes abundant?",
    excerpt: "For all of modern history, thinking has been scarce and expensive. That assumption is now false. Almost nothing about how we organize work was built for its absence.",
    body: [
      "For all of modern history, thinking has been scarce and expensive. Every institution we have — universities, companies, governments — was built on that scarcity. Hire the few who can think well; route decisions to them; protect their time.",
      "That assumption is now false, or close enough to false that we should act as if it is. Almost nothing about how we organize work was built for the absence of scarcity. The interesting question isn't what AI can do. It's what an organization looks like once thinking is no longer the bottleneck — what moves to the center when the thing everyone was rationing is suddenly not rationed.",
      "We think the answer has less to do with tools and more to do with taste, judgment, and the willingness to ask a better question. Those don't get more abundant just because computation does."
    ]
  },
  {
    slug: "universities-and-becoming",
    date: "2026-05-14",
    dateLabel: "MAY 2026",
    title: "Why a school was the wrong room",
    excerpt: "We built our first program for teenagers inside a university. It was the wrong room — not because of the people in it, but because of what the room already meant.",
    body: [
      "We built our first version of this program inside a university, because that is where such things are supposed to happen. It was the wrong room — not because of the people in it, but because of what the room already meant before we arrived.",
      "A university carries a grade economy, an inherited authority, and a fixed idea of who a student is. A teenager walks in already knowing the shape they're expected to take. None of that is anyone's fault. It's just what the building is for.",
      "We moved the program into a shopping mall instead — a public space with no academic memory, where a teenager is not yet anyone in particular. That wasn't a compromise. It was strategic intelligence: rooms teach, whether or not anyone intends them to."
    ]
  },
  {
    slug: "three-fronts-one-company",
    date: "2026-03-01",
    dateLabel: "MAR 2026",
    title: "Why Daxsara is not one thing expanding into three",
    excerpt: "Events, an academy, and transformation work for organizations look like three businesses. They are one company, running on the same underlying way of thinking.",
    body: [
      "It would be easy to describe Daxsara as an events company that later added an academy, or an academy that later added consulting. That description is convenient and wrong.",
      "We conceived all of it together: cultural events, a teenager academy, transformation work with companies and governments, and a public-facing presence for showing how we think. Each is a different manifestation of the same underlying practice — building an experience through which people encounter a change, rather than a slide deck that describes it to them.",
      "The discipline is in refusing to let the differences between an event, a classroom, and a client engagement fool us into building three separate companies by accident."
    ]
  }
];
