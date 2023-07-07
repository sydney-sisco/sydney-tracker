import { useState } from 'react';
import { socket } from '../utils/socket'

function ActivityComponent() {
  const [activity, setActivity] = useState('bike');
  const [isRecording, setIsRecording] = useState(false);

  const handleChange = (event) => {
    setActivity(event.target.value);
  }

  const toggleRecording = () => {
    if (isRecording) {
      console.log(`Stopped recording activity: ${activity}`);
      socket.emit('activityStop', activity);
    } else {
      console.log(`Started recording activity: ${activity}`);
      socket.emit('activityStart', activity);
    }
    setIsRecording(!isRecording);
  }

  return (
    <div>
      <select value={activity} onChange={handleChange} disabled={isRecording}>
        <option value="walk">Walk</option>
        <option value="run">Run</option>
        <option value="bike">Bike</option>
        <option value="drive">Drive</option>
      </select>
      <button onClick={toggleRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}

export default ActivityComponent;