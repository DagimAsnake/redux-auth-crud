import React, {useEffect} from 'react'
import moment from 'moment';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOneBlog, deleteBlog } from '../store/BlogSlice'

const Details = () => {
    const blogState = useSelector((state) => state.blog.selectedBlog);
    const { blogId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const formattedDate = moment(blogState ?.createdAt).format('MMMM Do YYYY, h:mm:ss a');

    useEffect(() => {
        fetch(`http://localhost:8000/blog/${blogId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            dispatch(getOneBlog(data.blog));
          })
          .catch((error) => {
            console.error(error);
          });
      }, [dispatch, blogId]);

    function handleDelete() { 
        fetch(`http://localhost:8000/blog/delete/${blogState?._id}`, {
        method: 'DELETE',
        }).then((response) => {
        if (response.ok) {
            dispatch(deleteBlog(blogState?._id))
            navigate('/'); 
        } else {
            throw new Error('Failed to delete blog'); // Handle the error case
        }
        }).catch((error) => {
        console.error(error);
        });

    }

  return (
    <>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-800">{blogState?.title}</h2>  
            <div className="flex items-center mt-2">
            <div>
                <p className="font-semibold text-gray-800">Firstname Lastname</p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
            </div>
    
            <p className="mt-4 text-gray-600">{blogState?.topic}</p>
    
        </div>

            <div className="px-6 py-4">
            <p className="text-gray-700 leading-relaxed">{blogState?.description}</p>
            </div>

            <div className="px-6 py-4 flex justify-end"> 
                <Link to={`/editblog/${blogState?._id}`}>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                </Link>

                <Link>
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-r">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </Link>
            </div>
    
        </div>
  
  </div>
  </>
  )
}

export default Details