import express from 'express';
import { ScheduleController } from './schedule.controller';
import { auth } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post('/create-schedule', ScheduleController.inserIntoDB)

router.get('/',auth(UserRole.DOCTOR), ScheduleController.getAllFromDB)


export const ScheduleRoutes = router;