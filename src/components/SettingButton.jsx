import React, { useState } from 'react';
import './SettingButton.css';
import StartTimeSetting from './StartTimeSetting';
import LightIntensitySetting from './LightIntensitySetting';
import TemperatureSetting from './TemperatureSetting';
import FertilizerSetting from './FertilizerSetting';
import WaterFlowSetting from './WaterFlowSetting';
import ShieldSetting from './ShieldSetting';

function SettingButton() {
    const [showSettings, setShowSettings] = useState(false);

    const handleButtonClick = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Cài đặt hệ thống cây trồng</button>
            {showSettings && (
                <div className="settings-modal">
                    <h1>Cài đặt hệ thống cây trồng</h1>
                    <div className="settings-buttons">
                        <StartTimeSetting />
                        <LightIntensitySetting />
                        <TemperatureSetting />
                        <FertilizerSetting />
                        <WaterFlowSetting />
                        <ShieldSetting />
                    </div>
                </div>
            )}
        </div>
    );
}

export default SettingButton;
