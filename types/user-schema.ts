import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.email(
    {
      error: issue => issue.code === 'invalid_format'
        ? `This is not a valid email address.`
        : 'Email is invalid',
    },
  ).describe('user\'s email'),
  password: z.string().min(8, {
    error: issue => `Password must have ${issue.minimum} characters long`,
  }).max(20, {
    error: issue => `Password must have ${issue.maximum} characters long`,
  }).describe('user\'s password'),
})

export const SignUpSchema = z.object({
  firstName: z.string().min(2, {
    error: issue => `First name must have ${issue.minimum} characters long`,
  }),
  phone: z.string().transform(data => Number(data)).optional(),
  avatar: z.string().optional(),
  isVerified: z.boolean().optional(),
  lastName: z.string().min(2, {
    error: issue => `Last name must have ${issue.minimum} characters long`,
  }),
  password: z.string().min(8, {
    error: issue => `Password must have ${issue.minimum} characters long`,
  }),
  confirmPassword: z.string().min(8, {
    error: issue => `Password must have ${issue.minimum} characters long`,
  }),
  email: z.email({
    error: issue => issue.code === 'invalid_format'
      ? `This is not a valid email address.`
      : 'Valid email is required',
  }),

}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type SignInDto = z.infer<typeof SignInSchema>
export type SignUpDto = z.infer<typeof SignUpSchema>
