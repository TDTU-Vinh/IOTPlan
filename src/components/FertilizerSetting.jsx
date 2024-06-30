import React, { useState } from 'react';

function FertilizerSetting() {
    const [fertilizerSettings, setFertilizerSettings] = useState({
        Man_On_Chemistry: false,
        ChemistrySetting_Access: false,
        TimeChemistryBegin_Hour: '',
        TotalChemistry: '',
        TimeChemistry_After: ''
    });

    const [passwords, setPasswords] = useState({
        manOn: '',
        chemistryAccess: '',
        otherSettings: ''
    });

    const [showPasswordPrompt, setShowPasswordPrompt] = useState({
        manOn: false,
        chemistryAccess: false,
        otherSettings: false
    });

    const [errors, setErrors] = useState({
        manOn: '',
        chemistryAccess: '',
        otherSettings: ''
    });

    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const inputValue = type === 'checkbox' ? e.target.checked : value;
        setFertilizerSettings(prevSettings => ({
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
            case 'manOn':
                postData = {
                    Man_On_Chemistry: fertilizerSettings.Man_On_Chemistry
                };
                url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/OnOffManFertilizer';
                break;
            case 'chemistryAccess':
                postData = {
                    ChemistrySetting_Access: fertilizerSettings.ChemistrySetting_Access
                };
                url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/OnOffAutoFerilizer';
                break;
            case 'otherSettings':
                postData = {
                    TimeChemistryBegin_Hour: parseInt(fertilizerSettings.TimeChemistryBegin_Hour, 10),
                    TotalChemistry: parseInt(fertilizerSettings.TotalChemistry, 10),
                    TimeChemistry_After: parseInt(fertilizerSettings.TimeChemistry_After, 10)
                };
                url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/VinhPostReactFertilizerSettings';
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
                Cài đặt lượng phân bón
            </button>
            {showForm && (
                <div style={centerStyle}>
                    <div style={formGroupStyle}>
                        <label>
                            On/Off Man bón phân:
                            <select
                                name="Man_On_Chemistry"
                                value={fertilizerSettings.Man_On_Chemistry.toString()}
                                onChange={handleInputChange}
                            >
                                <option value="true">On</option>
                                <option value="false">Off</option>
                            </select>
                        </label>
                        <button className="update-button" onClick={() => togglePasswordPrompt('manOn')} style={{ marginLeft: '10px' }}>
                            Cập nhật mật khẩu
                        </button>
                        {showPasswordPrompt.manOn && (
                            <div style={passwordPromptStyle}>
                                <label>
                                    Mật khẩu:
                                    <input
                                        type="password"
                                        value={passwords.manOn}
                                        onChange={(e) => handlePasswordChange(e, 'manOn')}
                                    />
                                </label>
                                <button onClick={() => handleUpdateClick('manOn')}>Xác nhận</button>
                                {errors.manOn && <p style={{ color: 'red' }}>{errors.manOn}</p>}
                            </div>
                        )}
                    </div>
                    <div style={formGroupStyle}>
                        <label>
                            On/Off Auto bón phân:
                            <select
                                name="ChemistrySetting_Access"
                                value={fertilizerSettings.ChemistrySetting_Access.toString()}
                                onChange={handleInputChange}
                            >
                                <option value="true">On</option>
                                <option value="false">Off</option>
                            </select>
                        </label>
                        <button className="update-button" onClick={() => togglePasswordPrompt('chemistryAccess')} style={{ marginLeft: '10px' }}>
                            Cập nhật mật khẩu
                        </button>
                        {showPasswordPrompt.chemistryAccess && (
                            <div style={passwordPromptStyle}>
                                <label>
                                    Mật khẩu:
                                    <input
                                        type="password"
                                        value={passwords.chemistryAccess}
                                        onChange={(e) => handlePasswordChange(e, 'chemistryAccess')}
                                    />
                                </label>
                                <button onClick={() => handleUpdateClick('chemistryAccess')}>Xác nhận</button>
                                {errors.chemistryAccess && <p style={{ color: 'red' }}>{errors.chemistryAccess}</p>}
                            </div>
                        )}
                    </div>
                    <div style={formGroupStyle}>
                        <label>
                            Thời gian tưới cây muốn cài đặt (giờ):
                            <input
                                type="number"
                                name="TimeChemistryBegin_Hour"
                                value={fertilizerSettings.TimeChemistryBegin_Hour}
                                onChange={handleInputChange}
                                min="0"
                                max="23"
                            />
                        </label>
                    </div>
                    <div style={formGroupStyle}>
                        <label>
                            Tổng lượng phân bón lỏng (ML):
                            <input
                                type="number"
                                name="TotalChemistry"
                                value={fertilizerSettings.TotalChemistry}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div style={formGroupStyle}>
                        <label>
                            Khoảng thời gian cách nhau cần tưới (ngày):
                            <input
                                type="number"
                                name="TimeChemistry_After"
                                value={fertilizerSettings.TimeChemistry_After}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div style={formGroupStyle}>
                        <button className="update-button" onClick={() => togglePasswordPrompt('otherSettings')} style={{ marginLeft: '10px' }}>
                            Cập nhật mật khẩu
                        </button>
                    </div>
                    {showPasswordPrompt.otherSettings && (
                        <div style={passwordPromptStyle}>
                            <label>
                                Mật khẩu:
                                <input
                                    type="password"
                                    value={passwords.otherSettings}
                                    onChange={(e) => handlePasswordChange(e, 'otherSettings')}
                                />
                            </label>
                            <button onClick={() => handleUpdateClick('otherSettings')}>Xác nhận</button>
                            {errors.otherSettings && <p style={{ color: 'red' }}>{errors.otherSettings}</p>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FertilizerSetting;
