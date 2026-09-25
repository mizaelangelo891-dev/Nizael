import type { Station } from './data';

type StationCardProps = { station: Station; onPlay: (station: Station) => void };

export function StationCard({ station, onPlay }: StationCardProps) {
  return (
    <button data-testid={`card-station-${station.id}`} onClick={() => onPlay(station)} className="group w-[160px] shrink-0 text-left sm:w-[176px]">
      <div className={`relative flex aspect-[1.25] items-center justify-center overflow-hidden rounded-2xl ${station.art} transition duration-300 group-hover:-translate-y-1`}>
        <div className="absolute inset-3 rounded-xl border border-white/20" />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-black/15 font-display text-lg text-white/90">{station.icon}</span>
      </div>
      <p className="mt-3 text-[13px] font-semibold text-[#e9e5dc]">{station.title}</p>
      <p className="mt-1 text-[11px] text-[#787772]">{station.detail}</p>
    </button>
  );
}