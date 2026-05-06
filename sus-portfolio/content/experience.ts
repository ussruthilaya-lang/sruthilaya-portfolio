// ─────────────────────────────────────────────
//  EXPERIENCE  —  add / edit roles here
//  Shown in the timeline overlay (oldest → newest)
// ─────────────────────────────────────────────

export interface Role {
  id: number
  title: string
  company: string
  domain: string
  period: string
  duration: string
  location: string
  description: string
  highlights: string[]   // bullet points shown in overlay
  skills: string[]
}

export const TIMELINE: Role[] = [
  {
    id: 1,
    title: 'Business Analyst',
    company: 'Sentisum',
    domain: 'CX / Operations',
    period: 'Jan 2022 — Dec 2023',
    duration: '2 yrs',
    location: 'Chennai, IN',
    description:
      'Placeholder — replace with your actual experience details for this role.',
    highlights: [
      'Led CX analytics across 3 product lines',
      'Built NLP tagging pipeline reducing manual effort by 60%',
      'Add your third highlight here',
    ],
    skills: ['SQL', 'Excel', 'Tableau', 'CX Analytics', 'NLP'],
  },
  {
    id: 2,
    title: 'Senior Business Analyst',
    company: 'Sentisum',
    domain: 'CX / Strategy',
    period: 'Jan 2024 — Present',
    duration: '1 yr+',
    location: 'Boston, MA',
    description:
      'Placeholder — replace with your actual experience details for this role.',
    highlights: [
      'Add your first highlight here',
      'Add your second highlight here',
      'Add your third highlight here',
    ],
    skills: ['Python', 'LLMs', 'NLP', 'Data Strategy', 'CX'],
  },
]

// Shown in the bento card preview
export const LATEST_ROLE = TIMELINE[TIMELINE.length - 1]
export const BENTO_HIGHLIGHTS = [
  'Led CX analytics across 3 product lines',
  'Built NLP tagging pipeline reducing manual effort by 60%',
]
