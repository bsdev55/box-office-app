import { useReducer, useState } from 'react';
import { searchForShows, searchForPeople } from '../api/tvmaze';
import ShowGrid from '../component/shows/ShowGrid';
import ActorsGrid from '../component/actors/ActorsGrid';
import SearchForm from '../component/SearchForm';
import { useQuery } from 'react-query';

const reducerFn = (currentCounter, action) => {

  switch (action.type) {
    case 'INCREMENT': return currentCounter + 1;
    case 'DECREMENT': return currentCounter - 1;
    case 'RESET': return 0;
  }
    return 0;
}
function Home() {
  const [filter, setFilter] = useState(null);

  const [counter, dispatch] = useReducer(reducerFn,0);
  const onIncrement = () => {
    dispatch({type: 'INCREMENT'});
  }
  const onDecrement = () => {
    dispatch({type: 'DECREMENT'});
  }
  const onReset = () => {
    dispatch({type: 'RESET'});
  }

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
      <div>Counter: {counter }</div>
      <button type="button" onClick={onIncrement}>Increment</button>
      <button type="button" onClick={onDecrement}>Decrement</button>
      <button type="button" onClick={onReset}>Reset</button>
      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;
