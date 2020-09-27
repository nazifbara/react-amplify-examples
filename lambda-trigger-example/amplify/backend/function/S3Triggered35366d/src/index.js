const sharp = require('sharp');
const aws = require('aws-sdk');
const s3 = new aws.S3();

// eslint-disable-next-line
exports.handler = async function(event, context) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  if (event.Records[0].eventName === 'ObjectRemoved:Delete') return;

  // Get the object from the event and show its content type
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  const key = event.Records[0].s3.object.key; //eslint-disable-line
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);

  try {
    let image = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    image = await sharp(image.Body);
    const metadata = await image.metadata();
    if (metadata.width > 1000) {
      const resizedImage = await image.resize({ width: 1000 }).toBuffer();
      await s3.putObject({
        Bucket: bucket,
        Body: resizedImage,
        Key: key
      }).promise();
      context.done(null, 'Successfully processed S3 event');
    } else {
      context.done(null, 'Successfully processed S3 event');
    }
  } catch (err) {
    context.fail(`Error getting files: ${err}`);
  }
};
