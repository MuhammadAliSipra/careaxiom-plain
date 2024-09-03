const http = require('http');
const https = require('https');

const generateHtmlCodeForResponse = (listItems) => {
    const htmlResponse = `
    <html>
    <head></head>
    <body>
        <h1>Following are the titles of given websites:</h1>
        <ul>
            ${listItems.join('')}
        </ul>
    </body>
    </html>`;
    return htmlResponse;
};

const fetchTitle = (url, callback) => {
    const client = url.startsWith('https') ? https : http;

    client.get(url, (res) => {
        let data = '';

        // Handle redirects
        if (res.statusCode === 301 || res.statusCode === 302) {
            const location = res.headers.location;
            const newUrl = location.startsWith('http') ? location : `${url.split('://')[0]}://${location}`;
            fetchTitle(newUrl, callback); // Recursive call for the new URL
            return;
        }

        // Receive chunks of data
        res.on('data', (chunk) => {
            data += chunk;
        });

        // When data reception is complete
        res.on('end', () => {
            const titleMatch = data.match(/<title>(.*?)<\/title>/i);
            const title = titleMatch ? titleMatch[1].trim() : 'NO TITLE FOUND';
            callback(null, title);
        });

    }).on('error', (err) => {
        callback(err, null);
    });
};

module.exports = { generateHtmlCodeForResponse, fetchTitle };