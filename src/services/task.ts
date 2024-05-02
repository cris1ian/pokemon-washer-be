import { Task } from "../models/task";

const knex = require('../config/knex-config');

const table = 'task';
const defaultOrderBy = 'id';

interface IGetTaskParam {
    title: string,
    completed: boolean | string,
    offset: string,
    orderBy: string,
}

export async function getTask(queryParams: IGetTaskParam) {

    const offset = (queryParams.offset !== undefined) ? parseInt(String(queryParams.offset)) : 0;
    const orderByQuery = queryParams.orderBy !== undefined ? queryParams.orderBy : `${table}.${defaultOrderBy}`;

    const query = knex(table)
        .select('*')
        .where((qb: any) => queryParams.title !== undefined ? qb.where('title', 'like', `%${queryParams.title}%`) : '')
        .where((qb: any) => queryParams.completed !== undefined ? qb.where('completed', (queryParams.completed === "true" ? "1" : "0")) : '')
        .orderBy(orderByQuery, 'desc')
        .offset(offset)

    return await query;
}

interface IEditTaskBody {
    title: string,
    completed: boolean | string
}

export async function editTask(id: string, body: IEditTaskBody): Promise<number> {

    const query = knex(table)
        .update(body)
        .where({ id: id })

    try {
        const rowsAffected = await query;
        return rowsAffected;
    } catch (error: any) {
        console.error(error);
        throw new Error('Error updating task');
    }

}

interface ICreateTaskBody {
    title: string,
    completed?: boolean | string
}

export async function createTask(body: ICreateTaskBody): Promise<Task[]> {

    // Check required fields
    if (!body.title) {
        throw new Error('title field is required');
    }

    // Insert the task into the database and retrieve the IDs of the created tasks
    const insertedIds = await knex(table).insert(body, ['id']);

    // Fetch the created tasks from the database using the inserted IDs
    const tasks = await knex(table).select('*').whereIn("id", insertedIds);

    return tasks;
}

export async function deleteTask(id: string | number): Promise<number> {
    
    if (!id) {
        throw new Error('Se requiere campo id');
    }

    // Delete the task from the database and return the number of rows affected
    const rowsAffected = await knex(table).where({ id }).del();
    return rowsAffected;
}