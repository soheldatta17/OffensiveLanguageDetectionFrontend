import { FileText, AlertTriangle } from 'lucide-react';

interface ResultDisplayProps {
  sentences: string[];
  isReadable: boolean;
}

export function ResultDisplay({ sentences, isReadable }: ResultDisplayProps) {
  if (!isReadable) {
    return (
      <div className="p-6 bg-red-50 rounded-lg flex items-center space-x-3 transform transition-all duration-300 hover:scale-[1.02]">
        <AlertTriangle className="w-6 h-6 text-red-600 animate-pulse" />
        <div>
          <p className="text-red-600 font-medium">This PDF is not readable</p>
          <p className="text-red-500 text-sm mt-1">
            The file might be scanned, encrypted, or damaged. Please try another file.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <FileText className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
      </div>

      {sentences.length > 0 && (
        <>
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg mb-4 transform transition-all duration-300 hover:scale-[1.02]">

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">All extracted sentences:</h4>
              <div className="space-y-2">
                {sentences.map((sentence, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 transform transition-all duration-300 hover:scale-[1.01] hover:bg-blue-50"
                  >
                    <p className="text-gray-700">{sentence}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}