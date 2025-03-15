import nodemailer from "nodemailer";
import config from "../../config";
import path from "path";
import fs from "fs";

export const emailSender = async (
  to: string,
  name: string,
  resetPassURL: string
) => {
  // Template path
  const templatePath = path.join(
    process.cwd(),
    "src/app/utils/mailTemplate.html"
  );

  // Read HTML file
  let htmlTemplate = fs.readFileSync(templatePath, "utf8");

  // Replace placeholders with actual data
  htmlTemplate = htmlTemplate
    .replace("{{name}}", name)
    .replace("{{resetPassURL}}", resetPassURL);

  const transporter = nodemailer.createTransport({
    host: config.emailSender.host,
    port: 587,
    secure: config.node_env === "production", // true for port 465, false for other ports
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_password,
    },
  });

  const info = await transporter.sendMail({
    from: '"PH Health Care" <ahmedpolash732@gmail.com>', // sender address
    to,
    subject: "Reset your password withing 10 minutes !✔", // Subject line
    html: htmlTemplate,
  });
};

/*

- to get the auth user and password 

myaccount.google.com>app.password || https://myaccount.google.com/apppasswords?rapt=AEjHL4PdQaMmux74yY8tzSdrW79_iekksb8ddsncdUkKtX9S4hq4V0-SIvGQ4lFqgTpTESfWbcGGvJvetwEsdROqm1CzreZsFAY-agKx2emNzSfOgQS1hCs
*/