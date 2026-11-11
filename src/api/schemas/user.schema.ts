import { z } from 'zod';
export const userSchema = z.object({ id: z.string(), name: z.string(), email: z.email() });
export type UserDto = z.infer<typeof userSchema>;
