// ─────────────────────────────────────────────
//  PROJECTS  —  add / edit projects here
//  First 3 show in the bento carousel preview
// ─────────────────────────────────────────────

export interface Project {
  id: number
  title: string
  tag: string
  year: string
  stack: string[]
  summary: string       // shown in carousel card (keep under ~100 chars)
  description: string   // shown in overlay detail panel
  link?: string         // optional — external URL
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Agentic RAG Pipeline',
    tag: 'AI / LLM',
    year: '2025',
    stack: ['LangChain', 'FastAPI', 'Pinecone', 'OpenAI'],
    summary: 'Production-grade agentic retrieval system with multi-step reasoning.',
    description:
      'A fully agentic RAG system that breaks down complex queries into sub-tasks, retrieves from a vector store, validates answers, and re-ranks results before responding. Built for production with fallback chains and observability hooks.',
  },
  {
    id: 2,
    title: 'LLM Eval Framework',
    tag: 'Tooling',
    year: '2024',
    stack: ['Python', 'PyTorch', 'Weights & Biases'],
    summary: 'Custom evaluation harness for LLM outputs across multiple dimensions.',
    description:
      'An evaluation framework for scoring LLM outputs on coherence, factuality, and task alignment. Supports both automated and human-in-the-loop eval pipelines, with dashboards for tracking regressions across model versions.',
  },
  {
    id: 3,
    title: 'NLP Document Classifier',
    tag: 'NLP',
    year: '2024',
    stack: ['HuggingFace', 'PyTorch', 'FastAPI'],
    summary: 'Fine-tuned transformer for multi-label document classification at scale.',
    description:
      'Fine-tuned a BERT-based model on a proprietary document corpus for multi-label classification. Deployed via FastAPI with batching support and a feedback loop to continuously improve the model with production data.',
  },
  {
    id: 4,
    title: 'Portfolio v2',
    tag: 'Web',
    year: '2025',
    stack: ['Next.js', 'TypeScript', 'Framer Motion'],
    summary: 'This portfolio — designed and built from scratch.',
    description:
      'Designed entirely from scratch with a focus on editorial typography, micro-interactions, and performance. Built with Next.js, custom cursor, stop-motion avatar, and a bento-style content grid.',
  },
  {
    id: 5,
    title: 'Semantic Search Engine',
    tag: 'AI / Search',
    year: '2023',
    stack: ['Python', 'FAISS', 'SentenceTransformers'],
    summary: 'Semantic search over a large corpus using dense embeddings.',
    description:
      'Built a semantic search system over 500k+ documents using dense vector embeddings and FAISS for fast approximate nearest-neighbour retrieval. Reduced search latency by 60% over BM25 baseline while improving relevance.',
  },
]
