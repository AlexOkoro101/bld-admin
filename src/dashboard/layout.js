import Overlay from './provider/overlay';
import TopNavigation from './topnavigation';
import SideNavigation from './sidenavigation';
import DashboardProvider from './provider/context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const style = {
  container: `bg-white h-screen overflow-hidden relative`,
  mainContainer: `flex  bg-customBg flex-col shadow h-screen pl-0 md:pl-8 w-full  `,
  main: `h-screen bg-white  w-full lg:w-full m-auto `,
};

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [authScreen, setAuthScreen] = useState(false);
  useEffect(() => {
    if (router.pathname.includes('auth')) {
      setAuthScreen(true);
    } else {
      setAuthScreen(false);
    }
  }, [router]);

  return (
    <DashboardProvider>
      <div className={style.container}>
        <div className="flex items-start">
          <Overlay />
          {authScreen === false && (
            <SideNavigation authScreen={authScreen} mobilePosition="right" />
          )}
          <div className={style.mainContainer}>
            <div className="h-20">
              <TopNavigation authScreen={authScreen} />
            </div>
            <main className={style.main}>{children}</main>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}
