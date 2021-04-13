import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
  const { isAuthenticated, setIsAuthenticated, error, setError } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async data => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    };
    try {
      const res = await fetch('http://localhost:5000/auth/signup', options);
      const { error } = await res.json();
      if (error) {
        setError(error);
        return setTimeout(() => setError(''), 3000);
      }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            className='form-control'
            placeholder='Enter name'
            {...register('name', { required: true })}
          />
          {errors.name && (
            <div class='alert alert-warning' role='alert'>
              Name is required
            </div>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            className='form-control'
            placeholder='Enter email'
            {...register('email', { required: true })}
          />
          {errors.email && (
            <div class='alert alert-warning' role='alert'>
              Email is required
            </div>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            className='form-control'
            placeholder='Enter password'
            {...register('password', { required: true })}
          />
          {errors.password && (
            <div class='alert alert-warning' role='alert'>
              Password is required
            </div>
          )}
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
