import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Tier } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useTiers = () => {
  return useQuery({
    queryKey: ['tiers'],
    queryFn: async () => {
      const response = await axios.get('/api/admin/getTiers');
      return response.data.tiers;
    },
  });
};

const HowItWorks = () => {
  const { data: tiers, isPending } = useTiers();

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value="item-1"
        className="rounded-xl border-none bg-[var(--color-bg)] dark:bg-[var(--color-bg)]"
      >
        <AccordionTrigger className="p-4 text-[var(--color-black)] hover:no-underline">
          How to Earn XRP
        </AccordionTrigger>
        <AccordionContent className="p-4">
          <ul className="flex list-inside list-decimal flex-col gap-4">
            <li className="font-bold leading-[20.83px] text-[var(--color-black)] [&>span]:font-normal">
              Deposit and Start Earning XRP <br />
              <span>
                Users can begin earning XRP by choosing the period that $LAMBO
                tokens will be going along for the ride. Once deposited, the
                system automatically detects their holdings and assigns them to
                the &quot;Let&apos;s ride&quot; option which users can then
                determine the amount of XRP to pack along for the journey to
                start earning XRP rewards based on their duration and tier
                level.
              </span>
            </li>
            <li className="font-bold leading-[20.83px] text-[var(--color-black)] [&>span]:font-normal">
              Fixed APY and Tier-Based Rewards <br />
              <span>
                The platform offers tier-based APY rewards, where higher $LAMBO
                holdings and longer staking periods yield greater returns.
              </span>
              <ul className="ml-6 list-disc font-normal">
                {isPending ? (
                  <Skeleton className="mt-5 h-[20rem] w-full animate-pulse" />
                ) : (
                  tiers.map((tier: Tier) => (
                    <li key={tier.name}>
                      {tier.name}: {tier.description}
                    </li>
                  ))
                )}
              </ul>
            </li>
            <li className="font-bold leading-[20.83px] text-[var(--color-black)] [&>span]:font-normal">
              Reinvestment Option <br />
              <span>
                Users can reinvest their earned XRP back into the pool to
                maximize their rewards. Reinvesting resets the staking timer,
                allowing for continuous reward compounding.
              </span>
            </li>
            <li className="font-bold leading-[20.83px] text-[var(--color-black)] [&>span]:font-normal">
              Emergency Withdrawal Policy <br />
              <ul className="ml-6 list-disc font-normal">
                <li>
                  Ejecting early before the end of their period will forfeit all
                  earned XRP rewards but all XRP packed for the journey will be
                  handed back.
                </li>
                <li>
                  Additionally, 50% of their staked $LAMBO tokens will be lost
                  as a penalty
                </li>
              </ul>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HowItWorks;
