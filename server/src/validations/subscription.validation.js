const { z } = require('zod');

const createSubscriptionSchema = z.object({
  params: z.object({
    planId: z.string().min(1, 'Plan ID is required'),
  }),
});

module.exports = {
  createSubscriptionSchema,
};
