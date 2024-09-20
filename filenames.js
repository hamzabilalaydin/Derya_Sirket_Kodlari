const fsExtra = require('fs-extra');
const XLSX = require('xlsx');
const fs = require('fs');


//EXCEL ve klasor yolu her ullanimda degistirmeyi unutma
const gorselKlasoru = "C:/Users/hamzaa/Desktop/Mythos"
const excelDosyasi = "C:/Users/hamzaa/Desktop/Mytho_Stok.xlsx"


// Path to your Excel file
const filePath = excelDosyasi;

// Read the Excel file
const workbook = XLSX.readFile(filePath);

// Get the first sheet
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

// Convert the worksheet to a JSON object
const jsonData = XLSX.utils.sheet_to_json(worksheet);
const marka = jsonData[0]["Marka Ad"]



// Source and destination directory paths
const sourceDir = gorselKlasoru;
const destinationDir = sourceDir+"_Yeni";

// Read the list of files in the source directory
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
console.log(files[1])
  // Loop through each file in the source directory
  files.forEach( file => {

    const sourceFilePath = `${sourceDir}/${file}`;
    const destinationFilePath = `${destinationDir}/${data["Stok Kod"]}.jpg`;

    // Copy the file from source to destination
    fsExtra.copy(sourceFilePath, destinationFilePath, err => {
      if (err) {
        console.error('Error copying file:', err);
      } else {
        console.log(`Copied ${data["Stok Kod"]}.jpg to ${destinationDir}`);
        return;
      }
    });

    if (file.includes("__1")) {
      file = file.split("_")[0]
    } else if(file.includes("__2")) {
      file = file.split('_')[0] + "-1"
    } else if(file.includes("__2")) {
      file = file.split('_')[0] + "-2"
    }
  });

  // 2. Convert JSON to Excel format
const workshee = XLSX.utils.json_to_sheet(jsonData);

// 3. Create a workbook and add the workshee
const workboo = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workboo, workshee, 'Sheet1');

// 4. Write to Excel file
XLSX.writeFile(workboo, `${marka}_Eksik_Olanlar.xlsx`);

console.log('Excel file generated successfully.');
});