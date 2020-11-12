import HEAD from 'next/head';

const Head = ({ children }) => (
  <HEAD>
    <title>Lebaros</title>
    <link rel="icon" href="/images/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    {children}
  </HEAD>
);

export default Head;