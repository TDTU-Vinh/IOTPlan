import React, { useState } from 'react';
import axios from 'axios';

const Get20Data = () => {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/get20Data');
            setData(response.data);
            console.log('Data fetched:', response.data);

            // Tạo dữ liệu JSON dễ đọc
            const formattedData = JSON.stringify(response.data, null, 2);

            // Tạo và tải file .txt
            const blob = new Blob([formattedData], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'IOTFile.txt';
            link.style.display = 'none'; // Ẩn link khi không cần thiết
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <button onClick={fetchData}>Tải dữ liệu</button>
            {data && (
                <div>
                    <h3>Dữ liệu nhận được:</h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Get20Data;
