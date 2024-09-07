import type { Metadata } from "next";
import Script from "next/script";
import { Alice } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const alice = Alice({
  subsets: ["latin"],
  variable: "--font-radiant-union",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Kenil & Mansi's Wedding Invitation",
  description:
    "Join Kenil & Mansi in celebrating their wedding. Find event details on our wedding invitation page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${alice.className} antialiased`}>
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{}}
        />
        {process.env.NODE_ENV === "production" && (
          <Script id="clarity-script" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "nudyntbud5");`}
          </Script>
        )}
      </body>
    </html>
  );
}
