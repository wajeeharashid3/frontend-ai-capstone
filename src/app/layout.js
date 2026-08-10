import "./globals.css";
import Navigation from "../components/Navigation";

export const metadata = {
  title: "StudyFlow AI",
  description: "AI-powered study planning and productivity assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}