const { generateHtmlCodeForResponse, fetchTitle } = require("../utils/getHtmlCode");

const getUrlsToGtTitles = async (req,res) =>{
    const addresses = req.query.address;

    if (!addresses) {
        return res.status(400).send('No address provided');
    }

    const addressArray = Array.isArray(addresses) ? addresses : [addresses];
    
    const results = await Promise.all(addressArray.map(async (address) => {
        let url = address.startsWith('http') ? address : `http://${address}`;
        let title = await fetchTitle(url);

        if (title === null && !address.startsWith('https://')) {
            url = `https://${address}`;
            title = await fetchTitle(url);
        }

        return title 
            ? `<li>${url} - "${title}"</li>` 
            : `<li>${address} - NO RESPONSE</li>`;
    }));

    const htmlCode = generateHtmlCodeForResponse(results)
    res.status(200).send(htmlCode);
}


module.exports =  { getUrlsToGtTitles }