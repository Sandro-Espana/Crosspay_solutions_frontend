import { Navbar } from "@/components/layout/Navbar";
import HexBackground from "@/components/layout/HexBackground";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <HexBackground>
        <Navbar />
        <Hero />
      </HexBackground>
    </main>
  );
}
