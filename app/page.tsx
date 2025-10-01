import Navbar from "@/components/Navbar";
import HexBackground from "@/components/HexBackground";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HexBackground>
        <Hero />
      </HexBackground>
    </main>
  );
}
