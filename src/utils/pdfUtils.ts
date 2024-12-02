import pdfToText from 'react-pdftotext'

export async function readPdfFile(file: File): Promise<{ isReadable: boolean; sentences: string[] }> {
  try {
    console.log("Starting PDF text extraction...");


    const text = await pdfToText(file);
    console.log("Text extraction completed.");

    if (!text) {
      console.log("No text extracted from PDF.");
      return { isReadable: false, sentences: [] };
    }

    const sentences = text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    return {
      isReadable: sentences.length > 0,
      sentences: sentences.slice(0, 10),
    };
  } catch (error) {
    console.error("Error reading PDF:", error);
    return { isReadable: false, sentences: [] };
  }
}
