import { Link } from 'react-router-dom'
import Home from './Home'

function Starred() {
  return (
    <div>
        <h3>Starred Page</h3>
        <Link to={Home}>go back to Home Page</Link>
    </div>
  )
}

export default Starred