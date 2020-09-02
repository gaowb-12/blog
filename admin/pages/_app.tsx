// import App from 'next/app'
import Head from 'next/head'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function MyApp({ Component, pageProps }:{Component: React.ComponentClass,pageProps:React.ComponentProps<any>}) {
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
//
//   return { ...appProps }
// }
  
export default MyApp