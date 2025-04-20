import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sentResponse";
import { PaymentServices } from "./payment.service";
import httpStatus from 'http-status'

const initPayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.initPayment();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initiated successfully!",
    data: result,
  });
});

export const PaymentController = {
  initPayment,
};
