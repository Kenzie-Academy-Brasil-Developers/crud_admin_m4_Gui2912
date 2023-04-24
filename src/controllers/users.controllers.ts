import { Request, Response } from "express";
import {
    createUserService,
    reactiveUserService,
    retrieveLoggedUserService,
    retrieveUsersService,
    softDeleteUserService,
    updateUserService,
} from "../services";
import { createUserSchema, userSchema } from "../schemas";
import { TUserUpdate } from "../interfaces";

const createUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const createUserData = createUserSchema.parse(req.body);

    const createUserResponse = await createUserService(createUserData);

    return res.status(201).json(createUserResponse);
};

const retrieveUsers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const usersRetrieved = await retrieveUsersService();

    return res.status(200).json(usersRetrieved);
};

const retrieveLoggedUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userEmailLogged = res.locals.email;
    const retrieveLoggedUser = await retrieveLoggedUserService(userEmailLogged);
    return res.status(200).json(retrieveLoggedUser);
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const dataRequest: TUserUpdate = req.body;
    const userId:number = +req.params.id
    
    const userUpdated = await updateUserService(dataRequest, userId)

    return res.status(200).json(userUpdated);
};

const softDeleteUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userId:number = +req.params.id
    await softDeleteUserService(userId)
    return res.status(204).json();
};

const reactivateUserProfile = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userId:number = +req.params.id
    const userReactivated = await reactiveUserService(userId)
    return res.status(200).json(userReactivated);
};

export {
    createUserController,
    retrieveUsers,
    retrieveLoggedUser,
    updateUser,
    softDeleteUser,
    reactivateUserProfile,
};
