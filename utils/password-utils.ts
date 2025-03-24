/**
 * Password utilities for authentication
 * 
 * This file contains utilities for generating and verifying password hashes.
 * For production, use bcrypt hashes.
 * For development, you can use the simple sha256_ prefix method.
 */

import * as bcrypt from 'bcryptjs';

/**
 * Generate a bcrypt hash for a password
 * @param password The password to hash
 * @returns The bcrypt hash
 */
export async function generateHash(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Verify a password against a hash
 * @param password The password to verify
 * @param hash The hash to verify against
 * @returns True if the password matches the hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // For development, allow a simple hash format
  if (hash.startsWith('sha256_')) {
    return password === hash.replace('sha256_', '');
  }
  
  // For production, use bcrypt
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

// Allow direct execution for password hash generation
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'generate') {
    const password = args[1];
    
    if (!password) {
      console.error('Please provide a password: ts-node password-utils.ts generate YOUR_PASSWORD');
      process.exit(1);
    }
    
    generateHash(password)
      .then(hash => {
        console.log('Generated bcrypt hash:');
        console.log(hash);
        console.log('\nAdd this to your .env file:');
        console.log(`NEXTAUTH_ADMIN_PASSWORD=${hash}`);
      })
      .catch(err => {
        console.error('Error generating hash:', err);
        process.exit(1);
      });
  } else if (command === 'verify') {
    const password = args[1];
    const hash = args[2];
    
    if (!password || !hash) {
      console.error('Please provide both a password and a hash: ts-node password-utils.ts verify YOUR_PASSWORD HASH');
      process.exit(1);
    }
    
    verifyPassword(password, hash)
      .then(match => {
        console.log('Password match:', match);
      })
      .catch(err => {
        console.error('Error verifying password:', err);
        process.exit(1);
      });
  } else {
    console.error('Unknown command. Use "generate" or "verify"');
    console.error('Examples:');
    console.error('  ts-node password-utils.ts generate YOUR_PASSWORD');
    console.error('  ts-node password-utils.ts verify YOUR_PASSWORD HASH');
    process.exit(1);
  }
} 