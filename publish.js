import { execSync } from 'child_process';

const args = process.argv.slice(2);
let message = '';

for (let i = 0; i < args.length; i++) {
    if (args[i] === '-message' && i + 1 < args.length) {
        message = args[i + 1];
    }
}

try {
    console.log('Adding files...');
    execSync('git add .', { stdio: 'inherit' });

    if (!message) {
        console.warn('No commit message provided. Using default message.');
        message = 'chore: auto-update';
    }

    console.log(`Committing changes with message: "${message}"`);
    execSync(`git commit -m "${message}"`, { stdio: 'inherit' });

    console.log('Pushing to GitHub...');
    execSync('git push origin main', { stdio: 'inherit' });

    console.log('\nDeploy commands executed successfully. (Notifications disabled).');
} catch (error) {
    console.error(`Error during publish workflow: ${error.message}`);
    process.exit(1);
}
