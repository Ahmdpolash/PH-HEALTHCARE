"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import assets from "@/assets";
import Link from "next/link";
const TopRatedDoctors = async () => {
  const res = await fetch("http://localhost:5000/api/v1/doctor?page=1&limit=3");
  const { data: doctors } = await res.json();

  return (
    <Box
      sx={{
        my: 4,
        py: 30,
        backgroundColor: "rgba(245, 245, 245,1)",
        clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Our Top Rated Doctors
        </Typography>
        <Typography component="p" fontSize={18} fontWeight={400} sx={{ mt: 2 }}>
          Access to expert physicians and surgeons, advanced technologies
        </Typography>
        <Typography component="p" fontSize={18} fontWeight={400}>
          and top-quality surgery facilities right here.
        </Typography>
      </Box>

      <Container sx={{ margin: "30px auto" }}>
        <Stack direction={"row"} gap={4}>
          {doctors.map((doctor: any) => (
            <Box key={doctor.id}>
              <Card sx={{ maxHeight: "450px" }}>
                <Box>
                  <Image
                    src={doctor?.profilePhoto || assets.images.defaultDoctor}
                    alt="doctor"
                    width={400}
                    height={100}
                    className="h-[200px] w-full object-"
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {doctor?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor?.qualification}, {doctor?.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    <LocationOnIcon /> {doctor?.address}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    px: 2,
                    paddingBottom: "20px",
                  }}
                >
                  <Button>Book Now</Button>
                  <Button variant="outlined">View Profile</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Stack>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              marginTop: "20px",
            }}
            component={Link}
            href="/doctors"
          >
            View ALL
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
export default TopRatedDoctors;
