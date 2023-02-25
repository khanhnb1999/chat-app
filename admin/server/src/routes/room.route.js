import express from 'express';
import { addUserRooms, getAllUserGroups } from '../controllers/room.controller';

const router = express.Router();

router.post('/add-user-room', addUserRooms);
router.get('/users-group', getAllUserGroups)

export default router;

