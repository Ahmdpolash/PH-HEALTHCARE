import { UserRole } from "@prisma/client";
import { IAuthUser } from "../../interface/common";

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
      metaData = getDoctorMetaData();
      break;
    case UserRole.PATIENT:
      metaData = getPatientMetaData();
      break;
    default:
      throw new Error("Invalid user role!");
  }
  return metaData;
};

const getSuperAdminMetaData = async () => {
    console.log('super admin');
    
};
const getAdminMetaData = async () => {
    console.log('admin');
};
const getDoctorMetaData = async () => {
    console.log('doctor');
};
const getPatientMetaData = async () => {
    console.log('patient');
};
const getBarChartData = async () => {};
const getPieChartData = async () => {};

export const MetaService = { fetchDashboardMetaData };
