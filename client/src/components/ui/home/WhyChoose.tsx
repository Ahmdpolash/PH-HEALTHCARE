import { CheckCircleRounded } from "@mui/icons-material";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

import img from "@/assets/images/1.webp";
import img2 from "@/assets/images/2.webp";

const WhyChoose = () => {
  return (
    <Container>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" component={"h5"} color="primary.main">
            Why Us
          </Typography>
          <Typography variant="h4" component={"h2"} fontWeight={600}>
            Why Choose DocTime ?
          </Typography>
        </Box>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          my={4}
          gap={4}
        >
          <Box sx={{ flex: 1 }}>
            <Image
              src={img}
              height={120}
              width={450}
              alt="image"
              className="w-full"
            />
          </Box>{" "}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component={"p"}
              sx={{ lineHeight: "1.2", fontWeight: "800" }}
              fontSize={37}
            >
              Bangladesh leading healthcare app for online doctor consultation.
            </Typography>
            <Stack direction={"column"} gap={2} my={"19px"}>
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  backgroundColor: "rgba(245, 245, 245,1)",
                  padding: "15px",
                  borderRadius: "10px 10px 100px 10px",
                }}
              >
                <CheckCircleRounded
                  sx={{ color: "#8D65FC", fontSize: "35px" }}
                />
                <span className="text-[20px]">
                  Access any GP or specialist doctor you need at anytime from
                  anywhere.
                </span>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  backgroundColor: "rgba(245, 245, 245,1)",
                  padding: "15px",
                  borderRadius: "10px 100px 10px 10px",
                }}
              >
                <CheckCircleRounded
                  sx={{ color: "#60DF31", fontSize: "35px" }}
                />
                <span className="text-[20px]">
                  Access to online prescriptions, medicine delivery, and
                  diagnostic tests.
                </span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  backgroundColor: "rgba(245, 245, 245,1)",
                  padding: "15px",
                  borderRadius: "10px 10px 100px 10px",
                }}
              >
                <CheckCircleRounded
                  sx={{ color: "#40B4FA", fontSize: "35px" }}
                />
                <span className="text-[20px]">
                  Easy subscription packages to protect you and your loved one’s
                  health and wellbeing.
                </span>
              </Box>
            </Stack>
          </Box>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          my={4}
          gap={2}
        >
          <Box maxWidth={"60%"}>
            <Typography
              variant="h6"
              component={"p"}
              sx={{ lineHeight: "1.2", fontWeight: "800" }}
              fontSize={40}
            >
              Access convenient online Healthcare with DocTime
            </Typography>
            <Typography
              color="gray"
              variant="h6"
              component={"p"}
              sx={{ fontWeight: "200", marginTop: "15px", lineHeight: "1.4" }}
              fontSize={21}
            >
              DocTime offers you the convenience of accessing care from
              anywhere, saving time, and ensuring you to get the attention you
              need without the hassle of traveling to a clinic. Whether it's for
              routine check-ups, follow-ups, or managing ongoing health
              conditions, online consultations provide a flexible and efficient
              solution. Embrace the future of healthcare by exploring our online
              consultation options today.
            </Typography>
          </Box>
          <Box maxWidth={"35%"} width={"100%"}>
            <Image
              src={img2}
              height={120}
              width={850}
              alt="image"
              className="w-full h-full"
            />
          </Box>{" "}
        </Stack>
      </Box>
    </Container>
  );
};

export default WhyChoose;
