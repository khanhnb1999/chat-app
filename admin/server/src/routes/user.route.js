import express from 'express';
import multer from 'multer';

import {
       signUp, 
       singIn, 
       uploadAvatar, 
       getOneUser, 
       updateAvatarUser, 
       getAllUser,
       getAllUserAndMessage
} from '../controllers/user.controller';

const router = express.Router();

const storage = multer.diskStorage({
       destination: (req, file, cb) => {
              cb(null, "./src/images/");
       },
       filename: (req, file, cb) => {
              cb(null, req.body.name);
       },
});
const upload = multer({ storage: storage });

router.post('/sign-up', signUp);
router.post('/sign-in', singIn);
router.get("/user/:id", getOneUser);
router.get("/users/:id", getAllUser)
router.put("/user/:id", updateAvatarUser);
router.post("/uploads", upload.single('image'), uploadAvatar);
router.get("/userAndMessage", getAllUserAndMessage);

export default router;