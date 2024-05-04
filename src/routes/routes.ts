import * as core from "express-serve-static-core";

const api = '/api/v1';

const taskController = require('../controllers/task.controller');
const authController = require('../controllers/auth.controller');

module.exports = (app: core.Express) => {
    app.get(`${api}/task`, taskController.getTask);
    app.post(`${api}/task`, taskController.createTask);
    app.put(`${api}/task/:id`, taskController.editTask);
    app.delete(`${api}/task/:id`, taskController.deleteTask);

    app.post(`${api}/auth/verify-token`, authController.verifyToken);
    app.post(`${api}/auth/register`, authController.register);
    app.post(`${api}/auth/login`, authController.login);
};