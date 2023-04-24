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
    ensureBodyIsValidMiddleware,
    ensureEmailIsUniqueMiddleware,
    ensureUserExistsMiddleware,
    ensureUserIsAdmMiddleware,
    retrictPermissionMiddleware,
    validateTokenMiddlware,
} from "../middlewares";
import { updateUserRequestSchema, updateUserSchema } from '../schemas';

const userRoutes: Router = Router();

userRoutes.post("", ensureEmailIsUniqueMiddleware, createUserController);
userRoutes.get(
    "",
    validateTokenMiddlware,
    ensureUserIsAdmMiddleware,
    retrieveUsers
);
userRoutes.get(
    "/profile",
    validateTokenMiddlware,
    retrictPermissionMiddleware,
    retrieveLoggedUser
);
userRoutes.patch(
    "/:id",
    validateTokenMiddlware,
    ensureUserExistsMiddleware,
    ensureBodyIsValidMiddleware(updateUserSchema),
    retrictPermissionMiddleware,
    updateUser
);
userRoutes.delete(
    "/:id",
    validateTokenMiddlware,
    retrictPermissionMiddleware,
    softDeleteUser
);
userRoutes.put(
    "/:id/recover",
    validateTokenMiddlware,
    ensureUserIsAdmMiddleware,
    reactivateUserProfile
);

export default userRoutes;
