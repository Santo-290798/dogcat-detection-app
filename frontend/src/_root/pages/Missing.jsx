import { Container, Row, Col, Image } from 'react-bootstrap';

const Missing = () => {
  return (
    <Container style={{ marginTop: '159px', marginBottom: '159px' }}>
      <Row className='justify-content-center text-center'>
        <Col lg={11}>
          <div className='app-title highlight-color text-center'>Sorry, the page you're looking for can't be found.</div>
          <a href='/' className='app-description main-text-hover d-inline-block mt-sm-5 mt-4'>
            <Image
              src='/assets/icons/left_arrow.svg'
              alt='left arrow icon'
              width={22}
              className='left-arrow-icon me-2'
            />
            Go to the home page
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Missing;