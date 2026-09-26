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
    setQuery(category.title);
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
  return (
    <div className="agnus-noise min-h-[100dvh] overflow-x-hidden bg-[#0f100f]">
      <div className="mx-auto min-h-[100dvh] max-w-[1440px] px-4 pb-32 sm:px-7 lg:px-12 xl:px-16">
        <Header onProfile={() => changeNav('profile')} onNotify={notify} />
        <main>
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
              <div className="animate-rise">
                 <p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#a18e65]">quinta-feira, 12 de setembro</p>
                <h1 data-testid="text-greeting" className="mt-2 font-display text-[29px] font-bold tracking-[-.045em] text-[#f0ede5] sm:text-[34px]">Boa noite, Marina.</h1>
                <p className="mt-2 max-w-[430px] text-[13px] leading-relaxed text-[#85847d]">Encontre músicas que apontam para Cristo.</p>
              </div>
              <div className="w-full md:max-w-[360px]">
                 <SearchBar value={query} onChange={(value) => { setQuery(value); setActiveNav('search'); }} onFocus={() => setLocation('/buscar')} onFilter={() => setNotice('Filtros avançados chegam em breve.')} />
              </div>
            </div>

            <section data-testid="section-hero" className="animate-rise relative min-h-[292px] overflow-hidden rounded-[26px] border border-white/[.08] art-hero p-6 shadow-[0_20px_60px_rgba(0,0,0,.18)] sm:min-h-[330px] sm:p-9 lg:min-h-[360px] lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-r from-[#171914]/95 via-[#24271f]/70 to-transparent" />
              <div className="absolute right-[8%] top-[15%] h-36 w-36 rounded-full border border-[#e4d5ac]/20 sm:h-60 sm:w-60" />
              <div className="absolute right-[13%] top-[24%] h-24 w-24 rounded-full border border-[#e4d5ac]/15 sm:h-40 sm:w-40" />
              <div className="relative flex h-full max-w-[520px] flex-col justify-end">
                <div className="mb-auto flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-[#d3be88]"><span className="h-1.5 w-1.5 rounded-full bg-[#d3be88]" /> Destaque AGNUS</div>
                <div>
                  <h2 className="font-display text-[31px] font-bold leading-[1.04] tracking-[-.055em] text-[#f3eee2] sm:text-[45px]">Adoração que<br className="hidden sm:block" /> permanece.</h2>
                  <p className="mt-4 max-w-[330px] text-[12px] leading-[1.7] text-[#d8d4c9]/75 sm:text-[13px]">Uma seleção de músicas para acompanhar seu momento com Deus.</p>
                  <button data-testid="button-hero-play" onClick={() => playTrack(tracks[0])} className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#eee8d9] px-5 py-3 text-[11px] font-bold text-[#25251f] transition hover:-translate-y-0.5 hover:bg-white"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#25251f] text-[#eee8d9]"><Play size={9} fill="currentColor" /></span> Ouvir agora</button>
                </div>
              </div>
            </section>

             <section data-testid="section-continue" className="mt-8 animate-rise" style={{ animationDelay: '.08s' }}>
               <SectionHeading label="Continue ouvindo" detail="Retome de onde você parou" />
               <div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:overflow-visible">
                 {[tracks[0], tracks[4]].map((track) => <ContinueCard key={track.id} track={track} active={player.currentTrack?.id === track.id && player.playing} onPlay={playTrack} />)}
               </div>
             </section>

             <div className="mt-8">
               <div className="min-w-0">
                <section data-testid="section-explore" className="animate-rise" style={{ animationDelay: '.08s' }}>
                  <SectionHeading label="Explore" detail="Encontre o som para hoje" />
                  <div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">
                    {filteredCategories.map((category) => <CategoryCard key={category.id} category={category} onSelect={selectCategory} />)}
                    {!filteredCategories.length && <EmptyInline label="Nenhuma categoria encontrada." />}
                  </div>
                </section>

                <section data-testid="section-most-played" className="mt-11 animate-rise" style={{ animationDelay: '.14s' }}>
                  <SectionHeading label="Mais ouvidas" detail="O que está chegando mais longe" action="Ver tudo" onAction={() => setNotice('Você já está ouvindo as faixas mais ouvidas.')} />
                  <div className="divide-y divide-white/[.055]">
                     {filteredTracks.slice(0, 4).map((track, index) => <MusicCard key={track.id} track={track} index={index} active={player.currentTrack?.id === track.id && player.playing} onPlay={playTrack} />)}
                    {!filteredTracks.length && <EmptyInline label="Experimente buscar por outro nome." />}
                  </div>
                </section>

                 <section data-testid="section-discoveries" className="mt-11 animate-rise" style={{ animationDelay: '.2s' }}>
                   <SectionHeading label="Descobertas do AGNUS" detail="Novas vozes. Novas histórias. A mesma fé." action="Explorar artistas" onAction={() => setNotice('Estas são as vozes independentes selecionadas para você.')} />
                  <div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">
                     {filteredArtists.map((artist) => <ArtistCard key={artist.id} artist={artist} onSelect={selectArtist} onListen={playArtist} />)}
                    {!filteredArtists.length && <EmptyInline label="Nenhuma voz encontrada." />}
                  </div>
                </section>

                 <section data-testid="section-artist-rise" className="mt-11 animate-rise" style={{ animationDelay: '.24s' }}>
                   <SectionHeading label="Artistas em ascensão" detail="Novos nomes para acompanhar" action="Ver todos" onAction={() => setNotice('Você está vendo os artistas que mais estão crescendo no AGNUS.')} />
                   <div className="grid gap-4 lg:grid-cols-[minmax(240px,.9fr)_minmax(0,1.8fr)]">
                     <div className="relative overflow-hidden rounded-[20px] border border-white/[.07] bg-[#151615] p-5">
                       <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full border border-[#c7ae76]/15" />
                       <div className="relative flex items-start justify-between gap-4">
                         <div>
                           <p className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#958361]">Em destaque</p>
                           <h3 className="mt-2 font-display text-[18px] font-bold tracking-[-.035em] text-[#eeeae0]">Gabriel Santos</h3>
                           <p className="mt-1 text-[11px] text-[#7f7e77]">Adoração · Independente</p>
                         </div>
                         <div className="art-amber artist-art relative flex h-12 w-12 shrink-0 items-end rounded-[15px] p-2 text-[10px] font-bold text-white/80">GS</div>
                       </div>
                       <p className="relative mt-5 max-w-[280px] text-[12px] leading-[1.65] text-[#89877f]">Conheça um dos novos nomes que estão chegando ao AGNUS.</p>
                       <button data-testid="button-artist-profile" onClick={() => selectArtist(artists[0])} className="relative mt-5 flex items-center gap-2 text-[11px] font-semibold text-[#d2bd88] transition hover:text-[#f0d69b]">Conhecer artista <ChevronRight size={14} /></button>
                     </div>
                     <div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">
                        {artists.slice(1, 4).map((artist) => <ArtistCard key={artist.id} artist={artist} onSelect={selectArtist} onListen={playArtist} />)}
                     </div>
                   </div>
                 </section>

                <section data-testid="section-stations" className="mt-11 animate-rise" style={{ animationDelay: '.26s' }}>
                  <SectionHeading label="Estações para você" detail="Deixe a próxima música chegar" />
                  <div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">
                    {stations.map((station) => <StationCard key={station.id} station={station} onPlay={playStation} />)}
                  </div>
                </section>
              </div>
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
