import { emailAuth } from "./credentials";
export interface ResponseObject {
  EMAILTO_CLIENT: string;
  EMAILTO_ADMIN: string;
}

type transportType = {
  host: string;
  service: string;
  port: string;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
};
export const transportOptions: transportType = {
  host: "smtp.gmail.com",
  service: "gmail",
  port: "465",
  secure: true,
  auth: {
    user: emailAuth.email,
    pass: emailAuth.password
  }
};
