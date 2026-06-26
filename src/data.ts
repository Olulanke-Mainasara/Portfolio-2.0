import Project1 from "./images/Project1.webp";
import Project3 from "./images/Project3.webp";
import Project4 from "./images/Project4.webp";
import Project5 from "./images/Project5.webp";
import Project13 from "./images/Project13.webp";
import Project14 from "./images/Project14.webp";
import Project15 from "./images/Project15.webp";
import Project16 from "./images/Project16.webp";
import Project17 from "./images/Project17.webp";
import Project18 from "./images/Project18.webp";

export const projects = [
  {
    name: "SafiPay",
    shortDescription:
      "Full-stack fraud detection system powered by XGBoost, trained on 6M+ transactions.",
    description:
      "A full-stack, machine learning-powered fraud detection system for mobile money transactions. Trained an XGBoost classifier on 6M+ PaySim transactions using a CRISP-DM pipeline. Features real-time batch prediction streaming via SSE, a SHAP explainability chart for model transparency, and a dashboard for monitoring model performance.",
    image: Project18,
    link: "https://safipay-fyp.vercel.app/",
    technologies: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Express",
      "PostgreSQL",
      "Python",
      "FastAPI",
      "XGBoost",
      "Machine Learning",
    ],
  },
  {
    name: "Cave Foundation",
    shortDescription:
      "Scholarship showcase site built for a programme supporting young Nigerian women.",
    description:
      "A showcase website built for the Cave Foundation Scholarship, a programme supporting young Nigerian women. Provides detailed programme information, an application process timeline, FAQs, and a seamless onboarding experience for prospective applicants.",
    image: Project17,
    link: "https://www.cavefoundation.com/",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Motion"],
  },
  {
    name: "Afritransfer",
    shortDescription:
      "Frontend engineering for a pan-African fintech platform serving wallets, transfers & savings.",
    description:
      "Frontend engineering for AfriTransfer, a pan-African financial services platform offering wallets, AJO savings groups, bank transfers, multi-currency holdings, and USSD support for low-data users. Led the UI architecture, set component and code quality standards, and integrated Google Gemini for intelligent in-app assistance.",
    image: Project16,
    link: "https://afritransfer.com/",
    technologies: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Motion",
      "Google Gemini",
      "REST APIs",
    ],
  },
  {
    name: "TeXcellence 4.0",
    shortDescription:
      "Complete redesign of a growing tech conference platform — modern, fast, and content-rich.",
    description:
      "A complete redesign and rebuild of the TeXcellence event platform, modernizing the experience for a growing tech conference. The new version showcases speakers, sessions, and past highlights in a single seamless platform, replacing an outdated site that no longer reflected the event's scale.",
    image: Project13,
    link: "https://texcellence-4.vercel.app/",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Motion"],
  },
  {
    name: "Coded In Motion",
    shortDescription:
      "Cinematic portfolio site for a videographer, with CMS-driven updates and scroll animations.",
    description:
      "A cinematic portfolio website for a professional videographer, built to showcase client work and storytelling through immersive visuals and smooth animations. Content is managed via Sanity CMS, allowing the client to update their portfolio independently without touching code.",
    image: Project15,
    link: "https://coded-in-motion.vercel.app/",
    technologies: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Motion",
      "Sanity CMS",
    ],
  },
  {
    name: "My Butler",
    shortDescription:
      "AI-powered e-commerce platform with outfit and collection recommendations.",
    description:
      "A full-stack e-commerce platform with an AI-powered personal styling layer. Uses TensorFlow to analyse user preferences and deliver tailored outfit and style recommendations — going beyond standard filtering to personalise the shopping experience at the item level.",
    image: Project5,
    link: "https://my-butler-v1.vercel.app/",
    technologies: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Motion",
      "Supabase",
      "TensorFlow",
      "Machine Learning",
    ],
  },
  {
    name: "Moova",
    shortDescription:
      "Gemini-powered travel planner that builds personalised trips from your mood and budget.",
    description:
      "An AI-powered travel planner that generates personalised trips based on your mood, budget, and timeframe. Powered by Google Gemini, it delivers curated destinations, activity breakdowns, and cost estimates — with Supabase handling auth and trip persistence.",
    image: Project14,
    link: "https://moova-travels.vercel.app/",
    technologies: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Motion",
      "Supabase",
      "Google Gemini",
      "Clerk",
    ],
  },
  {
    name: "NextGen Patients",
    shortDescription:
      "Open-source telemedicine platform with QR check-in, video consults, and appointment booking.",
    description:
      "An open-source telemedicine platform making medical consultation accessible directly from a smartphone. Features appointment booking, QR-based patient check-in, real-time patient records, video consultation, and automated appointment reminders — built with Appwrite as the backend and tested with Jest.",
    image: Project3,
    link: "https://next-gen-patients.vercel.app/",
    technologies: ["Next.js", "Tailwind CSS", "Motion", "Appwrite", "Jest"],
  },
  {
    name: "Agency.io",
    shortDescription:
      "Vacation planning app giving users full control over booking, experiences, and itineraries.",
    description:
      "A vacation planning and trip scheduling web app with the aim of giving users the ability to take full control of the planning and booking of their vacations, access bespoke and exquisite experiences and take them to a whole new level of ease and comfort.",
    image: Project1,
    link: "https://agency-io-v1.vercel.app/",
    technologies: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Motion",
      "Firebase",
    ],
  },
  {
    name: "FunXplorer",
    shortDescription:
      "A multi-tool web app blending games, quizzes, and utility features in one interface.",
    description:
      "A fun and functional web app that combines interactive learning, entertainment, and utility tools in one sleek interface. Whether you want to learn something new, test your knowledge, play a quick game, or just get work done, this app has you covered.",
    image: Project4,
    link: "https://fun-xplorer.vercel.app/",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
];

// All icon URLs verified 200 via raw.githubusercontent.com/devicons/devicon
// Base: https://raw.githubusercontent.com/devicons/devicon/master/icons/

export const technologies = [
  // --- Core Languages ---
  {
    name: "JavaScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    link: "https://www.javascript.com/",
  },
  {
    name: "TypeScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "Python",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    link: "https://www.python.org/",
  },
  {
    name: "HTML",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
    link: "https://html.spec.whatwg.org/multipage/",
  },
  {
    name: "CSS",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
    link: "https://www.w3.org/Style/CSS/Overview.en.html",
  },

  // --- Frontend Frameworks & Libraries ---
  {
    name: "React",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    link: "https://react.dev/",
  },
  {
    name: "Next.js",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
    link: "https://nextjs.org/",
  },
  {
    name: "Tailwind CSS",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    link: "https://tailwindcss.com/",
  },

  // --- Backend & APIs ---
  {
    name: "Express",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
    link: "https://expressjs.com/",
  },
  {
    name: "PostgreSQL",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
    link: "https://www.postgresql.org/",
  },

  // --- ML & AI ---
  {
    name: "TensorFlow",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg",
    link: "https://www.tensorflow.org/",
  },
  {
    name: "Scikit-learn",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/scikitlearn/scikitlearn-original.svg",
    link: "https://scikit-learn.org/",
  },

  // --- BaaS & Databases ---
  {
    name: "Firebase",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg",
    link: "https://firebase.google.com/",
  },
  {
    name: "Supabase",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg",
    link: "https://supabase.com/",
  },
  {
    name: "Appwrite",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/appwrite/appwrite-original.svg",
    link: "https://appwrite.io/",
  },

  // --- CMS ---
  {
    name: "Sanity",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/sanity/sanity-original.svg",
    link: "https://www.sanity.io/",
  },

  // --- Tooling & DevOps ---
  {
    name: "Git",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    link: "https://git-scm.com/",
  },
  {
    name: "GitHub",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
    link: "https://github.com/",
  },
  {
    name: "Vercel",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original.svg",
    link: "https://vercel.com/",
  },
  {
    name: "Netlify",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/netlify/netlify-original.svg",
    link: "https://www.netlify.com/",
  },
  {
    name: "Vite.js",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg",
    link: "https://vitejs.dev/",
  },
  {
    name: "Astro",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/astro/astro-original.svg",
    link: "https://astro.build/",
  },
  {
    name: "Postman",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg",
    link: "https://www.postman.com/",
  },

  // --- Design ---
  {
    name: "Figma",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg",
    link: "https://www.figma.com/",
  },
];

export const experiences = [
  {
    name: "Frontend Developer",
    company: "HNG Internship",
    date: "2023",
    description:
      "I am a Frontend Developer at HNG Internship, where I work on various projects and tasks to enhance my skills in web development.",
  },
];

export const process = [
  {
    name: "Discover & Define",
    description:
      "Every great product starts with a clear understanding. I begin by digging into the problem, aligning with business goals, and mapping out the user journey.",
  },
  {
    name: "Design Collaboration",
    description:
      "Working closely with designers, I ensure each component not only looks great but also feels intuitive. I bring Figma files to life while keeping accessibility and responsiveness top of mind.",
  },
  {
    name: "Build & Iterate",
    description:
      "With the blueprint in place, I start developing — writing clean, maintainable code using modern frameworks like React and Next.js. I focus on performance, scalability, and a seamless user experience.",
  },
  {
    name: "Connect the Dots",
    description:
      "Integrating with APIs and backend services is where the app comes to life. I handle data fetching, manage app state, and ensure everything works smoothly across the stack.",
  },
  {
    name: "Test & Refine",
    description:
      "Quality matters. I write tests, squash bugs, and polish the experience through continuous iteration. Tools like Jest, ESLint, and Cypress help keep the codebase reliable and future-proof.",
  },
  {
    name: "Launch & Learn",
    description:
      "Once deployed (often via Vercel or Netlify), I monitor, gather feedback, and make iterative improvements. Post-launch, I stay focused on optimizing performance, SEO, and user satisfaction.",
  },
];
