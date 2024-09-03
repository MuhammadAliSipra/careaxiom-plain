const { generateHtmlCodeForResponse, fetchTitle } = require("../utils/getHtmlCode");

const getUrlsToGtTitles = (req, res) => {
    const addresses = req.query.address;

    if (!addresses) {
        return res.status(400).send('No address provided');
    }

    const addressArray = Array.isArray(addresses) ? addresses : [addresses];
    let results = [];
    let completedRequests = 0;

    addressArray.forEach(address => {
        let url = address.startsWith('http') ? address : `http://${address}`;

        // Fetch title using callback
        fetchTitle(url, (err, title) => {
            if (err || title === null) {
                if (!address.startsWith('https://')) {
                    // If the initial HTTP request fails, try HTTPS
                    url = `https://${address}`;
                    fetchTitle(url, (err, title) => {
                        if (err || title === null) {
                            results.push(`<li>${address} - NO RESPONSE</li>`);
                        } else {
                            results.push(`<li>${url} - "${title}"</li>`);
                        }
                        checkCompletion();
                    });
                } else {
                    results.push(`<li>${address} - NO RESPONSE</li>`);
                    checkCompletion();
                }
            } else {
                results.push(`<li>${url} - "${title}"</li>`);
                checkCompletion();
            }
        });
    });

    function checkCompletion() {
        completedRequests++;
        if (completedRequests === addressArray.length) {
            const htmlCode = generateHtmlCodeForResponse(results);
            res.status(200).send(htmlCode);
        }
    }
};

module.exports = { getUrlsToGtTitles };