import express from "express";
import multer from "multer";
import {
  createProductController, deleteproduct, getSingleProduct, updateProducts, storage
} from "../controllers/productController.js";
import { isAdmin, requireSignup } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/usersController.js";
const upload = multer({ storage })

const router = express.Router();






//routes
router.post(
  "/create-product", requireSignup,
  isAdmin, upload.array('images'), createProductController

);
//routes
router.put(
  "/update-product/:id",
  requireSignup,
  isAdmin, upload.array("images"),
  updateProducts

);

//get all Users
router.get("/getall-users", requireSignup,
  isAdmin, getAllUsers);




//get single products
router.get("/getsingle-product/:id", requireSignup,
  isAdmin, getSingleProduct);

//get single product Page
router.get("/product-page/:id", getSingleProduct);

// //delete product
router.delete("/delete-product/:id", requireSignup,
  isAdmin, deleteproduct);

export default router;