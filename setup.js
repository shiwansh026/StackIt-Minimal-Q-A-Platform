#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up StackIt Q&A Platform...\n');

// Check if Node.js is installed
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Check if MySQL is running (basic check)
console.log('\n📋 Checking prerequisites...');
console.log('⚠️  Please ensure MySQL is running and accessible');

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...');
try {
  execSync('npm install', { cwd: './Backend', stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Check if database config exists
const dbConfigPath = path.join(__dirname, 'Backend', 'config', 'db.config.js');
if (fs.existsSync(dbConfigPath)) {
  console.log('✅ Database configuration found');
} else {
  console.error('❌ Database configuration not found');
  process.exit(1);
}

console.log('\n🎉 Setup complete!');
console.log('\n📝 Next steps:');
console.log('1. Update database credentials in Backend/config/db.config.js');
console.log('2. Run the database setup: mysql -u root -p < Backend/database.sql');
console.log('3. Start the server: cd Backend && npm start');
console.log('4. Open http://localhost:8080 in your browser');
console.log('\n💡 Default users:');
console.log('   - Username: admin, Password: password');
console.log('   - Username: demo, Password: password'); 