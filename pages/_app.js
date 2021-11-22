import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../src/dashboard/layout';
import '../styles/global.css';
//
import { Provider, useDispatch, useSelector } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
//
//
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <Head>
            <title>Buylike Admin </title>
          </Head>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </>
      </PersistGate>
    </Provider>
  );
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
