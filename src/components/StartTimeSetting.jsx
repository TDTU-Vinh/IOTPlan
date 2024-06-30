import React, { useState, useEffect } from 'react';

function PlantingTimeSetting() {
    const [plantingTime, setPlantingTime] = useState({
        DayBegin: '',
        MonthBegin: '',
        YearBegin: '',
        NumberOfTree: ''
    });
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // State để lưu trữ danh sách các năm, tháng và ngày
    const [yearOptions, setYearOptions] = useState([]);
    const [monthOptions, setMonthOptions] = useState([]);
    const [dayOptions, setDayOptions] = useState([]);

    // Hàm sinh danh sách năm từ năm hiện tại trở về 20 năm trước
    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear; year >= currentYear - 20; year--) {
            years.push(year.toString());
        }
        setYearOptions(years);
    };

    // Hàm sinh danh sách tháng từ tháng 1 đến tháng 12
    const generateMonthOptions = () => {
        const months = [];
        for (let month = 1; month <= 12; month++) {
            months.push(month.toString());
        }
        setMonthOptions(months);
    };

    // Hàm sinh danh sách ngày dựa trên tháng và năm được chọn
    const generateDayOptions = () => {
        const selectedYear = parseInt(plantingTime.YearBegin);
        const selectedMonth = parseInt(plantingTime.MonthBegin);
        if (!isNaN(selectedYear) && !isNaN(selectedMonth)) {
            const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
            const days = [];
            for (let day = 1; day <= daysInMonth; day++) {
                days.push(day.toString());
            }
            setDayOptions(days);
        } else {
            setDayOptions([]);
        }
    };

    // Khởi tạo danh sách năm và tháng khi component được render
    useEffect(() => {
        generateYearOptions();
        generateMonthOptions();
    }, []);

    // Cập nhật danh sách ngày khi có sự thay đổi trong dropdown năm hoặc tháng
    useEffect(() => {
        generateDayOptions();
    }, [plantingTime.YearBegin, plantingTime.MonthBegin]);

    // Xử lý thay đổi trong các dropdown năm, tháng và ngày
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlantingTime(prevTime => ({
            ...prevTime,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUpdateClick = () => {
        if (password === '123456') {
            setIsAuthenticated(true);
            const numericPlantingTime = {
                ...plantingTime,
                DayBegin: parseInt(plantingTime.DayBegin, 10),
                MonthBegin: parseInt(plantingTime.MonthBegin, 10),
                YearBegin: parseInt(plantingTime.YearBegin, 10),
                NumberOfTree: parseInt(plantingTime.NumberOfTree, 10)
            };

            fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/PostEndPointReactBeginSetting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(numericPlantingTime)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            alert('Mật khẩu không đúng, vui lòng thử lại.');
        }
    };

    const toggleForm = () => {
        setShowForm(prevShowForm => !prevShowForm);
    };

    return (
        <div className="planting-time-setting">
            <button className="setting-button" onClick={toggleForm}>
                Cài đặt thời gian bắt đầu trồng trọt
            </button>
            {showForm && (
                <div className="form-container">
                    <div>
                        <label>
                            Năm bắt đầu trồng trọt:
                            <select
                                name="YearBegin"
                                value={plantingTime.YearBegin}
                                onChange={handleInputChange}
                            >
                                <option value="">Chọn năm</option>
                                {yearOptions.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Tháng bắt đầu trồng trọt:
                            <select
                                name="MonthBegin"
                                value={plantingTime.MonthBegin}
                                onChange={handleInputChange}
                            >
                                <option value="">Chọn tháng</option>
                                {monthOptions.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Ngày bắt đầu trồng trọt:
                            <select
                                name="DayBegin"
                                value={plantingTime.DayBegin}
                                onChange={handleInputChange}
                            >
                                <option value="">Chọn ngày</option>
                                {dayOptions.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Số lượng cây:
                            <input
                                type="number"
                                name="NumberOfTree"
                                value={plantingTime.NumberOfTree}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    {!isAuthenticated && (
                        <div>
                            <label>
                                Mật khẩu:
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </label>
                            <button className="update-button" onClick={handleUpdateClick}>
                                Cập nhật
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PlantingTimeSetting;
