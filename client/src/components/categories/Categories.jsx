// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { request } from "../../utils/fetchApi";
// import { format } from "timeago.js";
// import { Link } from "react-router-dom";
// import classes from "./categories.module.css";
// import { MdOutlinePreview } from "react-icons/md";
// import { AiFillLike } from "react-icons/ai";
// import { FiArrowRight } from "react-icons/fi";

// const Categories = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const categories = [
//     "all",
//     "nature",
//     "music",
//     "travel",
//     "design",
//     "programming",
//     "fun",
//     "fashion",
//   ];

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const data = await request("/blog/getAll", "GET");
//         setBlogs(data);
//         setFilteredBlogs(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   useEffect(() => {
//     if (activeCategory === "all") {
//       setFilteredBlogs(blogs);
//     } else {
//       setFilteredBlogs((prev) => {
//         const filteredBlogs = blogs.filter(
//           (blog) => blog.category.toLowerCase() === activeCategory.toLowerCase()
//         );

//         return filteredBlogs;
//       });
//     }
//   }, [activeCategory]);

//   return (
//     <div className={classes.container}>
//       <div className={classes.wrapper}>
//         <h3>Select a category</h3>
//         <div className={classes.categoriesAndBlogs}>
//           <div className={classes.categories}>
//             {categories.map((category) => (
//               <span
//                 key={crypto.randomUUID()}
//                 className={`${classes.category} ${
//                   activeCategory === category && classes.active
//                 }`}
//                 onClick={() => setActiveCategory((prev) => category)}
//               >
//                 {category}
//               </span>
//             ))}
//           </div>
//           {filteredBlogs?.length > 0 ? (
//             <div className={classes.blogs}>
//               {filteredBlogs?.map((blog) => (
//                 <div key={blog._id} className={classes.blog}>
//                   <Link to={`/blogDetails/${blog?._id}`}>
//                     <img src={`http://localhost:5001/images/${blog?.photo}`} />
//                   </Link>
//                   <div className={classes.blogData}>
//                     <div className={classes.categoryAndMetadata}>
//                       <span className={classes.category}>{blog?.category}</span>
//                       <div className={classes.metadata}>
//                         <MdOutlinePreview /> {blog.views} views
//                       </div>
//                       <div className={classes.metadata}>
//                         <AiFillLike /> {blog?.likes?.length} likes
//                       </div>
//                     </div>
//                     <h4>{blog?.title}</h4>
//                     <p className={classes.blogDesc}>{blog?.desc}</p>
//                     <div className={classes.authorAndCreatedAt}>
//                       <span>
//                         <span>Author:</span> {blog?.userId?.username}
//                       </span>
//                       <span>
//                         <span>Created:</span> {format(blog?.createdAt)}
//                       </span>
//                     </div>
//                     <Link
//                       to={`/blogDetails/${blog._id}`}
//                       className={classes.readMore}
//                     >
//                       Read More <FiArrowRight />
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <h3 className={classes.noBlogsMessage}>No blogs</h3>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;

import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import classes from "./categories.module.css";
import { MdOutlinePreview } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";

import { request } from "../../utils/fetchApi";

const Categories = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = [
    "all",
    "nature",
    "music",
    "travel",
    "design",
    "programming",
    "fun",
    "fashion",
  ];

  // Fetch blogs based on active category
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      try {
        let data;
        // if (activeCategory === "all") {
        //   data = await request("/blog/getAll", "GET");
        // } else {
        //            data = await request(`/blog/category/${activeCategory}`, "GET");
        // }
        // const BASE_URL = "https://blogapp-hv1n.onrender.com";

        if (activeCategory === "all") {
          data = await request(`${BASE_URL}/blog/getAll`, "GET");
        } else {
          data = await request(
            `${BASE_URL}/blog/category/${activeCategory}`,
            "GET"
          );
        }

        console.log("Active category:", activeCategory);
        console.log("Fetched blogs:", data);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      }
    };

    fetchBlogsByCategory();
  }, [activeCategory]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h3>Select a category</h3>
        <div className={classes.categoriesAndBlogs}>
          <div className={classes.categories}>
            {categories.map((category) => (
              <span
                key={crypto.randomUUID()}
                className={`${classes.category} ${
                  activeCategory === category ? classes.active : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </span>
            ))}
          </div>

          {blogs.length > 0 ? (
            <div className={classes.blogs}>
              {blogs.map((blog) => {
                console.log("Blog object:", blog);
                console.log(
                  "Image URL:",
                  `http://localhost:5001/images/${blog.photo?.trim()}`
                );
                {
                }

                return (
                  <div key={blog._id} className={classes.blog}>
                    <h4>{blog.title}</h4>
                    <Link to={`/blogDetails/${blog._id}`}>
                      {/* <img
                        className={classes.blogImage}
                        src={`http://localhost:5001/images/${
                          blog.photo?.trim?.() || "design.jpg"
                        }`}
                        alt={blog.title}
                      /> */}
                      <img
                        className={classes.blogImage}
                        src={`https://blogapp-hv1n.onrender.com/images/${
                          blog.photo?.trim() || "design.jpg"
                        }`}
                        alt={blog.title}
                      />
                    </Link>

                    <div className={classes.blogData}>
                      <div className={classes.categoryAndMetadata}>
                        <span className={classes.category}>
                          {blog.category}
                        </span>
                        <div className={classes.metadata}>
                          <MdOutlinePreview /> {blog.views} views
                        </div>
                        <div className={classes.metadata}>
                          <AiFillLike /> {blog.likes.length} likes
                        </div>
                      </div>
                      {/* <h4>{blog.title}</h4> */}
                      <p className={classes.blogDesc}>{blog.desc}</p>
                      <div className={classes.authorAndCreatedAt}>
                        <span>
                          <strong>Author:</strong> {blog.userId?.username}
                        </span>
                        <span>
                          <strong>Created:</strong> {format(blog.createdAt)}
                        </span>
                      </div>
                      <Link
                        to={`/blogDetails/${blog._id}`}
                        className={classes.readMore}
                      >
                        Read More <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h3 className={classes.noBlogsMessage}>No blogs</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
