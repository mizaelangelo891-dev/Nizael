import type { Category } from './data';

type CategoryCardProps = { category: Category; onSelect: (category: Category) => void };

export function CategoryCard({ category, onSelect }: CategoryCardProps) {
  return (
    <button data-testid={`card-category-${category.id}`} onClick={() => onSelect(category)} className={`relative h-[104px] w-[154px] shrink-0 overflow-hidden rounded-2xl p-4 text-left ${category.art} transition duration-300 hover:-translate-y-1 sm:w-[174px]`}>
      <div className="absolute -right-7 -top-8 h-28 w-28 rounded-full border border-white/20 bg-black/[.09]" />
      <span className="relative font-display text-[16px] font-bold text-[#f6f0e4]">{category.title}</span>
      <span className="relative mt-1 block text-[10px] text-white/65">{category.detail}</span>
      <span className="absolute bottom-3 right-4 text-xl text-white/65">{category.symbol}</span>
    </button>
  );
}