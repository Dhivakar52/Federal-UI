
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
// import { TrendingBtn } from './TrendingBtn';
import TrendingText from './TrendingText';
import IndiaMap from '../components/IndiaMap';
import '../css/Trending.css';


function TrendingSelect({ selectedState,setSelectedState,region , setRegion }) {
  // const [region, setRegion] = useState('India');
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [stateChange, setStateChange]= useState(null)




  const handleStateSelect = (state) => {
    setSelectedState(state);
    setRegion(state)
  };
  // Sync selectedState with region on component mount or when selectedState changes
  useEffect(() => {
    if (selectedState) {
      setRegion(selectedState);
      fetchTrending(selectedState); // Fetch data when selectedState is updated
    }
  }, [selectedState]);

  const map_data = {
    "India": "IN",
    "Tamil Nadu": "IN-TN",
    "Karnataka": "IN-KA",
    "Andhra Pradesh": "IN-AP",
    "Telangana": "IN-TG",
    "Delhi": "IN-DL",
    "Maharashtra": "IN-MH",
    "West Bengal": "IN-WB",
    "Uttar Pradesh": "IN-UP",
    "Kerala": "IN-KL",
    "Rajasthan": "IN-RJ",
    "Gujarat": "IN-GJ",
    "Punjab": "IN-PB",
    "Haryana": "IN-HR",
    "Bihar": "IN-BR",
    "Madhya Pradesh": "IN-MP",
    "Chhattisgarh": "IN-CT",
    "Orissa": "IN-OR",
    "Assam": "IN-AS",
    "Jharkhand": "IN-JH",
    "Himachal Pradesh": "IN-HP",
    "Uttarakhand": "IN-UT",
     "Uttaranchal": "IN-UT",
    "Goa": "IN-GA",
    "Jammu and Kashmir": "IN-JK",
    "Ladakh": "IN-JK",
    "Tripura": "IN-TR",
    "Meghalaya": "IN-ML",
    "Manipur": "IN-MN",
    "Nagaland": "IN-NL",
    "Arunachal Pradesh": "IN-AR",
    "Mizoram": "IN-MZ",
    "Sikkim": "IN-SK"
  };

  const fetchTrending = async (regionToFetch = region) => {
    setLoading(true);
    try {
      const regionCode = map_data[regionToFetch];
      if (!regionCode) {
        console.error('No region code found for the selected region');
        return;
      }
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/trends/?region=${regionCode}`, { responseType: 'text' });

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "application/xml");

      const titles = xmlDoc.getElementsByTagName("title");
      const topics = [];
      for (let i = 0; i < titles.length; i++) {
        topics.push(titles[i].textContent);
      }

      setTrendingTopics(topics);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTrendingTopics(['Error fetching trends']);
    }
    setLoading(false);
  };

  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    setRegion(newRegion);
    fetchTrending(newRegion); // Fetch data on dropdown change
     
  };
 console.log(region);
  // const handleClear = () => {
  //   setSubmitted(false);
  //   setTrendingTopics([]);
  // };

  return (
    <>
      <Row>
        <Col xl={6} md={12} xs={12} >
          <div>
            <Card className="p-3 trendingBox border-0">
              <Form.Label htmlFor="state">Select State/Region</Form.Label>
              <Form.Select
                aria-label="Default select example"
                id="state"
                onChange={handleRegionChange} 
                value={region} 
              >
                {Object.keys(map_data)
                  .sort()
                  .map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
              </Form.Select>
            </Card>

            {/* <TrendingBtn onClear={handleClear} /> */}
          </div>


          <Row>
             <Col md={12} xs={12} className='mb-3' >                               
                                  <div>
                                     <IndiaMap region={region}  setRegion={setRegion} onStateSelect={handleStateSelect} />
                                  </div>
                          </Col>
          </Row>
        </Col>
        <Col xl={6} md={12} xs={12} >
          <div>
            <TrendingText topics={trendingTopics} loading={loading} />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default TrendingSelect;
