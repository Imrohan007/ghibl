/**
 * About
 *
 * Props:
 *   onBackHome    - called when the "Home" link is clicked
 *   galleryImages - array of { src, alt } shown as thumbnails up top
 *   photoSrc      - the large photo next to the text block
 *   photoAlt      - alt text for that photo
 */
export default function About({
  onBackHome,
  galleryImages = defaultGalleryImages,
  photoSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe5x75FCyt7nHKDxlVpbE72Y0kdbm8noMjfAIUJ-52tJ8r9dOdDDJprA_S&s=10",
  photoAlt = "Studio photo",
}) {
  return (
    <div style={styles.page}>
      <style>{fontImport}</style>

      {onBackHome && (
        <div style={styles.backRow}>
          <button onClick={onBackHome} style={styles.backBtn}>
            ← Home
          </button>
        </div>
      )}

      {/* --- Thumbnail strip --- */}
      <div style={styles.thumbRow}>
        {galleryImages.map((img, i) => (
          <Thumb key={i} src={img.src} alt={img.alt} />
        ))}
      </div>

      {/* --- Photo + text --- */}
      <div style={styles.mainRow}>
        <div style={styles.photoCol}>
          {photoSrc ? (
            <img src={photoSrc} alt={photoAlt} style={styles.photo} />
          ) : (
            <div style={styles.photoPlaceholder} aria-hidden="true">
              Photo
            </div>
          )}
        </div>

        <div style={styles.textCol}>
          <span style={styles.eyebrow}>Mitaka, Tokyo</span>
          <h1 style={styles.h1}>About Studio Ghibli</h1>

          <p style={styles.disclaimer}>
            This page exists to share background on Studio Ghibli's work.
            All art, footage, and characters remain the property of Studio
            Ghibli and their respective rights holders.
          </p>

          <p style={styles.p}>
            Studio Ghibli is a Japanese animation studio based in Koganei,
            Tokyo. It's best known for hand-drawn feature films, alongside a
            number of short films, TV commercials, and one television series.
            The studio was established in 1985, shortly after the release of
            Nausicaä of the Valley of the Wind, with backing from publisher
            Tokuma Shoten.
          </p>

          <p style={styles.p}>
            Several of the studio's films rank among the highest-grossing
            anime releases ever made in Japan, and Spirited Away remains one
            of the biggest earners worldwide. Studio Ghibli films have picked
            up multiple Japan Academy Prizes for Animation of the Year, and
            have been recognized internationally too — including an Academy
            Award win for Best Animated Feature. My Neighbor Totoro, one of
            the studio's earliest hits, gave the studio its now-familiar
            mascot.
          </p>

          <p style={styles.p}>
            In 2014, the studio announced a pause in feature production
            following the retirement of co-founder and director Hayao
            Miyazaki, who had led the studio alongside Isao Takahata since
            its founding.
          </p>
        </div>
      </div>

      {/* --- Signature divider: a small scatter, quiet nod to soot on a
           windowsill, not a character reproduction --- */}
      <Divider />

      {/* --- Footer: just the studio name and an original mark. The real
           Ghibli logo features Totoro and is copyrighted, so this is an
           original wordmark rather than a reproduction of it. --- */}
      <div style={styles.footer}>
       <img src="studio-ghibli-logo-uhd-4k-wallpaper.jpg" style={{ height: 158, width:200  , }} />
      </div>
    </div>
  );
}

function Thumb({ src, alt }) {
  return src ? (
    <img src={src} alt={alt} style={styles.thumbImg} />
  ) : (
    <div style={styles.thumbPlaceholder} aria-hidden="true" />
  );
}

function Divider() {
  // A quiet scatter of soot-toned dots — a small, restrained nod to the
  // studio's world rather than a reproduction of any character.
  const dots = [
    { r: 5, x: 40 },
    { r: 3, x: 80 },
    { r: 6, x: 130 },
    { r: 2.5, x: 175 },
    { r: 4, x: 230 },
  ];
  return (
    <div style={styles.dividerWrap} aria-hidden="true">
      <svg width="270" height="18" viewBox="0 0 270 18">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={9} r={d.r} fill="#2F4A3A" opacity={0.55} />
        ))}
      </svg>
    </div>
  );
}

function LeafMark() {
  // A small original mark — a single leaf, not any part of the real
  // Ghibli logo (which centers on Totoro and is copyrighted).
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20c8-1 13-6 15-15-9 1-14 6-15 15z"
        fill="#2F4A3A"
      />
      <path d="M6 18c4-4 7-8 12-13" stroke="#F6F1E4" strokeWidth="1" />
    </svg>
  );
}

// Neutral stand-ins — swap for your own images. Real Ghibli photos/art
// are copyrighted, so none are included here.
const defaultGalleryImages = [
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxA4pZsqiCH8oP222G5Ztv5KpmE9FhjYPm9roi_HQKhqft2B4HWUnWns&s=10", alt: "Gallery photo 1" },
  { src: "https://th-i.thgim.com/public/incoming/ghkan3/article68354923.ece/alternates/FREE_1200/98ecc9e50433dc63b8598f7787b95909.jpg", alt: "Gallery photo 2" },
  { src: "https://i.pinimg.com/736x/63/d4/ef/63d4ef5d005907a0b8dfb99a51dbfb73.jpg", alt: "Gallery photo 3" },
  { src: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Floewe-foundation-studio-ghibli-museum-mitaka-hayao-miyazaki-tokuma-memorial-cultural-animation-1.jpg?q=90&w=800&cbr=1&fit=max", alt: "Gallery photo 4" },
];

const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500&display=swap');`;

// Palette grounded in the studio's own world: paper, forest, soot, and a
// single warm gold accent — kept quiet everywhere but the divider.
const palette = {
  paper: "#FFFFFF",
  forest: "#2F4A3A",
  forestDeep: "#1F3327",
  soot: "#262521",
  sootSoft: "#5B584F",
  gold: "#C89B4A",
  line: "#E4DCC7",
  white: "#FFFFFF",
};

const styles = {
  page: {
    background: palette.paper,
    minHeight: "100vh",
    fontFamily: "'Inter', Helvetica, sans-serif",
    color: palette.soot,
  },
  backRow: { padding: "24px 24px 0" },
  backBtn: {
    all: "unset",
    cursor: "pointer",
    fontSize: 13,
    letterSpacing: "0.03em",
    color: palette.sootSoft,
  },

  /* thumbnail strip */
  thumbRow: {
    display: "flex",
    justifyContent: "center",
    gap: 14,
    flexWrap: "wrap",
    padding: "28px 24px 44px",
  },
  thumbImg: {
    width: 140,
    height: 160,
    objectFit: "cover",
    borderRadius: 3,
    border: `1px solid ${palette.line}`,
  },
  thumbPlaceholder: {
    width: 140,
    height: 160,
    background: palette.line,
    borderRadius: 3,
  },

  /* photo + text */
  mainRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 40,
    maxWidth: 1020,
    margin: "0 auto",
    padding: "0 24px 56px",
  },
  photoCol: { flex: "1 1 380px" },
  photo: {
    width: "100%",
    height: "100%",
    minHeight: 340,
    objectFit: "cover",
    borderRadius: 4,
    display: "block",
  },
  photoPlaceholder: {
    width: "100%",
    minHeight: 340,
    background: palette.line,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: palette.white,
    fontSize: 14,
    letterSpacing: "0.05em",
  },
  textCol: { flex: "1 1 420px" },
  eyebrow: {
    display: "block",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: palette.gold,
    marginBottom: 10,
  },
  h1: {
    margin: "0 0 18px",
    fontSize: 32,
    fontWeight: 600,
    fontFamily: "'Fraunces', Georgia, serif",
    color: palette.forestDeep,
  },
  disclaimer: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.6,
    marginBottom: 20,
    padding: "10px 14px",
    borderLeft: `2px solid ${palette.gold}`,
    color: palette.sootSoft,
    background: "rgba(200,155,74,0.08)",
  },
  p: {
    fontSize: 15,
    lineHeight: 1.75,
    color: "#3E3C36",
    marginBottom: 16,
  },

  /* signature divider */
  dividerWrap: {
    display: "flex",
    justifyContent: "center",
    padding: "0 0 8px",
  },

  /* footer — simple white brand mark, replaces the old info block */
  footer: {
    background: palette.white,
    borderTop: `1px solid ${palette.line}`,
    padding: "40px 24px",
    justifyContent: "center",
  },
  brandMark: {
    maxWidth: 1020,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  brandWord: {
    fontFamily: "'Fraunces', Georgia, serif",
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: "0.02em",
    color: palette.forestDeep,
      justifyContent: "center",
  },
};
      /*--- <div style={styles.brandMark}>
          <LeafMark />
          <span style={styles.brandWord}>Studio Ghibli</span>
        </div>---*/