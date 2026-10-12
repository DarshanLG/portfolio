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
  // Every Résumé link on the site reads this. While false they still show in
  // place but are inert -- no href, not focusable, visibly dimmed. Flip it to
  // true to switch them all back on: hero badge, About and Contact.
  resumeEnabled: false,

  // Drop your files into /public and set these, e.g. './hero.mp4' and './portrait.jpg'
  // hero.webm carries an alpha channel so the giant background name shows
  // through around the figure; hero.mp4 is the fallback for browsers that
  // can't decode VP9 alpha (notably Safari), where the backdrop stays opaque.
  heroVideo: './hero.mp4',
  heroVideoAlpha: './hero.webm',
  heroPoster: './hero-poster.png',
  photo: './portrait.jpg',

}

// Skills backdrop: nine renders of Darshan at his desk, one per head pose.
// Built from docs/scene/head_{row}_{col}.jpg by docs/scene-poses.py, which
// prints size / box / face. Re-run it and paste the numbers if they change.
export const scene = {
  src: './scene/scene.webp',          // neutral pose, full size
  srcSm: './scene/scene-sm.webp',     // neutral pose, 1280px for phones
  heads: './scene/scene-heads.webp',  // 3x3 atlas of the head region
  mask: './scene/scene-mask.png',     // where the head patch is pasted
  size: [2752, 1536],
  box: [0.40298, 0.10417, 0.60283, 0.55859], // head region, image uv
  face: [0.4999, 0.3126],                    // between the eyes, image uv
  position: [0.5, 0.42],                     // object-position when cropped
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

// Two timelines, one per section. Keep each in reverse chronological order.
// `details` is what the Experience dialog shows — the full resume bullets for
// the role, where the card carries only a one-line summary of them.
export const experience = [
  {
    kind: 'Work',
    from: '2025', to: 'Now',
    period: 'March 2025 — Present',
    role: 'Full Stack Developer, Graduate Assistant',
    org: 'California State University, Long Beach',
    where: 'Long Beach, CA',
    text: 'Sole developer on a 10,000-user platform migration at 99.9% stability. Built the PayPal verification pipeline, natural-language search and the RAG chatbot.',
    details: [
      'Achieved complete transaction capture on the PayPal NCP vendor migration by architecting a three-layer verification pipeline across PDT, REST API and webhook channels, with SHA256-RSA signature validation, OAuth2 and idempotent handlers covering retry, replay and partial failure on AWS API Gateway and Lambda, with CloudWatch monitoring inbound event delivery.',
      'Maintained 99.9% stability for 10,000 users as sole developer owning an end-to-end migration of a legacy enterprise platform to PHP 8, making all architecture, data modelling and rollout decisions independently, and remediating security vulnerabilities including SQL injection, XSS and access control gaps.',
      'Reduced staff record lookup time by 60% by building a natural-language search experience over 62 database tables, designing the query interface, result presentation and empty and loading states on a Python retrieval layer using OpenAI embeddings and ChromaDB.',
      'Resolved 70% of routine staff inquiries without human intervention by building a retrieval-augmented chatbot on FastAPI and GPT-4, tuning chunking and retrieval strategies and evaluating LLM output correctness and data sensitivity before release.',
      'Replaced recurring manual financial reporting with a filterable reporting interface backed by SQL aggregation, date range controls and one-click Excel export using SheetJS.',
      'Established the first knowledge base for the project across 17 Confluence pages and set up JIRA Kanban workflows for tracking work across releases.',
    ],
    tags: ['PHP 8', 'AWS Lambda', 'FastAPI', 'ChromaDB'],
  },
  {
    kind: 'Work',
    from: '2024', to: '2025',
    period: 'February 2024 — January 2025',
    role: 'Software Developer',
    org: 'Hutech Solutions',
    where: 'Bengaluru · six-person startup',
    text: 'Node and TypeScript middleware at 2,000+ requests per second, RazorPay payments over SNS/SQS at 50,000+ weekly transactions, Kafka and Spark pipelines.',
    details: [
      'Sustained over 2,000 requests per second and cut latency 17% by building Node.js and TypeScript middleware with Redis caching against PostgreSQL, writing queries, migrations and schema changes across releases.',
      'Processed over 50,000 weekly transactions and raised transaction success rate 16% by implementing a RazorPay payment integration with AWS SNS and SQS webhook processing, exponential backoff and idempotent handlers.',
      'Reduced vulnerability surface 90% by hardening all user-facing endpoints with input validation, XSS protection and parameterised queries.',
      'Secured user access across the platform by building JWT-based single sign-on and role-based access control for login and authorisation.',
      'Built and deployed backend microservices exposing GraphQL and REST APIs on Kubernetes, owning service design through release.',
      'Built real-time data pipelines with Kafka and Spark, and analytics dashboards on React, Django REST and PostgreSQL.',
      'Increased user engagement 20% for 10,000 monthly active users by building responsive React, Next.js, Redux and Tailwind CSS interfaces from Figma designs, with sortable and filterable data tables and loading and error states, covered by Jest and React Testing Library.',
      'Cut data retrieval times 40% while handling over 5,000 real-time updates daily by integrating Google Maps location tracking views.',
    ],
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'Kubernetes'],
  },
  {
    kind: 'Work',
    from: '2021', to: '2024',
    period: 'October 2021 — February 2024',
    role: 'Application Developer Analyst',
    org: 'Accenture',
    where: 'Bengaluru · promoted from Associate in 2022',
    text: 'Full stack features on a health insurance platform serving 178M customers. Informatica ETL loading up to 50M rows a run. Jenkins pipelines that cut deploys from 3 hours to 45 minutes.',
    details: [
      'Delivered production features across a full stack React and Node.js health insurance platform backed by Oracle, serving 178 million customers for a Fortune 500 client, contributing to design reviews and code reviews alongside 12 engineers in Agile sprints.',
      'Loaded 1 to 50 million rows per run daily by building Informatica ETL mappings and workflows end to end against Oracle, tuning slow and failing loads and automating job control with Unix shell scripts.',
      'Cut deployment time 75%, from 3 hours to 45 minutes, by managing automated Jenkins CI/CD release pipelines with unit and integration testing built into the deployment gate.',
      'Decreased page load times 20% and lifted user retention 5% by refactoring frontend architecture, Redux state management and client-side routing.',
      'Reduced JS and CSS transfer size 18% over gzip by adding build-time Brotli compression to a MERN asset pipeline.',
      'Cut new-hire onboarding time 50% by mentoring junior developers through onboarding and pair programming, establishing coding standards, Git workflows and documentation practices.',
    ],
    tags: ['React', 'Node.js', 'Oracle', 'Informatica', 'Jenkins'],
  },
  {
    kind: 'Work',
    from: '2019', to: '2020',
    period: 'October 2019 — April 2020',
    role: 'Blockchain Research Associate',
    org: 'IoTracx',
    where: 'Bengaluru',
    text: 'Compared consensus algorithms, smart contracts and network throughput to guide DApp architecture.',
    details: [
      'Evaluated scalability and throughput across public and private blockchain networks to inform architecture choices for decentralised applications.',
      'Researched distributed consensus algorithms, smart contracts and DApp architectures, comparing their tradeoffs in fault tolerance and performance.',
    ],
    tags: [],
  },
]

export const education = [
  {
    kind: 'Education',
    from: '2025', to: '2026',
    period: 'January 2025 — December 2026',
    role: 'MS in Computer Science',
    org: 'California State University, Long Beach',
    where: 'GPA 3.7 / 4.0',
    text: 'Distributed Computing, Artificial Intelligence, Machine Vision, Computer Architecture, Blockchain.',
    courses: [
      'Data Structures and Algorithms',
      'Distributed Computing',
      'Artificial Intelligence',
      'Machine Vision',
      'Computer Architecture',
      'Blockchain',
    ],
    // Drop the PDF in /public and point at it, e.g. './transcript-ms.pdf'.
    // The download button only appears once this is set.
    transcript: '',
    tags: [],
  },
  {
    kind: 'Education',
    from: '2017', to: '2021',
    period: 'August 2017 — August 2021',
    role: 'BE in Computer Science',
    org: 'Visvesvaraya Technological University',
    where: 'Bengaluru',
    text: '',
    // Add the modules you want to show and this one becomes clickable too.
    courses: [],
    transcript: '',
    tags: [],
  },
]

// Certification cards. The shape follows what LinkedIn shows for a credential:
// issuer, when it was issued, when it expires, the credential ID, a link to
// verify it, and the certificate itself.
//
// Only `name`, `org` and `year` are filled in from the resume. Every other
// field is optional and the card simply leaves it out when empty, so you can
// add them one at a time:
//   issued / expires  free text, e.g. 'March 2023'. `year` is the fallback.
//   credentialId      the ID the issuer printed on it
//   verify            the issuer's verification URL ('Show credential')
//   pdf               put the file in /public, e.g. './certs/az-104.pdf'
//   logo              issuer mark in /public; without one the card draws a
//                     monogram from `org` instead
export const certifications = [
  {
    name: 'Google Associate Cloud Engineer',
    org: 'Google Cloud',
    year: '2023',
    issued: '', expires: '', credentialId: '',
    verify: '', pdf: '', logo: '',
  },
  {
    name: 'Google Cloud Digital Leader',
    org: 'Google Cloud',
    year: '2023',
    issued: '', expires: '', credentialId: '',
    verify: '', pdf: '', logo: '',
  },
  {
    name: 'Azure Administrator Associate (AZ-104)',
    org: 'Microsoft',
    year: '2023',
    issued: '', expires: '', credentialId: '',
    verify: '', pdf: '', logo: '',
  },
  {
    name: 'Azure Fundamentals (AZ-900)',
    org: 'Microsoft',
    year: '2022',
    issued: '', expires: '', credentialId: '',
    verify: '', pdf: '', logo: '',
  },
]

export const moments = [
  { n: 178, suffix: 'M', label: 'customers on the insurance platform I shipped features to', where: 'Accenture' },
  { n: 10000, suffix: '', label: 'users on a platform I migrated alone, at 99.9% stability', where: 'CSULB' },
  { n: 2000, suffix: '+', label: 'requests per second through my Node middleware', where: 'Hutech' },
  { n: 50000, suffix: '+', label: 'payment transactions processed every week', where: 'Hutech' },
  { n: 2.4, suffix: 'B', decimals: 1, label: 'tokens used to train my transformer from scratch', where: 'Project' },
  { n: 75, suffix: '%', label: 'faster deploys, from 3 hours down to 45 minutes', where: 'Accenture' },
]
