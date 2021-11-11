import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
  const { isAuthenticated, loading, signUp, error } = useContext(AuthContext);
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

  if (loading) return <div>Loading...</div>;
  if (isAuthenticated) return <Redirect to='/secret-info' />;
  return (
    <div className='container'>
      {error && (
        <div class='alert alert-danger' role='alert'>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(signUp)}>
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
