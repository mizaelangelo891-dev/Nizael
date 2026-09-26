import { Home, Library, Search, UserRound } from 'lucide-react';

type NavKey = 'home' | 'search' | 'library' | 'profile';
type BottomNavigationProps = { active: NavKey; onChange: (key: NavKey) => void };

const items: { key: NavKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Início', icon: Home },
  { key: 'search', label: 'Buscar', icon: Search },
  { key: 'library', label: 'Biblioteca', icon: Library },
  { key: 'profile', label: 'Perfil', icon: UserRound },
];

export function BottomNavigation({ active, onChange }: BottomNavigationProps) {
  return (
    <nav data-testid="nav-bottom" className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[.08] bg-[#0d0e0d]/[.94] px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {items.map(({ key, label, icon: Icon }) => {
          const selected = active === key;
          return <button data-testid={`button-nav-${key}`} key={key} onClick={() => onChange(key)} className={`relative flex min-w-[72px] flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] transition ${selected ? 'text-[#d4bb81]' : 'text-[#696a66] hover:text-[#aaa79e]'}`}>
            {selected && <span className="absolute -top-2 h-5 w-12 rounded-full bg-[#c7ae76]/[.08] blur-md" />}
            {selected && <span className="absolute -top-2 h-[2px] w-5 rounded-full bg-[#c7ae76]" />}
            <Icon className="relative" size={18} strokeWidth={selected ? 2.1 : 1.7} />
            <span className="relative">{label}</span>
          </button>;
        })}
      </div>
    </nav>
  );
}