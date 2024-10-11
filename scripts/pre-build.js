(function(){

  const fs = require('fs');
  const path = require('path');

  const distPath = path.resolve(__dirname, 'dist');

  if(fs.existsSync(distPath)) {
    fs.rmdirSync(distPath, { recursive: true, force: true });
  }

}());