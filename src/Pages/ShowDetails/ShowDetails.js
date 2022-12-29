// import { useQuery } from '@tanstack/react-query';
import React from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Comments from '../Comments/Comments';

const ShowDetails = () => {



    const { name, post, image } = useLoaderData();

    // console.log(posts);

    return (
        <div>
            <h2 className='my-5 text-3xl text-center font-semibold'>Post</h2>
            <div className="grid sm:max-w-xl lg:max-w-3xl md:max-w-2xl md:mx-auto m-10 shadow-lg border bg-fuchsia-50 border-blue-100">
                <div className="card-body ">
                    <div className="avatar">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                        </div>
                        <h2 className="card-title text-blue-700 ml-5">{name}</h2>
                    </div>
                    <p>{post}</p>
                </div>
                <figure><img src={image} alt="Shoes" /></figure>
                <div className='my-5 m-2'>like/react</div>
                <Comments></Comments>

            </div>
        </div>
    );
};

export default ShowDetails;