import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, CheckCircle, XCircle } from 'lucide-react';
import Papa from 'papaparse';
import type { TransportData } from '../types';

function FileUpload() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          try {
            // Mock successful upload
            console.log('Parsed data:', results.data);
            setUploadStatus('success');
          } catch (error) {
            setUploadStatus('error');
            setErrorMessage('Failed to process the CSV file');
          }
        },
        header: true,
        error: (error) => {
          setUploadStatus('error');
          setErrorMessage(error.message);
        }
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Transport Data</h2>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive
              ? "Drop the CSV file here"
              : "Drag 'n' drop a CSV file here, or click to select one"}
          </p>
        </div>

        {uploadStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-50 rounded-md flex items-center">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-green-700">File uploaded successfully!</span>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-50 rounded-md flex items-center">
            <XCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-red-700">{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;