const { deleteObjectWithUrl } = require('../storage.service')
const isEmpty = require('lodash.isempty');


async function onUserProfileImageUpdated(event) {
    const oldDocument = event.oldValue;
    const updateMask = event.updateMask;

    if (!isEmpty(oldDocument) && !isEmpty(updateMask)) {

        // Check if the profile image was updated
        if (updateMask.fieldPaths.includes("profileImage")) {
            const profileImageUrl = oldDocument.fields.profileImage.stringValue;
            // Check if there was a profile image before
            if (profileImageUrl) {
                return await deleteObjectWithUrl(profileImageUrl)
            }
        }

    }
}

module.exports = {
    onUserProfileImageUpdated
}

// {
//     "oldValue": {
//       "createTime": "2021-05-10T23:39:42.078538Z",
//       "fields": {
//         "profileImage": {
//           "stringValue": "https://storage.googleapis.com/loopbin-tiptapflow-users-profile-image/7EJ9ySn0Yvlh16DpJyqi0R5130.jpg"
//         }
//       },
//       "name": "projects/bluebook-search/databases/(default)/documents/posts/0YDqMfnjcdhXPUIWDHsc",
//       "updateTime": "2021-05-11T04:28:56.508079Z"
//     },
//     "updateMask": { "fieldPaths": ["profileImage", "description"] },
//     "value": {}
//   }
