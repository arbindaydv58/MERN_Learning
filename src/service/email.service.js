import nodemailer from "nodemailer";
import { SMTPConfig } from "../config/config.js";

class EmailService {
  #transport;
  constructor() {
    try {
      this.#transport = nodemailer.createTransport({
        host: SMTPConfig.host,
        port: SMTPConfig.port,
        service: SMTPConfig.provider,
        auth: {
          user: SMTPConfig.user,
          pass: SMTPConfig.password,
        },
      });
      console.log("********  SMTP server conneccting successfully*********");
    } catch (exception) {
      console.error("********  Error conneccting SMTP server*********");
      throw {
        code: 500,
        message: "SMTP server connection Error",
        status: "SMTP_cONNECTION_ERR",
      };
    }
  }

  sendEmail = async ({
    to,
    sub,
    message,
    attachments = null,
    cc = null,
    bcc = null,
  }) => {
    try {
      let emailBody = {
        to: to,
        from: SMTPConfig.from,
        subject: sub,
        html: message,
      };
      if (cc) {
        emailBody["cc"] = cc;
      }

      if (bcc) {
        emailBody["bcc"] = bcc;
      }

      if (attachments) {
        emailBody["attachments"] = attachments;
      }
      return await this.#transport.sendMail(emailBody);
    } catch (exception) {
      console.error(exception);
      throw {
        code: 500,
        message: "Email sending failed",
        status: "EMAIL_SEND_ERR",
      };
    }
  };
}

export default EmailService;
