// Task 1: Promise basics explained using my birthday

const onMyBirthday = (isKayoSick) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!isKayoSick) {
        resolve(2);
      } else {
        reject(new Error("I am sad"));
      }
    }, 2000);
  });
};

onMyBirthday(false)
  .then((result) => {
    console.log(`I have ${result} cakes`);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Party"); // Shows in the console no matter what: Party
  });

//
//
// Task 2: Build a guessing game

const enterNumber = () => {
  return new Promise((resolve, reject) => {
    const userNumber = Number(window.prompt("Enter a number (1 - 6):")); // Ask the user to enter a number
    const randomNumber = Math.floor(Math.random() * 6 + 1); // Pick a random number between 1 and 6

    if (isNaN(userNumber)) {
      reject(new Error("Wrong Input Type")); // If the user enters a value that is not a number, run reject with an error
    }

    if (userNumber === randomNumber) {
      // If the user's number matches the random number, return 2 points
      resolve({
        points: 2,
        randomNumber,
      });
    } else if (
      userNumber === randomNumber - 1 ||
      userNumber === randomNumber + 1
    ) {
      // If the user's number is different than the random number by 1, return 1 point
      resolve({
        points: 1,
        randomNumber,
      });
    } else {
      // Else return 0 points
      resolve({
        points: 0,
        randomNumber,
      });
    }
  });
};

const continueGame = () => {
  return new Promise((resolve) => {
    if (window.confirm("Do you want to continue?")) {
      // Ask if the user want to continue the game with a confirm modal
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

const handleGuess = async () => {
  try {
    const result = await enterNumber(); // Instead of the then method, we can get the result directly by just putting await before the promise

    alert(`Dice: ${result.randomNumber}: you got ${result.points} points`);

    const isContinuing = await continueGame();

    if (isContinuing) {
      handleGuess();
    } else {
      alert("Game ends");
    }
  } catch (error) {
    // Instead of catch method, we can use the try, catch syntax
    alert(error);
  }
};

handleGuess(); // Run handleGuess function

//
//
// Task 3: Fetch country info from an API
const fetchData = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/alpha/col"); // Fetch Columbia's data
    const country = await res.json(); // Parse the JSON response

    console.log(country); // Log Columbia's data to the console
  } catch (error) {
    console.error("Failed to fetch country data:", error);
  }
};

fetchData();

//
//
// Task 4: Fetch a country's neighboring countries
const fetchCountry = async (alpha3Code) => {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${alpha3Code}`
    ); // Fetch country data by alpha3Code
    const data = await res.json(); // Parse the JSON response
    return data; // Return the country data
  } catch (error) {
    console.error(`Failed to fetch country with code ${alpha3Code}:`, error);
    return null; // Return null if the fetch fails
  }
};

const fetchCountryAndNeighbors = async () => {
  try {
    const columbia = await fetchCountry("col");

    // Ensure the data is not null and has borders
    if (!columbia || !columbia[0].borders) {
      console.log("No neighboring countries found for Columbia.");
      return;
    }

    // Fetch data for all neighboring countries
    const neighbors = await Promise.all(
      columbia[0].borders.map((border) => fetchCountry(border))
    );

    console.log(neighbors); // Log neighboring countries' data
  } catch (error) {
    console.error("Error fetching country and neighbors:", error);
  }
};

fetchCountryAndNeighbors();
