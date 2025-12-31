import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import {Download} from 'lucide-react';
import '../../css/Analyst.css';

const seoPrompts = [
  "Analyze the SEO performance of this article.",
  "Optimize the meta description for this content.",
  "Provide tips to improve readability for this piece.",
  "Suggest SEO friendly headlines for the story",
];

function SeoGuru() {
  const [messages, setMessages] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL; 

  const handlePromptClick = async (prompt) => {
    setSelectedPrompt(prompt);
    setMessages((prev) => [...prev, { role: "user", text: prompt }]);

    if (!urlInput) return;

    setMessages((prev) => [...prev, { role: "user", text: urlInput }]);
    setLoading(true);

    // Add temporary loader message
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: "⏳ Analyzing..." },
    ]);

    try {
      const res = await axios.post(`${apiUrl}/seo`, {
        url: urlInput,
        promptType: prompt,
      });

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", text: res.data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", text: "❌ Error: Failed to get a response." },
      ]);
    } finally {
      setLoading(false);
      setSelectedPrompt("");
      setUrlInput("");
    }
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
    <Container fluid className="py-4">
      <h3 className=" mb-4">SEO Assistant Chatbot</h3>

      {/* Chat Messages */}
<Card className="mb-3" style={{ height: "300px", overflowY: "auto" }}>
  <Card.Body>
    {messages.length === 0 && (
      <div className="text-muted"> SEO Chatbot</div>
    )}

    {messages.map((msg, idx) => (
      <div key={idx} className="mb-3">
        {/* Message bubble */}
        <div className={`d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
          <div
            className={`p-2 rounded ${msg.role === 'user' ? 'warningCard' : 'lightCard'}`}
            style={{ maxWidth: '75%', wordBreak: 'break-word' }}
          >
            {msg.text}
               {msg.role === 'assistant' &&
 msg.text &&
 !msg.text.includes('⏳') &&
 !msg.text.startsWith('❌') &&
 msg.text.length > 100 && ( 
  <div className="d-flex justify-content-end mt-1">
    <Button
      size="sm"
      className="btnColor"
      variant="outline-primary"
      onClick={() => downloadText(msg.text, `seo-analysis-${idx + 1}.txt`)}
    >
      <span className="me-2">{formatSize(msg.text)}</span>
      <span className="me-2"><Download size={15} /></span>
      Download
    </Button>
  </div>
)}
          </div>
          
        </div>

        {/* ✅ Show download ONLY if bot message has been rendered */}
    

      </div>
    ))}
  </Card.Body>
</Card>





      {/* Prompt Buttons */}
      <Row className="mb-3">
        {seoPrompts.map((prompt, i) => (
          <Col key={i} xs={12} md={6} lg={3} className="mb-2">
            <Button
              className="w-100 submitBtn"
              variant="secondary"
              onClick={() => handlePromptClick(prompt)}
              disabled={loading || !urlInput}
            >
              {prompt}
            </Button>
          </Col>
        ))}
      </Row>

      {/* URL Input */}
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="url"
            placeholder="Paste article URL and click a prompt"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            disabled={loading}
            required
          />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default SeoGuru;