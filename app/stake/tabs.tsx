import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Stake from './stake';

const StakeTabs = () => {
  return (
    <Tabs defaultValue="stake" className="">
      <TabsList>
        <TabsTrigger value="stake">Stake</TabsTrigger>
        <TabsTrigger value="unstake">Unstake</TabsTrigger>
      </TabsList>
      <TabsContent value="stake" className="w-full">
        <Stake />
      </TabsContent>
      <TabsContent value="unstake">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default StakeTabs;
