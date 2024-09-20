const fs = require('fs');
const path = require('path');

function renameImages(inputDirectory, outputDirectory) {
    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
    }

    fs.readdir(inputDirectory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            if (file.endsWith('.jpg') || file.endsWith('.png')) { // Adjust file extensions as needed
                const parts = file.split('_');
                // Check if there are at least 3 parts in the filename
                if (parts.length >= 3) {
                    // Join parts starting from the third one
                    const newFileName = parts.slice(2).join('_') + path.extname(file);
                    fs.copyFileSync(`${inputDirectory}/${file}`, `${outputDirectory}/${file}`);
                    fs.renameSync(`${outputDirectory}/${file}`, `${outputDirectory}/${newFileName}`);
                    console.log(`Renamed ${file} to ${newFileName}`);
                } else {
                    console.log(`Cannot rename ${file}: Not enough parts`);
                }
            }
        });
    });
}

// Replace 'inputDirectoryPath' with the path to your directory containing the images
// Replace 'outputDirectoryPath' with the path to the new directory where renamed images will be saved
renameImages('C:/Users/hamzaa/Desktop/SCHNEIDER/Schneider/Ürün Fotoğrafları/jpg', 'C:/Users/hamzaa/Desktop/SCHNEIDER/Schneider/Ürün Fotoğrafları/newJpg');
