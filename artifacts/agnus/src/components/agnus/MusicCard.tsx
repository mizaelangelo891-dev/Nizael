import { Check, MoreHorizontal, Pause, Play, Plus } from 'lucide-react';
import type { Track } from './data';

type MusicCardProps = {
  track: Track;
  index: number;
  active: boolean;
  onPlay: (track: Track) => void;
  onAddToLibrary?: (track: Track) => void;
  inLibrary?: boolean;
};

export function MusicCard({ track, index, active, onPlay, onAddToLibrary, inLibrary = false }: MusicCardProps) {
  return (
    <div data-testid={`card-track-${track.id}`} className="group flex min-w-0 items-center gap-3 border-b border-white/[.06] py-3 transition hover:bg-white/[.025] md:px-3">
      <span className="w-4 shrink-0 text-center font-mono-custom text-[11px] text-[#666661]">{String(index + 1).padStart(2, '0')}</span>
      <button data-testid={`button-play-track-${track.id}`} onClick={() => onPlay(track)} className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-[14px] ${track.art} cover-art shadow-[inset_0_0_0_1px_rgba(255,255,255,.09)]`}>
        <span className="cover-art-mark">AGNUS</span>
        <span className="absolute inset-0 flex items-center justify-center bg-black/10 text-[#f5f0e4] opacity-0 transition group-hover:opacity-100">{active ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</span>
        {active && <span className="absolute inset-x-0 bottom-0 flex h-4 items-end justify-center gap-[2px] bg-black/20 pb-1"><i className="equalizer-bar h-2 w-[2px] rounded-full bg-[#e5d6b0]" /><i className="equalizer-bar h-3 w-[2px] rounded-full bg-[#e5d6b0]" /><i className="equalizer-bar h-1.5 w-[2px] rounded-full bg-[#e5d6b0]" /></span>}
      </button>
      <button data-testid={`button-select-track-${track.id}`} onClick={() => onPlay(track)} className="min-w-0 flex-1 text-left">
        <p className={`truncate text-[13px] font-semibold ${active ? 'text-[#d3bc83]' : 'text-[#e8e5de]'}`}>{track.title}</p>
        <p className="mt-0.5 truncate text-[11px] text-[#777670]">{track.artist}</p>
      </button>
      <span className="hidden text-[11px] text-[#666661] sm:block">{track.duration}</span>
       {onAddToLibrary && <button data-testid={`button-library-track-${track.id}`} onClick={(event) => { event.stopPropagation(); onAddToLibrary(track); }} aria-label={inLibrary ? `Remover ${track.title} da biblioteca` : `Adicionar ${track.title} à biblioteca`} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition ${inLibrary ? 'border-[#c7ae76]/45 bg-[#c7ae76]/10 text-[#d8c18b]' : 'border-white/[.08] text-[#716f69] hover:border-[#c7ae76]/40 hover:text-[#d8c18b]'}`}>
         {inLibrary ? <Check size={14} /> : <Plus size={15} />}
       </button>}
      <button data-testid={`button-more-track-${track.id}`} onClick={() => onPlay(track)} aria-label={`Mais opções para ${track.title}`} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#716f69] transition hover:bg-white/[.06] hover:text-[#d8d3c6]"><MoreHorizontal size={17} /></button>
    </div>
  );
}