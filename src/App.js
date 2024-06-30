import './App.css';
import SensorData from "./components/SensorData";
import DeleteButton from "./components/DeleteButton";
import SettingButton from "./components/SettingButton";
import Calculate from "./components/Calculate";
function App() {
  return (
    <div className="App">
      <header>
        <h1>Nguyễn Thế Vinh </h1>

        <SensorData />
        <DeleteButton />
        <SettingButton />
        <Calculate />

      </header>
    </div>
  );
}

export default App;
