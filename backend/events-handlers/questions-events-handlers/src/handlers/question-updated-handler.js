const { deleteObjectWithUrl } = require('../shared/services/storage.service')
const isEmpty = require('lodash.isempty');

async function onQuestionUpdated(event) {
    const oldDocument = event.oldValue;
    const newDocument = event.value;

    if (!isEmpty(oldDocument)) {

        const questionUid = newDocument.name.split('/questions/')[1]

        const questionTitle = newDocument.fields.title?.stringValue || "";
        const questionContent = newDocument.fields.content?.stringValue || "";

        const questionImageUrl = newDocument.fields.image?.stringValue || "";


        const imageUrl = oldDocument.fields.image?.stringValue | "";
        if (imageUrl) {
            return await deleteObjectWithUrl(imageUrl)
        }

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

module.exports = {
    onQuestionUpdated
}