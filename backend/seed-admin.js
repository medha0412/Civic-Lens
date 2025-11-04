// seed-admin.js
// Usage: node seed-admin.js <email> <password> ["Full Name"] ["City"]
// Example: node seed-admin.js admin@example.com AdminPass123 "Admin User" "Mumbai"

require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

const [,, email, password, name = 'Admin User', city = 'City'] = process.argv;

if (!email || !password) {
  console.error('Usage: node seed-admin.js <email> <password> ["Full Name"] ["City"]');
  process.exit(1);
}

const run = async () => {
  try {
    await connectDB();

    let user = await User.findOne({ email });

    if (user) {
      if (user.role === 'admin') {
        console.log(`User ${email} already exists and is an admin.`);
      } else {
        user.role = 'admin';
        await user.save();
        console.log(`User ${email} updated to role 'admin'.`);
      }
    } else {
      user = new User({ name, email, password, city, role: 'admin' });
      await user.save();
      console.log(`Admin user ${email} created successfully.`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err.message);
    process.exit(1);
  }
};

run();
