import * as core from "express-serve-static-core";

const api = '/api/v1';
const taskController = require('../controllers/task.controller');

module.exports = (app: core.Express) => {
    app.get(`${api}/task`, taskController.getTask);
    app.post(`${api}/task`, taskController.createTask);
    app.put(`${api}/task/:id`, taskController.editTask);
    app.delete(`${api}/task/:id`, taskController.deleteTask);
};