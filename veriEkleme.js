const XLSX = require('xlsx');
const fs = require('fs');

// Dosya yolu
const inputFilePath = 'kullaniciRaporu.xlsx';
const outputFilePath = 'output_kullaniciRaporu.xlsx';

// Excel dosyasını oku
const workbook = XLSX.readFile(inputFilePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Çalışma sayfasını JSON formatına dönüştür
const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// Parantez içindeki metni bulmak için yardımcı bir fonksiyon
const extractTextInParentheses = (text) => {
    if (typeof text === 'string') {
        const match = text.match(/\(([^)]+)\)/);
        return match ? match[1] : '';
    }
    return '';
};

// Sayı çıkarmak için yardımcı bir fonksiyon
const extractNumbers = (text) => {
    if (typeof text === 'string') {
        const match = text.match(/\d+/); // İlk bulduğu sayıyı alır
        return match ? match[0] : '';
    }
    return '';
};

// Her satır için işlemleri yap
for (let i = 0; i < json.length; i++) {
    let lastColumn = json[i].length - 1;
    let cellValue = json[i][lastColumn];

    // Parantez içindeki metni çıkar
    let extractedText = extractTextInParentheses(cellValue);
    json[i].push(extractedText); // Yeni kolona ekle

    // Yeni oluşturulan kolondaki metnin içindeki sayıyı çıkar
    let numberInText = extractNumbers(extractedText);
    json[i].push(numberInText); // Sonraki kolona ekle
}

// Yeni verileri yeni bir çalışma sayfasına yaz
const newWorksheet = XLSX.utils.aoa_to_sheet(json);
const newWorkbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');

// Yeni Excel dosyasını kaydet
XLSX.writeFile(newWorkbook, outputFilePath);

console.log(`Yeni dosya ${outputFilePath} olarak kaydedildi.`);