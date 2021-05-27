const { deleteObjectWithUrl } = require('../shared/services/storage.service')
const isEmpty = require('lodash.isempty');

async function onQuestionDeleted(event) {
    const deletedDocument = event.oldValue;

    if (!isEmpty(deletedDocument)) {
        const imageUrl = deletedDocument.fields.image?.stringValue | "";
        if (imageUrl) {
            return await deleteObjectWithUrl(imageUrl)
        }
    }
}

module.exports = {
    onQuestionDeleted
}