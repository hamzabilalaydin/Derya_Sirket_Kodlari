const fs = require('fs');
const path = require('path');

// Function to copy images to a new folder with modified names
function copyAndRenameImages(sourceFolderPath, destinationFolderPath) {
    // Create the destination folder if it doesn't exist
    if (!fs.existsSync(destinationFolderPath)) {
        fs.mkdirSync(destinationFolderPath, { recursive: true });
    }

    // Read files in the source folder
    fs.readdir(sourceFolderPath, (err, files) => {
        if (err) {
            console.error("Error reading source directory:", err);
            return;
        }

        // Filter out only image files (you can adjust this filter as needed)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        // Copy and rename each image file to the destination folder
        imageFiles.forEach(file => {
            const sourceFilePath = path.join(sourceFolderPath, file);
            const extension = path.extname(file);
            const baseName = path.basename(file, extension);
            let newName;

            if (baseName.endsWith("__1")) {
                newName = baseName.replace(/__\d+$/, '');
            } else {
                const index = parseInt(baseName.substring(baseName.lastIndexOf("__") + 2)) - 1;
                newName = `${baseName.substring(0, baseName.lastIndexOf("__"))}-${index}`;
            }

            const destinationFilePath = path.join(destinationFolderPath, `${newName}${extension}`);

            // Copy the file
            fs.copyFile(sourceFilePath, destinationFilePath, err => {
                if (err) {
                    console.error(`Error copying ${sourceFilePath} to ${destinationFilePath}:`, err);
                } else {
                    console.log(`Copied ${sourceFilePath} to ${destinationFilePath}`);
                }
            });
        });
    });
}

// Example usage: Replace 'sourceFolderPath' and 'destinationFolderPath' with the paths to your source and destination folders
const sourceFolderPath = 'C:/Users/hamzaa/Desktop/Mythos';
const destinationFolderPath = 'C:/Users/hamzaa/Desktop/Mythos_Deneme';
copyAndRenameImages(sourceFolderPath, destinationFolderPath);
