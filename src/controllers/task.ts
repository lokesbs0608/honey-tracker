import { Request, Response } from 'express';
import Task from '../models/Task';

export const createTask = async (req: Request, res: Response) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
};

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find().populate('assignedTo projectId');
    res.send(tasks);
};
