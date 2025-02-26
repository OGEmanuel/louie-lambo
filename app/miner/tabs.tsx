import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Deposit from './deposit';
import Withdraw from './withdraw';

const MinerTabs = () => {
  return (
    <Tabs defaultValue="deposit" className="">
      <TabsList>
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
      </TabsList>
      <TabsContent value="deposit" className="w-full">
        <Deposit />
      </TabsContent>
      <TabsContent value="withdraw" className="w-full">
        <Withdraw />
      </TabsContent>
    </Tabs>
  );
};

export default MinerTabs;
