import { useStarredShows} from '../lib/useStarredShows';

function Starred() {
  const [starredShows] = useStarredShows();

  return (
    <div>
        <h3>Starred Page, starred {starredShows.length}</h3>
    </div>
  )
}

export default Starred