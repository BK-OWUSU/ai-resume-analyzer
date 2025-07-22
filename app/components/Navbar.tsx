import { Link } from 'react-router'

function Navbar() {
  return (
    <nav className='navbar'>
        <Link to="/">
         <p className='text-2xl font-bold text-gradient'>Resunalyzer</p>
        </Link>
        <Link to="/upload" className='primary-button w-fit'>
         <p>Upload Resume</p>
        </Link>
    </nav>
  )
}

export default Navbar