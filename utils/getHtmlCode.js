const axios = require('axios');

const generateHtmlCodeForResponse = (listItems)=>{
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
}

const fetchTitle = async(url) =>{
    try {
        // Fetch the webpage content
        const response = await axios.get(url);

        // Extract the title using regex
        const titleMatch = response.data.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : 'NO TITLE FOUND';

        return title;
    } catch (error) {
        return null;  // Return null if there's an error
    }
}


module.exports = { generateHtmlCodeForResponse, fetchTitle}