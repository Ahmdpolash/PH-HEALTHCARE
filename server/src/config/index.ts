import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  bcrypt_salt_round: process.env.BCRYCPT_SALT_ROUND,
  jwt: {
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_epires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  reset_password_token: process.env.RESET_PASS_TOKEN,
  reset_password_token_expiry: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
  reset_password_url: process.env.RESET_PASS_LINK,

  emailSender: {
    email: process.env.EMAIL,
    app_password: process.env.APP_PASSWORD,
    host: process.env.HOST,
  },

  cloudinary: {
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  },

  ssl: {
    store_id: process.env.STORE_ID,
    store_passwd: process.env.STORE_PASSWD,
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
    fail_url: process.env.FAIL_URL,
    ssl_payment_api: process.env.SSL_PAYMENT_API,
    ssl_validation_api: process.env.SSL_VALIDATION_API,
  },
};
