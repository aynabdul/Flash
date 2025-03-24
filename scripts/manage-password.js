#!/usr/bin/env node

/**
 * Password management script
 * 
 * This script provides a simple CLI for managing admin passwords.
 * It can generate bcrypt hashes and verify passwords against hashes.
 * 
 * Usage:
 *   node scripts/manage-password.js generate <password>
 *   node scripts/manage-password.js verify <password> <hash>
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptPassword() {
  return new Promise((resolve) => {
    rl.question('Enter password: ', (password) => {
      resolve(password);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  try {
    if (command === 'generate') {
      let password = args[1];
      
      if (!password) {
        console.log('No password provided. Please enter a password:');
        password = await promptPassword();
      }
      
      if (!password) {
        console.error('Password is required');
        process.exit(1);
      }
      
      console.log('Generating bcrypt hash...');
      execSync(`npx ts-node src/utils/password-utils.ts generate ${password}`, { stdio: 'inherit' });
    } 
    else if (command === 'verify') {
      let password = args[1];
      let hash = args[2];
      
      if (!password) {
        console.log('No password provided. Please enter a password:');
        password = await promptPassword();
      }
      
      if (!hash) {
        console.log('No hash provided. Please enter a hash:');
        hash = await new Promise((resolve) => {
          rl.question('Enter hash: ', (hash) => {
            resolve(hash);
          });
        });
      }
      
      if (!password || !hash) {
        console.error('Both password and hash are required');
        process.exit(1);
      }
      
      console.log('Verifying password...');
      execSync(`npx ts-node src/utils/password-utils.ts verify ${password} "${hash}"`, { stdio: 'inherit' });
    }
    else {
      console.log('FLASH Admin Password Manager');
      console.log('---------------------------');
      console.log('');
      console.log('Available commands:');
      console.log('  generate - Generate a bcrypt hash for a password');
      console.log('  verify   - Verify a password against a hash');
      console.log('');
      console.log('Examples:');
      console.log('  node scripts/manage-password.js generate mypassword');
      console.log('  node scripts/manage-password.js verify mypassword "$2b$10$..."');
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main(); 