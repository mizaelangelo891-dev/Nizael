import { ArrowLeft, Clock3, Headphones, Search, Sparkles, X } from 'lucide-react';
import { type ReactNode, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { ArtistCard } from './ArtistCard';
import { BottomNavigation } from './BottomNavigation';
import { CategoryCard } from './CategoryCard';
import { MiniPlayer, PlayerSheet } from './MiniPlayer';
import { MusicCard } from './MusicCard';
import { StationCard } from './StationCard';
import { artists, categories, stations, tracks, type Artist, type Station, type Track } from './data';
import type { PlayerControls } from './ArtistProfile';

type AlbumResult = {
  id: string;
  title: string;
  detail: string;
  art: string;
  artist: Artist;
};

const recentSeed = ['Adoração', 'Gabriel Santos', 'Novidades'];

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

function SearchSection({ title, count, children }: { title: string; count?: number; children: ReactNode }) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-[19px] font-bold tracking-[-.035em] text-[#eeebe3]">{title}</h2>
        {typeof count === 'number' && <span className="font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#706f68]">{count} {count === 1 ? 'resultado' : 'resultados'}</span>}
      </div>
      {children}
    </section>
  );
}

function SuggestionRow({ label, detail, onSelect }: { label: string; detail: string; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/[.045]">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[.08] bg-white/[.035] text-[#aaa69c]"><Search size={14} /></span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12px] font-semibold text-[#e9e5dc]">{label}</span>
        <span className="mt-0.5 block text-[10px] text-[#777770]">{detail}</span>
      </span>
    </button>
  );
}

function AlbumResultCard({ album, onPlay }: { album: AlbumResult; onPlay: () => void }) {
  return (
    <button onClick={onPlay} className="group w-[160px] shrink-0 text-left sm:w-[176px]">
      <div className={`relative aspect-square overflow-hidden rounded-[19px] ${album.art} cover-art transition duration-300 group-hover:-translate-y-1`}>
        <span className="cover-art-mark">AGNUS</span>
        <span className="absolute bottom-3 left-3 right-3 font-display text-[15px] font-bold leading-tight text-white/90">{album.title}</span>
      </div>
      <p className="mt-3 truncate text-[13px] font-semibold text-[#e9e5dc]">{album.title}</p>
      <p className="mt-1 truncate text-[10px] text-[#777770]">{album.artist.name} · {album.detail}</p>
    </button>
  );
}

export function SearchPage({ player }: { player: PlayerControls }) {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(recentSeed);
  const [libraryIds, setLibraryIds] = useState<Set<string>>(new Set());
  const normalizedQuery = normalize(query);
  const hasQuery = Boolean(normalizedQuery);

  const albums = useMemo<AlbumResult[]>(() => artists.flatMap((artist) => artist.albums.map((album) => ({ ...album, artist }))), []);
  const results = useMemo(() => {
    const matches = (value: string) => !normalizedQuery || normalize(value).includes(normalizedQuery);
    const matchedTracks = tracks.filter((track) => matches(`${track.title} ${track.artist} ${track.tone}`));
    const matchedArtists = artists.filter((artist) => matches(`${artist.name} ${artist.subtitle} ${artist.genre}`));
    const matchedAlbums = albums.filter((album) => matches(`${album.title} ${album.detail} ${album.artist.name}`));
    const matchedGenres = categories.filter((category) => matches(`${category.title} ${category.detail}`));
    const matchedStations = stations.filter((station) => matches(`${station.title} ${station.detail}`));
    return { matchedTracks, matchedArtists, matchedAlbums, matchedGenres, matchedStations };
  }, [albums, normalizedQuery]);

  const suggestions = useMemo(() => {
    if (!hasQuery) return [];
    const match = (value: string) => normalize(value).includes(normalizedQuery);
    return [
      ...tracks.filter((track) => match(`${track.title} ${track.artist}`)).slice(0, 2).map((track) => ({ label: track.title, detail: `Música · ${track.artist}` })),
      ...artists.filter((artist) => match(`${artist.name} ${artist.genre}`)).slice(0, 2).map((artist) => ({ label: artist.name, detail: `Artista · ${artist.genre}` })),
      ...categories.filter((category) => match(`${category.title} ${category.detail}`)).slice(0, 1).map((category) => ({ label: category.title, detail: 'Gênero · AGNUS' })),
      ...stations.filter((station) => match(`${station.title} ${station.detail}`)).slice(0, 1).map((station) => ({ label: station.title, detail: 'Estação · AGNUS' })),
    ].slice(0, 5);
  }, [hasQuery, normalizedQuery]);

  const totalResults = Object.values(results).reduce((total, items) => total + items.length, 0);
  const playArtist = (artist: Artist) => {
    const track = tracks.find((item) => item.artist === artist.name) ?? { id: `artist-${artist.id}`, title: 'Primeira luz', artist: artist.name, duration: '4:06', art: artist.art, tone: 'faixa em destaque' };
    player.onPlayTrack(track);
  };
  const playStation = (station: Station) => {
    player.onPlayTrack({ id: `station-${station.id}`, title: station.title, artist: station.detail, duration: '∞', art: station.art, tone: 'estação AGNUS' });
  };
  const toggleLibrary = (track: Track) => {
    setLibraryIds((current) => {
      const next = new Set(current);
      if (next.has(track.id)) next.delete(track.id);
      else next.add(track.id);
      return next;
    });
  };
  const submitSearch = (value = query) => {
    const clean = value.trim();
    if (!clean) return;
    setRecentSearches((current) => [clean, ...current.filter((item) => normalize(item) !== normalize(clean))].slice(0, 5));
    setQuery(clean);
  };

  return (
    <div className="agnus-noise min-h-[100dvh] overflow-x-hidden bg-[#0f100f]">
      <div className="mx-auto min-h-[100dvh] max-w-[1440px] px-4 pb-32 sm:px-7 lg:px-12 xl:px-16">
        <header className="flex items-center justify-between pb-7 pt-5 md:pb-9 md:pt-8">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 rounded-full px-1 py-2 text-[11px] font-semibold text-[#aaa69c] transition hover:text-[#eeeae1]">
            <ArrowLeft size={17} /> Voltar para início
          </button>
          <span className="font-mono-custom text-[9px] uppercase tracking-[.2em] text-[#77746b]">Busca AGNUS</span>
        </header>

        <main className="mx-auto max-w-[1180px]">
          <div className="max-w-[760px] animate-rise">
            <p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#a18e65]">Encontre seu próximo som</p>
            <h1 className="mt-3 font-display text-[32px] font-bold tracking-[-.055em] text-[#f0ede5] sm:text-[45px]">O que você quer ouvir?</h1>
            <p className="mt-3 text-[13px] leading-relaxed text-[#85847d]">Busque músicas, artistas independentes, álbuns, gêneros e estações do AGNUS.</p>
          </div>

          <form onSubmit={(event) => { event.preventDefault(); submitSearch(); }} className="relative mt-7 animate-rise" style={{ animationDelay: '.08s' }}>
            <div className="group flex h-16 items-center gap-3 rounded-[20px] border border-white/[.1] bg-[#171817] px-5 transition focus-within:border-[#c7ae76]/55 focus-within:bg-[#1b1c1a]">
              <Search size={21} strokeWidth={1.8} className="shrink-0 text-[#817f77] transition group-focus-within:text-[#c7ae76]" />
              <input autoFocus data-testid="input-search-page" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar músicas, artistas, álbuns, gêneros ou estações" className="min-w-0 flex-1 bg-transparent text-[14px] text-[#efede6] outline-none placeholder:text-[#74736e]" />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Limpar busca" className="flex h-8 w-8 items-center justify-center rounded-full text-[#777770] transition hover:bg-white/[.06] hover:text-[#eeeae1]"><X size={15} /></button>}
              <button type="submit" className="hidden rounded-full bg-[#eee8d9] px-4 py-2.5 text-[11px] font-bold text-[#25251f] transition hover:bg-white sm:block">Buscar</button>
            </div>
            {hasQuery && suggestions.length > 0 && (
              <div className="absolute inset-x-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[18px] border border-white/[.1] bg-[#181917] py-2 shadow-[0_20px_50px_rgba(0,0,0,.35)]">
                <div className="px-4 pb-2 pt-1 font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#83765c]">Sugestões</div>
                {suggestions.map((suggestion) => <SuggestionRow key={`${suggestion.detail}-${suggestion.label}`} label={suggestion.label} detail={suggestion.detail} onSelect={() => submitSearch(suggestion.label)} />)}
              </div>
            )}
          </form>

          {!hasQuery && (
            <section className="mt-9 animate-rise" style={{ animationDelay: '.14s' }}>
              <div className="mb-4 flex items-center gap-2"><Clock3 size={15} className="text-[#a18e65]" /><h2 className="font-display text-[16px] font-bold text-[#e9e5dc]">Pesquisas recentes</h2></div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item) => <button key={item} onClick={() => submitSearch(item)} className="rounded-full border border-white/[.09] bg-white/[.025] px-3.5 py-2 text-[11px] text-[#aaa69c] transition hover:border-[#c7ae76]/35 hover:text-[#dec88f]">{item}</button>)}
              </div>
            </section>
          )}

          {hasQuery && totalResults === 0 && (
            <section className="mt-12 flex min-h-[250px] flex-col items-center justify-center rounded-[24px] border border-dashed border-white/[.1] bg-[#141514] px-6 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c7ae76]/25 bg-[#c7ae76]/[.08] text-[#c7ae76]"><Sparkles size={19} /></span>
              <h2 className="mt-5 font-display text-[20px] font-bold text-[#ebe7de]">Nada apareceu por aqui</h2>
              <p className="mt-2 max-w-[390px] text-[12px] leading-relaxed text-[#85837b]">Tente buscar por “adoração”, “Gabriel”, “novidades” ou pelo nome de uma estação.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">{['Adoração', 'Gabriel Santos', 'Novidades'].map((item) => <button key={item} onClick={() => submitSearch(item)} className="rounded-full border border-white/[.09] px-3 py-2 text-[10px] font-semibold text-[#b8a475] transition hover:border-[#c7ae76]/40">{item}</button>)}</div>
            </section>
          )}

          {hasQuery && totalResults > 0 && (
            <p className="mt-9 flex items-center gap-2 text-[11px] text-[#85837b]"><Headphones size={14} className="text-[#c7ae76]" /> {totalResults} resultados para <span className="font-semibold text-[#d4c08e]">“{query}”</span></p>
          )}

          {results.matchedTracks.length > 0 && <SearchSection title="Músicas" count={results.matchedTracks.length}><div className="divide-y divide-white/[.055]">{results.matchedTracks.map((track, index) => <MusicCard key={track.id} track={track} index={index} active={player.currentTrack?.id === track.id && player.playing} onPlay={player.onPlayTrack} onAddToLibrary={toggleLibrary} inLibrary={libraryIds.has(track.id)} />)}</div></SearchSection>}

          {results.matchedArtists.length > 0 && <SearchSection title="Artistas" count={results.matchedArtists.length}><div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">{results.matchedArtists.map((artist) => <ArtistCard key={artist.id} artist={artist} onSelect={() => setLocation(`/artistas/${artist.id}`)} onListen={playArtist} />)}</div></SearchSection>}

          {results.matchedAlbums.length > 0 && <SearchSection title="Álbuns" count={results.matchedAlbums.length}><div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">{results.matchedAlbums.map((album) => <AlbumResultCard key={album.id} album={album} onPlay={() => playArtist(album.artist)} />)}</div></SearchSection>}

          {results.matchedGenres.length > 0 && <SearchSection title="Gêneros" count={results.matchedGenres.length}><div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">{results.matchedGenres.map((category) => <CategoryCard key={category.id} category={category} onSelect={() => submitSearch(category.title)} />)}</div></SearchSection>}

          {results.matchedStations.length > 0 && <SearchSection title="Estações" count={results.matchedStations.length}><div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">{results.matchedStations.map((station) => <StationCard key={station.id} station={station} onPlay={playStation} />)}</div></SearchSection>}
        </main>
      </div>

      {player.currentTrack && <MiniPlayer track={player.currentTrack} playing={player.playing} onToggle={player.onToggle} onOpen={player.onOpen} onPrevious={player.onPrevious} onNext={player.onNext} />}
      {player.currentTrack && player.playerOpen && <PlayerSheet track={player.currentTrack} playing={player.playing} onToggle={player.onToggle} onClose={player.onClose} onPrevious={player.onPrevious} onNext={player.onNext} />}
      <BottomNavigation active="search" onChange={(key) => { if (key === 'home') setLocation('/'); if (key === 'profile') setLocation('/'); if (key === 'library') setLocation('/'); }} />
    </div>
  );
}