import Head from 'next/head';
import Style from '../../styles/bundle.scss';

export default ({ children, defaultStyle= true }) => (
  <Head>
    <title>Sorabel</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    {defaultStyle && <style dangerouslySetInnerHTML={{ __html: Style }} />}
    {children}
  </Head>
);
