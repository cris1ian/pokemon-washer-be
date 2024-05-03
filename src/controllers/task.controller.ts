import { Request, Response } from "express";

const taskService = require('../services/task.service');
const responseUtils = require('../utils/utils');

exports.getTask = async (req: Request, res: Response) => {

    try {
        const task = await taskService.getTask(req.query);
        return res.send(responseUtils.getSuccessResponse(task));
    } catch (error) {
        console.error(error);
        return res.status(500).send(responseUtils.getErrorResponse('Error en el servidor', error));
    }

}

exports.editTask = async (req: Request, res: Response) => {

    // Check that body isn't empty
    if (Object.keys(req.body).length === 0) { return res.status(400).send('Empty body') }

    try {
        const rowsAffected = await taskService.editTask(req.params.id, req.body);
        if (rowsAffected > 0) {
            return res.status(200).send();
        } else {
            return res.status(404).send('No records found');
        }
    } catch (error: any) {
        console.error(error);
        return res.status(500).send(error);
    }
}

exports.createTask = async (req: Request, res: Response) => {
    try {
        // Call the service function to create the task
        const tasks = await taskService.createTask(req.body);

        // Send the created tasks as a response
        return res.status(201).send(tasks);
    } catch (error: any) {
        console.error(error);
        return res.status(500).send(error.message || 'Internal server error');
    }
}


exports.deleteTask = async (req: Request, res: Response) => {
    try {
        // Call the service function to delete the task
        const rowsAffected = await taskService.deleteTask(req.params.id);

        // Send appropriate response based on the number of rows affected
        if (rowsAffected > 0) {
            return res.status(200).send(rowsAffected.toString());
        } else {
            return res.status(404).send(`Id ${req.params.id} wasn't found in database`);
        }

    } catch (error: any) {
        console.error(error);
        return res.status(500).send(error.message || 'Internal server error');
    }
}
