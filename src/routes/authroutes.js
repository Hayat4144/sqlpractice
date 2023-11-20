import express from "express";
import asycnhandler from "../utils/asycnhandler.js";
import { signup, signin } from "../controller/auth.js";

const authrouter = express.Router();

authrouter.post("/signup", asycnhandler(signup));
authrouter.post("/signin", asycnhandler(signin));

export default authrouter;
