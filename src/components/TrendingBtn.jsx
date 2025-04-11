import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/Trending.css'
 
export const TrendingBtn = ({ onSubmit, onClear,submitBtnName,clearBtnName }) => {
  
  return (
    <>
      <Row className='mt-3'>
        <Col md={6} xs={12} className='mb-3'>
          <div>
            <Button
              variant="primary"
              className='clearBtn BtnSize'
              onClick={onClear} 
            >
               {clearBtnName}
            </Button>
          </div>
        </Col>
        <Col md={6} xs={12} className='mb-3'>
          <Button
            variant="secondary"
            className='submitBtn BtnSize'
            onClick={onSubmit} 
            type='submit'
          >
           {submitBtnName}
          </Button>
        </Col>
      </Row>
    </>
  );
};
