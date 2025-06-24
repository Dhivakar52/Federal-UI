import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Form, Container, ListGroup, Spinner } from 'react-bootstrap';

function PeerNews() {
  const [selectedSource, setSelectedSource] = useState('');
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);

  const newsSources = [
    "ABP News", "BBC India", "Business Line", "Deccan Chronicle", "Gujarati- Gujarat Samachar",
    "Hindustan Times", "India Today", "Indian Express", "Live Mint", "Money Control", 
    "Manorama - English", "NDTV", "News 18", "Telangana Today", "The Federal", "The Federal Andhra",
    "The Federal Desh", "The Federal Karnataka", "The Federal Telangana", "The Hindu", "Times of India"
  ];

  const fetchNews = async (source) => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/peer/${source}`);
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
      <h1 className="my-4">Latest LIVE News from Peer Sites</h1>
      <p>Select a news source from the dropdown to view its latest headlines with clickable links.</p>

      <Row className="mb-4">
        <Col sm={12} md={12} xl={6}  className="mb-4">
          <Form.Select
            onChange={(e) => setSelectedSource(e.target.value)}
            value={selectedSource}
            aria-label="Select News Source"
          >
            <option value="">Select News Source</option>
            {newsSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col sm={12} md={12} xl={6}>
        <div className='border p-2'>
        {loading ? (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status" />
    </div>
  ) : (
    <div>
      {headlines.length > 0 ? (
        <ul style={{listStyle:'none'}}>
          {headlines.map((headline, index) => (
            <li key={index} className='py-2'>
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

export default PeerNews;
