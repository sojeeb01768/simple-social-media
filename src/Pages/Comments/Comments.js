import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Comments = () => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState(false)

    console.log(comments);


    const showDetails = useLoaderData();
    const { _id } = showDetails;
    // console.log(showDetails);

    // const newComment = useLoaderData();
    // console.log(newComment);

    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext)

    const handleComment = data => {

        

        console.log(data.comment);
        const comment = {
            showDetailsId: _id,
            name: user?.displayName,
            profileImage: user?.photoURL,
            comment: data.comment
        }
        // save post information to the database
        fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(comment)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.acknowledged) {
                    toast.success('Review placed successfully')
                    // form.reset()
                
                    setNewComment(true);
                }

            })
    }

    // const { data: newComments } = useQuery({
    //     queryKey: ['newComments'],
    //     queryFn: async () => {
    //         try {
    //             const res = await fetch(`http://localhost:5000/comments/${_id}`);
    //             const data = await res.json();
    //             return data;
    //         }
    //         catch (error) {

    //         }
    //     }
    // })
    // console.log(newComments);

    useEffect(() => {

        fetch(`http://localhost:5000/comments?showDetailsId=${_id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
                // console.log(data);
            })
    }, [_id, newComment])




    return (
        <div>
            <h2>Commnet here</h2>
            <div className=' m-2'>
                <div className='mb-5'>
                    <form onSubmit={handleSubmit(handleComment)} className='flex'>
                        <input  {...register("comment")} placeholder="Write your comment" className="textarea shadow-gray-400 rounded-full shadow-inner w-full h-12" required />
                        {/* <p>{data}</p> */}
                        <input type="submit" className="btn btn-primary btn-md ml-3 rounded-3xl" value="Comment" />
                    </form>
                    <div>
                        <div className="card w-full my-5 bg-base-100 shadow-sm">
                            <div className="card-body">

                                {
                                    comments?.map(comment => <div key={comment._id} className="avatar h-24 bg-slate-200 rounded-xl">
                                        {

                                            comment?.profileImage ? <div className="avatar ">
                                                <div className="w-16 rounded-full mt-3 ml-5">
                                                    <img src={comment?.profileImage} alt='' />
                                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12"></div>
                                                </div>
                                            </div>
                                                :
                                                <div className='avatar placeholder ml-5 mt-3'>
                                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                                        {/* <span className="text-sm ml-5"> <span className='text-sm ml-1 mb-0'> No</span> <span className='ml-3 mt-0'>Image</span></span> */}
                                                        <span className="text-xs"><span className='ml-2'>No</span> <br /> <span>Image</span></span>
                                                    </div>
                                                </div>
                                        }
                                        <div className='mt-2'>
                                            <h2 className="card-title text-blue-700 ml-5 h-10">{comment?.name}</h2>
                                            <h3 className='ml-6 h-10'>{comment?.comment}</h3>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Comments;