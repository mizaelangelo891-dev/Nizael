import { Search, SlidersHorizontal } from 'lucide-react';

type SearchBarProps = { value: string; onChange: (value: string) => void; onFilter: () => void; onFocus?: () => void };

export function SearchBar({ value, onChange, onFilter, onFocus }: SearchBarProps) {
  return (
    <div className="group flex h-12 items-center gap-3 border-b border-white/[.12] bg-transparent px-1 transition focus-within:border-[#c7ae76]/65">
      <Search size={18} strokeWidth={1.8} className="shrink-0 text-[#817f77] transition group-focus-within:text-[#c7ae76]" />
      <input id="search" data-testid="input-search" type="search" value={value} onFocus={onFocus} onChange={(event) => onChange(event.target.value)} placeholder="Buscar músicas, artistas ou álbuns" className="min-w-0 flex-1 bg-transparent text-[13px] text-[#efede6] outline-none placeholder:text-[#74736e]" />
      <button data-testid="button-search-filter" onClick={onFilter} aria-label="Filtros de busca" className="text-[#817f77] transition hover:text-[#d3bd8b]"><SlidersHorizontal size={17} strokeWidth={1.7} /></button>
    </div>
  );
}