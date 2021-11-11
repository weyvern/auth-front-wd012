import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';

const SignIn = () => {
  const { isAuthenticated, loading, signIn, error } = useContext(AuthContext);
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
      <form onSubmit={handleSubmit(signIn)}>
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

export default SignIn;
