import { Request, Response } from 'express';
import Project from '../models/Project';

export const createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);
};

export const getProjects = async (req: Request, res: Response) => {
    const projects = await Project.find();
    res.send(projects);
};
