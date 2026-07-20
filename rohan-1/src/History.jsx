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
    <div style={styles.page}>
      <div style={styles.wrap}>
        {onBackHome && (
          <button onClick={onBackHome} style={styles.backBtn}>
            ← Home
          </button>
        )}

        <p style={styles.eyebrow}>Since 1985</p>
        <h1 style={styles.h1}>Our History</h1>
        <p style={styles.intro}>
          What began as a handful of animators sharing one small studio has
          grown into a body of work spanning decades, each film built frame
          by frame with the same patience as the first.
        </p>

        {/* --- Timeline --- */}
        <div style={styles.timeline}>
          <div style={styles.timelineTrack} aria-hidden="true" />
          {milestones.map((m, i) => (
            <div
              key={m.year + i}
              style={{
                ...styles.timelineRow,
                flexDirection: i % 2 === 0 ? "row" : "row-reverse",
              }}
            >
              <div style={styles.timelineCard}>
                <span style={styles.timelineYear}>{m.year}</span>
                <h3 style={styles.timelineTitle}>{m.title}</h3>
                <p style={styles.timelineText}>{m.text}</p>
              </div>
              <div style={styles.timelineDot} aria-hidden="true" />
              <div style={styles.timelineSpacer} />
            </div>
          ))}
        </div>

        {/* --- Video --- */}
        <section style={styles.videoSection}>
          <p style={styles.eyebrow}>Watch</p>
          <h2 style={styles.h2}>The Story, In Motion</h2>
          <div style={styles.videoFrame}>
            <div style={styles.sprockets} aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} style={styles.sprocketHole} />
              ))}
            </div>
            <div style={styles.videoInner}>
              <iframe
                style={styles.iframe}
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Studio history video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div style={styles.sprockets} aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} style={styles.sprocketHole} />
              ))}
            </div>
          </div>
        </section>

        {/* --- Gallery --- */}
        <section style={styles.gallerySection}>
          <p style={styles.eyebrow}>Along the Way</p>
          <h2 style={styles.h2}>Moments From the Studio</h2>
          <div style={styles.galleryGrid}>
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
    <div style={styles.galleryTile}>
      {showPlaceholder ? (
        <div style={styles.galleryPlaceholder}>{alt}</div>
      ) : (
        <img
          src={src}
          alt={alt}
          style={styles.galleryImg}
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

const styles = {
  page: {
    background: "#FAF9F6",
    minHeight: "100vh",
    padding: "40px 24px 100px",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#1E1E1C",
  },
  wrap: { maxWidth: 760, margin: "0 auto" },
  backBtn: {
    all: "unset",
    cursor: "pointer",
    fontSize: 13,
    color: "#9A968C",
    marginBottom: 24,
    display: "inline-block",
  },
  eyebrow: {
    margin: "0 0 8px",
    fontSize: 12,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#6B8F71",
    fontWeight: 700,
  },
  h1: {
    margin: "0 0 20px",
    fontSize: 40,
    fontWeight: 600,
    color: "#1E1E1C",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  h2: {
    margin: "0 0 28px",
    fontSize: 28,
    fontWeight: 600,
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  intro: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "#57544C",
    maxWidth: 560,
    marginBottom: 56,
  },

  /* timeline */
  timeline: {
    position: "relative",
    marginBottom: 72,
    paddingTop: 8,
  },
  timelineTrack: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 2,
    background:
      "linear-gradient(180deg, #9fd4e8 0%, #6B8F71 50%, #2f6b5e 100%)",
    transform: "translateX(-50%)",
  },
  timelineRow: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginBottom: 40,
  },
  timelineCard: {
    flex: "0 1 46%",
    background: "#fff",
    border: "1px solid #E7E3D9",
    borderRadius: 10,
    padding: "18px 22px",
  },
  timelineYear: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "#6B8F71",
    marginBottom: 6,
  },
  timelineTitle: {
    margin: "0 0 8px",
    fontSize: 18,
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontWeight: 600,
  },
  timelineText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.6,
    color: "#57544C",
  },
  timelineDot: {
    position: "absolute",
    left: "50%",
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#6B8F71",
    border: "3px solid #FAF9F6",
    transform: "translateX(-50%)",
    boxShadow: "0 0 0 1px #6B8F71",
  },
  timelineSpacer: { flex: "0 1 46%" },

  /* video */
  videoSection: { marginBottom: 72 },
  videoFrame: {
    background: "#1E1E1C",
    borderRadius: 12,
    padding: "10px 0",
  },
  sprockets: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "0 16px",
  },
  sprocketHole: {
    width: 8,
    height: 8,
    borderRadius: 2,
    background: "#FAF9F6",
    opacity: 0.6,
    margin: "6px 0",
  },
  videoInner: {
    position: "relative",
    width: "100%",
    paddingTop: "56.25%",
    margin: "4px 0",
  },
  iframe: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: "none",
  },

  /* gallery */
  gallerySection: {},
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 16,
  },
  galleryTile: {
    aspectRatio: "4 / 3",
    borderRadius: 10,
    overflow: "hidden",
    background: "#F1EFE9",
    border: "1px solid #E7E3D9",
  },
  galleryImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  galleryPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 12,
    color: "#9A968C",
    padding: 12,
  },
};
