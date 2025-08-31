import { z } from "zod";

 export const CreateUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  number_phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  role: z.string().optional().default("user"),
});

 export const UpdateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  number_phone: z.string().regex(/^\d{10}$/).optional(),
  role: z.string().optional(),
});

 export const DeleteUserSchema = z.object({
  id: z.string().length(24, "Invalid user id"),
});


export const UserIdSchema = z.object({
  id: z.string().length(24, "Invalid user id"),
});
