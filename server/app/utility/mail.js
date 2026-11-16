// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const transporter = nodemailer.createTransport({
// 	service: "gmail",
// 	auth: {
// 		user: process.env.EMAIL_USER,
// 		pass: process.env.EMAIL_PASSWORD,
// 	},
// });

// module.exports = { transporter };

require("dotenv").config();

const transporter = {
	sendMail: async (mail) => {
		try {
			if (!process.env.BREVO_API_KEY) {
				throw new Error("BREVO_API_KEY is missing");
			}

			if (!process.env.BREVO_SENDER_EMAIL) {
				throw new Error("BREVO_SENDER_EMAIL is missing");
			}

			const response = await fetch("https://api.brevo.com/v3/smtp/email", {
				method: "POST",
				headers: {
					"api-key": process.env.BREVO_API_KEY,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					sender: {
						name: process.env.BREVO_SENDER_NAME || "JobListener",
						email: process.env.BREVO_SENDER_EMAIL,
					},
					to: [
						{
							email: mail.to,
						},
					],
					subject: mail.subject,
					htmlContent: mail.html,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				console.error("Brevo API Error:", data);

				throw new Error(data.message || "Failed to send email");
			}

			console.log("Email sent successfully:", data.messageId);

			return data;
		} catch (error) {
			console.error("Email Sending Error:", error.message);
			throw error;
		}
	},
};

module.exports = { transporter };
