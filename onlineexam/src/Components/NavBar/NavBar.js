import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../CustomHooks/useAuth'
import logo from '../../images/logo.png'

const NavBar = () => {
    const { user, logOut } = useAuth();

    return (
      <>
        <header className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link to='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img className='w-12 h-12 text-white p-2' src={logo}/>
              <span className="ml-3 text-xl">Hail Online</span>
            </Link>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              {
                user.displayName ? <div>
                  <span className='text-4xl p-4 mt-6 text-gray-900'><i className="fas fa-user-circle pt-4"></i></span>
                  <button onClick={logOut} className="text-gray-900 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-lg mt-4 md:mt-0">Log Out
                  <i class="fas fa-sign-out-alt text-xl p-2 text-gray-900"></i>
                  </button>
                </div> : 
                <Link to='/login' className="text-gray-900 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Log In
                  <i class="fas fa-sign-in-alt text-xl p-2 text-gray-900"></i>
                </Link>
              }
              
            </nav>
          </div>
        </header>
      </>
    )
}

export default NavBar
