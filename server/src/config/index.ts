import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  port: process.env.PORT,
  bcrypt_salt_round: process.env.BRYCPT_SALT_ROUND,
};


