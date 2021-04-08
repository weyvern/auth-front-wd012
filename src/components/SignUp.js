import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
  const { isAuthenticated, setIsAuthenticated, error, setError } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });
  const { name, email, password, address } = formState;

  const onChange = e => setFormState({ ...formState, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    for (const field in formState) {
      if (!formState[field]) return alert(`Fill up your ${field}`);
    }
    const options = {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    };
    try {
      const res = await fetch('http://localhost:5000/auth/signup', options);
      const { token, error } = await res.json();
      if (error) {
        setError(error);
        return setTimeout(() => setError(''), 3000);
      }
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (isAuthenticated) return <Redirect to='/' />;
  return (
    <div className='container'>
      {error && (
        <div class='alert alert-danger' role='alert'>
          {error}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            className='form-control'
            placeholder='Enter name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            className='form-control'
            placeholder='Enter email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            className='form-control'
            placeholder='Enter password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            name='address'
            className='form-control'
            placeholder='Enter address'
            value={address}
            onChange={onChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
