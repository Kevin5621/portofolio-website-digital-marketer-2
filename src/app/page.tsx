import AboutMe from "@/components/about";
import CertificateAndExperience from "@/components/certificate";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { Portfolio } from "@/components/portofolio";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar variant="light" />
      <Hero />
      <CertificateAndExperience  />
      <AboutMe />
      <Portfolio />
    </main>
  );
}