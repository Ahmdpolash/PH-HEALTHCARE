import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const Specialist = async () => {
  const res = await fetch("http://localhost:5000/api/v1/specialties", {
    next: {
      revalidate: 30,
    },
  });
  const { data } = await res.json();

  return (
    <Container>
      <Box sx={{ margin: "40px 0" }}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Explore Treatments Across Specialties
          </Typography>
          <Typography
            color="gray"
            component="p"
            fontWeight={300}
            fontSize={18}
            mt={1}
          >
            Find Experienced Doctors Across All Specialties
          </Typography>
        </Box>
        <Stack direction="row" gap={4} mt={5}>
          {data?.map((specialty: any) => (
            <Box
              key={specialty.id}
              sx={{
                flex: 1,
                width: "150px",
                backgroundColor: "rgba(245, 245, 245,1)",
                border: "1px solid rgba(250, 250, 250, 1)",
                borderRadius: "10px",
                textAlign: "center",
                padding: "30px 10px",
                "& img": {
                  width: "50px",
                  height: "50px",
                  margin: "0 auto",
                },
                "&:hover": {
                  border: "1px solid rgba(36, 153, 239, 1)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.5s",
                },
              }}
            >
              <Image
                src={specialty.icon}
                // src={assets.images.doctor1}
                width={100}
                height={100}
                alt={specialty.title}
              />
              <Box>
                <Typography component="p" fontWeight={600} fontSize={16} mt={2}>
                  {specialty.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>{" "}
        <Button
          variant="outlined"
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            textAlign: "center",
          }}
        >
          View ALL
        </Button>
      </Box>
    </Container>
  );
};
export default Specialist;
