import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const About = () => {

    const {user}= useContext(AuthContext)
    // const {}=useLoaderData();

    return (
        <div>
            <h2 className='text-3xl font-semibold my-10 text-center'>Profile</h2>

            <div className="card w-96 bg-base-100 shadow-xl mx-auto mb-24">
                <div className='flex justify-end'>
                <button className='text-end my-5 btn btn-outline w-10 btn-sm'>Edit</button>
                </div>
                <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Name: <span className='text-blue-600'>{user?.displayName}</span> </h2>
                    <p className="">Email: <span className='text-blue-600'>{user?.email}</span></p>
                    <p>University:</p>
                    <p>Address:</p>
                </div>
            </div>

        </div>
    );
};

export default About;