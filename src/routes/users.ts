import { Router } from "express";
import { regUser , login} from "../controllers";


export const auth : Router = Router()

auth.post('/register', regUser)
auth.post('/login', login)

