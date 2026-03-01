import { execSync } from 'child_process';
import https from 'https';

const args = process.argv.slice(2);

// Simple argument parser
let message = '';
let notification = '';

for (let i = 0; i < args.length; i++) {
    if (args[i] === '-message' && i + 1 < args.length) {
        message = args[i + 1];
    }
    if (args[i] === '-notification' && i + 1 < args.length) {
        notification = args[i + 1];
    }
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
        const data = Buffer.from(notification);
        const options = {
            hostname: 'ntfy.sh',
            port: 443,
            path: '/Metodo_ITR',
            method: 'POST',
            headers: {
                'Title': 'ITR Socio Tecnico',
                'Content-Type': 'text/plain',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            if (res.statusCode === 200) {
                console.log('\nNotification sent successfully via native Node.js.');
            }
        });
        req.on('error', (error) => console.error(error.message));
        req.write(data);
        req.end();
    }
} catch (error) {
    console.error(`Error during publish workflow: ${error.message}`);
    process.exit(1);
}
