import { Bell, ChevronDown, Home, Library, Search, UserRound } from 'lucide-react';

type NavKey = 'home' | 'search' | 'library' | 'profile';
type HeaderProps = { onProfile: () => void; onNotify: () => void; activeNav?: NavKey; onNavigate?: (key: NavKey) => void };

const navItems: { key: NavKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Início', icon: Home },
  { key: 'search', label: 'Buscar', icon: Search },
  { key: 'library', label: 'Biblioteca', icon: Library },
  { key: 'profile', label: 'Perfil', icon: UserRound },
];

export function Header({ onProfile, onNotify, activeNav = 'home', onNavigate }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-white/[.06] pb-5 pt-5 md:pb-6 md:pt-7">
      <div className="group flex items-center gap-3">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-[11px] border border-[#d8c28d]/55 bg-[#c7ae76] text-[#1c1c19] shadow-[0_8px_24px_rgba(199,174,118,.1)] transition duration-300 group-hover:-rotate-3 group-hover:scale-[1.03]">
          <span className="absolute inset-[4px] rounded-[7px] border border-[#1c1c19]/25" />
          <span className="relative font-display text-[20px] tracking-[-.1em]">A</span>
        </div>
        <div className="leading-none">
          <span className="block font-sans text-[16px] font-bold tracking-[.24em] text-[#f0ede6]">AGNUS</span>
          <span className="mt-1 block font-mono-custom text-[8px] uppercase tracking-[.22em] text-[#807c70]">Música cristã</span>
        </div>
      </div>
      {onNavigate && <nav className="hidden items-center gap-1 md:flex">
        {navItems.map(({ key, label, icon: Icon }) => {
          const active = activeNav === key;
          return <button key={key} onClick={() => onNavigate(key)} className={`group flex items-center gap-2 border-b px-3 py-3 text-[10px] font-semibold transition ${active ? 'border-[#c7ae76] text-[#e5d2a0]' : 'border-transparent text-[#77766f] hover:text-[#d5d0c4]'}`}>
            <Icon size={14} strokeWidth={active ? 2 : 1.6} />
            {label}
          </button>;
        })}
      </nav>}
      <div className="flex items-center gap-2.5">
        <button data-testid="button-notifications" onClick={onNotify} aria-label="Notificações" className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/[.08] text-[#8d8b84] transition hover:border-[#c7ae76]/35 hover:text-[#f3eee2]">
          <Bell size={17} strokeWidth={1.7} />
          <span className="absolute right-[8px] top-[7px] h-1.5 w-1.5 rounded-full bg-[#c7ae76]" />
        </button>
        <button data-testid="button-profile" onClick={onProfile} className="flex items-center gap-2 border-l border-white/[.08] py-1 pl-3 pr-1 transition hover:text-[#f3eee2]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2c302b] text-[10px] font-bold tracking-wide text-[#d7c497]">MR</span>
          <ChevronDown size={14} className="text-[#85847f]" />
        </button>
      </div>
    </header>
  );
}