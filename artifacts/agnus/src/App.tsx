import { type ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { BookOpen, ChevronRight, Play, Search } from 'lucide-react';
import { ArtistCard } from '@/components/agnus/ArtistCard';
import { ArtistProfile, type PlayerControls } from '@/components/agnus/ArtistProfile';
import { BottomNavigation } from '@/components/agnus/BottomNavigation';
import { CategoryCard } from '@/components/agnus/CategoryCard';
import { ContinueCard } from '@/components/agnus/ContinueCard';
import { Header } from '@/components/agnus/Header';
import { MiniPlayer, PlayerSheet } from '@/components/agnus/MiniPlayer';
import { MusicCard } from '@/components/agnus/MusicCard';
import { SearchBar } from '@/components/agnus/SearchBar';
import { SearchPage } from '@/components/agnus/SearchPage';
import { StationCard } from '@/components/agnus/StationCard';
import { artists, categories, stations, tracks, type Artist, type Category, type Station, type Track } from '@/components/agnus/data';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home({ player }: { player: PlayerControls }) {
  const [query, setQuery] = useState('');
  const [activeNav, setActiveNav] = useState<'home' | 'search' | 'library' | 'profile'>('home');
  const [notice, setNotice] = useState('');
  const [, setLocation] = useLocation();

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredTracks = useMemo(() => tracks.filter((track) => `${track.title} ${track.artist}`.toLocaleLowerCase().includes(normalizedQuery)), [normalizedQuery]);
  const filteredArtists = useMemo(() => artists.filter((artist) => `${artist.name} ${artist.subtitle}`.toLocaleLowerCase().includes(normalizedQuery)), [normalizedQuery]);
  const filteredCategories = useMemo(() => categories.filter((category) => `${category.title} ${category.detail}`.toLocaleLowerCase().includes(normalizedQuery)), [normalizedQuery]);

  const playTrack = player.onPlayTrack;
  const playStation = (station: Station) => {
    const stationTrack: Track = { id: `station-${station.id}`, title: station.title, artist: station.detail, duration: '∞', art: station.art, tone: 'estação AGNUS' };
    player.onPlayTrack(stationTrack);
  };
  const selectArtist = (artist: Artist) => {
    setLocation(`/artistas/${artist.id}`);
    setActiveNav('home');
  };
  const playArtist = (artist: Artist) => {
    const artistTrack = tracks.find((track) => track.artist === artist.name) ?? {
      id: `artist-${artist.id}`,
      title: 'Primeira luz',
      artist: artist.name,
      duration: '4:06',
      art: artist.art,
      tone: 'faixa em destaque',
    };
    player.onPlayTrack(artistTrack);
  };
  const selectCategory = (category: Category) => {
    const searchLabelByCategory: Record<string, string> = {
      adoracao: 'Adoração',
      oracao: 'Música para oração',
      louvor: 'Louvor',
      congregacional: 'Congregacional',
    };
    setQuery(searchLabelByCategory[category.id] ?? category.title);
    setNotice(`Filtrando por ${category.title}.`);
    window.scrollTo({ top: 250, behavior: 'smooth' });
  };
  const changeNav = (key: 'home' | 'search' | 'library' | 'profile') => {
    setActiveNav(key);
    if (key === 'search') {
      setLocation('/buscar');
      return;
    }
    if (key === 'library') setNotice('Sua biblioteca começa com aquilo que você escolhe guardar.');
    if (key === 'profile') setNotice('Seu perfil AGNUS está pronto para ser personalizado.');
  };
  const notify = () => setNotice('Você está em dia. Novas recomendações aparecem aqui.');
  const discoveryItems: DiscoveryItem[] = [
    { id: 'album-silencio-fogo', eyebrow: 'Álbum', title: artists[0].albums[0].title, detail: `${artists[0].name} · ${artists[0].albums[0].detail}`, art: artists[0].albums[0].art, onOpen: () => playArtist(artists[0]) },
    { id: tracks[2].id, eyebrow: 'Música', title: tracks[2].title, detail: tracks[2].artist, art: tracks[2].art, onOpen: () => playTrack(tracks[2]) },
    { id: artists[1].id, eyebrow: 'Artista', title: artists[1].name, detail: artists[1].genre, art: artists[1].art, photo: artists[1].photo, onOpen: () => selectArtist(artists[1]) },
    { id: tracks[5].id, eyebrow: 'Música', title: tracks[5].title, detail: tracks[5].artist, art: tracks[5].art, onOpen: () => playTrack(tracks[5]) },
  ];
  const curatedPlaylists = [
    { ...categories.find((category) => category.id === 'adoracao')!, title: 'Para adorar' },
    { ...categories.find((category) => category.id === 'oracao')!, title: 'Oração' },
    { ...categories.find((category) => category.id === 'louvor')!, title: 'Louvor' },
    { ...categories.find((category) => category.id === 'congregacional')!, title: 'Momento com Deus' },
  ];
  return (
    <div className="agnus-noise min-h-[100dvh] overflow-x-hidden bg-[#0f100f]">
      <div className="mx-auto min-h-[100dvh] max-w-[1440px] px-4 pb-32 sm:px-7 lg:px-12 xl:px-16">
        <Header activeNav={activeNav} onNavigate={changeNav} onProfile={() => changeNav('profile')} onNotify={notify} />
        <main>
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-8 mt-9 flex flex-col gap-5 md:mb-11 md:flex-row md:items-end md:justify-between">
              <div className="animate-rise">
                 <p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#a18e65]">quinta-feira, 12 de setembro</p>
                <h1 data-testid="text-greeting" className="mt-2 font-display text-[29px] font-bold tracking-[-.045em] text-[#f0ede5] sm:text-[34px]">Boa noite, Marina.</h1>
                <p className="mt-2 max-w-[430px] text-[13px] leading-relaxed text-[#85847d]">Encontre músicas que apontam para Cristo.</p>
              </div>
              <div className="w-full md:max-w-[360px]">
                 <SearchBar value={query} onChange={(value) => { setQuery(value); setActiveNav('search'); }} onFocus={() => setLocation('/buscar')} onFilter={() => setNotice('Filtros avançados chegam em breve.')} />
              </div>
            </div>

            <section data-testid="section-hero" className="agnus-hero animate-rise relative grid grid-cols-[112px_1fr] gap-5 overflow-hidden border border-white/[.09] p-4 shadow-[0_22px_60px_rgba(0,0,0,.2)] sm:grid-cols-[minmax(190px,.72fr)_1.28fr] sm:gap-8 sm:p-8 lg:gap-12 lg:p-10">
              <div className={`agnus-hero-art cover-art relative aspect-square self-center ${tracks[0].art}`}>
                <span className="cover-art-mark">AGNUS · 001</span>
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5">
                  <span className="font-mono-custom text-[7px] uppercase tracking-[.2em] text-white/65 sm:text-[9px]">Adoração</span>
                  <span className="mt-1 max-w-[160px] font-display text-[16px] font-semibold leading-[.94] text-white/90 sm:text-[27px]">Permanece.</span>
                </div>
              </div>
              <div className="relative flex min-h-[190px] flex-col justify-center sm:min-h-[250px]">
                <div className="mb-5 flex items-center gap-3 text-[8px] font-semibold uppercase tracking-[.24em] text-[#d3be88] sm:text-[9px]"><span className="h-px w-6 bg-[#d3be88]" /> Destaque AGNUS <span className="font-mono-custom text-[8px] tracking-[.12em] text-white/35">01 / 05</span></div>
                <div>
                  <h2 className="max-w-[560px] font-display text-[29px] font-semibold leading-[.98] tracking-[-.045em] text-[#f3eee2] sm:text-[54px]">Adoração que permanece.</h2>
                  <p className="mt-4 max-w-[350px] text-[11px] leading-[1.7] text-[#d8d4c9]/75 sm:mt-5 sm:text-[13px]">Uma seleção de músicas para acompanhar seu momento com Deus.</p>
                  <button data-testid="button-hero-play" onClick={() => playTrack(tracks[0])} className="mt-6 inline-flex items-center gap-2.5 border border-[#f4edda]/80 bg-[#eee8d9] px-4 py-2.5 text-[10px] font-bold text-[#25251f] transition hover:-translate-y-0.5 hover:bg-white sm:mt-7 sm:px-5 sm:py-3 sm:text-[11px]"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#25251f] text-[#eee8d9]"><Play size={9} fill="currentColor" /></span> Ouvir agora</button>
                </div>
              </div>
            </section>

             <section data-testid="section-continue" className="agnus-section mt-11 animate-rise" style={{ animationDelay: '.08s' }}>
               <SectionHeading label="Continue ouvindo" detail="Retome de onde você parou" />
               <div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:overflow-visible">
                 {[tracks[0], tracks[4]].map((track) => <ContinueCard key={track.id} track={track} active={player.currentTrack?.id === track.id && player.playing} onPlay={playTrack} />)}
               </div>
             </section>

              <div className="mt-14 space-y-14">
                <section data-testid="section-most-played" className="agnus-section animate-rise" style={{ animationDelay: '.14s' }}>
                  <SectionHeading label="Feito para você" detail="Uma sequência montada para o seu momento" action="Ver tudo" onAction={() => setNotice('Você já está ouvindo uma seleção feita para você.')} />
                  <div className="grid gap-x-8 lg:grid-cols-2">
                    {filteredTracks.slice(1, 5).map((track, index) => <MusicCard key={track.id} track={track} index={index} active={player.currentTrack?.id === track.id && player.playing} onPlay={playTrack} />)}
                    {!filteredTracks.length && <EmptyInline label="Experimente buscar por outro nome." />}
                  </div>
                </section>

                <section data-testid="section-discoveries" className="agnus-section animate-rise" style={{ animationDelay: '.2s' }}>
                  <SectionHeading label="Descubra" detail="Músicas, álbuns e artistas para conhecer" action="Explorar tudo" onAction={() => setLocation('/buscar')} />
                  <div className="scroll-fade -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">
                    {discoveryItems.map((item) => <DiscoveryCard key={item.id} item={item} />)}
                  </div>
                </section>

                <section data-testid="section-artist-rise" className="agnus-section animate-rise" style={{ animationDelay: '.23s' }}>
                  <SectionHeading label="Novos na AGNUS" detail="Descubra artistas independentes para acompanhar" action="Explorar artistas" onAction={() => setNotice('Estas são as vozes independentes selecionadas para você.')} />
                  <div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">
                    {filteredArtists.map((artist) => <ArtistCard key={artist.id} artist={artist} onSelect={selectArtist} onListen={playArtist} />)}
                    {!filteredArtists.length && <EmptyInline label="Nenhuma voz encontrada." />}
                  </div>
                </section>

                <section data-testid="section-adoration" className="agnus-section agnus-section-secondary animate-rise" style={{ animationDelay: '.26s' }}>
                  <SectionHeading label="Para adorar" detail="Playlists para cada momento com Deus" />
                  <div className="scroll-fade -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">
                    {curatedPlaylists.map((category) => <CategoryCard key={category.id} category={category} onSelect={selectCategory} />)}
                  </div>
                </section>

                <section data-testid="section-adoration-tracks" className="agnus-section agnus-section-secondary animate-rise" style={{ animationDelay: '.29s' }}>
                  <SectionHeading label="Adoração" detail="Uma seleção para permanecer" />
                  <div className="grid gap-x-8 lg:grid-cols-2">
                    {tracks.slice(0, 4).map((track, index) => <MusicCard key={track.id} track={track} index={index} active={player.currentTrack?.id === track.id && player.playing} onPlay={playTrack} />)}
                  </div>
                </section>

                <section data-testid="section-new-releases" className="agnus-section agnus-section-secondary animate-rise" style={{ animationDelay: '.28s' }}>
                  <SectionHeading label="Novos lançamentos" detail="Faixas recentes para descobrir" />
                  <div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">
                    {[tracks[4], tracks[5], tracks[0]].map((track) => <ContinueCard key={track.id} track={track} active={player.currentTrack?.id === track.id && player.playing} onPlay={playTrack} />)}
                  </div>
                </section>

                <section data-testid="section-explore" className="agnus-section agnus-section-secondary animate-rise" style={{ animationDelay: '.32s' }}>
                  <SectionHeading label="Explore por intenção" detail="Encontre o som para hoje" />
                  <div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">
                    {filteredCategories.map((category) => <CategoryCard key={category.id} category={category} onSelect={selectCategory} />)}
                    {!filteredCategories.length && <EmptyInline label="Nenhuma categoria encontrada." />}
                  </div>
                </section>

                <section data-testid="section-stations" className="agnus-section agnus-section-secondary animate-rise" style={{ animationDelay: '.36s' }}>
                  <SectionHeading label="Estações para você" detail="Deixe a próxima música chegar" />
                  <div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">
                    {stations.map((station) => <StationCard key={station.id} station={station} onPlay={playStation} />)}
                  </div>
                </section>
              </div>

             {(normalizedQuery || activeNav !== 'home' || notice) && <div data-testid="status-search-feedback" className="mt-8 flex items-center gap-3 rounded-2xl border border-white/[.07] bg-[#151615] px-4 py-3 text-[12px] text-[#aaa79d]"><Search size={15} className="text-[#c7ae76]" /> {notice || `${filteredTracks.length + filteredArtists.length + filteredCategories.length} resultados para “${query}”`}</div>}
          </div>
        </main>
      </div>
       {player.currentTrack && <MiniPlayer track={player.currentTrack} playing={player.playing} onToggle={player.onToggle} onOpen={player.onOpen} onPrevious={player.onPrevious} onNext={player.onNext} />}
       {player.currentTrack && player.playerOpen && <PlayerSheet track={player.currentTrack} playing={player.playing} onToggle={player.onToggle} onClose={player.onClose} onPrevious={player.onPrevious} onNext={player.onNext} />}
      <BottomNavigation active={activeNav} onChange={changeNav} />
    </div>
  );
}

type DiscoveryItem = { id: string; eyebrow: string; title: string; detail: string; art: string; photo?: string; onOpen: () => void };

function DiscoveryCard({ item }: { item: DiscoveryItem }) {
  return (
    <button data-testid={`card-discovery-${item.id}`} onClick={item.onOpen} className="group w-[148px] shrink-0 text-left sm:w-[166px]">
      <div className={`relative aspect-square overflow-hidden rounded-[14px] ${item.art} cover-art transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_32px_rgba(0,0,0,.28)]`}>
        {item.photo && <img src={item.photo} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-screen transition duration-500 group-hover:scale-[1.04] group-hover:opacity-95" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10120f]/90 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 right-3 font-mono-custom text-[8px] uppercase tracking-[.16em] text-white/70">{item.eyebrow}</span>
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[11px] text-white/80 opacity-0 transition group-hover:opacity-100">▶</span>
      </div>
      <p className="mt-3 truncate text-[13px] font-semibold text-[#e9e5dc]">{item.title}</p>
      <p className="mt-1 truncate text-[10px] text-[#777770]">{item.detail}</p>
    </button>
  );
}

function SectionHeading({ label, detail, action, onAction }: { label: string; detail?: string; action?: string; onAction?: () => void }) {
  return <div className="mb-4 flex items-end justify-between gap-3"><div><h2 className="font-display text-[19px] font-bold tracking-[-.035em] text-[#eeebe3]">{label}</h2>{detail && <p className="mt-1 text-[11px] text-[#777770]">{detail}</p>}</div>{action && <button data-testid={`button-section-${label.toLocaleLowerCase().replaceAll(' ', '-')}`} onClick={onAction} className="shrink-0 text-[10px] font-semibold text-[#af996b] transition hover:text-[#d8c18b]">{action} <ChevronRight size={12} className="ml-0.5 inline" /></button>}</div>;
}

function EmptyInline({ label }: { label: string }) {
  return <div data-testid="status-empty-results" className="flex min-h-20 items-center gap-3 rounded-2xl border border-dashed border-white/[.1] px-4 text-[12px] text-[#85837b]"><BookOpen size={16} className="text-[#958361]" />{label}</div>;
}

function Router({ player }: { player: PlayerControls }) {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={() => <Home player={player} />} />
        <Route path="/buscar" component={() => <SearchPage player={player} />} />
        <Route path="/artistas/:id" component={() => <ArtistProfile player={player} />} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);

  const moveTrack = (direction: 1 | -1) => {
    if (!currentTrack) return;
    const index = tracks.findIndex((track) => track.id === currentTrack.id);
    const next = tracks[(index + direction + tracks.length) % tracks.length];
    setCurrentTrack(next);
    setPlaying(true);
  };

  const player: PlayerControls = {
    currentTrack,
    playing,
    playerOpen,
    onPlayTrack: (track) => {
      setCurrentTrack(track);
      setPlaying(true);
    },
    onToggle: () => setPlaying((value) => !value),
    onOpen: () => setPlayerOpen(true),
    onClose: () => setPlayerOpen(false),
    onPrevious: () => moveTrack(-1),
    onNext: () => moveTrack(1),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router player={player} />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
