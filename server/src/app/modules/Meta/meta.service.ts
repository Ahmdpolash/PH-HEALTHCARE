import { PaymentStatus, UserRole } from "@prisma/client";
import { IAuthUser } from "../../interface/common";
import prisma from "../../../shared/prisma";

// main function
const fetchDashboardMetaData = async (user: IAuthUser) => {
  let metaData;

  switch (user?.role) {
    case UserRole.ADMIN:
      metaData = getAdminMetaData();
      break;
    case UserRole.SUPER_ADMIN:
      metaData = getSuperAdminMetaData();
      break;
    case UserRole.DOCTOR:
      metaData = getDoctorMetaData(user as IAuthUser);
      break;
    case UserRole.PATIENT:
      metaData = getPatientMetaData(user);
      break;
    default:
      throw new Error("Invalid user role!");
  }
  return metaData;
};

// super admin metadata

const getSuperAdminMetaData = async () => {
  console.log("super admin");
};

//  admin metadata
const getAdminMetaData = async () => {
  const appointmentCount = await prisma.appointment.count();
  const patientCount = await prisma.patient.count();
  const paymentCount = await prisma.payment.count();
  const doctorCount = await prisma.doctor.count();

  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: PaymentStatus.PAID,
    },
  });
  const barChartData = await getBarChartData();
  const pieCharData = await getPieChartData();

  return {
    appointmentCount,
    patientCount,
    doctorCount,
    paymentCount,
    totalRevenue,
    barChartData,
    pieCharData,
  };
};

// doctor metadata
const getDoctorMetaData = async (user: IAuthUser) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const appointmentCount = await prisma.appointment.count({
    where: {
      doctorId: doctorData.id,
    },
  });

  const patientCount = await prisma.appointment.groupBy({
    by: ["patientId"],
    _count: {
      id: true,
    },
  });

  const reviewCount = await prisma.review.count({
    where: {
      doctorId: doctorData.id,
    },
  });

  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      appointment: {
        doctorId: doctorData.id,
      },
      status: PaymentStatus.PAID,
    },
  });

  const appointmentStatusDistribution = await prisma.appointment.groupBy({
    by: ["status"],
    _count: { id: true },
    where: {
      doctorId: doctorData.id,
    },
  });

  const formattedAppointmentStatusDistribution =
    appointmentStatusDistribution.map(({ status, _count }) => ({
      status,
      count: Number(_count.id),
    }));
  console.log("doctor", formattedAppointmentStatusDistribution);

  return {
    appointmentCount,
    reviewCount,
    patientCount: patientCount.length,
    totalRevenue,
    formattedAppointmentStatusDistribution,
  };
};

// patient metadata
const getPatientMetaData = async (user: IAuthUser) => {
  console.log("patient");
};
const getBarChartData = async () => {};
const getPieChartData = async () => {};

export const MetaService = { fetchDashboardMetaData };
