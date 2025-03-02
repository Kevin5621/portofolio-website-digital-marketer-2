import AboutMe from "@/components/about";
import CertificateAndExperience from "@/components/certificate";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { Portfolio } from "@/components/portofolio";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <CertificateAndExperience  />
      <AboutMe />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}