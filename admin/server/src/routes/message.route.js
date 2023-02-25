import express from 'express';

import {
       addMessage, getMessage
} from '../controllers/message.controller';

const router = express.Router();

router.post('/send-message', addMessage);
router.post('/message', getMessage);

export default router;