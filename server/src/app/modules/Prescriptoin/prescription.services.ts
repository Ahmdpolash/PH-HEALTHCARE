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

// get all appointment

const getAllAppointment = async (filters: any, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { patientEmail, doctorEmail, ...filterData } = filters;
  const andConditions = [];

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

  // console.dir(andConditions, { depth: Infinity })
  const whereConditions: Prisma.AppointmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.appointment.findMany({
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
      doctor: true,
      patient: true,
    },
  });
  const total = await prisma.appointment.count({
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

export const PrescriptionServices = {
  createPrescipton,

  getAllAppointment,
};
