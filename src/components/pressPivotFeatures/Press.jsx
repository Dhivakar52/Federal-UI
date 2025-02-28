import React, { useState } from 'react';
import { Newspaper, RotateCcw, Upload, Clipboard, Loader2, Globe2, AlertCircle, RefreshCw } from 'lucide-react';
import Spinner from 'react-bootstrap/Spinner';
import toast, { Toaster } from 'react-hot-toast';
import { LanguageSelector } from './LanguageSelector';
import { Disclosure } from './Disclosure';
import { UsageInstructions } from './UsageInstructions';
import '../../css/Press.css'

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [state, setState] = useState({
    input: '',
    output: '',
    selectedLanguage: 'english',
    isLoading: false,
    error: null,
  });


 
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setState(prev => ({ ...prev, input: e.target?.result }));
      };
      reader.readAsText(file);
    }
  };

  const handleClearContent = () => {
    setState(prev => ({
      ...prev,
      input: '',
      output: '',
      error: null
    }));
    toast.success('Content cleared');
  };
  

  const handleGenerate = async () => {
    if (!apiUrl) {
      toast.error('OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file.');
      return;
    }

    if (!state.input.trim()) {
      toast.error('Please enter a press release');
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(`${apiUrl}/privot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: state.input,
          selectedLanguage: state.selectedLanguage,
        }),
      });
      
      const data = await response.json();
      setState(prev => ({ ...prev, output: data.output, isLoading: false }));
   
   } catch (error) {
      console.error("Error generating article:", error);
      setState(prev => ({ ...prev, isLoading: false, error: "Failed to generate article. Please try again." }));
      toast.error("Error generating article. Please check the console.");
   }
   


  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(state.output);
    toast.success('Copied to clipboard!');
  };

  if (!apiUrl) {
    return (
      <div className=" d-flex justify-content-center align-items-center p-4">
        <div className="card p-4 w-100" style={{ maxWidth: '600px' }}>
          <div className="text-center mb-4">
            <AlertCircle className="w-12 h-12 text-danger" />
          </div>
          <h1 className="h4 font-weight-bold text-center text-dark mb-4">API Key Missing</h1>
          <p className="text-dark text-center mb-4">
            Please add your OpenAI API key to the <code className="bg-light px-2 py-1 rounded">.env</code> file:
          </p>
          <div className="bg-light p-3 rounded mb-4">
            <code className="text-dark">VITE_OPENAI_API_KEY=your_api_key_here</code>
          </div>
          <p className="text-muted text-center">Restart the development server after adding the API key.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-dark text-white py-5 mb-5 position-relative">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
             
              <div>
                <h1 className="h3 font-weight-bold">The Federal PressPivot</h1>
                <p className="mt-2 text-lg text-light">
                  Transform press releases into compelling news articles
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center bg-white/10 rounded p-3">
              <Globe2 className="w-5 h-5 text-light" />
              <div className="text-sm">
                <span className="font-weight-bold">Available in:</span>
                <div className="d-flex gap-2 text-light">
                  <span>English</span>• <span>हिंदी</span>• <span>తెలుగు</span>• <span>ಕನ್ನಡ</span>• <span>தமிழ்</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid pb-5">
        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 font-weight-semibold text-dark">Input</h2>
                  <div className="d-flex gap-2">
                    <button
                      onClick={handleClearContent}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear All
                    </button>
                    <label className="btn btn-outline-primary btn-sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload .txt
                      <input
                        type="file"
                        accept=".txt"
                        className="d-none"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>
                <textarea
                  value={state.input}
                  onChange={(e) => setState(prev => ({ ...prev, input: e.target.value }))}
                  placeholder="Paste your press release here..."
                  className="form-control h-100"
                />
              </div>

              <div className="col-md-6 mb-4">

                  <div className="row mb-3">
                     <div className="col-md-2">
                     <h2 className="h5 font-weight-semibold text-dark">Output</h2>
                     </div>
                     <div className="col-md-6">
                     <LanguageSelector
                      selectedLanguage={state.selectedLanguage}
                      onLanguageChange={(language) => 
                        setState(prev => ({ ...prev, selectedLanguage: language }))
                      }
                    />
                     </div>
                     <div className="col-md-4">
                     <button
                      onClick={copyToClipboard}
                      disabled={!state.output}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <Clipboard className="w-4 h-4 mr-2" />
                      Copy
                    </button>
                     </div>
                  </div>

                <div className="position-relative">
                  <textarea
                    value={state.output}
                    readOnly
                    placeholder="Generated article will appear here..."
                    className="form-control h-100"
                    rows={10}
                  />
                  {state.isLoading && (
                    <div className="position-absolute top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75">
                      {/* <Loader2 className="w-8 h-8 animate-spin text-primary" /> */}
                      <Spinner animation="border" variant="primary" />
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    onClick={handleGenerate}
                    disabled={state.isLoading || !state.input}
                    className="btn btn-primary"
                  >
                    Generate Article
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={state.isLoading || !state.output}
                    className="btn btn-outline-secondary"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Regenerate
                  </button>
                </div>
                {state.output && <Disclosure />}
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <UsageInstructions />
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
