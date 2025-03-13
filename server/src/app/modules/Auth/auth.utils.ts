import jwt from "jsonwebtoken";

const generateToken = (payload: any, secret: string, expiresIn: string) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expiresIn as any,
  });
  return token;
};

export default generateToken;
