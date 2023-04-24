import { z } from "zod";
import {
    allUsersListedSchema,
    createUserSchema,
    updateUserSchema,
    userSchema,
} from "../schemas";

type TCreateUSer = z.infer<typeof createUserSchema>;
type TUserResponse = z.infer<typeof userSchema>;
type TUserUpdate = z.infer<typeof updateUserSchema>;
type TAllUsers = z.infer<typeof allUsersListedSchema>;

export { TCreateUSer, TUserResponse, TUserUpdate, TAllUsers };
