import React, { useEffect } from 'react';
import Head from 'next/head'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import fetchProxyHandler from  "../src/fetchConfig"

function MyApp({ Component, pageProps }:{Component: React.ComponentClass,pageProps:React.ComponentProps<any>}) {
    useEffect(() => {

        // 配置fetch请求拦截的代理
        let fetchProxy = new Proxy(fetch,fetchProxyHandler);
        window.fetch = fetchProxy

    });
    console.dir(Component)
    return <div className="container">
                <Head>
                    <title>Blog</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
            </div>
}
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

  
export default MyApp