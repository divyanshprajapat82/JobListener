let express = require("express");
const {
  addCategoty,
  viewCategory,
  deleteCategory,
  singleCategoryView,
  updateCategory,
} = require("../../controllers/admin/categotyController");
const upload = require("../../middleware/multer");

let categotyRoute = express.Router();

categotyRoute.post("/add", upload.single("icon"), addCategoty);
categotyRoute.get("/view", viewCategory);
categotyRoute.get("/view/:id", singleCategoryView);
categotyRoute.put("/update/:id", upload.single("icon"), updateCategory);
categotyRoute.delete("/delete/:id", deleteCategory);

module.exports = { categotyRoute };
