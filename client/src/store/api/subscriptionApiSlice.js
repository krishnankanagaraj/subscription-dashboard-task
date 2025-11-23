import { apiSlice } from './apiSlice';

export const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (planId) => ({
        url: `/subscriptions/create-order/${planId}`,
        method: 'POST',
      }),
    }),
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: '/subscriptions/verify-payment',
        method: 'POST',
        body: paymentData,
      }),
      invalidatesTags: ['Subscription'],
    }),
    getMySubscription: builder.query({
      query: () => '/subscriptions/my-subscription',
      providesTags: ['Subscription'],
    }),
    getAllSubscriptions: builder.query({
      query: () => '/subscriptions/admin/subscriptions',
      providesTags: ['Subscription'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetMySubscriptionQuery,
  useGetAllSubscriptionsQuery,
} = subscriptionApiSlice;
