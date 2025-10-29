import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Form, Button, Alert, Badge, Spinner
} from 'react-bootstrap';
import {
  Newspaper, Loader2, HelpCircle, Youtube, FileText,
  AlignLeft, RefreshCw, Copy, Check
} from 'lucide-react';
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

  const [downloadUrl, setDownloadUrl] = useState(null);
  const [fileSize, setFileSize] = useState(0);
 

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/generate-news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...videoContent, language })
      });

      const story = await response.json();
      setNewsStory(story);
      toast.success('News story generated successfully!');

      const content = `Headline:\n${story.headline}\n\nStory:\n${story.body}\n\nHashtags:\n${story.hashtags.join(' ')}\n\nSource:\n${videoContent.youtubeUrl}`.trim();
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setFileSize(blob.size);

    } catch (error) {
      toast.error('Failed to generate news story.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setVideoContent({ youtubeUrl: '', title: '', description: '', transcript: '' });
    setNewsStory(null);
    setDownloadUrl(null);
    toast.success('Form cleared!');
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyingStates((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => setCopyingStates((prev) => ({ ...prev, [type]: false })), 2000);
      toast.success('Copied!');
    } catch {
      toast.error('Copy failed.');
    }
  };

  const copyAllContent = async () => {
    if (!newsStory) return;
    const fullContent = `Headline:\n${newsStory.headline}\n\nStory:\n${newsStory.body}\n\nHashtags:\n${newsStory.hashtags.join(' ')}\n\nSource:\n${videoContent.youtubeUrl}`.trim();
    await copyToClipboard(fullContent, 'all');
  };

  return (
    <Container fluid className="py-4">
      <Toaster position="top-right" />
      <Row>
         <Col>
            <h2 className="mb-2">The Federal TubeScribe</h2>
            <p className="mb-4"> Transform YouTube content into professional news stories in multiple Indian languages</p>
         </Col>
      </Row>

      {/* <Card className="bg-primary text-white text-center mb-4">
        <Card.Body>
          <Newspaper size={48} className="mb-2" />
          <Card.Title as="h1"></Card.Title>
          <Card.Text>
           
          </Card.Text>
        </Card.Body>
      </Card> */}

            <Row>
                <Col lg={6} md={8} sm={12}>
                 <Card className="mb-4">
        <Card.Body>
          <Row className="mb-4">
            <Col><h4>Enter Video Content</h4></Col>
            <Col className="text-end">
              <Button variant="outline-secondary" size="sm" onClick={handleReset}><RefreshCw size={16} className="me-2" />Clear</Button>{' '}
              <Button variant="outline-primary" size="sm" onClick={() => setShowInstructions(!showInstructions)}><HelpCircle size={16} className="me-2" />Help</Button>
            </Col>
          </Row>

          {showInstructions && (
            <Alert variant="info">
              <strong>How to copy YouTube content:</strong> Paste video URL, title, description and transcript.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Output Language</Form.Label>
              <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                {LANGUAGES.map((lang) => <option key={lang}>{lang}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Youtube size={16} className="text-danger me-2" />YouTube URL</Form.Label>
              <Form.Control required type="url" placeholder="Paste YouTube URL" value={videoContent.youtubeUrl} onChange={(e) => setVideoContent(prev => ({ ...prev, youtubeUrl: e.target.value }))} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Youtube size={16} className="text-danger me-2" />Video Title</Form.Label>
              <Form.Control required type="text" placeholder="Paste title" value={videoContent.title} onChange={(e) => setVideoContent(prev => ({ ...prev, title: e.target.value }))} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FileText size={16} className="text-primary me-2" />Description</Form.Label>
              <Form.Control required as="textarea" rows={3} placeholder="Paste description" value={videoContent.description} onChange={(e) => setVideoContent(prev => ({ ...prev, description: e.target.value }))} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label><AlignLeft size={16} className="text-success me-2" />Transcript</Form.Label>
              <Form.Control required as="textarea" rows={6} placeholder="Paste transcript" value={videoContent.transcript} onChange={(e) => setVideoContent(prev => ({ ...prev, transcript: e.target.value }))} />
            </Form.Group>

            <Button  type="submit" variant="primary" className="w-100 btnColor" disabled={loading}>
              {loading ? <><Spinner animation="border" size="sm" className="me-2" />Generating...</> : 'Generate News Story'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
                </Col>
                 <Col lg={6} md={4} sm={12}>

                 
                  {newsStory && (
        <Card>
          <Card.Body>
            <Row className="mb-4 align-items-start">
              <Col><h3>{newsStory.headline}</h3></Col>
              <Col xs="auto">
                <Button variant="outline-secondary" size="sm" onClick={() => copyToClipboard(newsStory.headline, 'headline')}>
                  {copyingStates.headline ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </Col>
            </Row>

            <div className="position-relative mb-4 " style={{ maxHeight: '258px',overflowY:'scroll',height:'100%' }}>
              {newsStory.body.split('\n').map((p, i) => <p key={i}>{p}</p>)}
              <Button variant="outline-secondary" size="sm" className="position-absolute top-0 end-0" onClick={() => copyToClipboard(newsStory.body, 'body')}>
                {copyingStates.body ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>

            <div className="mb-4">
              {newsStory.hashtags.map((tag, i) => (
                <Badge bg="primary" className="me-2" key={i}>{tag.startsWith('#') ? tag : `#${tag}`}</Badge>
              ))}
              <Button variant="outline-secondary" size="sm" className="ms-2" onClick={() => copyToClipboard(newsStory.hashtags.join(' '), 'hashtags')}>
                {copyingStates.hashtags ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>

            <hr />
            <Row className="align-items-center">
              <Col>
                <a href={videoContent.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  View source video
                </a>
              </Col>
              <Col xs="auto">
                <Button variant="outline-primary" onClick={copyAllContent}>
                  {copyingStates.all ? <><Check size={16} className="me-2" />Copied!</> : <><Copy size={16} className="me-2" />Copy all</>}
                </Button>
              </Col>
            </Row>

            {downloadUrl && (
              <div className="mt-4">
                <a href={downloadUrl} download= {newsStory.headline} className="btn btn-outline-dark btn-sm">
                  📄 Download News Story
                </a>
                <div className="mt-2 text-muted">
                 {newsStory.headline} • {(fileSize / 1024).toFixed(2)} KB
                </div>
              </div>
            )}

            <Alert variant="secondary" className="mt-4 fst-italic small">
              This article was generated using a custom AI model and must be reviewed by a human editor before publishing.
            </Alert>
          </Card.Body>
        </Card>
      )}
                </Col>
            </Row>


     

     
    </Container>
  );
}

export default YouTubeScript;
