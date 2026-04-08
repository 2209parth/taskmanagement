require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const usersToSeed = [
  {
    name: 'Admin User',
    email: 'parthmk85@gmail.com',
    password: 'parth-2209',
    role: 'admin'
  },
  {
    name: 'Kaushik',
    email: 'kaushik@gmail.com',
    password: 'kaushik123',
    role: 'member'
  },
  {
    name: 'Utsav',
    email: 'utsav@gmail.com',
    password: 'utsav123',
    role: 'member'
  }
];

async function seedAll() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  try {
    console.log(`Connecting to: ${MONGODB_URI}...`);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB. Seeding users...');

    for (const userData of usersToSeed) {
      const existingUser = await User.findOne({ email: userData.email });
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      if (existingUser) {
        console.log(`User ${userData.email} already exists. Updating...`);
        existingUser.password = hashedPassword;
        existingUser.role = userData.role;
        existingUser.name = userData.name;
        await existingUser.save();
      } else {
        console.log(`Creating user ${userData.email}...`);
        await User.create({
          ...userData,
          password: hashedPassword
        });
      }
    }

    console.log('All users seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
}

seedAll();
