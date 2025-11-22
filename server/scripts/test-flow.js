const BASE_URL = 'http://localhost:5000/api';

const runTest = async () => {
  try {
    console.log('--- Starting Verification ---');

    // 1. Register User
    console.log('\n1. Registering User...');
    const userRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: `testuser_${Date.now()}@example.com`,
        password: 'password123',
      }),
    });
    const userData = await userRes.json();
    console.log('User Registered:', userRes.status, userData.email);
    const userToken = userData.accessToken;

    // 2. Register Admin
    console.log('\n2. Registering Admin...');
    const adminRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Admin User',
        email: `admin_${Date.now()}@example.com`,
        password: 'password123',
        role: 'admin',
      }),
    });
    const adminData = await adminRes.json();
    console.log('Admin Registered:', adminRes.status, adminData.email);
    const adminToken = adminData.accessToken;

    // 3. Seed Plans (as Admin - though endpoint is public/protected logic in controller might vary, let's assume it works)
    console.log('\n3. Seeding Plans...');
    const seedRes = await fetch(`${BASE_URL}/plans/seed`, {
      method: 'POST',
    });
    const seedData = await seedRes.json();
    console.log('Seed Result:', seedRes.status, seedData);

    // 4. Get Plans
    console.log('\n4. Getting Plans...');
    const plansRes = await fetch(`${BASE_URL}/plans`);
    const plans = await plansRes.json();
    console.log('Plans Fetched:', plans.length);
    const planId = plans[0]._id;

    // 5. Subscribe User
    console.log(`\n5. Subscribing User to Plan ${planId}...`);
    const subRes = await fetch(`${BASE_URL}/subscribe/${planId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    });
    const subData = await subRes.json();
    console.log('Subscription Created:', subRes.status, subData.status);

    // 6. Get My Subscription
    console.log('\n6. Verifying User Subscription...');
    const mySubRes = await fetch(`${BASE_URL}/my-subscription`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
    });
    const mySubData = await mySubRes.json();
    console.log('My Subscription:', mySubRes.status, mySubData.plan.name);

    // 7. Get All Subscriptions (Admin)
    console.log('\n7. Verifying Admin Access...');
    const allSubRes = await fetch(`${BASE_URL}/admin/subscriptions`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
    });
    const allSubData = await allSubRes.json();
    console.log('All Subscriptions (Admin):', allSubRes.status, allSubData.length);

    console.log('\n--- Verification Complete ---');
  } catch (error) {
    console.error('Verification Failed:', error);
  }
};

runTest();
