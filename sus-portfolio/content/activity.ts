// ─────────────────────────────────────────────
//  ACTIVITY FEED  —  add / edit posts here
//  First 2 show in bento preview
//  All show in the overlay with tag filters
// ─────────────────────────────────────────────

export type Platform = 'x' | 'linkedin' | 'paper' | 'github' | 'blog'
export type ActivityTag = 'LLM' | 'RAG' | 'Agents' | 'NLP' | 'Career' | 'Research' | 'Building'

export interface Activity {
  id: number
  platform: Platform
  title: string        // headline / post hook
  gist: string         // 1–2 sentence description
  url: string          // link to actual post — replace '#' with real URLs
  date: string         // e.g. 'May 2025'
  tags: ActivityTag[]
}

export const ACTIVITIES: Activity[] = [
  {
    id: 1,
    platform: 'x',
    title: 'Why RAG still beats fine-tuning for most production use cases',
    gist: 'Thread on retrieval vs fine-tuning tradeoffs — when each makes sense, and why eval is the real differentiator.',
    url: '#',
    date: 'May 2025',
    tags: ['RAG', 'LLM'],
  },
  {
    id: 2,
    platform: 'linkedin',
    title: 'Started MS in Data Science @ Northeastern',
    gist: 'New chapter — balancing coursework, research, and building. Boston is cold but the energy is good.',
    url: '#',
    date: 'Apr 2025',
    tags: ['Career'],
  },
  {
    id: 3,
    platform: 'paper',
    title: 'Reading: MemGPT — Towards LLMs as Operating Systems',
    gist: 'Fascinating take on virtual context management. The OS analogy for memory hierarchies in LLMs is sticky.',
    url: '#',
    date: 'Apr 2025',
    tags: ['Research', 'LLM', 'Agents'],
  },
  {
    id: 4,
    platform: 'github',
    title: 'Open-sourced my RAG evaluation harness',
    gist: 'A lightweight eval framework for RAG pipelines — faithfulness, relevance, and context recall out of the box.',
    url: '#',
    date: 'Mar 2025',
    tags: ['RAG', 'Building'],
  },
  {
    id: 5,
    platform: 'x',
    title: 'The underrated importance of chunking strategy in RAG',
    gist: 'Most people optimize embeddings and ignore chunking. A bad chunking strategy will tank retrieval quality regardless of model.',
    url: '#',
    date: 'Mar 2025',
    tags: ['RAG', 'NLP'],
  },
  {
    id: 6,
    platform: 'linkedin',
    title: 'Reflecting on 3 years in CX analytics',
    gist: 'What working in customer experience taught me about data that actually moves decisions vs data that just looks good.',
    url: '#',
    date: 'Feb 2025',
    tags: ['Career'],
  },
]

export const PLATFORM_ICONS: Record<Platform, string> = {
  x:        '𝕏',
  linkedin: 'in',
  paper:    '📄',
  github:   '⌥',
  blog:     '✦',
}

export const PLATFORM_COLORS: Record<Platform, string> = {
  x:        'rgba(0,0,0,0.75)',
  linkedin: 'rgba(10,102,194,0.85)',
  paper:    'rgba(26,26,26,0.6)',
  github:   'rgba(36,41,47,0.8)',
  blog:     'rgba(26,26,26,0.6)',
}
