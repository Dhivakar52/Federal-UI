// import React, { useState } from 'react';
// import { Card, Button, Form, Spinner, Container, Row, Col } from 'react-bootstrap';
// import { TrendingBtn } from '../TrendingBtn';
// import { ArrowDownToLine } from 'lucide-react';
// import '../../css/Summarize.css';

// const languages = [
//   'Tamil',
//   'English',
//   'Hindi',
//   'Telugu',
//   'Kannada',
//   'Malayalam',
//   'Bengali',
//   'Marathi',
//   'Gujarati'
// ];

// const Story = () => {
//   const [url, setUrl] = useState('');
//   const [language, setLanguage] = useState('Tamil');
//   const [title, setTitle] = useState('');
//   const [summary, setSummary] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTitle('');
//     setSummary('');
//     setLoading(true);

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/fullstory`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ url, language }),
//       });

//       const data = await response.json();

//       if (response.ok && data.translated) {
//         setTitle(data.title);
//         setSummary(data.translated);
//       } else {
//         setSummary(data.error || 'Translation failed.');
//       }
//     } catch (error) {
//       setSummary('Error fetching translation. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setUrl('');
//     setTitle('');
//     setSummary('');
//   };




// const handleDownload = () => {
//   const fileName = `Summary_${language}.txt`;
//   const content = title
//     ? `Title: ${title}\n\nSummary (${language}):\n\n${summary}`
//     : summary;

//   const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
//   const link = document.createElement('a');

//   link.href = URL.createObjectURL(blob);
//   link.download = fileName;

//   document.body.appendChild(link);
//   link.click();

//   document.body.removeChild(link);
//   URL.revokeObjectURL(link.href);
// };

// const getByteSize = (str) => new Blob([str]).size;

// const formatSize = (bytes) => {
//   const kb = bytes / 1024;
//   return kb > 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(2)} KB`;
// };











//   return (
//     <Container fluid>
//       <Row>
//         <Col xs={12}>
//           <div className="trendingTitle">
//             <h1>Multilingual News Summarizer</h1>
//             <p>Enter a News Site URL and select a language to generate a translated summary.</p>
//           </div>
//         </Col>
//       </Row>

//       <Row>
//         <Col xs={12} md={12}>
//           <Form onSubmit={handleSubmit} className="mt-4">
//             <Row>
//               <Col xs={12} md={12} xl={6}>
//                 <div className="summaryBox">
//                   <Form.Group className="mb-3">
//                     <Form.Label>News Article URL</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       value={url}
//                       onChange={(e) => setUrl(e.target.value)}
//                       placeholder="Enter news article URL here..."
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Select Language</Form.Label>
//                     <Form.Select
//                       value={language}
//                       onChange={(e) => setLanguage(e.target.value)}
//                     >
//                       {languages.map((lang) => (
//                         <option key={lang} value={lang}>{lang}</option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                   {/* <div className="d-flex gap-2">
//                     <Button type="submit" variant="primary" disabled={loading}>
//                       {loading ? 'Loading...' : 'Submit'}
//                     </Button>
//                     <Button type="button" variant="secondary" onClick={handleClear}>
//                       Clear
//                     </Button>
//                   </div> */}

//                    <div>
//                                          <TrendingBtn
//   submitBtnName={loading ? 'Loading...' : 'Submit'}
//   clearBtnName="Clear"
//   onSubmit={handleSubmit}
//   onClear={handleClear}
// />
//                                     </div>
//                 </div>
//               </Col>

//               <Col xs={12} md={12} xl={6}>
//                 <div className="summaryBox">
//                   <Form.Group>
//                     <Form.Label>Output</Form.Label>
//                     <div style={{ position: 'relative' }}>
//                       <Form.Control
//                         as="textarea"
//                         rows={10}
//                         value={title ? `Title: ${title}\n\nSummary (${language}):\n\n${summary}` : summary}
//                         readOnly
//                         placeholder="Summary will appear here..."
//                         style={{ position: 'relative', zIndex: 1 }}
//                       />
//                       {loading && (
//                         <div
//                           style={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             transform: 'translate(-50%, -50%)',
//                             zIndex: 2,
//                             pointerEvents: 'none',
//                           }}
//                         >
//                           <Spinner animation="border" />
//                         </div>
//                       )}
//                       {summary && (
//   <div className="mt-3 text-end">
//     <Button variant="success" className='btnColor' onClick={handleDownload}>
//       Download Story Content ({formatSize(getByteSize(summary))})  <span>   <ArrowDownToLine size={17}/></span>
//     </Button>
//   </div>
// )}
//                     </div>
//                   </Form.Group>
//                 </div>
//               </Col>
//             </Row>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Story;
