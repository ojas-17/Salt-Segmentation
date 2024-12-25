import { spawn } from 'child_process';

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

import Image  from '../models/image.model.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import { log } from 'console';

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

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadImage = asyncHandler(async (req, res, next) => {

    const { location } = req.body;
    const { _id : userId } = req.user;

    if (!location) throw new ApiError(400, 'Location is required');
    if (!userId) throw new ApiError(400, 'User is required');

    const localFilepath = req.file?.path;
    if (!localFilepath) throw new ApiError(400, 'Image is required');
    // console.log(localFilepath);
    // console.log(req.file);
    const { url: imagePath } = await uploadOnCloudinary(localFilepath);
    let maskPath = path.join(__dirname, '../masks/', `mask_${req.file.filename}.png`);

    try {
        const pythonScriptPath = path.join(__dirname, '../scripts/predict.py');
        const args = ['--img', imagePath, '--model', 'src/scripts/output/UNet_tgs_salt.pth', '--save'];
    
        const runPythonScript = () =>
            new Promise((resolve, reject) => {
                const python = spawn('python', [pythonScriptPath, ...args]);
    
                let stdoutData = '';
                let stderrData = '';
                // Collect stdout and stderr data
                python.stdout.on('data', (data) => {
                    stdoutData += data.toString();
                    console.log(`Python: ${data}`);
                });
    
                python.stderr.on('data', (data) => {
                    stderrData += data.toString();
                    console.error(`Python error: ${data}`);
                });
    
                // Handle process close
                python.on('close', (code) => {
                    if (code === 0) {
                        resolve(stdoutData); // Return stdout data if successful
                    } else {
                        reject(new Error(`Python script failed with code ${code}: ${stderrData}`));
                    }
                });
                // Handle unexpected errors
                python.on('error', (err) => {
                    reject(new Error(`Failed to start Python script: ${err.message}`));
                });
            });
    
        // Wait for the Python script to complete
        const result = await runPythonScript();
        console.log(`Python script output: ${result}`);

        const outputFile = 'results/result.png';
        const { url: maskPath } = await uploadOnCloudinary(outputFile);

        const imageRecord = new Image({ userId, location, imagePath, maskPath });
        await imageRecord.save();
        console.log('check');
    
        res.status(200).json(new ApiResponse(200, { imagePath, maskPath }));
    } catch (err) {
        console.error('Error running Python script:', err.message);
        throw new ApiError(500, 'Error in predicting the mask');
    }
    
});

export { getImages, uploadImage };