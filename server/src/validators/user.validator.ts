import { z } from "zod";
//TODO ADD REGEX WHEN APP DONE
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const signupSchema = z
    .object({
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(3, "Password must be at least 3 characters"),
        // .regex(
        //     passwordRegex,
        //     "Password must include 1 uppercase, 1 lowercase, 1 number, and 1 special character"
        // ),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});