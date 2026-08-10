import { useEffect, useMemo, useState } from "react";

// Put these image files next to this component (e.g. in the same
// folder or in /public), or swap in your own paths/URLs.
// Defining this array OUTSIDE the component is important: it keeps
// the same array reference across renders. If you instead build the
// array inline inside JSX (e.g. heroImages={["a.jpg","b.jpg"]}), a
// new array is created on every re-render, which resets the
// rotation timer and makes the image look "stuck".
const DEFAULT_HERO_IMAGES = ["wallpaperflare.com_wallpaper (4).jpg", "wallpaperflare.com_wallpaper (2).jpg", "wallpaperflare.com_wallpaper (3).jpg","wallpaperflare.com_wallpaper (1).jpg",
  "wallpaperflare.com_wallpaper (6).jpg","wallpaperflare.com_wallpaper (7).jpg","wallpaperflare.com_wallpaper (8).jpg"
  ,"wallpaperflare.com_wallpaper (9).jpg","1198793-3054x1666-desktop-hd-studio-ghibli-wallpaper.jpg"
];

// Optional: give each hero image its own movie title so the big
// centered title (and the "Directed By" / "Released In" corners, if
// you pass matching arrays) updates automatically as the slideshow
// advances. Order must match heroImages. If omitted, or shorter than
// the number of slides, the single fallback props below are used for
// any slide that doesn't have an entry.
const DEFAULT_SLIDE_TITLES = [
  "Porco Rosso",
  "My Neighbor Totoro",
  "Spirited Away",
  "The Secret World of Arrietty",
  "Castle in the Sky",
  "Howl's Moving Castle",
  "Princess Mononoke",
  "The Wind Rises",
  "Kiki's Delivery Service",
];

const DEFAULT_SLIDE_DIRECTORS = [
  "Hayao Miyazaki",
  "Hayao Miyazaki",
  "Hayao Miyazaki",
  "Hiromasa Yonebayashi",
  "Hayao Miyazaki",
  "Hayao Miyazaki",
  "Hayao Miyazaki",
  "Hayao Miyazaki",
  "Hayao Miyazaki",
];

const DEFAULT_SLIDE_YEARS = [
  "1992",
  "1988",
  "2001",
  "2010",
  "1986",
  "2004",
  "1997",
  "2013",
  "1989",
];

/**
 * HeroSection
 *
 * Same rotation/props logic as before — image slideshow, kenburns pan,
 * crossfade, reduced-motion support — just re-laid-out so the overlay
 * reads like a film-studio splash: a slim nav bar across the top of
 * the image, a small eyebrow line, a large centered film title, and
 * "Directed By" / "Released In" credits anchored to the bottom corners.
 *
 *   heroImageSrc     - url/path for a single hero background image
 *   heroImages       - optional array of urls/paths; if given (2+), the
 *                       hero crossfades through them automatically
 *   heroRotateMs     - milliseconds between slides (default 9000)
 *   heroImageAlt     - alt text for the hero image
 *   eyebrow          - small caps line above the big title (e.g. "The World Within")
 *   filmTitle        - fallback big title used when a slide has no
 *                       matching entry in slideTitles (or when there's
 *                       only one slide)
 *   slideTitles      - array of film titles matched by index to heroImages
 *   director         - fallback "Directed By" name
 *   slideDirectors   - array of director names matched by index to heroImages
 *   releaseYear      - fallback "Released In" year
 *   slideYears       - array of release years matched by index to heroImages
 *   brandName        - top-left studio name (e.g. "Studio Ghibli")
 *   brandSubtitle    - top-left small subtitle under the brand name
 *   navLinks         - array of { label, href, onClick } shown centered in the top bar
 *   onSearch         - called when the search icon (top-right) is clicked
 *
 * If no images are given at all, painterly placeholders render instead
 * so the layout still looks complete.
 */
export default function HeroSection({
  heroImageSrc,
  heroImages = DEFAULT_HERO_IMAGES,
  heroRotateMs = 9000,
  heroImageAlt = "Studio Ghibli inspired scenes",
  eyebrow = "The World Within",
  filmTitle = "Nausicaä of the Valley of the Wind",
  slideTitles = DEFAULT_SLIDE_TITLES,
  director = "Hayao Miyazaki",
  slideDirectors = DEFAULT_SLIDE_DIRECTORS,
  releaseYear = "1984",
  slideYears = DEFAULT_SLIDE_YEARS,
  brandName = "Studio Ghibli",
  brandSubtitle = "スタジオジブリ作品",
  navLinks,
  onSearch,
}) {
  const slides = useMemo(() => {
    if (Array.isArray(heroImages) && heroImages.length > 0) return heroImages;
    return heroImageSrc ? [heroImageSrc] : [];
  }, [heroImages, heroImageSrc]);

  const [activeSlide, setActiveSlide] = useState(0);

  // Title / director / year all follow whichever slide is currently
  // showing. If a slide doesn't have a matching entry in the arrays,
  // fall back to the single props so nothing breaks.
  const currentFilmTitle =
    (Array.isArray(slideTitles) && slideTitles[activeSlide]) || filmTitle;
  const currentDirector =
    (Array.isArray(slideDirectors) && slideDirectors[activeSlide]) || director;
  const currentYear =
    (Array.isArray(slideYears) && slideYears[activeSlide]) || releaseYear;

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

  const links =
    navLinks && navLinks.length
      ? navLinks
      : [
          { label: "Exhibitions", href: "#exhibitions" },
          { label: "Films", href: "#films" },
          { label: "About", href: "#about" },
          { label: "Studio Goods", href: "#goods" },
        ];

  return (
    <div style={styles.page}>
      <style>{css}</style>

      <section className="hs-hero" style={styles.hero}>
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

        {/* legibility veils: darken top for the nav, darken bottom for the credits */}
        <div className="hs-hero-veil-top" aria-hidden="true" />
        <div className="hs-hero-veil-bottom" aria-hidden="true" />

        {/* top bar: brand mark, nav links, search */}
        <div className="hs-topbar hs-rise">
          <div className="hs-brand">
            <span className="hs-brand-sub">{brandSubtitle}</span>
            <span className="hs-brand-name">{brandName}</span>
          </div>

          <nav className="hs-nav" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href || link.label}
                href={link.href || "#"}
                className="hs-nav-link"
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

          <button
            type="button"
            className="hs-search"
            aria-label="Search"
            onClick={onSearch}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* center: eyebrow + big film title */}
        <div className="hs-center">
          <div className="hs-eyebrow hs-rise">{eyebrow}</div>
          <h1 key={currentFilmTitle} className="hs-title hs-title-fade">
            {currentFilmTitle}
          </h1>
        </div>

        {/* bottom corners: director / release year */}
        <div className="hs-credit hs-credit-left hs-rise">
          <span className="hs-credit-label">Directed By</span>
          <span className="hs-credit-value">{currentDirector}</span>
        </div>
        <div className="hs-credit hs-credit-right hs-rise">
          <span className="hs-credit-label">Released In</span>
          <span className="hs-credit-value">{currentYear}</span>
        </div>
      </section>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Jost:wght@400;500&display=swap');

/* Reset default browser/body margin so the hero is truly edge-to-edge.
   Without this, the 8px default body margin leaves a visible gap
   around the section even though it's set to width: 100%. */
html, body, #root {
  margin: 0;
  padding: 0;
  width: 100%;
}

.hs-hero-veil-top {
  position: absolute;
  inset: 0 0 auto 0;
  height: 22%;
  background: linear-gradient(180deg, rgba(0,0,0,0.35), transparent);
  pointer-events: none;
  z-index: 2;
}
.hs-hero-veil-bottom {
  position: absolute;
  inset: auto 0 0 0;
  height: 26%;
  background: linear-gradient(0deg, rgba(0,0,0,0.4), transparent);
  pointer-events: none;
  z-index: 2;
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
  transition: opacity 1.4s ease-in-out;
  animation: hs-kenburns 26s ease-in-out infinite alternate;
}
.hs-hero-img.hs-slide-active {
  opacity: 1;
  z-index: 1;
}

.hs-topbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 22px 36px;
  color: #fff;
  font-family: 'Jost', Arial, sans-serif;
}
.hs-brand {
  display: flex;
  flex-direction: column;
  line-height: 1.35;
}
.hs-brand-sub {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  opacity: 0.85;
}
.hs-brand-name {
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
}
.hs-nav {
  display: flex;
  gap: 34px;
  flex-wrap: wrap;
  justify-content: center;
}
.hs-nav-link {
  position: relative;
  color: #fff;
  text-decoration: none;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding-bottom: 4px;
  opacity: 0.92;
}
.hs-nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 1px;
  background: currentColor;
  transition: width 0.35s ease;
}
.hs-nav-link:hover { opacity: 1; }
.hs-nav-link:hover::after { width: 100%; }
.hs-search {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  opacity: 0.92;
}
.hs-search:hover { opacity: 1; }

.hs-center {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;
  pointer-events: none;
}
.hs-eyebrow {
  font-family: 'Jost', Arial, sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #fff;
  opacity: 0.9;
  margin-bottom: 14px;
}
.hs-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 500;
  font-size: clamp(2.2rem, 6vw, 4.6rem);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 4px 24px rgba(0,0,0,0.35);
  margin: 0;
  max-width: 16ch;
  animation: hs-title-fade-in 0.9s ease-in-out;
}
@keyframes hs-title-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hs-credit {
  position: absolute;
  bottom: 26px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  font-family: 'Jost', Arial, sans-serif;
  color: #fff;
  line-height: 1.45;
}
.hs-credit-left { left: 36px; align-items: flex-start; text-align: left; }
.hs-credit-right { right: 36px; align-items: flex-end; text-align: right; }
.hs-credit-label {
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  opacity: 0.8;
}
.hs-credit-value {
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  font-weight: 500;
}

@media (max-width: 640px) {
  .hs-topbar {
    flex-wrap: wrap;
    padding: 14px 16px;
    gap: 10px;
    row-gap: 10px;
  }
  .hs-brand { order: 1; }
  .hs-search { order: 2; }
  .hs-nav {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 16px 20px;
  }
  .hs-nav-link { font-size: 0.68rem; letter-spacing: 0.06em; }
  .hs-brand-name { font-size: 0.7rem; }
  .hs-credit { bottom: 16px; }
  .hs-credit-left { left: 18px; }
  .hs-credit-right { right: 18px; }
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

.hs-rise {
  opacity: 0;
  animation: hs-rise-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.hs-eyebrow.hs-rise { animation-delay: 0.1s; }
.hs-credit-left.hs-rise { animation-delay: 0.2s; }
.hs-credit-right.hs-rise { animation-delay: 0.2s; }

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
@keyframes hs-rise-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes hs-fly {
  0%   { transform: translateX(0) translateY(0); }
  50%  { transform: translateX(180%) translateY(-14px); }
  100% { transform: translateX(360%) translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .hs-hero-img { animation: none !important; transition: none !important; }
  .hs-cloud, .hs-sun, .hs-rise, .hs-bird, .hs-title {
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
    height: "100vh",
    minHeight: "520px",
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
};
