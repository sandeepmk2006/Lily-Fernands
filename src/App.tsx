/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { 
  Mail, 
  Linkedin, 
  MapPin, 
  ExternalLink, 
  Calendar, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Award, 
  Target,
  ChevronRight,
  Instagram,
  Briefcase,
  User,
  Zap,
  ArrowUpRight,
  Globe,
  Layout,
  Smartphone,
  Sparkles,
  Quote
} from "lucide-react";
import { IMG_HERO, IMG_FERN_CO, IMG_UNIVERSITY, IMG_GALLERY } from "./images";
import ChatBot from "./ChatBot";
import OnlineCourses from "./OnlineCourses";

const Section = ({ children, className = "", id = "" }: { children: ReactNode, className?: string, id?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`py-24 px-6 md:px-12 lg:px-24 ${className}`}
  >
    {children}
  </motion.section>
);

const MagneticButton = ({ children, className = "", href = "" }: { children: ReactNode, className?: string, href?: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </a>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen font-sans selection:bg-neutral-900 selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-neutral-900 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold tracking-tighter font-serif"
          >
            LF.
          </motion.span>
          <div className="hidden md:flex space-x-10 text-sm font-semibold uppercase tracking-widest text-neutral-500">
            <a href="#about" className="hover:text-neutral-900 transition-colors">About</a>
            <a href="#services" className="hover:text-neutral-900 transition-colors">Services</a>
            <a href="#skills" className="hover:text-neutral-900 transition-colors">Skills</a>
            <a href="#courses" className="hover:text-neutral-900 transition-colors">Courses</a>
            <a href="#experience" className="hover:text-neutral-900 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-neutral-900 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-neutral-900 transition-colors">Contact</a>
          </div>
          <MagneticButton 
            href="#contact" 
            className="px-6 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800"
          >
            Let's Talk
          </MagneticButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center pt-20 relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neutral-100 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neutral-100 rounded-full blur-[120px] -z-10" />
        
        <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <span className="w-12 h-[1px] bg-neutral-300" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-neutral-400">
                Marketing & Event Strategy
              </span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-[0.85] mb-10 font-serif">
              Lily <br /> <span className="italic font-normal">Fernandes</span>
            </h1>
            <p className="text-xl text-neutral-500 max-w-md mb-12 leading-relaxed font-light">
              Crafting narrative-driven experiences that bridge the gap between brand vision and audience engagement.
            </p>
            <div className="flex items-center space-x-8">
              <MagneticButton 
                href="#contact" 
                className="px-10 py-5 bg-neutral-900 text-white rounded-full font-bold uppercase tracking-widest text-xs group"
              >
                Start a Project
                <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </MagneticButton>
              <a href="#experience" className="text-sm font-bold uppercase tracking-widest border-b-2 border-neutral-200 pb-1 hover:border-neutral-900 transition-all">
                Explore Work
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative group">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full overflow-hidden"
          >
            <img 
              src={IMG_HERO}
              alt="Lily Fernandes"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-12 left-12 text-white z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
            <p className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2">Based in</p>
            <p className="text-3xl font-serif italic">Bangalore, India</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Section id="services" className="bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6">Expertise</h2>
              <p className="text-4xl md:text-6xl font-serif leading-tight">
                Strategic solutions for <span className="italic">modern brands.</span>
              </p>
            </div>
            <p className="text-neutral-500 max-w-xs mt-8 md:mt-0 font-light">
              Providing end-to-end management for digital presence and physical experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bento-card group">
              <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-500">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif">Social Strategy</h3>
              <p className="text-neutral-500 font-light leading-relaxed">
                Crafting data-informed content strategies that drive organic growth and meaningful community engagement.
              </p>
            </div>
            <div className="bento-card group">
              <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-500">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif">Event Curation</h3>
              <p className="text-neutral-500 font-light leading-relaxed">
                Meticulous planning and execution of cultural and corporate events, from logistics to on-ground coordination.
              </p>
            </div>
            <div className="bento-card group">
              <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-500">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif">Brand Identity</h3>
              <p className="text-neutral-500 font-light leading-relaxed">
                Developing cohesive visual languages and brand voices that resonate with target demographics.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Skills Bento Grid */}
      <Section id="skills">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-neutral-400 mb-16">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 bento-card flex flex-col justify-between bg-neutral-900 text-white border-none">
              <div>
                <Sparkles className="w-8 h-8 mb-8 text-neutral-400" />
                <h3 className="text-4xl font-serif italic mb-6">Strategic Thinking</h3>
                <p className="text-neutral-400 font-light text-lg">
                  Bridging the gap between creative intuition and business objectives to deliver measurable impact.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                {["Market Analysis", "Trend Spotting", "ROI Focus", "Campaign Planning"].map(s => (
                  <span key={s} className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2 bento-card bg-neutral-50 border-none">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Users className="mr-2 w-5 h-5 text-neutral-400" />
                Leadership
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Volunteer Management", "Team Coordination", "Conflict Resolution", "Public Speaking"].map(s => (
                  <span key={s} className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bento-card bg-neutral-50 border-none">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Layout className="mr-2 w-5 h-5 text-neutral-400" />
                Creative Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Canva", "Adobe Express", "CapCut"].map(s => (
                  <span key={s} className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bento-card bg-neutral-50 border-none">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Globe className="mr-2 w-5 h-5 text-neutral-400" />
                Social Media
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Instagram", "LinkedIn", "TikTok Strategy"].map(s => (
                  <span key={s} className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Online Courses Section */}
      <Section id="courses" className="bg-neutral-50">
        <OnlineCourses />
      </Section>

      {/* Experience Section */}
      <Section id="experience" className="bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-24">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-neutral-500 mb-8 md:mb-0">Career Journey</h2>
            <div className="max-w-xl">
              <p className="text-3xl md:text-5xl font-serif italic leading-tight text-neutral-300">
                Building a legacy of <span className="text-white not-italic font-bold">excellence</span> through every project.
              </p>
            </div>
          </div>
          
          <div className="space-y-32">
            {/* Exp 1 */}
            <div className="grid md:grid-cols-12 gap-12 group">
              <div className="md:col-span-4">
                <p className="text-neutral-600 font-mono text-sm mb-4">2023 — 2024</p>
                <h3 className="text-3xl font-bold mb-2">Event Lead</h3>
                <p className="text-neutral-500 text-lg">Christ University Cultural Fest</p>
              </div>
              <div className="md:col-span-8 border-l border-neutral-800 pl-12 relative">
                <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] bg-white rounded-full group-hover:scale-150 transition-transform" />
                <ul className="space-y-8 text-neutral-400 text-lg font-light leading-relaxed">
                  <li>
                    Led a cross-functional team of <span className="text-white font-medium">15+ volunteers</span> for university-wide cultural events, catering to an audience of <span className="text-white font-medium">500+ attendees</span>.
                  </li>
                  <li>
                    Orchestrated on-ground logistics and communication protocols, ensuring seamless execution of multi-stage activities and performances.
                  </li>
                  <li>
                    Streamlined volunteer workflows and task allocation, resulting in a <span className="text-white font-medium">20% improvement</span> in operational efficiency.
                  </li>
                </ul>
              </div>
            </div>

            {/* Exp 2 */}
            <div className="grid md:grid-cols-12 gap-12 group">
              <div className="md:col-span-4">
                <p className="text-neutral-600 font-mono text-sm mb-4">2022 — 2024</p>
                <h3 className="text-3xl font-bold mb-2">Social Strategist</h3>
                <p className="text-neutral-500 text-lg">Student Clubs & Organizations</p>
              </div>
              <div className="md:col-span-8 border-l border-neutral-800 pl-12 relative">
                <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] bg-white rounded-full group-hover:scale-150 transition-transform" />
                <ul className="space-y-8 text-neutral-400 text-lg font-light leading-relaxed">
                  <li>
                    Managed end-to-end content calendars for <span className="text-white font-medium">3+ student organizations</span>, driving a consistent brand voice.
                  </li>
                  <li>
                    Developed and executed engagement strategies, increasing follower interaction by <span className="text-white font-medium">~15%</span> through trend-based content.
                  </li>
                  <li>
                    Designed <span className="text-white font-medium">50+ high-impact visual assets</span> using Canva and Adobe Express.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-neutral-400">Case Studies</h2>
            <a href="#" className="text-xs font-bold uppercase tracking-widest border-b-2 border-neutral-200 pb-1 hover:border-neutral-900 transition-all">View All Projects</a>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div 
              whileHover={{ y: -20 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] bg-neutral-100 rounded-[2.5rem] mb-10 overflow-hidden relative">
                <img 
                  src={IMG_FERN_CO}
                  alt="Fern & Co." 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
                <div className="absolute top-8 right-8 glass px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Entrepreneurship
                </div>
              </div>
              <h3 className="text-4xl font-serif italic mb-4">Founder, Fern & Co.</h3>
              <p className="text-neutral-500 font-light text-lg mb-8 leading-relaxed">
                An Instagram-based customized product business focused on personalized gifting and unique brand identity.
              </p>
              <div className="flex items-center text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 group-hover:translate-x-2 transition-transform">
                Read Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -20 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] bg-neutral-100 rounded-[2.5rem] mb-10 overflow-hidden relative">
                <img 
                  src={IMG_UNIVERSITY}
                  alt="University Outreach" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
                <div className="absolute top-8 right-8 glass px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Event Strategy
                </div>
              </div>
              <h3 className="text-4xl font-serif italic mb-4">University Outreach</h3>
              <p className="text-neutral-500 font-light text-lg mb-8 leading-relaxed">
                A strategic promotion initiative for university cultural fests to maximize student participation and engagement.
              </p>
              <div className="flex items-center text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 group-hover:translate-x-2 transition-transform">
                Read Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 mx-auto mb-12 text-neutral-200" />
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-neutral-400 mb-12">Endorsements</h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-12"
          >
            <p className="text-3xl md:text-5xl font-serif italic leading-tight text-neutral-800">
              "Lily's ability to coordinate complex events while maintaining a clear brand vision is exceptional. She is a natural leader who brings <span className="not-italic font-bold">clarity to chaos</span>."
            </p>
            <div>
              <p className="text-lg font-bold">Cultural Coordinator</p>
              <p className="text-sm text-neutral-400 uppercase tracking-widest mt-1">Christ University</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Work in Action Gallery */}
      <Section className="overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-neutral-400">Work in Action</h2>
            <p className="text-neutral-500 max-w-xs mt-4 md:mt-0 font-light">Capturing the energy and precision of real-world execution.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {IMG_GALLERY.map((src, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }} 
                className={`aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl shadow-neutral-200/50 ${i % 2 !== 0 ? 'mt-12' : ''}`}
              >
                <img src={src} alt="Gallery" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-neutral-900 text-white pt-40 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24">
            <div>
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-neutral-500 mb-12">Contact</h2>
              <h3 className="text-6xl md:text-8xl font-serif italic leading-[0.9] mb-12">
                Let's create <br /> the <span className="not-italic font-bold text-white">extraordinary.</span>
              </h3>
              <div className="space-y-8">
                <a href="mailto:lily.fernandes@example.com" className="flex items-center text-2xl font-light hover:text-neutral-400 transition-colors group">
                  <Mail className="mr-4 w-6 h-6 text-neutral-600 group-hover:text-white transition-colors" /> lily.fernandes@example.com
                </a>
                <a href="https://linkedin.com/in/lily-fernandes" className="flex items-center text-2xl font-light hover:text-neutral-400 transition-colors group">
                  <Linkedin className="mr-4 w-6 h-6 text-neutral-600 group-hover:text-white transition-colors" /> lily-fernandes
                </a>
              </div>
            </div>
            
            <div className="flex flex-col justify-end">
              <div className="bento-card bg-white/5 border-white/10 text-white p-12">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Quick Connect</h4>
                <p className="text-xl font-light mb-10 text-neutral-300 leading-relaxed">
                  Currently open to full-time opportunities and strategic collaborations in Bangalore or remote.
                </p>
                <MagneticButton className="w-full py-5 bg-white text-neutral-900 rounded-full font-bold uppercase tracking-widest text-xs">
                  Download Resume
                </MagneticButton>
              </div>
            </div>
          </div>
          
          <div className="mt-40 pt-12 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-xs font-bold uppercase tracking-widest">
            <p>© 2026 Lily Fernandes</p>
            <div className="flex items-center space-x-8 mt-6 md:mt-0">
              <span className="flex items-center"><MapPin className="w-3 h-3 mr-2" /> Bangalore</span>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </Section>
      {/* AI Chat Assistant */}
      <ChatBot />
    </div>
  );
}
