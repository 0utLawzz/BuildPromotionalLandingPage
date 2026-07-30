import { useState, useEffect, useRef } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Tech Stack', href: '#tech' },
]

const STATS = [
  { value: '102', label: 'Episodes Generated', mono: true },
  { value: '7', label: 'Health Seasons', mono: true },
  { value: '30fps', label: 'Render Quality', mono: true },
  { value: '2x', label: 'Platform Reach', mono: true },
]

const STEPS = [
  {
    num: '01',
    title: 'Plan',
    desc: 'Define your season, episodes, and health topics from a master spreadsheet. Script templates handle the science.',
    color: '#FFD23F',
    icon: '📋',
  },
  {
    num: '02',
    title: 'Render',
    desc: 'Framer Motion animates each scene at 1080×1920. Playwright + ffmpeg export pixel-perfect MP4s at 30fps.',
    color: '#00A896',
    icon: '🎬',
  },
  {
    num: '03',
    title: 'Review',
    desc: 'Browse the publishing dashboard, edit episode metadata, and preview every reel before it goes live.',
    color: '#FF4F7B',
    icon: '🔍',
  },
  {
    num: '04',
    title: 'Publish',
    desc: 'One-click YouTube upload. Facebook auto-publisher handles daily distribution on a schedule you control.',
    color: '#FF6B35',
    icon: '🚀',
  },
]

const FEATURES = [
  {
    title: 'AI Script Engine',
    desc: 'Health-science scripts auto-generated from season briefs. Each episode is fact-checked and structured for maximum retention.',
    tag: 'CONTENT',
    color: '#FFD23F',
  },
  {
    title: 'Animated Video Builder',
    desc: 'React + Framer Motion scenes render directly to 1080×1920 vertical video — no external video editor required.',
    tag: 'RENDERING',
    color: '#00A896',
  },
  {
    title: 'Publishing Dashboard',
    desc: 'Track every episode from scripted → scheduled → published. Edit metadata, swap thumbnails, and monitor status at a glance.',
    tag: 'MANAGEMENT',
    color: '#4B7BEC',
  },
  {
    title: 'YouTube Auto-Scheduler',
    desc: 'Uploads at the optimal time for your channel. The Data API v3 handles titles, descriptions, tags, and privacy settings automatically.',
    tag: 'YOUTUBE',
    color: '#FF4F7B',
  },
  {
    title: 'Facebook Daily Publisher',
    desc: 'Graph API integration posts your reels to Facebook every day without lifting a finger. Set it and scale it.',
    tag: 'FACEBOOK',
    color: '#FF6B35',
  },
  {
    title: 'Season Architecture',
    desc: '7 themed seasons — Morning Habits, Sleep & Recovery, Nutrition & Myths, and more — each with unique visual branding.',
    tag: 'STRUCTURE',
    color: '#00A896',
  },
]

const SHOWCASE = [
  {
    episode: 'S1 · E04',
    title: '5 Morning Habits That Actually Work',
    views: '142K',
    img: 'https://images.unsplash.com/photo-1474859569645-e0def92b02bc?w=400&h=711&fit=crop&auto=format',
    tag: 'MORNING HABITS',
    tagColor: '#FFD23F',
  },
  {
    episode: 'S3 · E11',
    title: 'The Truth About Protein Timing',
    views: '89K',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=711&fit=crop&auto=format',
    tag: 'NUTRITION',
    tagColor: '#00A896',
  },
  {
    episode: 'S1 · E01',
    title: 'Why You Need This Breakfast Bowl',
    views: '203K',
    img: 'https://images.unsplash.com/photo-1501959915551-4e8d30928317?w=400&h=711&fit=crop&auto=format',
    tag: 'MORNING HABITS',
    tagColor: '#FFD23F',
  },
  {
    episode: 'S3 · E07',
    title: 'Anti-Inflammatory Foods Ranked',
    views: '67K',
    img: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=711&fit=crop&auto=format',
    tag: 'NUTRITION',
    tagColor: '#00A896',
  },
  {
    episode: 'S2 · E03',
    title: 'Sleep Debt Is Destroying Your Health',
    views: '315K',
    img: 'https://images.unsplash.com/photo-1486591038957-19e7c73bdc41?w=400&h=711&fit=crop&auto=format',
    tag: 'SLEEP',
    tagColor: '#4B7BEC',
  },
  {
    episode: 'S4 · E09',
    title: 'Eat the Rainbow: A Visual Guide',
    views: '178K',
    img: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=400&h=711&fit=crop&auto=format',
    tag: 'NUTRITION',
    tagColor: '#FF4F7B',
  },
]

const TECH = [
  { name: 'React 19', icon: '⚛️' },
  { name: 'Framer Motion', icon: '🎞️' },
  { name: 'Playwright', icon: '🎭' },
  { name: 'ffmpeg', icon: '🎥' },
  { name: 'Drizzle ORM', icon: '🗄️' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'YouTube API v3', icon: '▶️' },
  { name: 'Facebook Graph', icon: '📘' },
  { name: 'TypeScript 5.9', icon: '🔷' },
  { name: 'Tailwind CSS v4', icon: '🎨' },
]

// ─── Components ──────────────────────────────────────────────────────────────

function MemphisShape({
  type,
  size,
  color,
  style,
  className,
}: {
  type: 'circle' | 'triangle' | 'zigzag' | 'dot' | 'square'
  size: number
  color: string
  style?: React.CSSProperties
  className?: string
}) {
  if (type === 'circle') {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `3px solid ${color}`,
          ...style,
        }}
      />
    )
  }
  if (type === 'dot') {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          ...style,
        }}
      />
    )
  }
  if (type === 'square') {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          border: `3px solid ${color}`,
          transform: 'rotate(15deg)',
          ...style,
        }}
      />
    )
  }
  if (type === 'zigzag') {
    return (
      <svg
        className={className}
        width={size * 2}
        height={size}
        viewBox={`0 0 ${size * 2} ${size}`}
        style={style}
      >
        <polyline
          points={`0,${size} ${size / 2},0 ${size},${size} ${size * 1.5},0 ${size * 2},${size}`}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  // triangle
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={style}
    >
      <polygon
        points="50,5 95,95 5,95"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PhoneMockup({
  episode,
  title,
  tag,
  tagColor,
  imgUrl,
}: {
  episode: string
  title: string
  tag: string
  tagColor: string
  imgUrl: string
}) {
  return (
    <div
      className="phone-frame relative"
      style={{ width: 180, height: 320 }}
    >
      {/* Screen */}
      <div className="absolute inset-0 overflow-hidden rounded-[30px]">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.75)' }}
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
          }}
        />
        {/* Top bar */}
        <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-3">
          <span
            className="font-mono-label text-white px-2 py-0.5 text-[8px] font-bold"
            style={{ background: tagColor, color: '#1A1A1A', borderRadius: 2 }}
          >
            {tag}
          </span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </div>
        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p
            className="font-mono-label text-[8px] mb-1"
            style={{ color: tagColor }}
          >
            {episode}
          </p>
          <p className="font-display text-white text-[11px] font-bold leading-tight mb-2">
            {title}
          </p>
          {/* Progress bar */}
          <div
            className="w-full h-0.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.3)' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: '40%',
                background: tagColor,
              }}
            />
          </div>
          {/* Controls row */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-white text-[10px]">▶</span>
            <span
              className="font-mono-label text-[7px]"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              0:45
            </span>
          </div>
        </div>
      </div>
      {/* Notch */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 bg-black rounded-full"
        style={{ width: 40, height: 6 }}
      />
    </div>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? '#F5F0E4' : 'transparent',
        borderBottom: scrolled ? '2.5px solid #1A1A1A' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div
            className="brutal-border"
            style={{
              width: 36,
              height: 36,
              background: '#00A896',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <div>
            <span
              className="font-display font-bold text-lg leading-none"
              style={{ color: '#1A1A1A' }}
            >
              BioMinute
            </span>
            <span
              className="font-mono-label text-xs block leading-none"
              style={{ color: '#00A896' }}
            >
              SHORTS STUDIO
            </span>
          </div>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono-label text-xs font-medium tracking-wider uppercase transition-colors hover:text-teal"
              style={{ color: '#1A1A1A' }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://github.com/0utLawzz/biominute-shorts-studio"
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-border brutal-shadow font-mono-label text-xs font-bold uppercase tracking-wider px-4 py-2 transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A]"
          style={{ background: '#FF6B35', color: '#fff', display: 'inline-block' }}
        >
          View on GitHub →
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      style={{ background: '#1A1A1A' }}
    >
      {/* Memphis background shapes */}
      <MemphisShape
        type="circle"
        size={280}
        color="rgba(0,168,150,0.15)"
        className="absolute animate-float-slow"
        style={{ top: -80, right: -60 }}
      />
      <MemphisShape
        type="circle"
        size={160}
        color="rgba(255,107,53,0.2)"
        className="absolute animate-float-medium"
        style={{ bottom: 80, left: -40 }}
      />
      <MemphisShape
        type="square"
        size={80}
        color="rgba(255,210,63,0.3)"
        className="absolute animate-float-slow"
        style={{ top: 160, left: 80 }}
      />
      <MemphisShape
        type="triangle"
        size={60}
        color="rgba(255,79,123,0.3)"
        className="absolute animate-float-medium"
        style={{ bottom: 200, right: 200 }}
      />
      <MemphisShape
        type="dot"
        size={12}
        color="#FFD23F"
        className="absolute animate-pulse-dot"
        style={{ top: 240, right: 300 }}
      />
      <MemphisShape
        type="dot"
        size={8}
        color="#00A896"
        className="absolute animate-pulse-dot"
        style={{ top: 300, right: 340, animationDelay: '0.7s' }}
      />
      <MemphisShape
        type="zigzag"
        size={40}
        color="rgba(255,210,63,0.4)"
        className="absolute"
        style={{ bottom: 160, left: 200 }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left: Copy */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div
              className="brutal-border inline-flex items-center gap-2 px-3 py-1.5 mb-8 w-fit"
              style={{ background: '#FFD23F' }}
            >
              <span className="animate-pulse-dot w-2 h-2 rounded-full bg-orange-500 inline-block" />
              <span className="font-mono-label text-xs font-bold tracking-widest uppercase text-charcoal">
                102 Episodes Generated · Season 7 Live
              </span>
            </div>

            <h1
              className="font-display font-black leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(48px, 7vw, 88px)', color: '#F5F0E4' }}
            >
              Generate
              <br />
              <em style={{ color: '#00A896', fontStyle: 'italic' }}>Health Reels</em>
              <br />
              at Scale.
            </h1>

            <p
              className="text-lg leading-relaxed mb-10 max-w-md"
              style={{ color: 'rgba(245,240,228,0.7)' }}
            >
              BioMinute Shorts Studio is an automated pipeline that scripts, renders,
              and publishes science-backed health content to YouTube Shorts and Facebook
              — without touching a single video editor.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://0utlawzz.github.io/biominute-shorts-studio/exports/dashboard.html"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-border brutal-shadow font-mono-label text-sm font-bold uppercase tracking-wider px-6 py-3 transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#00A896] inline-block"
                style={{ background: '#00A896', color: '#fff', borderColor: '#fff' }}
              >
                Get Started →
              </a>
              <a
                href="#showcase"
                className="brutal-border font-mono-label text-sm font-bold uppercase tracking-wider px-6 py-3 transition-all hover:bg-white hover:text-charcoal inline-block"
                style={{ color: '#F5F0E4', borderColor: '#F5F0E4' }}
              >
                Watch Reels ↓
              </a>
            </div>
          </div>

          {/* Right: Phone mockups */}
          <div className="relative hidden lg:flex items-center justify-center h-[520px]">
            {/* Back phone */}
            <div
              className="absolute"
              style={{
                transform: 'rotate(-10deg) translateX(-80px) translateY(20px)',
                zIndex: 1,
                opacity: 0.85,
              }}
            >
              <PhoneMockup
                episode="S3 · E11"
                title="The Truth About Protein Timing"
                tag="NUTRITION"
                tagColor="#00A896"
                imgUrl="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=711&fit=crop&auto=format"
              />
            </div>
            {/* Front phone */}
            <div
              className="absolute"
              style={{ transform: 'rotate(5deg) translateX(60px)', zIndex: 3 }}
            >
              <PhoneMockup
                episode="S1 · E04"
                title="5 Morning Habits That Actually Work"
                tag="MORNING HABITS"
                tagColor="#FFD23F"
                imgUrl="https://images.unsplash.com/photo-1474859569645-e0def92b02bc?w=400&h=711&fit=crop&auto=format"
              />
            </div>
            {/* Middle phone */}
            <div
              className="absolute"
              style={{ transform: 'rotate(-2deg) translateX(-10px) translateY(-10px)', zIndex: 2 }}
            >
              <PhoneMockup
                episode="S2 · E03"
                title="Sleep Debt Is Destroying Your Health"
                tag="SLEEP"
                tagColor="#4B7BEC"
                imgUrl="https://images.unsplash.com/photo-1486591038957-19e7c73bdc41?w=400&h=711&fit=crop&auto=format"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave separator */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 4, background: '#00A896' }}
      />
    </section>
  )
}

function StatsBar() {
  return (
    <section style={{ background: '#00A896', borderBottom: '2.5px solid #1A1A1A' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-charcoal" style={{ borderColor: '#1A1A1A' }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              className="py-8 px-6 text-center"
              style={{ borderColor: '#1A1A1A' }}
            >
              <div
                className="font-display font-black text-5xl mb-1"
                style={{ color: '#1A1A1A' }}
              >
                {s.value}
              </div>
              <div
                className="font-mono-label text-xs font-medium uppercase tracking-widest"
                style={{ color: 'rgba(26,26,26,0.7)' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28"
      style={{ background: '#F5F0E4' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-baseline gap-6 mb-16">
          <span
            className="font-mono-label text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: '#00A896' }}
          >
            Process
          </span>
          <h2
            className="font-display font-black"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#1A1A1A', lineHeight: 1 }}
          >
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="brutal-card p-6 relative"
              style={{ background: '#fff' }}
            >
              {/* Number */}
              <div
                className="font-mono-label text-xs font-bold mb-4 px-2 py-0.5 inline-block"
                style={{ background: step.color, color: '#1A1A1A' }}
              >
                {step.num}
              </div>
              {/* Icon */}
              <div className="text-4xl mb-4">{step.icon}</div>
              {/* Title */}
              <h3
                className="font-display font-black text-2xl mb-3"
                style={{ color: '#1A1A1A' }}
              >
                {step.title}
              </h3>
              {/* Desc */}
              <p className="text-sm leading-relaxed" style={{ color: '#555' }}>
                {step.desc}
              </p>
              {/* Arrow connector (not last) */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute -right-4 top-1/2 -translate-y-1/2 font-mono-label text-xl font-bold z-10 hidden lg:block"
                  style={{ color: step.color }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section
      id="features"
      className="py-28"
      style={{ background: '#1A1A1A', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background shapes */}
      <MemphisShape
        type="circle"
        size={300}
        color="rgba(255,210,63,0.07)"
        className="absolute"
        style={{ top: -100, right: -100 }}
      />
      <MemphisShape
        type="triangle"
        size={120}
        color="rgba(0,168,150,0.1)"
        className="absolute"
        style={{ bottom: 100, left: -30 }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex items-baseline gap-6 mb-16">
          <span
            className="font-mono-label text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: '#FF6B35' }}
          >
            Capabilities
          </span>
          <h2
            className="font-display font-black"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#F5F0E4', lineHeight: 1 }}
          >
            Features
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="brutal-card p-7 group cursor-default"
              style={{ background: '#242424', borderColor: '#333' }}
            >
              {/* Tag */}
              <span
                className="font-mono-label text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 mb-5 inline-block"
                style={{ background: f.color, color: '#1A1A1A' }}
              >
                {f.tag}
              </span>
              <h3
                className="font-display font-bold text-xl mb-3"
                style={{ color: '#F5F0E4' }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,228,0.6)' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  return (
    <section
      id="showcase"
      className="py-28"
      style={{ background: '#F5F0E4' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-baseline gap-6 mb-4">
          <span
            className="font-mono-label text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: '#00A896' }}
          >
            Episodes
          </span>
          <h2
            className="font-display font-black"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#1A1A1A', lineHeight: 1 }}
          >
            Video Showcase
          </h2>
        </div>
        <p className="text-base mb-14 max-w-lg" style={{ color: '#666' }}>
          Each reel is scripted, animated, and exported automatically. These are real episodes from the live channel.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SHOWCASE.map((s, i) => (
            <div
              key={i}
              className="brutal-card group overflow-hidden cursor-pointer"
              style={{
                borderRadius: 16,
                aspectRatio: '9/16',
                position: 'relative',
                background: '#111',
              }}
            >
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ filter: 'brightness(0.7)' }}
              />
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)',
                }}
              />
              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span
                  className="font-mono-label text-[8px] font-bold px-1.5 py-0.5"
                  style={{ background: s.tagColor, color: '#1A1A1A' }}
                >
                  {s.tag}
                </span>
              </div>
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p
                  className="font-mono-label text-[8px] mb-1"
                  style={{ color: s.tagColor }}
                >
                  {s.episode}
                </p>
                <p
                  className="font-display font-bold text-white text-[11px] leading-tight mb-2"
                >
                  {s.title}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-white text-[9px]">▶</span>
                  <span
                    className="font-mono-label text-[8px]"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {s.views} views
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechStack() {
  return (
    <section
      id="tech"
      className="py-20"
      style={{ background: '#FFD23F', borderTop: '2.5px solid #1A1A1A', borderBottom: '2.5px solid #1A1A1A' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-baseline gap-6 mb-12">
          <span
            className="font-mono-label text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: 'rgba(26,26,26,0.6)' }}
          >
            Under the Hood
          </span>
          <h2
            className="font-display font-black text-4xl"
            style={{ color: '#1A1A1A', lineHeight: 1 }}
          >
            Tech Stack
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {TECH.map((t, i) => (
            <div
              key={i}
              className="brutal-border brutal-shadow flex items-center gap-2 px-4 py-2 bg-white font-mono-label text-sm font-medium cursor-default transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A]"
            >
              <span>{t.icon}</span>
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABanner() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: '#FF6B35' }}
    >
      {/* Memphis shapes */}
      <MemphisShape
        type="circle"
        size={240}
        color="rgba(255,255,255,0.12)"
        className="absolute animate-float-slow"
        style={{ top: -60, right: 60 }}
      />
      <MemphisShape
        type="square"
        size={100}
        color="rgba(255,255,255,0.1)"
        className="absolute animate-float-medium"
        style={{ bottom: -30, left: 120 }}
      />
      <MemphisShape
        type="zigzag"
        size={50}
        color="rgba(255,255,255,0.2)"
        className="absolute"
        style={{ top: 60, left: 60 }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <div
          className="font-mono-label text-xs font-bold uppercase tracking-[0.2em] mb-6 inline-block px-3 py-1 brutal-border"
          style={{ background: '#1A1A1A', color: '#FFD23F' }}
        >
          Open Source · MIT License
        </div>

        <h2
          className="font-display font-black mb-6"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: '#1A1A1A', lineHeight: 0.95 }}
        >
          Start Generating
          <br />
          <em style={{ color: '#fff', fontStyle: 'italic' }}>
            Your First Episode
          </em>
        </h2>

        <p
          className="text-lg mb-12 max-w-lg mx-auto"
          style={{ color: 'rgba(26,26,26,0.75)' }}
        >
          Clone the repo, configure your API keys, and have a full season of health reels ready to publish in hours.
        </p>

        {submitted ? (
          <div
            className="brutal-border brutal-shadow font-mono-label text-sm font-bold px-8 py-4 inline-block"
            style={{ background: '#1A1A1A', color: '#FFD23F' }}
          >
            ✓ You're on the list. Watch your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="brutal-border flex-1 px-4 py-3 font-mono-label text-sm outline-none focus:shadow-[4px_4px_0px_#1A1A1A]"
              style={{ background: '#fff', color: '#1A1A1A' }}
            />
            <button
              type="submit"
              className="brutal-border brutal-shadow font-mono-label text-sm font-bold uppercase tracking-wider px-6 py-3 transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A]"
              style={{ background: '#1A1A1A', color: '#FFD23F', whiteSpace: 'nowrap' }}
            >
              Get Early Access
            </button>
          </form>
        )}

        <div className="mt-8">
          <a
            href="https://github.com/0utLawzz/biominute-shorts-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-label text-xs font-bold uppercase tracking-wider underline"
            style={{ color: '#1A1A1A' }}
          >
            Or star it on GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      className="py-12"
      style={{ background: '#1A1A1A', borderTop: '2.5px solid #333' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="brutal-border"
                style={{
                  width: 32,
                  height: 32,
                  background: '#00A896',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="text-white font-bold text-xs">B</span>
              </div>
              <span
                className="font-display font-bold"
                style={{ color: '#F5F0E4' }}
              >
                BioMinute Shorts Studio
              </span>
            </div>
            <p
              className="font-mono-label text-xs"
              style={{ color: 'rgba(245,240,228,0.4)' }}
            >
              Automated health-science content at scale.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-mono-label text-xs uppercase tracking-wider transition-colors hover:text-white"
                style={{ color: 'rgba(245,240,228,0.5)' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/0utLawzz/biominute-shorts-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-label text-xs uppercase tracking-wider transition-colors hover:text-white"
              style={{ color: 'rgba(245,240,228,0.5)' }}
            >
              GitHub
            </a>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid #333' }}
        >
          <p
            className="font-mono-label text-xs"
            style={{ color: 'rgba(245,240,228,0.3)' }}
          >
            © 2026 BioMinute Shorts Studio. MIT License. Built by 0utLawzz.
          </p>
          <div className="flex gap-3 items-center">
            <span
              className="font-mono-label text-[10px] px-2 py-0.5"
              style={{ background: '#00A896', color: '#1A1A1A' }}
            >
              v7.0
            </span>
            <span
              className="font-mono-label text-[10px] px-2 py-0.5"
              style={{ background: '#FFD23F', color: '#1A1A1A' }}
            >
              Season 7
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Nav />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Features />
      <Showcase />
      <TechStack />
      <CTABanner />
      <Footer />
    </div>
  )
}
