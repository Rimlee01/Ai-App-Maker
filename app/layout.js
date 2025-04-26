import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ai App Maker",
  description:"Ai App Maker lets you build full-stack apps instantly with AI. Generate, preview, and deploy code in real-time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
      >
        <ConvexClientProvider>
        <Provider>
          {children}

        </Provider>
        </ConvexClientProvider>

      </body>
    </html>
  );
}
