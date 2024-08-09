import React, { useState, useEffect } from 'react';
import InfoTooltip from './InfoTooltip'; // Import InfoTooltip component

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
                LightStrength: parseFloat(jsonData.LightStrength).toFixed(2),
                Air_Quality: parseFloat(jsonData.Air_Quality).toFixed(2)

            };

            setData(roundedData);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    };

    const dataContainerStyle = {
        marginTop: '20px'
    };

    const dataBoxStyle = {
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        position: 'relative',
        width: '300px',
        margin: 'auto'  // Center the box horizontally
    };

    return (
        <div style={containerStyle}>
            <h1>Thời gian hiện tại: {currentTime}</h1>
            <h2>Ngày tháng năm hiện tại: {date}</h2>
            <div style={dataContainerStyle}>
                <div style={dataBoxStyle}>
                    <h3>
                        Thông số cảm biến
                        <InfoTooltip
                            tooltipContent={
                                <>
                                    <h4>Thông tin</h4>

                                </>
                            }
                        />
                    </h3>
                    {data && (
                        <>
                            <p>Nhiệt độ: {data.Temperature} °C</p>
                            <p>Độ ẩm: {data.Humidity} %</p>
                            <p>Cường độ ánh sáng: {data.LightStrength} lux</p>
                            <p>Nồng độ CO : {data.Air_Quality} ppm</p>
                        </>
                    )}
                    {error && <div className="error">{error}</div>}
                </div>
            </div>
        </div>
    );
}

export default CurrentTime;
