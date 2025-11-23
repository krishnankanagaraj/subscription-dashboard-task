const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['user', 'admin']).optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

const updateProfileSchema = z.object({
  body: z.object({
    age: z.number().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),
    mobile: z.string().length(10, 'Mobile number must be 10 digits').optional(),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
};
