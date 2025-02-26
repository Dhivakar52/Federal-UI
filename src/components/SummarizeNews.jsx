import React, { useState } from 'react';
import { Card, Button, Form, Spinner } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TrendingBtn } from './TrendingBtn';
import '../css/Summarize.css'






const languages = [
  'Tamil',
  'English',
  'Hindi',
  'Telugu',
  'Kannada',
  'Malayalam',
  'Bengali',
  'Marathi',
  'Gujarati'
];



const SummarizeNews = () => {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('Tamil');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setTitle('');
        setSummary('');
    try {
      setLoading(true);
      setSummary('');
      
      const apiUrl = import.meta.env.VITE_API_URL;
    
      const response = await fetch(`${apiUrl}/summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, language }),
      });

      const data = await response.json();
      console.log(data)
      const {title, summary }=data; 
   
      setSummary(summary);
      setTitle(title);

    } catch (error) {
      setSummary('Error fetching summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <div className="trendingTitle">
            <h1>Multilingual News Summarizer</h1>
            <p>Enter a News Site URL and select a language to generate a 200-word summary.</p>
          </div>
        </Col>
      </Row>
          <Row>
              <Col xs={12} md={12}>
                    <Form onSubmit={handleSubmit} className="mt-4">
                  <Row>
                       <Col xs={12} md={6}>
          <div className='summaryBox'>
            <div className="mb-3">
              <Form.Label className="text-sm font-medium">News Article URL</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter news article URL here..."
              />
            </div>
            <div className="mb-3">
              <Form.Label className="text-sm font-medium">Select Language</Form.Label>
              <Form.Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
                          </Form.Select>                   
                      </div>

                  </div>
                  <div>
                        <TrendingBtn submitBtnName="Submit" clearBtnName="Clear"/> 
                  </div>
        </Col>
        <Col xs={12} md={6}>
          <div>
                      <div className="">
                          <div className='summaryBox'>
                          <Form.Group>
  <Form.Label className="text-sm font-medium">Output</Form.Label>
  <div style={{ position: 'relative' }}>
    <Form.Control
      as="textarea"
      rows={10}
      value={title ? `Title: ${title}\n\nSummary (${language}) :\n\n${summary}` : summary}
      readOnly
      placeholder="Summary will appear here..."
      style={{ position: 'relative', zIndex: 1 }}
    />
    {loading && (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <Spinner animation="border" />
      </div>
    )}
  </div>
</Form.Group>
                          </div>      
             
            </div>
          </div>
        </Col>
                      </Row>
                      </Form>
              </Col>

       
      </Row>
    </Container>
  );
};

export default SummarizeNews;