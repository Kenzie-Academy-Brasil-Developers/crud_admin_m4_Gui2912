import {Router} from 'express'
import{
    createUserController,
    retrieveUsers,
    retrieveLoggedUser,
    updateUser,
    softDeleteUser,
    reactivateUserProfile,
} from '../controllers'
import { ensureEmailIsUniqueMiddleware } from '../middlewares';

const userRoutes:Router = Router()

userRoutes.post("",ensureEmailIsUniqueMiddleware, createUserController);
userRoutes.get("", retrieveUsers);
userRoutes.get("", retrieveLoggedUser);
userRoutes.patch("", updateUser);
userRoutes.delete("", softDeleteUser);
userRoutes.put("", reactivateUserProfile);

export default userRoutes;