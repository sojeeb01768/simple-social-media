import { useQuery } from '@tanstack/react-query';
import React from 'react';
const ShowPost = () => {

    const { data: posts = [] } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/posts');
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    })


    return (
        <div>
            <h2 className='text-3xl text-center my-5'>Trending Post</h2>
            <div>
                {
                    posts?.map(post => <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                        </div>
                        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                    </div>)
                }
            </div>

        </div>
    );
};

export default ShowPost;