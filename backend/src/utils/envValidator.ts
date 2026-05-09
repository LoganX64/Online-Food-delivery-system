import dotenv from 'dotenv';

dotenv.config();

const REQUIRED_ENV_VARS = [
  'MongoDB_URL',
  'JWT_KEY',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'PORT',
];

/**
 * Validates that all required environment variables are present.
 * Throws an error and exits the process if any are missing.
 */
export const validateEnv = () => {
  const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    console.error('❌ CRITICAL ERROR: Missing required environment variables:');
    missingVars.forEach((v) => console.error(`   - ${v}`));
    console.error('\nPlease check your .env file and try again.');
    process.exit(1);
  }

  console.log('✅ Environment variables validated.');
};
