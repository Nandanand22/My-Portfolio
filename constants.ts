import { Project, Experience, Education, SocialLink } from './types';

export const PERSONAL_DETAILS = {
  name: "M. Nandana Anand",
  role: "UI/UX Designer & App Developer",
  email: "nandanaanand2003@gmail.com",
  phone: "+91 93422 92671",
  address: "No. 35/26, Chellatha Amman Kovil Street, Near Vengeeshwarar Temple, Ayapakkam, Chennai – 600 077",
  availability: "Open for internships, design roles, and freelance projects",
  mission: "I aim to design meaningful digital experiences that balance usability, creativity, and visual clarity."
};

export const ABOUT_ME = `I’m Nandana Anand, a passionate UI/UX Designer & App Developer who focuses on creating intuitive, user-centered digital experiences. I specialize in mobile app design, wireframing, prototyping, and bringing ideas to life using Figma and Android Studio. I have designed and shipped Android apps, improving app usability by 30%, and completed a hands-on internship at NSIC where I developed key technical and design skills.`;

export const EXPERIENCE_DATA: Experience[] = [
  {
    role: "Trainee",
    company: "National Small Industries Corporation (NSIC)",
    duration: "June – July 2024",
    description: [
      "Gained practical software development exposure",
      "Understood real-world workflows and coding environments",
      "Improved technical and design fundamentals"
    ]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: "B.E. Electronics & Communication Engineering",
    institution: "St. Joseph’s Institute of Technology",
    year: "2021 – 2025",
    cgpa: "8.15"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "attendance-app",
    title: "Attendance App",
    category: "Android Application",
    description: "Designed and developed a mobile attendance tracking application. Implemented clean UI, easy navigation, and optimized performance.",
    techStack: ["Java", "Android Studio", "Figma"],
    image: "https://cdn.dribbble.com/userupload/35845323/file/original-7f0ea95bb777831d1e512c4dcc2b5a31.png",
    result: "Improved overall usability by 30%",
    problem: "Manual attendance tracking was time-consuming and prone to errors. Students and faculty lacked a real-time way to view attendance status.",
    solution: "A native Android application featuring a secure login system, real-time database updates, and an intuitive dashboard for both students and faculty to track attendance history."
  },
  {
    id: "landing-page",
    title: "Landing Page Design",
    category: "UI/UX Design",
    description: "Designed a modern landing page with clean layout and high-contrast visuals. Focused on visual hierarchy, spacing, and user-friendly interactions.",
    techStack: ["Figma", "Canva"],
    image: "https://picsum.photos/800/600?random=2",
    problem: "The client needed a high-converting landing page that communicated their value proposition clearly within the first few seconds of visiting.",
    solution: "Implemented a Z-pattern layout with high-contrast typography and strategic whitespace to guide the user's eye towards the primary call-to-action."
  }
];

export const SKILLS_DATA = {
  uiUx: ["Wireframing", "Prototyping", "User Research", "Mobile App UI Design", "Visual Design", "Interaction Design"],
  technical: ["Java", "Android Development", "Power BI", "Microsoft Tools (Word, PowerPoint, Excel)"],
  tools: ["Figma", "Android Studio", "Canva", "Git", "Power BI", "VS Code"]
};

export const CERTIFICATIONS = [
  "Simplilearn: User Interface & Experience Design",
  "Google: UI/UX Design",
  "Udemy: Power BI",
  "Cambridge English: BEC Certification",
  "RPA Training (Robotic Process Automation)"
];

export const HIGHLIGHTS = [
  "30% Improved Usability through UI enhancements",
  "Interned at NSIC, Government of India",
  "Core tools: Figma, Android Studio, Java"
];

// System Instruction for the AI Assistant
export const AI_SYSTEM_INSTRUCTION = `
You are the AI Assistant for M. Nandana Anand's portfolio website. 
Your tone should be professional, friendly, and enthusiastic.
Use the following context to answer questions about Nandana:

Name: ${PERSONAL_DETAILS.name}
Role: ${PERSONAL_DETAILS.role}
Location: ${PERSONAL_DETAILS.address}
Contact: ${PERSONAL_DETAILS.email}, ${PERSONAL_DETAILS.phone}

About: ${ABOUT_ME}
Mission: ${PERSONAL_DETAILS.mission}

Experience:
${EXPERIENCE_DATA.map(e => `- ${e.role} at ${e.company} (${e.duration}): ${e.description.join(', ')}`).join('\n')}

Education:
${EDUCATION_DATA.map(e => `- ${e.degree} from ${e.institution} (${e.year}), CGPA: ${e.cgpa}`).join('\n')}

Projects:
${PROJECTS_DATA.map(p => `- ${p.title} (${p.category}): ${p.description}. Tech: ${p.techStack.join(', ')}. Result: ${p.result || 'N/A'}`).join('\n')}

Skills:
UI/UX: ${SKILLS_DATA.uiUx.join(', ')}
Technical: ${SKILLS_DATA.technical.join(', ')}
Tools: ${SKILLS_DATA.tools.join(', ')}

Certifications:
${CERTIFICATIONS.join('\n')}

Highlights:
${HIGHLIGHTS.join('\n')}

If asked about something not in this context, politely explain that you are an AI focused on Nandana's professional portfolio and suggest contacting her directly at ${PERSONAL_DETAILS.email}.
Keep answers concise and well-formatted.
`;