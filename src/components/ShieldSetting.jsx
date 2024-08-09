import React, { useState } from 'react';

function ShieldSetting() {
    const [shieldSettings, setShieldSettings] = useState({
        Shield_Auto: false,
        Shield_Man: false,
        Shield_Light_ActiveValue: ''
    });

    const [passwords, setPasswords] = useState({
        autoShield: '',
        manualShield: '',
        lightActiveValue: ''
    });

    const [showPasswordPrompt, setShowPasswordPrompt] = useState({
        autoShield: false,
        manualShield: false,
        lightActiveValue: false
    });

    const [errors, setErrors] = useState({
        autoShield: '',
        manualShield: '',
        lightActiveValue: ''
    });

    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        let inputValue;

        if (type === 'checkbox') {
            inputValue = e.target.checked;
        } else if (name === 'Shield_Auto' || name === 'Shield_Man') {
            inputValue = value === 'true'; // Convert string 'true'/'false' to boolean
        } else {
            inputValue = value;
        }

        setShieldSettings(prevSettings => ({
            ...prevSettings,
            [name]: inputValue
        }));
    };

    const handlePasswordChange = (e, type) => {
        const { value } = e.target;
        setPasswords(prevPasswords => ({
            ...prevPasswords,
            [type]: value
        }));
    };

    const handleUpdateClick = async (type) => {
        if (passwords[type] !== '123456') {
            setErrors(prevErrors => ({
                ...prevErrors,
                [type]: 'Mật khẩu không đúng, vui lòng thử lại.'
            }));
            return;
        }

        let postData;
        let url;

        switch (type) {
            case 'autoShield':
                postData = {
                    Shield_Auto: shieldSettings.Shield_Auto
                };
                url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/Shield_Auto';
                break;
            case 'manualShield':
                postData = {
                    Shield_Man: shieldSettings.Shield_Man
                };
                url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/Shield_man';
                break;
            case 'lightActiveValue':
                postData = {
                    Shield_Light_ActiveValue: parseFloat(shieldSettings.Shield_Light_ActiveValue)
                };
                url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/Shield_Light_ActiveValue';
                break;
            default:
                return;
        }

        try {
            const response = await fetch(url, {
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

            setPasswords(prevPasswords => ({
                ...prevPasswords,
                [type]: ''
            }));
            setErrors(prevErrors => ({
                ...prevErrors,
                [type]: ''
            }));
            setShowPasswordPrompt(prevShowPasswordPrompt => ({
                ...prevShowPasswordPrompt,
                [type]: false
            }));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(prevShowForm => !prevShowForm);
    };

    const togglePasswordPrompt = (type) => {
        setShowPasswordPrompt(prevShowPasswordPrompt => ({
            ...prevShowPasswordPrompt,
            [type]: !prevShowPasswordPrompt[type]
        }));
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
                Cài đặt màn che ánh sáng
            </button>
            {showForm && (
                <div style={centerStyle}>
                    <div style={formGroupStyle}>
                        <label>
                            Bật màn che ánh sáng:
                            <select
                                name="Shield_Auto"
                                value={shieldSettings.Shield_Auto.toString()}
                                onChange={handleInputChange}
                            >
                                <option value="true">On</option>
                                <option value="false">Off</option>
                            </select>
                        </label>
                        <button className="update-button" onClick={() => togglePasswordPrompt('autoShield')} style={{ marginLeft: '10px' }}>
                            Cập nhật mật khẩu
                        </button>
                        {showPasswordPrompt.autoShield && (
                            <div style={passwordPromptStyle}>
                                <label>
                                    Mật khẩu:
                                    <input
                                        type="password"
                                        value={passwords.autoShield}
                                        onChange={(e) => handlePasswordChange(e, 'autoShield')}
                                    />
                                </label>
                                <button onClick={() => handleUpdateClick('autoShield')}>Xác nhận</button>
                                {errors.autoShield && <p style={{ color: 'red' }}>{errors.autoShield}</p>}
                            </div>
                        )}
                    </div>
                    <div style={formGroupStyle}>
                        <label>
                            Tắt màn che ánh sáng:
                            <select
                                name="Shield_Man"
                                value={shieldSettings.Shield_Man.toString()}
                                onChange={handleInputChange}
                            >
                                <option value="true">On</option>
                                <option value="false">Off</option>
                            </select>
                        </label>
                        <button className="update-button" onClick={() => togglePasswordPrompt('manualShield')} style={{ marginLeft: '10px' }}>
                            Cập nhật mật khẩu
                        </button>
                        {showPasswordPrompt.manualShield && (
                            <div style={passwordPromptStyle}>
                                <label>
                                    Mật khẩu:
                                    <input
                                        type="password"
                                        value={passwords.manualShield}
                                        onChange={(e) => handlePasswordChange(e, 'manualShield')}
                                    />
                                </label>
                                <button onClick={() => handleUpdateClick('manualShield')}>Xác nhận</button>
                                {errors.manualShield && <p style={{ color: 'red' }}>{errors.manualShield}</p>}
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}

export default ShieldSetting;
