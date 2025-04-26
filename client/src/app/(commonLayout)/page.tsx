import BuyMedicine from "@/components/ui/home/BuyMedicine";
import Hero from "@/components/ui/home/Hero";
import Partner from "@/components/ui/home/Partner";
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
      <BuyMedicine />
      <Partner />
    </div>
  );
}
