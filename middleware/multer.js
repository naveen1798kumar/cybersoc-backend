import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({})
})

// export const upload = upload.single('image');
export default upload 