import { Patient, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { patientSearchableFields } from "./doctor.constant";
import { paginationHelper } from "../../../helper/paginationHelper";
import { IPatientFilterRequest, IPatientUpdate } from "./patient.interface";
import { IPaginationOptions } from "../../interface/pagination";

const getAllFromDB = async (
  filters: IPatientFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: patientSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }
  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.patient.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
    include: {
      MedicalReport: true,
      PatientHealthData: true,
    },
  });
  const total = await prisma.patient.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Patient | null> => {
  const result = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      MedicalReport: true,
      PatientHealthData: true,
    },
  });
  return result;
};

const updateIntoDb = async (id: string, payload: Partial<IPatientUpdate>) => {
  const { PatientHealthData, MedicalReport, ...patientData } = payload;

  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  await prisma.$transaction(async (trx) => {
    //update patient data
    await trx.patient.update({
      where: {
        id,
      },
      data: patientData,
      include: {
        MedicalReport: true,
        PatientHealthData: true,
      },
    });

    // create or update patient health data

    if (PatientHealthData) {
      await trx.patientHealthData.upsert({
        where: {
          patientId: patientInfo.id,
        },
        update: PatientHealthData,
        create: { ...PatientHealthData, patientId: patientInfo.id },
      });
    }

    // update patient medical report

    if (MedicalReport) {
      await trx.medicalReport.create({
        data: { ...MedicalReport, patientId: patientInfo.id },
      });
    }

    const responseData = await prisma.patient.findUnique({
      where: {
        id: patientInfo.id,
      },
      include: {
        PatientHealthData: true,
        MedicalReport: true,
      },
    });

    return responseData;
  });
};

const deleteFromDB = async (id: string) => {
  await prisma.$transaction(async (trx) => {
    await trx.medicalReport.deleteMany({
      where: {
        patientId: id,
      },
    });

    // delete patient health data

    await trx.patientHealthData.deleteMany({
      where: {
        patientId: id,
      },
    });

    const deletedPatient = await trx.patient.delete({
      where: {
        id,
      },
    });

    await trx.user.delete({
      where: {
        email: deletedPatient.email,
      },
    });

    return deletedPatient;
  });
};

const softDelete = async (id: string): Promise<Patient | null> => {
  return await prisma.$transaction(async (transactionClient) => {
    const deletedPatient = await transactionClient.patient.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: deletedPatient.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return deletedPatient;
  });
};

export const PatientService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDb,
  deleteFromDB,
  softDelete,
};
