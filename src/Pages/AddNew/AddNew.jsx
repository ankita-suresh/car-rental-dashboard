/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { projectStorage } from '../../firebase/config';
import useAuthContext from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import noImage from '../../Images/photo-camera.png';
import './New.scss';

function AddNew({ inputs, titlee, type }) {
    let dynamicInpVal;

    // dynamically change the state values
    switch (type) {
        case 'USER':
            dynamicInpVal = {
                username: '',
                name: '',
                email: '',
                password: '',
                address: '',
            };
            break;
        case 'PRODUCT':
            dynamicInpVal = {
                title: '',
                description: '',
                category: '',
                price: '',
                stock: '',
            };
            break;
        case 'BLOG':
            dynamicInpVal = {
                title: '',
                description: '',
                tags: '',
            };
            break;
        default:
            break;
    }
    // eslint-disable-next-line prefer-const
    let [userInp, setUserInp] = useState(dynamicInpVal);
    const navigate = useNavigate();
    const [file, setFile] = useState('');
    const { addDocument, response } = useFirestore('transactions');
    const image = false;
    const { user } = useAuthContext();
    const [thumbnailError, setThumbnailError] = useState(null);
    const [thumbnail, setThumbnail] = useState();
    // Dynamicaly change the data for different pages

    const handleFileChange = async (e) => {
        // eslint-disable-next-line prefer-const
        setThumbnail(e);

        setFile(e.target.files[0]);
        const selected = e.target.files[0];
        if (!selected) {
            setThumbnailError('Please select a file');
            return;
        }
        if (!selected.type.includes('image')) {
            setThumbnailError('Select file must be an image');
            return;
        }
        if (!selected.size > 500000) {
            setThumbnailError('Image file size must be less than 500kb');
            // eslint-disable-next-line no-useless-return
            return;
        }
        setThumbnailError(null);
    };
    const handleChange = (e) => {
        setUserInp({ ...userInp, [e.target.name]: e.target.value });
    };
    const metadata = {
        contentType: 'image/png',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadPath = `thumbnail/${thumbnail.target.files[0].name}`;
        console.log(thumbnail.target.files[0].name);
        const img = await projectStorage.ref(uploadPath).put(thumbnail, metadata);
        const imgUrl = await img.ref.getDownloadURL();
        const finalInp = { ...userInp, imgUrl };
        addDocument(finalInp);
    };
    useEffect(() => {
        if (response.success) {
            console.log('setting all data back');
            navigate('/');
        }
    }, [response.success]);

    return (
        <div className="add_new">
            <Sidebar />

            <div className="new_page">
                <Navbar />

                <div className="new_page_main">
                    <div className="new_page_content">
                        <div className="image">
                            <p className="add_new_user">{titlee}</p>
                            <img src={file ? URL.createObjectURL(file) : noImage} alt="" />
                        </div>

                        <form onSubmit={handleSubmit} className="form">
                            <div className="form_inp">
                                <label htmlFor="file">
                                    Upload: <DriveFolderUploadIcon className="file_icon" />
                                </label>
                                {thumbnailError && <div className="error">{thumbnailError}</div>}
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>

                            {inputs.map((detail) => (
                                <Input
                                    key={detail.id}
                                    {...detail}
                                    value={userInp[detail.name]}
                                    onChange={handleChange}
                                />
                            ))}

                            <button type="submit" className="submit_btn">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNew;
