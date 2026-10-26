const { JobModel } = require("../../models/JobModel");

const changeJobStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		const data = await JobModel.findOneAndUpdate(
			{ _id: id },
			{
				$set: {
					status,
				},
			},
			{
				new: true,
				runValidators: true,
			},
		);

		if (!data) {
			return res.status(404).json({
				success: false,
				message: "Job not found",
			});
		}

		return res.json({
			success: true,
			message: "Job updated successfully",
			data,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = { changeJobStatus };
