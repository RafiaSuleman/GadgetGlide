import Hero from "./components/hero";
import FeatureProducts from "./components/featureProducts";
import Trust from "./components/trust";
import CTA from "./components/cta";

export default async function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fc] text-[#111827]">
      <Hero />
      <Trust />
      <FeatureProducts /> 
      <CTA/>
    </main>
  );
}
