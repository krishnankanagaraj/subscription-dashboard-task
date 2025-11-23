import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateProfileMutation } from '../../store/api/authApiSlice';
import { updateUser } from '../../store/slices/authSlice';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/UI/Card';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const profileSchema = z.object({
  age: z.string().transform((val) => (val ? Number(val) : undefined)).optional(),

  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  mobile: z.string().length(10, 'Mobile number must be 10 digits').optional(),
});

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitSuccessful,isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      age: user?.age || '',
      gender: user?.gender || '',
      mobile: user?.mobile || '',
    },
  });

  useEffect(() => {
    if (user) {
      setValue('age', user.age || '');
      setValue('gender', user.gender || '');
      setValue('mobile', user.mobile || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      // Filter out empty strings to avoid sending them as data
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== '' && v !== undefined)
      );
      
      const updatedUser = await updateProfile(cleanData).unwrap();
      dispatch(updateUser(updatedUser));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Update failed');
      setError('root', {
        type: 'manual',
        message: err?.data?.message || 'Update failed',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    disabled
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-500 cursor-not-allowed dark:bg-slate-700 dark:border-slate-600 dark:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-500 cursor-not-allowed dark:bg-slate-700 dark:border-slate-600 dark:text-slate-400"
                  />
                </div>
              </div>

              <Input
                label="Age"
                type="number"
                placeholder="Enter your age"
                error={errors.age}
                {...register('age')}
              />

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                  Gender
                </label>
                <select
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:focus:ring-blue-500"
                  {...register('gender')}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
                )}
              </div>

              <Input
                label="Mobile Number"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                error={errors.mobile}
                {...register('mobile')}
              />

              {errors.root && (
                <p className="text-sm text-red-500 text-center">{errors.root.message}</p>
              )}

              <Button type="submit" disabled={!isDirty} className="w-full" isLoading={isLoading}>
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
