import React, { useState, useEffect, useRef } from 'react';

const InfoTooltip = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [data, setData] = useState(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
        fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/getInfoData')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setShowTooltip(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleTooltip = () => {
        setShowTooltip(!showTooltip);
    };

    const calculateTotalDays = (day, month, year) => {
        const startDate = new Date(year, 0, 0); // Ngày đầu năm
        const endDate = new Date(year, month - 1, day); // Ngày được cung cấp
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const calculateStageLabel = () => {
        if (!data) return null;

        const today = new Date(); // Ngày hiện tại
        const totalDaysFromStart = calculateTotalDays(data.DayBegin, data.MonthBegin, data.YearBegin);
        const todayTotal = calculateTotalDays(today.getDate(), today.getMonth() + 1, today.getFullYear());

        let stageLabel = "NULL";

        if (totalDaysFromStart + data.TotalDay_1 >= todayTotal) {
            stageLabel = "Lưu lượng giai đoạn 1";
        }
        if (totalDaysFromStart + data.TotalDay_1 + data.TotalDay_2 >= todayTotal && totalDaysFromStart + data.TotalDay_1 < todayTotal) {
            stageLabel = "Lưu lượng giai đoạn 2";
        }
        if (totalDaysFromStart + data.TotalDay_1 + data.TotalDay_2 + data.TotalDay_3 >= todayTotal && totalDaysFromStart + data.TotalDay_1 + data.TotalDay_2 < todayTotal) {
            stageLabel = "Lưu lượng giai đoạn 3";
        }
        if (todayTotal < totalDaysFromStart) {
            stageLabel = "Chưa đến Thời gian bắt đầu gian đoạn trồng trọt";
        }
        if (todayTotal > totalDaysFromStart + data.TotalDay_1 + data.TotalDay_2 + data.TotalDay_3) {
            stageLabel = "Đã Hoàn Thành các giai đoạn";
        }

        return stageLabel;
    };

    const renderStage1Info = () => {
        if (calculateStageLabel() === "Lưu lượng giai đoạn 1" && data) {
            return (
                <>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Lượng nước cho mỗi cây:</span> {data.TotalML_1}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Tổng số lần tưới cây 1 ngày: </span> {data.Times_Watering_1}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Thời gian bắt đầu tưới: </span> {data.TimeBegin_1}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Thời gian kết thúc tưới: </span> {data.TimeStop_1}</p>

                    <p style={infoStyle}>Cài đặt cường độ ánh sáng </p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Đèn On/Off: </span> {data.LightSettings_Access ? 'On' : 'OFF'}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Cường độ ánh sáng cài đặt: </span> {data.Light_SetpointValue}</p>

                    <p style={infoStyle}>Cài đặt Phân bón </p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Auto: </span> {data.ChemistrySetting_Access ? 'On' : 'OFF'}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Man: </span> {data.Man_On_Chemistry ? 'On' : 'OFF'}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Thời gian tưới (giờ): </span> {data.TimeChemistryBegin_Hour}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Thời gian tưới cách ngày: </span> {data.TimeChemistryBegin_Hour}</p>

                    <p style={infoStyle}>Cài đặt Nhiệt độ </p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Auto: </span> {data.TemperatureSetting_Access ? 'On' : 'OFF'}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Nhiệt độ cài đặt: </span> {data.Temperature_SetpointValue}</p>
                </>
            );
        }
        return null;
    };

    const renderStage2Info = () => {
        if (calculateStageLabel() === "Lưu lượng giai đoạn 2" && data) {
            return (
                <>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Lượng nước cho mỗi cây:</span> {data.TotalML_2}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Tổng số lần tưới cây 1 ngày: </span> {data.Times_Watering_2}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Thời gian bắt đầu tưới: </span> {data.TimeBegin_2}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Thời gian kết thúc tưới: </span> {data.TimeStop_2}</p>
                    <p style={infoStyle}>Đèn On/Off:  {data.LightSettings_Access ? 'On' : 'OFF'}</p>

                    <p style={infoStyle}>Cài đặt cường độ ánh sáng </p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Đèn On/Off: </span> {data.LightSettings_Access ? 'On' : 'OFF'}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Cường độ ánh sáng cài đặt: </span> {data.Light_SetpointValue}</p>

                    <p style={infoStyle}>Cài đặt Phân bón </p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Auto: </span> {data.ChemistrySetting_Access ? 'On' : 'OFF'}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Man: </span> {data.Man_On_Chemistry ? 'On' : 'OFF'}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Thời gian tưới (giờ): </span> {data.TimeChemistryBegin_Hour}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Thời gian tưới cách ngày: </span> {data.TimeChemistryBegin_Hour}</p>

                    <p style={infoStyle}>Cài đặt Nhiệt độ </p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Auto: </span> {data.TemperatureSetting_Access ? 'On' : 'OFF'}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Nhiệt độ cài đặt: </span> {data.Temperature_SetpointValue}</p>
                </>
            );
        }
        return null;
    };

    const renderStage3Info = () => {
        if (calculateStageLabel() === "Lưu lượng giai đoạn 3" && data) {
            return (
                <>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Lượng nước cho mỗi cây:</span> {data.TotalML_3}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Tổng số lần tưới cây 1 ngày: </span> {data.Times_Watering_3}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Thời gian bắt đầu tưới: </span> {data.TimeBegin_3}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Thời gian kết thúc tưới: </span> {data.TimeStop_3}</p>
                    <p style={infoStyle}>Đèn On/Off:  {data.LightSettings_Access ? 'On' : 'OFF'}</p>

                    <p style={infoStyle}>Cài đặt cường độ ánh sáng </p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Đèn On/Off: </span> {data.LightSettings_Access ? 'On' : 'OFF'}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Cường độ ánh sáng cài đặt: </span> {data.Light_SetpointValue}</p>

                    <p style={infoStyle}>Cài đặt Phân bón </p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Auto: </span> {data.ChemistrySetting_Access ? 'On' : 'OFF'}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Man: </span> {data.Man_On_Chemistry ? 'On' : 'OFF'}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Thời gian tưới (giờ): </span> {data.TimeChemistryBegin_Hour}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Thời gian tưới cách ngày: </span> {data.TimeChemistryBegin_Hour}</p>

                    <p style={infoStyle}>Cài đặt Nhiệt độ </p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Auto: </span> {data.TemperatureSetting_Access ? 'On' : 'OFF'}</p>
                    <p style={infoStyle}><span style={{ marginLeft: '40px' }}>Nhiệt độ cài đặt: </span> {data.Temperature_SetpointValue}</p>
                </>
            );
        }
        return null;
    };

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
    };

    const titleStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        margin: '0 10px 0 0'
    };

    const tooltipButtonStyle = {
        background: '#007BFF',
        borderRadius: '50%',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        width: '24px',
        height: '24px',
        textAlign: 'center',
        lineHeight: '24px',
        marginLeft: '140px'
    };

    const tooltipStyle = {
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        background: '#fff',
        position: 'absolute',
        top: '0',
        left: '100%',
        marginLeft: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1,
        width: '250px'
    };

    const infoStyle = {
        fontSize: '14px',
        fontWeight: 'normal',
        margin: '5px 0',
        textAlign: 'left'
    };

    return (
        <div style={containerStyle}>
            <button style={tooltipButtonStyle} onClick={toggleTooltip}>?</button>
            {showTooltip && data && (
                <div ref={tooltipRef} style={tooltipStyle}>
                    <h4 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>Thông tin</h4>
                    <p style={infoStyle}>Tên loại cây: {data.TypeOfTree}</p>
                    <p style={infoStyle}>Ngày bắt đầu trồng trọt: {`${data.DayBegin}/${data.MonthBegin}/${data.YearBegin}`}</p>
                    <p style={infoStyle}>Số lượng cây: {data.NumberOfTree}</p>
                    <p style={infoStyle}>Tổng số ngày từ đầu năm: {calculateTotalDays(data.DayBegin, data.MonthBegin, data.YearBegin)}</p>
                    <p style={infoStyle}>{calculateStageLabel()}</p>
                    {renderStage1Info()}
                    {renderStage2Info()}
                    {renderStage3Info()}
                </div>
            )}
        </div>
    );
};

export default InfoTooltip;
