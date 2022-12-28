import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';







const Media = () => {

    const { data: posts } = useQuery({
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
            <h2 className='text-3xl text-center my-5 font-semibold'>Media </h2>

            <div className='grid sm:max-w-xl lg:max-w-3xl md:max-w-2xl mx-auto '>
                {
                    posts?.map(post => <div key={post._id} className="card  shadow-lg border bg-fuchsia-50 border-blue-100 rounded-md md:mx-auto my-6 m-10">
                        <div className="card-body">
                            <div className="avatar">
                                {
                                    post?.profileImage ? <div className="avatar">
                                        <div className="w-16 rounded-full">
                                            <img src={post?.profileImage} alt='' />
                                            <div className="bg-neutral-focus text-neutral-content rounded-full w-12"></div>
                                        </div>
                                    </div>
                                        :
                                        <div className='avatar placeholder'>
                                            <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                                {/* <span className="text-sm ml-5"> <span className='text-sm ml-1 mb-0'> No</span> <span className='ml-3 mt-0'>Image</span></span> */}
                                                <span className="text-xs"><span className='ml-2'>No</span> <br /> <span>Image</span></span>
                                            </div>
                                        </div>
                                }
                                <h2 className="card-title text-blue-700 ml-5">{post?.name}</h2>
                            </div>

                            {/* <p>{post?.post}</p> */}
                            <div>
                                {
                                    post?.post?.length > 10 ?
                                        <p>{post?.post.slice(0, 10) + '...'}</p>
                                        :
                                        <p>{post?.post}</p>

                                }
                            </div>

                        </div>
                        <figure><img className='w-full' src={post?.image} alt="Shoes" /></figure>
                        <div className="card-actions justify-end" >
                            <Link to={`/showdetails/${post._id}`}><button className="btn btn-primary w-full my-5 rounded">See More</button></Link>
                        </div>
                    </div>)
                }
            </div>


        </div>
    );
};

export default Media;