import Boot from "@/components/Boot";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Systems from "@/components/Systems";
import SecurityLab from "@/components/SecurityLab";
import Arsenal from "@/components/Arsenal";
import Experience from "@/components/Experience";
import BuildLog from "@/components/BuildLog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import HireMeModal from "@/components/HireMeModal";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Boot />
      <CustomCursor />
      <Nav />
      <HireMeModal />
      <main id="main">
        <Hero />
        <Profile />
        <Systems />
        <SecurityLab />
        <Arsenal />
        <Experience />
        <BuildLog />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
