import { Bell, ChevronDown } from 'lucide-react';

type HeaderProps = { onProfile: () => void; onNotify: () => void };

export function Header({ onProfile, onNotify }: HeaderProps) {
  return (
    <header className="flex items-center justify-between pb-8 pt-5 md:pb-10 md:pt-8">
      <div className="group flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#c7ae76] text-[#1c1c19] shadow-[0_8px_24px_rgba(199,174,118,.12)] transition duration-300 group-hover:rotate-[-4deg] group-hover:scale-[1.03]">
          <span className="absolute inset-[4px] rounded-[9px] border border-[#1c1c19]/20" />
          <span className="relative font-display text-[18px] font-extrabold tracking-[-.09em]">A</span>
        </div>
        <div className="leading-none">
          <span className="block font-display text-[19px] font-extrabold tracking-[.2em] text-[#f0ede6]">AGNUS</span>
          <span className="mt-1 block font-mono-custom text-[8px] uppercase tracking-[.22em] text-[#807c70]">Música cristã</span>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <button data-testid="button-notifications" onClick={onNotify} aria-label="Notificações" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/[.08] bg-white/[.035] text-[#aaa8a2] transition hover:bg-white/[.09] hover:text-[#f3eee2]">
          <Bell size={17} strokeWidth={1.7} />
          <span className="absolute right-[10px] top-[9px] h-1.5 w-1.5 rounded-full bg-[#c7ae76]" />
        </button>
        <button data-testid="button-profile" onClick={onProfile} className="flex items-center gap-2 rounded-full border border-white/[.08] bg-white/[.035] py-1 pl-1 pr-2 transition hover:bg-white/[.09]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#353935] text-[11px] font-bold tracking-wide text-[#d7c497]">MR</span>
          <ChevronDown size={14} className="text-[#85847f]" />
        </button>
      </div>
    </header>
  );
}