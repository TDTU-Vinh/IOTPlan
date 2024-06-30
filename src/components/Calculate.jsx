import React from "react";
import Iframe from "react-iframe";

const MongoDBChart = () => {
    return (
        <div>
            <Iframe
                url="https://charts.mongodb.com/charts-esp32-mongodb-ksxbe/public/dashboards/e8aacc10-db67-49df-8270-52cc47c4d380"
                width="80%"
                height="500px"
                id="mongodb-chart-iframe"
                display="initial"
                position="relative"
            />
        </div>
    );
};

export default MongoDBChart;