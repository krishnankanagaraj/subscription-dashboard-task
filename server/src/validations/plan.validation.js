const { z } = require('zod');

const updatePlanSchema = z.object({
  params: z.object({
    id: z.string().optional(), // Validate ID if needed, or just rely on mongoose
  }),
  body: z.object({
    name : z.string().min(1, 'Plan name is required').optional(),
    price : z.number().min(1, 'Plan price is required').optional(),
    features : z.array(z.string()).min(1, 'Plan features is required').optional(),
    duration : z.number().min(1, 'Plan duration is required').optional(),
  }),
});


module.exports = {
 updatePlanSchema,
};
