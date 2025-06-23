import React, { useState } from 'react';
import { Newspaper, Loader2, HelpCircle, Youtube, FileText, AlignLeft, RefreshCw, Copy, Check } from 'lucide-react';
import { generateNewsStory } from './ApiScript.js';
import toast, { Toaster } from 'react-hot-toast';

const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali', 'Marathi', 'Gujarati'];

function YouTubeScript() {
  const [videoContent, setVideoContent] = useState({
    youtubeUrl: '',
    title: '',
    description: '',
    transcript: ''
  });
  const [language, setLanguage] = useState('English');
  const [newsStory, setNewsStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [copyingStates, setCopyingStates] = useState({
    headline: false,
    body: false,
    hashtags: false,
    all: false
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/generate-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...videoContent, language }),
      });
      
      const story = await response.json();
      console.log(story)
      setNewsStory(story);
      toast.success('News story generated successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to generate news story. Please try again.';
      toast.error(errorMessage);
      console.error('Error generating news story:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setVideoContent({
      youtubeUrl: '',
      title: '',
      description: '',
      transcript: ''
    });
    setNewsStory(null);
    toast.success('Form cleared successfully!');
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyingStates(prev => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopyingStates(prev => ({ ...prev, [type]: false }));
      }, 2000);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const copyAllContent = async () => {
    if (!newsStory) return;

    const fullContent = `
Headline:
${newsStory.headline}

Story:
${newsStory.body}

Hashtags:
${newsStory.hashtags.join(' ')}

Source:
${videoContent.youtubeUrl}
    `.trim();

    try {
      await navigator.clipboard.writeText(fullContent);
      setCopyingStates(prev => ({ ...prev, all: true }));
      setTimeout(() => {
        setCopyingStates(prev => ({ ...prev, all: false }));
      }, 2000);
      toast.success('All content copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy content');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {/* Header */}
          <div className="position-relative mb-5 bg-primary text-white rounded p-4">
            <div className="text-center">
              <Newspaper className="mb-3" size={48} />
              <h1 className="display-5 fw-bold">The Federal TubeScribe</h1>
              <p className="lead">
                Transform YouTube content into professional news stories in multiple Indian languages
              </p>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0">Enter Video Content</h2>
                <div className="d-flex gap-3">
                  <button onClick={handleReset} className="btn btn-outline-secondary btn-sm">
                    <RefreshCw size={16} className="me-1" />
                    Clear Form
                  </button>
                  <button onClick={() => setShowInstructions(!showInstructions)} className="btn btn-outline-primary btn-sm">
                    <HelpCircle size={16} className="me-1" />
                    How to copy content
                  </button>
                </div>
              </div>

              {showInstructions && (
                <div className="alert alert-info mb-4">
                  <h3 className="h5">How to Copy YouTube Content</h3>
                  <div className="mt-3">
                    <h4 className="h6">1. YouTube URL</h4>
                    <ul className="small">
                      <li>Copy the URL from your browser's address bar</li>
                      <li>Make sure it's a valid YouTube video URL</li>
                    </ul>

                    <h4 className="h6 mt-3">2. Copying the Title</h4>
                    <ul className="small">
                      <li>Open the YouTube video</li>
                      <li>Select the title text at the top of the page</li>
                      <li>Right-click and select "Copy" or use Ctrl+C/Command+C</li>
                    </ul>

                    <h4 className="h6 mt-3">3. Copying the Description</h4>
                    <ul className="small">
                      <li>Click "Show More" below the video to expand the description</li>
                      <li>Select all description text</li>
                      <li>Right-click and select "Copy" or use Ctrl+C/Command+C</li>
                    </ul>

                    <h4 className="h6 mt-3">4. Copying the Transcript</h4>
                    <ul className="small">
                      <li>Click the three dots (⋮) below the video</li>
                      <li>Select "Open transcript"</li>
                      <li>Optional: Click "Toggle timestamps" to remove them</li>
                      <li>Select all transcript text (Ctrl+A/Command+A)</li>
                      <li>Right-click and select "Copy" or use Ctrl+C/Command+C</li>
                    </ul>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="language" className="form-label">
                    Output Language
                  </label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="form-select"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="youtubeUrl" className="form-label d-flex align-items-center">
                    <Youtube size={16} className="text-danger me-2" />
                    YouTube URL
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">1.</span>
                    <input
                      type="url"
                      id="youtubeUrl"
                      value={videoContent.youtubeUrl}
                      onChange={(e) => setVideoContent(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                      className="form-control"
                      placeholder="Paste the YouTube video URL here..."
                      pattern="^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+|https?:\/\/youtu\.be\/[\w-]+"
                      title="Please enter a valid YouTube URL"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label d-flex align-items-center">
                    <Youtube size={16} className="text-danger me-2" />
                    Video Title
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">2.</span>
                    <input
                      type="text"
                      id="title"
                      value={videoContent.title}
                      onChange={(e) => setVideoContent(prev => ({ ...prev, title: e.target.value }))}
                      className="form-control"
                      placeholder="Paste the video title here..."
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label d-flex align-items-center">
                    <FileText size={16} className="text-primary me-2" />
                    Video Description
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">3.</span>
                    <textarea
                      id="description"
                      value={videoContent.description}
                      onChange={(e) => setVideoContent(prev => ({ ...prev, description: e.target.value }))}
                      className="form-control"
                      rows={3}
                      placeholder="Paste the video description here..."
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="transcript" className="form-label d-flex align-items-center">
                    <AlignLeft size={16} className="text-success me-2" />
                    Video Transcript
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">4.</span>
                    <textarea
                      id="transcript"
                      value={videoContent.transcript}
                      onChange={(e) => setVideoContent(prev => ({ ...prev, transcript: e.target.value }))}
                      className="form-control"
                      rows={6}
                      placeholder="Paste the video transcript here..."
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="spinner-border spinner-border-sm me-2" />
                      Generating...
                    </>
                  ) : (
                    'Generate News Story'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Generated News Story */}
          {newsStory && (
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <h2 className="h3">{newsStory.headline}</h2>
                  <button
                    onClick={() => copyToClipboard(newsStory.headline, 'headline')}
                    className="btn btn-outline-secondary btn-sm"
                    title="Copy headline"
                  >
                    {copyingStates.headline ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="position-relative mb-4">
                  {newsStory.body.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <button
                    onClick={() => copyToClipboard(newsStory.body, 'body')}
                    className="position-absolute top-0 end-0 btn btn-outline-secondary btn-sm"
                    title="Copy story"
                  >
                    {copyingStates.body ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="mb-4">
                  {newsStory.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="badge bg-primary me-2"
                    >
                      {tag.startsWith('#') ? tag : '#' + tag}
                    </span>
                  ))}
                  <button
                    onClick={() => copyToClipboard(newsStory.hashtags.join(' '), 'hashtags')}
                    className="btn btn-outline-secondary btn-sm ms-2"
                    title="Copy hashtags"
                  >
                    {copyingStates.hashtags ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center">
                  <a 
                    href={videoContent.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-decoration-none"
                  >
                    View source video
                  </a>
                  <button
                    onClick={copyAllContent}
                    className="btn btn-outline-primary"
                  >
                    {copyingStates.all ? (
                      <>
                        <Check size={16} className="me-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="me-2" />
                        Copy all content
                      </>
                    )}
                  </button>
                </div>

                <div className="alert alert-secondary mt-4 fst-italic small">
                  This article has been generated using a custom AI model that has been trained with data from multiple Indian news sites. While the AI assists in structuring and drafting the report an editorial team needs to still carefully review, edit, and verify the information to ensure accuracy, fairness, and adherence to journalistic standards.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default YouTubeScript;