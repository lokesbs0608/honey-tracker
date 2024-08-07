import { Request, Response } from 'express';
import TimeSheet from '../models/TimeSheet';

export const createTimeSheet = async (req: Request, res: Response) => {
    const timeSheet = new TimeSheet(req.body);
    await timeSheet.save();
    res.status(201).send(timeSheet);
};

export const getTimeSheets = async (req: Request, res: Response) => {
    const timeSheets = await TimeSheet.find().populate('userId taskId');
    res.send(timeSheets);
};
