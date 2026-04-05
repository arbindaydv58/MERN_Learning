import EmailService from "../../service/email.service.js";

class AuthEmail {
  svc;
  constructor() {
    this.svc = new EmailService();
  }
  notifyUserRegistration = async (user) => {
    try {
      const activationLink = "http://localhost:5173/activate/token";
      const emailTemplate = `
        <div style="margin:0;padding:0;background-color:#031b12;">
          <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
            Activate your account and start using our digital ecommerce platform.
          </div>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;background:linear-gradient(180deg,#031b12 0%,#052e1f 100%);margin:0;padding:24px 0;">
            <tr>
              <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="680" style="width:680px;max-width:680px;border-collapse:collapse;background-color:#07281d;border:1px solid #0f5132;border-radius:18px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#d1fae5;box-shadow:0 18px 40px rgba(0,0,0,0.35);">
                  <tr>
                    <td style="padding:32px 40px 18px 40px;background:linear-gradient(135deg,#064e3b 0%,#022c22 55%,#021a13 100%);">
                      <div style="display:inline-block;padding:8px 14px;border-radius:999px;background-color:#10b981;color:#ecfdf5;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
                        Account Activation
                      </div>
                      <h1 style="margin:18px 0 12px 0;font-size:32px;line-height:40px;font-weight:700;color:#ecfdf5;">
                        Welcome to our digital ecommerce platform
                      </h1>
                      <p style="margin:0;font-size:16px;line-height:26px;color:#a7f3d0;">
                        A smarter, faster, and more secure way to manage your online shopping and business interactions.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:34px 40px 16px 40px;background-color:#07281d;">
                      <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#d1fae5;">
                        Dear ${user.name || "Valued User"},
                      </p>
                      <p style="margin:0 0 14px 0;font-size:15px;line-height:26px;color:#bbf7d0;">
                        Thank you for registering with us. We are pleased to welcome you to a professional digital commerce environment designed to simplify product discovery, streamline transactions, and strengthen your connection with a growing online marketplace.
                      </p>
                      <p style="margin:0 0 14px 0;font-size:15px;line-height:26px;color:#bbf7d0;">
                        By activating your account, you unlock secure access to your profile, personalized shopping features, order visibility, and a reliable platform experience built for modern ecommerce growth.
                      </p>
                      <p style="margin:0 0 28px 0;font-size:15px;line-height:26px;color:#bbf7d0;">
                        Please confirm your email address and activate your account by clicking the button below.
                      </p>
                      <a href="${activationLink}" style="display:inline-block;padding:14px 26px;background-color:#10b981;color:#032117;text-decoration:none;font-size:15px;font-weight:700;border-radius:10px;border:1px solid #34d399;">
                        Activate Account
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 40px 12px 40px;background-color:#07281d;">
                      <div style="height:1px;background-color:#14532d;"></div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 40px 34px 40px;background-color:#07281d;">
                      <p style="margin:0 0 10px 0;font-size:13px;line-height:22px;color:#86efac;">
                        This is a system-generated email. Please do not reply to this message.
                      </p>
                      <p style="margin:0;font-size:13px;line-height:22px;color:#86efac;">
                        Please consider the environment before printing this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `;

      return await this.svc.sendEmail({
        to: user.email,
        sub: "Activate your account!!",
        message: emailTemplate,
      });
    } catch (exception) {
      throw exception;
    }
  };
}

const authMailSvc = new AuthEmail();

export default authMailSvc;
