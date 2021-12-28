import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../CustomHooks/useAuth'
import logo from '../../images/logo.png'

const NavBar = () => {
    const { user, logOut } = useAuth();

    return (
      <>
        <header className="text-gray-600 body-font sticky top-0 z-50 bg-white">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link to='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img className='w-12 h-12 text-white p-2' src={logo}/>
              <span className="ml-3 text-xl">Hail Online</span>
            </Link>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              {
                user.displayName ? <div>
                  <span className='text-4xl p-4 mt-6 text-gray-900'><i className="fas fa-user-circle pt-4"></i></span>
                  <button onClick={logOut} className="border-2 border-gray-900 font-semibold leading-none text-gray-900 py-1 px-2 hover:border-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:outline-none">Log Out
                  <i class="fas fa-sign-out-alt text-xl p-2 text-gray-900"></i>
                  </button>
                </div> : 
                <Link to='/login' className="border-2 border-gray-900 font-semibold leading-none text-gray-900 py-1 px-2 hover:border-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:outline-none">Log In
                  <i class="fas fa-sign-in-alt text-xl p-2 text-gray-900"></i>
                </Link>
              }
              
            </nav>
          </div>
          <hr style={{borderTop: '2px solid black'}}/>
        </header>
      </>
    )
}

export default NavBar
