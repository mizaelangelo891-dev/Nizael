import type { Artist } from './data';

type ArtistCardProps = {
  artist: Artist;
  onSelect: (artist: Artist) => void;
  onListen?: (artist: Artist) => void;
};

export function ArtistCard({ artist, onSelect, onListen = onSelect }: ArtistCardProps) {
  return (
    <article data-testid={`card-artist-${artist.id}`} className="group w-[154px] shrink-0 text-left sm:w-[168px]">
      <button onClick={() => onSelect(artist)} className={`relative block aspect-square w-full overflow-hidden rounded-[20px] ${artist.art} artist-art text-left transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_14px_28px_rgba(0,0,0,.28)]`}>
        <img src={artist.photo} alt={`Foto de ${artist.name}`} className="absolute inset-0 h-full w-full object-cover opacity-[.82] mix-blend-screen transition duration-500 group-hover:scale-[1.04] group-hover:opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111310]/90 via-[#111310]/10 to-transparent" />
        <div className="absolute left-3 top-3 font-mono-custom text-[9px] uppercase tracking-[.16em] text-white/75">{artist.initials}</div>
        {artist.badge && <span className="absolute bottom-3 left-3 font-mono-custom text-[8px] uppercase tracking-[.12em] text-[#f2ecdc]/80">{artist.badge}</span>}
      </button>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-[#e9e5dc]">{artist.name}</p>
          <p className="mt-1 truncate text-[10px] text-[#88857b]">{artist.genre}</p>
          <p className="mt-1 text-[10px] text-[#65645f]">{artist.trackCount} músicas</p>
        </div>
        <button onClick={() => onListen(artist)} aria-label={`Ouvir ${artist.name}`} className="mt-0.5 flex h-7 shrink-0 items-center gap-1 border-b border-[#c7ae76]/45 text-[9px] font-semibold text-[#d3bc83] transition hover:border-[#d3bc83] hover:text-[#e6d19a]">
          <span className="text-[9px]">▶</span> Ouvir
        </button>
      </div>
    </article>
  );
}