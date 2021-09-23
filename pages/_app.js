import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../src/dashboard/layout';
import '../styles/global.css';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Buylike Admin </title>
      </Head>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </>
  );
}

export default MyApp;
