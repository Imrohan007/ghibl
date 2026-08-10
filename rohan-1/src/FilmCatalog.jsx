import React, { useState } from "react";

const FILMS = [
  {
    id: 1,
    title: "The Princess Kaguya",
    date: "2024-03-14",
    runtime: "118 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis:
      "A retired conductor returns to the concert hall where her career ended, forced to confront the silence she left behind.",
    accent: "#C1443B",
    image: "princess kaguya.jpg",
      gallery: ["public/princess kayuga/download (1).jpg", "public/princess kayuga/Princess kaguya.jpg",
         "public/princess kayuga/𝒕𝒉𝒆 𝒕𝒂𝒍𝒆 𝒐𝒇 𝒑𝒓𝒊𝒏𝒄𝒆𝒔𝒔 𝒌𝒂𝒈𝒖𝒚𝒂 (1).jpg","public/princess kayuga/𝒕𝒉𝒆 𝒕𝒂𝒍𝒆 𝒐𝒇 𝒑𝒓𝒊𝒏𝒄𝒆𝒔𝒔 𝒌𝒂𝒈𝒖𝒚𝒂 (2).jpg",
        "public/princess kayuga/𝒕𝒉𝒆 𝒕𝒂𝒍𝒆 𝒐𝒇 𝒑𝒓𝒊𝒏𝒄𝒆𝒔𝒔 𝒌𝒂𝒈𝒖𝒚𝒂.jpg","public/princess kayuga/The tale of princess kaguya.jpg"],
    

  },
  {
    id: 2,
    title: "My Neighbor Totoro",
    date: "2023-09-02",
    runtime: "104 min",
    genre: "Animation",
    director: "Sten Vasko",
    synopsis:
      "A harbor town's fishing fleet vanishes overnight, and the one boat that returns carries no crew, only questions.",
    accent: "#2F6F8F",
    image: "My Neighbor Totoro ⁽¹⁹⁸⁸⁾.jpg",
    gallery: ["public/my neighbour/download (2).jpg","public/my neighbour/download (3).jpg","public/my neighbour/download (4).jpg",
      "public/my neighbour/download (5).jpg","public/my neighbour/download (6).jpg"],
  },
  {
    id: 3,
    title: "Kiki's Delivery Service",
    date: "2025-01-20",
    runtime: "96 min",
    genre: "Animation",
    director: "Lucia Ferrante",
    synopsis:
      "Two origami rulers wage a quiet war across a child's bedroom floor, folding and unfolding their fragile borders.",
    accent: "#E8B93F",
    image: "Kiki's Delivery Service.jpg",
    gallery: ["public/kiki delevery/download (7).jpg","public/kiki delevery/download (8).jpg",
      "public/kiki delevery/download (9).jpg","public/kiki delevery/download (10).jpg",
      "public/kiki delevery/download (10).jpg","public/kiki delevery/download (11).jpg"],


  },
  {
    id: 4,
    title: "Whisper of the Heart",
    date: "2024-11-08",
    runtime: "131 min",
    genre: "Western",
    director: "Cole Marchetti",
    synopsis:
      "A dying railway town gets one last train, and the stranger who steps off it is carrying more than luggage.",
    accent: "#7A5C3E",
    image: "Lời thì thầm của trái tim.jpg",
  },
  {
    id: 5,
    title: "Spirited Away",
    date: "2023-12-15",
    runtime: "125 min",
    genre: "Fantasy",
    director: "Ava Chen",
    synopsis:
      "A young girl discovers a hidden world of spirits and magic when her family moves to a new town, and she must find her way back home.",
    accent: "#A14D6C",
    image: "spirited away.jpg",
  },
  {
    id: 6,
    title: "Red Turtle",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "movie",
    director: "Mira Okonkwo",
    synopsis:
      "A retired conductor returns to the concert hall where her career ended, forced to confront the silence she left behind.",
    accent: "#a14d6c",
    image: "red turtle.jpg",
  },
  {
    id: 7,
    title: "Princess Mononoke",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis:
      "A retired conductor returns to the concert hall where her career ended, forced to confront the silence she left behind.",
    accent: "#C1443B",
    image: "d1b1fdc8-20ea-4213-8d37-8f5b8163039b.jpg",
  },
  {
    id: 8,
    title: "Mary and The Witch's Flower",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis: "the story is about witch",
    accent: "#c1443b",
    image: "Mary And The Witch’s Flower.jpg",
  },
  {
    id: 9,
    title: "Arrietty",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis: "the story is about witch",
    accent: "#c1443b",
    image: "Arrietty titkos világa (2010).jpg",
  },
  {
    id: 10,
    title: "Only yesterday",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis: "the story is about witch",
    accent: "#c1443b",
    image: "c18cd7a6-dd15-4313-a9f0-01dd95907eb7.jpg",
  },
  {
    id: 11,
    title: "From Up on Poppy Hill",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis: "the story is about witch",
    accent: "#c1443b",
    image: "From Up on Poppy Hill.jpg",
  },
  {
    id: 12,
    title: "ponyo",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis: "the story is about witch",
    accent: "#c1443b",
    image: "ponyo.jpg",
  },
  {
    id: 13,
    title: "Castle in the sky",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis: "the story is about witch",
    accent: "#c1443b",
    image: "download.jpg",
  },
  {
    id: 14,
    title: "The Cat Returns",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis: "the story is about witch",
    accent: "#c1443b",
    image: "76555cff-4473-4be2-b6d9-657a3a4d7a11.jpg",
  },
  {
    id: 15,
    title: "Tales from Earthsea",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis: "the story is about witch",
    accent: "#c1443b",
    image: "Tales from Earthsea.jpg",
  },
   {
    id: 16,
    title: "Pom Poko",
    date: "1994-07-16",
    runtime: "119 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis: "the story is about witch",
    accent: "#c1443b",
    image: "Pom Poko (1994).jpg",
  },
   {
    id: 17,
    title: "Ocean Waves",
    date: "1993-05-5",
    runtime: "72 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis: "the story is about witch",
    accent: "#c1443b",
    image: "download (12).jpg",
  },
   {
    id: 18,
    title: "The boy and heron",
    date: "2003-07-14",
    runtime: "119 min",
    genre: "Drama",
    director: "Hayao Mizaki",
    synopsis: "Mahito, a young 12-year-old boy, struggles to settle in a new town after his mother's death. However, when a talking heron informs Mahito that his mother is still alive, he enters an abandoned tower in search of her, which takes him to another world.",
    accent: "#c1443b",
    image: "download (13).jpg",
  },
   {
    id: 19,
    title: "Nausicaä of the Valley of the Wind",
    date: "2003-07-14",
    runtime: "119 min",
    genre: "Drama",
    director: "Hayao Mizaki",
    synopsis: "Mahito, a young 12-year-old boy, struggles to settle in a new town after his mother's death. However, when a talking heron informs Mahito that his mother is still alive, he enters an abandoned tower in search of her, which takes him to another world.",
    accent: "#c1443b",
    image: "Nausicaä del Valle del Viento.jpg",
  },

    {
    id: 20,
    title: "My Neighbors the Yamadas",
    date: "2003-07-14",
    runtime: "119 min",
    genre: "Drama",
    director: "Hayao Mizaki",
    synopsis: "Mahito, a young 12-year-old boy, struggles to settle in a new town after his mother's death. However, when a talking heron informs Mahito that his mother is still alive, he enters an abandoned tower in search of her, which takes him to another world.",
    accent: "#c1443b",
    image: "My Neighbors The Yamadas.jpg",
  },

   
   

   
   

];

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function FilmCard({ film, onOpen }) {
  return (
    <button
      onClick={() => onOpen(film)}
      className="fc-card"
      style={{
        all: "unset",
        cursor: "pointer",
        background: "#FFFFFF",
        border: "1px solid #E9E9E9",
        borderRadius: 6,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 3px rgba(20,20,20,0.05)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "150%",
          background: "#F5F5F5",
        }}
      >
        <img
          src={film.image}
          alt={film.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <a
          href={
            film.imdbUrl ||
            `https://www.imdb.com/find/?q=${encodeURIComponent(film.title)}`
          }
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="fc-imdb-badge"
        >
          IMDb
        </a>
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 14 }}>
          <h3 className="fc-card-title">{film.title}</h3>
          <p className="fc-card-meta">
            {formatDate(film.date)} &middot; {film.runtime}
          </p>
        </div>
      </div>
    </button>
  );
}

function Lightbox({ images, alt, index, onClose, onPrev, onNext }) {
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20,20,20,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 32,
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="fc-lightbox-close"
      >
        ✕
      </button>

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
          className="fc-lightbox-nav fc-lightbox-nav-left"
        >
          ‹
        </button>
      )}

      <img
        src={images[index]}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw",
          maxHeight: "88vh",
          objectFit: "contain",
          borderRadius: 6,
          boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
        }}
      />

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="fc-lightbox-nav fc-lightbox-nav-right"
        >
          ›
        </button>
      )}

      {images.length > 1 && (
        <div className="fc-lightbox-counter">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

function FilmDetail({ film, onClose }) {
  const gallery =
    film.gallery && film.gallery.length > 0 ? film.gallery : [film.image];
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <div>
      <button
        onClick={onClose}
        className="fc-back-btn"
        style={{ position: "static", marginBottom: 16 }}
      >
        ← Back to films
      </button>
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E9E9E9",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(20,20,20,0.06)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "34%",
            background: "#F5F5F5",
            overflow: "hidden",
          }}
        >
          <img
            src={film.image}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(24px) saturate(1.1) brightness(0.9)",
              transform: "scale(1.15)",
            }}
          />
          <img
            src={film.image}
            alt={film.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 60%, #ffffff 100%)",
            }}
          />
        </div>
        <div style={{ padding: "30px 32px 40px" }}>
          <h2 className="fc-detail-title">{film.title}</h2>
          <div className="fc-detail-meta">
            <span>{formatDate(film.date)}</span>
            <span>{film.runtime}</span>
            <span>Dir. {film.director}</span>
          </div>
          <p className="fc-detail-synopsis">{film.synopsis}</p>

          {gallery.length > 0 && (
            <div className="fc-gallery">
              <p className="fc-gallery-label">Gallery</p>
              <div className="fc-gallery-grid">
                {gallery.map((src, i) => (
                  <div
                    className="fc-gallery-item"
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img src={src} alt={`${film.title} still ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          alt={`${film.title} still ${lightboxIndex + 1}`}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length)
          }
          onNext={() => setLightboxIndex((i) => (i + 1) % gallery.length)}
        />
      )}
    </div>
  );
}

export default function FilmCatalog({ onBackHome }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="fc-page">
      <style>{css}</style>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 60px" }}>
        {onBackHome && (
          <button onClick={onBackHome} className="fc-home-btn">
            ← Home
          </button>
        )}

        <header className="fc-hero-header">
          <p className="fc-hero-kicker">Studio Ghibli &amp; Beyond</p>
          {!selected && (
            <>
              <h1 className="fc-hero-title">Now Showing</h1>
              <div className="fc-divider" aria-hidden="true">
                <span className="fc-divider-line" />
                <span className="fc-divider-mark" />
                <span className="fc-divider-line" />
              </div>
              <p className="fc-hero-byline">
                A curated collection of films, drawn together for one screening room.
              </p>
            </>
          )}
        </header>

        {selected ? (
          <FilmDetail film={selected} onClose={() => setSelected(null)} />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {FILMS.map((film) => (
              <FilmCard key={film.id} film={film} onOpen={setSelected} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Jost:wght@400;500&display=swap');

.fc-page {
  font-family: 'Jost', Arial, sans-serif;
  background: #FFFFFF;
  color: #1F1F1F;
  min-height: 100vh;
  padding-top: 40px;
}

.fc-home-btn {
  all: unset;
  cursor: pointer;
  font-size: 13px;
  color: #8A8A8A;
  margin-bottom: 24px;
  display: inline-block;
  font-family: 'Jost', Arial, sans-serif;
}
.fc-home-btn:hover { color: #1F1F1F; }

.fc-hero-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 48px;
}
.fc-hero-kicker {
  font-family: 'Jost', Arial, sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8A8A8A;
  margin: 0 0 10px;
}
.fc-hero-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 600;
  color: #141414;
  margin: 0 0 18px;
  letter-spacing: 0.01em;
}
.fc-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 18px;
}
.fc-divider-line {
  height: 1px;
  width: 64px;
  background: linear-gradient(90deg, transparent, #D9D9D9);
}
.fc-divider-line:last-of-type { background: linear-gradient(270deg, transparent, #D9D9D9); }
.fc-divider-mark {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1F1F1F;
  box-shadow: 0 0 0 4px rgba(31,31,31,0.08);
}
.fc-hero-byline {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #5C5C5C;
  margin: 0;
}

.fc-genre-badge {
  position: absolute;
  font-family: 'Jost', Arial, sans-serif;
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1F1F1F;
  font-weight: 500;
  background: rgba(255,255,255,0.92);
  padding: 5px 11px;
  border-radius: 2px;
  border: 1px solid #E9E9E9;
}

.fc-card-title {
  margin: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
}
.fc-card-meta {
  margin: 6px 0 0;
  font-family: 'Jost', Arial, sans-serif;
  font-size: 12.5px;
  color: rgba(255,255,255,0.9);
}

.fc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(20,20,20,0.1);
}

.fc-imdb-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  font-family: 'Jost', Arial, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #000000;
  background: #F5C518;
  padding: 4px 8px;
  border-radius: 3px;
  text-decoration: none;
  line-height: 1;
  box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  transition: transform 0.2s ease;
}
.fc-imdb-badge:hover {
  transform: scale(1.06);
}

.fc-back-btn {
  all: unset;
  cursor: pointer;
  position: absolute;
  top: 16px;
  left: 16px;
  color: #1F1F1F;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Jost', Arial, sans-serif;
  background: rgba(255,255,255,0.92);
  padding: 7px 15px;
  border-radius: 2px;
  border: 1px solid #E9E9E9;
}

.fc-detail-title {
  margin: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: #141414;
}
.fc-detail-meta {
  display: flex;
  gap: 18px;
  margin: 14px 0 22px;
  font-family: 'Jost', Arial, sans-serif;
  font-size: 13px;
  color: #8A8A8A;
}
.fc-detail-synopsis {
  margin: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 17px;
  line-height: 1.75;
  color: #3A3A3A;
  max-width: 560px;
}

.fc-gallery {
  margin-top: 36px;
}
.fc-gallery-label {
  font-family: 'Jost', Arial, sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8A8A8A;
  margin: 0 0 14px;
}
.fc-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}
.fc-gallery-item {
  position: relative;
  width: 100%;
  padding-top: 66%;
  border-radius: 6px;
  overflow: hidden;
  background: #F5F5F5;
  border: 1px solid #E9E9E9;
  cursor: pointer;
}
.fc-gallery-item img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.fc-gallery-item:hover img {
  transform: scale(1.06);
}

.fc-lightbox-close {
  all: unset;
  position: absolute;
  top: 20px;
  right: 24px;
  cursor: pointer;
  color: #FFFFFF;
  font-size: 20px;
  line-height: 1;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.12);
  transition: background 0.2s ease;
}
.fc-lightbox-close:hover {
  background: rgba(255,255,255,0.22);
}

.fc-lightbox-nav {
  all: unset;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #FFFFFF;
  font-size: 34px;
  line-height: 1;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.12);
  transition: background 0.2s ease;
}
.fc-lightbox-nav:hover {
  background: rgba(255,255,255,0.22);
}
.fc-lightbox-nav-left { left: 20px; }
.fc-lightbox-nav-right { right: 20px; }

.fc-lightbox-counter {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.85);
  font-family: 'Jost', Arial, sans-serif;
  font-size: 12.5px;
  letter-spacing: 0.04em;
  background: rgba(255,255,255,0.12);
  padding: 5px 12px;
  border-radius: 20px;
}
`;
