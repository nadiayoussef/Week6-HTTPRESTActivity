(function(){

  'use strict'

  const fs = require('fs');
  const path = require('path');

  const distPath = path.resolve(__dirname, '..', 'dist');
  const clientDest = path.resolve(distPath, 'public');
  const clientSrc = path.resolve(__dirname, '..', 'client', 'build');
  const serverSrc = path.resolve(__dirname, '..', 'server', 'dist');

  function copyServer() {
    const serverFiles = fs.readdirSync(serverSrc);
    serverFiles.forEach(file => {
      fs.cpSync(path.resolve(serverSrc, file), path.resolve(distPath, file), { recursive: true });
    });
  }

  function copyClient() {
    const clientFiles = fs.readdirSync(clientSrc);
    clientFiles.forEach(file => {
      fs.cpSync(path.resolve(clientSrc, file), path.resolve(clientDest, file), { recursive: true });
    });
  }

  fs.mkdirSync(clientDest, { recursive: true });
  copyServer();
  copyClient();

}());
