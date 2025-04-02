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
    oneWeekApy: 50,
    twoWeeksApy: 50,
    oneMonthApy: 100,
    threeMonthsApy: 200,
    sixMonthsApy: 400,
    maxXrpMineable: 100,
  },
  {
    name: 'T2 - LAMBORGHINI REVENTON 🚨',
    description:
      '💎 Hold 1M-2.99M $LAMBO and pack up to 200 XRP in your trunk to fuel your rewards!',
    minimumTokensHeld: 1_000_000,
    maximumTokensHeld: 2_999_999,
    oneWeekApy: 100,
    twoWeeksApy: 100,
    oneMonthApy: 200,
    threeMonthsApy: 400,
    sixMonthsApy: 600,
    maxXrpMineable: 200,
  },
  {
    name: 'T3 - LAMBORGHINI CENTENARIO 🚨',
    description:
      '💎 Hold 3M-5.99M $LAMBO and pack up to 400 XRP in your trunk to fuel your rewards!',
    minimumTokensHeld: 3_000_000,
    maximumTokensHeld: 5_999_999,
    oneWeekApy: 150,
    twoWeeksApy: 150,
    oneMonthApy: 300,
    threeMonthsApy: 500,
    sixMonthsApy: 750,
    maxXrpMineable: 400,
  },
  {
    name: 'T4 - LAMBORGHINI EGOISTA 🚨',
    description:
      '💎 Hold 6M-10.99M $LAMBO and pack up to 600 XRP in your trunk to fuel your rewards!',
    minimumTokensHeld: 6_000_000,
    maximumTokensHeld: 10_999_999,
    oneWeekApy: 200,
    twoWeeksApy: 200,
    oneMonthApy: 400,
    threeMonthsApy: 650,
    sixMonthsApy: 900,
    maxXrpMineable: 600,
  },

  {
    name: 'T5 - LAMBORGHINI SIAN 🚨',
    description:
      '💎 Hold 11M-19.99M $LAMBO and pack up to 1,000 XRP in your trunk to fuel your rewards!',
    minimumTokensHeld: 11_000_000,
    maximumTokensHeld: 19_999_999,
    oneWeekApy: 250,
    twoWeeksApy: 250,
    oneMonthApy: 450,
    threeMonthsApy: 700,
    sixMonthsApy: 1000,
    maxXrpMineable: 1000,
  },
  {
    name: 'T6 - LAMBORGHINI VENENO 🚨',
    description:
      '💎 Hold 20M+ $LAMBO and pack up to 2,000 XRP in your trunk to fuel your rewards!',
    minimumTokensHeld: 20_000_000,
    maximumTokensHeld: Infinity,
    oneWeekApy: 200,
    twoWeeksApy: 200,
    oneMonthApy: 450,
    threeMonthsApy: 700,
    sixMonthsApy: 1000,
    maxXrpMineable: 2000,
  },
];
