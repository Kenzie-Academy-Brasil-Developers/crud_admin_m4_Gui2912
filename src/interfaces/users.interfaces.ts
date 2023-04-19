import { z } from 'zod';
import { createUserSchema, userSchema } from '../schemas';

type TCreateUSer = z.infer<typeof createUserSchema>
type TUserResponse = z.infer<typeof userSchema>

export {
    TCreateUSer,
    TUserResponse
}