(async function() {

  'use strict';

  const path = require('path');
  const fs = require('fs');
  const zipAFolder = await import('zip-a-folder');

  const outputPath = path.resolve(__dirname, '..', 'submission.zip');
  const inputPath = path.resolve(__dirname, '..', 'dist');

  if(fs.existsSync(outputPath)) {
    fs.rmSync(outputPath, { force: true });
    console.log('Old "submission.zip" deleted')
  }

  await zipAFolder.zip(inputPath, outputPath);
  console.log('New "submission.zip" created');

}());