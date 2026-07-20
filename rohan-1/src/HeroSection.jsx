/**
 * HeroSection
 *
 * Props let you pass real images in without touching the component:
 *   heroImageSrc   - url/path for the hero background image
 *   heroImageAlt   - alt text for the hero image
 *   logoSrc        - url/path for the logo image
 *   logoAlt        - alt text for the logo
 *   title          - main heading text
 *   byline         - subheading / credit line
 *   onExploreFilms - called when the "Explore Films" link is clicked
 *
 * If heroImageSrc / logoSrc are omitted, placeholders render instead
 * so the layout still looks complete.
 */
export default function HeroSection({
  heroImageSrc = "1198793-3054x1666-desktop-hd-studio-ghibli-wallpaper.jpg",
  heroImageAlt = "",
  logoSrc = "kindpng_834491.png",
  logoAlt = "Logo",
  title = "The World Within",
  byline = "Made by Hayao Miyazaki",
  onExploreFilms ,
  onOurHistory,
  onAboutStudio
}) {
  const links = [
    { label: "About Studio", href: "#about",onClick:onAboutStudio },
    { label: "Explore Films", href: "#films", onClick: onExploreFilms },
    { label: "Our History", href: "#history", onClick:onOurHistory},
  ];

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        {heroImageSrc ? (
          <img src={heroImageSrc} alt={heroImageAlt} style={styles.heroImg} />
        ) : (
          <div style={styles.heroPlaceholder} aria-hidden="true" />
        )}
      </section>

      <div style={styles.content}>
        {logoSrc ? (
          <img src={logoSrc} alt={logoAlt} style={styles.logo} />
        ) : (
          <div style={styles.logoPlaceholder}>YOUR LOGO</div>
        )}

        <h1 style={styles.title}>{title}</h1>
        <p style={styles.byline}>{byline}</p>

        <nav style={styles.nav}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={styles.navLink}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = styles.navLinkHover.color)}
              onMouseOut={(e) => (e.currentTarget.style.color = styles.navLink.color)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    background: "#faf8f4",
    color: "#1a1a1a",
  },
  hero: {
    position: "relative",
    width: "100%",
    height: "60vh",
    minHeight: "380px",
    maxHeight: "520px",
    overflow: "hidden",
    background:
      "linear-gradient(180deg, #6fb7e0 0%, #9fd4e8 35%, #2f6b5e 65%, #1f4a41 100%)",
  },
  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroPlaceholder: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(60px 30px at 20% 20%, rgba(255,255,255,0.6), transparent)," +
      "radial-gradient(80px 35px at 60% 15%, rgba(255,255,255,0.5), transparent)," +
      "radial-gradient(50px 25px at 80% 25%, rgba(255,255,255,0.5), transparent)",
  },
  content: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 24px 60px",
    textAlign: "center",
  },
  logo: {
    maxWidth: "200px",
    height: "auto",
    margin: "0 auto 32px",
    display: "block",
  },
  logoPlaceholder: {
    width: "140px",
    height: "140px",
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
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: "#1a1a1a",
    marginBottom: "18px",
    lineHeight: 1.1,
  },
  byline: {
    fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
    color: "#555",
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
    fontSize: "1rem",
    fontFamily: "Arial, sans-serif",
    transition: "color 0.2s ease",
    cursor: "pointer",
  },
  navLinkHover: {
    color: "#17356f",
  },
};
