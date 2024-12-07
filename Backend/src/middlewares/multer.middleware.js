import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads");
    },
    filename: function(_,file,cb){
        const originalName = file.originalname;
        cb(null, originalName);
    }
});

export const upload = multer({
    storage,
})