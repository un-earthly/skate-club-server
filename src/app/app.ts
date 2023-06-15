import express from "express"
import { expressLogger } from "../../logger";
import { globalErrorHandler } from "../errors/globarErrorHandler";
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLogger);





app.use(globalErrorHandler);


export default app