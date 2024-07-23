import React, { useState } from 'react';

function AdvanceSettings() {
    const [lightSettings, setLightSettings] = useState({
        Light_Kp: '',
        Light_Ki: '',
        Light_Kd: ''
    });
    const [paramsPassword, setParamsPassword] = useState('');
    const [showParamsPasswordPrompt, setShowParamsPasswordPrompt] = useState(false);
    const [paramsError, setParamsError] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Kiểm tra và chỉ cho phép nhập số thập phân hợp lệ
        if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
            setLightSettings(prevSettings => ({
                ...prevSettings,
                [name]: value
            }));
        }
    };

    const handleParamsPasswordChange = (e) => {
        setParamsPassword(e.target.value);
    };

    const handleParamsUpdateClick = async () => {
        if (paramsPassword !== '111111') {
            setParamsError('Mật khẩu không đúng, vui lòng thử lại.');
            return;
        }

        const postData = {
            Light_Kp: parseFloat(lightSettings.Light_Kp),
            Light_Ki: parseFloat(lightSettings.Light_Ki),
            Light_Kd: parseFloat(lightSettings.Light_Kd)
        };

        try {
            const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/advanceSettings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Success:', responseData);

            setParamsPassword('');
            setParamsError('');
            setShowParamsPasswordPrompt(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(prevShowForm => !prevShowForm);
    };

    const togglePasswordPrompt = () => {
        setShowParamsPasswordPrompt(prevShowParamsPasswordPrompt => !prevShowParamsPasswordPrompt);
    };

    const formGroupStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    };

    const passwordPromptStyle = {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '10px',
    };

    const centerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={centerStyle}>
            <button className="setting-button" onClick={toggleForm}>
                Điều chỉnh nâng cao
            </button>
            {showForm && (
                <div style={centerStyle}>
                    <div style={formGroupStyle}>
                        <label>
                            Thông số Kp đèn:
                            <input
                                type="text"
                                name="Light_Kp"
                                value={lightSettings.Light_Kp}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div style={formGroupStyle}>
                        <label>
                            Thông số Ki đèn:
                            <input
                                type="text"
                                name="Light_Ki"
                                value={lightSettings.Light_Ki}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div style={formGroupStyle}>
                        <label>
                            Thông số Kd đèn:
                            <input
                                type="text"
                                name="Light_Kd"
                                value={lightSettings.Light_Kd}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div style={formGroupStyle}>
                        <button className="update-button" onClick={togglePasswordPrompt}>
                            Cập nhật mật khẩu
                        </button>
                    </div>
                    {showParamsPasswordPrompt && (
                        <div style={passwordPromptStyle}>
                            <label>
                                Mật khẩu:
                                <input
                                    type="password"
                                    value={paramsPassword}
                                    onChange={handleParamsPasswordChange}
                                />
                            </label>
                            <button onClick={handleParamsUpdateClick}>Xác nhận</button>
                            {paramsError && <p style={{ color: 'red' }}>{paramsError}</p>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdvanceSettings;
