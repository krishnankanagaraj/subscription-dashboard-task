import React from 'react';
import { useGetAllSubscriptionsQuery } from '../../store/api/subscriptionApiSlice';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/UI/Card';
import { Loader2, Search } from 'lucide-react';
import Input from '../../components/UI/Input';
import { motion } from 'framer-motion';

const Subscriptions = () => {
  const { data: subscriptions, isLoading } = useGetAllSubscriptionsQuery();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredSubscriptions = subscriptions?.filter(
    (sub) =>
      sub.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">All Subscriptions</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4"
      >
        {filteredSubscriptions?.map((sub) => (
          <Card key={sub._id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{sub.user.name}</h3>
                  <p className="text-sm text-gray-500">{sub.user.email}</p>
                </div>
                <div className="flex flex-wrap gap-4 md:gap-8">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Plan</p>
                    <p className="text-sm text-gray-900">{sub.plan.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        sub.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Expires</p>
                    <p className="text-sm text-gray-900">
                      {new Date(sub.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Amount</p>
                    <p className="text-sm text-gray-900">₹{sub.plan.price}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredSubscriptions?.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No subscriptions found matching your search.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Subscriptions;
