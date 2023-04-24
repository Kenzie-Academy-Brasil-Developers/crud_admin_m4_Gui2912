import { z } from 'zod';
import { createLoginSchema } from '../schemas';

type TLoginInterface = z.infer<typeof createLoginSchema>

export {TLoginInterface}