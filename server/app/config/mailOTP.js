const { transporter } = require("../utility/mail");

const mailOTP = async ({ name, email, otp }) => {
	const mail = {
		from: `"JobListener Admin" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: "Your JobListener OTP",
		html: `
        <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>JobListener OTP</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f5f7;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="padding: 40px 15px;"
        >
          <tr>
            <td align="center">

              <!-- Main Card -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 520px;
                  background-color: #ffffff;
                  border-radius: 16px;
                  overflow: hidden;
                  border: 1px solid #e5e7eb;
                "
              >

                <!-- Header -->
                <tr>
                  <td style="
                    background: linear-gradient(
                      135deg,
                      #dc2626 0%,
                      #b91c1c 100%
                    );
                    padding: 28px 30px;
                    text-align: center;
                  ">

                    <div style="
                      display: inline-block;
                      width: 52px;
                      height: 52px;
                      line-height: 52px;
                      background-color: rgba(255,255,255,0.15);
                      border-radius: 14px;
                      color: #ffffff;
                      font-size: 25px;
                      font-weight: bold;
                    ">
                      J
                    </div>

                    <h1 style="
                      margin: 14px 0 0;
                      color: #ffffff;
                      font-size: 24px;
                      font-weight: 700;
                    ">
                      JobListener
                    </h1>

                    <p style="
                      margin: 6px 0 0;
                      color: #fecaca;
                      font-size: 13px;
                    ">
                      Admin Security
                    </p>

                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 35px 35px 30px;">

                    <p style="
                      margin: 0 0 8px;
                      color: #111827;
                      font-size: 16px;
                    ">
                      Hello <strong>${name}</strong>,
                    </p>

                    <h2 style="
                      margin: 0 0 15px;
                      color: #111827;
                      font-size: 22px;
                    ">
                      Verify your identity
                    </h2>

                    <p style="
                      margin: 0 0 25px;
                      color: #6b7280;
                      font-size: 14px;
                      line-height: 1.7;
                    ">
                      We received a request to verify your JobListener
                      administrator account. Use the verification code below
                      to continue.
                    </p>

                    <!-- OTP Box -->
                    <div style="
                      background-color: #fef2f2;
                      border: 1px solid #fecaca;
                      border-radius: 12px;
                      padding: 25px 15px;
                      text-align: center;
                      margin-bottom: 25px;
                    ">

                      <p style="
                        margin: 0 0 10px;
                        color: #6b7280;
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        font-weight: 600;
                      ">
                        Your verification code
                      </p>

                      <div style="
                        color: #dc2626;
                        font-size: 34px;
                        font-weight: 700;
                        letter-spacing: 10px;
                        line-height: 1.2;
                      ">
                        ${otp}
                      </div>

                      <p style="
                        margin: 12px 0 0;
                        color: #991b1b;
                        font-size: 12px;
                      ">
                        Valid for 10 minutes
                      </p>

                    </div>

                    <!-- Security Notice -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="
                        background-color: #f9fafb;
                        border-radius: 10px;
                        margin-bottom: 25px;
                      "
                    >
                      <tr>
                        <td style="padding: 16px;">

                          <p style="
                            margin: 0 0 7px;
                            color: #374151;
                            font-size: 13px;
                            font-weight: 600;
                          ">
                            🔒 Security notice
                          </p>

                          <p style="
                            margin: 0;
                            color: #6b7280;
                            font-size: 12px;
                            line-height: 1.6;
                          ">
                            Never share this verification code with anyone.
                            JobListener support will never ask you for this
                            code.
                          </p>

                        </td>
                      </tr>
                    </table>

                    <p style="
                      margin: 0;
                      color: #9ca3af;
                      font-size: 12px;
                      line-height: 1.6;
                    ">
                      If you did not request this verification code, you can
                      safely ignore this email. Your account remains secure.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="
                    border-top: 1px solid #f3f4f6;
                    padding: 22px 30px;
                    text-align: center;
                    background-color: #fafafa;
                  ">

                    <p style="
                      margin: 0 0 6px;
                      color: #6b7280;
                      font-size: 12px;
                    ">
                      © ${new Date().getFullYear()} JobListener
                    </p>

                    <p style="
                      margin: 0;
                      color: #9ca3af;
                      font-size: 11px;
                    ">
                      This is an automated security email. Please do not reply.
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
      `,
	};

	await transporter.sendMail(mail);
};

module.exports = { mailOTP };
