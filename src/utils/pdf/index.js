import axios from 'axios';
import PdfPrinter from 'pdfmake';

const fetchImg = async (endpoint) => {
  try {
    const resp = await axios.get(endpoint, {
      responseType: 'arraybuffer',
    });
    const result = Buffer.from(resp.data, 'base64');
    return result;
  } catch (error) {
    console.log('fetchImg: ', error);
  }
};

export const generatePDF = async (product) => {
  try {
    const fonts = {
      Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };
    const url = await fetchImg(product.imageUrl);
    const image = { image: url };

    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      content: [
        { text: `${product.Name}`, style: 'header' },
        {
          ul: [
            `${'Brand: ' + product.Brand}`,
            `${'Category: ' + product.Category}`,
            `${'Description: ' + product.Description}`,
            `${'Price: ' + product.Price}`,
          ],
        },
        image,
      ],
      defaultStyle: {
        lineHeight: 2,
      },
    };

    const sourceStream = printer.createPdfKitDocument(docDefinition);
    sourceStream.end();

    return sourceStream;
  } catch (error) {
    console.log('generatePDFcatalogue: ', error);
  }
};
