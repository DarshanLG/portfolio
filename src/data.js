// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  firstName: 'Darshan',
  fullName: 'Darshan Laxman Goneppanavar',
  shortName: 'Darshan Goneppanavar',
  initials: 'DG',
  title: ['Software', 'Engineer'],
  tagline: 'Full stack apps, event-driven backends and applied AI. Five years of shipping to production.',
  location: 'Long Beach, CA',
  email: 'darshanlg.usa@gmail.com',
  linkedin: 'https://www.linkedin.com/in/darshanlg',
  github: 'https://github.com/naret16', // TODO: confirm which GitHub account to show
  resume: './resume.pdf',

  // Drop your files into /public and set these, e.g. './hero.mp4' and './portrait.jpg'
  // hero.webm carries an alpha channel so the giant background name shows
  // through around the figure; hero.mp4 is the fallback for browsers that
  // can't decode VP9 alpha (notably Safari), where the backdrop stays opaque.
  heroVideo: './hero.mp4',
  heroVideoAlpha: './hero.webm',
  heroPoster: './hero-poster.png',
  photo: './portrait.jpg',
}

export const heroStats = [
  { value: '5 yrs', label: 'in production' },
  { value: '10K', label: 'users on my platform' },
  { value: 'Dec 2026', label: 'MS CS, CSULB' },
]

export const about = {
  bio: [
    'I build and run production systems end to end: full stack web apps, payment pipelines, data platforms and applied AI. I like owning the whole path, from the schema and the webhook retries to the empty state on the screen.',
    'Right now I am finishing an MS in Computer Science at CSULB, where I am the sole developer on a platform serving 10,000 users.',
  ],
  facts: [
    ['Based in', 'Long Beach, CA'],
    ['Studying', 'MS Computer Science, CSULB'],
    ['Shipping since', '2021'],
    ['Focus', 'Full stack · Backend · Applied AI'],
    ['Open to', 'Full-time SWE roles'],
  ],
  quote: 'From the webhook to the last pixel.',
  badgeId: 'DLG-2021',
}

// Families drive the colour of each tile in the periodic table.
export const families = [
  { id: 'lang', label: 'Languages' },
  { id: 'fe', label: 'Frontend' },
  { id: 'be', label: 'Backend' },
  { id: 'data', label: 'Data' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'ops', label: 'Cloud & DevOps' },
]

export const skills = [
  { s: 'Py', name: 'Python', f: 'lang', used: 'Retrieval layer for NL search, FastAPI chatbot, transformer training' },
  { s: 'Ts', name: 'TypeScript', f: 'lang', used: 'Node middleware handling 2,000+ req/s at Hutech' },
  { s: 'Js', name: 'JavaScript', f: 'lang', used: 'React and Node features on a 178M-customer platform' },
  { s: 'Sq', name: 'SQL', f: 'lang', used: 'Reporting aggregations, query tuning, migrations' },
  { s: 'Ph', name: 'PHP 8', f: 'lang', used: 'Sole-owner migration of a legacy enterprise platform' },

  { s: 'Re', name: 'React', f: 'fe', used: 'Data tables, dashboards and the VLA form app' },
  { s: 'Nx', name: 'Next.js', f: 'fe', used: 'Responsive interfaces for 10,000 monthly users' },
  { s: 'Rx', name: 'Redux', f: 'fe', used: 'State refactor that cut page loads 20%' },
  { s: 'Tw', name: 'Tailwind CSS', f: 'fe', used: 'Interfaces built from Figma designs' },

  { s: 'No', name: 'Node.js', f: 'be', used: 'Middleware with Redis caching, 17% lower latency' },
  { s: 'Ex', name: 'Express', f: 'be', used: 'API for the form-automation model' },
  { s: 'Fa', name: 'FastAPI', f: 'be', used: 'RAG chatbot answering 70% of staff questions' },
  { s: 'Dj', name: 'Django REST', f: 'be', used: 'Analytics API behind real-time dashboards' },
  { s: 'Gq', name: 'GraphQL', f: 'be', used: 'Microservices on Kubernetes' },
  { s: 'Rd', name: 'Redis', f: 'be', used: 'Caching layer in front of PostgreSQL' },

  { s: 'Pg', name: 'PostgreSQL', f: 'data', used: 'Queries, migrations and schema changes across releases' },
  { s: 'Or', name: 'Oracle', f: 'data', used: 'Backing store for a Fortune 500 insurance platform' },
  { s: 'Mg', name: 'MongoDB', f: 'data', used: 'User corrections stored as a retraining signal' },
  { s: 'Kf', name: 'Kafka', f: 'data', used: 'Real-time data pipelines' },
  { s: 'Sp', name: 'Spark', f: 'data', used: 'Stream processing feeding analytics dashboards' },
  { s: 'If', name: 'Informatica', f: 'data', used: 'ETL loading up to 50M rows per run' },

  { s: 'Pt', name: 'PyTorch', f: 'ai', used: '124M-parameter transformer trained from scratch' },
  { s: 'Tr', name: 'Triton', f: 'ai', used: 'Fused kernels: 1.9× softmax, 2.3× LayerNorm' },
  { s: 'Lo', name: 'LoRA', f: 'ai', used: 'Fine-tuned SmolVLM-2B to 87% action accuracy' },
  { s: 'Rg', name: 'RAG', f: 'ai', used: 'Chunking and retrieval tuning for the staff chatbot' },
  { s: 'Cd', name: 'ChromaDB', f: 'ai', used: 'Vector store for search over 62 tables' },
  { s: 'Oa', name: 'OpenAI API', f: 'ai', used: 'Embeddings and GPT-4 generation' },
  { s: 'Cl', name: 'Claude API', f: 'ai', used: 'LLM features and evaluation' },
  { s: 'Lc', name: 'LangChain', f: 'ai', used: 'Retrieval pipelines' },

  { s: 'Aw', name: 'AWS', f: 'ops', used: 'Lambda, API Gateway, SQS, SNS, S3, CloudWatch' },
  { s: 'Gc', name: 'Google Cloud', f: 'ops', used: 'Associate Cloud Engineer certified' },
  { s: 'Az', name: 'Azure', f: 'ops', used: 'AZ-104 Administrator certified' },
  { s: 'Dk', name: 'Docker', f: 'ops', used: 'Containerised services' },
  { s: 'K8', name: 'Kubernetes', f: 'ops', used: 'Deployed GraphQL and REST microservices' },
  { s: 'Jk', name: 'Jenkins', f: 'ops', used: 'CI/CD that cut deploys from 3 h to 45 min' },
  { s: 'Ga', name: 'GitHub Actions', f: 'ops', used: 'Build and test automation' },
]

export const projects = [
  {
    id: 'llm',
    kicker: 'Deep learning · Systems',
    title: 'Transformer from scratch',
    blurb: 'A 124M-parameter decoder-only language model, trained and served without a framework doing the hard parts.',
    points: [
      'Trained on 2.4B tokens across two A100s with DDP, bf16 and gradient checkpointing',
      'Fused Triton kernels: 1.9× faster softmax, 2.3× faster LayerNorm',
      'INT8 quantisation + KV cache cut inference memory 68% at <0.5% perplexity cost',
    ],
    tags: ['PyTorch', 'Triton', 'DDP', 'CUDA'],
    link: '',
    cover: 'llm',
  },
  {
    id: 'vla',
    kicker: 'Applied AI · Full stack',
    title: 'Form-filling VLA model',
    blurb: 'A vision-language-action model that reads a job application form and fills it from your profile.',
    points: [
      '87% action accuracy on unseen Workday, Greenhouse and Lever layouts',
      'Chain-of-thought before action tokens: +11 points on ambiguous fields',
      'User corrections saved to MongoDB as a retraining signal',
    ],
    tags: ['SmolVLM-2B', 'LoRA', 'React', 'Express'],
    link: '',
    cover: 'vla',
  },
  {
    id: 'search',
    kicker: 'CSULB · Search + RAG',
    title: 'Ask-the-database',
    blurb: 'Natural-language search over 62 tables and a chatbot that answers routine staff questions.',
    points: [
      'Staff record lookups 60% faster with embedding search over ChromaDB',
      'RAG chatbot on FastAPI + GPT-4 resolves 70% of routine inquiries',
      'Output correctness and data-sensitivity checks before release',
    ],
    tags: ['OpenAI', 'ChromaDB', 'FastAPI', 'GPT-4'],
    link: '',
    cover: 'search',
  },
  {
    id: 'pay',
    kicker: 'CSULB · Payments',
    title: 'Payment verification pipeline',
    blurb: 'Complete transaction capture during a PayPal vendor migration, with nothing dropped or double-counted.',
    points: [
      'Three verification layers: PDT, REST API and webhooks',
      'SHA256-RSA signature checks, OAuth2, idempotent replay-safe handlers',
      'API Gateway + Lambda, with CloudWatch watching event delivery',
    ],
    tags: ['AWS Lambda', 'API Gateway', 'OAuth2', 'CloudWatch'],
    link: '',
    cover: 'pay',
  },
]

export const journey = [
  {
    kind: 'Work',
    from: '2025', to: 'Now',
    role: 'Full Stack Developer, Graduate Assistant',
    org: 'California State University, Long Beach',
    where: 'Long Beach, CA',
    text: 'Sole developer on a 10,000-user platform migration at 99.9% stability. Built the PayPal verification pipeline, natural-language search and the RAG chatbot.',
    tags: ['PHP 8', 'AWS Lambda', 'FastAPI', 'ChromaDB'],
  },
  {
    kind: 'Education',
    from: '2025', to: '2026',
    role: 'MS in Computer Science',
    org: 'California State University, Long Beach',
    where: 'GPA 3.7 / 4.0',
    text: 'Distributed Computing, Artificial Intelligence, Machine Vision, Computer Architecture, Blockchain.',
    tags: [],
  },
  {
    kind: 'Work',
    from: '2024', to: '2025',
    role: 'Software Developer',
    org: 'Hutech Solutions',
    where: 'Bengaluru · six-person startup',
    text: 'Node and TypeScript middleware at 2,000+ requests per second, RazorPay payments over SNS/SQS at 50,000+ weekly transactions, Kafka and Spark pipelines.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'Kubernetes'],
  },
  {
    kind: 'Work',
    from: '2021', to: '2024',
    role: 'Application Developer Analyst',
    org: 'Accenture',
    where: 'Bengaluru · promoted from Associate in 2022',
    text: 'Full stack features on a health insurance platform serving 178M customers. Informatica ETL loading up to 50M rows a run. Jenkins pipelines that cut deploys from 3 hours to 45 minutes.',
    tags: ['React', 'Node.js', 'Oracle', 'Informatica', 'Jenkins'],
  },
  {
    kind: 'Work',
    from: '2019', to: '2020',
    role: 'Blockchain Research Associate',
    org: 'IoTracx',
    where: 'Bengaluru',
    text: 'Compared consensus algorithms, smart contracts and network throughput to guide DApp architecture.',
    tags: [],
  },
  {
    kind: 'Education',
    from: '2017', to: '2021',
    role: 'BE in Computer Science',
    org: 'Visvesvaraya Technological University',
    where: 'Bengaluru',
    text: '',
    tags: [],
  },
]

export const certifications = [
  { name: 'Google Associate Cloud Engineer', org: 'Google Cloud', year: '2023' },
  { name: 'Google Cloud Digital Leader', org: 'Google Cloud', year: '2023' },
  { name: 'Azure Administrator Associate (AZ-104)', org: 'Microsoft', year: '2023' },
  { name: 'Azure Fundamentals (AZ-900)', org: 'Microsoft', year: '2022' },
]

export const moments = [
  { n: 178, suffix: 'M', label: 'customers on the insurance platform I shipped features to', where: 'Accenture' },
  { n: 10000, suffix: '', label: 'users on a platform I migrated alone, at 99.9% stability', where: 'CSULB' },
  { n: 2000, suffix: '+', label: 'requests per second through my Node middleware', where: 'Hutech' },
  { n: 50000, suffix: '+', label: 'payment transactions processed every week', where: 'Hutech' },
  { n: 2.4, suffix: 'B', decimals: 1, label: 'tokens used to train my transformer from scratch', where: 'Project' },
  { n: 75, suffix: '%', label: 'faster deploys, from 3 hours down to 45 minutes', where: 'Accenture' },
]
