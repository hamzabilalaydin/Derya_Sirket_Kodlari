const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

// Function to create a directory if it doesn't exist
function ensureDirectoryExists(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

// Function to move an image file to a directory
function moveImage(imagePath, destination) {
    const fileName = path.basename(imagePath);
    const newFilePath = path.join(destination, fileName);
    fs.renameSync(imagePath, newFilePath);
}

// Function to separate portrait and landscape images and move them to separate folders
function separateAndMoveImages(imagesDir) {
    const portraitDir = path.join(imagesDir, 'portrait');
    const landscapeDir = path.join(imagesDir, 'landscape');

    ensureDirectoryExists(portraitDir);
    ensureDirectoryExists(landscapeDir);
    let sayac = 0

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return;
        }

        files.forEach(file => {
            const imagePath = path.join(imagesDir, file);
            try {
                const dimensions = sizeOf(imagePath);
                if (dimensions.width > dimensions.height) {
                    moveImage(imagePath, landscapeDir);
                } else {
                    moveImage(imagePath, portraitDir);
                }
            } catch (error) {
                console.error("Error processing image:", error);
                sayac++
            }
        });
        console.log(sayac + " gorsel ayrilamadi")
    });
}

// Example usage
const imagesDir = 'C:/Users/hamzaa/Desktop/ArtBoya'; // Change this to the path of your images folder
separateAndMoveImages(imagesDir);
