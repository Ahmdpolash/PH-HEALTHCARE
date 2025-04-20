import axios from "axios";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { SSLService } from "../SSL/ssl.service";

const initPayment = async (appointmentId: string) => {
  const paymentInfo = await prisma.payment.findFirstOrThrow({
    where: {
      appointmentId,
    },
    include: {
      appointment: {
        include: {
          patient: true,
        },
      },
    },
  });

  const paymentData = {
    amount: paymentInfo?.amount,
    transactionId: paymentInfo?.transactionId,
    name: paymentInfo.appointment.patient.name,
    email: paymentInfo.appointment.patient.email,
    address: paymentInfo.appointment.patient.address,
    phoneNumber: paymentInfo.appointment.patient.contactNumber,
  };

  const result = await SSLService.initPayment(paymentData);

  return {
    paymentUrl: result.GatewayPageURL,
  };
};

export const PaymentServices = {
  initPayment,
};
