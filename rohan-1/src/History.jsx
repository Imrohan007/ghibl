import { useState } from "react";

/**
 * History
 *
 * Props:
 *   onBackHome   - called when the "Home" link is clicked
 *   youtubeId    - YouTube video ID to embed (defaults to a Ghibli trailer)
 *   milestones   - array of { year, title, text } shown as a timeline
 *   galleryImages- array of { src, alt } shown in the gallery grid
 *
 * Everything has sensible defaults, so you can drop this in as-is and
 * swap in your own milestones / video / images later.
 */
export default function History({
  onBackHome,
  youtubeId = "6uRMq2HKRRo",
  milestones = defaultMilestones,
  galleryImages = defaultGalleryImages,
}) {
  return (
    <div className="hist-page">
      <style>{css}</style>
      <div className="hist-wrap">
        {onBackHome && (
          <button onClick={onBackHome} className="hist-back-btn">
            ← Home
          </button>
        )}

        <p className="hist-eyebrow">Since 1985</p>
        <h1 className="hist-h1">Our History</h1>
        <p className="hist-intro">
          What began as a handful of animators sharing one small studio has
          grown into a body of work spanning decades, each film built frame
          by frame with the same patience as the first.
        </p>

        {/* --- Timeline --- */}
        <div className="hist-timeline">
          {milestones.map((m, i) => (
            <div key={m.year + i} className="hist-timeline-row">
              <div className="hist-timeline-rail" aria-hidden="true">
                <span className="hist-timeline-dot" />
                {i !== milestones.length - 1 && (
                  <span className="hist-timeline-line" />
                )}
              </div>
              <div className="hist-timeline-card">
                <span className="hist-timeline-year">{m.year}</span>
                <h3 className="hist-timeline-title">{m.title}</h3>
                <p className="hist-timeline-text">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Video --- */}
        <section className="hist-section">
          <p className="hist-eyebrow">Watch</p>
          <h2 className="hist-h2">The Story, In Motion</h2>
          <div className="hist-video-frame">
            <div className="hist-sprockets" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="hist-sprocket-hole" />
              ))}
            </div>
            <div className="hist-video-inner">
              <iframe
                className="hist-iframe"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Studio history video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="hist-sprockets" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="hist-sprocket-hole" />
              ))}
            </div>
          </div>
        </section>

        {/* --- Gallery --- */}
        <section className="hist-section">
          <p className="hist-eyebrow">Along the Way</p>
          <h2 className="hist-h2">Moments From the Studio</h2>
          <div className="hist-gallery-grid">
            {galleryImages.map((img, i) => (
              <GalleryTile key={i} src={img.src} alt={img.alt} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function GalleryTile({ src, alt }) {
  const [errored, setErrored] = useState(false);
  const showPlaceholder = !src || errored;

  return (
    <div className="hist-gallery-tile">
      {showPlaceholder ? (
        <div className="hist-gallery-placeholder">{alt}</div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="hist-gallery-img"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}

const defaultMilestones = [
  {
    year: "1985",
    title: "The Studio Is Founded",
    text: "A small group of animators set out to make films with no compromises on craft, however long each frame took to get right.",
  },
  {
    year: "1988",
    title: "A Neighbor Arrives",
    text: "A gentle story about two sisters and a forest spirit becomes the studio's quiet, enduring emblem.",
  },
  {
    year: "1997",
    title: "Scale Without Losing Heart",
    text: "A larger, more ambitious production proves the studio's hand-drawn style could carry epic, sweeping stories too.",
  },
  {
    year: "2001",
    title: "A Journey Through a Bathhouse",
    text: "A young girl's journey into a spirit world becomes one of the most celebrated animated films ever made.",
  },
  {
    year: "Today",
    title: "Still Frame by Frame",
    text: "New stories are still built the same patient way: by hand, one drawing at a time.",
  },
];

// Neutral stand-in photos (not Ghibli stills — those are copyrighted).
// Swap these src values for your own images whenever you're ready.
const defaultGalleryImages = [
  { src: "https://miro.medium.com/v2/resize:fit:1000/1*-izR-3ntzkONn8s-PJ4-PQ.jpeg", alt: "Studio workspace" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiz9socSSPQl5Rs23D30HYNq3Ps5U0Hk1Csm1qFYu2PQ&s=10", alt: "Forest reference walk" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkXvd-mS2e7nazPdpmAipBXzKxNYdD5W_MCwZJrNHG94FhgjDG7CUql98&s=10", alt: "The team at work" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROPZgV6JI2U6fJINCniaP1C3-vkkyTREGKAvxgoOpN7U8KhO8Y15whWEk&s=10", alt: "Storyboard sketches" },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Jost:wght@400;500&display=swap');

.hist-page {
  font-family: 'Jost', Arial, sans-serif;
  background: #FFFFFF;
  color: #1F1F1F;
  min-height: 100vh;
  padding: 40px 24px 100px;
}

.hist-wrap { max-width: 760px; margin: 0 auto; }

.hist-back-btn {
  all: unset;
  cursor: pointer;
  font-size: 13px;
  color: #8A8A8A;
  margin-bottom: 24px;
  display: inline-block;
  font-family: 'Jost', Arial, sans-serif;
}
.hist-back-btn:hover { color: #1F1F1F; }

.hist-eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8A8A8A;
  font-weight: 500;
}

.hist-h1 {
  margin: 0 0 20px;
  font-size: clamp(2.2rem, 5vw, 2.8rem);
  font-weight: 600;
  color: #141414;
  font-family: 'Cormorant Garamond', Georgia, serif;
  letter-spacing: 0.01em;
}

.hist-h2 {
  margin: 0 0 28px;
  font-size: 1.9rem;
  font-weight: 600;
  color: #141414;
  font-family: 'Cormorant Garamond', Georgia, serif;
}

.hist-intro {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: 18px;
  line-height: 1.7;
  color: #5C5C5C;
  max-width: 560px;
  margin: 0 0 64px;
}

.hist-section { margin-bottom: 72px; }

/* --- Timeline: single left rail, dots align to their own card automatically --- */
.hist-timeline { margin-bottom: 72px; }

.hist-timeline-row {
  display: flex;
  align-items: stretch;
  gap: 24px;
}

.hist-timeline-rail {
  flex: 0 0 auto;
  width: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hist-timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #1F1F1F;
  box-shadow: 0 0 0 4px rgba(31,31,31,0.08);
  flex: 0 0 auto;
  margin-top: 8px;
}

.hist-timeline-line {
  width: 2px;
  flex: 1 1 auto;
  min-height: 24px;
  margin-top: 4px;
  background: linear-gradient(180deg, #D9D9D9, #EFEFEF);
}

.hist-timeline-card {
  flex: 1 1 auto;
  padding-bottom: 40px;
}

.hist-timeline-row:last-child .hist-timeline-card { padding-bottom: 0; }

.hist-timeline-year {
  display: inline-block;
  font-family: 'Jost', Arial, sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8A8A8A;
  margin-bottom: 8px;
}

.hist-timeline-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #141414;
  font-family: 'Cormorant Garamond', Georgia, serif;
}

.hist-timeline-text {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.7;
  color: #5C5C5C;
  max-width: 480px;
}

/* --- Video --- */
.hist-video-frame {
  background: #141414;
  border-radius: 10px;
  padding: 10px 0;
}

.hist-sprockets {
  display: flex;
  justify-content: space-evenly;
  padding: 0 16px;
}

.hist-sprocket-hole {
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: #FFFFFF;
  opacity: 0.55;
  margin: 6px 0;
}

.hist-video-inner {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  margin: 4px 0;
}

.hist-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* --- Gallery --- */
.hist-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.hist-gallery-tile {
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  overflow: hidden;
  background: #F5F5F5;
  border: 1px solid #E9E9E9;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.hist-gallery-tile:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(20,20,20,0.1);
}

.hist-gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hist-gallery-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  color: #8A8A8A;
  padding: 12px;
  font-family: 'Jost', Arial, sans-serif;
}

/* --- Responsive --- */
@media (max-width: 520px) {
  .hist-timeline-row { gap: 16px; }
  .hist-timeline-text { max-width: 100%; }
}
`;
