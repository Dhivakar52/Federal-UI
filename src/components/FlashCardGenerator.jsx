import React, { useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { File } from "lucide-react";
import '../css/FlashCard.css';
import { TrendingBtn } from './TrendingBtn';

const FlashCardGenerator = () => {
  const [url, setUrl] = useState('');
  const [flashcards, setFlashcards] = useState('');
  const [cardTitle, setCardTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingTimer, setLoadingTimer]= useState(0);







  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlashcards('');
    setCardTitle('');
    if (!url) return alert("Please enter a URL.");
    setLoading(true);
  
    setLoadingTimer(0); // Reset the timer
    const interval = setInterval(() => {
      setLoadingTimer((prev) => (Number(prev) + 0.1).toFixed(1));
    }, 100);
  
    try {
      const startTime = performance.now(); // Record start time
    //  console.log(process.env.REACT_APP_FRONT_PORT_URL);
    const apiUrl = import.meta.env.VITE_API_URL;
      const response  = await fetch( apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
  
      const data = await response.json();
  
      const endTime = performance.now(); // Record end time
      const totalLoadingTime = ((endTime - startTime) / 1000).toFixed(1); // Convert to seconds
  
      const { title, flashcards } = data;
      console.log('Data:', data);
  
      setCardTitle(title);
      setFlashcards(flashcards);
      setLoadingTimer(totalLoadingTime); // Update timer to the total loading time
    } catch (error) {
      console.error("Error generating flashcards:", error);
    } finally {
      clearInterval(interval); // Stop the timer interval
      setLoading(false); // End loading state
    }
  };
  

  const handleDownload = () => {
    if (!flashcards) return alert("No flashcards to download!");
    const fileContent = `Title: ${cardTitle}\n\nFlashcards:\n${flashcards}`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `Flashcards_${cardTitle || 'Generated'}.txt`;

    // Trigger the download
    link.click();

    // Release the URL object
    URL.revokeObjectURL(url);
  };

  const calculateFileSize = () => {
    if (!flashcards) return "0 KB";
    const fileContent = `Title: ${cardTitle}\n\nFlashcards:\n${flashcards}`;
    const sizeInBytes = new Blob([fileContent]).size;
    return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  };







  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <div className="trendingTitle">
            <h1>The Federal Flash Card Generator</h1>
            <p>An application that helps students prepare for competitive exams like the UPSC, SSC, CLAT, MBA, etc. Enter a News Site URL to generate flashcards for exam preparation. Option to download the response as a text file.</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Form onSubmit={handleSubmit} className="mt-4">
            <Row>
              <Col xs={12} md={6}>
                <div className="summaryBox">
                  <div className="mb-3">
                    <Form.Label className="text-sm font-medium">URL</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter news article URL here..."
                    />
                  </div>
                </div>
                <div>
                  <TrendingBtn  submitBtnName="Submit" clearBtnName="Clear" />
                </div>
              </Col>










              
              <Col xs={12} md={6}>
                <div style={{ position: 'relative' }}>
                  <Form.Label className="text-sm font-medium">OUTPUT</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={7}
                    value={flashcards ? `Title: ${cardTitle}\n\n${flashcards}` : "Flashcard content will appear here..."}
                    readOnly
                    placeholder="Generated flashcards will appear here..."
                    style={{ position: 'relative', zIndex: 1 }}
                  />
                  {loading && (
                    <>
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
                      <div
                      style={{
                        position: 'absolute',
                        bottom: '0%',
                        right: '5%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2,
                        pointerEvents: 'none',
                      }}
                      >
                      Processing | {loadingTimer} ms
                      </div>
                      </>
                  )}
                </div>
                <div className='download mt-3' style={{ position: 'relative' }}>
                  <div className='downloadBorder'>
                  <div className='d-flex align-items-center justify-content-between'>
                          <div className='d-flex align-items-center'>
                            <File className='me-2' size={14} />
                            <p className='mb-0'>Download Flash-Card</p>
                          </div>
                        </div>

                       
                          
                        </div>

                        {loading && (
                    <>
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
                      <div
                      style={{
                        position: 'absolute',
                        bottom: '0%',
                        right: '5%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2,
                        pointerEvents: 'none',
                      }}
                      >
                      Processing | {loadingTimer} ms
                      </div>
                      </>
                  )}


              <div className='h-100'>
              {flashcards ? (
                      <>
                        <div className='d-flex align-items-center justify-content-between flashTxt'>
                          <div className='d-flex align-items-center '>
                            <p className='mb-0 ps-2'>flashcards.txt</p>
                          </div>
                          <p
                            className='text-primary text-sm cursor-pointer mb-0 pe-2 fileSize'
                            onClick={handleDownload}
                            title='Download flashcards'
                         
                          >
                            {calculateFileSize()} <span> ⇣</span>
                          </p>
                        </div>
                      </>
                    ) : (
                      <> {
                      !loading && 
                        <div className='fileIcon'>
                          <File />
                        </div>
                          }
                        </>
                      )}
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

export default FlashCardGenerator;
