// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Spinner, Alert, Card } from 'react-bootstrap';
// import axios from 'axios';

// const languages = ["English", "Kannada", "Telugu", "Hindi", "Tamil", "Malayalam"];

// function TranslateStory() {
//   const [url, setUrl] = useState('');
//   const [language, setLanguage] = useState('Kannada');
//   const [loading, setLoading] = useState(false);
//   const [output, setOutput] = useState('');
//   const [error, setError] = useState('');
//   const [loadingTimer, setLoadingTimer] = useState(0);
//   const apiUrl = import.meta.env.VITE_API_URL;

//   const handleTranslate = async () => {
//     if (!url) {
//       setError("Please enter a URL.");
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setOutput('');
//     setLoadingTimer(0);

//     const interval = setInterval(() => {
//       setLoadingTimer((prev) => +(Number(prev) + 0.1).toFixed(1));
//     }, 100);

//     try {
//       const startTime = performance.now();

//       const res = await axios.post(`${apiUrl}/translate`, { url, language });

//       const endTime = performance.now();
//       const totalTime = ((endTime - startTime) / 1000).toFixed(1);
//       setOutput(res.data.translated);
//       setLoadingTimer(totalTime);
//     } catch (err) {
//       setError('Failed to translate article.');
//     } finally {
//       clearInterval(interval);
//       setLoading(false);
//     }
//   };

//   const handleDownload = () => {
//     const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
//     const filename = `Article_Translated_to_${language}.txt`;
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = filename;
//     link.click();
//     URL.revokeObjectURL(link.href);
//   };



//  const cardHeight= output ? {height:"100%"} : {height : '250px'} 







//   return (
//     <Container fluid className="mt-5">
//       <Row>
//         <Col>
//           <h2>🌍 Multilingual Article Translator</h2>
//         </Col>
//       </Row>

//       <Row>
//         <Col lg={6} md={8} sm={12}>
//           <Form className="mt-4">
//             <Form.Group>
//               <Form.Label>Article URL</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter article URL"
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Select a Translate Language</Form.Label>
//               <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
//                 {languages.map((lang) => <option key={lang}>{lang}</option>)}
//               </Form.Select>
//             </Form.Group>

//             <Button className="mt-3 btnColor" onClick={handleTranslate} >
//             Translate
//             </Button>

//             {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
//           </Form>
//         </Col>

//         <Col lg={6} md={4} sm={12}>
//           <Card className="mt-4 p-3" style={cardHeight}>
//              <Card.Title>
//                <h4 className='text-muted'>Output</h4>
//              </Card.Title>
//             {loading && (
//               <div className="text-center">
//                 <Spinner animation="border" />
//                 <div className="mt-2">Processing... {loadingTimer} s</div>
//               </div>
//             )}

//             {output && !loading && (
//               <Form.Group>
//                 {/* <Form.Label>📝 Translated Article</Form.Label> */}
//                 <Form.Control
//                   as="textarea"
//                   rows={15}
//                   value={output}
//                   readOnly
//                   style={{ whiteSpace: 'pre-wrap' }}
//                 />
//                 <Button variant="success" className="mt-3" onClick={handleDownload}>
//                   ⬇️ Download as .txt
//                 </Button>
//                 <div className="text-muted mt-2">
//                   Processed in {loadingTimer} seconds
//                 </div>
//               </Form.Group>
//             )}
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default TranslateStory;
