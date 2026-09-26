import { useState } from 'react';
import { ChevronDown, Heart, ListMusic, Pause, Play, SkipBack, SkipForward, X } from 'lucide-react';
import type { Track } from './data';

type MiniPlayerProps = { track: Track | null; playing: boolean; onToggle: () => void; onOpen: () => void; onPrevious: () => void; onNext: () => void };

export function MiniPlayer({ track, playing, onToggle, onOpen, onPrevious, onNext }: MiniPlayerProps) {
  if (!track) return null;
  return (
    <div data-testid="mini-player" className="fixed inset-x-3 bottom-[72px] z-20 mx-auto max-w-3xl animate-soft-in md:bottom-5">
      <div className="relative flex h-[62px] items-center gap-3 border border-white/[.1] bg-[#171816]/[.97] px-2.5 shadow-[0_18px_50px_rgba(0,0,0,.45)] backdrop-blur-xl">
        <button data-testid="button-open-player" onClick={onOpen} className={`agnus-artwork relative h-11 w-11 shrink-0 ${track.art}`} aria-label="Abrir player">
          {playing && <span className="flex h-full items-center justify-center gap-[2px]"><i className="equalizer-bar h-3 w-[2px] rounded-full bg-white/80" /><i className="equalizer-bar h-5 w-[2px] rounded-full bg-white/80" /><i className="equalizer-bar h-2 w-[2px] rounded-full bg-white/80" /></span>}
        </button>
        <button data-testid="button-open-track-player" onClick={onOpen} className="min-w-0 flex-1 text-left">
          <p className="truncate text-[12px] font-semibold text-[#f0ede5]">{track.title}</p>
          <p className="truncate text-[10px] text-[#9a978e]">{track.artist}</p>
        </button>
        <button data-testid="button-mini-previous" onClick={onPrevious} aria-label="Anterior" className="hidden text-[#aba79b] transition hover:text-white sm:block"><SkipBack size={17} fill="currentColor" /></button>
        <button data-testid="button-mini-play" onClick={onToggle} aria-label={playing ? 'Pausar' : 'Reproduzir'} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eee8d9] text-[#22231f] transition hover:scale-105">{playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}</button>
        <button data-testid="button-mini-next" onClick={onNext} aria-label="Próxima" className="text-[#aba79b] transition hover:text-white"><SkipForward size={17} fill="currentColor" /></button>
        <button data-testid="button-mini-queue" aria-label="Fila" onClick={onOpen} className="hidden text-[#77766f] transition hover:text-white sm:block"><ListMusic size={17} /></button>
        <span className="absolute inset-x-3 bottom-0 h-px bg-white/[.08]"><span className="block h-px w-[34%] bg-[#c7ae76]" /></span>
      </div>
    </div>
  );
}

type PlayerSheetProps = { track: Track; playing: boolean; onToggle: () => void; onClose: () => void; onPrevious: () => void; onNext: () => void };

export function PlayerSheet({ track, playing, onToggle, onClose, onPrevious, onNext }: PlayerSheetProps) {
  const [favorite, setFavorite] = useState(false);
  return (
    <div data-testid="expanded-player" className="fixed inset-0 z-40 flex flex-col bg-[#10110f] px-5 pb-8 pt-4 animate-soft-in sm:px-10">
      <div className="mx-auto flex w-full max-w-xl items-center justify-between">
        <button data-testid="button-close-player" onClick={onClose} aria-label="Fechar player" className="flex h-10 w-10 items-center justify-center rounded-full text-[#aaa79d] hover:bg-white/[.06] hover:text-white"><ChevronDown size={23} /></button>
        <p className="font-mono-custom text-[9px] uppercase tracking-[.22em] text-[#85827a]">Tocando agora</p>
        <button data-testid="button-player-close-alt" onClick={onClose} aria-label="Fechar" className="flex h-10 w-10 items-center justify-center rounded-full text-[#aaa79d] hover:bg-white/[.06] hover:text-white"><X size={18} /></button>
      </div>
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center">
        <div className={`agnus-artwork mx-auto aspect-square w-full max-w-[340px] ${track.art} shadow-[0_28px_70px_rgba(0,0,0,.38)]`}>
          <div className="flex h-full items-end p-7"><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-white/65">{track.tone}</span></div>
        </div>
        <div className="mt-8 flex items-end justify-between gap-4">
          <div><h2 className="font-display text-2xl font-bold text-[#f0ece3]">{track.title}</h2><p className="mt-1 text-sm text-[#9d9a91]">{track.artist}</p></div>
          <button data-testid="button-player-favorite" onClick={() => setFavorite((value) => !value)} aria-label="Favoritar" className={`transition hover:text-[#d7be83] ${favorite ? 'text-[#d7be83]' : 'text-[#a19d92]'}`}><Heart size={19} fill={favorite ? 'currentColor' : 'none'} /></button>
        </div>
        <div className="mt-8"><div className="h-1 rounded-full bg-white/[.1]"><div className="h-1 w-[34%] rounded-full bg-[#c7ae76]" /></div><div className="mt-2 flex justify-between font-mono-custom text-[9px] text-[#77756e]"><span>1:24</span><span>{track.duration}</span></div></div>
        <div className="mt-8 flex items-center justify-center gap-8 text-[#ded9cc]">
          <button data-testid="button-player-previous" onClick={onPrevious} aria-label="Faixa anterior" className="hover:text-[#d4bb81]"><SkipBack size={20} fill="currentColor" /></button>
          <button data-testid="button-player-toggle" onClick={onToggle} aria-label={playing ? 'Pausar faixa' : 'Reproduzir faixa'} className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eee8d9] text-[#22231f] transition hover:scale-105">{playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}</button>
          <button data-testid="button-player-next" onClick={onNext} aria-label="Próxima faixa" className="hover:text-[#d4bb81]"><SkipForward size={20} fill="currentColor" /></button>
        </div>
      </div>
    </div>
  );
}