export const XRP_MAINNET_RPC =
  'wss://patient-damp-borough.xrp-mainnet.quiknode.pro/41010697b5aba8391b6246253d0792572048eb37/';

export const MONGOURI = process.env.MONGOURI!;

export const LAMBO_TOKEN_CODE = '4C414D424F000000000000000000000000000000';
export const LAMBO_TOKEN_ISSUER = 'rJXsaaTBAqZRHeLLd13TpbZhraJnGunAvW';

export interface Tier {
  name: 'T1 Max' | 'T2 Max' | 'T3 Max' | 'T4 Max';
  description: string;
  minimumTokensHeld: number;
  maximumTokensHeld: number;
  oneWeekApy: number;
  twoWeeksApy: number;
  oneMonthApy: number;
  threeMonthsApy: number;
  sixMonthsApy: number;
  maxXrpMineable: number;
}

export const tiers: Tier[] = [
  {
    name: 'T1 Max',
    description:
      'Holders of 500K to 2M $LAMBO can mine a maximum of 250 XRP. APY rates range from 50% (7 days) to 1000% (6 months).',
    minimumTokensHeld: 500_000,
    maximumTokensHeld: 4_000_000,
    oneWeekApy: 50,
    twoWeeksApy: 100,
    oneMonthApy: 200,
    threeMonthsApy: 500,
    sixMonthsApy: 1000,
    maxXrpMineable: 250,
  },
  {
    name: 'T2 Max',
    description:
      'Holders of 2.01M to 8M $LAMBO can mine a maximum of 500 XRP. APY rates range from 75% (7 days) to 1000% (6 months)',
    minimumTokensHeld: 4_000_000,
    maximumTokensHeld: 9_900_000,
    oneWeekApy: 75,
    twoWeeksApy: 150,
    oneMonthApy: 300,
    threeMonthsApy: 500,
    sixMonthsApy: 1000,
    maxXrpMineable: 500,
  },
  {
    name: 'T3 Max',
    description:
      'Holders of 10M-19.9M $LAMBO $LAMBO can mine a maximum of 1000 XRP. APY rates range from 100% (7 days) to 1250% (6 months)',
    minimumTokensHeld: 10_000_000,
    maximumTokensHeld: 19_900_000,
    oneWeekApy: 100,
    twoWeeksApy: 200,
    oneMonthApy: 400,
    threeMonthsApy: 600,
    sixMonthsApy: 1250,
    maxXrpMineable: 750,
  },
  {
    name: 'T4 Max',
    description:
      'Holders of 20M+ $LAMBO can mine a maximum of 2000 XRP. APY rates range from 200% (7 days) to 1500% (6 months).',
    minimumTokensHeld: 20_000_000,
    maximumTokensHeld: Infinity,
    oneWeekApy: 150,
    twoWeeksApy: 250,
    oneMonthApy: 400,
    threeMonthsApy: 1000,
    sixMonthsApy: 1500,
    maxXrpMineable: 2000,
  },
];
