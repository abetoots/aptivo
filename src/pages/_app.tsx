//Misc
import { SessionProvider } from "next-auth/react";
import { api } from "~/lib/api";
import "~/styles/globals.css";
import { Rubik } from "next/font/google";

//Types
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mainFont = Rubik({
  subsets: ["latin"],
  weight: ["600", "400", "500", "700", "800", "900"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer
        autoClose={false}
        hideProgressBar={true}
        draggable={false}
        closeButton={false}
      />
      <style jsx global>
        {`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p {
            font-family: ${mainFont.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
