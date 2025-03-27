import express from 'express';
import { ScheduleController } from './schedule.controller';

const router = express.Router();

router.post('/create-schedule', ScheduleController.inserIntoDB)


export const ScheduleRoutes = router;