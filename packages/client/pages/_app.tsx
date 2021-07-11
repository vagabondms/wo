import React from 'react';
import type { AppProps } from 'next/app';

import wrapper from '../redux/store/store';

const App = ({ Component }: AppProps) => {
  return <Component />;
};

export default wrapper.withRedux(App);
