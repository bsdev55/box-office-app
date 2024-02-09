//import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getShowById } from '../api/tvmaze';
import ShowMainData from '../component/shows/ShowMainData';
import Details from '../component/shows/Details';
import Seasons from '../component/shows/Seasons';
import Cast from '../component/shows/Cast';

const Show = () => {
  const { showId } = useParams();
  /*const [showData, setShowData] = useState(null);
    const [showError, setShowError] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getShowById(showId);  
                setShowData(data);              
            } catch (error) {
                setShowError(error);
            }
        }

        fetchData();

    }, [showId]);*/
  // Queries
  /*const { data: showData, error: showError } = useQuery(['show', showId], () =>
    getShowById(showId)
  );*/
  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId],
    queryFn: () => getShowById(showId),
    refetchOnWindowFocus: false
  });
/*
  const navigateTo = useNavigate();

  const onGoBack = () => {
    navigateTo('/');

    //Use this with it
    <button type='button' onClick={onGoBack}>Go Back to Home</button>
  }*/

  if (showError) {
    return <div>We have an error: {showError.message}</div>;
  }
  if (showData) {
    return (
      <div>
        <Link to="/">Go Back To Home Page</Link>
        <ShowMainData
          image={showData.image}
          name={showData.name}
          rating={showData.rating}
          summary={showData.summary}
          genres={showData.genres}
        />
        <div>
          <h2>Details</h2>
          <Details
            status={showData.status}
            premiered={showData.premiered}
            network={showData.network}
          />
        </div>
        <div>
          <h2>Seasons</h2>
          <Seasons seasons={showData._embedded.seasons} />
        </div>
        <div>
          <h2>Cast</h2>
          <Cast cast={showData._embedded.cast} />
        </div>
      </div>
    );
  }

  return <div>Data is Loading {showId}</div>;
};

export default Show;