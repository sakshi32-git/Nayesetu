
import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Camera } from 'lucide-react';
import { digitizeFIR } from '../services/geminiService';
import { FIRData } from '../types';

const FIRDigitizer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FIRData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const processImage = async () => {
    if (!preview) return;
    setLoading(true);
    setError(null);
    
    try {
      const base64Data = preview.split(',')[1];
      const data = await digitizeFIR(base64Data);
      if (data) {
        setResult(data);
      } else {
        setError("Could not extract data from the image. Please ensure the handwriting is clear.");
      }
    } catch (err) {
      setError("An error occurred while processing the FIR.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Upload */}
          <div className="flex-1 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" />
              Digitize Handwritten FIR
            </h2>
            <p className="text-slate-500 text-sm">
              Upload a clear photo of the handwritten FIR. Our AI will extract details and map relevant legal sections.
            </p>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${preview ? 'border-blue-200 bg-blue-50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'}`}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*"
              />
              {preview ? (
                <img src={preview} alt="FIR Preview" className="max-h-64 rounded-lg shadow-sm mb-4" />
              ) : (
                <>
                  <Upload className="w-12 h-12 text-slate-300 mb-4" />
                  <p className="text-slate-600 font-medium">Click to upload or drag & drop</p>
                  <p className="text-slate-400 text-xs mt-1">PNG, JPG, JPEG up to 10MB</p>
                </>
              )}
            </div>

            {preview && (
              <button 
                onClick={processImage}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing with AI...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Start Digitization
                  </>
                )}
              </button>
            )}

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          {/* Right Side: Results */}
          <div className="flex-1 min-h-[400px] border-l border-slate-100 pl-0 md:pl-8">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                <FileText className="w-16 h-16 mb-4" />
                <p>Digitized content will appear here</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <p className="text-slate-500 animate-pulse font-medium">Scanning text structure...</p>
              </div>
            )}

            {result && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-800">Digitization Result</h3>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED BY AI
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">FIR Number</p>
                    <p className="text-slate-900 font-medium">{result.firNumber || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Incident Date</p>
                    <p className="text-slate-900 font-medium">{result.date || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Complainant</p>
                    <p className="text-slate-900 font-medium">{result.complainantName || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Accused</p>
                    <p className="text-slate-900 font-medium">{result.accusedName || 'N/A'}</p>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-50">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Detailed Description</p>
                  <p className="text-slate-700 text-sm leading-relaxed">{result.description}</p>
                </div>

                <div className="space-y-3 pt-4">
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Mapped IPC Sections</p>
                   <div className="space-y-2">
                    {result.ipcSections.map((sec, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                        <p className="text-blue-700 font-bold text-sm">Section {sec.section}</p>
                        <p className="text-slate-600 text-xs mt-1">{sec.description}</p>
                      </div>
                    ))}
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FIRDigitizer;
