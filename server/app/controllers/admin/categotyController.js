const { cloudinary } = require("../../config/cloudinary");
const { CategoryModel } = require("../../models/CategoryModel");

//   let obj = { ...req.body };

//   if (req.files) {
//     if (req.files.singleImage) {
//       obj["singleImage"] = req.files.singleImage[0].filename;
//     }
//     if (req.files.multipleImages) {
//       obj["multipleImages"] = req.files.multipleImages.map(
//         (items) => items.filename,
//       );
//     }
//   }

// let imageUrl = "";
// let public_id = "";

// // Upload image if exists
// if (req.file) {
//   const result = await cloudinary.uploader.upload(req.file.path, {
//     folder: "categories",
//   });

//   imageUrl = result.secure_url;
//   public_id = result.public_id;
// }

const addCategoty = async (req, res) => {
  try {
    const { name, slug, description, status } = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "jobListener/categories",
      });
      imageUrl = result.secure_url;
      public_id = result.public_id;
    }

    // Save in DB
    const category = await CategoryModel.create({
      name,
      slug,
      description,
      status,
      icon: imageUrl,
      public_id,
    });

    res.json({
      success: true,
      message: "Category added successfully",
      data: category,
      public_id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const viewCategory = async (req, res) => {
  const data = await CategoryModel.find();
  res.json({
    success: true,
    message: "Categories",
    data,
  });
};

const singleCategoryView = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    const data = await CategoryModel.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      message: "Single Category",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, status } = req.body;

    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    let imageUrl = category.icon;
    let public_id = category.public_id;

    if (req.file) {
      if (category.public_id) {
        await cloudinary.uploader.destroy(category.public_id);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "jobListener/categories",
      });

      imageUrl = result.secure_url;
      public_id = result.public_id;

      // // 🧹 Delete local file (important)
      // const fs = require("fs");
      // fs.unlinkSync(req.file.path);
    }

    const data = await CategoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        description,
        status,
        icon: imageUrl,
        public_id,
      },
      { new: true },
    );

    res.json({
      success: true,
      message: "Category updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await CategoryModel.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (data.public_id) {
      await cloudinary.uploader.destroy(data.public_id);
    }

    await CategoryModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCategoty,
  viewCategory,
  singleCategoryView,
  updateCategory,
  deleteCategory,
};
