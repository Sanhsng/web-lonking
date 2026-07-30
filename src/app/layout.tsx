import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="bg-background text-on-surface antialiased font-body-md text-body-md overflow-x-hidden selection:bg-secondary-container selection:text-on-secondary-container">
        {children}
      </body>
    </html>
  )
}
