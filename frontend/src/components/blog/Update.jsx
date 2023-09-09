import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneBlog, updateBlog } from '../store/BlogSlice';
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const blogState = useSelector((state) => state.blog.selectedBlog);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { blogId } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    description: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8000/blog/${blogId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(getOneBlog(data.blog));
        setFormData({
          ...formData,
          title: blogState?.title,
          topic: blogState?.topic,
          description: blogState?.description,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, blogId]);

  const onFormSubmission = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/blog/update/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedBlogData = {
            id: blogId,
            title: formData.title,
            topic: formData.topic,
            description: formData.description,
          };
        dispatch(updateBlog(updatedBlogData));
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <form className="max-w-lg mx-auto" onSubmit={onFormSubmission}>
          <h1 className="text-4xl font-bold mb-8">Edit Blog</h1>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="topic" className="block text-gray-700 font-bold mb-2">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white hover:bg-white hover:text-black hover:border-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;