import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Stake from './stake';
import Miner from './miner';

const CalculatorTabs = () => {
  return (
    <Tabs defaultValue="stake" className="">
      <TabsList>
        <TabsTrigger value="stake">Stake</TabsTrigger>
        <TabsTrigger value="miner">Miner</TabsTrigger>
      </TabsList>
      <TabsContent value="stake" className="w-full">
        <Stake />
      </TabsContent>
      <TabsContent value="miner" className="w-full">
        <Miner />
      </TabsContent>
    </Tabs>
  );
};

export default CalculatorTabs;
