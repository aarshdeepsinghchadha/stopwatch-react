import { useState, useRef } from 'react';
import './App.css';

function App() {
  // State to hold the time in milliseconds
  const [time, setTime] = useState(0);

  // State to track whether the stopwatch is running or not
  const [isRunning, setIsRunning] = useState(false);

  // State to hold snapshots of the time at which the user took a snapshot
  const [snapshots, setSnapshots] = useState([]);

  // State to hold the last snapshot time
  const [lastSnapshotTime, setLastSnapshotTime] = useState(null);

  // Ref to keep track of the timer interval
  const timerRef = useRef(null);

  // Function to start the stopwatch
  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true); // Set the running state to true
      // Start an interval that increments the time every 10 milliseconds
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Update the time
      }, 10);
    }
  };

  // Function to stop the stopwatch
  const stopStopwatch = () => {
    clearInterval(timerRef.current); // Clear the interval to stop the timer
    setIsRunning(false); // Set the running state to false
  };

  // Function to reset the stopwatch
  const resetStopwatch = () => {
    clearInterval(timerRef.current); // Clear the interval to stop the timer
    setIsRunning(false); // Set the running state to false
    setTime(0); // Reset the time to 0
    setSnapshots([]); // Clear all snapshots
    setLastSnapshotTime(null); // Reset last snapshot time
  };

  // Function to take a snapshot of the current time and the previous snapshot
  const snapshotTime = () => {
    // Store the previous snapshot time if it exists
    const previousTime = lastSnapshotTime !== null ? lastSnapshotTime : 0;

    // Create a snapshot entry as an object
    const snapshotEntry = {
      previousTime, // Store the previous time
      currentTime: time, // Store the current time
    };

    // Add the new snapshot entry to the snapshots array
    setSnapshots((prevSnapshots) => [...prevSnapshots, snapshotEntry]);

    // Update last snapshot time with the current time
    setLastSnapshotTime(time); // Update the last snapshot time to the current time
  };

  // Function to format the time into a readable string (MM:SS:MS)
  const formatTime = (time) => {
    const milliseconds = ('0' + (time % 1000)).slice(-3); // Get milliseconds
    const seconds = ('0' + (Math.floor(time / 1000) % 60)).slice(-2); // Get seconds
    const minutes = ('0' + (Math.floor(time / 60000) % 60)).slice(-2); // Get minutes
    // Return formatted time as a string
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="stopwatch-container">
      <h1 className="title">Stopwatch</h1>
      <div className="time-display">{formatTime(time)}</div>
      <div className="controls">
        <button className="btn" onClick={startStopwatch}>Start</button>
        <button className="btn" onClick={stopStopwatch}>Stop</button>
        <button className="btn" onClick={resetStopwatch}>Reset</button>
        <button className="btn" onClick={snapshotTime}>Snapshot</button>
      </div>
      <div className="snapshots-container">
        <h3 className="snapshots-title">Snapshots</h3>
        <div className="snapshots">
          {snapshots.map((snapshot, index) => (
            <div key={index} className="snapshot-item">
              {formatTime(snapshot.previousTime)} - {formatTime(snapshot.currentTime)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
