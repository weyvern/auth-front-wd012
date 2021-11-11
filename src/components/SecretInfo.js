import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SecretInfo = () => {
  const {
    user: { _id, email, name }
  } = useContext(AuthContext);
  return (
    <div>
      <ul>
        <li>ID: {_id}</li>
        <li>Name: {name}</li>
        <li>Email: {email}</li>
      </ul>
    </div>
  );
};

export default SecretInfo;
