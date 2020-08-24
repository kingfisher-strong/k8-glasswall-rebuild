var fs = require('fs');
var archiver = require('archiver');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'AKIAXTOGKUATEHL3MPW7',
    secretAccessKey: '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'
  });
  
const s3 = new AWS.S3();

var output = fs.createWriteStream('target.zip');
var archive = archiver('zip');

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
var rString = randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
console.log(rString)

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    const res =  new Promise((resolve, reject) => {
        s3.upload({
          Bucket: 'glasswall-rebuild-bucket',
          Body: fs.createReadStream('./target.zip'),
          Key: rString
        }, (err, data) => err == null ? resolve(data) : reject(err));
      });

});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);

// append files from a sub-directory and naming it `new-subdir` within the archive (see docs for more options):
archive.directory("/output/Managed", false);
archive.finalize();
