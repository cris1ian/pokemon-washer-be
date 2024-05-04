import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken';

const taskService = require('../services/task.service');
const responseUtils = require('../utils/utils');

const secretKey: Secret = process.env.SECRET_KEY || "";


function verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        jwt.verify(bearerToken, secretKey, (err: any, authData: any) => {
            console.log();
            if (err) {
                res.sendStatus(403);
            } else {
                next();
            }
        });
    } else {
        res.sendStatus(401);
    }
}

exports.getTask = [verifyToken, async (req: Request, res: Response) => {

    try {
        const task = await taskService.getTask(req.query);
        return res.send(responseUtils.getSuccessResponse(task));
    } catch (error) {
        console.error(error);
        return res.status(500).send(responseUtils.getErrorResponse('Error en el servidor', error));
    }

}]

exports.editTask = [verifyToken, async (req: Request, res: Response) => {

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
}]

exports.createTask = [verifyToken, async (req: Request, res: Response) => {
    try {
        const tasks = await taskService.createTask(req.body);

        return res.status(201).send(tasks);
    } catch (error: any) {
        console.error(error);
        return res.status(500).send(error.message || 'Internal server error');
    }
}]


exports.deleteTask = [verifyToken, async (req: Request, res: Response) => {
    try {
        const rowsAffected = await taskService.deleteTask(req.params.id);

        if (rowsAffected > 0) {
            return res.status(200).send(rowsAffected.toString());
        } else {
            return res.status(404).send(`Id ${req.params.id} wasn't found in database`);
        }

    } catch (error: any) {
        console.error(error);
        return res.status(500).send(error.message || 'Internal server error');
    }
}]
