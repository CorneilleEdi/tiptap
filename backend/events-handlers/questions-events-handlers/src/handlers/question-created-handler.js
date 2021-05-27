const { deleteObjectWithUrl } = require('../shared/services/storage.service')
const isEmpty = require('lodash.isempty');
const vision = require('@google-cloud/vision');
const Firestore = require('@google-cloud/firestore')

// Creates a client
const visionClient = new vision.ImageAnnotatorClient();
const db = new Firestore()
async function onQuestionCreated(event) {
    const createdDocument = event.value;


    if (!isEmpty(createdDocument)) {
        const questionUid = createdDocument.name.split('/questions/')[1]

        const questionTitle = createdDocument.fields.title?.stringValue || "";
        const questionContent = createdDocument.fields.content?.stringValue || "";

        const questionImageUrl = createdDocument.fields.image?.stringValue || "";
        if (questionImageUrl) {

            try {
                const [result] = await visionClient.safeSearchDetection(questionImageUrl);

                const safe = result.safeSearchAnnotation;

                return await db.collection('questions').doc(questionUid).update({
                    imageSafetyScores: {
                        adult: safe.adult || "",
                        violence: safe.violence || "",
                        racy: safe.racy || "",
                    },
                })
            } catch (error) {
                console.log(`Generate image safety scores error`);
                console.error(error);
            }
        }
    }
}

module.exports = {
    onQuestionCreated
}

// {
//     "oldValue": {},
//     "updateMask": {},
//     "value": {
//       "createTime": "2021-05-11T04:18:53.600783Z",
//       "fields": {
//         "description": {
//           "stringValue": "Sed voluptates eos."
//         },
//         "title": {
//           "stringValue": "Rerum cupiditate in vel."
//         }
//       },
//       "name": "projects/bluebook-search/databases/(default)/documents/posts/ksP4335m2bhSzNYZ5YEG",
//       "updateTime": "2021-05-11T04:18:53.600783Z"
//     }
// }