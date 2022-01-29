// import Meta from "../../../src/components/Head/Meta"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { enviroment } from '../../src/components/environment';
// import Meta from '../../../src/components/Head/Meta';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../../redux/features/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { connect } from 'react-redux';
import { logIn, logOut } from '../../redux/actions/auth';
import Link from 'next/link';

const LogIn = ({ beginLogin }) => {
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const toastError = () =>
    toast.error(`${error ? error : 'Could not login'}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const toastSuccess = () =>
    toast.success(`${error ? error : 'Login Successful'}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  //Redirect
  const router = useRouter();

  //action access
  const dispatch = useDispatch();

  // let min = 6;
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        // .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
        // .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
        // .matches(/\d/, "Password must have a number")
        // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      // notify()
      setisLoading(true);
      seterror(null);
      fetch(enviroment.BASE_URL + 'auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (!res.ok) {
            setisLoading(false);
            throw Error('Could not login');
          }
          setisLoading(false);
          return res.json();
        })
        .then((data) => {
          if (data?.error) {
            seterror(data?.message);
            toastError();
            dispatch(logOut());
          } else {
            seterror(data?.message);
            toastSuccess();
            const now = new Date();
            const item = {
              userToken: data.data._token,
              userId: data.data.user._id,
              userName: data.data.user.profile.firstName,
              phone: data.data.user.profile.phoneNumber,
              email: data.data.user.email,
              expiry: now.getTime() + 3600000,
            };
            localStorage.setItem('user', JSON.stringify(item));
            setTimeout(function () {
              router.push('/');
              dispatch(logIn());
            }, 1500);
          }
          //save data to store
          beginLogin({
            token: data.data._token,
            login: true,
          });
        })
        .catch((e) => {
          // seterror(e.message)
          setisLoading(false);
          console.log(e.message);
        });
    },
  });

  return (
    <>
      <section className="font-montserrat">
        {/* <Meta /> */}
        <main>
          <ToastContainer />
          <div
            className=" w-full h-screen  "
            style={{
              backgroundImage: `url('../../../images/signup-bg.png')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex w-full h-full items-center justify-center">
              <div className="bg-white mb-16 w-full md:w-1/3 shadow-md rounded-md p-12 mt-20">
                <div className="text-center">
                  <p className="text-base font-semibold text-gray-900">
                    Enter your details to log in
                  </p>
                </div>

                <form className="mt-8" onSubmit={formik.handleSubmit}>
                  <div className="flex w-full flex-wrap lg:flex-nowrap md:flex-nowrap lg:mb-5 justify-center">
                    <div className="flex flex-col mb-3 w-full lg:w-8/12 lg:mb-0">
                      <label className="pb-1 text-sm text-gray-800 font-10 font-medium">
                        Email Address
                      </label>
                      <input
                        className="rounded border-2 font-normal text-xs w-full h-9 box-border focus:outline-none px-2
                         placeholder-gray-400
                        "
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder="What is your email address?"
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-xs text-red-600">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex w-full flex-wrap lg:flex-nowrap md:flex-nowrap lg:mb-5 justify-center">
                    <div className="flex flex-col mb-3 w-full lg:w-8/12 lg:mb-0 ">
                      <label className="pb-1 text-sm md:text-base text-gray-800 font-10 font-medium">
                        Password
                      </label>
                      <input
                        className="rounded text-xs border-2 placeholder-gray-400 font-normal w-full h-9 box-border focus:outline-none px-2"
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="What is your password?"
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-xs text-red-600 ">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="text-center pt-3">
                    <button
                      type="submit"
                      className="focus:outline-none bg-red-600 rounded  text-white text-sm font-semibold uppercase py-2.5 px-4 w-full lg:w-1/3 md:w-1/2"
                    >
                      {isLoading ? (
                        <ClipLoader color="#fff" size={20} loading />
                      ) : (
                        'login'
                      )}{' '}
                    </button>
                  </div>
                </form>
                <div className="text-center text-xs mt-10 text-blue-500">
                  <Link href="/auth/login/forgotPassword">Forgot Password</Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default LogIn;
