import React from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {

  const AnyComponent = Component as any;
  return (
    <AnyComponent {...pageProps}  />
  );
}
export default appWithTranslation(MyApp);
