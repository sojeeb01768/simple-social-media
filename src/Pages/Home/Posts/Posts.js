import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Posts = () => {

    const { user } = useContext(AuthContext)
    // console.log(user);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    // console.log(imageHostKey); 
    // const [data, setData] = useState("");

    const handlePost = (data) => {

        // console.log(data);
        const image = data?.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // console.log(imgData);
                if (imgData.success) {
                    // console.log(imgData.data.url);
                    const post = {
                        name: user?.displayName,
                        email: user?.email,
                        profileImage: user?.photoURL,
                        post: data.post,
                        image: imgData.data.url

                    }
                    // console.log(post);

                    // save post information to the database
                    fetch('http://localhost:5000/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success('Post Added Successfully To Media');
                        })
                }
            })

    }

    return (
        <div className='max-w-3xl mx-auto my-10 py-5'>
            <h2 className='text-center text-3xl font-semibold'>Post here</h2>
            {/* <p className='text-center'>Name: {user?.displayName}</p> */}

            <form onSubmit={handleSubmit(handlePost)} className='mx-20 mt-5' >

                <textarea type='text' {...register("post")} placeholder=" Write Your Post here" className="textarea textarea-primary w-full h-28 mt-5 rounded-lg" />

                <input type='file'{...register("image",
                    {
                        required: "Image is required"
                    }
                )}
                    placeholder="Choose An Image" className="input input-primary w-full mt-5 rounded-lg" />
                {errors.img && <p className='text-red-600'>{errors.img?.message}</p>}


                {/* <p>{data}</p> */}
                <div className="form-control mt-6">
                    <input className="btn btn-primary rounded-lg" type="submit" value="post" />
                </div>
            </form>

        </div>
    );
};

export default Posts;