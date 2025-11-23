import { apiSlice } from './apiSlice';

export const plansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => '/plans',
      providesTags: ['Plan'],
    }),
  }),
});

export const { useGetPlansQuery } = plansApiSlice;
