import https from 'https';

const args = process.argv.slice(2);
let notification = '';

for (let i = 0; i < args.length; i++) {
    if (args[i] === '-notification' && i + 1 < args.length) {
        notification = args[i + 1];
    }
}

if (notification) {
    console.log('Sending pre-approval notification natively...');

    // Append context to the notification
    const fullMessage = `${notification} (Sócio, venha autorizar o Push no terminal!)`;

    const data = Buffer.from(fullMessage);

    const options = {
        hostname: 'ntfy.sh',
        port: 443,
        path: '/Metodo_ITR',
        method: 'POST',
        headers: {
            'Title': 'ITR Socio Tecnico (Acao Necessaria)',
            'Tags': 'warning',
            'Content-Type': 'text/plain',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => {
            responseBody += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log('\nPre-notification sent successfully via native Node.js!');
            } else {
                console.error(`\nFailed to send notification. Status: ${res.statusCode} - ${responseBody}`);
            }
        });
    });

    req.on('error', (error) => {
        console.error(`\nError sending notification via HTTPS: ${error.message}`);
    });

    req.write(data);
    req.end();

} else {
    console.log('No notification text provided.');
}
