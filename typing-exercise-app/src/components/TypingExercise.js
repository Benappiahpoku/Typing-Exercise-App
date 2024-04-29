import React, { useState, useEffect, inputRef, useRef } from "react";
import VirtualKeyboard from "../components/VirtualKeyboard";

import "./TypingExercise.css";

const TypingExercise = () => {
const inputRef = useRef(null);
  // State variables
  const [passage, setPassage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [coins, setCoins] = useState(0);
  const [exerciseStarted, setExerciseStarted] = useState(false); // New state variable

  useEffect(() => {
    if (exerciseStarted) {
      // Automatically focus the input field when the exercise starts
      inputRef.current.focus();
    }
  }, [exerciseStarted]);

  // Effect to initialize the exercise
  useEffect(() => {
    // Sample passage for testing purposes
    const samplePassage = generateRandomPassage();

    // Initialize the exercise with the sample passage
    setPassage(samplePassage);
  }, []);

  // Event handler for user input
  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === passage[i]) {
        correctChars++;
      }
    }
    const newAccuracy = (correctChars / passage.length) * 100;
    setAccuracy(newAccuracy);

    // Calculate typing speed
    const elapsedTime = (Date.now() - startTime) / 1000; // Convert to seconds
    const newTypingSpeed = input.length / 5 / (elapsedTime / 60); // Assuming average word length is 5 characters
    setTypingSpeed(newTypingSpeed);
  };

  // Event handler for starting the exercise
  const handleStartExercise = () => {
    setUserInput("");
    setStartTime(Date.now());
    setTypingSpeed(0);
    setAccuracy(0);
    setCoins(coins + 1);
    // Reset user input for the next exercise
    setUserInput("");
    // Generate a new random passage for the next exercise
    const randomPassage = generateRandomPassage();
    setPassage(randomPassage);
  };

  // Event handler for starting the exercise
  const handleRestartExercise = () => {
    setUserInput("");
    setStartTime(Date.now());
    setTypingSpeed(0);
    setAccuracy(0);
    const randomPassage = generateRandomPassage();
    setPassage(randomPassage);
    setCoins(0);
  };

  // Function to generate a random passage
  const generateRandomPassage = () => {
    const passages = [
      "the cat jumped over the lazy dog who was sleeping in the garden and then ran away quickly to catch the mouse ",

      "she always wakes up early in the morning, makes coffee and reads the newspaper before going to work ",

      "he enjoys spending time with his family playing football and watching movies on weekends ",

      "we went shopping for groceries bought fruits vegetables and snacks and then headed home to cook dinner together. ",
      "they traveled to different countries explored new cultures and tasted various cuisines during their vacation ",

      "i love listening to music dancing with friends and relaxing at home after a long day at work. ",

      "the sun sets in the west painting the sky with hues of orange and pink signaling the end of another beautiful day ",

      "she studies hard every day attends classes and completes assignments to achieve her dream of becoming a doctor ",

      "he exercises regularly eats healthy meals and drinks plenty of water to maintain a fit and active lifestyle ",

      "the children play outside in the park running laughing and having fun until its time to go home for dinner",
    ];

    // Choose a random passage from the array
    const randomIndex = Math.floor(Math.random() * passages.length);
    return passages[randomIndex];
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <div className="typing-container">
        {/* <h1>Typing Focus </h1> */}
        {/* <header className="header-container">
          <nav>
            <ul>
              <li>
                <a href="/practice">Practice</a>
              </li>
              <li>
                <a href="/profile">Profile</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
          </nav>
          <img
            src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            alt=""
            className="header-img"
          />
        </header> */}

        <div>
          <div className="stats-container">
            <div className="stat">
              <p>Speed: {typingSpeed.toFixed(2)} wpm</p>
            </div>
            <div className="stat">
              <p>Accuracy: {accuracy.toFixed(2)}%</p>
            </div>
            <div className="stat">
              <p>Coins: {coins}</p>
            </div>
          </div>
          <p className="passage">
            {passage.split("").map((char, index) => {
              let className = "";
              if (index < userInput.length) {
                className = char === userInput[index] ? "correct" : "incorrect";
              }
              return (
                <span key={index} className={className}>
                  {char}
                </span>
              );
            })}
          </p>
          <div className="input-container">
            <textarea
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // Call your function here
                  handleStartExercise();
                }
              }}
            />
          </div>
          <div className="button-container">
            <div className="small-button ">
              <button className="start-button" onClick={handleStartExercise}>
                Start
              </button>
            </div>
            <div className="small-button ">
              <button className="reset-button" onClick={handleRestartExercise}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="keyboard-container">
        <VirtualKeyboard />
      </div>
    </div>
  );
};

export default TypingExercise;
