import { ArrowLeft, Check, ChevronRight, Play, Radio, UserPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { ArtistCard } from './ArtistCard';
import { BottomNavigation } from './BottomNavigation';
import { MiniPlayer, PlayerSheet } from './MiniPlayer';
import { MusicCard } from './MusicCard';
import { artists, tracks, type Artist, type Track } from './data';

export type PlayerControls = {
  currentTrack: Track | null;
  playing: boolean;
  playerOpen: boolean;
  onPlayTrack: (track: Track) => void;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

function artistTrack(artist: Artist): Track {
  return {
    id: `artist-${artist.id}`,
    title: `Primeira luz`,
    artist: artist.name,
    duration: '4:06',
    art: artist.art,
    tone: 'faixa em destaque',
  };
}

function ProfileHeading({ eyebrow, title, detail }: { eyebrow?: string; title: string; detail?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#958361]">{eyebrow}</p>}
        <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-.035em] text-[#eeebe3]">{title}</h2>
        {detail && <p className="mt-1 text-[11px] text-[#777770]">{detail}</p>}
      </div>
    </div>
  );
}

export function ArtistProfile({ player }: { player: PlayerControls }) {
  const [, params] = useRoute('/artistas/:id');
  const [, setLocation] = useLocation();
  const [following, setFollowing] = useState(false);
  const artist = artists.find((item) => item.id === params?.id) ?? artists[0];
  const artistSongs = useMemo(() => {
    const existing = tracks.filter((track) => track.artist === artist.name);
    return existing.length ? existing : [artistTrack(artist)];
  }, [artist]);
  const suggestions = artists.filter((item) => item.id !== artist.id).slice(0, 3);

  const playArtist = (selectedArtist: Artist) => {
    const firstTrack = tracks.find((track) => track.artist === selectedArtist.name) ?? artistTrack(selectedArtist);
    player.onPlayTrack(firstTrack);
  };

  return (
    <div className="agnus-noise min-h-[100dvh] overflow-x-hidden bg-[#0f100f]">
      <div className="mx-auto min-h-[100dvh] max-w-[1440px] px-4 pb-32 sm:px-7 lg:px-12 xl:px-16">
        <header className="flex items-center justify-between pb-7 pt-5 md:pb-9 md:pt-8">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 rounded-full px-1 py-2 text-[11px] font-semibold text-[#aaa69c] transition hover:text-[#eeeae1]">
            <ArrowLeft size={17} />
            Voltar para descobertas
          </button>
          <span className="font-mono-custom text-[9px] uppercase tracking-[.2em] text-[#77746b]">Perfil do artista</span>
        </header>

        <main className="mx-auto max-w-[1180px]">
          <section className="relative overflow-hidden rounded-[26px] border border-white/[.08] bg-[#181916] p-5 sm:p-8 lg:p-10">
            <div className={`absolute inset-0 ${artist.art} opacity-20`} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#151613] via-[#151613]/90 to-[#151613]/35" />
            <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end">
              <img src={artist.photo} alt={`Foto de ${artist.name}`} className="h-32 w-32 shrink-0 rounded-[22px] object-cover shadow-[0_18px_40px_rgba(0,0,0,.28)] sm:h-44 sm:w-44 sm:rounded-[26px]" />
              <div className="max-w-[580px]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-[#c7ae76]/30 bg-[#c7ae76]/[.08] px-2 py-1 font-mono-custom text-[8px] uppercase tracking-[.14em] text-[#d5be86]">Artista independente</span>
                  {artist.badge && <span className="rounded-md border border-white/10 bg-white/[.04] px-2 py-1 font-mono-custom text-[8px] uppercase tracking-[.14em] text-[#a7a399]">{artist.badge}</span>}
                </div>
                <h1 className="mt-4 font-display text-[34px] font-bold tracking-[-.055em] text-[#f1ede4] sm:text-[50px]">{artist.name}</h1>
                <p className="mt-2 text-[12px] text-[#aaa69c]">{artist.genre} · {artist.trackCount} músicas · {artist.subtitle.split('·')[1]?.trim()}</p>
                <p className="mt-4 max-w-[490px] text-[13px] leading-[1.7] text-[#c0bcb2]">{artist.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <button onClick={() => player.onPlayTrack(artistSongs[0])} className="inline-flex items-center gap-2 rounded-full bg-[#eee8d9] px-5 py-3 text-[11px] font-bold text-[#25251f] transition hover:-translate-y-0.5 hover:bg-white">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#25251f] text-[#eee8d9]"><Play size={9} fill="currentColor" /></span>
                    Reproduzir
                  </button>
                  <button onClick={() => setFollowing((value) => !value)} className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[11px] font-semibold transition ${following ? 'border-[#c7ae76]/45 bg-[#c7ae76]/10 text-[#dec88f]' : 'border-white/[.12] text-[#d0ccc2] hover:border-[#c7ae76]/35 hover:text-[#dec88f]'}`}>
                    {following ? <Check size={14} /> : <UserPlus size={14} />}
                    {following ? 'Seguindo' : 'Seguir'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(270px,.65fr)]">
            <div className="min-w-0">
              <section>
                <ProfileHeading eyebrow="Discografia" title="Músicas" detail="As faixas que apresentam a voz de um novo artista." />
                <div className="divide-y divide-white/[.055]">
                  {artistSongs.map((track, index) => <MusicCard key={track.id} track={track} index={index} active={player.currentTrack?.id === track.id && player.playing} onPlay={player.onPlayTrack} />)}
                </div>
              </section>

              <section className="mt-12">
                <ProfileHeading eyebrow="Coleção" title="Álbuns" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {artist.albums.map((album) => (
                    <button key={album.id} onClick={() => player.onPlayTrack(artistSongs[0])} className="group text-left">
                      <div className={`relative aspect-square overflow-hidden rounded-[18px] ${album.art} cover-art transition duration-300 group-hover:-translate-y-1`}>
                        <span className="cover-art-mark">AGNUS</span>
                        <span className="absolute bottom-3 left-3 right-3 font-display text-[15px] font-bold leading-tight text-white/90">{album.title}</span>
                      </div>
                      <p className="mt-3 truncate text-[12px] font-semibold text-[#e9e5dc]">{album.title}</p>
                      <p className="mt-1 text-[10px] text-[#777770]">{album.detail}</p>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-4">
              <section className="rounded-[22px] border border-white/[.07] bg-[#151615] p-5">
                <ProfileHeading eyebrow="Ouça sem parar" title="Estação do artista" />
                <button onClick={() => player.onPlayTrack(artistSongs[0])} className={`group relative flex w-full items-end overflow-hidden rounded-[18px] ${artist.station.art} p-4 text-left`}>
                  <Radio size={18} className="absolute right-4 top-4 text-white/65" />
                  <div>
                    <p className="text-[14px] font-semibold text-white/90">{artist.station.title}</p>
                    <p className="mt-1 text-[10px] text-white/60">{artist.station.detail}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold text-white/80 transition group-hover:text-white"><Play size={11} fill="currentColor" /> Reproduzir estação</span>
                  </div>
                </button>
              </section>

              <section className="rounded-[22px] border border-white/[.07] bg-[#151615] p-5">
                <ProfileHeading eyebrow="Sobre" title="Uma voz independente" />
                <p className="text-[12px] leading-[1.75] text-[#89877f]">O AGNUS abre espaço para artistas que estão construindo sua primeira comunidade de ouvintes com verdade, cuidado e uma canção de cada vez.</p>
                <div className="mt-5 flex items-center gap-2 text-[10px] text-[#78766e]"><UserPlus size={14} className="text-[#c7ae76]" /> Descoberto por ouvintes do AGNUS</div>
              </section>
            </aside>
          </div>

          <section className="mt-14">
            <ProfileHeading eyebrow="Mais para você" title="Você também pode gostar" detail="Outras vozes independentes para descobrir." />
            <div className="scroll-fade -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0">
              {suggestions.map((suggestion) => (
                <ArtistCard key={suggestion.id} artist={suggestion} onSelect={() => setLocation(`/artistas/${suggestion.id}`)} onListen={playArtist} />
              ))}
            </div>
          </section>
        </main>
      </div>

      {player.currentTrack && <MiniPlayer track={player.currentTrack} playing={player.playing} onToggle={player.onToggle} onOpen={player.onOpen} onPrevious={player.onPrevious} onNext={player.onNext} />}
      {player.currentTrack && player.playerOpen && <PlayerSheet track={player.currentTrack} playing={player.playing} onToggle={player.onToggle} onClose={player.onClose} onPrevious={player.onPrevious} onNext={player.onNext} />}
      <BottomNavigation active="home" onChange={() => setLocation('/')} />
    </div>
  );
}