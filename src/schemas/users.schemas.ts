import { z } from "zod";
import { hashSync } from "bcryptjs";

const createUserSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email({ message: "Invalid e-mail" }).max(100),
    password: z
        .string()
        .max(120)
        .transform((pass) => {
            return hashSync(pass, 10);
        }),
    admin: z.boolean().optional()
});

const userSchema = createUserSchema.extend({
    id: z.number(),
    active: z.boolean()
}).omit({password: true})

export {createUserSchema, userSchema}
