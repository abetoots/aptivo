import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="og:url" content="https://aptivo.io" />
        <meta name="og:title" content="Aptivo | Automate Digital Marketing" />
        <meta
          name="og:description"
          content="Aptivo is a digital marketing automation platform that helps you create and manage your digital marketing campaigns."
        />
        <meta name="og:type" content="website" />
        <link
          rel="icon"
          type="image/x-icon"
          href="/aptivo-website-favicon-color.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
