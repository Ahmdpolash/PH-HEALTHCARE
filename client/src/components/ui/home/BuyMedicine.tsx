import Image from "next/image";
import React from "react";
import img from "@/assets/images/3.webp";
import img2 from "@/assets/images/4.svg";
import img3 from "@/assets/images/5.svg";
import { Button, Container } from "@mui/material";

const BuyMedicine = () => {
  return (
    <Container>
      <div className="my-16 relative border-b-[1px] border-black-100">
        <div className=" ">
          <div className="flex 2xl:items-center sm:items-start gap-16 py-[81px] flex-col xl:flex-row">
            <Image
              alt="Buy Medicines"
              loading="lazy"
              width="607"
              height="658"
              decoding="async"
              data-nimg="1"
              src={img}
            />
            <div className="">
              <h2 className="lg:text-5xl text-4xl font-bold tracking-[1%] lg:leading-[64px] md:leading-[56px] text-black-950 mb-10">
                Buy Medicines online <br /> from home
              </h2>

              <p className="mb-6 text-2xl leading-10 text-black-800">
                Authentic medicines with discounts &amp; free home delivery{" "}
                <br />
                within Dhaka city
              </p>
              <p className="text-sm text-black-500 leading-[22px]">
                *Conditions apply
              </p>
              <Button sx={{ mt: 2 }} variant="contained">
                Buy Medicine
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0">
          <Image src={img2} alt="Buy Medicines" width={200} height={200} />
        </div>
        <div className="absolute bottom-0 right-0">
          <Image src={img3} alt="Buy Medicines" width={300} height={200} />
        </div>
      </div>
    </Container>
  );
};

export default BuyMedicine;
