import { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import axios from 'axios';
import Modal from '../UI/Modal';
import Loader from '../UI/Loader';

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setShowModal({
        title: 'Invalid input',
        message: 'Please fill the valid details.',
      });
      return;
    }

    setLoader(true);
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDb7u0nyGXK2wBGsP5br7jaOs0Vs-3Jfnc',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        dispatch(
          login({
            jwtToken: response.data.idToken,
            userName: response.data.displayName,
          })
        );
        history.replace('/profile');
      })
      .catch((error) => {
        console.error(error);
        setShowModal({
          title: 'Login failed',
          message: 'Invalid Credentials',
        });
        setLoader(false);
      });
  }

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-400">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-teal-300">Email</label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-gray-700 text-white"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-teal-300">Password</label>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="mt-1">
                <input
                  type="password"
                  id="password"
                  ref={passwordRef}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-gray-700 text-white"
                  placeholder="******"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                {loader ? <Loader /> : 'Sign in'}
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-teal-300">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-purple-400 hover:text-purple-300">
              Create here
            </Link>
          </p>
        </div>
      </div>

      {showModal && (
        <Modal
          title={showModal.title}
          message={showModal.message}
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
