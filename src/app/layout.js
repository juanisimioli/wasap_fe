import ThemeRegistry from "@/styles/ThemeRegistry";
import { Work_Sans } from "next/font/google";
import { MetamaskContextProvider } from "@/contexts/useMetamaskContext";
import { WasapContextProvider } from "@/contexts/useWasapContext";

export const work_sans = Work_Sans({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "wasap",
  description: "Send secure emails over web 3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <MetamaskContextProvider>
          <WasapContextProvider>
            <body className={work_sans.className}>{children}</body>
          </WasapContextProvider>
        </MetamaskContextProvider>
      </ThemeRegistry>
    </html>
  );
}
