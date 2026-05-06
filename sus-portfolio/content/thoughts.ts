// ─────────────────────────────────────────────
//  THOUGHTS  —  add / edit your thoughts here
//  First 3 hooks show in bento preview
//  All show in the overlay with tag filters
//
//  hook   — the one-liner / haiku (required)
//  rant   — optional longer thought
//  image  — optional image path e.g. '/images/thought1.jpg'
//  tags   — pick from the ThoughtTag type below
// ─────────────────────────────────────────────

export type ThoughtTag = 'Philosophy' | 'Books' | 'Lifestyle' | 'Tech' | 'Poetry' | 'Random' | 'Food' | 'Building'

export interface Thought {
  id: number
  hook: string
  rant?: string
  image?: string
  date: string
  tags: ThoughtTag[]
}

export const THOUGHTS: Thought[] = [
  {
    id: 1,
    hook: 'clarity is a muscle, not a mood.',
    rant: 'I used to wait to feel clear before I started. Now I write the mess and clarity shows up halfway through. It never arrives first.',
    date: 'May 2025',
    tags: ['Philosophy', 'Lifestyle'],
  },
  {
    id: 2,
    hook: 'every model is a compression of someone\'s assumptions.',
    rant: 'ML models don\'t learn the world — they learn the priorities of whoever labelled the data. That\'s not a bug, it\'s the whole thing.',
    date: 'May 2025',
    tags: ['Tech', 'Philosophy'],
  },
  {
    id: 3,
    hook: 'Boston in April is a lie told by the calendar.',
    date: 'Apr 2025',
    tags: ['Random', 'Lifestyle'],
  },
  {
    id: 4,
    hook: 'finishing a book feels like saying goodbye to a person.',
    rant: 'Finished Piranesi last night. Sat there for a few minutes doing nothing. Some books leave you standing in a doorway.',
    date: 'Apr 2025',
    tags: ['Books'],
  },
  {
    id: 5,
    hook: 'the best systems feel inevitable in hindsight and impossible before.',
    rant: 'Been thinking about this while designing my RAG eval harness. The architecture only made sense after I\'d broken it three times.',
    date: 'Mar 2025',
    tags: ['Building', 'Tech'],
  },
  {
    id: 6,
    hook: 'obsession is just curiosity that forgot to eat.',
    date: 'Mar 2025',
    tags: ['Philosophy', 'Random'],
  },
  {
    id: 7,
    hook: 'south indian coffee at 6am is a complete philosophy.',
    date: 'Feb 2025',
    tags: ['Food', 'Lifestyle'],
  },
]

export const TAG_COLORS: Record<ThoughtTag, string> = {
  Philosophy: 'rgba(124,58,237,0.7)',
  Books:      'rgba(37,99,235,0.7)',
  Lifestyle:  'rgba(5,150,105,0.7)',
  Tech:       'rgba(220,38,38,0.7)',
  Poetry:     'rgba(219,39,119,0.7)',
  Random:     'rgba(26,26,26,0.4)',
  Food:       'rgba(245,158,11,0.8)',
  Building:   'rgba(14,116,144,0.7)',
}
