import { Router } from "express";
import {
    createUserController,
    retrieveUsers,
    retrieveLoggedUser,
    updateUser,
    softDeleteUser,
    reactivateUserProfile,
    makeLoginController,
} from "../controllers";

const loginRoutes: Router = Router();

loginRoutes.post("", makeLoginController);

export default loginRoutes;
