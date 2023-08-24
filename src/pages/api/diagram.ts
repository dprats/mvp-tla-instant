import { join } from 'path';
import { createReadStream } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const diagramPath = join(process.cwd(), 'public', 'diagrams/diagram.dot');

  try {
    const pdfStream = createReadStream(diagramPath);
    // res.setHeader('Content-Type', 'application/pdf');
    pdfStream.pipe(res);
  } catch (error) {
    console.error('Error serving DOT:', error);
    res.status(500).end();
  }

}