import { useState } from 'react';
import { searchForShows, searchForPeople } from '../api/tvmaze';
import ShowGrid from '../component/shows/ShowGrid';
import ActorsGrid from '../component/actors/ActorsGrid';
import SearchForm from '../component/SearchForm';

function Home() {
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);

 

  const onSearch = async ({q, searchOption}) => {

    try {
      setApiDataError(null);
      if (searchOption === 'shows') {
        const result = await searchForShows(q);
        setApiData(result);
      } else {
        const result = await 
        searchForPeople(q);
        setApiData(result);
      }
    } catch (error) {
      setApiDataError(error);
      console.log(apiDataError);
    }
  };

  const renderApiData = () => {
    if (apiDataError) {
      //console.log(apiDataError.message);
      return <div>Error occured: {apiDataError.message} </div>;
    }

    if(apiData?.length === 0) {
      return <div>No results</div>
    }

    if (apiData) {
      return apiData[0].show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }
    return null;
  };
  return (
    <div>
      <SearchForm onSearch={onSearch} />
      {/*
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchInputChange} />
        <label>
          Shows
          <input
            type="radio"
            name="search-option"
            value="shows"
            checked={searchOption === 'shows'}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="Actors">
          Actors
          <input
            type="radio"
            name="search-option"
            value="actors"
            checked={searchOption === 'actors'}
            onChange={onRadioChange}
          />
        </label>
        <button type="submit">Search</button>
  </form>*/}
      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;
