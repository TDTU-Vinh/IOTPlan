import React, { useState } from 'react';

function TempSetup() {
    const [tempSettings, setTempSettings] = useState({
        Temperature_Kp: '',
        Temperature_Ki: '',
        Temperature_Kd: ''
    });
    const [paramsPassword, setParamsPassword] = useState('');
    const [showParamsPasswordPrompt, setShowParamsPasswordPrompt] = useState(false);
    const [paramsError, setParamsError] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
            setTempSettings(prevSettings => ({
                ...prevSettings,
                [name]: value
            }));
        }
    };

    const handleParamsPasswordChange = (e) => {
        setParamsPassword(e.target.value);
    };

    const handleParamsUpdateClick = async () => {
        if (paramsPassword !== '123456') {
            setParamsError('Mật khẩu không đúng, vui lòng thử lại.');
            return;
        }

        const postData = {
            Temperature_Kp: parseFloat(tempSettings.Temperature_Kp),
            Temperature_Ki: parseFloat(tempSettings.Temperature_Ki),
            Temperature_Kd: parseFloat(tempSettings.Temperature_Kd)
        };

        try {
            const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/advanceTemp', {
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
                Cài đặt nâng cao nhiệt độ
            </button>
            {showForm && (
                <div style={centerStyle}>
                    <div style={formGroupStyle}>
                        <label>
                            Thông số Kp nhiệt độ:
                            <input
                                type="text"
                                name="Temperature_Kp"
                                value={tempSettings.Temperature_Kp}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div style={formGroupStyle}>
                        <label>
                            Thông số Ki nhiệt độ:
                            <input
                                type="text"
                                name="Temperature_Ki"
                                value={tempSettings.Temperature_Ki}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div style={formGroupStyle}>
                        <label>
                            Thông số Kd nhiệt độ:
                            <input
                                type="text"
                                name="Temperature_Kd"
                                value={tempSettings.Temperature_Kd}
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

export default TempSetup;
