import React, { useState, useEffect } from "react";
import AdminSidebar from '../../components/Layout/admin/adminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import AdminHeader from '../../components/Layout/admin/adminheader'
import "./Admindashboard.css"


const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState("");
  const [category, setCategory] = useState("");
  const [InStock, setInStock] = useState("");
  const [Featured, setFeatured] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);


    setSelectedImages((previousImages) => previousImages.concat(selectedFilesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };
  const deleteHandler = (file) => {
    const remainingImages = selectedImages.filter((f) => f !== file);
    setSelectedImages(remainingImages);


    const objectUrlToDelete = URL.createObjectURL(file);


    URL.revokeObjectURL(objectUrlToDelete);
  };

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {

      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      for (let img of selectedImages) {
        productData.append("images", img)
      }

      productData.append("mrp", mrp);
      productData.append("category", category);
      productData.append("InStock", InStock);
      productData.append("isFeatured", Featured);

      const { data } = await axios.post("/api/v1/product/create-product", productData);


      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/manage.vision/admin/products");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };


  return (
    <body className='body'>
      <div className="container-fluid ">
        <div className="row">
          <AdminHeader />

          <AdminSidebar />

          <div className="col-md-3">
            <div>
              <div className="button-container">
                <button className="prcrbtn" onClick={() => { navigate("/dashboard/manage.vision/admin/products") }}>Cancel</button>
                <button onClick={handleCreate} className="prcrbtn">Create</button>
              </div>
              <div className="prgrid">
                <div className='upimg'>
                  <h4 className="prhead">Product Images<hr></hr>
                  </h4>
                  <div style={{ padding: "20px" }}>
                    <input type="file" id='upload' accept="image/png, image/jpeg,image/webp" onChange={onSelectFile} multiple >

                    </input><label className="label" for="upload"><h1 style={{ fontSize: "70px" }}>+</h1></label>
                    <div className="images">
                      {selectedImages &&
                        selectedImages.map((image, index) => {

                          return (
                            <div key={index} className="image">
                              <img src={URL.createObjectURL(image)} alt="upload" className="primg" />
                              <FontAwesomeIcon icon={faTrashCan} className="prdele" onClick={() => deleteHandler(image)} />
                              <p className="imgno">{index + 1}</p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="prcat">
                  <h4 className="prhead">Product Catagory</h4><hr></hr>

                  <Form.Select className="catsel" onChange={(e) => setCategory(e.target.value)
                  }><option>Select Catagory</option>{categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                  </Form.Select>
                  <div style={{padding:"20px"}}>
                    <label>
                      <input
                       style={{display:"block"}}
                        type="radio"
                        name="featured"
                        value="true"
                        checked={Featured}
                        onChange={() => setFeatured(true)}
                      />
                      Featured&nbsp; &nbsp; 
                    </label>
                    <label>
                      <input style={{display:"block"}}
                        type="radio"
                        name="featured"
                        value="false"
                        checked={!Featured}
                        onChange={() => setFeatured(false)}
                      />
                      Not Featured
                    </label>
                  </div>
                </div>
              </div>
              <div className="prinfo">
                <h4 className="prhead">Product Info</h4><hr></hr>

                <Form.Label htmlFor="prname" className="prlab">Name</Form.Label>
                <Form.Control
                  type="text"
                  id="prname"
                  value={name}
                  placeholder="Product Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="prlab">Description</Form.Label>
                  <Form.Control as="textarea" rows={3} className="prdes" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
              </div>
              <div className="prprice">
                <h4 className="prhead">Product Pricing</h4><hr></hr>
                <Form.Label htmlFor="prpice" className="prlab">Maximum Retail Price</Form.Label>
                <Form.Control
                  type="number"
                  id="prpice"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  required
                />
              </div>
              <div className="prprice">
                <h4 className="prhead">Inventory Status</h4><hr></hr>
                <Form.Label htmlFor="prpice" className="prlab">Status</Form.Label>
                <Form.Select aria-label="Default select example" className="stat" value={InStock} onChange={(e) => setInStock(e.target.value)}>
                  <option >Update Status</option>
                  <option value="0">In Stock</option>
                  <option value="1">Out Of Stock</option>
                </Form.Select></div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}


export default CreateProduct