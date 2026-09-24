import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "../components/providers/AppProviders";
import { AppShell } from "../components/shell/AppShell";

const inter = { variable: "" };
const ibmPlexMono = { variable: "" };

export const metadata: Metadata = {
  title: "TEL PRAGATI | Baghewala Digital Twin | Oil India Limited",
  description: "Physics-informed Heavy Oil Reservoir & Artificial Lift Digital Twin Platform for Jodhpur Sandstone CSS operations.",
  icons: {
    icon: "/logo_transparent.png",
    shortcut: "/logo_transparent.png",
    apple: "/logo_transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`light ${inter.variable} ${ibmPlexMono.variable}`}>
      <head>
        {/* Light is the default theme; only switch to dark if the user explicitly chose it before */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('tel-pragati-theme');if(t==='dark'){document.documentElement.classList.remove('light')}else{document.documentElement.classList.add('light')}}catch(e){}",
          }}
        />
      </head>
      <body className="bg-surface-0 text-text-primary font-sans antialiased min-h-screen flex flex-col selection:bg-accent-mechanical/30 selection:text-white">
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
