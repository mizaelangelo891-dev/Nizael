import type { Category } from './data';

type CategoryCardProps = { category: Category; onSelect: (category: Category) => void };

export function CategoryCard({ category, onSelect }: CategoryCardProps) {
  return (
    <button data-testid={`card-category-${category.id}`} onClick={() => onSelect(category)} className="group w-[148px] shrink-0 text-left sm:w-[166px]">
      <div className={`category-art relative aspect-square overflow-hidden rounded-[14px] ${category.art} transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_32px_rgba(0,0,0,.28)]`}>
        <div className="absolute -right-7 -top-8 h-28 w-28 rounded-full border border-white/20 bg-black/[.09]" />
        <span className="absolute left-3 top-3 font-mono-custom text-[8px] uppercase tracking-[.16em] text-white/65">AGNUS</span>
        <span className="absolute bottom-3 left-3 text-2xl text-white/75">{category.symbol}</span>
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[11px] text-white/80 opacity-0 transition group-hover:opacity-100">▶</span>
      </div>
      <span className="mt-3 block truncate text-[13px] font-semibold text-[#e9e5dc]">{category.title}</span>
      <span className="mt-1 block truncate text-[10px] text-[#777770]">{category.detail}</span>
    </button>
  );
}