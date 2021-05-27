const { onUserProfileDeleted } = require('./user-profile-deleted')
const { onUserProfileImageUpdated } = require('./user-profile-image-updated')
const isEmpty = require('lodash.isempty');


async function onUserProfileWritten(event) {
    const value = event.value;
    const oldValue = event.oldValue;
    const updateMask = event.updateMask;

    if (!isEmpty(updateMask)) {
        // It is an update event
        return await onUserProfileImageUpdated(event)
    } else if (isEmpty(value) && !isEmpty(oldValue)) {
        // It is an delete event
        return await onUserProfileDeleted(event)
    } else {
        console.error('the event does not match any condition')
    }
}

module.exports = {
    onUserProfileWritten
}