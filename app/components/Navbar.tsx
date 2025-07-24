import { Link } from 'react-router'

function Navbar() {
  return (
    <nav className='navbar'>
        <Link to="/">
         <p className='text-2xl font-bold text-gradient'>Resunalyzer</p>
        </Link>
        <div className='flex gap-2'>
        <Link to="/upload" className='primary-button w-fit'>
            <p>Upload Resume</p>
        </Link>
        <Link to="/wipe" className='delete-button w-fit'>
            <p>Wipe</p>
        </Link>
        </div>
    </nav>
  )
}

export default Navbar