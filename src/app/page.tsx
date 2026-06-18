import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Servicios } from "@/components/Servicios";
import { Cobertura } from "@/components/Cobertura";
import { Beneficios } from "@/components/Beneficios";
import { Normatividad } from "@/components/Normatividad";
import { Contacto } from "@/components/Contacto";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { TestModeBanner } from "@/components/TestModeBanner";

export default function HomePage() {
  return (
    <main>
      <TestModeBanner />
      <Navbar />
      <Hero />
      <div className="divider-soft" aria-hidden />
      <Servicios />
      <div className="divider-soft" aria-hidden />
      <Cobertura />
      <div className="divider-soft" aria-hidden />
      <Beneficios />
      <Normatividad />
      <Contacto />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
