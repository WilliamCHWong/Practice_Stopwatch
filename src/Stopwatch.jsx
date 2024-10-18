import React, { useState, useEffect, useRef } from "react"

function Stopwatch() {
    // State to track whether the stopwatch is running
    const [isRunning, setIsRunning] = useState(false)
    // State to track the total elapsed time in milliseconds
    const [elapsedTime, setElapsedTime] = useState(0)
    
    // useRef to hold the ID of the interval, so we can clear it later
    const intervalIdRef = useRef(null)
    
    // useRef to store the start time of the stopwatch
    const startTimeRef = useRef(0)

    // useEffect runs when the `isRunning` state changes
    useEffect(() => {
        if (isRunning) {
            // Start an interval that updates elapsed time every 10 milliseconds
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10)
        }
        // Clean up function to clear the interval when the stopwatch is stopped
        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [isRunning]) // Dependency array ensures this effect runs when `isRunning` changes

    // Function to start the stopwatch
    function start() {
        setIsRunning(true)
        // Adjust the start time so it accounts for the time already elapsed (for resume functionality)
        startTimeRef.current = Date.now() - elapsedTime
    }

    // Function to stop the stopwatch
    function stop() {
        setIsRunning(false) // Pause the stopwatch by setting `isRunning` to false
    }

    // Function to reset the stopwatch
    function reset() {
        setElapsedTime(0)   // Reset elapsed time to 0
        setIsRunning(false)  // Stop the stopwatch
    }

    // Function to format the elapsed time into hours:minutes:seconds:milliseconds
    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60)
        let seconds = Math.floor((elapsedTime / 1000) % 60)
        let milliseconds = Math.floor((elapsedTime % 1000) / 10)

        // Pad numbers to always show two digits
        hours = String(hours).padStart(2, "0")
        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")
        milliseconds = String(milliseconds).padStart(2, "0")

        // Return the formatted time string
        return `${hours}:${minutes}:${seconds}:${milliseconds}`
    }

    return (
        <div className="stopwatch">
            {/* Display the formatted time */}
            <div className="display">{formatTime()}</div>
            
            {/* Buttons to control the stopwatch */}
            <div className="controls">
                <button onClick={start} className="start-button">Start</button>
                <button onClick={stop} className="stop-button">Stop</button>
                <button onClick={reset} className="reset-button">Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch
