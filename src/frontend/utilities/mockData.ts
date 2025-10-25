import {
  FiAward,
  FiFeather,
  FiTarget,
  FiUserPlus,
  FiUsers,
  FiShare2,
  FiSend,
  FiRefreshCw,
  FiTrendingUp,
  FiFlag,
  FiStar
} from 'react-icons/fi';
import { Badge } from '@/types/badge';
import { Campaign } from '@/types/campaign';
import { Mission } from '@/types/mission';
import { PointsHistoryItem } from '@/types/history';
import { Reward } from '@/types/reward';
import { DonorLevel, UserProfile } from '@/types/user';

export const mockUser: UserProfile = {
  id: 'user-001',
  name: 'Alessandra Ribeiro',
  username: 'alessandra.gf',
  email: 'alessandra@gf.org',
  cpf: '123.456.789-00',
  phone: '(11) 91234-5678',
  avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=320&h=320&q=80',
  points: 2750,
  totalDonated: 12850,
  totalRedeemed: 1900,
  level: 'gold'
};

export const campaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Expedição Favela 3D',
    description: 'Ajude a transformar moradias e garantir saneamento para 150 famílias.',
    imageUrl: '/images/slider/slider-1.png',
    goal: 50000,
    raised: 34750
  },
  {
    id: 'camp-002',
    name: 'Educação voa alto',
    description: 'Crie bolsas de estudo para jovens da periferia conectarem-se com tecnologia.',
    imageUrl: '/images/slider/slider-2.png',
    goal: 30000,
    raised: 21400
  },
  {
    id: 'camp-003',
    name: 'Natal Solidário',
    description: 'Garanta cestas natalinas completas para famílias atendidas pelo FalcoPoints.',
    imageUrl: '/images/slider/slider-3.png',
    goal: 40000,
    raised: 15280
  }
];

export const pointsHistory: PointsHistoryItem[] = [
  { id: 'hist-001', action: 'Doação mensal recorrente', date: '2025-09-18', points: 250, type: 'earn' },
  { id: 'hist-002', action: 'Indicação amiga(o)', date: '2025-08-28', points: 120, type: 'earn' },
  { id: 'hist-003', action: 'Resgate Camiseta GF', date: '2025-08-05', points: -450, type: 'redeem' },
  { id: 'hist-004', action: 'Doação única campanha Favela 3D', date: '2025-07-21', points: 500, type: 'earn' },
  { id: 'hist-005', action: 'Resgate Ecobag GF', date: '2025-06-14', points: -250, type: 'redeem' }
];

export const rewards: Reward[] = [
  {
    id: 'reward-001',
    name: 'Ecobag GF',
    description: 'Sacola ecológica exclusiva do programa.',
    pointsRequired: 250,
    imageUrl: '/images/itens/ecobag.png'
  },
  {
    id: 'reward-002',
    name: 'Jantar com a Embaixadora',
    description: 'Compartilhe momentos com nossa embaixadora Tais Araujo.',
    pointsRequired: 350,
    imageUrl: '/images/pessoas/tais.png'
  },
  {
    id: 'reward-003',
    name: 'Camiseta GF',
    description: 'Camiseta oficial para vestir a causa.',
    pointsRequired: 450,
    imageUrl: '/images/itens/camiseta.png'
  },
  {
    id: 'reward-004',
    name: 'Almoço com a Embaixadora',
    description: 'Experiência exclusiva com nossa Embaixadora Sabrina!',
    pointsRequired: 950,
    imageUrl: '/images/pessoas/sabrina.png'
  },
  {
    id: 'reward-005',
    name: 'Conversa 1:1 - Depoimentos',
    description: 'Encontro com beneficiária(o) para ouvir histórias.',
    pointsRequired: 650,
    imageUrl: 'https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=480&q=80'
  }
];

export const missions: Mission[] = [
  {
    id: 'mission-001',
    title: 'Indique 1 amiga(o)',
    description: 'Compartilhe o FalcoPoints com a primeira pessoa e some forças.',
    points: 50,
    achieved: true
  },
  {
    id: 'mission-002',
    title: 'Indique 3 amigas(os)',
    description: 'Leve mais duas pessoas para decolar com você.',
    points: 90,
    achieved: true
  },
  {
    id: 'mission-003',
    title: 'Indique 5 amigas(os)',
    description: 'Amplie a rede convidando quem acredita no mesmo impacto.',
    points: 140,
    achieved: false
  },
  {
    id: 'mission-004',
    title: 'Indique 10 amigas(os)',
    description: 'Espalhe o FalcoPoints para transformar ainda mais vidas.',
    points: 280,
    achieved: false
  },
  {
    id: 'mission-005',
    title: 'Realize doação recorrente',
    description: 'Inicie uma contribuição recorrente e sustente a transformação.',
    points: 120,
    achieved: true
  },
  {
    id: 'mission-006',
    title: 'Aumente o valor da doação',
    description: 'Intensifique o impacto ajustando a sua doação mensal.',
    points: 200,
    achieved: false
  },
  {
    id: 'mission-007',
    title: 'Alcance 100 pontos',
    description: 'Alcance 100 pontos somando missões e doações.',
    points: 100,
    achieved: true
  },
  {
    id: 'mission-008',
    title: 'Alcance 250 pontos',
    description: 'Mantenha o ritmo e alcance 250 pontos na jornada.',
    points: 250,
    achieved: false
  },
  {
    id: 'mission-009',
    title: 'Alcance 350 pontos',
    description: 'Finalize o ciclo somando 350 pontos no programa.',
    points: 350,
    achieved: false
  }
];

export const badges: Badge[] = [
  {
    id: 'badge-001',
    name: 'Indique 1 amiga(o)',
    threshold: 50,
    description: 'Convide a primeira pessoa para conhecer o FalcoPoints e inicie o voo compartilhado.',
    icon: FiUserPlus,
    color: '#00AEEF'
  },
  {
    id: 'badge-002',
    name: 'Indique 3 amigas(os)',
    threshold: 90,
    description: 'Mostre o poder da rede trazendo mais duas pessoas para a jornada.',
    icon: FiUsers,
    color: '#0095C8'
  },
  {
    id: 'badge-003',
    name: 'Indique 5 amigas(os)',
    threshold: 140,
    description: 'Espalhe o impacto convidando cinco pessoas para voarem junto.',
    icon: FiShare2,
    color: '#007EB5'
  },
  {
    id: 'badge-004',
    name: 'Indique 10 amigas(os)',
    threshold: 280,
    description: 'Forme um grupo engajado com dez pessoas apoiando a transformação.',
    icon: FiSend,
    color: '#00689D'
  },
  {
    id: 'badge-005',
    name: 'Realize doação recorrente',
    threshold: 120,
    description: 'Contribua todos os meses e garanta continuidade para os projetos.',
    icon: FiRefreshCw,
    color: '#F5821F'
  },
  {
    id: 'badge-006',
    name: 'Aumente o valor da doação',
    threshold: 200,
    description: 'Eleve o impacto ajustando o valor da sua doação recorrente.',
    icon: FiTrendingUp,
    color: '#F15A24'
  },
  {
    id: 'badge-007',
    name: 'Alcance 100 pontos',
    threshold: 100,
    description: 'Atinge 100 pontos ao completar missões e doações.',
    icon: FiTarget,
    color: '#22B573'
  },
  {
    id: 'badge-008',
    name: 'Alcance 250 pontos',
    threshold: 250,
    description: 'Alcance 250 pontos e celebre sua constância na jornada.',
    icon: FiFlag,
    color: '#1E9F6A'
  },
  {
    id: 'badge-009',
    name: 'Alcance 350 pontos',
    threshold: 350,
    description: 'Chegue a 350 pontos e torne-se referência para a comunidade.',
    icon: FiStar,
    color: '#178658'
  }
];

export const levelColors: Record<DonorLevel, string> = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700'
};

export const levelBenefits: Record<DonorLevel, string[]> = {
  bronze: [
    'Boas-vindas ao FalcoPoints',
    'Acesso ao mural de impacto',
    'Participação nas missões base'
  ],
  silver: [
    'Todos os benefícios Bronze',
    'Acesso antecipado a campanhas',
    'Convites exclusivos para eventos online'
  ],
  gold: [
    'Todos os benefícios Silver',
    'Experiências com lideranças GF',
    'Mentorias com especialistas em impacto social'
  ]
};

export const donorLevels = (['bronze', 'silver', 'gold'] as DonorLevel[]).map((level) => {
  const titles: Record<DonorLevel, string> = {
    bronze: 'Falcão Bronze',
    silver: 'Falcão Prata',
    gold: 'Falcão Ouro'
  };

  const descriptions: Record<DonorLevel, string> = {
    bronze: 'Primeiro estágio de parceria com o FalcoPoints, celebrando quem iniciou sua jornada.',
    silver: 'Você cria impacto consistente e se conecta com novas oportunidades de transformação.',
    gold: 'Nível máximo para quem lidera campanhas, inspira pessoas e compartilha o voo com a comunidade.'
  };

  const icons: Record<DonorLevel, typeof badges[number]['icon']> = {
    bronze: FiFeather,
    silver: FiTarget,
    gold: FiAward
  };

  return {
    id: level,
    title: titles[level],
    description: descriptions[level],
    color: levelColors[level],
    icon: icons[level],
    benefits: levelBenefits[level]
  };
});
