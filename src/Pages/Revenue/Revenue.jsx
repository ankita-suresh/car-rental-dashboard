import React from 'react';
import Chart from '../../Components/Chart/Chart';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import TableList from '../../Components/TableList/TableList';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import ItemLists from '../../Components/ItemLists/ItemLists';
import './Revenue.scss';

function Revenue() {
    //
    return (
        <div className="home">
            <Sidebar />

            <div className="home_main">
                <Navbar />

                <div className="bg_color" />

                <div className="chart_sec">
                    <ProgressBar />
                    <Chart height={450} title="Revenue" />
                </div>

                <div className="table">
                    <div className="title">Latest Transactions</div>
                    <TableList />
                </div>
            </div>
        </div>
    );
}

export default Revenue;
