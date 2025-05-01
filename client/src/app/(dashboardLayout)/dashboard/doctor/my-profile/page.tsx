"use client";

import { useGetMeQuery, useUpdateMyProfileMutation } from "@/redux/api/userApi";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import ProfileInformation from "./component/ProfileInformation";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from "react";
import AutoFileUploader from "@/components/Forms/AutoFIleUploader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const MyProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useGetMeQuery({});
  const [updateMYProfile, { isLoading: updating }] =
    useUpdateMyProfileMutation();

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));

    updateMYProfile(formData);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              overflow: "hidden",
              borderRadius: 1,
            }}
          >
            <Image
              height={250}
              width={350}
              src={
                data?.profilePhoto ||
                "https://img.freepik.com/premium-photo/picture-doctor-with-stethoscope-around-his-neck_1295705-19816.jpg?ga=GA1.1.1770441506.1745986783&semt=ais_hybrid&w=740"
              }
              alt="User Photo"
            />
          </Box>

          {updating ? (
            <p className="py-3 text-xl">Uploading...</p>
          ) : (
            <AutoFileUploader
              name="file"
              label="Choose Your Profile Photo"
              icon={<CloudUploadIcon />}
              onFileUpload={fileUploadHandler}
              variant="text"
            />
          )}

          <Button
            fullWidth
            endIcon={<ModeEditIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <ProfileInformation data={data} />
        </Grid>
      </Grid>
    </Container>
  );
};
export default MyProfilePage;
