import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

import axios from 'axios';

const languages = ["English", "Kannada", "Telugu", "Hindi", "Tamil", "Malayalam"];

function TranslateStory() {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loadingTimer, setLoadingTimer] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleTranslate = async () => {
    if (!url) {
      setError("Please enter a URL.");
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');
    setLoadingTimer(0);

    const interval = setInterval(() => {
      setLoadingTimer((prev) => +(Number(prev) + 0.1).toFixed(1));
    }, 100);

    try {
      const startTime = performance.now();

      const res = await axios.post(`${apiUrl}/translate`, {
        url,
        targetLanguage: language,
      });

      const endTime = performance.now();
      const totalTime = ((endTime - startTime) / 1000).toFixed(1);

      // Use the full translated result
      setOutput(
        `Title:\n${res.data.title}\n\n📄 Summary:\n${res.data.description}\n\n📝 Article:\n${res.data.text}`
      );

      setLoadingTimer(totalTime);
    } catch (err) {
      console.error(err);
      setError('Failed to translate article.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };
const handleDownloadDocx = async () => {
  const title = output.split("📄 Summary:")[0]?.replace(" Title:", "").trim();
  const summary = output.split("📄 Summary:")[1]?.split("Article:")[0]?.trim();
  const article = output.split("📝 Article:")[1]?.trim();
   const fontSize = 28;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: " Title: ", bold: true, size: fontSize }),
              new TextRun(title),
            ],
          }),
          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({ text: "Summary: ", bold: true, size: fontSize }),
              new TextRun(summary),
            ],
          }),
          new Paragraph(""),

          new Paragraph({
            children: [new TextRun({ text: "Article:", bold: true, size: fontSize })],
          }),
          ...article
            .split("\n")
            .map((line) => new Paragraph(line.trim()))
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${title}.docx`);
};



  const cardHeight = output ? { height: "100%" } : { height: '250px' };

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col>
          <h2> Multilingual Article Translator</h2>
        </Col>
      </Row>

      <Row>
        <Col lg={6} md={8} sm={12}>
          <Form className="mt-4">
            <Form.Group>
              <Form.Label>📰 Article URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter article URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>🌐 Translate to</Form.Label>
              <Form.Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button className="mt-3 btnColor" onClick={handleTranslate}>
              Translate
            </Button>

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Form>
        </Col>

        <Col lg={6} md={4} sm={12}>
          <Card className="mt-4 p-3" style={cardHeight}>
            <Card.Title>
              <h4 className="text-muted">Output</h4>
            </Card.Title>

            {loading && (
              <div className="text-center">
                <Spinner animation="border" />
                <div className="mt-2">Processing... {loadingTimer} s</div>
              </div>
            )}

            {output && !loading && (
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={15}
                  value={output}
                  readOnly
                  style={{ whiteSpace: 'pre-wrap' }}
                />
                <Button variant="success" className="mt-3" onClick={handleDownloadDocx}>
                  ⬇️ Download
                </Button>
                <div className="text-muted mt-2">
                  Processed in {loadingTimer} seconds
                </div>
              </Form.Group>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TranslateStory;
