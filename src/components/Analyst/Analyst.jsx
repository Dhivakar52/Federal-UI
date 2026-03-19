import React, { useState, useRef } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col, Overlay, Tooltip } from 'react-bootstrap';
import {Download} from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import '../../css/Analyst.css';


const languages = [
  'Tamil','English','Hindi','Telugu','Kannada',
  'Malayalam','Bengali','Marathi','Gujarati'
];

function Analyst() {
  const [url, setUrl] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [language, setLanguage] = useState("English");

  const inputRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShowTooltip(false);

    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    if (!url.trim() || !urlPattern.test(url)) {
      setShowTooltip(true);
      return;
    }

    setLoading(true);
    setMessages((prev) => [...prev, { type: 'user', text: url }]);

    try {

 const payload = {
  url,
  language, 
};

      const response = await axios.post(`${apiUrl}/analyst`, payload);

      console.log("PAYLOAD:", payload);


      if (response.data.error) {
        setError(response.data.error);
      } else {
        setMessages((prev) => [...prev, { type: 'bot', text: response.data.response }]);
      }
    } catch (err) {
      setError('Backend error. Please check if the server is running.');
    }

    setLoading(false);
    setUrl('');
  };

  const downloadText = (text, filename) => {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};
const formatSize = (text) => {
  const bytes = new Blob([text]).size;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};



  return (
    <Container fluid>
      <h3 className="mb-2">News Analyst</h3>
      <p className="text-muted mb-4">
        Enter a news article URL to get an analysis using the User Needs 2.0 framework.
      </p>

      <Form onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Col sm={8} style={{ position: 'relative' }}>
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder="Enter a news article URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              isInvalid={showTooltip}
            />
            <Overlay target={inputRef.current} show={showTooltip} placement="right">
              {(props) => (
                <Tooltip id="url-tooltip" {...props}>
                  Please enter a valid URL starting with http or https
                </Tooltip>
              )}
            </Overlay>
          </Col>
          <Col sm={2}>
    <Form.Select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      disabled={loading}
    >
      {languages.map((lang, idx) => (
        <option key={idx} value={lang}>
          {lang}
        </option>
      ))}
    </Form.Select>
  </Col>
          <Col sm={2}>
            <Button
              className='btnColor'
              variant="primary"
              type="submit"
              disabled={loading || !url.trim()}
              style={{ width: '100%' }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      <Card className="mb-4">
        <Card.Body style={{ overflowY: 'auto', maxHeight: '400px', minHeight: '300px' }}>
          <AnimatePresence initial={false}>
           {messages.map((msg, idx) => (
  <motion.div
    key={idx}
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className={`mb-3 d-flex ${msg.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
  >
    <Card
      text="dark"
      className={msg.type === 'user' ? 'warningCard' : 'lightCard'}
      style={{ maxWidth: '80%' }}
    >
      <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Card.Text>

    
      {msg.type === 'bot' && (
  <div className="mt-2 text-end">
    <Button
      size="sm"
       className="btnColor"
      variant="outline-primary"
      onClick={() => downloadText(msg.text, `seo-analysis-${idx + 1}.txt`)}
    >
       <span className='me-2'>{formatSize(msg.text)} </span> <span className='me-2'><Download size={15}/></span>    Download
    </Button>
  </div>
)}

    </Card>
  </motion.div>
))}


            {loading && (
              <motion.div
                key="typing"
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="d-flex justify-content-start mb-3"
              >
                <Card  text="dark" className="lightCardDots">
                  <div className="typing-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Container>
  );
}

export default Analyst;
