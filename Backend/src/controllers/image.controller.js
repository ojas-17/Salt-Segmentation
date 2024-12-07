import { spawn } from 'child_process';

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

import Image  from '../models/image.model.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

const getImages = asyncHandler(async (req, res, next) => {
    const { location } = req.params;
    if (!location) throw new ApiError(400, 'Location is required');
    try {
        const images = await Image.find({ location }).populate('userId');
        return res
        .status(200)
        .json(new ApiResponse(200, { images }));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}
);

const uploadImage = asyncHandler(async (req, res, next) => {

    const { location } = req.body;
    const { _id : userId } = req.user;

    if (!location) throw new ApiError(400, 'Location is required');
    if (!userId) throw new ApiError(400, 'User is required');

    const localFilepath = req.file?.path;
    if (!localFilepath) throw new ApiError(400, 'Image is required');
    // console.log(localFilepath);
    const { url: imagePath } = await uploadOnCloudinary(localFilepath);


    const maskPath = path.join(__dirname, '../masks/', `mask_${req.file.filename}.png`);

    try {
        const python = spawn('python', [
            path.join(__dirname, '../scripts/predict.py'),
            '--img', imagePath,
            '--save', 'true'
        ]);

        python.stdout.on('data', (data) => console.log(`Python: ${data}`));
        python.stderr.on('data', (data) => console.error(`Python error: ${data}`));

        python.on('close', async (code) => {
            if (code === 0) {
                const imageRecord = new Image({ userId, location, imagePath, maskPath });
                await imageRecord.save();
                res.json({ imagePath, maskPath });
            } else {
                throw new ApiError(500, 'Error in running the python script');
            }
        });
    } catch (err) {
        throw new ApiError(400, 'Error in predicting the mask');
    }
});

export { getImages, uploadImage };