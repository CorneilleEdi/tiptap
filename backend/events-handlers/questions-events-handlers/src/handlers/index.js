const { onQuestionDeleted } = require('./question-deleted-handler')
const { onQuestionCreated } = require('./question-created-handler')
const { onQuestionUpdated } = require('./question-updated-handler')
const isEmpty = require('lodash.isempty');


async function onQuestionWritten(event) {
    const value = event.value;
    const oldValue = event.oldValue;
    const updateMask = event.updateMask;

    if (!isEmpty(updateMask)) {
        // It is an update event
        return await onQuestionUpdated(event)
    } else if (isEmpty(value) && !isEmpty(oldValue)) {
        // It is an delete event
        return await onQuestionDeleted(event)
    } else if (!isEmpty(value) && isEmpty(oldValue)) {
        // It is an create event
        await onQuestionCreated(event)
    } else {
        console.error('the event does not match any condition')
    }
}

module.exports = {
    onQuestionWritten
}