import { Request, Response } from "express";
import {
    createUserService,
    reactiveUserService,
    retrieveLoggedUserService,
    retrieveUsersService,
    softDeleteUserService,
    updateUserService,
} from "../services";
import { createUserSchema, userSchema } from '../schemas';

const createUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const createUserData = createUserSchema.parse(req.body)
    
    const createUserResponse = await createUserService(createUserData)
    
    return res.status(201).json(createUserResponse);
};

const retrieveUsers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    return res.status(200).json();
};

const retrieveLoggedUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    return res.status(200).json();
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json();
};

const softDeleteUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    return res.status(204).json();
};

const reactivateUserProfile = async (
    req: Request,
    res: Response
): Promise<Response> => {
    return res.status(200).json();
};

export {
    createUserController,
    retrieveUsers,
    retrieveLoggedUser,
    updateUser,
    softDeleteUser,
    reactivateUserProfile,
};
