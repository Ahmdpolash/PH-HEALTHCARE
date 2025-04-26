import { Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import a1 from "@/assets/images/partner_1.jpg";
import a2 from "@/assets/images/partner_2.jpg";
import a3 from "@/assets/images/partner_3.jpg";
import a4 from "@/assets/images/partner_4.jpg";
import a5 from "@/assets/images/partner_5.jpg";
import a6 from "@/assets/images/partner_1.jpg";

const Partner = () => {
  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        fontWeight={800}
        textAlign={"center"}
      >
        Our Hospital Partners
      </Typography>

      <Grid container spacing={3} my={4} alignItems={"center"}>
        <Grid size={2}>
          <Image
            src={a1}
            height={120}
            width={130}
            alt="Partner "
            className="w-full"
          />
        </Grid>
        <Grid size={2}>
          <Image
            src={a2}
            height={120}
            width={130}
            alt="Partner "
            className="w-full"
          />
        </Grid>
        <Grid size={2}>
          <Image
            src={a3}
            height={120}
            width={130}
            alt="Partner "
            className="w-full"
          />
        </Grid>
        <Grid size={2}>
          <Image
            src={a4}
            height={120}
            width={130}
            alt="Partner "
            className="w-full"
          />
        </Grid>
        <Grid size={2}>
          <Image
            src={a5}
            height={120}
            width={130}
            alt="Partner "
            className="w-full"
          />
        </Grid>
        <Grid size={2}>
          <Image
            src={a6}
            height={120}
            width={130}
            alt="Partner "
            className="w-full"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Partner;
