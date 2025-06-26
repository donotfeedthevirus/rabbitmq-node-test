
import dotenv from "dotenv";
dotenv.config();

export const RABBIT_URL = process.env.RABBIT_URL!;
export const QUEUE_NAME = process.env.QUEUE_NAME!;
