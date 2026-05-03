import { useEffect, useState } from 'react';
import { Container, Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Spinner, DateTime } from 'asab_webui_components';

function DetailField({ label, value, icon, additionalClasses }) {
  const defaultClasses =  'fw-bold fs-6 text-break'
  const mergedClassName = additionalClasses ? `${defaultClasses} ${additionalClasses}` : defaultClasses;

  return (
    <div className='mb-3'>
      <label className='text-muted'>
        {icon && <i className={`${icon} pe-1`}></i>}
        {label}
      </label>
      <p className={mergedClassName}>{value}</p>
    </div>
  )
}

export function DetailScreen(props) {
  const { id: userId } = useParams();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`https://devtest.teskalabs.com/detail/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json();
      setUserData(data);
    }
    catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    fetchUserData(userId);
  }, [userId]);

  // Display loading spinner while data is being fetched
  if (!userData) {
    return (
      <Container className='h-100 d-flex flex-column align-items-center justify-content-center'>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container className='mt-5 mb-5'>
      <Row className='mb-4'>
        <Col xs={11} sm={10} md={9} lg={8} className='mx-auto'>
          <Card className='shadow-sm'>
            <CardHeader className='bg-primary text-white'>
              <h4 className='mb-0'>
                <i className='bi bi-person-circle pe-2'></i>
                User Details
              </h4>
            </CardHeader>
            <CardBody>
              <Row className='mx-1'>
                <Col md={6}>
                  <DetailField
                    icon="bi bi-person"
                    label="Username"
                    value={userData.username}
                  />
                  <DetailField
                    icon="bi bi-envelope"
                    label="Email"
                    value={userData.email}
                  />
                  <DetailField
                    icon="bi bi-telephone"
                    label="Phone Number"
                    value={userData.phone_number}
                  />
                </Col>
                <Col md={6}>
                  <DetailField
                    icon="bi bi-fingerprint"
                    label="User ID"
                    value={userData.id}
                  />
                  <DetailField
                    icon="bi bi-geo-alt"
                    label="Address"
                    value={userData.address}
                  />
                </Col>
              </Row>
              
              <hr className='my-4' />
              
              <Row className='mx-1'>
                <Col md={6}>
                  <DetailField
                    icon="bi bi-calendar-event"
                    label="Created"
                    value={<DateTime value={userData.created}/>}
                  />
                </Col>
                <Col md={6}>
                  <DetailField
                    icon="bi bi-calendar-check"
                    label="Last Sign In"
                    value={<DateTime value={userData.last_sign_in}/>}
                  />
                </Col>
              </Row>

              <hr className='my-4' />

              <Row className='mx-1'>
                <Col md={6}>
                  <DetailField
                    icon="bi bi-router"
                    label="IP Address"
                    value={userData.ip_address}
                    additionalClasses="font-monospace"
                  />
                </Col>
                <Col md={6}>
                  <DetailField
                    icon="bi bi-cpu"
                    label="MAC Address"
                    value={userData.mac_address}
                    additionalClasses="font-monospace"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}