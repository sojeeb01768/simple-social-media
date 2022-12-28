import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err))
    }

    const menuItems = <>
        <li className='font-semibold'><Link to='/'>Home</Link></li>
        <li className='font-semibold'><Link to='/media'>Media</Link></li>
        <li className='font-semibold'><Link to='/about'>About</Link></li>
    </>

    return (
        <div className="navbar bg-blue-700 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className=" menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-blue-700">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-2xl">Media</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {user?.uid ?
                    <>
                        <p className='mr-6 font-semibold'>{user?.displayName}</p>
                        <button onClick={handleLogOut}><Link className='font-semibold' to='/login'>Log Out</Link></button>
                    </>
                    :
                    <Link className='font-semibold' to='/login'>Login</Link>}
            </div>
        </div>
    );
};

export default Header;