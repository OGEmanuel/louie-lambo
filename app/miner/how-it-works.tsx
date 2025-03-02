import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HowItWorks = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value="item-1"
        className="rounded-xl border-none bg-[var(--color-bg)]"
      >
        <AccordionTrigger className="p-4 text-[var(--color-black)] hover:no-underline">
          How Lambo Miner works
        </AccordionTrigger>
        <AccordionContent className="p-4">
          <ul className="flex list-inside list-decimal flex-col gap-4">
            <li className="font-bold leading-[20.83px] text-[var(--color-black)] [&>span]:font-normal">
              Deposit and Start Mining <br />
              <span>
                Users can begin mining by staking their $LAMBO tokens. Once
                deposited, the system automatically detects their holdings and
                assigns them to a mining tier. Mining begins instantly,
                generating XRP rewards based on their staking duration and tier
                level.
              </span>
            </li>
            <li className="font-bold leading-[20.83px] text-[var(--color-black)] [&>span]:font-normal">
              Fixed APY and Tier-Based Rewards <br />
              <span>
                The platform offers tier-based APY rewards, where higher $LAMBO
                holdings and longer staking periods yield greater returns. APY
                rates are structured as follows:
              </span>
              <ul className="ml-6 list-disc font-normal">
                <li>Tier 1: 50% (7 days) to 1000% (6 months), max 250 XRP</li>
                <li>Tier 2: 75% (7 days) to 1000% (6 months), max 500 XRP</li>
                <li>Tier 3: 100% (7 days) to 1250% (6 months), max 1000 XRP</li>
                <li>Tier 4: 200% (7 days) to 1500% (6 months), max 2000 XRP</li>
              </ul>
            </li>
            <li className="font-bold leading-[20.83px] text-[var(--color-black)] [&>span]:font-normal">
              Reinvestment Option <br />
              <span>
                Users can reinvest their earned XRP back into the mining pool to
                maximize their rewards. Reinvesting resets the staking lock
                timer, allowing for continuous reward compounding
              </span>
            </li>
            <li className="font-bold leading-[20.83px] text-[var(--color-black)] [&>span]:font-normal">
              Emergency Withdrawal Policy <br />
              <ul className="ml-6 list-disc font-normal">
                <li>
                  Emergency Withdrawal Policy Users withdrawing before the end
                  of their staking period will forfeit all earned XRP rewards.
                </li>
                <li>
                  Additionally, 50% of their staked $LAMBO tokens will be lost
                  as a penalty
                </li>
              </ul>
            </li>
            <li className="font-bold leading-[20.83px] text-[var(--color-black)] [&>span]:font-normal">
              The platform provides real-time insights, including: <br />
              <ul className="ml-6 list-disc font-normal">
                <li>Current $LAMBO holdings</li>
                <li>Staked and mined XRP balance</li>
                <li>Live tracking of XRP being generated per second</li>
                <li>Total XRP pooled and distributed.</li>
              </ul>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HowItWorks;
