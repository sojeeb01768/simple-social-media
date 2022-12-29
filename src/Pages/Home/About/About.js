import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
// import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const About = () => {

    const { user } = useContext(AuthContext)
    // console.log(user);

    // const {id} = useLoaderData();
    // console.log(profile.name);

    const handleUpdate = data => {
        // console.log(data);

        const profile = {
            name: user?.displayName,
            email: user?.email,
            university: data.university,
            address: data.address
        }
        // save profile information to the database
        fetch(`http://localhost:5000/profiles/${user._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(profile)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            })
    }


    const { register, handleSubmit } = useForm();
    // const [data, setData] = useState("");

    return (
        <div>
            <h2 className='text-3xl font-semibold my-10 text-center'>Profile</h2>

            <div className="card w-96 bg-base-100 shadow-xl mx-auto mb-24">
                <div className='flex justify-end'>
                    {/* modal button */}
                    <label htmlFor="my-modal-3" className="btn btn-sm rounded-md btn-outline btn-primary">Edit</label>
                    {/* modal body */}
                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h2 className='text-2xl text-center text-blue-600 border-b-2 border-blue-500'>Update Your Profile</h2>
                            <form onSubmit={handleSubmit(handleUpdate)}>
                                <input type='text' {...register("universityName")} placeholder="University Name" className="input input-bordered input-secondary w-full mt-3 rounded-3xl" />
                                <input type='text' {...register("Address")} placeholder="Address" className="input input-bordered input-secondary w-full my-3 rounded-3xl" />
                                {/* <p>{data}</p> */}
                                <div className='flex justify-end'>
                                    <input type="submit" className='btn btn-sm btn-primary rounded-2xl mt-5' />
                                </div>
                            </form>



                        </div>
                    </div>

                </div>



                {
                    user?.photoURL ? <figure><img className='w-64 rounded-full' src={user?.photoURL} alt="Shoes" /></figure>
                        :
                        <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-64 ml-16">
                                <span className="text-xl">Image Not Availabe</span>
                            </div>
                        </div>
                }
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