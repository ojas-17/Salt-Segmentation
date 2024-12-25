import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // console.log(process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("Error in uploading file on cloudinary ", error);
        return null;
    }
}

const deleteFromCloudinary = async(url) => {
    try {
        if (!url) return null;
        const publicId = url.split("/").pop().split(".")[0];
        if (!publicId) return null;
        const response = await cloudinary.uploader.destroy(publicId);
        console.log("file is deleted from cloudinary ", response);
        return response;
    }
    catch (error) {
        console.log("Error in deleting file from cloudinary ", error?.message);
    }
}

export {uploadOnCloudinary, deleteFromCloudinary}