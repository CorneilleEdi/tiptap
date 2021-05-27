const { deleteObjectWithUrl } = require('../storage.service')
const isEmpty = require('lodash.isempty');


async function onUserProfileDeleted(event) {
    const deletedDocument = event.oldValue;

    if (!isEmpty(deletedDocument)) {
        const profileImageUrl = deletedDocument.fields.profileImage.stringValue;
        if (profileImageUrl) {
            return await deleteObjectWithUrl(profileImageUrl)
        }
    }
}

module.exports = {
    onUserProfileDeleted
}

// {
//     "oldValue": {
//       "createTime": "2021-05-10T23:39:42.078538Z",
//       "fields": {
//         "profileImage": {
//           "stringValue": "https://storage.googleapis.com/loopbin-tiptapflow-users-profile-image/MlimvlkjbNohkeDjjWxRXV2250.jpg"
//         }
//       },
//       "name": "projects/bluebook-search/databases/(default)/documents/posts/0YDqMfnjcdhXPUIWDHsc",
//       "updateTime": "2021-05-11T04:28:56.508079Z"
//     },
//     "updateMask": {},
//     "value": {}
//   }
