import express, { Request, Response } from 'express';
import * as core from "express-serve-static-core";

const app: core.Express = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '20mb', extended: true }));

// Routes
require('./src/routes/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
