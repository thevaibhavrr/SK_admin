import React, { useEffect, useState } from 'react'
import { makeApi } from '../../api/callApi'
import axios from 'axios'
import {  useNavigate } from "react-router-dom";


function AddBanner() {
    const navigate = useNavigate();


    const [offerBanner, setOfferBanner] = useState()
    const [BannerFor, setBannerFor] = useState("")
    console.log("------------", offerBanner);
    const [loading, setLoading] = useState(true)

    const HandelSubmitBanner = async (e) => {
        e.preventDefault()
        const banner = {
            bannerImage: offerBanner,
            BannerFor
        }
        try {
            setLoading(true)
            const bannerData = await makeApi("/api/create-banner", "POST", banner)
        } catch (error) {
            console.log(error);  
        } finally {
            setLoading(false)
            navigate("/admin/offer-banner")

        }
    }


    const handleImageUpload = async (event, index) => {
        try {
            const file = event.target.files[0];

            // if (file.type.startsWith("image/")) {
            if (file) {
                console.log(file);

                const compressedFile = await file;

                const data = new FormData();
                data.append("file", compressedFile);
                data.append("upload_preset", "ou1fk438");

                await axios
                    .post(
                        `https://api.cloudinary.com/v1_1/dyl3gzm7d/image/upload`,

                        data
                    )
                    .then((response) => {
                        if (response.status === 200) {
                            const imageURL = response.data.url;
                            setOfferBanner(imageURL);
                        }
                    });
            }
        } catch (error) {
            console.log("image upload error", error);
        }
    };

    return (
        <div className='container my-4'>
        <div className="row">
            <div className="col-12 mb-3">
                <h2>Add Banner</h2>
            </div>
    
            <div className="col-12">
                <div className="mb-3">
                    <label className="form-label">Banner For</label>
                    <input type="text" className="form-control" onChange={(e) => setBannerFor(e.target.value)} />
                </div>
    
                {/* file upload */}
                <div>
                    <h5>Upload Banner</h5>
                    <form className="file-upload-form file_upload_form_upload_image d-flex justify-content-between align-items-center">
                        <div>
                            <label htmlFor="file" className="file-upload-label btn btn-outline-primary">
                                <div className="file-upload-design text-center p-3">
                                    
                                    <input
                                        id="file"
                                        type="file"
                                        className="form-control"
                                        onChange={(e) => handleImageUpload(e)}
                                    />
                                </div>
                            </label>
                        </div>
                        <div>
                            {offerBanner === "" ? (
                                <img load="lazy"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWRhb8uI0vKINdZJCfOmdIWu0uMBsKNCzlAk2myawr1rr3xFE-5g_B575p5H9V5S5nH3E&usqp=CAU"
                                    alt="no image"
                                    className="img-thumbnail"
                                    width={150}
                                    height={150}
                                />
                            ) : (
                                <img load="lazy" src={offerBanner} alt="thumbnail" className="img-thumbnail" width={150} height={150} />
                            )}
                        </div>
                    </form>
                </div>
    
            </div>
    
            <div className="col-12 mt-3">
                <button className='btn btn-success' onClick={(e) => HandelSubmitBanner(e)}>Save</button>
            </div>
    
        </div>
    </div>
    
    )
}

export default AddBanner