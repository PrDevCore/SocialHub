import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css"; // Ensure standard Tailwind CSS imports are here

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SocialSphere - AI Social Media Hub",
  description: "Automate and publish your social content with AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full bg-slate-950 text-slate-50">
        <body className={`${inter.className} h-full antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}