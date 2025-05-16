import React from 'react';

interface PDFDebuggerProps {
  pdfPath: string;
}

export function PDFDebugger({ pdfPath }: PDFDebuggerProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 my-4">
      <h3 className="text-lg font-medium mb-2">PDF Debug Info</h3>
      <p className="mb-2">Attempting to load PDF from: <code className="bg-gray-100 px-2 py-1 rounded">{pdfPath}</code></p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="font-medium mb-2">Direct Link Test:</h4>
          <a 
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Open PDF directly
          </a>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Iframe Test:</h4>
          <iframe
            src={pdfPath}
            width="100%"
            height="200"
            className="border rounded"
          ></iframe>
        </div>
      </div>
    </div>
  );
} 