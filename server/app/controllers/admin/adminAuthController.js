const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AdminModel } = require("../../models/AdminModel");
const { adminWelcomEmail } = require("../../config/adminWelcomEmail");
const { hashOTP, generateOTP } = require("../../utility/otp");
const { transporter } = require("../../utility/mail");

// CREATE ADMIN
const createAdmin = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;

		// Validation
		if (!name || !email || !password || !role) {
			return res.status(400).json({
				success: false,
				message: "Name, email, password and role are required",
			});
		}

		// Check valid role
		const allowedRoles = ["super-admin", "job-moderator", "support-agent"];

		if (!allowedRoles.includes(role)) {
			return res.status(400).json({
				success: false,
				message: "Invalid admin role",
			});
		}

		// Check existing admin
		const existingAdmin = await AdminModel.findOne({
			email: email.toLowerCase(),
		});

		if (existingAdmin) {
			return res.status(409).json({
				success: false,
				message: "Admin with this email already exists",
			});
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create admin
		const admin = await AdminModel.create({
			name,
			email: email.toLowerCase(),
			password: hashedPassword,
			role,
		});

		await adminWelcomEmail({
			name: admin.name,
			email: admin.email,
			password,
			role: admin.role,
			emailType: "welcome",
		});

		setImmediate(async () => {
			await adminWelcomEmail({
				name: admin.name,
				email: admin.email,
				password,
				role: admin.role,
				emailType: "welcome",
			});
		});

		return res.status(201).json({
			success: true,
			message: "Admin created successfully",
			admin: {
				id: admin._id,
				name: admin.name,
				email: admin.email,
				role: admin.role,
				isActive: admin.isActive,
			},
		});
	} catch (error) {
		// console.error("Create Admin Error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to create admin",
		});
	}
};

// ADMIN LOGIN
const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Email and password are required",
			});
		}

		const admin = await AdminModel.findOne({
			email: email.toLowerCase(),
		});

		if (!admin) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		if (!admin.isActive) {
			return res.status(403).json({
				success: false,
				message: "Your admin account is inactive",
			});
		}

		// Compare password
		const isPasswordCorrect = await bcrypt.compare(password, admin.password);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// Update last login
		admin.lastLogin = new Date();
		await admin.save();

		// Create JWT
		const token = jwt.sign(
			{
				adminId: admin._id,
				email: admin.email,
				role: admin.role,
			},
			process.env.ADMIN_JWT_SECRET,
			{
				expiresIn: "1d",
			},
		);

		setImmediate(async () => {
			await adminWelcomEmail({
				name: admin.name,
				email: admin.email,
				role: admin.role,
				emailType: "login",
			});
		});

		// Store JWT in httpOnly cookie
		res.cookie("adminToken", token, {
			httpOnly: true,
			// secure: process.env.NODE_ENV === "production",
			secure: false,
			sameSite: "lax",
			maxAge: 24 * 60 * 60 * 1000,
		});

		return res.status(200).json({
			success: true,
			message: "Login successful",
			admin: {
				id: admin._id,
				name: admin.name,
				email: admin.email,
				role: admin.role,
			},
		});
	} catch (error) {
		console.error("Admin Login Error:", error);

		return res.status(500).json({
			success: false,
			message: "Login failed",
		});
	}
};

// GET CURRENT ADMIN
const getMe = async (req, res) => {
	try {
		const admin = await AdminModel.findById(req.admin.adminId).select(
			"-password",
		);

		if (!admin) {
			return res.status(404).json({
				success: false,
				message: "Admin not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: admin,
		});
	} catch (error) {
		console.error("Get Admin Error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to get admin",
		});
	}
};

// ADMIN LOGOUT

// const adminLogin = async (req, res) => {
// 	try {
// 		const { email, password } = req.body;

// 		if (!email || !password) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Email and password are required",
// 			});
// 		}

// 		const admin = await AdminModel.findOne({
// 			email: email.toLowerCase().trim(),
// 		});

// 		if (!admin) {
// 			return res.status(401).json({
// 				success: false,
// 				message: "Invalid email or password",
// 			});
// 		}

// 		if (!admin.isActive) {
// 			return res.status(403).json({
// 				success: false,
// 				message: "Your admin account is inactive",
// 			});
// 		}

// 		const isPasswordValid = await bcrypt.compare(password, admin.password);

// 		if (!isPasswordValid) {
// 			return res.status(401).json({
// 				success: false,
// 				message: "Invalid email or password",
// 			});
// 		}

// 		const token = jwt.sign(
// 			{
// 				adminId: admin._id,
// 				role: admin.role,
// 			},
// 			process.env.ADMIN_JWT_SECRET,
// 			{
// 				expiresIn: "1d",
// 			},
// 		);

// 		admin.lastLogin = new Date();
// 		await admin.save();

// 		res.cookie("adminToken", token, {
// 			httpOnly: true,
// 			secure: false,
// 			sameSite: "lax",
// 			maxAge: 24 * 60 * 60 * 1000,
// 		});

// 		return res.status(200).json({
// 			success: true,
// 			message: "Admin login successful",
// 			data: {
// 				id: admin._id,
// 				name: admin.name,
// 				email: admin.email,
// 				role: admin.role,
// 				avatar: admin.avatar,
// 			},
// 		});
// 	} catch (error) {
// 		console.error("Admin login error:", error);

// 		return res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 		});
// 	}
// };

const adminLogout = async (req, res) => {
	try {
		res.clearCookie("adminToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});

		return res.status(200).json({
			success: true,
			message: "Logout successful",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Logout failed",
		});
	}
};

const sendOTP = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({
				success: false,
				message: "Email is required",
			});
		}

		const admin = await AdminModel.findOne({
			email: email.toLowerCase(),
		});

		if (!admin) {
			return res.status(404).json({
				success: false,
				message: "Admin account not found",
			});
		}

		const otp = generateOTP();
		const hashedOTP = hashOTP(otp);

		admin.otp = hashedOTP;
		admin.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

		await admin.save();

		await transporter.sendMail({
			from: `"JobListener Admin" <${process.env.EMAIL_USER}>`,
			to: admin.email,
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
                      Hello <strong>${admin.name}</strong>,
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
		});

		return res.status(200).json({
			success: true,
			message: "OTP sent successfully",
		});
	} catch (error) {
		console.error("Send OTP Error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to send OTP",
		});
	}
};

// module.exports = {
// 	adminLogin,
// };

module.exports = {
	createAdmin,
	adminLogin,
	getMe,
	adminLogout,
	sendOTP,
};
