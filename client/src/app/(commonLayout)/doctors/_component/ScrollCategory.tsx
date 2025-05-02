"use client";
import { useGetSpecialityQuery } from "@/redux/api/specialitiesApi";
import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const ScrollCategory = ({ specialities }: { specialities: string }) => {
  const { data } = useGetSpecialityQuery(undefined);
  const [value, setValue] = React.useState(specialities || "");
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(`/doctors?specialities=${newValue}`);
  };

  return (
    <Box sx={{ maxWidth: "100%", bgcolor: "background.paper", mx: "auto" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {data?.map((specialty: any) => (
          <Tab
            key={specialty.id}
            label={specialty.title}
            value={specialty.title}
            sx={{ fontWeight: 600 }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
export default ScrollCategory;
