import { Bell, ChevronDown } from 'lucide-react';

type HeaderProps = { onProfile: () => void; onNotify: () => void };

export function Header({ onProfile, onNotify }: HeaderProps) {
  return (
    <header className="flex items-center justify-between pb-7 pt-5 md:pb-9 md:pt-8">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#c7ae76] text-[#1c1c19] shadow-[0_5px_20px_rgba(199,174,118,.14)]">
          <span className="font-display text-[15px] font-extrabold tracking-[-.08em]">A</span>
        </div>
        <span className="font-display text-[17px] font-extrabold tracking-[.19em] text-[#f0ede6]">AGNUS</span>
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