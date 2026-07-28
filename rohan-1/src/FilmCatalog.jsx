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
    accent:"#a14d6c",
    image:"red turtle.jpg",
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
     id: 7,
    title: "Mary and The Witch's Flower",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis:"the story is about witch",
    accent:"#c1443b",
    image:"Mary And The Witch’s Flower.jpg",
  },
  {
      id: 8,
    title: "Arrietty",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis:"the story is about witch",
    accent:"#c1443b",
    image:"Arrietty titkos világa (2010).jpg",

  },
   {
      id: 9,
    title: "Only yesterday",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis:"the story is about witch",
    accent:"#c1443b",
    image:"c18cd7a6-dd15-4313-a9f0-01dd95907eb7.jpg",

  },
   {
      id: 10,
    title: "From Up on Poppy Hill",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis:"the story is about witch",
    accent:"#c1443b",
    image:"From Up on Poppy Hill.jpg",

  },
   {
      id: "11",
    title: "ponyo",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis:"the story is about witch",
    accent:"#c1443b",
    image:"ponyo.jpg",

  },
   {
      id: 12,
    title: "Castle in the sky",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis:"the story is about witch",
    accent:"#c1443b",
    image:"download.jpg",

  },
   {
      id: 13,
    title: "The Cat Returns",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis:"the story is about witch",
    accent:"#c1443b",
    image:"76555cff-4473-4be2-b6d9-657a3a4d7a11.jpg",

  },
   {
      id: 14,
    title: "Tales from Earthsea",
    date: "2024-06-20",
    runtime: "110 min",
    genre: "Drama",
    director: "Mira Okonkwo",
    synopsis:"the story is about witch",
    accent:"#c1443b",
    image:"Tales from Earthsea.jpg",

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
      style={{
        all: "unset",
        cursor: "pointer",
        background: "#FFFFFF",
        border: "1px solid #ECEAE4",
        borderRadius: 18,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 2px rgba(20, 20, 20, 0.04)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(20, 20, 20, 0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(20, 20, 20, 0.04)";
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "150%",
          background: "#F1EFE9",
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
            objectFit: "contain",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            fontWeight: 600,
            background: `${film.accent}CC`,
            padding: "4px 10px",
            borderRadius: 20,
          }}
        >
          {film.genre}
        </span>
      </div>
      <div style={{ padding: "20px 22px 14px", textAlign: "left" }}>
        <h3
          style={{
            margin: 0,
            fontSize: 21,
            fontWeight: 600,
            color: "#1E1E1C",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          {film.title}
        </h3>
        <p
          style={{
            margin: "10px 0 0",
            fontSize: 13.5,
            color: "#9A968C",
          }}
        >
          {formatDate(film.date)} · {film.runtime}
        </p>
      </div>
    </button>
  );
}

function FilmDetail({ film, onClose }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #ECEAE4",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(20, 20, 20, 0.05)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%", 
          paddingTop: "60%",
          background: "#F1EFE9",
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
            objectFit: "contain",
          }}
        />
        <button
          onClick={onClose}
          style={{
            all: "unset",
            cursor: "pointer",
            position: "absolute",
            top: 16,
            left: 16,
            color: "#1E1E1C",
            fontSize: 13,
            fontWeight: 600,
            background: "#FFFFFFE6",
            padding: "6px 14px",
            borderRadius: 20,
          }}
        >
          ← Back to films
        </button>
        <span
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            fontWeight: 600,
            background: `${film.accent}CC`,
            padding: "5px 12px",
            borderRadius: 20,
          }}
        >
          {film.genre}
        </span>
      </div>
      <div style={{ padding: "26px 28px 34px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 600,
            color: "#1E1E1C",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          {film.title}
        </h2>
        <div
          style={{
            display: "flex",
            gap: 18,
            margin: "12px 0 20px",
            fontSize: 13,
            color: "#9A968C",
          }}
        >
          <span>{formatDate(film.date)}</span>
          <span>{film.runtime}</span>
          <span>Dir. {film.director}</span>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.7,
            color: "#57544C",
            maxWidth: 520,
          }}
        >
          {film.synopsis}
        </p>
      </div>
    </div>
  );
}

export default function FilmCatalog({ onBackHome }) {
  const [selected, setSelected] = useState(null);

  return (
    <div
      style={{
        background: "#FAF9F6",
        minHeight: "100vh",
        padding: "40px 24px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ maxWidth: 5000, margin: "0 auto" }}>
        {onBackHome && (
          <button
            onClick={onBackHome}
            style={{
              all: "unset",
              cursor: "pointer",
              fontSize: 13,
              color: "#9A968C",
              marginBottom: 16,
              display: "inline-block",
            }}
          >
            ← Home
          </button>
        )}
        <h1
          style={{
            margin: "0 0 28px",
            fontSize: 22,
            fontWeight: 600,
            color: "#1E1E1C",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          Now Showing
        </h1>

        {selected ? (
          <FilmDetail film={selected} onClose={() => setSelected(null)} />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 22,
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
