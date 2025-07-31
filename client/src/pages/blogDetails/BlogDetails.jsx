// import React from "react";
// import { useState } from "react";
// import classes from "./blogDetails.module.css";
// import { useParams, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { request } from "../../utils/fetchApi";
// import Footer from "../../components/footer/Footer";
// import Navbar from "../../components/navbar/Navbar";
// import { format } from "timeago.js";
// import {
//   AiFillEdit,
//   AiFillLike,
//   AiFillDelete,
//   AiOutlineArrowRight,
//   AiOutlineLike,
// } from "react-icons/ai";

// const BlogDetails = () => {
//   const [blogDetails, setBlogDetails] = useState("");
//   const [isLiked, setIsLiked] = useState(false);
//   const { id } = useParams();
//   const { user, token } = useSelector((state) => state.auth);

//   // useEffect(
//   //   () => {
//   //     const fetchBlogDetails = async () => {
//   //       try {
//   //         const options = { Authorization: `Bearer ${token}` };
//   //         const data = await request(`/blog/find/${id}`, "GET", options);
//   //         setBlogDetails(data);
//   //         setIsLiked(data.likes.includes(user._id));
//   //       } catch (error) {
//   //         console.error(error);
//   //       }
//   //     };
//   //     fetchBlogDetails();
//   //   },
//   //   // [id]);
//   //   [id, token, user._id]
//   // );

//   // like
//   useEffect(() => {
//     const fetchBlogDetails = async () => {
//       try {
//         const options = token ? { Authorization: `Bearer ${token}` } : {};
//         const data = await request(`/blog/find/${id}`, "GET", options);
//         setBlogDetails(data);
//         if (user) {
//           setIsLiked(data.likes.includes(user._id));
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchBlogDetails();
//   }, [id, token, user?._id]);

//   const handleLikePost = async () => {
//     try {
//       const options = { Authorization: `Bearer ${token}` };
//       await request(`/blog/likeBlog/${id}`, "PUT", options);
//       setIsLiked((prev) => !prev);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // delete
//   const handleDeleteBlog = async () => {
//     try {
//       const options = { Authorization: `Bearer ${token}` };
//       await request(`/blog/deleteBlog/${id}`, "DELETE", options);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className={classes.container}>
//         <Link to="/" className={classes.goBack}>
//           Go Back <AiOutlineArrowRight />
//         </Link>
//         <div className={classes.wrapper}>
//           {/* <img src={`http://localhost:5001/images/${blogDetails?.photo}`} /> */}
//           <img
//             // src={`http://localhost:5001/images/${blogDetails?.photo}`
//             // src={`${BASE_URL}/images/${blogDetails?.photo}`}
//             src={`https://myblogapp-1.onrender.com/images/${blogDetails?.photo}`}
//             alt={blogDetails?.title || "Blog"}
//           />

//           <div className={classes.titleAndControls}>
//             <h3 className={classes.title}>{blogDetails?.title}</h3>
//             {blogDetails?.userId?._id === user._id ? (
//               <div className={classes.controls}>
//                 <Link
//                   to={`/updateBlog/${blogDetails?._id}`}
//                   className={classes.edit}
//                 >
//                   <AiFillEdit />
//                 </Link>
//                 <div className={classes.delete}>
//                   <AiFillDelete onClick={handleDeleteBlog} />
//                 </div>
//               </div>
//             ) : (
//               <>
//                 {isLiked ? (
//                   <div className={classes.like}>
//                     <AiFillLike onClick={handleLikePost} />
//                   </div>
//                 ) : (
//                   <div className={classes.like}>
//                     <AiOutlineLike onClick={handleLikePost} />
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//           <div className={classes.descAndLikesViews}>
//             <p className={classes.desc}>
//               <span>Description: </span>
//               {blogDetails?.desc}
//             </p>
//             <div className={classes.likesAndViews}>
//               <span>{blogDetails?.views} views</span>
//               <span>{blogDetails?.likes?.length} likes</span>
//             </div>
//           </div>
//           <div className={classes.authorAndCreatedAt}>
//             <span>
//               <span>Author:</span> {blogDetails?.userId?.username}
//             </span>
//             <span>
//               <span>Created At:</span> {format(blogDetails?.createdAt)}
//             </span>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default BlogDetails;

// //Working but No image

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { format } from "timeago.js";
// import { request, BASE_URL } from "../../utils/fetchApi";
// import classes from "./blogDetails.module.css";
// import { MdOutlinePreview } from "react-icons/md";
// import { AiFillLike } from "react-icons/ai";

// const BlogDetails = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);

//   useEffect(() => {
//     const fetchBlogDetails = async () => {
//       try {
//         const data = await request(`/blog/${id}`, "GET");
//         setBlog(data);
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//       }
//     };

//     fetchBlogDetails();
//   }, [id]);

//   if (!blog) return <p>Loading blog details...</p>;

//   return (
//     <div className={classes.container}>
//       <div className={classes.wrapper}>
//         <h2>{blog.title}</h2>
//         <img
//           src={`${BASE_URL}/images/${blog.photo?.trim()}`}
//           alt={blog.title}
//           className={classes.image}
//         />
//         <div className={classes.details}>
//           <p className={classes.desc}>{blog.desc}</p>
//           <div className={classes.meta}>
//             <span>
//               <strong>Author:</strong> {blog.userId?.username}
//             </span>
//             <span>
//               <strong>Created:</strong> {format(blog.createdAt)}
//             </span>
//             <span>
//               <MdOutlinePreview /> {blog.views} views
//             </span>
//             <span>
//               <AiFillLike /> {blog.likes?.length} likes
//             </span>
//             <span>
//               <strong>Category:</strong> {blog.category}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { request } from "../../utils/fetchApi";
// import classes from "./blogDetails.module.css";

// const BlogDetails = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [error, setError] = useState(null);

//   const PF = process.env.REACT_APP_BACKEND_URL + "/images/";

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const data = await request(`/blog/find/${id}`, "GET");
//         setBlog(data);
//       } catch (err) {
//         setError("Blog not found or server error.");
//         console.error("Error fetching blog details:", err);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   if (error) {
//     return <div className="blog-details-error">{error}</div>;
//   }

//   if (!blog) {
//     return <div className="blog-details-loading">Loading blog...</div>;
//   }

//   return (
//     <div className="blog-details-container">
//       <h1 className="blog-title">{blog.title}</h1>

//       <div className="blog-meta">
//         <span>
//           By <strong>{blog.userId?.username || "Unknown Author"}</strong>
//         </span>
//         <span> • {new Date(blog.createdAt).toLocaleDateString()}</span>
//         <span> • {blog.views} views</span>
//       </div>

//       {blog.photo && (
//         <img
//           src={PF + blog.photo}
//           alt="blog"
//           className="blog-image"
//           onError={(e) => {
//             e.target.src =
//               "https://via.placeholder.com/600x300?text=Image+not+found";
//           }}
//         />
//       )}

//       <p className="blog-description">{blog.description}</p>

//       <div className="blog-category">
//         <strong>Category:</strong> {blog.category}
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;

//Render 1

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { request } from "../../utils/fetchApi";
// import classes from "./blogDetails.module.css";
// import Footer from "../../components/footer/Footer";
// import Navbar from "../../components/navbar/Navbar";

// const BlogDetails = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [error, setError] = useState(null);

//   const PF = process.env.REACT_APP_BACKEND_URL + "/images/";

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const data = await request(`/blog/find/${id}`, "GET");
//         setBlog(data);
//       } catch (err) {
//         setError("Blog not found or server error.");
//         console.error("Error fetching blog details:", err);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   if (error) return <div className={classes.error}>{error}</div>;
//   if (!blog) return <div className={classes.loading}>Loading blog...</div>;

//   return (
//     <div>
//       <Navbar />
//       <div className={classes.container}>
//         <div className={classes.header}>
//           <h1>{blog.title}</h1>
//           <div className={classes.meta}>
//             <span>
//               By <strong>{blog.userId?.username || "Unknown"}</strong>
//             </span>
//             <span> • {new Date(blog.createdAt).toLocaleDateString()}</span>
//             <span> • {blog.views} views</span>
//           </div>
//         </div>
//         <div className={classes.contentWrapper}>
//           <div className={classes.imageWrapper}>
//             <img
//               src={PF + blog.photo}
//               alt="Blog"
//               onError={(e) => {
//                 e.target.src =
//                   "https://via.placeholder.com/400x300?text=Image+not+found";
//               }}
//             />
//           </div>

//           <div className={classes.textContent}>
//             <div className={classes.category}>
//               <strong>Category:</strong> {blog.category}
//             </div>
//             <p className={classes.description}>{blog.description}</p>

//             <div className={classes.body}>
//               <h3>Introduction</h3>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
//                 posuere erat a ante. Someone famous in Source Title. Curabitur
//                 at pulvinar orci, sed sagittis libero.
//               </p>

//               <h3>Details</h3>
//               <p>
//                 Aliquam tincidunt, ex vitae iaculis gravida, sapien lorem
//                 faucibus tellus, a tincidunt orci leo a justo. Proin at varius
//                 augue. Nullam sed porttitor magna. Nunc in dolor nec libero
//                 finibus volutpat.
//               </p>

//               <h3>Conclusion</h3>
//               <p>
//                 Vestibulum eu ante in erat efficitur imperdiet. Suspendisse
//                 vitae orci in odio luctus faucibus. Integer tincidunt, purus sed
//                 luctus hendrerit, lorem nulla luctus arcu, sit amet tempor nulla
//                 mauris at ex.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className={classes.people}>
//           <h2>What people say</h2>
//           <div className={classes.testimonials}>
//             <div className={classes.testimonial}>
//               <p>"This blog really helped me understand the topic clearly."</p>
//               <span>- Alex J.</span>
//             </div>
//             <div className={classes.testimonial}>
//               <p>
//                 "Insightful and well-written. Looking forward to more content!"
//               </p>
//               <span>- Priya M.</span>
//             </div>
//             <div className={classes.testimonial}>
//               <p>"I love the layout and depth. Perfect for beginners."</p>
//               <span>- Marco P.</span>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;

//Render 2
// src/pages/blogDetails/BlogDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classes from "./blogDetails.module.css";
// import React from "react";
// import { useState } from "react";
// import classes from "./blogDetails.module.css";
// import { useParams, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { request } from "../../utils/fetchApi";
// import Footer from "../../components/footer/Footer";
// import Navbar from "../../components/navbar/Navbar";
// import { format } from "timeago.js";
// import {
//   AiFillEdit,
//   AiFillLike,
//   AiFillDelete,
//   AiOutlineArrowRight,
//   AiOutlineLike,
// } from "react-icons/ai";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/blog/get/${id}`
        );
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Blog not found or server error.");
      }
    };
    fetchBlog();
  }, [id]);

  if (error) return <div className={classes.error}>{error}</div>;
  if (!blog) return <div className={classes.loading}>Loading...</div>;

  return (
    <div className={classes.blogDetails}>
      <h1 className={classes.title}>{blog.title}</h1>
      <p className={classes.author}>By {blog.userId?.username || "Unknown"}</p>
      <img
        className={classes.image}
        src={`${process.env.REACT_APP_BACKEND_URL}/images/${blog.photo}`}
        alt={blog.title}
      />
      <p className={classes.category}>Category: {blog.category}</p>
      <p className={classes.desc}>{blog.desc}</p>
      <p className={classes.meta}>
        Views: {blog.views} | Created:{" "}
        {new Date(blog.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default BlogDetails;
