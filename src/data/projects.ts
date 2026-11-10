export type Metric = { num: string; label: string };
export type CaseBlock = { heading: string; body: string };

export type Project = {
  id: string;
  code: string;
  flagship: boolean;
  title: string;
  category: string;
  value: string;
  tags: string[];
  metrics: Metric[];
  blocks: CaseBlock[];
  github?: string;
  demo?: string;
  /** position on the constellation map, percentage of container */
  pos: { x: number; y: number };
};

export const projects: Project[] = [
  {
    id: "ra",
    code: "RA",
    flagship: true,
    title: "Risk Autopsy",
    category: "Fraud & Risk · AI",
    value: "Doesn't just flag fraud — proves a new risk policy is safer and cheaper than the one live today, before it ships.",
    tags: ["Python", "scikit-learn", "FastAPI", "React", "Groq"],
    metrics: [
      { num: "98.2%", label: "Precision, 10-seed adversarial average" },
      { num: "8", label: "Automated gates per policy change" },
    ],
    blocks: [
      {
        heading: "Problem",
        body: "A fraud model answers \"is this transaction fraud-\" It doesn't answer the harder question a risk team actually needs before shipping a change: is this new policy safer and cheaper than the one already running in production-",
      },
      {
        heading: "Context",
        body: "Built for Razorpay's AI Buildathon (Track 2: AI Risk Manager), scoped to one loss category end-to-end — coordinated chargeback and return-abuse rings — rather than a generic fraud classifier.",
      },
      {
        heading: "Architecture",
        body: "Every candidate policy has to clear an 8-gate automated review before it's deployable: historical regression, adversarial coverage, evasion distance, fairness, off-policy value, blast radius, economic (₹) value, and complexity. An autonomous agent runs the full loss → autopsy → discover → attack → harden loop on its own, stopping only for the human approval gate.",
      },
      {
        heading: "The key decision",
        body: "Defense-only, enforced structurally rather than just described: the LLM proposes candidate policies, but every threshold is fit by scikit-learn on real data, never by the model. A policy can't go live without a human clicking approve through a server-verified, short-lived signed token — no autonomous fund movement, no autonomous punitive action, ever.",
      },
      {
        heading: "Result",
        body: "Baseline rule (32.9% precision, 57 false positives) → a discovered behavioral policy (90.6% precision, 5 false positives, leakage-checked) → an adversarially hardened policy (100% precision/recall on its headline population). That number is disclosed honestly, not cherry-picked: it holds at 98.2% ± 1.8% precision across 10 independent seeds, and 74.7–80.8% on populations built deliberately harder to catch.",
      },
    ],
    github: "https://github.com/Affan-cybersecuritist/Risk-Autopsy",
    demo: "https://risk-autopsy.onrender.com",
    pos: { x: 25, y: 40 },
  },
  {
    id: "ng",
    code: "NG",
    flagship: false,
    title: "Network Guardian",
    category: "Network Security · AI",
    value: "An anomaly-based intrusion detector that explains its own alerts.",
    tags: ["Python", "Isolation Forest", "Scapy", "SHAP", "AbuseIPDB"],
    metrics: [
      { num: "94.3%", label: "ROC-AUC" },
      { num: "71.2%", label: "Detection on held-out attacks" },
    ],
    blocks: [
      {
        heading: "Problem",
        body: "Signature-based intrusion detection only catches attacks that already have a signature. Anything novel slips through, and rule-based systems leave analysts drowning in false positives they can't explain.",
      },
      {
        heading: "Context",
        body: "The problem statement was originally scoped for a Smart India Hackathon (NTRO) track on network anomaly detection. It was built independently afterward as a personal project — not submitted as a competition entry.",
      },
      {
        heading: "Architecture",
        body: "An Isolation Forest model trains on benign traffic only, learning what “normal” looks like instead of memorizing known signatures. Live traffic is captured with Scapy, a lightweight WAF layer screens for injection/XSS, and flagged IPs are cross-checked against AbuseIPDB.",
      },
      {
        heading: "Explainability",
        body: "Every alert carries a SHAP explanation of which traffic features drove the score — the difference between “this is suspicious” and “this is suspicious because of X, Y, Z.”",
      },
      {
        heading: "Result",
        body: "94.3% ROC-AUC on the trained model, with a 71.2% detection rate on attack samples never seen during training — the harder, more honest number.",
      },
    ],
    github: "https://github.com/Affan-cybersecuritist/network-guardian",
    pos: { x: 58, y: 14 },
  },
  {
    id: "ci",
    code: "CI",
    flagship: false,
    title: "Compliance Intelligence",
    category: "GRC · AI",
    value: "An AI auditor that never asserts a verdict without citing the document behind it.",
    tags: ["FastAPI", "RAG", "Ollama", "Claude API"],
    metrics: [
      { num: "93", label: "ISO 27001:2022 controls" },
      { num: "25", label: "DPDP Act 2023 controls" },
    ],
    blocks: [
      {
        heading: "Problem",
        body: "Compliance audits against ISO 27001 or India's DPDP Act are usually manual, checklist-driven work — slow, inconsistent, and hard to verify afterward.",
      },
      {
        heading: "Architecture",
        body: "A FastAPI backend runs a RAG pipeline over uploaded policy documents using Ollama or the Claude API, checking against 93 ISO 27001:2022 controls and 25 DPDP Act 2023 controls.",
      },
      {
        heading: "The key decision",
        body: "Every verdict is source-grounded — tied to the exact document excerpt that justifies it, not a bare pass/fail. That's the difference between trusting the model and being able to verify it.",
      },
    ],
    github: "https://github.com/Affan-cybersecuritist/compliance-intelligence",
    pos: { x: 82, y: 42 },
  },
  {
    id: "aj",
    code: "AJ",
    flagship: false,
    title: "AJENSIKS",
    category: "Application Security · AI Agents",
    value: "A 4-agent pipeline that writes code, tests it, attacks it, and patches it — in a closed loop.",
    tags: ["Python", "FastAPI", "LLM Agents", "Bandit", "Pytest"],
    metrics: [
      { num: "4", label: "Autonomous agents" },
      { num: "3", label: "CWE classes auto-remediated" },
    ],
    blocks: [
      {
        heading: "Problem",
        body: "Security review — SAST scanning, test coverage, remediation — is manual and slow relative to how fast code ships.",
      },
      {
        heading: "Architecture",
        body: "Four agents run in sequence: Coder generates the implementation, Tester runs Pytest QA, Hacker performs Bandit-based static analysis, and Patcher writes the fix — orchestrated through FastAPI.",
      },
      {
        heading: "Results",
        body: "Automated remediation against CWE-95 (code injection), CWE-89 (SQL injection), and CWE-22 (path traversal). Reports map to OWASP Top 10, SOC 2, ISO 27001, and NIST SP 800-53.",
      },
    ],
    github: "https://github.com/Affan-cybersecuritist/AJENSIKS",
    pos: { x: 58, y: 76 },
  },
  {
    id: "zt",
    code: "ZT",
    flagship: false,
    title: "ZeroTrustUs",
    category: "Zero Trust · GRC",
    value: "A Zero Trust auditor for banking-grade databases, built to run fully offline.",
    tags: ["LangChain", "Ollama · Llama 3.2", "Next.js", "TypeScript"],
    metrics: [{ num: "Shortlisted", label: "SuRaksha 2.0, Canara Bank" }],
    blocks: [
      {
        heading: "Context",
        body: "Built at Canara Bank's SuRaksha Cyber Hackathon 2.0 — team shortlisted among finalists.",
      },
      {
        heading: "Architecture",
        body: "A LangChain SQL-agent backend running local Ollama/Llama 3.2 audits database configurations against regulatory baselines, paired with a Next.js/TypeScript dashboard.",
      },
      {
        heading: "The key decision",
        body: "Fully offline — no external API calls. For a bank auditing its own database config, sending that config to a third-party API is itself a security problem.",
      },
    ],
    github: "https://github.com/Affan-cybersecuritist/ZeroTrustUs---Frontend",
    pos: { x: 20, y: 80 },
  },
];

export const flagshipProject = projects.find((p) => p.flagship)!;

export type ArsenalGroup = {
  group: string;
  items: { name: string; used: string }[];
};

export const arsenal: ArsenalGroup[] = [
  {
    group: "Network & Offensive Security",
    items: [
      { name: "Scapy", used: "Network Guardian" },
      { name: "IDS / WAF design", used: "Network Guardian" },
      { name: "AbuseIPDB threat intel", used: "Network Guardian" },
      { name: "TCP/IP / DNS / HTTP / Firewalls", used: "Network Guardian" },
      { name: "Ethical Hacking & Pen-Testing", used: "CappricioSec certification" },
    ],
  },
  {
    group: "Application Security",
    items: [
      { name: "Bandit (SAST)", used: "AJENSIKS" },
      { name: "OWASP Top 10 mapping", used: "AJENSIKS" },
      { name: "CWE remediation (95 / 89 / 22)", used: "AJENSIKS" },
      { name: "Pytest", used: "AJENSIKS" },
    ],
  },
  {
    group: "AI, ML & Agents",
    items: [
      { name: "Isolation Forest", used: "Network Guardian" },
      { name: "SHAP", used: "Network Guardian" },
      { name: "scikit-learn / XGBoost", used: "Network Guardian, Risk Autopsy" },
      { name: "Adversarial hardening & off-policy eval", used: "Risk Autopsy" },
      { name: "Groq", used: "Risk Autopsy" },
      { name: "LangChain SQL agents", used: "ZeroTrustUs" },
      { name: "Ollama / Llama 3.2", used: "ZeroTrustUs, Compliance Intelligence" },
      { name: "RAG pipelines", used: "Compliance Intelligence" },
    ],
  },
  {
    group: "GRC & Compliance",
    items: [
      { name: "ISO 27001:2022", used: "Compliance Intelligence, AJENSIKS" },
      { name: "DPDP Act 2023", used: "Compliance Intelligence" },
      { name: "SOC 2", used: "AJENSIKS" },
      { name: "NIST SP 800-53", used: "AJENSIKS" },
      { name: "Zero Trust Architecture", used: "ZeroTrustUs" },
    ],
  },
  {
    group: "Engineering",
    items: [
      { name: "Python", used: "Risk Autopsy, Network Guardian, AJENSIKS, Compliance Intelligence" },
      { name: "FastAPI", used: "Risk Autopsy, AJENSIKS, Compliance Intelligence" },
      { name: "TypeScript / Next.js / React", used: "Risk Autopsy, ZeroTrustUs" },
      { name: "SQL", used: "ZeroTrustUs" },
      { name: "Docker", used: "General deployment" },
      { name: "Linux", used: "General environment" },
      { name: "Git / GitHub", used: "All projects" },
    ],
  },
];

export type TimelineItem = {
  date: string;
  title: string;
  body: string;
  badge?: string;
  highlight?: boolean;
};

export const timeline: TimelineItem[] = [
  {
    date: "2025",
    title: "CBSE Grade 12 — San Academy",
    body: "Graduated with 80%. Established core foundations in computer science, mathematics, and problem-solving.",
    badge: "SCHOOLING",
  },
  {
    date: "2025 - 2029",
    title: "B.E. Cybersecurity — Chennai Institute of Technology",
    body: "Pursuing Bachelor of Engineering in Cybersecurity (CGPA 7.85). Specializing in security engineering, network defense, and applied machine learning. Minor in Innovation & Entrepreneurship (2026-2028).",
    badge: "COLLEGE",
    highlight: true,
  },
  {
    date: "Nov 2026 - Present",
    title: "Academic Intern (Cybersecurity) — Prophaze Technologies",
    body: "Working on Kubernetes-native Web Application & API Protection (WAAP), real-time threat intelligence, anomaly detection, and cloud-native application defense.",
    badge: "INTERNSHIP",
    highlight: true,
  },
];

export type Certification = { year: string; name: string; issuer: string; link?: string };

export const certifications: Certification[] = [
  { year: "2026", name: "AWS Cloud Practitioner Essentials", issuer: "AWS Training & Certification", link: "/certs/aws_cloud_practitioner.pdf" },
  { year: "2026", name: "Certified Ethical Hacking & Pen-Testing Bootcamp", issuer: "CappricioSec University", link: "/certs/cappriciosec_ceh.pdf" },
  { year: "2025", name: "Foundations of Cybersecurity", issuer: "Google", link: "/certs/google_cybersecurity.pdf" },
  { year: "2025", name: "Python Essentials 1", issuer: "Cisco", link: "/certs/cisco_python.pdf" },
];

export const otherProjects = [
  {
    title: "CIVICVERSE",
    category: "Smart City Blockchain",
    desc: "A decentralized grievance registration portal preventing data tampering in municipal complaints.",
    github: "https://github.com/Affan-cybersecuritist/Civicverse",
    tech: "Blockchain, Next.js"
  },
  {
    title: "DEGENT",
    category: "LLM Agent Arena",
    desc: "Debate-With-Agent: A framework where autonomous agents argue claims and a neutral moderator scores them.",
    github: "https://github.com/Affan-cybersecuritist/DEGENT---Debate-With-Agent",
    tech: "LLMs, Langchain"
  },
  {
    title: "RXSETU",
    category: "Healthcare AI App",
    desc: "AI-powered mobile app concept organizing prescriptions and tracking medication adherence with doctor visibility.",
    github: "https://github.com/Affan-cybersecuritist/RxSetu",
    tech: "Mobile, AI"
  },
  {
    title: "SAHAYAK SCORE",
    category: "Predictive Analytics",
    desc: "Digital Financial Twin providing AI-driven cash flow prediction and credit scoring for rural enterprises.",
    github: "https://github.com/Affan-cybersecuritist/Sahayak-Score-The-Digital-Financial-Twin-of-Every-Rural-Enterprise",
    tech: "Machine Learning"
  },
  {
    title: "SHADOW AUDIT",
    category: "Automated Compliance",
    desc: "LangChain SQL Agent system using local Ollama to autonomously query and audit database configurations against baselines.",
    github: "https://github.com/Affan-cybersecuritist/Shadow-Audit---Affan",
    tech: "FastAPI, Llama 3.2"
  }
];

export const site = {
  name: "Mohamed Affan H.",
  role: "Cybersecurity Engineer",
  location: "Chennai, India",
  email: "hmaaffan@gmail.com",
  github: "https://github.com/Affan-cybersecuritist",
  linkedin: "https://www.linkedin.com/in/mohamed-affan-h-042048367",
  availability: "Academic Intern @ Prophaze Technologies · Open to Security Engineering Roles",
};
