/* eslint-disable react/no-array-index-key */
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';

import './blogdetail.scss';

function BlogDetail() {
    const blogDetail = {
        id: 1,

        title: 'Newer cars, clean and comfortable',
        tags: ['Travel', 'Communication', 'Tourist Guide'],
        text: [
            ' They have Newer Cars, very clean and very comfortable. We had reserved mid-size car but got a great deal to upgrade SUV and it was worth it. Brand new Buick. ',
            'We had a great experience with reliable car rental! There was only one car remaining in the class of vehicle we reserved, which ended up having a safety recall. We were promptly upgraded and sent on our way. I was a bit taken aback when we were handed the keys and told to let them know if there were any concerns, but on a brand new vehicle there were none.',
        ],
        createdAt: new Date().toDateString(),
        views: 122,
    };

    return (
        <div className="blog_details">
            <Sidebar />

            <div className="detail_page_main">
                <Navbar />

                <div className="blog_detailss">
                    <h1>{blogDetail.title}</h1>

                    <div className="blog_detail_tv">
                        <p>
                            <CalendarMonthIcon style={{ marginRight: '3px' }} />
                            {blogDetail.createdAt}
                        </p>
                        <p>
                            <RemoveRedEyeIcon style={{ marginRight: '3px' }} />
                            {blogDetail.views} views
                        </p>
                    </div>

                    {blogDetail.text.map((t) => (
                        <p className="blog_detail_txt">{t}</p>
                    ))}

                    <div className="tags">
                        <h3>Tags:</h3>
                        {blogDetail.tags.map((tag, i) => (
                            <span className="blog_detail_tag" key={i}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
