import React, { useEffect } from 'react';
import { withRouter } from 'next/router'
import Head from 'next/head'
import Layout from "../src/components/Layout"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import fetchProxyHandler from  "../src/fetchConfig"

function MyApp({ Component, pageProps, router }:{Component: React.ComponentClass,pageProps:React.ComponentProps<any>,router:any}) {
    useEffect(() => {

        // 配置fetch请求拦截的代理
        let fetchProxy = new Proxy(fetch,fetchProxyHandler);
        window.fetch = fetchProxy

    });
    return <div className="container">
                <Head>
                    <title>Blog</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {
                    ["/login","/register"].indexOf(router.pathname)==-1?
                    <Layout {...router}>
                        <Component {...pageProps} />
                    </Layout>
                    :
                    <Component {...pageProps} />
                }
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

  
export default withRouter(MyApp)