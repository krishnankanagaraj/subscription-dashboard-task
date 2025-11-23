import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../store/api/authApiSlice';
import { setCredentials } from '../../store/slices/authSlice';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/UI/Card';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const userData = await login(data).unwrap();
      dispatch(setCredentials(userData));
      navigate('/plans');
    } catch (err) {
      setError('root', {
        type: 'manual',
        message: err?.data?.message || 'Login failed',
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
            <CardTitle className="text-center">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                placeholder="Enter your password"
                error={errors.password}
                {...register('password')}
              />
              {errors.root && (
                <p className="text-sm text-red-500 text-center">{errors.root.message}</p>
              )}
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
