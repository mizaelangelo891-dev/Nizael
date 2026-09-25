import { MoreHorizontal, Pause, Play } from 'lucide-react';
import type { Track } from './data';

type MusicCardProps = { track: Track; index: number; active: boolean; onPlay: (track: Track) => void };

export function MusicCard({ track, index, active, onPlay }: MusicCardProps) {
  return (
    <div data-testid={`card-track-${track.id}`} className="group flex min-w-0 items-center gap-3 rounded-2xl py-2.5 transition hover:bg-white/[.035] md:px-2">
      <span className="w-4 shrink-0 text-center font-mono-custom text-[11px] text-[#666661]">{String(index + 1).padStart(2, '0')}</span>
      <button data-testid={`button-play-track-${track.id}`} onClick={() => onPlay(track)} className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-xl ${track.art} shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]`}>
        <span className="absolute inset-0 flex items-center justify-center bg-black/10 text-[#f5f0e4] opacity-0 transition group-hover:opacity-100">{active ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</span>
        {active && <span className="absolute inset-x-0 bottom-0 flex h-4 items-end justify-center gap-[2px] bg-black/20 pb-1"><i className="equalizer-bar h-2 w-[2px] rounded-full bg-[#e5d6b0]" /><i className="equalizer-bar h-3 w-[2px] rounded-full bg-[#e5d6b0]" /><i className="equalizer-bar h-1.5 w-[2px] rounded-full bg-[#e5d6b0]" /></span>}
      </button>
      <button data-testid={`button-select-track-${track.id}`} onClick={() => onPlay(track)} className="min-w-0 flex-1 text-left">
        <p className={`truncate text-[13px] font-semibold ${active ? 'text-[#d3bc83]' : 'text-[#e8e5de]'}`}>{track.title}</p>
        <p className="mt-0.5 truncate text-[11px] text-[#777670]">{track.artist}</p>
      </button>
      <span className="hidden text-[11px] text-[#666661] sm:block">{track.duration}</span>
      <button data-testid={`button-more-track-${track.id}`} onClick={() => onPlay(track)} aria-label={`Mais opções para ${track.title}`} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#716f69] transition hover:bg-white/[.06] hover:text-[#d8d3c6]"><MoreHorizontal size={17} /></button>
    </div>
  );
}