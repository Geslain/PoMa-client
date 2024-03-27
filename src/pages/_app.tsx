import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Layout from "@/pages/layout";
import { ReactNode } from "react";
import "../app/globals.css";

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
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}
