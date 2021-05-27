const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

async function deleteObjectWithUrl(objectUrl) {

    try {
        // link : https://storage.googleapis.com/bucket_name/xxx/xxxxxxx/xxxxxxxxxxxxxxxxxxxxx.png

        // Create an URL object
        const url = new URL(objectUrl);

        // Get pathname (everything after the base URL https://storage.googleapis.com/ )
        const pathname = url.pathname;

        // Split by "/" and remove every empty string
        const paths = pathname.split('/').filter((x) => x);

        // Get the bucket as the first element of the array
        const bucket = paths[0];

        // Combine the rest after removing the first (bucket name);
        const fileName = paths.filter((x) => paths.indexOf(x)).join('/');

        console.debug(`Deleting image ${objectUrl} ...`);

        // Deletes the file from the bucket
        return await storage.bucket(bucket).file(fileName).delete();
    } catch (error) {
        console.log("Delete object failed");
        console.error(error)
        throw error;
    }

}

module.exports = {
    deleteObjectWithUrl,
}