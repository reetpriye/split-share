import Spinner from '../assets/spinner.svg'
import './styles/Loader.css'

const Loader = ({ width = '100%', height = '5rem' }) => {
  return (
    <div style={{ width, height }} className='loader-div'>
      <img className='loader' alt='loader' src={Spinner} />
    </div>
  )
}

export default Loader
