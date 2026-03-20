import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import Difference from "./components/Difference";
import FourScreens from "./components/FourScreens";
import HowItWorks from "./components/HowItWorks";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";

const StarField = dynamic(() => import("./components/StarField"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen" style={{ background: "#050510" }}>
      {/* Star field — fixed behind everything */}
      <StarField />

      {/* All page content sits above stars */}
      <div className="relative z-10">
        <Hero />
        <Difference />
        <FourScreens />
        <HowItWorks />
        <Waitlist />
        <Footer />
      </div>
    </main>
  );
}
