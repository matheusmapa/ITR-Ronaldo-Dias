import { execSync } from 'child_process';
import fs from 'fs';

const args = process.argv.slice(2);

// Simple argument parser
let message = 'chore: auto-update';
let notification = '';

for (let i = 0; i < args.length; i++) {
    if (args[i] === '-message' && i + 1 < args.length) {
        message = args[i + 1];
    } else if (args[i] === '-notification' && i + 1 < args.length) {
        notification = args[i + 1];
    }
}

// Fallback to notify.txt if -notification argument isn't provided
if (!notification && fs.existsSync('notify.txt')) {
    notification = fs.readFileSync('notify.txt', 'utf8').trim();
    fs.unlinkSync('notify.txt'); // Clean up after reading
}

try {
    console.log('Adding files...');
    execSync('git add .', { stdio: 'inherit' });

    console.log(`Committing changes with message: "${message}"`);
    try {
        execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
    } catch (e) {
        console.log('Note: Nothing to commit or working tree is clean.');
    }

    console.log('Pushing to GitHub...');
    execSync('git push origin main', { stdio: 'inherit' });

    if (notification) {
        console.log('Sending notification...');
        execSync(`curl.exe -d "${notification}" -H "Title: ITR Socio Tecnico" ntfy.sh/Metodo_ITR`, { stdio: 'inherit' });
        console.log('\nNotification sent successfully.');
    } else {
        console.log('No notification payload found. Skipping ntfy.');
    }
} catch (error) {
    console.error(`Error during publish workflow: ${error.message}`);
    process.exit(1);
}
