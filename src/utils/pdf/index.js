import PdfPrinter from 'pdfmake';
import axios from 'axios';

export const generatePDF = async (data) => {
  try {
    const resp = await axios.get(data.imgUrl, { responseType: 'arraybuffer' });
    const raw = Buffer.from(resp.data).toString('base64');
    const image = 'data:' + resp.headers['content-type'] + ';base64,' + raw;
    // console.log('image: ', resp.headers['content-type']);
    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf',
      },
    };

    const printer = new PdfPrinter(fonts);
    const docDefinition = {
      content: [
        {
          image,
        },
      ],
    };
    const sourceStream = printer.createPdfKitDocument(docDefinition);
    return sourceStream;
  } catch (error) {
    console.log('pdf make', error);
  }
};
