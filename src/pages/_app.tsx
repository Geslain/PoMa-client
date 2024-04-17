import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Layout from "@/pages/layout";
import { ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & {
  Component: AppProps["Component"] & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}) {
  const getLayout =
    Component.getLayout ?? ((page: ReactNode) => <Layout>{page}</Layout>);
  return (
    <SessionProvider session={session}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}
