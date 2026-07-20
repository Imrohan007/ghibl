/**
 * About
 *
 * Props:
 *   onBackHome    - called when the "Home" link is clicked
 *   galleryImages - array of { src, alt } shown as thumbnails up top
 *   photoSrc      - the large photo next to the text block
 *   photoAlt      - alt text for that photo
 *   contact       - { website, phone, address (array of lines) }
 *   hours         - array of { day, time } for the museum schedule
 *   admission     - array of { label, price }
 */
export default function About({
  onBackHome,
  galleryImages = defaultGalleryImages,
  photoSrc ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe5x75FCyt7nHKDxlVpbE72Y0kdbm8noMjfAIUJ-52tJ8r9dOdDDJprA_S&s=10" ,
  photoAlt = "Studio photo",
  contact = defaultContact,
  hours = defaultHours,
  admission = defaultAdmission,
}) {
  return (
    <div style={styles.page}>
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

      {/* --- Footer: contact + hours --- */}
      <div style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerCol}>
            <h2 style={styles.h2}>Contact</h2>
            <p style={styles.footerLine}>Website: {contact.website}</p>
            <p style={styles.footerLine}>Phone: {contact.phone}</p>
            <p style={styles.footerLine}>Address:</p>
            {contact.address.map((line, i) => (
              <p key={i} style={styles.footerLine}>
                {line}
              </p>
            ))}
          </div>

          <div style={styles.footerCol}>
            <h2 style={styles.h2}>Museum Hours</h2>
            {hours.map((h, i) => (
              <p key={i} style={styles.footerLine}>
                {h.day} {h.time}
              </p>
            ))}
          </div>

          <div style={styles.footerCol}>
            <h2 style={styles.h2}>Admission</h2>
            {admission.map((a, i) => (
              <p key={i} style={styles.footerLine}>
                {a.label}: {a.price}
              </p>
            ))}
          </div>
        </div>
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

// Neutral stand-ins — swap for your own images. Real Ghibli photos/art
// are copyrighted, so none are included here.
const defaultGalleryImages = [
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxA4pZsqiCH8oP222G5Ztv5KpmE9FhjYPm9roi_HQKhqft2B4HWUnWns&s=10", alt: "Gallery photo 1" },
  { src: "https://th-i.thgim.com/public/incoming/ghkan3/article68354923.ece/alternates/FREE_1200/98ecc9e50433dc63b8598f7787b95909.jpg", alt: "Gallery photo 2" },
  { src: "https://i.pinimg.com/736x/63/d4/ef/63d4ef5d005907a0b8dfb99a51dbfb73.jpg", alt: "Gallery photo 3" },
  { src: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Floewe-foundation-studio-ghibli-museum-mitaka-hayao-miyazaki-tokuma-memorial-cultural-animation-1.jpg?q=90&w=800&cbr=1&fit=max", alt: "Gallery photo 4" },
];

const defaultContact = {
  website: "www.example.com",
  phone: "555-555-555",
  address: ["123 Example Ave", "Tokyo, Japan 01234"],
};

const defaultHours = [
  { day: "Sunday", time: "1–4pm" },
  { day: "Monday", time: "1–4pm" },
  { day: "Tuesday", time: "1–4pm" },
  { day: "Wednesday", time: "1–4pm" },
  { day: "Thursday", time: "1–4pm" },
  { day: "Friday", time: "1–4pm" },
  { day: "Saturday", time: "1–4pm" },
];

const defaultAdmission = [
  { label: "Ages 0–5", price: "Free" },
  { label: "Adults", price: "$35" },
  { label: "Seniors", price: "$25" },
];

const styles = {
  page: {
    background: "#ffffff",
    minHeight: "100vh",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#1a1a1a",
  },
  backRow: { padding: "20px 24px 0" },
  backBtn: {
    all: "unset",
    cursor: "pointer",
    fontSize: 13,
    color: "#9A968C",
  },

  /* thumbnail strip */
  thumbRow: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
    padding: "24px 24px 40px",
  },
  thumbImg: {
    width: 140,
    height: 160,
    objectFit: "cover",
    borderRadius: 4,
  },
  thumbPlaceholder: {
    width: 140,
    height: 160,
    background: "#B9B9B9",
    borderRadius: 4,
  },

  /* photo + text */
  mainRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 32,
    maxWidth: 1000,
    margin: "0 auto",
    padding: "0 24px 60px",
  },
  photoCol: { flex: "1 1 380px" },
  photo: {
    width: "100%",
    height: "100%",
    minHeight: 320,
    objectFit: "cover",
    borderRadius: 6,
    display: "block",
  },
  photoPlaceholder: {
    width: "100%",
    minHeight: 320,
    background: "#B9B9B9",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 14,
    letterSpacing: "0.05em",
  },
  textCol: { flex: "1 1 420px" },
  h1: {
    margin: "0 0 16px",
    fontSize: 26,
    fontWeight: 700,
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  disclaimer: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.6,
    marginBottom: 18,
    color: "#1a1a1a",
  },
  p: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "#3a3a3a",
    marginBottom: 16,
  },

  /* footer */
  footer: { background: "#B9B9B9", padding: "40px 24px" },
  footerInner: {
    maxWidth: 1000,
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    gap: 40,
  },
  footerCol: { flex: "1 1 200px" },
  h2: {
    margin: "0 0 14px",
    fontSize: 19,
    fontWeight: 700,
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  footerLine: {
    margin: "0 0 6px",
    fontSize: 13,
    lineHeight: 1.6,
    color: "#2a2a2a",
  },
};
