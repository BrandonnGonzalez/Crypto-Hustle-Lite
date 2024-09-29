import React, { useState } from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "../drinks.json";  // Adjust the path as needed
import './BaristaForm.css';

const BaristaForm = () => {
  const [inputs, setInputs] = useState({
    'temperature': '',
    'milk': '',
    'syrup': '',
    'blended': ''
  });

  const [currentDrink, setCurrentDrink] = useState("");
  const [trueRecipe, setTrueRecipe] = useState({});
  const [correctTemp, setCorrectTemp] = useState('');
  const [correctMilk, setCorrectMilk] = useState('');
  const [correctSyrup, setCorrectSyrup] = useState('');
  const [correctBlended, setCorrectBlended] = useState('');

  const ingredients = {
    'temperature': ['hot', 'lukewarm', 'cold'],
    'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
    'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
    'blended': ['yes', 'turbo', 'no']
  };

  const getNextDrink = () => {
    let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
    setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
  }

  const onNewDrink = () => {
    setInputs({
      'temperature': '',
      'milk': '',
      'syrup': '',
      'blended': ''
    });
    setCorrectTemp('');
    setCorrectMilk('');
    setCorrectSyrup('');
    setCorrectBlended('');
    getNextDrink();
  }

  const onCheckAnswer = () => {
    setCorrectTemp(trueRecipe.temp === inputs['temperature'] ? 'correct' : 'wrong');
    setCorrectMilk(trueRecipe.milk === inputs['milk'] ? 'correct' : 'wrong');
    setCorrectSyrup(trueRecipe.syrup === inputs['syrup'] ? 'correct' : 'wrong');
    setCorrectBlended(trueRecipe.blended === inputs['blended'] ? 'correct' : 'wrong');
  }

  return (
    <div className="form-container">
      <h2>Hi, I'd like to order a:</h2>
      <div className="drink-container">
        <h2 className="mini-header">{currentDrink}</h2>
        <button type="button" className="button newdrink" onClick={onNewDrink}>🔄</button>
      </div>

      <form className="form">
        <div className="mini-container">
          <h3>Temperature</h3>
          <div className={`answer-space ${correctTemp}`}>
            {inputs["temperature"]}
          </div>
          <RecipeChoices
            handleChange={(e) => setInputs((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))}
            label="temperature"
            choices={ingredients["temperature"]}
            checked={inputs["temperature"]}
          />
        </div>

        <div className="mini-container">
          <h3>Syrup</h3>
          <div className={`answer-space ${correctSyrup}`}>
            {inputs["syrup"]}
          </div>
          <RecipeChoices
            handleChange={(e) => setInputs((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))}
            label="syrup"
            choices={ingredients["syrup"]}
            checked={inputs["syrup"]}
          />
        </div>

        <div className="mini-container">
          <h3>Milk</h3>
          <div className={`answer-space ${correctMilk}`}>
            {inputs["milk"]}
          </div>
          <RecipeChoices
            handleChange={(e) => setInputs((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))}
            label="milk"
            choices={ingredients["milk"]}
            checked={inputs["milk"]}
          />
        </div>

        <div className="mini-container">
          <h3>Blended</h3>
          <div className={`answer-space ${correctBlended}`}>
            {inputs["blended"]}
          </div>
          <RecipeChoices
            handleChange={(e) => setInputs((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))}
            label="blended"
            choices={ingredients["blended"]}
            checked={inputs["blended"]}
          />
        </div>
      </form>

      <button type="button" className="button submit" onClick={onCheckAnswer}>Check Answer</button>
    </div>
  );
};

export default BaristaForm;
