

const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();

const text = 'I want git to ignore the folder no matter where it is starting from the root folder. Something like this to add in .gitignore'

const document = {
    content: text,
    type: 'PLAIN_TEXT',
};

(async () => {
    const [result] = await client.analyzeSentiment({ document });
    const sentiment = result.documentSentiment;
    console.log('Document sentiment:');
    console.log(`  Score: ${sentiment.score}`);
    console.log(`  Magnitude: ${sentiment.magnitude}`);

})();