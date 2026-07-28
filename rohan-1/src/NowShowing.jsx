import React, { useState, useMemo } from "react";

const GENRE_COLORS = {
  Animation: "#6e93a0",
  Drama: "#c4645a",
  Fantasy: "#8a6fb0",
  Family: "#7a9b7e",
  Adventure: "#d4a24e",
  War: "#8c8c8c",
};

const MOVIES = [
  { id: 1, title: "The Tale of the Princess Kaguya", genre: "Drama", date: "2024-03-14", duration: 104, rating: 4.8, glyph: "竹",
    synopsis: "A tiny girl found inside a glowing bamboo stalk grows swiftly into a young woman, torn between the quiet countryside that raised her and the gilded court that wants to claim her.",
    image:"princess kaguya.jpg",  
  },
  { id: 2, title: "My Neighbor Totoro", genre: "Family", date: "2023-09-02", duration: 86, rating: 4.9, glyph: "森",
    synopsis: "Two sisters settle into a rambling countryside house and stumble on the enormous, sleepy forest spirit next door — along with a soot-covered welcome party and a bus shaped like a cat." },
  { id: 3, title: "Kiki's Delivery Service", genre: "Animation", date: "2025-01-20", duration: 103, rating: 4.7, glyph: "魔",
    synopsis: "A thirteen-year-old witch leaves home to complete her year of independent training, opening a delivery service by broomstick in a seaside town that isn't sure what to make of her yet." },
  { id: 4, title: "Whisper of the Heart", genre: "Family", date: "2022-06-11", duration: 111, rating: 4.6, glyph: "詩",
    synopsis: "A bookish teenager traces every library book she loves back to the same borrower's name, and follows the trail into a violin workshop, a mysterious cat statue, and her own first attempt at writing." },
  { id: 5, title: "Spirited Away", genre: "Fantasy", date: "2024-10-31", duration: 125, rating: 5.0, glyph: "湯",
    synopsis: "Wandering into an abandoned amusement park, a sullen ten-year-old finds her parents turned to pigs and herself bound to a bathhouse run by spirits, gods, and one enormous, short-tempered witch." },
  { id: 6, title: "Porco Rosso", genre: "Adventure", date: "2023-04-18", duration: 94, rating: 4.5, glyph: "豚",
    synopsis: "A cursed bounty hunter with the face of a pig flies solo over the Adriatic, chasing air pirates and avoiding the past, until a rival ace and a teenage engineer refuse to let him keep hiding." },
  { id: 7, title: "Princess Mononoke", genre: "Adventure", date: "2023-11-05", duration: 134, rating: 4.9, glyph: "狼",
    synopsis: "A young prince cursed by a dying demon rides west in search of a cure, arriving in the middle of a war between an iron-forging town and the ancient spirits of the forest it's consuming." },
  { id: 8, title: "Howl's Moving Castle", genre: "Fantasy", date: "2024-02-09", duration: 119, rating: 4.8, glyph: "城",
    synopsis: "Cursed with old age by a jealous witch, a young hatmaker sets off to break the spell and ends up keeping house inside a clanking, walking castle for a vain and elusive wizard." },
  { id: 9, title: "Ponyo", genre: "Family", date: "2025-05-01", duration: 101, rating: 4.4, glyph: "魚",
    synopsis: "A goldfish princess with a taste for ham escapes her father's underwater world to become human, setting off a small flood, a big storm, and one very determined friendship." },
  { id: 10, title: "Grave of the Fireflies", genre: "War", date: "2022-08-15", duration: 89, rating: 4.9, glyph: "蛍",
    synopsis: "In the final months of the war, a teenage boy and his little sister try to survive on their own after losing their home, tracing a quiet, devastating year of scavenging and hope." },
  { id: 11, title: "The Wind Rises", genre: "Drama", date: "2024-07-22", duration: 126, rating: 4.5, glyph: "風",
    synopsis: "A near-sighted boy who dreams only of flight grows up to design airplanes instead of piloting them, chasing an engineering ideal that history bends toward something he never intended." },
  { id: 12, title: "Arrietty", genre: "Fantasy", date: "2023-03-27", duration: 94, rating: 4.3, glyph: "借",
    synopsis: "A family of tiny people living quietly beneath the floorboards survives by borrowing what full-sized humans won't miss, until a sickly boy in the house upstairs notices Arrietty in the garden." },
];

const SHOWTIMES = ["1:30 PM", "4:45 PM", "7:15 PM", "9:50 PM"];

function formatDuration(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function formatDate(d) {
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function starString(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill={filled ? "#e6b96a" : "none"} stroke={filled ? "#e6b96a" : "#f1ead8"} strokeWidth="2">
      <path d="M12 21s-6.7-4.35-9.3-8.1C.8 9.8 2 6 5.6 5c2-.55 3.9.3 5 1.9C11.7 5.3 13.6 4.45 15.6 5c3.6 1 4.8 4.8 2.9 7.9C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function Poster({ movie, isFavorite, onToggleFavorite }) {
  const color = GENRE_COLORS[movie.genre] || "#7a9b7e";
  return (
    <div
      className="poster"
      style={{ background: `linear-gradient(155deg, ${color} 0%, #2c2620 115%)` }}
    >
      <div className="grain" />
      <span className="mark">{movie.glyph}</span>
      <span className="badge" style={{ background: color }}>{movie.genre}</span>
      <button
        className="fav-btn"
        title="Toggle watchlist"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(movie.id);
        }}
      >
        <HeartIcon filled={isFavorite} />
      </button>
    </div>
  );
}

function MovieCard({ movie, isFavorite, onToggleFavorite, onOpen }) {
  return (
    <div className="card" onClick={() => onOpen(movie.id)}>
      <Poster movie={movie} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />
      <div className="info">
        <h3>{movie.title}</h3>
        <div className="meta">
          <span className="stars">{starString(movie.rating)}</span>
          <span>·</span>
          <span>{formatDate(movie.date)}</span>
          <span>·</span>
          <span>{formatDuration(movie.duration)}</span>
        </div>
      </div>
    </div>
  );
}

function MovieModal({ movie, onClose }) {
  const [pickedTime, setPickedTime] = useState(SHOWTIMES[1]);
  const color = GENRE_COLORS[movie.genre] || "#7a9b7e";
  const imdbHref = `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`;

  return (
    <div
      className="overlay show"
      onClick={(e) => {
        if (e.target.classList.contains("overlay")) onClose();
      }}
    >
      <div className="modal">
        <div className="modal-hero" style={{ background: `linear-gradient(155deg, ${color} 0%, #2c2620 130%)` }}>
          <div className="grain" />
          <button className="modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
          <h2>{movie.title}</h2>
        </div>
        <div className="modal-body">
          <div className="modal-meta-row">
            <span>{movie.genre}</span>
            <span>·</span>
            <span>{formatDate(movie.date)}</span>
            <span>·</span>
            <span>{formatDuration(movie.duration)}</span>
            <span>·</span>
            <span style={{ color: "#a8701f" }}>{starString(movie.rating)} {movie.rating}</span>
          </div>
          <p className="synopsis">{movie.synopsis}</p>
          <div className="ticket-row">
            <div className="showtimes">
              {SHOWTIMES.map((t) => (
                <span
                  key={t}
                  className={pickedTime === t ? "picked" : ""}
                  onClick={() => setPickedTime(t)}
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              className="imdb-link"
              href={imdbHref}
              target="_blank"
              rel="noopener noreferrer"
              title="View on IMDb"
            >
              <span className="imdb-logo-slot">{/* drop an IMDb logo <img> here */}</span>
              IMDb
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NowShowing() {
  const [favorites, setFavorites] = useState(new Set());
  const [view, setView] = useState("grid");
  const [activeGenre, setActiveGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState("date-desc");
  const [openId, setOpenId] = useState(null);

  const genres = useMemo(() => [...new Set(MOVIES.map((m) => m.genre))], []);

  const filtered = useMemo(() => {
    let list = MOVIES.filter((m) => {
      const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = !activeGenre || m.genre === activeGenre;
      return matchesSearch && matchesGenre;
    });
    list = [...list];
    switch (sortMode) {
      case "date-desc": list.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case "date-asc": list.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case "title-asc": list.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "duration-asc": list.sort((a, b) => a.duration - b.duration); break;
      case "duration-desc": list.sort((a, b) => b.duration - a.duration); break;
      case "rating-desc": list.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [searchTerm, activeGenre, sortMode]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveGenre(null);
    setSortMode("date-desc");
  };

  const openMovie = openId != null ? MOVIES.find((m) => m.id === openId) : null;

  const resultLabel = `${filtered.length} film${filtered.length === 1 ? "" : "s"}${activeGenre ? " · " + activeGenre : ""}${searchTerm ? ' · "' + searchTerm + '"' : ""}`;

  return (
    <div className="ns-root">
      <style>{CSS}</style>
      <div className="filmstrip" />
      <div className="wrap">
        <header className="top">
          <a href="#" className="crumb">&larr; Home</a>
          <h1 className="title">Now <em>Showing</em></h1>
          <p className="subhead">Hand-picked animated worlds and quiet dramas, screening this season at Paper Lantern Cinema.</p>
        </header>

        <div className="controls">
          <div className="search-box">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="genre-pills">
            {genres.map((g) => (
              <button
                key={g}
                className={`pill ${activeGenre === g ? "active" : ""}`}
                onClick={() => setActiveGenre(activeGenre === g ? null : g)}
              >
                {g}
              </button>
            ))}
          </div>
          <select
            className="sort-select"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
          >
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="title-asc">Title A–Z</option>
            <option value="duration-asc">Shortest runtime</option>
            <option value="duration-desc">Longest runtime</option>
            <option value="rating-desc">Highest rated</option>
          </select>
          <div className="view-toggle">
            <button
              className={view === "grid" ? "active" : ""}
              title="Grid view"
              onClick={() => setView("grid")}
            >
              <GridIcon />
            </button>
            <button
              className={view === "list" ? "active" : ""}
              title="List view"
              onClick={() => setView("list")}
            >
              <ListIcon />
            </button>
          </div>
        </div>

        <div className="result-line">
          <span>{resultLabel}</span>
          <button onClick={clearFilters}>Clear filters</button>
        </div>

        <div className={`grid ${view === "list" ? "list-view" : ""}`}>
          {filtered.length === 0 ? (
            <div className="empty" style={{ gridColumn: "1/-1" }}>
              <h3>No films match yet</h3>
              <p>Try a different title or clear your filters.</p>
            </div>
          ) : (
            filtered.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                isFavorite={favorites.has(m.id)}
                onToggleFavorite={toggleFavorite}
                onOpen={setOpenId}
              />
            ))
          )}
        </div>
      </div>

      {openMovie && <MovieModal movie={openMovie} onClose={() => setOpenId(null)} />}
    </div>
  );
}

const CSS = `
.ns-root{
  --bg: #faf6ee;
  --bg-alt: #f1e8d6;
  --panel: #ffffff;
  --panel-hover: #f7f0e0;
  --paper: #2c2620;
  --paper-dim: #8a8072;
  --gold: #c8933f;
  --gold-bright: #a8701f;
  --coral: #c4645a;
  --sky: #5b8794;
  --sage: #7a9b7e;
  --line: rgba(44,38,32,0.12);
  --shadow: 0 20px 40px -20px rgba(44,38,32,0.18);
  background:
    radial-gradient(ellipse 800px 400px at 15% -5%, rgba(200,147,63,0.08), transparent 60%),
    radial-gradient(ellipse 700px 500px at 90% 0%, rgba(91,135,148,0.06), transparent 60%),
    var(--bg);
  color: var(--paper);
  font-family: 'Work Sans', sans-serif;
  min-height: 100vh;
  padding-bottom: 80px;
}
.ns-root *{box-sizing:border-box;}
.ns-root .filmstrip{
  height: 10px;
  width:100%;
  background-image: repeating-linear-gradient(90deg, var(--gold) 0 6px, transparent 6px 16px);
  opacity:0.55;
}
.ns-root .wrap{ max-width: 1180px; margin: 0 auto; padding: 0 32px; }
.ns-root header.top{ padding-top: 36px; }
.ns-root .crumb{
  color: var(--paper-dim);
  font-size: 13px;
  text-decoration:none;
  display:inline-flex;
  align-items:center;
  gap:6px;
  letter-spacing:.02em;
  transition: color .15s ease;
}
.ns-root .crumb:hover{ color: var(--gold-bright); }
.ns-root h1.title{
  font-family:'Fraunces', serif;
  font-weight:600;
  font-size: clamp(38px, 5vw, 56px);
  margin: 10px 0 4px 0;
  letter-spacing: -0.01em;
}
.ns-root h1.title em{
  font-style: italic;
  font-weight: 500;
  color: var(--gold-bright);
}
.ns-root .subhead{
  color: var(--paper-dim);
  font-size: 15px;
  margin-bottom: 28px;
  max-width: 520px;
  line-height:1.5;
}
.ns-root .controls{
  display:flex;
  flex-wrap:wrap;
  gap:14px;
  align-items:center;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 16px 18px;
  margin-bottom: 30px;
  position: sticky;
  top: 16px;
  z-index: 20;
  backdrop-filter: blur(6px);
}
.ns-root .search-box{
  position:relative;
  flex: 1 1 240px;
  min-width: 200px;
}
.ns-root .search-box svg{
  position:absolute; left:12px; top:50%; transform:translateY(-50%);
  opacity:0.55;
}
.ns-root .search-box input{
  width:100%;
  background: var(--bg-alt);
  border: 1px solid var(--line);
  color: var(--paper);
  font-family: 'Work Sans', sans-serif;
  font-size: 14px;
  padding: 10px 12px 10px 36px;
  border-radius: 10px;
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.ns-root .search-box input:focus{
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(212,162,78,0.18);
}
.ns-root .search-box input::placeholder{ color: var(--paper-dim); }
.ns-root .genre-pills{ display:flex; flex-wrap:wrap; gap:8px; }
.ns-root .pill{
  font-family:'Work Sans', sans-serif;
  font-size: 12.5px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--paper-dim);
  cursor:pointer;
  transition: all .15s ease;
  white-space:nowrap;
}
.ns-root .pill:hover{ border-color: var(--gold); color: var(--paper); }
.ns-root .pill.active{
  background: var(--gold);
  border-color: var(--gold);
  color: #1c1305;
}
.ns-root .sort-select{
  background: var(--bg-alt);
  border: 1px solid var(--line);
  color: var(--paper);
  font-family:'Work Sans', sans-serif;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: 10px;
  outline:none;
  cursor:pointer;
}
.ns-root .view-toggle{
  display:flex;
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow:hidden;
}
.ns-root .view-toggle button{
  background: var(--bg-alt);
  border:none;
  color: var(--paper-dim);
  padding: 9px 12px;
  cursor:pointer;
  display:flex;
  align-items:center;
  transition: all .15s ease;
}
.ns-root .view-toggle button.active{ background: var(--gold); color:#1c1305; }
.ns-root .result-line{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  color: var(--paper-dim);
  font-size: 13px;
  margin-bottom: 16px;
  font-family:'JetBrains Mono', monospace;
  letter-spacing:.01em;
}
.ns-root .result-line button{
  background:none; border:none; color: var(--sky); cursor:pointer;
  font-family:'JetBrains Mono', monospace; font-size:13px;
  text-decoration: underline;
}
.ns-root .grid{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
}
.ns-root .grid.list-view{
  grid-template-columns: 1fr;
}
@media (max-width: 880px){ .ns-root .grid{ grid-template-columns: repeat(2, 1fr);} }
@media (max-width: 600px){ .ns-root .grid{ grid-template-columns: 1fr;} }
.ns-root .card{
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
  cursor:pointer;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  display:flex;
  flex-direction:column;
}
.ns-root .card:hover{
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: rgba(212,162,78,0.4);
}
.ns-root .grid.list-view .card{
  flex-direction:row;
  align-items: stretch;
}
.ns-root .grid.list-view .poster{ width: 160px; flex-shrink:0; aspect-ratio: unset; }
.ns-root .grid.list-view .info{ flex:1; }
.ns-root .poster{
  position:relative;
  aspect-ratio: 3/4;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}
.ns-root .poster .grain{
  position:absolute; inset:0;
  background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 4px);
  mix-blend-mode: overlay;
  opacity:0.4;
}
.ns-root .poster .mark{
  font-family:'Fraunces', serif;
  font-size: 74px;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  text-shadow: 0 6px 24px rgba(0,0,0,0.35);
  z-index:1;
}
.ns-root .badge{
  position:absolute;
  top:12px; left:12px;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform:uppercase;
  padding: 5px 10px;
  border-radius: 999px;
  color: #1c1305;
  z-index:2;
}
.ns-root .fav-btn{
  position:absolute;
  top:10px; right:10px;
  z-index:3;
  background: rgba(44,38,32,0.55);
  border: 1px solid rgba(241,234,216,0.25);
  border-radius: 50%;
  width: 32px; height:32px;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer;
  backdrop-filter: blur(4px);
  transition: transform .15s ease, background .15s ease;
}
.ns-root .fav-btn:hover{ transform: scale(1.08); }
.ns-root .info{ padding: 18px 18px 20px; }
.ns-root .info h3{
  font-family:'Fraunces', serif;
  font-size: 19px;
  font-weight: 600;
  margin: 0 0 6px 0;
  line-height:1.25;
}
.ns-root .meta{
  color: var(--paper-dim);
  font-size: 13px;
  font-family:'JetBrains Mono', monospace;
  display:flex;
  align-items:center;
  gap:8px;
}
.ns-root .meta .stars{ color: var(--gold-bright); letter-spacing:1px; }
.ns-root .empty{
  text-align:center;
  padding: 80px 20px;
  color: var(--paper-dim);
}
.ns-root .empty h3{ font-family:'Fraunces', serif; color: var(--paper); font-size:22px; margin-bottom:8px;}
.ns-root .overlay{
  position:fixed; inset:0;
  background: rgba(60,52,38,0.35);
  backdrop-filter: blur(3px);
  display:none;
  align-items:center;
  justify-content:center;
  z-index: 100;
  padding: 24px;
}
.ns-root .overlay.show{ display:flex; }
.ns-root .modal{
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 20px;
  max-width: 640px;
  width:100%;
  max-height: 86vh;
  overflow-y:auto;
  box-shadow: 0 40px 80px -20px rgba(44,38,32,0.3);
  position:relative;
}
.ns-root .modal-hero{
  height: 160px;
  position:relative;
  display:flex;
  align-items:flex-end;
  padding: 20px 26px;
  overflow:hidden;
}
.ns-root .modal-hero .grain{ position:absolute; inset:0; background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0 2px, transparent 2px 4px); mix-blend-mode:overlay;}
.ns-root .modal-hero h2{
  font-family:'Fraunces', serif;
  font-size: 30px;
  margin:0;
  z-index:1;
  text-shadow: 0 4px 16px rgba(0,0,0,0.35);
}
.ns-root .modal-close{
  position:absolute; top:16px; right:16px;
  background: rgba(44,38,32,0.55);
  border: 1px solid rgba(241,234,216,0.25);
  color: #f1ead8;
  width:34px; height:34px;
  border-radius:50%;
  cursor:pointer;
  z-index:2;
  display:flex; align-items:center; justify-content:center;
}
.ns-root .modal-body{ padding: 24px 26px 28px; }
.ns-root .modal-meta-row{
  display:flex; gap:14px; flex-wrap:wrap;
  font-family:'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--paper-dim);
  margin-bottom: 18px;
}
.ns-root .modal-body p.synopsis{
  line-height:1.65;
  color: var(--paper);
  font-size: 15px;
  margin-bottom: 22px;
}
.ns-root .ticket-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  border-top: 1px dashed var(--line);
  padding-top: 18px;
  gap: 12px;
  flex-wrap:wrap;
}
.ns-root .showtimes{ display:flex; gap:8px; flex-wrap:wrap; }
.ns-root .showtimes span{
  border:1px solid var(--line);
  padding: 7px 12px;
  border-radius: 8px;
  font-family:'JetBrains Mono', monospace;
  font-size:12.5px;
  color: var(--paper-dim);
  cursor:pointer;
  transition: all .15s ease;
}
.ns-root .showtimes span:hover, .ns-root .showtimes span.picked{
  border-color: var(--gold);
  color: var(--paper);
  background: rgba(212,162,78,0.12);
}
.ns-root .imdb-link{
  display:flex;
  align-items:center;
  gap:8px;
  background: transparent;
  color: var(--gold-bright);
  border: 1px solid var(--line);
  font-family:'Work Sans', sans-serif;
  font-weight:600;
  font-size: 13px;
  letter-spacing:.02em;
  padding: 9px 16px;
  border-radius: 10px;
  text-decoration:none;
  transition: border-color .15s ease, color .15s ease, background .15s ease;
}
.ns-root .imdb-link:hover{
  border-color: var(--gold);
  background: rgba(212,162,78,0.1);
}
.ns-root .imdb-logo-slot{
  width: 18px;
  height: 18px;
  border-radius: 4px;
  flex-shrink:0;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}
.ns-root .imdb-logo-slot img{
  width:100%;
  height:100%;
  object-fit:contain;
  display:block;
}

@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
`;
