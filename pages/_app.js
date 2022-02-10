import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../src/dashboard/layout';
import Login from './auth/login';
import '../styles/global.css';
//
import { Provider, useDispatch, useSelector } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useState } from 'react';
import { useEffect } from 'react';
//
//
function MyApp({ Component, pageProps }) {
  const [token, settoken] = useState(null)

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('user'))
    console.log(item);
    settoken(item?.userToken)
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <Head>
          {/* <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
          integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
          crossorigin="anonymous"
        /> */}
        {/* <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"
          crossorigin="anonymous"
        /> */}
        {/* <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.0/css/v4-shims.css"
          crossorigin="anonymous"
        /> */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <title>Buylike Admin </title>
          </Head>
          {token ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>

          ) : (
            <Login></Login>
          )}
        </>
      </PersistGate>
    </Provider>
  );
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
