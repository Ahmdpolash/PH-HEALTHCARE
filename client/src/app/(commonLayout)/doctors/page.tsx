import { Box, Container } from "@mui/material";
import DashedLine from "./component/DashedLine";
import DoctorCard from "./component/DoctorCard";

interface PropType {
  searchParams: { specialties: string };
}

const Doctors = async ({ searchParams }: PropType) => {
  const res = await fetch(`http://localhost:5000/api/v1/doctor`);

  const { data } = await res.json();
  console.log(data);

  return (
    <Container>
      <DashedLine />
      <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
        {data.map((doctor: any, index: number) => (
          <Box key={index} sx={{ mb: 2 }}>
            <DoctorCard doctor={doctor} />
            {index === data.length - 1 ? null : <DashedLine />}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Doctors;
