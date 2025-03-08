'use client';

import SectionCard from '@/components/section-card';
import OverviewMain from './overview-main';
import { useContext, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
// import Error from '@/components/alerts/error';
// import Success from '@/components/alerts/success';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext.error) {
      toast.error(appContext.error, {
        position: 'bottom-right',
      });
    } else if (appContext.success) {
      toast.success(appContext.success, {
        position: 'bottom-right',
      });
    }
  }, [appContext.error, appContext.success]);

  return (
    <SectionCard>
      <OverviewMain />

      <div className="absolute bottom-0 md:right-0">
        {/* {appContext.error && <Error errorText={appContext.error} />}
        {appContext.success && <Success successText={appContext.success} />} */}

        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </SectionCard>
  );
}
