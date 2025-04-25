import Hero from "@/components/ui/home/Hero";
import Specialist from "@/components/ui/home/Specialist";
import TopRatedDoctors from "@/components/ui/home/TopRatedDoctors";
import WhyChoose from "@/components/ui/home/WhyChoose";


export default function Home() {
  return (
    <div>
      <Hero />
      <Specialist />
      <TopRatedDoctors />
      <WhyChoose />
    </div>
  );
}
