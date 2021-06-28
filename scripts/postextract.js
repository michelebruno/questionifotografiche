const fs = require('fs');
const path = require('path');

fs.rmdirSync(path.resolve('tmp'), { recursive: true });
