import React from "react";
import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import classes from "./create.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { request } from "../../utils/fetchApi";

const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const categories = [
    "nature",
    "music",
    "travel",
    "design",
    "programming",
    "fun",
    "fashion",
  ];

  const onChangeFile = (e) => {
    setImg(e.target.files[0]);
  };

  const handleCloseImg = () => {
    setImg(null);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      let filename = null;
      if (img) {
        filename = crypto.randomUUID() + img.name;
        formData.append("filename", filename);
        formData.append("image", img);

        await fetch(`http://localhost:5001/upload`, {
          method: "POST",
          body: formData,
        });
      } else {
        return;
      }

      const options = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const body = {
        title,
        desc,
        category,
        photo: filename,
      };

      const data = await request("/blog", "POST", options, body);
      navigate(`/blogDetails/${data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleCreateBlog = async (e) => {
  //   e.preventDefault();

  //   if (!img) return alert("Please upload an image!");

  //   try {
  //     const formData = new FormData();
  //     formData.append("image", img);

  //     // Upload image only, get filename from backend response
  //     const res = await fetch("http://localhost:5001/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!res.ok) throw new Error("Image upload failed");

  //     const data = await res.json();
  //     const filename = data.filename;

  //     // Now create blog post with returned filename
  //     const options = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };

  //     const body = JSON.stringify({
  //       title,
  //       desc,
  //       category,
  //       photo: filename,
  //     });

  //     const blogRes = await fetch("http://localhost:5001/blog", {
  //       method: "POST",
  //       headers: options,
  //       body,
  //     });

  //     if (!blogRes.ok) throw new Error("Blog creation failed");

  //     const blogData = await blogRes.json();
  //     navigate(`/blogDetails/${blogData._id}`);
  //   } catch (error) {
  //     console.error(error);
  //     alert(error.message);
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>Create Blog</h2>
          <form onSubmit={handleCreateBlog} encType="multipart/form-data">
            <div className={classes.inputWrapper}>
              <label>Title: </label>
              <input
                type="text"
                placeholder="Title..."
                className={classes.input}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapper}>
              <label>Description: </label>
              <input
                type="text"
                placeholder="Description..."
                className={classes.input}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapperSelect}>
              <label>Category: </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={crypto.randomUUID()} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className={classes.inputWrapperImg}>
              <label htmlFor="image" className={classes.labelFileInput}>
                Image: <span>Upload here</span>
              </label>
              <input
                id="image"
                type="file"
                className={classes.input}
                onChange={onChangeFile}
                style={{ display: "none" }}
              />
              {img && (
                <p className={classes.imageName}>
                  {img.name}{" "}
                  <AiOutlineCloseCircle
                    className={classes.closeIcon}
                    onClick={() => handleCloseImg()}
                  />
                </p>
              )}
            </div> */}
            <div className={classes.inputWrapperImg}>
              <label htmlFor="image" className={classes.labelFileInput}>
                Image: <span>Upload here</span>
              </label>
              <input
                id="image"
                type="file"
                className={classes.input}
                onChange={onChangeFile}
                style={{ display: "none" }}
              />
              {img && (
                <>
                  <p className={classes.imageName}>
                    {img.name}{" "}
                    <AiOutlineCloseCircle
                      className={classes.closeIcon}
                      onClick={handleCloseImg}
                    />
                  </p>
                  <img
                    src={URL.createObjectURL(img)}
                    alt="Preview"
                    style={{
                      maxWidth: "300px",
                      marginTop: "10px",
                      borderRadius: "10px",
                    }}
                  />
                </>
              )}
            </div>

            <div className={classes.buttonWrapper}>
              <button className={classes.submitBtn} type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Create;

// //Render

// import React, { useState } from "react";
// import Footer from "../../components/footer/Footer";
// import Navbar from "../../components/navbar/Navbar";
// import classes from "./create.module.css";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineCloseCircle } from "react-icons/ai";

// const Create = () => {
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [img, setImg] = useState(null); // local file for preview
//   const [filename, setFilename] = useState(null); // uploaded filename from backend
//   const [category, setCategory] = useState("");
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);

//   const categories = [
//     "nature",
//     "music",
//     "travel",
//     "design",
//     "programming",
//     "fun",
//     "fashion",
//   ];

//   // Upload image immediately on file select
//   const handleFileUpload = async (file) => {
//     setImg(file); // preview the selected file

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await fetch("http://localhost:5001/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Image upload failed");

//       const data = await res.json();
//       setFilename(data.filename); // save backend filename
//     } catch (err) {
//       console.error("Error uploading file:", err);
//       alert("Image upload failed");
//       setImg(null);
//       setFilename(null);
//     }
//   };

//   const handleCloseImg = () => {
//     setImg(null);
//     setFilename(null);
//   };

//   const handleCreateBlog = async (e) => {
//     e.preventDefault();

//     if (!filename) return alert("Please upload an image!");

//     try {
//       const options = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       };

//       const body = JSON.stringify({
//         title,
//         desc,
//         category,
//         photo: filename,
//       });

//       const blogRes = await fetch("http://localhost:5001/blog", {
//         method: "POST",
//         headers: options,
//         body,
//       });

//       if (!blogRes.ok) throw new Error("Blog creation failed");

//       const blogData = await blogRes.json();
//       navigate(`/blogDetails/${blogData._id}`);
//     } catch (error) {
//       console.error(error);
//       alert(error.message);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className={classes.container}>
//         <div className={classes.wrapper}>
//           <h2 className={classes.title}>Create Blog</h2>
//           <form onSubmit={handleCreateBlog} encType="multipart/form-data">
//             <div className={classes.inputWrapper}>
//               <label>Title: </label>
//               <input
//                 type="text"
//                 placeholder="Title..."
//                 className={classes.input}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </div>
//             <div className={classes.inputWrapper}>
//               <label>Description: </label>
//               <input
//                 type="text"
//                 placeholder="Description..."
//                 className={classes.input}
//                 onChange={(e) => setDesc(e.target.value)}
//                 required
//               />
//             </div>
//             <div className={classes.inputWrapperSelect}>
//               <label>Category: </label>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 required
//               >
//                 <option value="" disabled>
//                   Select category
//                 </option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className={classes.inputWrapperImg}>
//               <label htmlFor="image" className={classes.labelFileInput}>
//                 Image: <span>Upload here</span>
//               </label>
//               <input
//                 id="image"
//                 type="file"
//                 className={classes.input}
//                 onChange={(e) => handleFileUpload(e.target.files[0])}
//                 style={{ display: "none" }}
//                 accept="image/*"
//                 required
//               />
//               {img && (
//                 <>
//                   <p className={classes.imageName}>
//                     {img.name}{" "}
//                     <AiOutlineCloseCircle
//                       className={classes.closeIcon}
//                       onClick={handleCloseImg}
//                     />
//                   </p>
//                   <img
//                     src={URL.createObjectURL(img)}
//                     alt="Preview"
//                     style={{
//                       maxWidth: "300px",
//                       marginTop: "10px",
//                       borderRadius: "10px",
//                     }}
//                   />
//                 </>
//               )}
//             </div>

//             <div className={classes.buttonWrapper}>
//               <button className={classes.submitBtn} type="submit">
//                 Submit form
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Create;
