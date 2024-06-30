import React, { useState, useEffect } from 'react';
import './NhapData.css'; // Import CSS file

function CurrentTime() {
    const [currentTime, setCurrentTime] = useState('');
    const [date, setDate] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            const dateString = now.toLocaleDateString();
            setCurrentTime(timeString);
            setDate(dateString);
            postDateTime(timeString, dateString);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/VinhGetEndPointReactData');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();

            // Làm tròn các giá trị đến 2 chữ số thập phân
            const roundedData = {
                ...jsonData,
                Temperature: parseFloat(jsonData.Temperature).toFixed(2),
                Humidity: parseFloat(jsonData.Humidity).toFixed(2),
                LightStrength: parseFloat(jsonData.LightStrength).toFixed(2)
            };

            setData(roundedData);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const postDateTime = async (time, date) => {
        const data = {
            time,
            date
        };

        try {
            const response = await fetch('https://your-api-endpoint.com/postDateTime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Successfully posted data:', responseData);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <div className="container">
            <h1>Thời gian hiện tại: {currentTime}</h1>
            <h2>Ngày tháng năm hiện tại: {date}</h2>
            <div className="data-container">
                {data && (
                    <div className="data-box">
                        <p>Nhiệt độ: {data.Temperature} °C</p>
                        <p>Độ ẩm: {data.Humidity} %</p>
                        <p>Cường độ ánh sáng: {data.LightStrength} lux</p>
                    </div>
                )}
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
}

export default CurrentTime;
