import { useEffect, useMemo, useState } from 'react';
import { Search, Bell, Play, Plus, Check, ChevronDown, ChevronLeft, ChevronRight, Volume2, Sparkles, Menu, X } from 'lucide-react';

type Title = { id: string; name: string; year: number; rating: string; duration: string; genre: string; synopsis: string; image: string; accent: string; videoUrl?: string; featured?: boolean };
const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const fallback: Title[] = [
  { id: 'the-last-light', name: 'The Last Light', year: 2025, rating: 'U/A 16+', duration: '2h 08m', genre: 'Sci-fi thriller', synopsis: 'When the stars begin to disappear, one radio astronomer discovers a signal that should not exist.', image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1800&q=85', accent: '#283c69', featured: true },
  { id: 'wild-at-heart', name: 'Wild at Heart', year: 2024, rating: 'U/A 13+', duration: '1 Season', genre: 'Nature documentary', synopsis: 'A year in the lives of the remarkable animals rebuilding a wild corner of the world.', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=80', accent: '#48643c' },
  { id: 'blue-hour', name: 'Blue Hour', year: 2025, rating: 'U/A 16+', duration: '6 Episodes', genre: 'Mystery', synopsis: 'A coastal town keeps a secret that surfaces every time the fog rolls in.', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80', accent: '#34546a' },
  { id: 'the-long-way-home', name: 'The Long Way Home', year: 2023, rating: 'U/A 13+', duration: '1h 52m', genre: 'Adventure', synopsis: 'Two estranged siblings take the road trip their father always promised them.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80', accent: '#8c6848' },
  { id: 'after-the-rain', name: 'After the Rain', year: 2025, rating: 'U/A 13+', duration: '8 Episodes', genre: 'Drama', synopsis: 'A neighborhood comes together to rebuild, and finds a new beginning along the way.', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=80', accent: '#434166' },
  { id: 'deep-blue', name: 'Deep Blue', year: 2024, rating: 'U/A 7+', duration: '1h 34m', genre: 'Documentary', synopsis: 'A research crew follows the ocean’s oldest travelers across a changing sea.', image: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=1000&q=80', accent: '#23617a' },
  { id: 'city-of-small-things', name: 'City of Small Things', year: 2024, rating: 'U/A 13+', duration: '2 Seasons', genre: 'Comedy', synopsis: 'The everyday dramas of one apartment building turn out to be anything but ordinary.', image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=80', accent: '#7b544d' },
  { id: 'northbound', name: 'Northbound', year: 2023, rating: 'U/A 16+', duration: '1h 48m', genre: 'Adventure', synopsis: 'A stranded climber and a local guide race the first winter storm down the mountain.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80', accent: '#424d64' },
  { id: 'big-buck-bunny-demo', name: 'Big Buck Bunny', year: 2008, rating: 'U', duration: '10m', genre: 'Open movie · Animation', synopsis: 'A gentle giant rabbit finds a clever way to stand up to three mischievous woodland bullies. Open movie by the Blender Foundation.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/1200px-Big_buck_bunny_poster_big.jpg', accent: '#577e52', videoUrl: 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4' },
];

function App() {
  const [titles, setTitles] = useState<Title[]>(fallback);
  const [active, setActive] = useState<Title>(fallback[0]);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [selected, setSelected] = useState<Title | null>(null);
  const [notice, setNotice] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/titles`).then((r) => r.ok ? r.json() as Promise<Title[]> : Promise.reject()).then((data) => {
      if (data.length) { setTitles(data); setActive(data.find((title) => title.featured) || data[0]); }
    }).catch(() => undefined);
  }, []);

  const filtered = useMemo(() => titles.filter((title) => `${title.name} ${title.genre} ${title.synopsis}`.toLowerCase().includes(query.toLowerCase())), [titles, query]);
  const toggleSaved = (title: Title) => setSaved((items) => items.includes(title.id) ? items.filter((id) => id !== title.id) : [...items, title.id]);
  const play = (title: Title) => {
    if (title.videoUrl) { setSelected(title); return; }
    setNotice('A video source has not been added for this title yet.');
    window.setTimeout(() => setNotice(''), 3200);
  };
  const rows = [
    { name: 'Made for your next night in', items: [...titles.slice(1, 6), ...titles.filter((title) => title.videoUrl)] },
    { name: 'Stories worth staying up for', items: [...titles.slice(2, 6), ...titles.slice(0, 2)] },
    ...(saved.length ? [{ name: 'Your watchlist', items: titles.filter((title) => saved.includes(title.id)) }] : []),
  ];

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Alvaflix home"><span className="brand-mark">A</span><span>alva<span className="brand-light">flix</span></span></a>
      <button className="mobile-toggle icon-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X /> : <Menu />}</button>
      <nav className={mobileMenu ? 'nav-links nav-open' : 'nav-links'}><a className="nav-active" href="#home">Home</a><a href="#series">Series</a><a href="#films">Films</a><a href="#categories">Categories <ChevronDown size={14} /></a></nav>
      <div className="top-actions">
        <div className={searchOpen ? 'search-box search-active' : 'search-box'}><button aria-label="Search titles" className="icon-button" onClick={() => setSearchOpen(!searchOpen)}><Search size={19} /></button>{searchOpen && <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Titles, genres..." onKeyDown={(e) => e.key === 'Escape' && (setSearchOpen(false), setQuery(''))} />}</div>
        <button className="icon-button notification" aria-label="Notifications" onClick={() => { setNotice('You’re all caught up.'); window.setTimeout(() => setNotice(''), 2600); }}><Bell size={19} /><i /></button>
        <button className="profile" aria-label="Profile menu">A<span className="profile-chevron"><ChevronDown size={13} /></span></button>
      </div>
    </header>

    <main id="home">
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, #080b10 1%, rgba(8,11,16,.88) 27%, rgba(8,11,16,.2) 68%), linear-gradient(0deg, #080b10 0%, transparent 35%), url("${active.image}")` }}>
        <div className="hero-copy"><div className="eyebrow"><Sparkles size={13} /> AN ALVAFLIX ORIGINAL</div><div className="series-label">A NEW ORIGINAL SERIES</div><h1>{active.name}</h1><div className="meta"><span className="match">98% match</span><span>{active.year}</span><span className="age-rating">{active.rating}</span><span>{active.duration}</span><span className="ultra">4K UHD</span></div><p>{active.synopsis}</p><div className="hero-buttons"><button className="button-primary" onClick={() => play(active)}><Play size={18} fill="currentColor" /> Play now</button><button className="button-glass" onClick={() => setSelected(active)}>More info <ChevronDown size={17} /></button></div><div className="sound-hint"><Volume2 size={16} /> Trailer audio</div></div>
        <div className="hero-indicators">{titles.slice(0, 5).map((title) => <button key={title.id} aria-label={`Feature ${title.name}`} className={active.id === title.id ? 'indicator indicator-current' : 'indicator'} onClick={() => setActive(title)} />)}</div>
        <div className="hero-side-label">FEATURED THIS WEEK <span>01 / 05</span></div>
      </section>

      {query && <section className="search-results"><div className="section-heading"><div><span className="section-kicker">FIND YOUR NEXT STORY</span><h2>Search results <span>({filtered.length})</span></h2></div><button className="clear-search" onClick={() => setQuery('')}>Clear search</button></div>{filtered.length ? <div className="search-grid">{filtered.map((title) => <Poster key={title.id} title={title} saved={saved.includes(title.id)} onSave={() => toggleSaved(title)} onSelect={() => setSelected(title)} />)}</div> : <p className="empty-state">No titles found. Try another title or genre.</p>}</section>}

      {!query && <section className="catalog" id="series"><div className="catalog-intro"><div><span className="section-kicker">A LITTLE SOMETHING FOR EVERY MOOD</span><h2>Find your next <em>favorite.</em></h2></div><a href="#categories" className="browse-link">Explore all titles <ChevronRight size={16} /></a></div>
        <div className="continue-card"><div className="continue-thumb" style={{ backgroundImage: `url("${titles[2]?.image}")` }}><span className="continue-play"><Play size={14} fill="currentColor" /></span></div><div className="continue-info"><span className="continue-label">PICK UP WHERE YOU LEFT OFF</span><strong>{titles[2]?.name}</strong><span className="episode">Episode 3 · The other side</span><div className="progress-track"><i /></div></div><span className="remaining">22 min left</span><button className="continue-action" onClick={() => play(titles[2])}>Continue <ChevronRight size={15} /></button></div>
        {rows.map((row, index) => <section className="content-row" key={row.name} id={index === 0 ? 'films' : undefined}><div className="row-heading"><div><span className="row-index">0{index + 1}</span><h3>{row.name}</h3></div><div className="row-controls"><button aria-label="Scroll left" onClick={(e) => e.currentTarget.closest('.content-row')?.querySelector('.poster-track')?.scrollBy({ left: -580, behavior: 'smooth' })}><ChevronLeft size={18} /></button><button aria-label="Scroll right" onClick={(e) => e.currentTarget.closest('.content-row')?.querySelector('.poster-track')?.scrollBy({ left: 580, behavior: 'smooth' })}><ChevronRight size={18} /></button></div></div><div className="poster-track">{row.items.map((title, i) => <Poster key={`${row.name}-${title.id}`} title={title} rank={index === 0 ? i + 1 : undefined} saved={saved.includes(title.id)} onSave={() => toggleSaved(title)} onSelect={() => setSelected(title)} />)}</div></section>)}
      </section>}
      <footer><a className="brand footer-brand" href="#home"><span className="brand-mark">A</span><span>alva<span className="brand-light">flix</span></span></a><span>Stories stay with you.</span><span>© 2025 Alvaflix</span><a href="#categories">Help & support</a></footer>
    </main>

    {notice && <div className="toast"><Sparkles size={16} />{notice}</div>}
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="detail-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close icon-button" onClick={() => setSelected(null)} aria-label="Close details"><X /></button>{selected.videoUrl ? <div className="player-frame"><video controls autoPlay playsInline poster={selected.image} src={selected.videoUrl}>Your browser does not support HTML video.</video><span className="player-caption">DEMO VIDEO · Big Buck Bunny © Blender Foundation · CC BY 3.0</span></div> : <div className="modal-art" style={{ backgroundImage: `linear-gradient(0deg,#111820 0%,transparent 80%),url("${selected.image}")` }}><span className="eyebrow"><Sparkles size={13} /> ALVAFLIX ORIGINAL</span></div>}<div className="modal-content"><h2>{selected.name}</h2><div className="meta"><span className="match">98% match</span><span>{selected.year}</span><span className="age-rating">{selected.rating}</span><span>{selected.duration}</span></div><p>{selected.synopsis}</p><div className="hero-buttons">{!selected.videoUrl && <button className="button-primary" onClick={() => play(selected)}><Play size={17} fill="currentColor" /> Play now</button>}<button className="round-action" onClick={() => toggleSaved(selected)} aria-label="Add to watchlist">{saved.includes(selected.id) ? <Check /> : <Plus />}</button></div><div className="detail-extra"><span>GENRE</span><strong>{selected.genre}</strong>{selected.videoUrl ? <><span>LICENSE</span><strong>Blender Foundation · CC BY 3.0</strong></> : <><span>VIDEO</span><strong>Source not configured</strong></>}</div></div></section></div>}
  </div>;
}

function Poster({ title, rank, saved, onSave, onSelect }: { title: Title; rank?: number; saved: boolean; onSave: () => void; onSelect: () => void }) {
  return <article className="poster-card">{rank && <span className="rank">{String(rank).padStart(2, '0')}</span>}<button className="poster-image" onClick={onSelect} aria-label={`Open ${title.name}`} style={{ backgroundImage: `linear-gradient(0deg,rgba(5,8,12,.78),transparent 62%),url("${title.image}")` }}><span className="poster-play"><Play size={16} fill="currentColor" /></span><span className="poster-kind">{title.genre}{title.videoUrl ? ' · DEMO' : ''}</span></button><div className="poster-details"><div><strong>{title.name}</strong><span>{title.year} <i /> {title.duration}</span></div><button className={saved ? 'save-action saved' : 'save-action'} onClick={onSave} aria-label={saved ? `Remove ${title.name} from watchlist` : `Add ${title.name} to watchlist`}>{saved ? <Check size={15} /> : <Plus size={15} />}</button></div></article>;
}

export default App;
