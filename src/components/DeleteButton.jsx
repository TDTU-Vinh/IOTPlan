import React, { useState } from 'react';

function DeleteButton() {
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (password !== '123456') {
            setError('Mật khẩu không đúng, vui lòng thử lại.');
            return;
        }

        try {
            const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-cavmt/endpoint/VinhDeleteChart', {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Successfully deleted data:', responseData);

            // Clear password and error after successful deletion
            setPassword('');
            setError('');
            setShowPasswordPrompt(false);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <button onClick={() => setShowPasswordPrompt(true)}>Xóa dữ liệu</button>
            {showPasswordPrompt && (
                <div>
                    <label>
                        Mật khẩu:
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </label>
                    <button onClick={handleDelete}>Xác nhận</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
        </div>
    );
}

export default DeleteButton;
