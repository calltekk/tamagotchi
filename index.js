// Importing the 'readline' module to handle user input
const readline = require('readline');

// Creating an interface for reading and writing from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Constructor function for Tamagotchi
function Tamagotchi(name, age, hunger, sleepiness, boredom, happiness) {
  // Properties of Tamagotchi
  this.name = name;
  this.age = age;
  this.hunger = hunger;
  this.sleepiness = sleepiness;
  this.boredom = boredom;
  this.happiness = happiness;
}

// Method to print Tamagotchi's current stats
Tamagotchi.prototype.printStats = function () {
  const text = `
    ${this.name}
    Age: ${this.age},
    Hunger: ${this.hunger},
    Sleepiness: ${this.sleepiness},
    Boredom: ${this.boredom},
    Happiness: ${this.happiness}
    `;
  console.log(text);
  console.log('========================');
};

// Method to feed the Tamagotchi
Tamagotchi.prototype.feed = function () {
  this.hunger -= 5;
  this.happiness += 5;
  console.log(`${this.name} has been fed!`);
  console.log('========================');
};

// Method to make the Tamagotchi sleep
Tamagotchi.prototype.sleep = function () {
  this.sleepiness -= 5;
  this.boredom += 5;
  console.log(`${this.name} went to sleep and feels refreshed!`);
  console.log('========================');
};

// Method to play with the Tamagotchi
Tamagotchi.prototype.play = function () {
  this.boredom -= 5;
  this.happiness += 10;
  console.log(`${this.name} had a great time playing!`);
  console.log('========================');
};

// Method to increase Tamagotchi's age
Tamagotchi.prototype.increaseAge = function () {
  this.age++;
  console.log(`${this.name} is now a year older!`);
  console.log('========================');
};

// Example usage: creating a Tamagotchi instance
const myTamagotchi = new Tamagotchi('Tama', 0, 20, 20, 10, 50);

// Function to interact with the Tamagotchi
function interactWithTamagotchi() {
  // Asking the user for input
  rl.question('What do you want to do? (feed/sleep/play/exit): ', (answer) => {
    // Handling user input
    if (answer.toLowerCase() === 'feed') {
      myTamagotchi.feed();
    } else if (answer.toLowerCase() === 'sleep') {
      myTamagotchi.sleep();
    } else if (answer.toLowerCase() === 'play') {
      myTamagotchi.play();
    } else if (answer.toLowerCase() === 'exit') {
      // Exiting the interaction if the user types 'exit'
      console.log('Goodbye!');
      rl.close();
      return;
    } else {
      // Handling invalid commands
      console.log('Invalid command. Try again.');
    }

    // Displaying the Tamagotchi's stats after the interaction
    myTamagotchi.printStats();
    // Continue the interaction
    interactWithTamagotchi();
  });
}

// Starting the interaction with the Tamagotchi
interactWithTamagotchi();
