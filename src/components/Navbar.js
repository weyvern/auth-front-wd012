import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/signup'>Register</NavLink>
      <NavLink to='/signin'>Login</NavLink>
    </ul>
  );
};

export default Navbar;
