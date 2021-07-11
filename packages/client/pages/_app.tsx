import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import wrapper from '../redux/store/store';

import '../styles.css';

const App = ({ Component }: AppProps) => {
  return (
    <>
      <Head>
        <title>Workout!</title>
      </Head>
      <Component />
    </>
  );
};

export default wrapper.withRedux(App);
