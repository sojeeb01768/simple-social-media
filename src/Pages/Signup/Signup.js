import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../aaset/login.jpg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Signup = () => {

    // react hook form
    const { register, formState: { errors }, handleSubmit } = useForm();
    // const [data, setData] = useState("");

    const [signUpError, setSignUpError] = useState('');

    const { createUser, updateUser } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleSignUp = (data) => {
        console.log(data);
        setSignUpError('')

        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast("Account Created Successfully")
                navigate('/')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)

                .then(() => {
                    saveUser(data.name, data.email);
                })
                .catch(err => console.log(err))
            })
            .catch(err => {
                console.error(err)
                setSignUpError(err.message)
            }
            )
    }


     // Post user data to database
     const saveUser = (name, email) => {
        const user = { name, email }
        fetch('http://localhost:5000/profiles', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // setCreatedUserEmail(email);
                // setCreatedUserEmail(email);
            })
    }



    return (
        <div className="hero w-full my-10">
            <div className="hero-content grid gap-5 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img src={image} alt="" />
                </div>
                <div className="card  gap-5 w-full max-w-md ">
                    <h1 className="text-5xl font-bold  text-center">Sign Up</h1>
                    <form className="card-body py-0" onSubmit={handleSubmit(handleSignUp)}>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type='text'
                                {...register("name", { required: 'Name is required' })}
                                placeholder="Enter Your Email" className="input input-bordered" />
                            {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type='email'
                                {...register("email", {
                                    required: 'Email is required'
                                })}
                                placeholder="Enter Your Email" className="input input-bordered" />
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type='password'
                                {...register("password", {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'password should be atleast 6 charecter' }
                                })}
                                placeholder="Enter Your Password" className="input input-bordered" />
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>


                        {/* <p>{data}</p> */}
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign Up" />
                            {signUpError && <p className='text-red-600'>{signUpError}</p>}
                        </div>
                        {/* <input type="submit" /> */}
                    </form>
                    <p className='text-center text-sm'>Already have an account? <Link className='text-primary font-semibold' to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;