import React from 'react';
import { FileText, Wand2, Languages, RotateCcw, ClipboardCheck } from 'lucide-react';

export function UsageInstructions() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-light p-4">
      <h2 className="h4 font-weight-semibold text-dark mb-3">How to Use</h2>
      <div className="space-y-3">
        <div className="d-flex align-items-start gap-3">
          <div className="flex-shrink-0">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="h5 font-weight-medium text-dark">1. Press Release Input</h3>
            <p className="text-muted">Paste your press release text directly into the input field or upload a .txt file</p>
          </div>
        </div>

        <div className="d-flex align-items-start gap-3">
          <div className="flex-shrink-0">
            <Wand2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="h5 font-weight-medium text-dark">2. Generate Article</h3>
            <p className="text-muted">Click "Generate" to transform your press release into a news story in The Federal's style</p>
          </div>
        </div>

        <div className="d-flex align-items-start gap-3">
          <div className="flex-shrink-0">
            <Languages className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="h5 font-weight-medium text-dark">3. Choose Language</h3>
            <p className="text-muted">Select your desired output language (English, Hindi, Telugu, Kannada, or Tamil)</p>
          </div>
        </div>

        <div className="d-flex align-items-start gap-3">
          <div className="flex-shrink-0">
            <RotateCcw className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="h5 font-weight-medium text-dark">4. Regenerate if Needed</h3>
            <p className="text-muted">Not satisfied? Click "Regenerate" to get a fresh version of the article</p>
          </div>
        </div>

        <div className="d-flex align-items-start gap-3">
          <div className="flex-shrink-0">
            <ClipboardCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="h5 font-weight-medium text-dark">5. Finalize & Copy</h3>
            <p className="text-muted">Review the generated article and use the copy button to save it to your clipboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}
