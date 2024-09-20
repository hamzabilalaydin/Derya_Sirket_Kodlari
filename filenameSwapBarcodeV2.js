const fsExtra = require('fs-extra');
const XLSX = require('xlsx');
const fs = require('fs');


//EXCEL ve klasor yolu her kullanimda degistirmeyi unutma
const gorselKlasoru = "C:/Users/hamzaa/Desktop/KeskinColor_Yeni"
const excelDosyasi = "C:/Users/hamzaa/Desktop/Ürün Listeleri/KeskinColor_Eksik_Gorsel.xls"


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

console.log(jsonData)

// Source and destination directory paths
const sourceDir = gorselKlasoru;
const destinationDir = sourceDir+"_Yeni";

// Read the list of files in the source directory
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

console.log(jsonData[0]["STOK KODLARI"])


// Loop through each file in the source directory
files.forEach( file => {
  jsonData.forEach(data => {
    const barkod = data["Barkod"]; //ONEMLI ALAN
    const filenameSplitDot = file.split(".");
    const imageName = filenameSplitDot[0].trim()
      if(barkod == undefined) {
        return;
      }
        if (imageName.includes('-') == false){
            if (barkod.includes(imageName)) {
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
                // const dataIndex = jsonData.indexOf(data)
                // jsonData.splice(dataIndex, 1)
            }
        }
        else {
            const filenameSplitted = imageName.split("-")[0].trim();
            if (barkod.includes(filenameSplitted)) {
                const sourceFilePath = `${sourceDir}/${file}`;
                let destinationFilePath = ""
                if (imageName.split("-")[1] < 4) {
                  destinationFilePath = `${destinationDir}/${data["Stok Kod"]}-${imageName.split("-")[1]}.jpg`;
                  }
                  else {
                    return;
                  }

                // Copy the file from source to destination
                fsExtra.copy(sourceFilePath, destinationFilePath, err => {
                    if (err) {
                    console.error('Error copying file:', err);
                    } else {
                    console.log(`Copied ${data["Stok Kod"]}-${imageName.split("-")[1]}.jpg to ${destinationDir}`);
                    return;
                    }
                });
                // const dataIndex = jsonData.indexOf(data)
                // jsonData.splice(dataIndex, 1)
            }
        }
        })

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