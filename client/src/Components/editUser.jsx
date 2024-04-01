import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { validateEmail, ValidateUser } from '../Validations/CommonFormValidations';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [imagePath, setImagePath] = useState(null);
  const [userData, setUserData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

// Image input change method
const imageHandler = (e) => {
    const selectedImage = e.target.files[0];
    setImagePath(selectedImage);
    // Create a URL for the selected image to show the preview
    const imageURL = URL.createObjectURL(selectedImage);
    setImagePreview(imageURL);
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const emailValidation = validateEmail(email);
    const usernameValidation = ValidateUser(username);
    


    // Check validations and toast error
    if (emailValidation || usernameValidation ) {
      toast.error(emailValidation || usernameValidation );
      return;
    }

    // Create a new form data object
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('imagePath', imagePath);

    try {
      const res = await axios.put(`https://blog-backend-kbvp.onrender.com/api/user/${id}/update`, formData, {
        // Server calling
        headers: {
          'Content-Type': 'multipart/form-data', // Multiple data content
        },
      });
       if (res && res.data) {
        // Update user data in localStorage
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          parsedUserData.username = username;
          parsedUserData.email = email; 
          // Update other fields as needed
          localStorage.setItem('user', JSON.stringify(parsedUserData));
        } 

      toast.success('Your details updated successfully , Please Login Again '); // Toast response msg
      setEmail(''); // Set email state is empty
      setUsername(''); // Set username state is empty
      setImagePath(null); // Set image state is empty
      e.target.reset(); // Reset all input fields
      //localStorage.removeItem('user')
      navigate('/dashboard'); // Navigate to dashboard
      }
    }
     catch (err) {
      console.error('Details adding failed:', err);
      toast.error('User updating failed. Please try again.'); // Toast error msg
    
  }
};


  // Delete account
  const deleteAccount = async () => {
    try {
      const res = await axios.delete(`https://blog-backend-kbvp.onrender.com/api/user/delete/${id}`);
      console.log('Server Response:', res.data);
      toast.success('Your account deleted successfully'); // Toast response msg
      localStorage.removeItem('user'); // Remove the user data from local storage
      navigate('/'); // Navigate to home page
    } catch (err) {
      console.error('Details adding failed:', err);
      toast.error('User deleting failed. Please try again.'); // Toast error msg
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (window.confirm('Are you sure to delete account?')) {
      deleteAccount();
    }
  };

  // Checking if the user is logged in and retrieve user details from local storage
  useEffect(() => {
    const storedUserData = localStorage.getItem('user');

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      setUsername(parsedUserData.username);
      setEmail(parsedUserData.email); // Added line to set email from local storage
    }
  }, []);

//   // Checking user logged in or not
// const user = JSON.parse(localStorage.getItem("user"));

// // Get user image
// const imageUrl = user ? `https://blog-backend-kbvp.onrender.com/uploads/user/${encodeURIComponent(user.imagePath.split('\\').pop())}` : ''; //extract the file name from path


  return (
    <div>
      <div className="bg-regBack bg-cover">
        <section className="overflow-hidden flex items-center justify-center w-full min-h-screen py-24">
          <div className="flex flex-col justify-center flex-1 px-4 py-20 overflow-hidden sm:px-6 lg:flex-none lg:px-20 xl:px-24 border rounded-3xl bg-white/10">
            <div className="w-full max-w-xl mx-auto lg:w-96">
              <h2 className="mt-3 text-3xl font-extrabold text-gray-800 dark:text-gray-200 text-center">
                Update Your Account
              </h2>
              <div className="mt-8">
                <div className="mt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                  
                    <div className="flex items-center justify-center">
                    {/* {imageUrl && <img src={imageUrl} alt="User" className="w-28 h-28 rounded-full" />} */}
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-28 h-28 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center p-1">
                          <p className="text-xxs text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click</span> or drag
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className=" mx-auto w-full text-blue-950 hidden"
                          onChange={imageHandler}
                        />
                      </label>
                    </div>

                  
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-800 dark:text-gray-500"
                      >
                        User Name
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          type="text"
                          autoComplete="username"
                          required=""
                          placeholder="Your username"
                          className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-800 dark:text-gray-500"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          autoComplete="email"
                          required=""
                          placeholder="Your email"
                          className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        />
                      </div>
                    </div>

                    {/* Update Account button */}
                    <div>
                      <button
                        type="submit"
                        className="flex items-center justify-center w-full px-10 py-4 text-lg font-medium text-center text-white transition duration-500 ease-in-out transform bg-yellow-600 rounded-xl hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        Update Account
                      </button>
                    </div>

                    {/* Delete Account button */}
                    <div>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="flex items-center justify-center w-full px-10 py-4 text-lg font-medium text-center text-red-800 transition duration-500 ease-in-out transform bg-white rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red hover:text-white"
                      >
                        Delete Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditUser;
