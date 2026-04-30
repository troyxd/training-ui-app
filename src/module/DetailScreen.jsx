import { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'asab_webui_components';

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
    <Container className='h-100 d-flex flex-colum nalign-items-center'>
      <div>{userData.id}</div>
    </Container>
  );
}