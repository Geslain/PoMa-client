import { Bounce, ToastContainer } from "react-toastify";
import { StyledEngineProvider } from "@mui/material";
import { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "PoMa - Project Management tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main id={"__next"}>
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
          <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
        </main>
      </body>
    </html>
  );
}
