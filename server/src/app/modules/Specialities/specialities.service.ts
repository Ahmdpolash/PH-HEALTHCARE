import { Request } from "express";
import { fileUploader } from "../../utils/uploadImageOnCloudinary";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interface/file";

// Create a new speciality in the database.
const createSpecialities = async (req: Request) => {
  const file = req.file as IFile;
  if (file) {
    const uploadIntoCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadIntoCloudinary?.secure_url;
  }

  const result = await prisma.specialities.create({
    data: req.body,
  });

  return result;
};

// Get all specialities from the database.
const getSpecialities = async () => {
  const result = await prisma.specialities.findMany();

  return result;
};

// delete a speciality from the database.
const deleteSpeciality = async (id: string) => {
  const result = await prisma.specialities.delete({
    where: {
      id: id,
    },
  });

  return result;
};

export const SpecialitiesService = {
  createSpecialities,
  getSpecialities,
  deleteSpeciality,
};
