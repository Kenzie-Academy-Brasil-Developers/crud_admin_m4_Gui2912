import { Router } from "express";
import {
    createUserController,
    retrieveUsers,
    retrieveLoggedUser,
    updateUser,
    softDeleteUser,
    reactivateUserProfile,
} from "../controllers";
import {
    ensureEmailIsUniqueMiddleware,
    ensureUserExistsMiddleware,
    ensureUserIsAdmMiddleware,
    retrictPermissionMiddleware,
    validateTokenMiddlware,
} from "../middlewares";

const userRoutes: Router = Router();

userRoutes.post("", ensureEmailIsUniqueMiddleware, createUserController);
userRoutes.get(
    "",
    validateTokenMiddlware,
    ensureUserIsAdmMiddleware,
    retrieveUsers
);
userRoutes.get("/profile", validateTokenMiddlware, retrieveLoggedUser);
userRoutes.patch(
    "/:id",
    validateTokenMiddlware,
    ensureUserExistsMiddleware,
    retrictPermissionMiddleware,
    updateUser
);
userRoutes.delete("", validateTokenMiddlware, softDeleteUser);
userRoutes.put("", validateTokenMiddlware, reactivateUserProfile);

export default userRoutes;
