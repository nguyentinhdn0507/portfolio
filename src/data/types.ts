export type Language = 'en' | 'vi';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'ecommerce' | 'enterprise' | 'pwa' | 'fullstack';
  period?: string;
  company: string;
  role: string;
  teamSize: number;
  description: string;
  technologies: string[];
  feResponsibilities: string[];
  beResponsibilities?: string[];
  keyHighlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  projects: {
    name: string;
    tech: string[];
    role: string;
    bullets: string[];
  }[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Intermediate';
    iconName?: string;
    highlight?: boolean;
  }[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  scoreOrDetail: string;
  type: 'language' | 'education' | 'tech';
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface TranslationDictionary {
  nav: {
    about: string;
    experience: string;
    projects: string;
    skills: string;
    certifications: string;
    contact: string;
    resume: string;
  };
  hero: {
    greeting: string;
    name: string;
    role: string;
    tagline: string;
    bio: string;
    status: string;
    ctaProjects: string;
    ctaContact: string;
    downloadCv: string;
    stats: {
      experience: string;
      expLabel: string;
      projects: string;
      projLabel: string;
      certifications: string;
      certLabel: string;
      satisfaction: string;
      satLabel: string;
    };
  };
  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    introTitle: string;
    introP1: string;
    introP2: string;
    shortTermGoalTitle: string;
    shortTermGoalDesc: string;
    longTermGoalTitle: string;
    longTermGoalDesc: string;
    coreStrengthsTitle: string;
    strengths: {
      title: string;
      desc: string;
    }[];
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    allFilter: string;
    ecommerceFilter: string;
    enterpriseFilter: string;
    pwaFilter: string;
    fullstackFilter: string;
    teamSizeLabel: string;
    roleLabel: string;
    companyLabel: string;
    techStackLabel: string;
    viewDetails: string;
    feTitle: string;
    beTitle: string;
    highlightsTitle: string;
    closeModal: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewProjects: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: {
      frontend: string;
      frontendDesc: string;
      backend: string;
      backendDesc: string;
      testingTools: string;
      testingToolsDesc: string;
      architecture: string;
      architectureDesc: string;
    };
  };
  certifications: {
    eyebrow: string;
    title: string;
    subtitle: string;
    educationTitle: string;
    certsTitle: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    phoneLabel: string;
    linkedinLabel: string;
    locationLabel: string;
    locationValue: string;
    copyEmail: string;
    copyPhone: string;
    copied: string;
    sendEmailCta: string;
    connectLinkedIn: string;
    availabilityTitle: string;
    availabilityDesc: string;
  };
  footer: {
    rights: string;
    backToTop: string;
  };
  data: {
    projects: ProjectItem[];
    experiences: ExperienceItem[];
    skills: SkillCategory[];
    certifications: CertificationItem[];
    education: EducationItem[];
  };
}
