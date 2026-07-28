import { useEffect, useMemo, useState } from "react";

// Put these image files next to this component (e.g. in the same
// folder or in /public), or swap in your own paths/URLs.
// Defining this array OUTSIDE the component is important: it keeps
// the same array reference across renders. If you instead build the
// array inline inside JSX (e.g. heroImages={["a.jpg","b.jpg"]}), a
// new array is created on every re-render, which resets the
// rotation timer and makes the image look "stuck".
const DEFAULT_HERO_IMAGES = ["wallpaperflare.com_wallpaper (4).jpg", "wallpaperflare.com_wallpaper (1).jpg", "wallpaperflare.com_wallpaper (3).jpg"
  ,"1198793-3054x1666-desktop-hd-studio-ghibli-wallpaper.jpg"
];

/**
 * HeroSection
 *
 * Props let you pass real images in without touching the component:
 *   heroImageSrc     - url/path for a single hero background image
 *   heroImages       - optional array of urls/paths; if given (2+), the
 *                       hero crossfades through them automatically
 *   heroRotateMs     - milliseconds between slides (default 2000 = 2s)
 *   heroImageAlt     - alt text for the hero image
 *   logoSrc          - url/path for the logo image
 *   logoAlt          - alt text for the logo
 *   title            - main heading text
 *   byline           - subheading / credit line
 *   onExploreFilms   - called when the "Explore Films" link is clicked
 *   onOurHistory     - called when the "Our History" link is clicked
 *   onAboutStudio    - called when the "About Studio" link is clicked
 *
 * If no images are given at all, painterly placeholders render instead
 * so the layout still looks complete.
 *
 * Motion is restrained and respects prefers-reduced-motion: a slow cloud
 * drift and sun glow in the sky, a soft staggered entrance for the content,
 * a gentle logo float, an underline that draws in on nav hover, and (when
 * heroImages has more than one entry) a slow crossfade between photos.
 */
export default function HeroSection({
  heroImageSrc,
  heroImages = DEFAULT_HERO_IMAGES,
  heroRotateMs = 9000,
  heroImageAlt = "Studio Ghibli inspired scenes",
  logoSrc = "kindpng_834491.png",
  logoAlt = "Logo",
  title = "The World Within",
  byline = "Made by Hayao Miyazaki",
  cornerBadgeLogoSrc = "kindpng_834491.png",
  cornerBadgeAlt = "Studio logo",
  cornerBadgeName = "Studio Ghibli",
  cornerBadgeSubtitle = "スタジオジブリ作品",
  filmTitle = "Scene from the ghibli studio films",
  onExploreFilms,
  onOurHistory,
  onAboutStudio,
}) {
  const slides = useMemo(() => {
    if (Array.isArray(heroImages) && heroImages.length > 0) return heroImages;
    return heroImageSrc ? [heroImageSrc] : [];
  }, [heroImages, heroImageSrc]);

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(0);
    if (slides.length < 2) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      setActiveSlide((i) => (i + 1) % slides.length);
    }, heroRotateMs);
    return () => clearInterval(id);
  }, [slides, heroRotateMs]);

  const links = [
    { label: "About Studio", href: "#about", onClick: onAboutStudio },
    { label: "Explore Films", href: "#films", onClick: onExploreFilms },
    { label: "Our History", href: "#history", onClick: onOurHistory },
  ];

  return (
    <div style={styles.page}>
      <style>{css}</style>

      <section className="hs-hero" style={styles.hero}>
        {filmTitle ? (
          <div className="hs-film-badge hs-rise">{filmTitle}</div>
        ) : null}
        {slides.length > 0 ? (
          <div className="hs-hero-slides" aria-live="off">
            {slides.map((src, i) => (
              <img
                key={`${src}-${i}`}
                className={
                  "hs-hero-img" + (i === activeSlide ? " hs-slide-active" : "")
                }
                src={src}
                alt={i === activeSlide ? heroImageAlt : ""}
                aria-hidden={i === activeSlide ? undefined : true}
                style={styles.heroImg}
              />
            ))}
          </div>
        ) : (
          <div style={styles.heroPlaceholder} aria-hidden="true">
            <span className="hs-sun" />
            <span className="hs-cloud hs-cloud-a" />
            <span className="hs-cloud hs-cloud-b" />
            <span className="hs-cloud hs-cloud-c" />
            <span className="hs-bird hs-bird-a" />
            <span className="hs-bird hs-bird-b" />
            <span className="hs-bird hs-bird-c" />
            <span className="hs-mountain hs-mountain-far" />
            <span className="hs-mountain hs-mountain-near" />
            <span className="hs-treeline" />
            <span className="hs-grain" />
          </div>
        )}
        <div className="hs-hero-veil" aria-hidden="true" />

        {cornerBadgeName || cornerBadgeLogoSrc ? (
          <div className="hs-corner-badge hs-rise">
            {cornerBadgeLogoSrc && (
              <img
                className="hs-corner-badge-logo"
                src={cornerBadgeLogoSrc}
                alt={cornerBadgeAlt}
              />
            )}
            <div className="hs-corner-badge-text">
              {cornerBadgeName && (
                <span className="hs-corner-badge-name">{cornerBadgeName}</span>
              )}
              {cornerBadgeSubtitle && (
                <span className="hs-corner-badge-subtitle">
                  {cornerBadgeSubtitle}
                </span>
              )}
            </div>
          </div>
        ) : null}
      </section>

      <div style={styles.content}>
        <h1 className="hs-title hs-rise" style={styles.title}>
          {title}
        </h1>
        <p className="hs-byline hs-rise" style={styles.byline}>
          {byline}
        </p>

        <div className="hs-divider hs-rise" aria-hidden="true">
          <span className="hs-divider-line" />
          <span className="hs-divider-mark" />
          <span className="hs-divider-line" />
        </div>

        <nav className="hs-nav hs-rise" style={{ ...styles.nav, borderTop: "none", paddingTop: 0 }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hs-nav-link"
              style={styles.navLink}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Jost:wght@400;500&display=swap');

.hs-film-badge {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: rgba(255, 255, 255, 0.92);
  color: #1a1a1a;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 12px 24px;
}
@media (max-width: 520px) {
  .hs-film-badge { font-size: 0.85rem; padding: 8px 16px; }
}

.hs-corner-badge {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 22px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(2px);
  box-shadow: -2px -2px 14px rgba(0,0,0,0.08);
}
.hs-corner-badge-logo {
  width: 88px;
  height: 88px;
  object-fit: contain;
  flex-shrink: 0;
}
.hs-corner-badge-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  text-align: left;
}
.hs-corner-badge-name {
  font-family: 'Jost', Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #2a2a2a;
  letter-spacing: 0.01em;
}
.hs-corner-badge-subtitle {
  font-family: 'Jost', Arial, sans-serif;
  font-size: 0.75rem;
  color: #6b6b6b;
}
@media (max-width: 520px) {
  .hs-corner-badge { padding: 10px 14px; gap: 10px; }
  .hs-corner-badge-logo { width: 64px; height: 64px; }
  .hs-corner-badge-name { font-size: 0.8rem; }
  .hs-corner-badge-subtitle { font-size: 0.65rem; }
}

.hs-hero-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(250,248,244,0) 60%, #faf8f4 100%);
  pointer-events: none;
}

.hs-hero-slides {
  position: absolute;
  inset: 0;
}

.hs-hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 3s ease-in-out;
  animation: hs-kenburns 26s ease-in-out infinite alternate;
}
.hs-hero-img.hs-slide-active {
  opacity: 1;
  z-index: 1;
}

.hs-cloud {
  position: absolute;
  border-radius: 999px;
  background: rgba(255,255,255,0.55);
  filter: blur(6px);
}
.hs-cloud-a { width: 180px; height: 46px; top: 18%; left: -20%; animation: hs-drift 34s linear infinite; }
.hs-cloud-b { width: 130px; height: 34px; top: 32%; left: -15%; animation: hs-drift 46s linear infinite; animation-delay: -12s; opacity: 0.8; }
.hs-cloud-c { width: 220px; height: 52px; top: 10%; left: -25%; animation: hs-drift 58s linear infinite; animation-delay: -30s; opacity: 0.65; }

.hs-sun {
  position: absolute;
  top: 14%;
  right: 14%;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,244,214,0.95) 0%, rgba(255,224,150,0.5) 55%, transparent 75%);
  animation: hs-glow 6s ease-in-out infinite;
}

.hs-mountain {
  position: absolute;
  bottom: 0;
  left: -5%;
  width: 110%;
  height: 46%;
}
.hs-mountain-far {
  background: #2c5a50;
  opacity: 0.55;
  clip-path: polygon(0% 100%, 0% 55%, 12% 40%, 24% 58%, 38% 32%, 52% 52%, 66% 28%, 80% 50%, 92% 38%, 100% 60%, 100% 100%);
}
.hs-mountain-near {
  bottom: -2%;
  height: 34%;
  background: #1c3f37;
  opacity: 0.85;
  clip-path: polygon(0% 100%, 0% 70%, 10% 48%, 22% 68%, 34% 42%, 48% 66%, 60% 38%, 74% 62%, 88% 46%, 100% 70%, 100% 100%);
}
.hs-treeline {
  position: absolute;
  bottom: -1%;
  left: -5%;
  width: 110%;
  height: 8%;
  background: #16332b;
  -webkit-mask-image: radial-gradient(circle at 4% 100%, #000 55%, transparent 56%),
    radial-gradient(circle at 11% 100%, #000 60%, transparent 61%),
    radial-gradient(circle at 18% 100%, #000 50%, transparent 51%),
    radial-gradient(circle at 25% 100%, #000 62%, transparent 63%),
    radial-gradient(circle at 32% 100%, #000 52%, transparent 53%),
    radial-gradient(circle at 39% 100%, #000 58%, transparent 59%),
    radial-gradient(circle at 46% 100%, #000 50%, transparent 51%),
    radial-gradient(circle at 53% 100%, #000 60%, transparent 61%),
    radial-gradient(circle at 60% 100%, #000 52%, transparent 53%),
    radial-gradient(circle at 67% 100%, #000 58%, transparent 59%),
    radial-gradient(circle at 74% 100%, #000 50%, transparent 51%),
    radial-gradient(circle at 81% 100%, #000 60%, transparent 61%),
    radial-gradient(circle at 88% 100%, #000 52%, transparent 53%),
    radial-gradient(circle at 95% 100%, #000 58%, transparent 59%);
  mask-image: radial-gradient(circle at 4% 100%, #000 55%, transparent 56%),
    radial-gradient(circle at 11% 100%, #000 60%, transparent 61%),
    radial-gradient(circle at 18% 100%, #000 50%, transparent 51%),
    radial-gradient(circle at 25% 100%, #000 62%, transparent 63%),
    radial-gradient(circle at 32% 100%, #000 52%, transparent 53%),
    radial-gradient(circle at 39% 100%, #000 58%, transparent 59%),
    radial-gradient(circle at 46% 100%, #000 50%, transparent 51%),
    radial-gradient(circle at 53% 100%, #000 60%, transparent 61%),
    radial-gradient(circle at 60% 100%, #000 52%, transparent 53%),
    radial-gradient(circle at 67% 100%, #000 58%, transparent 59%),
    radial-gradient(circle at 74% 100%, #000 50%, transparent 51%),
    radial-gradient(circle at 81% 100%, #000 60%, transparent 61%),
    radial-gradient(circle at 88% 100%, #000 52%, transparent 53%),
    radial-gradient(circle at 95% 100%, #000 58%, transparent 59%);
}

.hs-bird {
  position: absolute;
  width: 16px;
  height: 8px;
  opacity: 0.75;
}
.hs-bird::before, .hs-bird::after {
  content: "";
  position: absolute;
  top: 0;
  width: 9px;
  height: 9px;
  border-left: 2px solid #1f4a41;
  border-radius: 50% 0 0 0;
}
.hs-bird::before { left: 0; transform: rotate(45deg); }
.hs-bird::after { right: 0; transform: rotate(-45deg) scaleX(-1); border-left: 2px solid #1f4a41; }
.hs-bird-a { top: 24%; left: -8%; animation: hs-fly 26s linear infinite; }
.hs-bird-b { top: 30%; left: -8%; animation: hs-fly 26s linear infinite; animation-delay: 1.4s; transform: scale(0.8); }
.hs-bird-c { top: 20%; left: -8%; animation: hs-fly 33s linear infinite; animation-delay: 9s; transform: scale(0.65); }

.hs-grain {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.hs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 28px;
}
.hs-divider-line {
  height: 1px;
  width: 64px;
  background: linear-gradient(90deg, transparent, #b9c3ba);
}
.hs-divider-line:first-of-type { background: linear-gradient(90deg, transparent, #b9c3ba); }
.hs-divider-line:last-of-type { background: linear-gradient(270deg, transparent, #b9c3ba); }
.hs-divider-mark {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #d4a657;
  box-shadow: 0 0 0 4px rgba(212,166,87,0.18);
}

.hs-logo { animation: hs-float 6s ease-in-out infinite; }

.hs-rise {
  opacity: 0;
  animation: hs-rise-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.hs-logo.hs-rise { animation: hs-rise-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards, hs-float 6s ease-in-out 0.9s infinite; }
.hs-title.hs-rise { animation-delay: 0.12s; }
.hs-byline.hs-rise { animation-delay: 0.24s; }
.hs-nav.hs-rise { animation-delay: 0.36s; }

.hs-nav-link {
  position: relative;
  padding-bottom: 4px;
}
.hs-nav-link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0%;
  height: 1px;
  background: currentColor;
  transition: width 0.3s ease, left 0.3s ease;
}
.hs-nav-link:hover { color: #17356f; }
.hs-nav-link:hover::after { width: 100%; left: 0%; }

@keyframes hs-drift {
  from { transform: translateX(0); }
  to   { transform: translateX(260%); }
}
@keyframes hs-glow {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50%      { transform: scale(1.08); opacity: 1; }
}
@keyframes hs-kenburns {
  from { transform: scale(1); }
  to   { transform: scale(1.07); }
}
@keyframes hs-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
@keyframes hs-rise-in {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes hs-fly {
  0%   { transform: translateX(0) translateY(0); }
  50%  { transform: translateX(180%) translateY(-14px); }
  100% { transform: translateX(360%) translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .hs-hero-img { animation: none !important; transition: none !important; }
  .hs-cloud, .hs-sun, .hs-logo, .hs-rise, .hs-bird {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;

const styles = {
  page: {
    fontFamily: "'Jost', Arial, sans-serif",
    background: "#faf8f4",
    color: "#223027",
  },
  hero: {
    position: "relative",
    width: "100%",
    height: "80vh",
    minHeight: "520px",
    maxHeight: "780px",
    overflow: "hidden",
    background:
      "linear-gradient(180deg, #7EC8E3 0%, #BFE7D6 40%, #2F6B5E 72%, #1F4A41 100%)",
  },
  heroImg: {
    display: "block",
  },
  heroPlaceholder: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
  },
  content: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 24px 60px",
    textAlign: "center",
    position: "relative",
  },
  logo: {
    maxWidth: "190px",
    height: "auto",
    margin: "0 auto 32px",
    display: "block",
    filter: "drop-shadow(0 8px 18px rgba(31,74,65,0.18))",
  },
  logoPlaceholder: {
    width: "400px",
    height: "400px",
    margin: "0 auto 32px",
    borderRadius: "50%",
    background: "#f1efe9",
    border: "2px solid #2a2a2a",
    display: "flex",
    alignItems: "center",

    justifyContent: "center",
    fontSize: "0.75rem",
    letterSpacing: "0.05em",
    color: "#444",
    textAlign: "center",
    lineHeight: 1.4,
    padding: "12px",
    whiteSpace: "pre-line",
  },
  title: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(2.8rem, 6.5vw, 4.8rem)",
    fontWeight: 600,
    letterSpacing: "0.01em",
    color: "#1a2b23",
    marginBottom: "16px",
    lineHeight: 1.08,
  },
  byline: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
    color: "#4c5b52",
    fontStyle: "italic",
    marginBottom: "32px",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "28px",
    paddingTop: "16px",
    borderTop: "1px solid #ddd",
  },
  navLink: {
    color: "#2a5db0",
    textDecoration: "none",
    fontSize: "0.95rem",
    letterSpacing: "0.02em",
    fontFamily: "'Jost', Arial, sans-serif",
    cursor: "pointer",
  },
};
