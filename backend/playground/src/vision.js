const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();



(async () => {
    const [result] = await client.safeSearchDetection("https://storage.googleapis.com/loopbin-tiptapflow-users-profile-image/7EJ9ySn0Yvlh16DpJyqi0R5130.jpg");

    const safe = result.safeSearchAnnotation;
    console.log({
        adult: safe.adult,
        spoof: safe.spoof,
        medical: safe.medical,
        violence: safe.violence,
        racy: safe.racy,
    });
})();