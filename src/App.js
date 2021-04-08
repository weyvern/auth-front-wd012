import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SecretInfo from './components/SecretInfo';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signin' component={SignIn} />
        <ProtectedRoute exact path='/secret-info' component={SecretInfo} />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
