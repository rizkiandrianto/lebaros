import Head from 'next/head';

const HEAD = ({ children }) => (
  <Head>
    <title>Lebaros</title>
    <link rel="icon" href="/images/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    {children}
  </Head>
);

export default HEAD;