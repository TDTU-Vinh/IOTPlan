import React, { useState } from 'react';
import Stage1Setting from './Stage1Setting';
import Stage2Setting from './Stage2Setting';
import Stage3Setting from './Stage3Setting';

function WaterFlowSetting() {
    const [showSettings, setShowSettings] = useState(false);
    const [manualAccess, setManualAccess] = useState('false');
    const [autoFlow, setAutoFlow] = useState('false');
    const [manualPassword, setManualPassword] = useState('');
    const [autoPassword, setAutoPassword] = useState('');
    const [showManualPasswordPrompt, setShowManualPasswordPrompt] = useState(false);
    const [showAutoPasswordPrompt, setShowAutoPasswordPrompt] = useState(false);
    const [manualError, setManualError] = useState('');
    const [autoError, setAutoError] = useState('');

    const handleManualAccessChange = (e) => {
        setManualAccess(e.target.value);
    };

    const handleAutoFlowChange = (e) => {
        setAutoFlow(e.target.value);
    };

    const handleManualPasswordChange = (e) => {
        setManualPassword(e.target.value);
    };

    const handleAutoPasswordChange = (e) => {
        setAutoPassword(e.target.value);
    };

    const handleManualAccessUpdate = async () => {
        if (manualPassword !== '123456') {
            setManualError('Mật khẩu không đúng, vui lòng thử lại.');
            return;
        }

        try {
            const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/VinhPostReactManFlowSettingButton', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Flow_On_Man: manualAccess === 'true' })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Success:', responseData);

            // Clear password and error after successful update
            setManualPassword('');
            setManualError('');
            setShowManualPasswordPrompt(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAutoFlowUpdate = async () => {
        if (autoPassword !== '123456') {
            setAutoError('Mật khẩu không đúng, vui lòng thử lại.');
            return;
        }

        try {
            const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/VinhPostReactAutoFlowSettingButton', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ FlowNewSettings_Access: autoFlow === 'true' })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Success:', responseData);

            // Clear password and error after successful update
            setAutoPassword('');
            setAutoError('');
            setShowAutoPasswordPrompt(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div className="water-flow-setting" style={{ textAlign: 'center' }}>
            <button className="setting-button" onClick={toggleSettings} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', margin: '10px 0' }}>
                Cài đặt lưu lượng nước
            </button>
            {showSettings && (
                <div>
                    <div style={{ margin: '20px 0' }}>
                        <label>
                            On/Off Man Lưu Lượng:
                            <select value={manualAccess} onChange={handleManualAccessChange}>
                                <option value="true">On</option>
                                <option value="false">Off</option>
                            </select>
                        </label>
                        <button style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', marginLeft: '10px' }} onClick={() => setShowManualPasswordPrompt(true)}>
                            Cập nhật
                        </button>
                        {showManualPasswordPrompt && (
                            <div style={{ marginTop: '10px' }}>
                                <input
                                    type="password"
                                    value={manualPassword}
                                    onChange={handleManualPasswordChange}
                                    placeholder="Nhập mật khẩu"
                                    style={{ marginRight: '10px' }}
                                />
                                <button style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px' }} onClick={handleManualAccessUpdate}>
                                    Xác nhận
                                </button>
                                {manualError && <p style={{ color: 'red' }}>{manualError}</p>}
                            </div>
                        )}
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <label>
                            On/Off Auto Lưu Lượng:
                            <select value={autoFlow} onChange={handleAutoFlowChange}>
                                <option value="true">On</option>
                                <option value="false">Off</option>
                            </select>
                        </label>
                        <button style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', marginLeft: '10px' }} onClick={() => setShowAutoPasswordPrompt(true)}>
                            Cập nhật
                        </button>
                        {showAutoPasswordPrompt && (
                            <div style={{ marginTop: '10px' }}>
                                <input
                                    type="password"
                                    value={autoPassword}
                                    onChange={handleAutoPasswordChange}
                                    placeholder="Nhập mật khẩu"
                                    style={{ marginRight: '10px' }}
                                />
                                <button style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px' }} onClick={handleAutoFlowUpdate}>
                                    Xác nhận
                                </button>
                                {autoError && <p style={{ color: 'red' }}>{autoError}</p>}
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Stage1Setting />
                        <Stage2Setting />
                        <Stage3Setting />
                    </div>
                </div>
            )}
        </div>
    );
}

export default WaterFlowSetting;
