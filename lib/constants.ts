export const XRP_MAINNET_RPC =
  'wss://patient-damp-borough.xrp-mainnet.quiknode.pro/41010697b5aba8391b6246253d0792572048eb37/';

export const MONGOURI = process.env.MONGOURI!;

export const LAMBO_TOKEN_CODE = '4C414D424F000000000000000000000000000000';
export const LAMBO_TOKEN_ISSUER = 'rJXsaaTBAqZRHeLLd13TpbZhraJnGunAvW';

export interface Tier {
  name: 'T1' | 'T2' | 'T3' | 'T4' | 'T5';
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
    name: 'T1',
    description:
      '🐠 up to 200 xrp per wallet mined All holders between 1M-2.99M $LAMBO',
    minimumTokensHeld: 1_000_000,
    maximumTokensHeld: 2_999_999,
    oneWeekApy: 25,
    twoWeeksApy: 50,
    oneMonthApy: 100,
    threeMonthsApy: 300,
    sixMonthsApy: 500,
    maxXrpMineable: 200,
  },
  {
    name: 'T2',
    description:
      '🐬 up to 400 xrp per wallet mined All holders between 3M-5.99M $LAMBO',
    minimumTokensHeld: 3_000_000,
    maximumTokensHeld: 5_999_999,
    oneWeekApy: 50,
    twoWeeksApy: 100,
    oneMonthApy: 200,
    threeMonthsApy: 400,
    sixMonthsApy: 750,
    maxXrpMineable: 400,
  },
  {
    name: 'T3',
    description:
      '🦈 up to 600 xrp per wallet mined All holders between 6M-11.99M $LAMBO',
    minimumTokensHeld: 6_000_000,
    maximumTokensHeld: 11_999_999,
    oneWeekApy: 75,
    twoWeeksApy: 150,
    oneMonthApy: 250,
    threeMonthsApy: 500,
    sixMonthsApy: 1000,
    maxXrpMineable: 600,
  },
  {
    name: 'T4',
    description:
      '🐋 up to 1,000 xrp per wallet mined All holders between 12M-19.99M $LAMBO',
    minimumTokensHeld: 12_000_000,
    maximumTokensHeld: 19_999_999,
    oneWeekApy: 100,
    twoWeeksApy: 200,
    oneMonthApy: 300,
    threeMonthsApy: 750,
    sixMonthsApy: 1250,
    maxXrpMineable: 1000,
  },

  {
    name: 'T5',
    description:
      '🐳 up to 2000 xrp per wallet mined All holders above 20M $LAMBO',
    minimumTokensHeld: 20_000_000,
    maximumTokensHeld: Infinity,
    oneWeekApy: 200,
    twoWeeksApy: 300,
    oneMonthApy: 500,
    threeMonthsApy: 1000,
    sixMonthsApy: 1500,
    maxXrpMineable: 2000,
  },
];
