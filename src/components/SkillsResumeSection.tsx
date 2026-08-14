import React, { useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Code2,
  Cpu,
  Layers,
  Search,
  Globe,
  Eye,
  X,
  CheckCircle2,
  Zap
} from 'lucide-react';
import {
  PLATFORM_LINKS,
  SKILL_CATEGORIES,
  RESUME_CONFIG,
  SkillCategory,
  PlatformLink,
} from '../data/skills_manifest';

export const SkillsResumeSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showPdfViewer, setShowPdfViewer] = useState<boolean>(false);

  // Icon Resolver for Category icons
  const renderCategoryIcon = (iconKey: SkillCategory['iconKey']) => {
    switch (iconKey) {
      case 'cpu':
        return <Cpu className="w-4 h-4 text-slate-300" />;
      case 'layers':
        return <Layers className="w-4 h-4 text-slate-300" />;
      case 'globe':
        return <Globe className="w-4 h-4 text-slate-300" />;
      case 'code':
        return <Code2 className="w-4 h-4 text-slate-300" />;
      default:
        return <Zap className="w-4 h-4 text-slate-300" />;
    }
  };

  // Icon Resolver for Platform icons
  const renderPlatformIcon = (iconKey: PlatformLink['iconKey']) => {
    switch (iconKey) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'mail':
        return <Mail className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const handleOpenPdf = () => {
    window.open(RESUME_CONFIG.filePath, '_blank');
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchingSkills = cat.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchingSkills.length === 0) return null;
    return { ...cat, skills: matchingSkills };
  }).filter(Boolean) as SkillCategory[];

  return (
    <section id="profile-skills-resume" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* SECTION TITLE & RESUME / PROFILES HEADER ROW */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono text-slate-400 font-medium mb-1.5 flex items-center gap-2 tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-slate-300" />
              <span>04 // TECH STACK & PROFILES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              Skills & Resume
            </h2>
          </div>

          {/* Action Row: Platforms & Direct Resume File Link */}
          <div className="flex flex-wrap items-center justify-start sm:justify-end gap-3 md:ml-auto">
            {/* Platform Quick Links from Manifest */}
            <div className="flex items-center gap-1.5 bg-[#090A0E] border border-white/10 p-1 rounded-xl">
              {PLATFORM_LINKS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={p.name}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition flex items-center gap-1.5 text-xs font-mono"
                >
                  {renderPlatformIcon(p.iconKey)}
                  <span className="hidden sm:inline">{p.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              ))}
            </div>

            {/* Resume File Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPdfViewer(true)}
                className="btn-secondary px-3.5 py-2 text-xs flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>Preview Resume</span>
              </button>
              
              <a
                href={RESUME_CONFIG.filePath}
                download={RESUME_CONFIG.fileName}
                className="btn-primary px-3.5 py-2 text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* SKILLS SECTION */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold font-heading text-white">Skills Matrix</h3>
            </div>
            
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter skills..."
                className="bg-[#090A0E] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-white/30 w-full sm:w-56"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-[#090A0E] border border-white/[0.06] rounded-xl p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  {renderCategoryIcon(category.iconKey)}
                  <span>{category.title}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`text-xs font-mono px-2.5 py-1 rounded-md border transition ${
                        skill.isCore
                          ? 'bg-white/[0.06] text-white border-white/20 font-semibold'
                          : 'bg-[#141720] text-slate-300 border-white/[0.06] hover:border-white/15'
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATIC ATS-COMPATIBLE PDF PREVIEW MODAL */}
      {showPdfViewer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E1017] border border-white/15 rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Top Header */}
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#090A0E]">
              <div className="flex items-center gap-2.5 font-mono text-xs text-white">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>{RESUME_CONFIG.fileName}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                  ATS Verified
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenPdf}
                  className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Open in Tab</span>
                </button>
                <a
                  href={RESUME_CONFIG.filePath}
                  download={RESUME_CONFIG.fileName}
                  className="btn-primary px-3 py-1.5 text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={() => setShowPdfViewer(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 bg-[#090A0E] p-2 sm:p-4 relative">
              <iframe
                src={RESUME_CONFIG.filePath}
                className="w-full h-full rounded-xl border border-white/10 bg-white"
                title="Ritwik Gupta Resume PDF"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-[#090A0E] border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Machine-Readable ATS Format</span>
              </span>
              <button
                onClick={() => setShowPdfViewer(false)}
                className="btn-subtle px-3 py-1 text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
