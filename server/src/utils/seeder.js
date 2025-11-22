const Plan = require('../models/Plan');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const passwordHasher = async (password) => {
    const hashed =  await bcrypt.hash(password, 10);
    return hashed
}

const seedPlans = async () => {
    try {
        const count = await Plan.countDocuments();
        if (count > 0) {
            console.log('Data Seeding: Plans already exist. Skipping.');
            return;
        }

        const plans = [
            {
                name: 'Basic',
                price: 9.99,
                features: ['Access to basic content', 'SD Quality', '1 Device'],
                duration: 30,
            },
            {
                name: 'Standard',
                price: 19.99,
                features: ['Access to all content', 'HD Quality', '2 Devices'],
                duration: 30,
            },
            {
                name: 'Premium',
                price: 29.99,
                features: ['Access to all content', '4K Quality', '4 Devices', 'Offline Downloads'],
                duration: 30,
            },
            {
                name: 'Annual Basic',
                price: 99.99,
                features: ['Access to basic content', 'SD Quality', '1 Device'],
                duration: 365,
            },
        ];

        await Plan.insertMany(plans);
        console.log('Data Seeding: Plans seeded successfully.');
    } catch (error) {
        console.error('Data Seeding Error:', error);
        // We don't exit process here, just log error so server can still start
    }
};
const seedUsers = async () => {
    try {
        const count = await User.countDocuments();
        if (count > 0) {
            console.log('Data Seeding: Admin already exist. Skipping.');
            return;
        }
       
        const users = await Promise.all([
            {
                name: 'Admin',
                email: 'admin@admin.com',
                password: await passwordHasher('admin'),
                role: 'admin',
            },
            {
                name: 'Krishnan',
                email: 'krishnan@krishnan.com',
                password: await passwordHasher('krishnan'),
                role: 'user',
            },
            {
                name: 'Soundharya',
                email: 'soundharya@soundharya.com',
                password: await passwordHasher('soundharya'),
                role: 'user',
            },
        ]);

        await User.insertMany(users);
        console.log('Data Seeding: Users seeded successfully.');
    } catch (error) {
        console.error('Data Seeding Error:', error);
        // We don't exit process here, just log error so server can still start
    }
};

module.exports = { seedPlans, seedUsers };


