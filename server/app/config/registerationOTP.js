const { transporter } = require("../utility/mail");

const registerationOTP = async ({ name, email, otp }) => {
	const mail = {
		// from: `"JobListener" <${process.env.EMAIL_USER}>`,
		from: `"JobListener" <${process.env.BREVO_SENDER_EMAIL}>`,
		to: email,
		subject: "Your JobListener Verification Code",
		html: `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Verify Your Email</title>
			</head>

			<body style="margin:0; padding:0; background-color:#f5f6fa; font-family:Arial, Helvetica, sans-serif;">

				<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f6fa; padding:40px 15px;">
					<tr>
						<td align="center">

							<table width="100%" cellpadding="0" cellspacing="0" style="max-width:550px; background:#ffffff; border-radius:12px; overflow:hidden;">

								<!-- Header -->
								<tr>
									<td align="center" style="background:#dc2626; padding:30px 20px;">
										<h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:700;">
											JobListener
										</h1>
										<p style="margin:8px 0 0; color:#fee2e2; font-size:13px;">
											Find Your Next Career Opportunity
										</p>
									</td>
								</tr>

								<!-- Content -->
								<tr>
									<td style="padding:40px 35px 30px;">

										<h2 style="margin:0 0 15px; color:#111827; font-size:23px;">
											Verify Your Email Address
										</h2>

										<p style="margin:0 0 12px; color:#374151; font-size:15px; line-height:25px;">
											Hello <strong>${name || "there"}</strong>,
										</p>

										<p style="margin:0 0 25px; color:#6b7280; font-size:14px; line-height:24px;">
											Thank you for registering with JobListener! To complete your registration, please verify your email address using the verification code below.
										</p>

										<!-- OTP Box -->
										<table width="100%" cellpadding="0" cellspacing="0">
											<tr>
												<td align="center" style="background:#fef2f2; border:1px dashed #f87171; border-radius:10px; padding:25px 15px;">

													<p style="margin:0 0 12px; color:#6b7280; font-size:12px; font-weight:600; letter-spacing:1px;">
														YOUR VERIFICATION CODE
													</p>

													<h1 style="margin:0; color:#dc2626; font-size:36px; letter-spacing:12px; font-weight:700;">
														${otp}
													</h1>

												</td>
											</tr>
										</table>

										<p style="margin:25px 0 10px; color:#374151; font-size:14px; line-height:23px;">
											This verification code is valid for <strong>10 minutes</strong>.
										</p>

										<p style="margin:0; color:#6b7280; font-size:13px; line-height:22px;">
											For your security, never share this code with anyone. JobListener will never ask you to share your OTP.
										</p>

										<hr style="border:none; border-top:1px solid #e5e7eb; margin:30px 0;" />

										<p style="margin:0; color:#6b7280; font-size:13px; line-height:22px;">
											If you didn't create an account with JobListener, you can safely ignore this email.
										</p>

									</td>
								</tr>

								<!-- Footer -->
								<tr>
									<td align="center" style="background:#f9fafb; padding:22px 20px; border-top:1px solid #f3f4f6;">

										<p style="margin:0 0 7px; color:#374151; font-size:13px; font-weight:600;">
											JobListener Team
										</p>

										<p style="margin:0; color:#9ca3af; font-size:11px;">
											© ${new Date().getFullYear()} JobListener. All rights reserved.
										</p>

										<p style="margin:8px 0 0; color:#9ca3af; font-size:11px;">
											This is an automated email. Please do not reply.
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

module.exports = { registerationOTP };

