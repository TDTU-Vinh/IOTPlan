import React, { useState } from 'react';

function LightIntensitySetting() {
    const [lightSettings, setLightSettings] = useState({
        LightSettings_Access: false,
        Light_Kp: '',
        Light_Ki: '',
        Light_Kd: '',
        Light_SetpointValue: ''
    });
    const [accessPassword, setAccessPassword] = useState('');
    const [paramsPassword, setParamsPassword] = useState('');
    const [showAccessPasswordPrompt, setShowAccessPasswordPrompt] = useState(false);
    const [showParamsPasswordPrompt, setShowParamsPasswordPrompt] = useState(false);
    const [accessError, setAccessError] = useState('');
    const [paramsError, setParamsError] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const inputValue = value === 'true' ? true : value === 'false' ? false : value;
        setLightSettings(prevSettings => ({
            ...prevSettings,
            [name]: inputValue
        }));
    };

    const handleAccessPasswordChange = (e) => {
        setAccessPassword(e.target.value);
    };

    const handleParamsPasswordChange = (e) => {
        setParamsPassword(e.target.value);
    };

    const handleAccessUpdateClick = async () => {
        if (accessPassword !== '123456') {
            setAccessError('Mật khẩu không đúng, vui lòng thử lại.');
            return;
        }

        const postData = {
            LightSettings_Access: lightSettings.LightSettings_Access
        };

        try {
            const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/on_off_Light', {
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

    const handleParamsUpdateClick = async () => {
        if (paramsPassword !== '123456') {
            setParamsError('Mật khẩu không đúng, vui lòng thử lại.');
            return;
        }

        const postData = {
            Light_Kp: Number(lightSettings.Light_Kp),
            Light_Ki: Number(lightSettings.Light_Ki),
            Light_Kd: Number(lightSettings.Light_Kd),
            Light_SetpointValue: Number(lightSettings.Light_SetpointValue)
        };

        try {
            const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/VinhPostReactLightSettings', {
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

    const togglePasswordPrompt = (type) => {
        if (type === 'access') {
            setShowAccessPasswordPrompt(prevShowAccessPasswordPrompt => !prevShowAccessPasswordPrompt);
        } else if (type === 'params') {
            setShowParamsPasswordPrompt(prevShowParamsPasswordPrompt => !prevShowParamsPasswordPrompt);
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
                Cài đặt cường độ ánh sáng
            </button>
            {showForm && (
                <div style={centerStyle}>
                    <div style={formGroupStyle}>
                        <label>
                            Bật / Tắt:
                            <select
                                name="LightSettings_Access"
                                value={lightSettings.LightSettings_Access ? 'true' : 'false'}
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
                            Thông số Kp:
                            <input
                                type="number"
                                name="Light_Kp"
                                value={lightSettings.Light_Kp}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div style={formGroupStyle}>
                        <label>
                            Thông số Ki:
                            <input
                                type="number"
                                name="Light_Ki"
                                value={lightSettings.Light_Ki}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div style={formGroupStyle}>
                        <label>
                            Thông số Kd:
                            <input
                                type="number"
                                name="Light_Kd"
                                value={lightSettings.Light_Kd}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div style={formGroupStyle}>
                        <label>
                            Cài đặt cường độ ánh sáng:
                            <input
                                type="number"
                                name="Light_SetpointValue"
                                value={lightSettings.Light_SetpointValue}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div style={formGroupStyle}>
                        <button className="update-button" onClick={() => togglePasswordPrompt('params')}>
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

export default LightIntensitySetting;
