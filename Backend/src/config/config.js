import dotenv from "dotenv";
dotenv.config();

const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};

const SMTPConfig = {
  provider: process.env.SNTP_PROVIDER,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
  from: process.env.SMTP_FORM_ADDRESS,
};

const AppConfig = {
  feURL: process.env.FRONTEND_URL,
  jwtSecret: process.env.JWT_SECRET_KEY,
};

const mongoConfig = {
  url: process.env.MONGODB_URL,
  dbName: process.env.MONGODB_NAME,
};

const KhaltiConfig = {
  url: process.env.KHALTI_PAYMENT_URL,
  apiSecret: process.env.KHALTI_API_SECRET_KEY,
};

const paymentModes = {
  KHALTI: "KHALTI",
  ESEWA: "ESEWA",
  CASH: "COD",
};

const PaymentStatus = {
  PAID: "paid",
  REFUND: "refund",
  UNPAID: "unpaid",
  CANCELLED: "cancelled",
  PENDING: "pending",
};

const sqlConfig = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export {
  cloudinaryConfig,
  SMTPConfig,
  AppConfig,
  mongoConfig,
  KhaltiConfig,
  paymentModes,
  PaymentStatus,
  sqlConfig,
};
