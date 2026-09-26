import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin:0, padding:0, backgroundColor:"#0f0f0f", color:"#ffffff",
        fontFamily:"Inter, sans-serif", width:"100%", overflowX:"hidden"}}>
        <PlanProvider>
          <Navbar />
          <main style={{width:"100%"}}>
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" toastOptions={{
            style:{background:"#1a1a1a", color:"#fff", border:"1px solid #333"},
            success:{iconTheme:{primary:"#ccff00", secondary:"#000"}}
          }} />
        </PlanProvider>
      </body>
    </html>
  );
}
