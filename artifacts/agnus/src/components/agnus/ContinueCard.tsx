import { Pause, Play } from 'lucide-react';
import type { Track } from './data';

type ContinueCardProps = {
  track: Track;
  active: boolean;
  onPlay: (track: Track) => void;
};

export function ContinueCard({ track, active, onPlay }: ContinueCardProps) {
  return (
    <button
      data-testid={`card-continue-${track.id}`}
      onClick={() => onPlay(track)}
      className="group flex min-w-[250px] flex-1 items-center gap-3 rounded-[20px] border border-white/[.07] bg-[#151615] p-3 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#c7ae76]/35 hover:bg-[#1a1b19]"
    >
      <div className={`relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[16px] ${track.art} cover-art`}>
        <span className="cover-art-mark">AGNUS</span>
        <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-[#f5f0e4] opacity-0 transition group-hover:opacity-100">
          {active ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
        </span>
      </div>
      <div className="min-w-0">
        <p className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#998867]">Retomar</p>
        <p className="mt-1 truncate text-[13px] font-semibold text-[#eeeae1]">{track.title}</p>
        <p className="mt-1 truncate text-[11px] text-[#777770]">{track.artist}</p>
      </div>
      <span className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[.08] text-[#aaa69c] transition group-hover:border-[#c7ae76]/45 group-hover:text-[#d6bd83]">
        {active ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
      </span>
    </button>
  );
}