import type { Artist } from './data';

type ArtistCardProps = { artist: Artist; onSelect: (artist: Artist) => void };

export function ArtistCard({ artist, onSelect }: ArtistCardProps) {
  return (
    <button data-testid={`card-artist-${artist.id}`} onClick={() => onSelect(artist)} className="group w-[142px] shrink-0 text-left sm:w-[156px]">
      <div className={`relative flex aspect-square items-end overflow-hidden rounded-[20px] p-3 ${artist.art} artist-art transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_14px_28px_rgba(0,0,0,.28)]`}>
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-white/20 bg-white/[.06]" />
        <div className="absolute bottom-3 right-3 h-14 w-14 rounded-full border border-white/15 bg-black/[.08]" />
        <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-xs font-bold text-white/85">{artist.initials}</div>
        {artist.badge && <span className="relative rounded-md border border-white/15 bg-black/25 px-2 py-1 text-[9px] font-semibold uppercase tracking-[.12em] text-[#f2ecdc]">{artist.badge}</span>}
      </div>
      <p className="mt-3 truncate text-[13px] font-semibold text-[#e9e5dc]">{artist.name}</p>
      <p className="mt-1 truncate text-[11px] text-[#787772]">{artist.subtitle}</p>
    </button>
  );
}