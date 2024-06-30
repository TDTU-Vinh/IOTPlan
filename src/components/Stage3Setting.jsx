import React, { useState } from 'react';

function Stage3Setting() {
    const [totalDay, setTotalDay] = useState('');
    const [timeBegin, setTimeBegin] = useState('');
    const [timeStop, setTimeStop] = useState('');
    const [timesWatering, setTimesWatering] = useState('');
    const [totalML, setTotalML] = useState('');
    const [password, setPassword] = useState('');

    const handleUpdateClick = () => {
        if (password === '123456') {
            const postData = {
                TotalDay_3: parseInt(totalDay, 10),
                TimeBegin_3: parseInt(timeBegin, 10),
                TimeStop_3: parseInt(timeStop, 10),
                Times_Watering_3: parseInt(timesWatering, 10),
                TotalML_3: parseFloat(totalML)
            };

            fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/VinhPostReactFlow_3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
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

    return (
        <div style={{ border: '1px solid black', padding: '10px', width: '30%' }}>
            <h3>Cài đặt lưu lượng nước giai đoạn 3</h3>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block' }}>
                    Tổng số ngày giai đoạn:
                </label>
                <input
                    type="number"
                    value={totalDay}
                    onChange={(e) => setTotalDay(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block' }}>
                    Cài đặt khoảng thời gian tưới cây (giờ bắt đầu):
                </label>
                <input
                    type="number"
                    value={timeBegin}
                    onChange={(e) => setTimeBegin(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block' }}>
                    Cài đặt khoảng thời gian tưới cây (giờ kết thúc):
                </label>
                <input
                    type="number"
                    value={timeStop}
                    onChange={(e) => setTimeStop(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block' }}>
                    Số lần tưới cho 1 ngày:
                </label>
                <input
                    type="number"
                    value={timesWatering}
                    onChange={(e) => setTimesWatering(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block' }}>
                    Tổng lượng nước cần thiết cho mỗi cây:
                </label>
                <input
                    type="number"
                    value={totalML}
                    onChange={(e) => setTotalML(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block' }}>
                    Mật khẩu:
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', marginTop: '10px' }}
                onClick={handleUpdateClick}
            >
                Cập nhật
            </button>
        </div>
    );
}

export default Stage3Setting;
