import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interface/common";
import { v4 as uuidv4 } from "uuid";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelper } from "../../../helper/paginationHelper";
import {
  AppointmentStatus,
  PaymentStatus,
  Prescription,
  Prisma,
  UserRole,
} from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../error/ApiError";

const createPrescipton = async (user: IAuthUser, payload: any) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
      status: AppointmentStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
    },
    include: {
      doctor: true,
    },
  });

  if (!(user?.email === appointmentData.doctor.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This is not your appointment!");
  }

  const result = await prisma.prescription.create({
    data: {
      appointmentId: appointmentData.id,
      doctorId: appointmentData.doctorId,
      patientId: appointmentData.patientId,
      instructions: payload.instructions as string,
      followUpDate: payload.followUpDate || null || undefined,
    },
    include: {
      patient: true,
    },
  });

  return result;
};

const patientPrescription = async (
  user: IAuthUser,
  options: IPaginationOptions,
  filters: any
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { doctorEmail, patientEmail, ...filterData } = filters;

  const andConditions = [] as Prisma.PrescriptionWhereInput[];

  if (patientEmail) {
    andConditions.push({
      patient: {
        email: patientEmail,
      },
    });
  } else if (doctorEmail) {
    andConditions.push({
      doctor: {
        email: doctorEmail,
      },
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

  const whereConditions: Prisma.PrescriptionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.prescription.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    include: {
      doctor: true,
      patient: true,
      appointment: true,
    },
  });

  // const result = await prisma.prescription.findMany({
  //   where: {
  //     patient: {
  //       email: user?.email,
  //     },
  //   },
  //   skip,
  //   take: limit,
  //   orderBy:
  //     options.sortBy && options.sortOrder
  //       ? { [options.sortBy]: options.sortOrder }
  //       : { createdAt: "desc" },
  //   include: {
  //     doctor: true,
  //     patient: true,
  //     appointment: true,
  //   },
  // });

  const total = await prisma.prescription.count({
    where: {
      patient: {
        email: user?.email,
      },
    },
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

// get prescription

export const PrescriptionServices = {
  createPrescipton,
  patientPrescription,
};
