import ShowCard from './ShowCard';
import { useStarredShows} from '../../lib/useStarredShows';
import { FlexGrid } from '../common/FlexGrid';
import NotFoundImgSrc from '../../lib/image-not-found.jpg';


const ShowGrid = ({ shows }) => {
  const [starredShows, dispatchStarred] = useStarredShows();
  
  const onStarMeClick = (showId) => {
    const isStarred = starredShows.includes(showId);

    if(isStarred) {
      dispatchStarred({type: 'UNSTAR', showId})
    } else {
      dispatchStarred({type: 'STAR', showId})
    }
  }
  return (
    <FlexGrid>
      {shows.map(data => (
        <ShowCard
          key={data.show.id}
          name={data.show.name}
          image={
            data.show.image ? data.show.image.medium : NotFoundImgSrc
          }
          id={data.show.id}
          summary={data.show.summary}
          onStarMeClick={onStarMeClick}
          isStarred={starredShows.includes(data.show.id)}
        />
      ))}
    </FlexGrid>
  );
};

export default ShowGrid;
