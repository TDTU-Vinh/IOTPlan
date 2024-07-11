import './App.css';
import SensorData from "./components/SensorData";
import DeleteButton from "./components/DeleteButton";
import SettingButton from "./components/SettingButton";
import Calculate from "./components/Calculate";
import logo from './assets/logo.jpg'; // Import hình ảnh logo
import Get20Data from './Get20Data';

function App() {
  const logoStyle = {
    width: '150px', // Đặt kích thước cho logo
    height: '150',
    marginRight: '20px' // Khoảng cách giữa logo và tiêu đề
  };

  return (
    <div className="App">
      <header>
        <img src={logo} alt="Logo" style={logoStyle} /> {/* Thêm thẻ <img> với kiểu nội tuyến */}
        <h1>HỆ THỐNG ĐIỀU KHIỂN VÀ GIÁM SÁT CÂY TRỒNG NHÀ KÍNH</h1>
        <Get20Data />
        <SensorData />
        <DeleteButton />
        <SettingButton />
        <Calculate />
      </header>
    </div>
  );
}

export default App;
