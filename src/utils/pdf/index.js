import PdfPrinter from 'pdfmake';
import axios from 'axios';

export const generatePDF = async (data) => {
  try {
    const resp = await axios.get(data.imgUrl, { responseType: 'arraybuffer' });

    const raw = Buffer.from(resp.data).toString('base64');

    const image = 'data:' + resp.headers['content-type'] + ';base64,' + raw;
    const fonts = {
      Roboto: {
        normal: 'Courier',
        bold: 'Courier-Bold',
        italics: 'Courier-Oblique',
        bolditalics: 'Courier-BoldOblique',
      },
    };

    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      content: [
        {
          image: image,
        },
      ],
    };

    const sourceStream = printer.createPdfKitDocument(docDefinition);

    sourceStream.end();
    return sourceStream;
  } catch (error) {
    console.log('pdf make', error);
  }
};
