export const XRP_MAINNET_RPC =
  'wss://patient-damp-borough.xrp-mainnet.quiknode.pro/41010697b5aba8391b6246253d0792572048eb37/';

export const MONGOURI = process.env.MONGOURI!;

export const LAMBO_TOKEN_CODE = '4C414D424F000000000000000000000000000000';
export const LAMBO_TOKEN_ISSUER = 'rJXsaaTBAqZRHeLLd13TpbZhraJnGunAvW';

export interface Tier {
  name:
    | 'T1 - LAMBORGHINI AVENTADOR 🚨'
    | 'T2 - LAMBORGHINI REVENTON 🚨'
    | 'T3 - LAMBORGHINI CENTENARIO 🚨'
    | 'T4 - LAMBORGHINI EGOISTA 🚨'
    | 'T5 - LAMBORGHINI SIAN 🚨'
    | 'T6 - LAMBORGHINI VENENO 🚨';
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
    name: 'T1 - LAMBORGHINI AVENTADOR 🚨',
    description:
      '💎 Hold 250K-999K $LAMBO and pack up to 100 XRP in your trunk to fuel your rewards!',
    minimumTokensHeld: 250_000,
    maximumTokensHeld: 999_999,
    oneWeekApy: 20,
    twoWeeksApy: 40,
    oneMonthApy: 40,
    threeMonthsApy: 60,
    sixMonthsApy: 100,
    maxXrpMineable: 100,
  },
  {
    name: 'T2 - LAMBORGHINI REVENTON 🚨',
    description:
      '💎 Hold 1M-2.99M $LAMBO and pack up to 200 XRP in your trunk to fuel your rewards!',
    minimumTokensHeld: 1_000_000,
    maximumTokensHeld: 2_999_999,
    oneWeekApy: 40,
    twoWeeksApy: 60,
    oneMonthApy: 60,
    threeMonthsApy: 120,
    sixMonthsApy: 250,
    maxXrpMineable: 200,
  },
  {
    name: 'T3 - LAMBORGHINI CENTENARIO 🚨',
    description:
      '💎 Hold 3M-5.99M $LAMBO and pack up to 400 XRP in your trunk to fuel your rewards!',
    minimumTokensHeld: 3_000_000,
    maximumTokensHeld: 5_999_999,
    oneWeekApy: 60,
    twoWeeksApy: 80,
    oneMonthApy: 80,
    threeMonthsApy: 200,
    sixMonthsApy: 400,
    maxXrpMineable: 400,
  },
  {
    name: 'T4 - LAMBORGHINI EGOISTA 🚨',
    description:
      '💎 Hold 6M-10.99M $LAMBO and pack up to 600 XRP in your trunk to fuel your rewards!',
    minimumTokensHeld: 6_000_000,
    maximumTokensHeld: 10_999_999,
    oneWeekApy: 80,
    twoWeeksApy: 120,
    oneMonthApy: 120,
    threeMonthsApy: 300,
    sixMonthsApy: 500,
    maxXrpMineable: 600,
  },

  {
    name: 'T5 - LAMBORGHINI SIAN 🚨',
    description:
      '💎 Hold 11M-19.99M $LAMBO and pack up to 1,000 XRP in your trunk to fuel your rewards!',
    minimumTokensHeld: 11_000_000,
    maximumTokensHeld: 19_999_999,
    oneWeekApy: 100,
    twoWeeksApy: 150,
    oneMonthApy: 150,
    threeMonthsApy: 350,
    sixMonthsApy: 600,
    maxXrpMineable: 1000,
  },
  {
    name: 'T6 - LAMBORGHINI VENENO 🚨',
    description:
      '💎 Hold 20M+ $LAMBO and pack up to 2,000 XRP in your trunk to fuel your rewards!',
    minimumTokensHeld: 20_000_000,
    maximumTokensHeld: Infinity,
    oneWeekApy: 120,
    twoWeeksApy: 120,
    oneMonthApy: 200,
    threeMonthsApy: 400,
    sixMonthsApy: 800,
    maxXrpMineable: 2000,
  },
];
