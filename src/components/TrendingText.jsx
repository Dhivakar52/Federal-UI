import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Spinner } from 'react-bootstrap'; // Import Spinner component
import '../css/Trending.css';

function TrendingText({ topics = [], loading }) {
  return (
    <Card className="p-3 trendingBox border-0">
      <Form.Label htmlFor="trending_now" className='form_label_title'>Trending Now</Form.Label>
      
      <div className='trendingBox' style={{ position: 'relative' }}>
        {/* The loading animation (Spinner) */}
        {loading && (
          <div className="spinner-container mt-3" style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {/* Displaying first item as title and others in list (ul/li) */}
        <div className="title">
          {/* {loading ? (
            <h5></h5>
          ) : topics.length > 0 ? (
            <h5>{topics[0]}</h5>  // Display the first item as the title
          ) : (
            <h5>No trending topics available.</h5>
          )} */}
          <h5>Daily Search Trends</h5>
        </div>

        <ul id="trending_now" className="list-unstyled mt-3">
          {loading ? (
           <p className='pb-4'></p>
          ) : topics.length > 0 ? (
            topics.slice(1).map((topic, index) => (  // Slice to skip the first item
              <li key={index}>{topic}</li>
            ))
          ) : (
            <li>No trending topics available.</li>
          )}
        </ul>
      </div>
    </Card>
  );
}

export default TrendingText;
