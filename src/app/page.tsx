'use client';

import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import CertsEducationSection from '@/components/sections/CertsEducationSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden flex flex-col space-y-0">
      {/* Hero Section with Interactive 3D Canvas */}
      <HeroSection />

      {/* About & Career Vision */}
      <AboutSection />

      {/* Featured Projects Showcase & Filters */}
      <ProjectsSection />

      {/* Career Timeline & Experience */}
      <ExperienceSection />

      {/* Skills Matrix & Proficiencies */}
      <SkillsSection />

      {/* Academic Background & Language Certifications */}
      <CertsEducationSection />

      {/* Direct Contact & Collaboration */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
