// const PlatformSettingModel = require("../models/PlatformSettingModel");

const PlatformSettingModel = require("../../models/PlatformSettingModel");

// GET platform settings
const getPlatformSettings = async (req, res) => {
	try {
		let settings = await PlatformSettingModel.findOne({
			key: "platform",
		}).lean();

		if (!settings) {
			settings = await PlatformSettingModel.create({
				key: "platform",
			});

			settings = settings.toObject();
		}

		// Never expose SMTP credentials through the API
		if (settings.emailConfig) {
			delete settings.emailConfig.smtpPassword;
		}

		return res.status(200).json({
			success: true,
			message: "Platform settings fetched successfully",
			data: settings,
		});
	} catch (error) {
		console.error("Get platform settings error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to fetch platform settings",
		});
	}
};

// UPDATE platform settings
const updatePlatformSettings = async (req, res) => {
	try {
		const { generalConfig, securityConfig, emailConfig, databaseConfig } =
			req.body;

		const updateData = {};

		if (generalConfig !== undefined) {
			updateData.generalConfig = generalConfig;
		}

		if (securityConfig !== undefined) {
			updateData.securityConfig = {
				...securityConfig,
				sessionTimeout:
					securityConfig.sessionTimeout !== undefined
						? Number(securityConfig.sessionTimeout)
						: undefined,
			};

			if (updateData.securityConfig.sessionTimeout === undefined) {
				delete updateData.securityConfig.sessionTimeout;
			}
		}

		if (emailConfig !== undefined) {
			updateData.emailConfig = emailConfig;
		}

		if (databaseConfig !== undefined) {
			updateData.databaseConfig = databaseConfig;
		}

		const settings = await PlatformSettingModel.findOneAndUpdate(
			{ key: "platform" },
			{
				$set: {
					...updateData,
					updatedBy: req.user?.userId || req.user?._id || null,
				},
				$setOnInsert: {
					key: "platform",
				},
			},
			{
				new: true,
				upsert: true,
				runValidators: true,
				setDefaultsOnInsert: true,
			},
		).select("-emailConfig.smtpPassword");

		return res.status(200).json({
			success: true,
			message: "Platform settings saved successfully",
			data: settings,
		});
	} catch (error) {
		console.error("Update platform settings error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to save platform settings",
		});
	}
};

const getPlatform = async (req, res) => {
	try {
		const settings = await PlatformSettingModel.findOne(
			{ key: "platform" },
			{
				"generalConfig.platformName": 1,
				"generalConfig.supportEmail": 1,
				"generalConfig.supportNumber": 1,
				"generalConfig.office": 1,
				"generalConfig.timezone": 1,
				"generalConfig.maintenanceMode": 1,
			},
		).lean();

		if (!settings) {
			return res.status(404).json({
				success: false,
				message: "Platform settings not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: settings.generalConfig,
		});
	} catch (error) {
		console.error("Get public platform settings error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to fetch platform settings",
		});
	}
};

module.exports = {
	getPlatformSettings,
	updatePlatformSettings,
	getPlatform,
};
