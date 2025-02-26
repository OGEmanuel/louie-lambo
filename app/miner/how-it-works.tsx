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
        <AccordionTrigger className="p-4 hover:no-underline">
          How Lambo Miner works
        </AccordionTrigger>
        <AccordionContent className="p-4">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HowItWorks;
