import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcryptjs';

/**
 * Global caching is used here to maintain connections across hot reloads
 * in development and prevent orphaned memory servers.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, server: null, seeded: false };
}

async function seedDatabase() {
  if (cached.seeded) return;
  console.log('Seeding in-memory database with test accounts...');
  
  // Minimal schema to avoid circular dependencies during boot
  const UserSchema = new mongoose.Schema({
    name: String, email: { type: String, unique: true }, password: { type: String }, role: { type: String }
  });
  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  const usersToSeed = [
    { name: 'Admin', email: 'parthmk85@gmail.com', password: await bcrypt.hash('parth-2209', 12), role: 'admin' },
    { name: 'Kaushik', email: 'kaushik@gmail.com', password: await bcrypt.hash('kaushik123', 12), role: 'member' },
    { name: 'Utsav', email: 'utsav@gmail.com', password: await bcrypt.hash('utsav123', 12), role: 'member' }
  ];

  for (const u of usersToSeed) {
    if (!(await User.findOne({ email: u.email }))) {
      await User.create(u);
    }
  }
  cached.seeded = true;
  console.log('Test accounts seeded successfully!');
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = (async () => {
      // 1. Start an in-memory MongoDB server to bypass blockages
      if (!cached.server) {
        console.log('Starting isolated in-memory MongoDB Server...');
        cached.server = await MongoMemoryServer.create();
      }
      const uri = cached.server.getUri();
      
      // 2. Connect Mongoose to it
      const mongooseInstance = await mongoose.connect(uri, {
        bufferCommands: false,
      });

      // 3. Seed users required for testing
      await seedDatabase();

      return mongooseInstance;
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
