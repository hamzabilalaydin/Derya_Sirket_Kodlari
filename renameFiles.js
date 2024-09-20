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
                if (file.includes("-")){
                    const parts = file.split('-');
                    if (parts[1][1] == "1") {
                        const newFileName = parts[0] + path.extname(file);
                        fs.copyFileSync(`${inputDirectory}/${file}`, `${outputDirectory}/${file}`);
                        fs.renameSync(`${outputDirectory}/${file}`, `${outputDirectory}/${newFileName}`);
                        console.log(`Renamed ${file} to ${newFileName}`);
                    }   else {
                        const newParts = parts[1][1] - 1
                        if (newParts < 4){
                            const newFileName = parts[0] + "-" + newParts + path.extname(file);
                            fs.copyFileSync(`${inputDirectory}/${file}`, `${outputDirectory}/${file}`);
                            fs.renameSync(`${outputDirectory}/${file}`, `${outputDirectory}/${newFileName}`);
                            console.log(`Renamed ${file} to ${newFileName}`);
                        }
                        
                    }
                }   else {
                    fs.copyFileSync(`${inputDirectory}/${file}`, `${outputDirectory}/${file}`);
                }
            }
        });
    });
}

// Replace 'inputDirectoryPath' with the path to your directory containing the images
// Replace 'outputDirectoryPath' with the path to the new directory where renamed images will be saved
renameImages('C:/Users/hamzaa/Desktop/KeskinColor', 'C:/Users/hamzaa/Desktop/KeskinColor_Yeni');
