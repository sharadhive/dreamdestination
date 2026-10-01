import React, { useState } from "react";
import { 
  Building2, MapPin, ExternalLink, Sparkles, Play, Pause, 
  Grid, MoveHorizontal, GraduationCap, Award, Search, ArrowUpRight
} from "lucide-react";
import { type College } from "@/data/countryData";

interface College3DSliderProps {
  colleges: College[];
  countryName: string;
}

// Utility to extract domain from website URL
const getDomainFromUrl = (url: string): string => {
  try {
    const domain = url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
    return domain;
  } catch {
    return "";
  }
};

// Generate initials for university fallback crest
const getInitials = (name: string): string => {
  const cleanName = name.replace(/University|College|Institute|of|Technology|and|Science/gi, "").trim();
  const words = cleanName.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const CollegeCard: React.FC<{ college: College; index: number; isGrid?: boolean }> = ({ college, index, isGrid = false }) => {
  const [imageError, setImageError] = useState(false);
  const domain = getDomainFromUrl(college.website);
  
  // Clearbit / Google Favicon URL
  const logoUrl = college.logo || (domain ? `https://logo.clearbit.com/${domain}` : "");
  const fallbackLogoUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : "";

  return (
    <div
      className={`relative group ${isGrid ? "w-full max-w-full" : "shrink-0 w-[270px] sm:w-[310px] md:w-[350px]"} bg-card/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-border/80 shadow-3d-card shadow-3d-hover transition-all duration-500 flex flex-col justify-between transform-style-3d hover:z-20 cursor-pointer`}
      style={{
        transform: `perspective(1000px) rotateY(${index % 2 === 0 ? "1deg" : "-1deg"})`,
      }}
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl pointer-events-none group-hover:from-primary/10 group-hover:to-secondary/15 transition-all duration-500" />
      
      {/* Top Header: Logo + Ranking */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Logo Frame */}
          <div className="relative w-14 h-14 rounded-xl bg-white p-2 border border-border/60 shadow-md shrink-0 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
            {!imageError && logoUrl ? (
              <img
                src={logoUrl}
                alt={`${college.name} logo`}
                width={64}
                height={64}
                className="w-full h-full object-contain"
                onError={(e) => {
                  if (fallbackLogoUrl && (e.currentTarget.src !== fallbackLogoUrl)) {
                    e.currentTarget.src = fallbackLogoUrl;
                  } else {
                    setImageError(true);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold text-sm shadow-inner">
                {getInitials(college.name)}
              </div>
            )}
          </div>

          {/* Ranking Badge */}
          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-gold text-secondary-foreground font-bold text-xs rounded-full shadow-gold shrink-0">
            <Award className="w-3.5 h-3.5" />
            <span>{college.ranking}</span>
          </div>
        </div>

        {/* University Name */}
        <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">
          {college.name}
        </h3>

        {/* Location Badge */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="truncate">{college.location}</span>
        </div>

        {/* Programs Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {college.programs.slice(0, 3).map((prog, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-muted/80 text-muted-foreground text-[11px] font-medium rounded-md border border-border/40"
            >
              {prog}
            </span>
          ))}
          {college.programs.length > 3 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-semibold rounded-md">
              +{college.programs.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Card Action Link */}
      <div className="pt-3 border-t border-border/40 flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
          <GraduationCap className="w-4 h-4 text-primary" /> Top Institution
        </span>
        <a
          href={college.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 bg-primary/10 group-hover:bg-primary group-hover:text-white px-3 py-1.5 rounded-lg transition-all duration-300 shadow-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Official Site <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

const College3DSlider: React.FC<College3DSliderProps> = ({ colleges, countryName }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredColleges = colleges.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.programs.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Duplicate list for smooth 3D Marquee loop
  const marqueeColleges = [...colleges, ...colleges];

  return (
    <section id="colleges" className="py-16 bg-gradient-subtle relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Title & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D Showcase</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Top Colleges & Universities in <span className="text-gradient-hero">{countryName}</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-2xl">
              Explore real university logos, global QS rankings, and world-class degree programs.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search college or degree..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-card border border-border/80 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-44 md:w-60 shadow-soft"
              />
            </div>

            {/* View Switcher Buttons */}
            <div className="flex items-center bg-card border border-border/80 rounded-xl p-1 shadow-soft">
              <button
                onClick={() => setViewMode("marquee")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "marquee"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="3D Marquee Slider"
              >
                <MoveHorizontal className="w-3.5 h-3.5" /> 3D Slider
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "grid"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" /> Grid View
              </button>
            </div>

            {/* Play/Pause Toggle for Marquee */}
            {viewMode === "marquee" && !searchQuery && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-card border border-border/80 rounded-xl text-muted-foreground hover:text-primary transition-colors shadow-soft"
                title={isPlaying ? "Pause 3D Scroll" : "Play 3D Scroll"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Search Active View */}
        {searchQuery ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {filteredColleges.length > 0 ? (
              filteredColleges.map((college, idx) => (
                <div key={idx} className="w-full">
                  <CollegeCard college={college} index={idx} isGrid={true} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No colleges found matching "{searchQuery}".
              </div>
            )}
          </div>
        ) : viewMode === "marquee" ? (
          /* 3D Marquee Slider Track */
          <div className="relative w-full overflow-hidden py-6 perspective-1000">
            {/* Left & Right Gradient Shadows for Seamless Depth */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div
              className={`flex gap-6 w-max ${
                isPlaying ? "animate-marquee-3d" : ""
              }`}
            >
              {marqueeColleges.map((college, idx) => (
                <CollegeCard key={`${college.name}-${idx}`} college={college} index={idx} />
              ))}
            </div>
          </div>
        ) : (
          /* Structured Grid View */
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {colleges.map((college, idx) => (
              <div key={idx} className="w-full">
                <CollegeCard college={college} index={idx} isGrid={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default College3DSlider;
