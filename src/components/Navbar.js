import { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
      <NavLink to='/'>Home</NavLink>
      {!isAuthenticated ? (
        <Fragment>
          <NavLink to='/signup'>Register</NavLink>
          <NavLink to='/signin'>Login</NavLink>
        </Fragment>
      ) : (
        <NavLink to='/secret-info'>Profile</NavLink>
      )}
    </ul>
  );
};

export default Navbar;
