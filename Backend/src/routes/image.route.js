import Router from 'express';
import { getImages,uploadImage } from "../controllers/image.controller.js";
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = Router();

// secure routes
router.route('/').post(verifyJWT,upload.single('image'), uploadImage);
router.route("/:location").get(verifyJWT,getImages);

export default router;