import ThemeRegistry from "@/styles/ThemeRegistry";
import { Work_Sans } from "next/font/google";
import { MetamaskContextProvider } from "@/contexts/useMetamaskContext";
import { WasapContextProvider } from "@/contexts/useWasapContext";
import ToastProvider from "@/hooks/useToast";
import Toast from "@/components/Utils/Toast/Toast";

export const work_sans = Work_Sans({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Wasap",
  description:
    "Quickly send and receive Wasap messages right from your computer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <ToastProvider>
          <MetamaskContextProvider>
            <WasapContextProvider>
              <body
                style={{ margin: 0, height: "100%", overflow: "hidden" }} // disable scroll window
                className={work_sans.className}
              >
                {children}
                <Toast />
              </body>
            </WasapContextProvider>
          </MetamaskContextProvider>
        </ToastProvider>
      </ThemeRegistry>
    </html>
  );
}
