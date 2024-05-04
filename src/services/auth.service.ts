import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

const secretKey: Secret = process.env.SECRET_KEY || "";

const knex = require('../config/knex-config');

const table = 'user';

export interface ILoginBody {
    username: string,
    password: string,
}

export async function login(body: ILoginBody): Promise<{ token: string }> {

    const query = knex(table)
        .select('*')
        .where({ username: body.username })
        .limit(1);

    try {
        const [user] = await query;

        if (user) {
            const isPasswordValid = await bcrypt.compare(body.password, user.password);

            if (isPasswordValid) {
                const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
                return { token };
            } else {
                throw new Error('Invalid username or password');
            }
        } else {
            throw new Error('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error authenticating user');
    }

}

export async function register(body: ILoginBody): Promise<number> {

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const query = knex(table).insert({
        username: body.username,
        password: hashedPassword
    });

    try {
        const rowsAffected = await query;
        return rowsAffected;
    } catch (error) {
        console.error(error);
        throw new Error('Error registering user');
    }

}

export function verifyToken(token: string): boolean {
    try {
        console.log("verifyToken", token, secretKey);
        jwt.verify(token, secretKey);
        return true;
    } catch (error) {
        return false;
    }
}