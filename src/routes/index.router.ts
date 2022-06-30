import express from "express";

import { memoryRouter} from "./user-limit.router";

const router = express.Router();

router.use(memoryRouter);

export { router };
