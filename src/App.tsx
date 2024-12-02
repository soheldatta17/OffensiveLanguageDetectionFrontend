import { useState } from 'react';
import { Shield } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { TextInput } from './components/TextInput';
import { ResultDisplay } from './components/ResultDisplay';
import { readPdfFile } from './utils/pdfUtils';
import axios from 'axios';

export default function App() {
  const [text, setText] = useState('');
  const [sentences, setSentences] = useState<string[]>([]);
  const [isReadable, setIsReadable] = useState(true);
  const [fileError, setFileError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setFileError('Please upload a valid PDF file');
      return;
    }

    setFileError('');
    setIsLoading(true);

    try {
      const result = await readPdfFile(file);
      setIsReadable(result.isReadable);
      console.log("Data type of sentences is", typeof result.sentences);

      const response = await axios.post<Response>(
        'https://offensivelanguagedetectionbackend.onrender.com/check',
        { sentences: result.sentences }
      );

      const parsedData = JSON.parse(JSON.stringify(response.data, null, 2));
      console.log(parsedData[0])
      setSentences(parsedData);

    } catch (error) {
      console.error(error)
      setFileError('Error processing PDF file');
      setIsReadable(false);
      setSentences([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheck = async () => {
    if (text.trim()) {
      const sentences = text
        .split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => s + '.')
        .slice(0, 10);
      console.log("Data type of sentences is", typeof (sentences))
      const response = await axios.post<Response>(
        'https://offensivelanguagedetectionbackend.onrender.com/check',
        { sentences: sentences }
      );

      const parsedData = JSON.parse(JSON.stringify(response.data, null, 2));
      console.log(parsedData[0])
      setSentences(parsedData);
      setIsReadable(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-300">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full animate-gradient">
              <Shield className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
            Content Safety Checker
          </h1>
          <p className="text-lg text-gray-600">
            Analyze text or PDF documents for inappropriate content
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 hover-scale card-shadow backdrop-blur-sm bg-white/90">
          <div className="space-y-6">
            <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Enter Text
              </h2>
              <TextInput
                value={text}
                onChange={setText}
                placeholder="Enter your text here..."
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Upload PDF
              </h2>
              <FileUpload onFileSelect={handleFileSelect} error={fileError} />
            </div>

            <button
              onClick={handleCheck}
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 transform ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'animate-gradient text-white hover:scale-[1.02] active:scale-[0.98]'
                }`}
            >
              {isLoading ? 'Processing...' : 'Check Content'}
            </button>
          </div>
        </div>

        {(sentences.length > 0 || !isReadable) && (
          <div className="bg-white rounded-xl shadow-lg p-6 hover-scale card-shadow backdrop-blur-sm bg-white/90 transform transition-all duration-300">
            <ResultDisplay sentences={sentences} isReadable={isReadable} />
          </div>
        )}
      </div>
    </div>
  );
}