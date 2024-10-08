import React, { useState } from 'react';

function TemperatureSetting() {
    const [temperatureSettings, setTemperatureSettings] = useState({
        TemperatureSetting_Access: false,
        Temperature_SetpointValue: '',
        Temperature_MinValue: ''
    });
    const [accessPassword, setAccessPassword] = useState('');
    const [setpointPassword, setSetpointPassword] = useState('');
    const [minValuePassword, setMinValuePassword] = useState('');
    const [showAccessPasswordPrompt, setShowAccessPasswordPrompt] = useState(false);
    const [showSetpointPasswordPrompt, setShowSetpointPasswordPrompt] = useState(false);
    const [showMinValuePasswordPrompt, setShowMinValuePasswordPrompt] = useState(false);
    const [accessError, setAccessError] = useState('');
    const [setpointError, setSetpointError] = useState('');
    const [minValueError, setMinValueError] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const inputValue = value === 'true' ? true : value === 'false' ? false : value;
        setTemperatureSettings(prevSettings => ({
            ...prevSettings,
            [name]: inputValue
        }));
    };

    const handleAccessPasswordChange = (e) => {
        setAccessPassword(e.target.value);
    };

    const handleSetpointPasswordChange = (e) => {
        setSetpointPassword(e.target.value);
    };

    const handleMinValuePasswordChange = (e) => {
        setMinValuePassword(e.target.value);
    };

    const handleAccessUpdateClick = async () => {
        if (accessPassword !== '123456') {
            setAccessError('Mật khẩu không đúng, vui lòng thử lại.');
            return;
        }

        const postData = {
            TemperatureSetting_Access: temperatureSettings.TemperatureSetting_Access
        };

        try {
            const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/TempOnOff', {
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

            setAccessPassword('');
            setAccessError('');
            setShowAccessPasswordPrompt(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSetpointUpdateClick = async () => {
        if (setpointPassword !== '123456') {
            setSetpointError('Mật khẩu không đúng, vui lòng thử lại.');
            return;
        }

        const postData = {
            Temperature_SetpointValue: Number(temperatureSettings.Temperature_SetpointValue)
        };

        try {
            const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/TempParameterChange', {
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

            setSetpointPassword('');
            setSetpointError('');
            setShowSetpointPasswordPrompt(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleMinValueUpdateClick = async () => {
        if (minValuePassword !== '123456') {
            setMinValueError('Mật khẩu không đúng, vui lòng thử lại.');
            return;
        }

        const postData = {
            Temperature_MinValue: Number(temperatureSettings.Temperature_MinValue)
        };

        try {
            const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/TemperatureChangeMin', {
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

            setMinValuePassword('');
            setMinValueError('');
            setShowMinValuePasswordPrompt(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(prevShowForm => !prevShowForm);
    };

    const togglePasswordPrompt = (type) => {
        if (type === 'access') {
            setShowAccessPasswordPrompt(prevShowAccessPasswordPrompt => !prevShowAccessPasswordPrompt);
        } else if (type === 'setpoint') {
            setShowSetpointPasswordPrompt(prevShowSetpointPasswordPrompt => !prevShowSetpointPasswordPrompt);
        } else if (type === 'minValue') {
            setShowMinValuePasswordPrompt(prevShowMinValuePasswordPrompt => !prevShowMinValuePasswordPrompt);
        }
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
                Cài đặt nhiệt độ môi trường
            </button>
            {showForm && (
                <div style={centerStyle}>
                    <div style={formGroupStyle}>
                        <label>
                            On/Off Nhiệt độ:
                            <select
                                name="TemperatureSetting_Access"
                                value={temperatureSettings.TemperatureSetting_Access ? 'true' : 'false'}
                                onChange={handleInputChange}
                            >
                                <option value="true">On</option>
                                <option value="false">Off</option>
                            </select>
                        </label>
                        <button className="update-button" onClick={() => togglePasswordPrompt('access')} style={{ marginLeft: '10px' }}>
                            Cập nhật mật khẩu
                        </button>
                    </div>
                    {showAccessPasswordPrompt && (
                        <div style={passwordPromptStyle}>
                            <label>
                                Mật khẩu:
                                <input
                                    type="password"
                                    value={accessPassword}
                                    onChange={handleAccessPasswordChange}
                                />
                            </label>
                            <button onClick={handleAccessUpdateClick}>Xác nhận</button>
                            {accessError && <p style={{ color: 'red' }}>{accessError}</p>}
                        </div>
                    )}
                    <div style={formGroupStyle}>
                        <label>
                            Giá trị ngưỡng cao nhất của cây trồng:
                            <input
                                type="number"
                                name="Temperature_SetpointValue"
                                value={temperatureSettings.Temperature_SetpointValue}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button className="update-button" onClick={() => togglePasswordPrompt('setpoint')} style={{ marginLeft: '10px' }}>
                            Cập nhật mật khẩu
                        </button>
                    </div>
                    {showSetpointPasswordPrompt && (
                        <div style={passwordPromptStyle}>
                            <label>
                                Mật khẩu:
                                <input
                                    type="password"
                                    value={setpointPassword}
                                    onChange={handleSetpointPasswordChange}
                                />
                            </label>
                            <button onClick={handleSetpointUpdateClick}>Xác nhận</button>
                            {setpointError && <p style={{ color: 'red' }}>{setpointError}</p>}
                        </div>
                    )}
                    <div style={formGroupStyle}>
                        <label>
                            Giá trị thấp nhất của cây trồng:
                            <input
                                type="number"
                                name="Temperature_MinValue"
                                value={temperatureSettings.Temperature_MinValue}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button className="update-button" onClick={() => togglePasswordPrompt('minValue')} style={{ marginLeft: '10px' }}>
                            Cập nhật mật khẩu
                        </button>
                    </div>
                    {showMinValuePasswordPrompt && (
                        <div style={passwordPromptStyle}>
                            <label>
                                Mật khẩu:
                                <input
                                    type="password"
                                    value={minValuePassword}
                                    onChange={handleMinValuePasswordChange}
                                />
                            </label>
                            <button onClick={handleMinValueUpdateClick}>Xác nhận</button>
                            {minValueError && <p style={{ color: 'red' }}>{minValueError}</p>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TemperatureSetting;
