const XLSX = require('xlsx');
const fs = require('fs');

// Excel dosyalarının yollarını belirtin
const file1 = 'C:/Users/hamzaa/Desktop/Kırtasiye-Adet.xlsx';
const file2 = 'C:/Users/hamzaa/Desktop/Kırtasiye-Rapor.xlsx';
const outputFile = 'C:/Users/hamzaa/Desktop/eslesenKayitlar.xlsx';

// Excel dosyalarını oku
const workbook1 = XLSX.readFile(file1);
const workbook2 = XLSX.readFile(file2);

// İlk sayfayı seç
const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
const sheet2 = workbook2.Sheets[workbook2.SheetNames[0]];

// Verileri JSON formatında al
const data1 = XLSX.utils.sheet_to_json(sheet1);
const data2 = XLSX.utils.sheet_to_json(sheet2);


// Eşleşen verileri tutmak için bir array oluştur
// const urunsag = new Object()

// İkinci dosyadaki sütunları bir Set içinde sakla
const urunsagAdet = data1.reduce((acc, row) => {
    // Concatenate the desired columns to create the key
    const key = `${row["Ürün Sağlayıcı"].trim()}_${row["Belge No"]}_${row["Ürün Kodu"]}`; // Replace with your actual column names
    acc[key] = row["Adet"];
    return acc;
}, {});

// console.log(data2)


const urunsagAdetKeys = Object.keys(urunsagAdet) 
const urunsagAdetValues = Object.values(urunsagAdet) 

for (let i = 0; i < data2.length; i++) {
    if (urunsagAdetKeys.includes(`${data2[i]["Ürün Sağlayıcı"].trim()}_${data2[i]["Belge No"]}_${data2[i]["Ürün Kodu"]}`)) {
        data2[i]["Adet"] = urunsagAdetValues[i]
    } else {
        data2[i]["Adet"] = " "
    }
}

// console.log(data2)

// İlk dosyadaki verileri kontrol et ve eşleşenleri topla



// Eşleşen satırları yeni bir Excel dosyasına yaz
const newSheet = XLSX.utils.json_to_sheet(data2);
const newWorkbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Eşleşen Veriler');

// Yeni dosyayı kaydet
XLSX.writeFile(newWorkbook, outputFile);

console.log('Eşleşen veriler yeni dosyaya kaydedildi: ' + outputFile);
