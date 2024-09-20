from spire.pdf.common import *
from spire.pdf import *

# Create a PdfDocument object
doc = PdfDocument()

# Load a PDF document
doc.LoadFromFile('C:/Users/hamza/Downloads/2023-Katalog.pdf')
  
images = []

# Loop through the pages in the document
for i in range(doc.Pages.Count):
    page = doc.Pages.get_Item(i)

    # Extract images from a specific page
    for image in page.ExtractImages():
        images.append(image)

# Save images to specified location with specified format extension
index = 0
for image in images:
    imageFileName = 'C:/Users/hamza/Desktop/Extracted/Image-{0:d}.png'.format(index)
    index += 1
    image.Save(imageFileName, ImageFormat.get_Png())
doc.Close()