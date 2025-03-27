import { Doctor, Prisma, UserStatus } from "@prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interface/pagination";
import { IDoctorFilterRequest, IDoctorUpdate } from "./doctor.interface";
import { doctorSearchableFields } from "./doctor.constant";

// get all doctor
const getAllDoctorFromDb = async (
  params: IDoctorFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.DoctorWhereInput[] = [];

  // SEARCH
  if (params.searchTerm) {
    andConditions.push({
      OR: doctorSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //filter

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  // if status is deleted then not coming data
  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.DoctorWhereInput = { AND: andConditions };

  const result = await prisma.doctor.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.doctor.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single data

const getByIdFromDb = async (id: string) => {
  const result = await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  return result;
};

// delete  data

const deleteById = async (id: string): Promise<Doctor | null> => {
  await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (trx) => {
    const doctor = await trx.doctor.delete({
      where: {
        id,
      },
    });

    await trx.user.delete({
      where: {
        email: doctor.email,
      },
    });
    return doctor;
  });

  return result;
};

// soft delete  data

const softDeleteById = async (id: string): Promise<Doctor | null> => {
  await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (trx) => {
    const doctor = await trx.doctor.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    await trx.user.update({
      where: {
        email: doctor.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return doctor;
  });

  return result;
};
// updatee  data

const updateDoctor = async (id: string, payload: IDoctorUpdate) => {
  const { specialities, ...doctorData } = payload;

  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.$transaction(async (transactionClient) => {
    await transactionClient.doctor.update({
      where: {
        id,
      },
      data: doctorData,
    });

    if (specialities && specialities.length > 0) {
      // delete specialties
      const deleteSpecialtiesIds = specialities.filter(
        (specialty) => specialty.isDeleted
      );

      for (const specialty of deleteSpecialtiesIds) {
        await transactionClient.doctorSpecialties.deleteMany({
          where: {
            doctorId: doctorInfo.id,
            specialitiesId: specialty.specialitiesId,
          },
        });
      }

      // create specialties
      const createSpecialtiesIds = specialities.filter(
        (specialty) => !specialty.isDeleted
      );

      for (const specialty of createSpecialtiesIds) {
         await transactionClient.doctorSpecialties.create({
          data: {
            doctorId: doctorInfo.id,
            specialitiesId: specialty.specialitiesId,
          },
        });
      }
    }
  });

  const result = await prisma.doctor.findUnique({
    where: {
      id: doctorInfo.id,
    },
    include: {
      doctorSpecialities: {
        include: {
          specialities: true,
        },
      },
    },
  });
  console.log(result)
  
  return result;
 
};

export const DoctorServices = {
  getAllDoctorFromDb,
  getByIdFromDb,
  deleteById,
  softDeleteById,
  updateDoctor,
};
