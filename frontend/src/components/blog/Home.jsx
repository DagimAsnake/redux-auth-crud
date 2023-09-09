import moment from 'moment';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlog } from '../store/BlogSlice';

const Home = () => { 
  const blogState = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:8000/blog')
      .then((response) => response.json())
      .then((data) => {
        dispatch(getAllBlog(data.blogs));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const blog = blogState.blogs;

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {blog.map(item => {
              const formattedDate = moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a');
               return ( 
                <div key={item._id} className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700">Firstname Lastname</span>
                    <span className="mt-1 text-gray-500 text-sm">{formattedDate}</span>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{item.title}</h2>
                    <p className="leading-relaxed">{item.topic}</p>
                    <Link to={`/blog/${item._id}`} className="text-indigo-500 inline-flex items-center mt-4">
                      Learn More
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
 
                    </Link>
                  </div>
                </div>
               )
            })} 
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

