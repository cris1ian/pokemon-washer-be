import { Request, Response } from "express";
import { ILoginBody } from "../services/auth.service";

const authService = require('../services/auth.service');
const responseUtils = require('../utils/utils');

exports.login = async (req: Request, res: Response) => {

    if (!req.body.username) { return res.status(400).send('Username is required') }
    if (!req.body.password) { return res.status(400).send('Password is required') }
    const body: ILoginBody = { username: req.body.username, password: req.body.password }

    try {
        const user = await authService.login(body);
        return res.send(responseUtils.getSuccessResponse(user));
    } catch (error) {
        console.error(error);
        return res.status(500).send(responseUtils.getErrorResponse('Login error', error));
    }

}

exports.register = async (req: Request, res: Response) => {

    if (!req.body.username) { return res.status(400).send('Username is required') }
    if (!req.body.password) { return res.status(400).send('Password is required') }
    const body: ILoginBody = { username: req.body.username, password: req.body.password }

    try {
        const user = await authService.register(body);
        return res.send(responseUtils.getSuccessResponse(user));
    } catch (error) {
        console.error(error);
        return res.status(500).send(responseUtils.getErrorResponse('Register error', error));
    }

}

exports.verifyToken = async (req: Request, res: Response) => {

    if (!req.body.token) { return res.status(400).send('Token not found') }

    try {
        const token = await authService.verifyToken(req.body.token);
        console.log("token", token);
        return res.send(responseUtils.getSuccessResponse(token));
    } catch (error) {
        console.error(error);
        return res.status(500).send(responseUtils.getErrorResponse('Token verification error', error));
    }

}
