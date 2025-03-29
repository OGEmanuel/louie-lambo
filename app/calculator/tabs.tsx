import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Miner from './miner';

const CalculatorTabs = () => {
  return (
    <Tabs defaultValue="miner" className="">
      <TabsList>
        {/* <TabsTrigger value="stake">Stake</TabsTrigger> */}
        <TabsTrigger
          value="miner"
          className="transition-all hover:rotate-6 hover:skew-x-12 hover:scale-150"
        >
          Calculate your XRP rewards
        </TabsTrigger>
      </TabsList>
      {/* <TabsContent value="stake" className="w-full">
        <Stake />
      </TabsContent> */}
      <TabsContent value="miner" className="w-full">
        <Miner />
      </TabsContent>
    </Tabs>
  );
};

export default CalculatorTabs;
