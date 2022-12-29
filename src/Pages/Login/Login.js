import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import image from '../../aaset/login.jpg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {

    // react hook form
    const { register, formState: { errors }, handleSubmit } = useForm();
    // const [data, setData] = useState("");
    const [loginError, setLoginError] = useState('');
    // const [loginUserEmail, setLoginUserEmail] = useState('');

    const { Login, popUpLogin } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from?.pathname || '/';

    const handleLogin = (data) => {
        console.log(data);
        setLoginError('');

        Login(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                // setLoginUserEmail(data.email)
                navigate(from, {replace: true});
            })
            .catch(err => {
                console.error(err?.message)
                setLoginError(err?.message)
            })
    }

    // google popup login
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        popUpLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate('/')
            })
            .catch(error => console.error(error))
    }





    return (
        <div className="hero w-full my-10">
            <div className="hero-content grid gap-5 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img src={image} alt="" />
                </div>
                <div className="card  gap-5 w-full max-w-md ">
                    <h1 className="text-5xl font-bold  text-center">Login</h1>
                    <form className="card-body py-0" onSubmit={handleSubmit(handleLogin)}>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type='email'
                                {...register("email", { required: 'Email is required' })}
                                placeholder="Enter Your Email" className="input input-bordered" />
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type='password'
                                {...register("password", {
                                    required: 'Password is required'
                                })}
                                placeholder="Enter Your Password" className="input input-bordered" />
                            {errors.password && <p className='text-red-600'>{errors?.password?.message}</p>}
                        </div>
                        <div>
                            {loginError && <p className='text-red-600'>{loginError}</p>}
                        </div>


                        {/* <p>{data}</p> */}
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        
                    </form>
                    <p className='text-center text-sm'>Don't Have any account? <Link className='text-primary font-semibold' to='/signup'>Sign Up</Link></p>
                    <div className="divider my-0 mx-7">OR</div>
                    <button onClick={handleGoogleSignIn} className='btn btn-primary btn-outline mx-7'>Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;