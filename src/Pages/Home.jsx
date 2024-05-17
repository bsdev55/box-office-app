import { useState } from 'react';
import { searchForShows, searchForPeople } from '../api/tvmaze';
import ShowGrid from '../component/shows/ShowGrid';
import ActorsGrid from '../component/actors/ActorsGrid';
import SearchForm from '../component/SearchForm';
import { useQuery } from 'react-query';
import { TextCenter } from '../component/common/TextCenter';
//import styled, {css} from 'styled-components'




function Home() {
  const [filter, setFilter] = useState(null);
  

  const {data: apiData, error: apiDataError} = useQuery({
    queryKey: ['search', filter],
    queryFn: () => filter.searchOption === 'shows' ? searchForShows(filter.q) : searchForPeople(filter.q),
    enabled: !!filter,
    refetchOnWindowFocus: false,
  })

 

  const onSearch = async ({q, searchOption}) => {
    setFilter({ q, searchOption});
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <TextCenter>Error occured: {apiDataError.message} </TextCenter>;
    }

    if(apiData?.length === 0) {
      return <TextCenter>No results</TextCenter>
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
      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;