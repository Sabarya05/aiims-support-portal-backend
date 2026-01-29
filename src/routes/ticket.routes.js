import express from 'express';
import {
  getTickets,
  getTicketById,
  updateStatus,
  sendReply
} from '../controllers/ticket.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// ✅ THIS PATH MUST BE /tickets
router.get('/tickets', authMiddleware, getTickets);
router.get('/tickets/:id', authMiddleware, getTicketById);
router.patch('/tickets/:id/status', authMiddleware, updateStatus);
router.post('/tickets/:id/reply', authMiddleware, sendReply);

export default router;
