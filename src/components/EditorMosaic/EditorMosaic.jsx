import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Form, Container, Spinner } from 'react-bootstrap';
 
function EditorMosaic() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
 
  // 🗂️ State-wise grouped news sources
const newsSourcesByState = {
    "English": ["The Hindu", "Hindustan Times", "Economic Times", "Indian Express",
      "Business Standard", "Business Line", "Hans India",
      "Kashmirlife"
    ],
    "Hindi": ["Live Hindustan"],
    "Malayalam": ["Mathrubhumi"]
  };
 
  const fetchNews = async (source) => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/editorial/${source}`);
      setHeadlines(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
      setHeadlines([]);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    if (selectedSource) {
      fetchNews(selectedSource);
    }
  }, [selectedSource]);
 
  return (
    <Container fluid>
      <h1 className="my-4">Latest LIVE News from Peer Sites Editorial Mosaic</h1>
      <p>Select a Language first, then choose a news source to view headlines.</p>
 
      <Row className="mb-4">
        {/* State Dropdown */}
        <Col sm={12} md={6} className="mb-3">
          <Form.Select
            onChange={(e) => {
              const state = e.target.value;
              setSelectedState(state);
              setSelectedSource('');
              setHeadlines([]);
            }}
            value={selectedState}
            aria-label="Select Language"
          >
            <option value="">Select Language</option>
            {Object.keys(newsSourcesByState).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Form.Select>
        </Col>
 
        {/* News Source Dropdown */}
        <Col sm={12} md={6} className="mb-3">
          <Form.Select
            onChange={(e) => setSelectedSource(e.target.value)}
            value={selectedSource}
            aria-label="Select News Source"
            disabled={!selectedState}
          >
            <option value="">Select News Source</option>
            {selectedState &&
              newsSourcesByState[selectedState].map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
          </Form.Select>
        </Col>
      </Row>
 
      {/* News Display */}
      <Row>
        <Col>
          <div className="border p-3">
            {loading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status" />
              </div>
            ) : (
              <div>
                {headlines.length > 0 ? (
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {headlines.map((headline, index) => (
                      <li key={index} className="py-2">
                        <a href={headline.link} target="_blank" rel="noopener noreferrer">
                          {headline.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No news available.</p>
                )}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
 
export default EditorMosaic;
