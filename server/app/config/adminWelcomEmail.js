const { transporter } = require("../utility/mail");

const adminWelcomEmail = async ({
	name,
	email,
	password = null,
	role = null,
	emailType = "welcome",
	loginTime = new Date(),
}) => {
	const roleName = {
		"super-admin": "Super Admin",
		"job-moderator": "Job Moderator",
		"support-agent": "Support Agent",
	};

	// ---------------------------------
	// WELCOME EMAIL
	// ---------------------------------

	if (emailType === "welcome") {
		const mailOptions = {
			from: `"JobListener Admin" <${process.env.EMAIL_USER}>`,
			to: email,
			subject: "Welcome to JobListener Admin Panel",

			html: `
				<!DOCTYPE html>
				<html>
				<head>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Welcome to JobListener</title>
				</head>

				<body style="
					margin:0;
					padding:0;
					background:#f4f5f7;
					font-family:Arial, Helvetica, sans-serif;
				">

					<table width="100%" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" style="padding:40px 15px;">

								<table
									width="600"
									cellpadding="0"
									cellspacing="0"
									style="
										max-width:600px;
										width:100%;
										background:#ffffff;
										border-radius:12px;
										overflow:hidden;
										box-shadow:0 4px 20px rgba(0,0,0,0.08);
									"
								>

									<!-- Header -->
									<tr>
										<td style="
											background:#111827;
											padding:30px;
											text-align:center;
										">
											<h1 style="
												margin:0;
												color:#ffffff;
												font-size:26px;
											">
												JobListener
											</h1>

											<p style="
												margin:8px 0 0;
												color:#d1d5db;
												font-size:14px;
											">
												Admin Panel
											</p>
										</td>
									</tr>

									<!-- Content -->
									<tr>
										<td style="padding:40px 35px;">

											<h2 style="
												margin:0 0 15px;
												color:#111827;
												font-size:24px;
											">
												Welcome, ${name}! 👋
											</h2>

											<p style="
												margin:0 0 20px;
												color:#4b5563;
												font-size:15px;
												line-height:1.7;
											">
												Your JobListener administrator account has been
												successfully created.
											</p>

											<p style="
												margin:0 0 25px;
												color:#4b5563;
												font-size:15px;
												line-height:1.7;
											">
												You can use the credentials below to access
												the JobListener Admin Panel.
											</p>

											<!-- Credentials -->
											<table
												width="100%"
												cellpadding="0"
												cellspacing="0"
												style="
													background:#f9fafb;
													border:1px solid #e5e7eb;
													border-radius:8px;
												"
											>

												<tr>
													<td style="padding:15px 18px;">
														<strong style="color:#374151;">
															Email
														</strong>

														<div style="
															margin-top:6px;
															color:#111827;
															font-size:15px;
														">
															${email}
														</div>
													</td>
												</tr>

												<tr>
													<td style="
														padding:15px 18px;
														border-top:1px solid #e5e7eb;
													">
														<strong style="color:#374151;">
															Temporary Password
														</strong>

														<div style="
															margin-top:6px;
															color:#111827;
															font-size:16px;
															font-family:monospace;
															font-weight:bold;
														">
															${password}
														</div>
													</td>
												</tr>

												<tr>
													<td style="
														padding:15px 18px;
														border-top:1px solid #e5e7eb;
													">
														<strong style="color:#374151;">
															Role
														</strong>

														<div style="
															margin-top:6px;
															color:#111827;
															font-size:15px;
														">
															${roleName[role] || role}
														</div>
													</td>
												</tr>

											</table>

											<!-- Login Button -->
											<div style="
												text-align:center;
												margin:30px 0;
											">
												<a
													href="${process.env.ADMIN_LOGIN_URL}"
													style="
														display:inline-block;
														background:#dc2626;
														color:#ffffff;
														text-decoration:none;
														padding:13px 28px;
														border-radius:7px;
														font-size:15px;
														font-weight:bold;
													"
												>
													Login to Admin Panel
												</a>
											</div>

											<!-- Security Notice -->
											<div style="
												background:#fff7ed;
												border:1px solid #fed7aa;
												border-radius:8px;
												padding:16px;
												margin-top:25px;
											">

												<strong style="
													color:#9a3412;
													font-size:14px;
												">
													Security Notice
												</strong>

												<p style="
													margin:8px 0 0;
													color:#9a3412;
													font-size:13px;
													line-height:1.6;
												">
													This is a temporary password. Please change
													your password after logging in for the first
													time. Do not share your login credentials.
												</p>

											</div>

										</td>
									</tr>

									<!-- Footer -->
									<tr>
										<td style="
											background:#f9fafb;
											padding:22px;
											text-align:center;
											border-top:1px solid #e5e7eb;
										">
											<p style="
												margin:0;
												color:#9ca3af;
												font-size:12px;
											">
												© ${new Date().getFullYear()}
												JobListener. All rights reserved.
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

		await transporter.sendMail(mailOptions);
		return;
	}

	// ---------------------------------
	// LOGIN EMAIL
	// ---------------------------------

	if (emailType === "login") {
		// const formattedLoginTime = new Date(loginTime).toLocaleString("en-IN", {
		// 	dateStyle: "medium",
		// 	timeStyle: "short",
		// });

		const mailOptions = {
			from: `"JobListener Admin" <${process.env.EMAIL_USER}>`,
			to: email,
			subject: "New Login to Your JobListener Admin Account",

			html: `
				<!DOCTYPE html>
				<html>
				<head>
					<meta charset="UTF-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<title>New Login</title>
				</head>

				<body style="
					margin:0;
					padding:0;
					background:#f4f5f7;
					font-family:Arial, Helvetica, sans-serif;
				">

					<table width="100%" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" style="padding:40px 15px;">

								<table
									width="600"
									cellpadding="0"
									cellspacing="0"
									style="
										max-width:600px;
										width:100%;
										background:#ffffff;
										border-radius:12px;
										overflow:hidden;
										box-shadow:0 4px 20px rgba(0,0,0,0.08);
									"
								>

									<!-- Header -->
									<tr>
										<td style="
											background:#111827;
											padding:30px;
											text-align:center;
										">
											<h1 style="
												margin:0;
												color:#ffffff;
												font-size:26px;
											">
												JobListener
											</h1>

											<p style="
												margin:8px 0 0;
												color:#d1d5db;
												font-size:14px;
											">
												Admin Security Alert
											</p>
										</td>
									</tr>

									<!-- Content -->
									<tr>
										<td style="padding:40px 35px;">

											<h2 style="
												margin:0 0 15px;
												color:#111827;
												font-size:24px;
											">
												Login Successful
											</h2>

											<p style="
												color:#4b5563;
												font-size:15px;
												line-height:1.7;
											">
												Hello ${name},
											</p>

											<p style="
												color:#4b5563;
												font-size:15px;
												line-height:1.7;
											">
												Your JobListener Admin account was
												successfully accessed.
											</p>

											<!-- Login Details -->
											<table
												width="100%"
												cellpadding="0"
												cellspacing="0"
												style="
													background:#f9fafb;
													border:1px solid #e5e7eb;
													border-radius:8px;
													margin-top:25px;
												"
											>

												<tr>
													<td style="padding:15px 18px;">
														<strong style="color:#374151;">
															Account
														</strong>

														<div style="
															margin-top:6px;
															color:#111827;
															font-size:15px;
														">
															${email}
														</div>
													</td>
												</tr>

												<tr>
													<td style="
														padding:15px 18px;
														border-top:1px solid #e5e7eb;
													">
														<strong style="color:#374151;">
															Role
														</strong>

														<div style="
															margin-top:6px;
															color:#111827;
															font-size:15px;
														">
															${roleName[role] || role}
														</div>
													</td>
												</tr>

												

											</table>

											<!-- Security Notice -->
											<div style="
												background:#ecfdf5;
												border:1px solid #a7f3d0;
												border-radius:8px;
												padding:16px;
												margin-top:25px;
											">

												<strong style="
													color:#047857;
													font-size:14px;
												">
													Was this you?
												</strong>

												<p style="
													margin:8px 0 0;
													color:#065f46;
													font-size:13px;
													line-height:1.6;
												">
													If you recognize this login, no action
													is required.
												</p>

											</div>

											<div style="
												background:#fff7ed;
												border:1px solid #fed7aa;
												border-radius:8px;
												padding:16px;
												margin-top:15px;
											">

												<strong style="
													color:#9a3412;
													font-size:14px;
												">
													Didn't log in?
												</strong>

												<p style="
													margin:8px 0 0;
													color:#9a3412;
													font-size:13px;
													line-height:1.6;
												">
													If you did not perform this login,
													please change your password immediately
													and contact your system administrator.
												</p>

											</div>

										</td>
									</tr>

									<!-- Footer -->
									<tr>
										<td style="
											background:#f9fafb;
											padding:22px;
											text-align:center;
											border-top:1px solid #e5e7eb;
										">
											<p style="
												margin:0;
												color:#9ca3af;
												font-size:12px;
											">
												© ${new Date().getFullYear()}
												JobListener. All rights reserved.
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

		await transporter.sendMail(mailOptions);
	}
};

module.exports = { adminWelcomEmail };
