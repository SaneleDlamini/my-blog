const fs = require('fs');

const deleteFile = (imagePath) => {
    fs.unlink('../public/images/' + imagePath, (err) => {
        if(err){
            throw err;
        }
    });
}

module.exports = deleteFile;