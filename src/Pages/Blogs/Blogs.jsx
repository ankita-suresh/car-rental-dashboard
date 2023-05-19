/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import blog1 from '../../Images/man1.jpg';
import blog2 from '../../Images/woman1.jpg';
import blog3 from '../../Images/man2.jpg';
import blog4 from '../../Images/woman2.jpg';
import blog5 from '../../Images/man4.jpg';
import blog6 from '../../Images/man5.jpg';
import './blogs.scss';

const userData = [
    {
        id: '630343eb94c2812e4cd7e45d',
        title: 'They have Newer Cars, very clean and very comfortable. We had reserved mid-size car but got a great deal to upgrade SUV and it was worth it. Brand new Buick. ',
        author: 'devidbom23',
        image: blog1,
        createdAt: new Date(Date.now()).toLocaleString(),
    },
    {
        id: '6303234eb94c2812e4cd7e45e',
        title: 'It was a good experience overall',
        author: 'john03',
        image: blog2,
        createdAt: new Date(Date.now()).toLocaleString(),
    },
    {
        id: 'e40343eb94c2812e4cd7e4233',
        title: 'The cars were rented on affordable prices',
        author: 'dilvibhasanjohn',
        image: blog4,
        createdAt: new Date(Date.now()).toLocaleString(),
    },
    {
        id: '930343eb94c2812e4cd7e45g',
        title: 'Would defenitely recommend this.',
        author: 'doejelia88',
        image: blog5,
        createdAt: new Date(Date.now()).toLocaleString(),
    },
    {
        id: '60443eb94c2812e4cd7e45ii',
        title: 'nice trip thanks, enjoy sevice and comfortable car',
        author: 'lucashossel',
        image: blog6,
        createdAt: new Date(Date.now()).toLocaleString(),
    },
    {
        id: 'e23343eb94c2812e4cd7e45kk',
        title: 'Great price and very convenient,the car was clean and worked fine',
        author: 'anniejhon',
        image: blog3,
        createdAt: new Date(Date.now()).toLocaleString(),
    },
];

function Blogs({ type }) {
    const [data, setData] = useState(userData);

    const handleDlt = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 310,
            renderCell: (param) => (
                <div className="userr">
                    <img src={param.row.image} alt="User Image" className="userr_image" />
                    {param.row.id}
                </div>
            ),
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 400,
            style: { color: 'red' },
        },
        { field: 'author', headerName: 'Customer', width: 170 },
        { field: 'createdAt', headerName: 'CreatedAt', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => (
                <div className="actionn">
                    <Link to={params.row.id}>
                        <button type="button" className="view_btn">
                            View
                        </button>
                    </Link>
                    <button
                        type="button"
                        className="delete_btn"
                        onClick={() => handleDlt(params.row.id)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="blog_page">
            <Sidebar />

            <div className="blog_page_main">
                <Navbar />

                <div className="blog_page_table">
                    <div className="btnn">
                        <Link
                            to={`/${
                                type === 'blog' ? 'blogs' : 'user' ? 'users' : 'products'
                            }/addnew`}
                            style={{ textDecoration: 'none' }}
                        >
                            <button type="button">Add New {type}</button>
                        </Link>
                    </div>
                    <DataGrid
                        className="data_grid"
                        rows={data}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />
                </div>
            </div>
        </div>
    );
}

export default Blogs;
