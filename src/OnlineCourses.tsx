/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, Clock, BookOpen, ExternalLink, Award } from "lucide-react";

interface Course {
  title: string;
  provider: string;
  category: string;
  status: "completed" | "in-progress";
  completedDate?: string;
  duration: string;
  link?: string;
  skills: string[];
}

const courses: Course[] = [
  {
    title: "Digital Marketing Fundamentals",
    provider: "Google",
    category: "Marketing",
    status: "completed",
    completedDate: "Jan 2024",
    duration: "40 hours",
    link: "https://grow.google/intl/en_in/",
    skills: ["SEO", "SEM", "Analytics", "Content Marketing"],
  },
  {
    title: "Social Media Marketing",
    provider: "Meta Blueprint",
    category: "Social Media",
    status: "completed",
    completedDate: "Mar 2024",
    duration: "25 hours",
    link: "https://www.facebook.com/business/learn",
    skills: ["Facebook Ads", "Instagram Strategy", "Audience Targeting"],
  },
  {
    title: "Brand Strategy & Identity",
    provider: "Coursera",
    category: "Branding",
    status: "completed",
    completedDate: "Jun 2024",
    duration: "30 hours",
    link: "https://www.coursera.org",
    skills: ["Brand Positioning", "Visual Identity", "Brand Voice"],
  },
  {
    title: "Event Management Essentials",
    provider: "LinkedIn Learning",
    category: "Events",
    status: "completed",
    completedDate: "Aug 2024",
    duration: "15 hours",
    link: "https://www.linkedin.com/learning",
    skills: ["Logistics", "Budgeting", "Vendor Management"],
  },
  {
    title: "Content Creation Masterclass",
    provider: "Udemy",
    category: "Content",
    status: "in-progress",
    duration: "20 hours",
    link: "https://www.udemy.com",
    skills: ["Video Editing", "Copywriting", "Storytelling"],
  },
  {
    title: "Data-Driven Marketing",
    provider: "HubSpot Academy",
    category: "Analytics",
    status: "in-progress",
    duration: "12 hours",
    link: "https://academy.hubspot.com",
    skills: ["Marketing Analytics", "CRM", "Lead Generation"],
  },
];

const categoryColors: Record<string, string> = {
  Marketing: "bg-blue-50 text-blue-700 border-blue-200",
  "Social Media": "bg-pink-50 text-pink-700 border-pink-200",
  Branding: "bg-purple-50 text-purple-700 border-purple-200",
  Events: "bg-amber-50 text-amber-700 border-amber-200",
  Content: "bg-green-50 text-green-700 border-green-200",
  Analytics: "bg-teal-50 text-teal-700 border-teal-200",
};

export default function OnlineCourses() {
  const [filter, setFilter] = useState<"all" | "completed" | "in-progress">("all");

  const filtered =
    filter === "all" ? courses : courses.filter((c) => c.status === filter);

  const completedCount = courses.filter((c) => c.status === "completed").length;
  const inProgressCount = courses.filter((c) => c.status === "in-progress").length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-neutral-400 mb-6">
            Continuous Learning
          </h2>
          <p className="text-4xl md:text-6xl font-serif leading-tight">
            Online <span className="italic">Courses.</span>
          </p>
        </div>
        <p className="text-neutral-500 max-w-xs mt-8 md:mt-0 font-light">
          Staying ahead through structured learning and industry certifications.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-16">
        {[
          { icon: BookOpen, label: "Total Courses", value: courses.length },
          { icon: CheckCircle, label: "Completed", value: completedCount },
          { icon: Clock, label: "In Progress", value: inProgressCount },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bento-card text-center">
            <Icon className="w-6 h-6 mx-auto mb-3 text-neutral-400" />
            <p className="text-3xl font-bold font-serif mb-1">{value}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-12">
        {(["all", "completed", "in-progress"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
              filter === tab
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
            }`}
          >
            {tab === "all" ? "All" : tab === "completed" ? "Completed" : "In Progress"}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course, i) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bento-card group relative flex flex-col justify-between"
          >
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-6">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                  categoryColors[course.category] ?? "bg-neutral-50 text-neutral-500 border-neutral-200"
                }`}
              >
                {course.category}
              </span>
              <span
                className={`flex items-center space-x-1 text-[10px] font-bold uppercase tracking-widest ${
                  course.status === "completed" ? "text-green-600" : "text-amber-600"
                }`}
              >
                {course.status === "completed" ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <Clock className="w-3.5 h-3.5" />
                )}
                <span>{course.status === "completed" ? "Completed" : "In Progress"}</span>
              </span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 font-serif group-hover:text-neutral-600 transition-colors">
                {course.title}
              </h3>
              <div className="flex items-center space-x-2 mb-4">
                <Award className="w-3.5 h-3.5 text-neutral-400" />
                <p className="text-sm text-neutral-500 font-medium">{course.provider}</p>
                <span className="text-neutral-200">·</span>
                <p className="text-sm text-neutral-400">{course.duration}</p>
              </div>
              {course.completedDate && (
                <p className="text-xs text-neutral-400 mb-4 font-mono">
                  Completed {course.completedDate}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                {course.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-neutral-50 border border-neutral-100 rounded-full text-xs font-semibold text-neutral-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Link */}
            {course.link && (
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center text-xs font-bold uppercase tracking-[0.15em] text-neutral-400 hover:text-neutral-900 transition-colors group-hover:translate-x-1 transition-transform"
              >
                View Course <ExternalLink className="ml-1.5 w-3 h-3" />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
