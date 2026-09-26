export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  art: string;
  tone: string;
};

export type Artist = {
  id: string;
  name: string;
  subtitle: string;
  genre: string;
  trackCount: number;
  initials: string;
  art: string;
  photo: string;
  description: string;
  albums: Album[];
  station: { title: string; detail: string; art: string };
  badge?: string;
};

export type Album = { id: string; title: string; detail: string; art: string };
export type Category = { id: string; title: string; detail: string; art: string; symbol: string };
export type Station = { id: string; title: string; detail: string; art: string; icon: string };

export const tracks: Track[] = [
  { id: 'teu-nome', title: 'Teu Nome', artist: 'Gabriel Santos', duration: '4:12', art: 'art-amber', tone: 'single recente' },
  { id: 'casa-do-pai', title: 'Casa do Pai', artist: 'Nova Aliança', duration: '5:06', art: 'art-indigo', tone: 'essencial' },
  { id: 'ate-o-fim', title: 'Até o Fim', artist: 'Lucas Almeida', duration: '3:48', art: 'art-rust', tone: 'mais ouvida' },
  { id: 'graca', title: 'Graça', artist: 'Voz & Vida', duration: '4:31', art: 'art-sage', tone: 'essencial' },
  { id: 'sobre-as-aguas', title: 'Sobre as Águas', artist: 'Helena Martins', duration: '4:58', art: 'art-violet', tone: 'descoberta' },
  { id: 'manha', title: 'Manhã', artist: 'Som do Alto', duration: '3:25', art: 'art-sand', tone: 'descoberta' },
];

export const artists: Artist[] = [
  {
    id: 'gabriel-santos',
    name: 'Gabriel Santos',
    subtitle: 'Independente · São Paulo',
    genre: 'Adoração contemporânea',
    trackCount: 12,
    initials: 'GS',
    art: 'art-amber',
    photo: '/artist-portraits/agnus-gabriel-santos.jpg',
    description: 'Canções para atravessar o silêncio e encontrar presença no cotidiano.',
    albums: [{ id: 'silencio-fogo', title: 'Silêncio & Fogo', detail: 'EP · 2026', art: 'art-amber' }],
    station: { title: 'Estação Gabriel Santos', detail: 'Adoração íntima · 4h', art: 'art-amber' },
    badge: 'Em ascensão',
  },
  {
    id: 'helena-martins',
    name: 'Helena Martins',
    subtitle: 'Independente · Belo Horizonte',
    genre: 'Pop contemplativo',
    trackCount: 9,
    initials: 'HM',
    art: 'art-violet',
    photo: '/artist-portraits/agnus-helena-martins.jpg',
    description: 'Uma voz serena para histórias de fé, espera e recomeço.',
    albums: [{ id: 'lugar-secreto', title: 'Lugar Secreto', detail: 'Álbum · 2025', art: 'art-violet' }],
    station: { title: 'Estação Helena Martins', detail: 'Pop contemplativo · 3h', art: 'art-violet' },
    badge: 'Descoberta',
  },
  {
    id: 'som-do-alto',
    name: 'Som do Alto',
    subtitle: 'Independente · Recife',
    genre: 'Congregacional alternativo',
    trackCount: 18,
    initials: 'SA',
    art: 'art-sage',
    photo: '/artist-portraits/agnus-som-do-alto.jpg',
    description: 'Música para cantar junto, com raízes nordestinas e arranjos que respiram.',
    albums: [{ id: 'casa-aberta', title: 'Casa Aberta', detail: 'Álbum · 2026', art: 'art-sage' }],
    station: { title: 'Estação Som do Alto', detail: 'Congregacional · 5h', art: 'art-sage' },
    badge: 'Descoberta',
  },
  {
    id: 'luz-do-dia',
    name: 'Luz do Dia',
    subtitle: 'Independente · Curitiba',
    genre: 'Rap & soul cristão',
    trackCount: 11,
    initials: 'LD',
    art: 'art-indigo',
    photo: '/artist-portraits/agnus-luz-do-dia.jpg',
    description: 'Rimas honestas sobre graça, cidade e a esperança que não desiste.',
    albums: [{ id: 'chao-firme', title: 'Chão Firme', detail: 'Mixtape · 2026', art: 'art-indigo' }],
    station: { title: 'Estação Luz do Dia', detail: 'Rap cristão · 4h', art: 'art-indigo' },
    badge: 'Descoberta',
  },
];

export const categories: Category[] = [
  { id: 'louvor', title: 'Louvor', detail: 'Vozes para celebrar', art: 'art-amber', symbol: '↗' },
  { id: 'adoracao', title: 'Adoração', detail: 'Presença e silêncio', art: 'art-violet', symbol: '◌' },
  { id: 'congregacional', title: 'Congregacional', detail: 'Para cantar junto', art: 'art-sage', symbol: '⌁' },
  { id: 'rock', title: 'Rock Cristão', detail: 'Fé em alto volume', art: 'art-rust', symbol: '—' },
  { id: 'rap', title: 'Rap Cristão', detail: 'Rimas com propósito', art: 'art-indigo', symbol: '∿' },
  { id: 'instrumental', title: 'Instrumental', detail: 'Som para respirar', art: 'art-sand', symbol: '◒' },
  { id: 'oracao', title: 'Música para oração', detail: 'Um lugar para ficar', art: 'art-amber', symbol: '·' },
  { id: 'novos', title: 'Novos artistas', detail: 'Vozes para conhecer', art: 'art-violet', symbol: '+' },
];

export const stations: Station[] = [
  { id: 'quietude', title: 'Quietude', detail: 'Instrumental · 5h', art: 'art-sand', icon: '◌' },
  { id: 'agora', title: 'O melhor de agora', detail: 'Seleção AGNUS', art: 'art-amber', icon: '↗' },
  { id: 'domingo', title: 'Domingo', detail: 'Para começar bem', art: 'art-sage', icon: '⌁' },
  { id: 'noite', title: 'Noite tranquila', detail: 'Adoração · 8h', art: 'art-indigo', icon: '◒' },
  { id: 'novidades', title: 'Novidades', detail: 'Toda semana', art: 'art-rust', icon: '+' },
];