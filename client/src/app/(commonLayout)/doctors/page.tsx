import { Box, Container } from "@mui/material";
import DashedLine from "./component/DashedLine";
import DoctorCard from "./component/DoctorCard";
import ScrollCategory from "./component/ScrollCategory";

interface PropType {
  searchParams: { specialities: string };
}

const Doctors = async ({ searchParams }: PropType) => {
  let res;

  if (searchParams.specialities) {
    res = await fetch(
      `http://localhost:5000/api/v1/doctor?specialities=${searchParams.specialities}`
    );
  } else {
    res = await fetch("http://localhost:5000/api/v1/doctor");
  }

  const { data } = await res.json();

  return (
    <Container>
      <DashedLine />
      <ScrollCategory specialities={searchParams.specialities} />
      <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
        {data.map((doctor: any, index: number) => (
          <Box key={index} sx={{ mb: 2 }}>
            <DoctorCard doctor={doctor} />
            {index === data.length - 1 ? null : <DashedLine />}
          </Box>
        ))}

        {data.length === 0 && <Box textAlign={"center"} mt={4}>No Doctor Found With This Specialty</Box>}
      </Box>
    </Container>
  );
};

export default Doctors;
