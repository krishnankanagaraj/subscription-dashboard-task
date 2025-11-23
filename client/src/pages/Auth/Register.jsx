import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../store/api/authApiSlice';
import { setCredentials } from '../../store/slices/authSlice';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/UI/Card';
import { motion } from 'framer-motion';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const userData = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials(userData));
      navigate('/plans');
    } catch (err) {
      setError('root', {
        type: 'manual',
        message: err?.data?.message || 'Registration failed',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Name"
                placeholder="Enter your name"
                error={errors.name}
                {...register('name')}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email}
                {...register('email')}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                error={errors.password}
                {...register('password')}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                {...register('confirmPassword')}
              />
              {errors.root && (
                <p className="text-sm text-red-500 text-center">{errors.root.message}</p>
              )}
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Register
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
