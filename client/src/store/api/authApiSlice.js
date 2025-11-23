import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Subscription'],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Subscription'],
    }),

    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/auth/profile-update',
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useUpdateProfileMutation } = authApiSlice;

