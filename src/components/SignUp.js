import { useState } from 'react';

const SignUp = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });
  const { name, email, password, address } = formState;

  const onChange = e => setFormState({ ...formState, [e.target.name]: e.target.value });

  return (
    <div className='container'>
      <form>
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
