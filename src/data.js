// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  firstName: 'Darshan',
  fullName: 'Darshan Laxman Goneppanavar',
  shortName: 'Darshan Goneppanavar',
  initials: 'DG',
  title: ['Software', 'Engineer'],
  tagline: 'Full stack apps, event-driven backends and applied AI. 4+ years of shipping to production.',
  location: 'Long Beach, CA',
  email: 'darshanlg5766@gmail.com',
  linkedin: 'https://www.linkedin.com/in/darshanlg',
  github: 'https://github.com/DarshanLG',
  // The Résumé dialog shows resume-preview.png (the page rendered at 200 dpi,
  // phone number left out) and downloads Resume.docx. Re-render the preview
  // whenever the DOCX changes.
  resume: './resume/Resume.docx',
  resumePreview: './resume/resume-preview.png',
  resumeFile: 'Darshan_Goneppanavar_Resume.docx',
  // Every Résumé link on the site reads this. While false they still show in
  // place but are inert -- no href, not focusable, visibly dimmed. Flip it to
  // true to switch them all back on: hero badge, About and Contact.
  resumeEnabled: true,

  // Drop your files into /public and set these, e.g. './hero/hero.mp4' and './profile/portrait.jpg'
  // hero-alpha.mp4 is a plain H.264 clip twice as tall as the figure: colour
  // on top, the cut-out mask (white = him) below. Hero.jsx composites the two
  // in WebGL so the giant background name shows through around him in every
  // browser -- VP9-alpha WebM only works in Chrome-family browsers and Firefox,
  // and Safari/Opera drew it as a solid block. hero.mp4 (opaque, on --paper)
  // is the fallback when WebGL isn't available.
  heroVideo: './hero/hero.mp4',
  heroVideoAlpha: './hero/hero-alpha.mp4',
  heroPoster: './hero/hero-poster.png',
  photo: './profile/portrait.jpg',

}

// Skills backdrop: nine renders of Darshan at his desk, one per head pose.
// Built from head_{row}_{col}.jpg by scene-poses.py (both kept offline, not in
// this project), which prints size / box / face. Re-run it and paste the
// numbers here if the renders change.
export const scene = {
  src: './scene/scene.webp',          // neutral pose, full size
  srcSm: './scene/scene-sm.webp',     // neutral pose, 1280px for phones
  heads: './scene/scene-heads.webp',  // 3x3 atlas of the head region
  mask: './scene/scene-mask.png',     // where the head patch is pasted
  size: [2752, 1536],
  box: [0.3968, 0.10612, 0.6032, 0.55143], // head region, image uv
  face: [0.5, 0.3125],                    // between the eyes, image uv
  position: [0.5, 0.42],                     // object-position when cropped
}

export const heroStats = [
  { value: '4+ yrs', label: 'in production' },
  { value: '5K', label: 'users on my platform' },
  { value: 'Dec 2026', label: 'MS CS, CSULB' },
]

export const about = {
  bio: [
    'I build and run production systems end to end: full stack web apps, payment pipelines, data platforms and applied AI. I like owning the whole path, from the schema and the webhook retries to the empty state on the screen.',
    'Right now I am finishing an MS in Computer Science at CSULB, where I am the sole developer on a platform serving 5,000 users.',
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

// Families group the skills into the desk scene's cards and set each badge's color.
export const families = [
  { id: 'lang', label: 'Languages' },
  { id: 'fe', label: 'Frontend' },
  { id: 'be', label: 'Backend' },
  { id: 'data', label: 'Data' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'ops', label: 'Cloud & DevOps' },
]

export const skills = [
  { s: 'Py', name: 'Python', f: 'lang', used: 'PPO from scratch for Astro Lander, FastAPI services' },
  { s: 'Ts', name: 'TypeScript', f: 'lang', used: 'Node middleware handling 2,000+ req/s at Hutech' },
  { s: 'Js', name: 'JavaScript', f: 'lang', used: 'React and Node features for a Fortune 500 client serving millions of members' },
  { s: 'Sq', name: 'SQL', f: 'lang', used: 'Reporting aggregations, query tuning, migrations' },
  { s: 'Ph', name: 'PHP 8', f: 'lang', used: 'Sole-owner migration of a legacy enterprise platform' },

  { s: 'Re', name: 'React', f: 'fe', used: 'Data tables, dashboards and the VLA form app' },
  { s: 'Nx', name: 'Next.js', f: 'fe', used: 'Responsive interfaces for 10,000 monthly users' },
  { s: 'Rx', name: 'Redux', f: 'fe', used: 'State refactor that cut page loads 20%' },
  { s: 'Tw', name: 'Tailwind CSS', f: 'fe', used: 'Interfaces built from Figma designs' },

  { s: 'No', name: 'Node.js', f: 'be', used: 'Middleware with Redis caching, 17% lower latency' },
  { s: 'Ex', name: 'Express', f: 'be', used: 'API for the form-automation model' },
  { s: 'Fa', name: 'FastAPI', f: 'be', used: 'RAG chatbot for university staff (in progress)' },
  { s: 'Dj', name: 'Django REST', f: 'be', used: 'Analytics API behind real-time dashboards' },
  { s: 'Gq', name: 'GraphQL', f: 'be', used: 'Microservices on Kubernetes' },
  { s: 'Rd', name: 'Redis', f: 'be', used: 'Caching layer in front of PostgreSQL' },

  { s: 'Pg', name: 'PostgreSQL', f: 'data', used: 'Queries, migrations and schema changes across releases' },
  { s: 'Or', name: 'Oracle', f: 'data', used: 'Backing store for a Fortune 500 insurance platform' },
  { s: 'Mg', name: 'MongoDB', f: 'data', used: 'User corrections stored as a retraining signal' },
  { s: 'Kf', name: 'Kafka', f: 'data', used: 'Real-time data pipelines' },
  { s: 'Sp', name: 'Spark', f: 'data', used: 'Stream processing feeding analytics dashboards' },
  { s: 'If', name: 'Informatica', f: 'data', used: 'ETL against Oracle for multi-million-row daily loads' },

  { s: 'Pt', name: 'PyTorch', f: 'ai', used: 'PPO written from scratch, matching Stable-Baselines3 (272.6 vs 275.6)' },
  { s: 'Lo', name: 'LoRA', f: 'ai', used: 'Fine-tuning a vision-language model for form automation (in progress)' },
  { s: 'Rg', name: 'RAG', f: 'ai', used: 'Chunking and retrieval tuning for the staff chatbot' },
  { s: 'Cd', name: 'ChromaDB', f: 'ai', used: 'Vector store for the staff chatbot (in progress)' },
  { s: 'Oa', name: 'OpenAI API', f: 'ai', used: 'Embeddings and GPT-4 generation' },
  { s: 'Cl', name: 'Claude API', f: 'ai', used: 'LLM features and evaluation' },
  { s: 'Lc', name: 'LangChain', f: 'ai', used: 'Retrieval pipelines' },

  { s: 'Aw', name: 'AWS', f: 'ops', used: 'SNS and SQS payment events, CloudWatch logs and alarms' },
  { s: 'Gc', name: 'Google Cloud', f: 'ops', used: 'Associate Cloud Engineer certified' },
  { s: 'Az', name: 'Azure', f: 'ops', used: 'AZ-104 Administrator certified' },
  { s: 'Dk', name: 'Docker', f: 'ops', used: 'Containerized services' },
  { s: 'K8', name: 'Kubernetes', f: 'ops', used: 'Deployed GraphQL and REST microservices' },
  { s: 'Jk', name: 'Jenkins', f: 'ops', used: 'Maintained CI/CD pipelines with unit and integration test gates' },
  { s: 'Ga', name: 'GitHub Actions', f: 'ops', used: 'Build and test automation' },
]

export const projects = [
  {
    id: 'lander',
    kicker: 'Reinforcement learning · Research',
    title: 'Rocket landing with RL',
    blurb: 'A rocket that learns to land itself, with PPO written from scratch and a live browser demo you can fly in a storm.',
    // The dialog leads with `about` when set, and falls back to `blurb`.
    about: "A reinforcement-learning agent that lands a rocket in Gymnasium's Lunar Lander. I wrote PPO from scratch in PyTorch, ran a 27-agent study on reward design and robustness, and ported the physics to JavaScript so the trained agents fly live in the browser.",
    points: [
      'PPO implemented from scratch (GAE, clipping, vectorized rollouts, normalization), matching Stable-Baselines3: 273 vs 276 score, both landing 100% of the time',
      'Found that textbook potential-based reward shaping makes the agent crash every time, traced it to two terminal-state effects, and fixed it (back to 100% landings)',
      'Domain randomization (random gravity, wind, turbulence) cut crashes in wind from 36% to 11%',
      'Trained networks run unchanged in a JavaScript physics port (planck.js): same behavior, no backend',
      '27 agents, 3 seeds each, scored on 100 held-out episodes per agent; 14 pytest tests',
    ],
    tags: ['PyTorch', 'PPO', 'Gymnasium', 'Box2D', 'planck.js', 'GitHub Pages'],
    link: 'https://github.com/DarshanLG/astro-lander',
    demo: 'https://darshanlg.github.io/astro-lander/web/',
    media: {
      src: 'https://raw.githubusercontent.com/DarshanLG/astro-lander/main/results/landing_storm_robust.gif',
      width: 600, height: 400,
      alt: 'Domain-randomized agent landing on the pad in a storm (wind 18)',
      caption: 'Robust agent landing in a storm. Trained in random weather.',
    },
    cover: 'lander',
  },
  {
    id: 'dermai',
    kicker: 'Deep learning · Medical imaging',
    title: 'Skin cancer screening',
    blurb: 'Classifies dermoscopy photos into 8 skin-lesion types, comparing a CNN, EfficientNet and a Vision Transformer, with GAN-made images for rare cancers.',
    about: 'A deep-learning pipeline that sorts dermoscopy images from the ISIC 2019 dataset (25,331 images, 8 lesion types) to help with early melanoma screening. It compares a custom CNN, a fine-tuned EfficientNet-B3 and a fine-tuned ViT-Base/16 under the same training and evaluation setup, uses StyleGAN2-ADA to create extra images of the rarest cancers, and shows where each model is looking with Grad-CAM and attention maps.',
    points: [
      'Three architectures trained under one protocol: the same splits, augmentation, 5-fold cross-validation and metrics, so the comparison is fair',
      'ViT-Base/16 scored the highest F1 in all 8 classes; EfficientNet-B3 came a close second and both far outperformed the CNN baseline, most of all on rare classes',
      'StyleGAN2-ADA synthetic images for the 4 smallest classes raised F1 on every one of them (up to +9 points on dermatofibroma)',
      'Leakage-free data: patient-level splits plus perceptual-hash deduplication, with a held-out test set that augmentation never touches',
      'Class imbalance handled three ways: GAN augmentation, focal loss / class weighting, and weighted sampling',
      'Best model (ViT + GAN) reaches 84% recall on melanoma and 78–93% recall across all 8 classes',
      'CECS 551 term project, CSULB, Spring 2026',
    ],
    tags: ['PyTorch', 'timm', 'Vision Transformer', 'EfficientNet', 'StyleGAN2-ADA', 'Grad-CAM'],
    link: 'https://github.com/DarshanLG/DermAI',
    media: {
      src: 'https://raw.githubusercontent.com/DarshanLG/DermAI/main/results/report_figures/fig_per_class_f1.png',
      width: 749, height: 441,
      alt: 'Per-class F1 for the custom CNN, EfficientNet-B3 and ViT-Base/16 on the ISIC 2019 test set',
      caption: 'Per-class F1 on the held-out test set, mean of 5 folds.',
    },
    cover: 'dermai',
  },
  {
    id: 'llm',
    kicker: 'Deep learning · Systems',
    title: 'Transformer from scratch',
    // Hidden for now; delete this line to show it again.
    hidden: true,
    blurb: 'A 124M-parameter decoder-only language model, trained and served without a framework doing the hard parts.',
    points: [
      'Trained on 2.4B tokens across two A100s with DDP, bf16 and gradient checkpointing',
      'Fused Triton kernels: 1.9× faster softmax, 2.3× faster LayerNorm',
      'INT8 quantization + KV cache cut inference memory 68% at <0.5% perplexity cost',
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
    where: 'Long Beach, CA · part-time',
    text: 'Sole developer migrating a 5,000-user enterprise platform from PHP 7 to PHP 8 at 99.9% monitored uptime. Moved payments from legacy PayPal Hosted Buttons to PayPal NCP.',
    details: [
      'Sole developer migrating a legacy enterprise platform serving 5,000 users from PHP 7 to PHP 8, owning architecture, data modeling, rollout and production support, and reconstructing undocumented code paths, at 99.9% monitored uptime.',
      'Remediated SQL injection, XSS and access-control vulnerabilities across the platform as part of the PHP 8 modernization.',
      'Migrated payments from legacy PayPal Hosted Buttons to PayPal NCP with a three-layer verification pipeline (PDT, REST API, webhooks), secured with SHA-256 hashing, RSA signature validation, full OAuth2 token lifecycle management and idempotent handlers for retry, replay and partial failure.',
      'Diagnosed PayPal payments that failed to register when a compliance hold outlasted the pending match window, corrected the affected records and shipped an admin safeguard against repeat failures.',
      'Saved staff 3+ hours per week of manual financial reporting by building a filterable reporting module with SQL aggregation, date-range controls and one-click Excel export (SheetJS).',
      'Built multi-step approval and document upload workflows in JavaScript, HTML and CSS, gathering requirements directly with staff and iterating on their feedback across releases.',
      'Triaged payment, refund and enrollment escalations with the program director and coordinator in weekly scrums, turning them into prioritized production fixes.',
      'Created the project\'s first Jira Kanban workflow and a 17-page Confluence knowledge base with runbooks and onboarding material.',
      'In progress: an AI assistant combining natural-language search over the platform\'s database and a retrieval-augmented chatbot (FastAPI, OpenAI embeddings, ChromaDB).',
    ],
    tags: ['PHP 8', 'SQL', 'PayPal', 'JavaScript', 'OAuth2'],
  },
  {
    kind: 'Work',
    from: '2024', to: '2025',
    period: 'February 2024 — January 2025',
    role: 'Software Developer',
    org: 'Hutech Solutions',
    where: 'Bengaluru · six-person startup',
    text: 'Node and TypeScript middleware at 2,000+ requests per second, RazorPay payments over SNS/SQS at 5,000+ weekly transactions, React interfaces for 10,000 monthly active users.',
    details: [
      'Sustained 2,000+ requests per second at peak and cut end-to-end latency 17% by building Node.js and TypeScript middleware with Redis caching over PostgreSQL, choosing cache keys and eviction strategy, and writing queries, migrations and schema changes across releases.',
      'Raised transaction success rate 16% across 5,000+ weekly transactions by integrating RazorPay with HMAC-SHA256 webhook verification, AWS SNS and SQS event processing, exponential backoff and idempotent handlers.',
      'Built and deployed backend microservices exposing GraphQL and REST APIs on Docker and Kubernetes, owning service design through release.',
      'Implemented JWT-based single sign-on and role-based access control across login, admin and payment features, with session and token lifecycle handling and API key rotation.',
      'Built Kafka and Spark pipelines streaming real-time events to analytics dashboards on React, Django REST and PostgreSQL.',
      'Lifted user engagement 20% for 10,000 monthly active users by building responsive React, Next.js, Redux and Tailwind CSS interfaces from Figma designs, with sortable and filterable data tables and loading and error states.',
      'Covered UI components with Jest and React Testing Library as a merge gate, catching regressions before release.',
      'Cut data retrieval time 40% across 5,000+ daily real-time location updates in Google Maps tracking views.',
      'Hardened all user-facing endpoints with input validation, XSS protection and parameterized PostgreSQL queries, and enforced secure coding practices across the team to prevent injection attacks.',
      'Monitored services with AWS CloudWatch logs and alarms on a client project for an interior-design company.',
    ],
    tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Kafka', 'Kubernetes'],
  },
  {
    kind: 'Work',
    from: '2022', to: '2024',
    period: 'November 2022 — January 2024',
    role: 'Application Developer Analyst',
    org: 'Accenture',
    where: 'Bengaluru · Fortune 500 US health insurer',
    text: 'React and Node.js features on a member-facing health insurance platform, plus Informatica ETL against Oracle for multi-million-row daily loads.',
    details: [
      'Promoted to Analyst while continuing to develop and optimize a massive-scale health insurance platform for a Fortune 500 client serving millions of members, delivering React and Node.js features backed by Oracle while also taking on ownership of its Informatica ETL workflows, leading technical initiatives and mentoring junior developers within a 12-engineer Agile team.',
      'Built Informatica ETL mappings and workflows against Oracle for multi-million-row daily batch loads, diagnosing failing loads through query plans, session logs and Unix shell job wrappers.',
      'Automated ETL job control and failure recovery with Unix shell scripts, bringing runtimes back inside the batch window.',
      'Maintained Jenkins CI/CD pipelines for releases and test data provisioning, with unit and integration test gates.',
      'Engineered unit test suites and ran system-wide testing to verify feature reliability before UAT.',
      'Facilitated sprint planning, code reviews and technical grooming sessions in Jira.',
      'Navigated a large legacy codebase to debug issues in code written by other engineers, and gathered feature requirements with client stakeholders.',
      'Mentored 3 junior developers through onboarding and pair programming, and helped set coding standards and Git workflows.',
    ],
    tags: ['React', 'Node.js', 'Oracle', 'Informatica', 'Jenkins'],
  },
  {
    kind: 'Work',
    from: '2021', to: '2022',
    period: 'October 2021 — October 2022',
    role: 'Application Developer Associate',
    org: 'Accenture',
    where: 'Bengaluru',
    text: 'Frontend performance work on a high-traffic React and Node.js application: 20% faster page loads, 5% higher retention.',
    details: [
      'Cut page load times 20% and lifted user retention 5% (per client monitoring) by refactoring frontend architecture, Redux state management and client-side routing.',
      'Reduced JS and CSS transfer size 18% over gzip by adding build-time Brotli compression to a MERN asset pipeline.',
      'Shipped production-ready features for a high-traffic React and Node.js application, collaborating in a cross-functional Agile pod of 12 engineers to deliver high-availability modules.',
      'Built a fully deployed MERN employee-lifecycle application with full CRUD functionality during Accenture\'s project-based graduate training program (Python, MySQL, JavaScript, React, Node.js, Express).',
    ],
    tags: ['React', 'Redux', 'Node.js', 'MongoDB'],
  },
  {
    kind: 'Work',
    from: '2021', to: '2021',
    period: 'April 2021 — May 2021',
    role: 'Student Intern',
    org: 'hermitcrabs',
    where: 'Bengaluru · remote · HubSpot CMS agency',
    text: 'Built HubSpot CMS pages, templates and custom HTML, CSS and JavaScript modules for client websites.',
    details: [
      'Built HubSpot CMS pages and reusable templates for client websites at a HubSpot development and design agency.',
      'Developed custom HTML, CSS and JavaScript modules for HubSpot themes.',
      'Contributed to a MongoDB-backed feature during the internship.',
    ],
    tags: ['HubSpot CMS', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    kind: 'Work',
    from: '2019', to: '2020',
    period: 'October 2019 — April 2020',
    role: 'Blockchain Research Intern',
    org: 'IoTracx',
    where: 'Bengaluru',
    text: 'Compared consensus algorithms, smart contracts and network throughput to guide DApp architecture.',
    details: [
      'Evaluated scalability and throughput across public and private blockchain networks to inform architecture choices for decentralized applications.',
      'Researched distributed consensus algorithms, smart contracts and DApp architectures, comparing their tradeoffs in fault tolerance and performance.',
    ],
    tags: ['Python', 'Smart Contracts'],
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
    where: 'Global Academy of Technology, Bengaluru',
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
//   preview           the certificate as an image, shown in the dialog that
//                     opens before the PDF downloads; [width, height] in `size`
//   logo              the badge image in /public/certs; without one the card
//                     draws a monogram from `org` instead
//
// Newest first. Dates, IDs and links match LinkedIn and the issuer's PDFs.
// Previews are the PDFs rendered at 200 dpi and cropped to the certificate
// (the DP-900 PDF is rotated, the AZ-104 one is a browser printout).
// Cloud Digital Leader's expiry and ID come from its renewed certificate
// (Sep 2027); LinkedIn still showed Oct 2027 and the old ID.
export const certifications = [
  {
    name: 'Google Cloud Associate Cloud Engineer',
    org: 'Google Cloud',
    year: '2023',
    issued: 'November 2023', expires: 'November 2026',
    credentialId: '1c587aa1dcbf4ae4b11f7d8168c1b8ad',
    verify: 'https://www.credly.com/badges/f73265ee-7f3b-4607-abbc-cba042d3d6be/public_url',
    pdf: './certs/gcp-associate-cloud-engineer.pdf',
    preview: './certs/gcp-associate-cloud-engineer.webp', size: [1800, 1366],
    logo: './certs/badge-gcp-ace.png',
  },
  {
    name: 'Azure Administrator Associate (AZ-104)',
    org: 'Microsoft',
    year: '2023',
    issued: 'November 2023', expires: 'November 2027',
    credentialId: 'FE0FC815E12195BE',
    verify: 'https://learn.microsoft.com/api/credentials/share/en-us/DarshanLG-4495/FE0FC815E12195BE?sharingId=E29EC8F33D7645F3',
    pdf: './certs/azure-az-104.pdf',
    preview: './certs/azure-az-104.webp', size: [1800, 950],
    logo: './certs/badge-az-104.svg',
  },
  {
    name: 'Google Cloud Digital Leader',
    org: 'Google Cloud',
    year: '2023',
    issued: 'August 2023', expires: 'September 2027',
    credentialId: 'd8a35926132d4a8d8d97bd1d10cf8eed',
    verify: 'https://www.credly.com/badges/e1fc5f6a-61e1-4563-9b83-40d554e2d9ba/public_url',
    pdf: './certs/gcp-cloud-digital-leader.pdf',
    preview: './certs/gcp-cloud-digital-leader.webp', size: [1800, 1366],
    logo: './certs/badge-gcp-cdl.png',
  },
  {
    name: 'Azure Data Fundamentals (DP-900)',
    org: 'Microsoft',
    year: '2023',
    issued: 'July 2023', expires: '',
    credentialId: 'DAACBDDF2F2B8375',
    verify: 'https://learn.microsoft.com/api/credentials/share/en-us/DarshanLG-4495/DAACBDDF2F2B8375?sharingId=E29EC8F33D7645F3',
    pdf: './certs/azure-dp-900.pdf',
    preview: './certs/azure-dp-900.webp', size: [1800, 944],
    logo: './certs/badge-dp-900.svg',
  },
  {
    name: 'Azure Fundamentals (AZ-900)',
    org: 'Microsoft',
    year: '2022',
    issued: 'November 2022', expires: '',
    credentialId: 'C1703AD19D32090A',
    verify: 'https://learn.microsoft.com/api/credentials/share/en-us/DarshanLG-4495/C1703AD19D32090A?sharingId=E29EC8F33D7645F3',
    pdf: './certs/azure-az-900.pdf',
    preview: './certs/azure-az-900.webp', size: [1800, 921],
    logo: './certs/badge-az-900.svg',
  },
]

export const moments = [
  { n: 5000, suffix: '', label: 'users on a platform I migrated alone from PHP 7 to PHP 8, at 99.9% uptime', where: 'CSULB' },
  { n: 2000, suffix: '+', label: 'requests per second through my Node middleware, with latency cut 17%', where: 'Hutech' },
  { n: 5000, suffix: '+', label: 'weekly RazorPay transactions, with success rate up 16%', where: 'Hutech' },
  { n: 10000, suffix: '', label: 'monthly active users on React interfaces that lifted engagement 20%', where: 'Hutech' },
  { n: 3.3, suffix: '×', decimals: 1, label: 'fewer crashes in wind for my PPO rocket lander (36% down to 11%)', where: 'Astro Lander' },
  { n: 20, suffix: '%', label: 'faster page loads after refactoring the frontend architecture', where: 'Accenture' },
]
