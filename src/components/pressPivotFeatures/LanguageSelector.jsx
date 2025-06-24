import React from 'react';

const languages = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'telugu', label: 'Telugu' },
  { value: 'kannada', label: 'Kannada' },
  { value: 'tamil', label: 'Tamil' },
];

export function LanguageSelector({ selectedLanguage, onLanguageChange }) {
  return (
    <div className="row">

           <div className="col-md-6">
           <label htmlFor="language" className="form-label fw-medium text-secondary">
        Output Language:
      </label>
           </div>
           <div className="col-md-6">
           <select
        id="language"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="form-select"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
           </div>  
    </div>
  );
}
