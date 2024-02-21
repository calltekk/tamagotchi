const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Constructor function for creating DigitalPal objects
function DigitalPal(petType) {
  // Properties common to both cat and dog
  this.hungry = false;
  this.sleepy = false;
  this.bored = true;
  this.age = 0;
  this.outside = false;
  this.houseCondition = 100;

  // Methods specific to cat or dog
  if (petType === 'cat') {
    this.meow = function () {
      console.log("Meow! Meow!");
    };
    // Remove bark method for cats
    delete this.bark;
  } else if (petType === 'dog') {
    this.bark = function () {
      console.log("Woof! Woof!");
    };
    // Remove meow method for dogs
    delete this.meow;
  }
}

// Prototype methods for DigitalPal
DigitalPal.prototype.feed = function () {
  if (this.hungry) {
    console.log("That was yummy!");
    this.hungry = false;
    this.sleepy = true;
  } else {
    console.log("No thanks! I'm full.");
  }
  this.displayStats();
};

DigitalPal.prototype.sleep = function () {
  if (this.sleepy) {
    console.log("Zzzzzzzz");
    this.sleepy = false;
    this.bored = true;
    this.increaseAge();
  } else {
    console.log("No way! I'm not tired.");
  }
  this.displayStats();
};

DigitalPal.prototype.play = function () {
  if (this.bored) {
    console.log("Yay! Let's play!");
    this.bored = false;
    this.hungry = true;
  } else {
    console.log("Not right now. Later?");
  }
  this.displayStats();
};

DigitalPal.prototype.increaseAge = function () {
  this.age++;
  console.log("Happy Birthday to me! I am " + this.age + " years old!");
  this.displayStats();
};

DigitalPal.prototype.goOutside = function () {
  if (!this.outside) {
    console.log("Yay! I love the outdoors!");
    this.outside = true;
    this.bark();
  } else {
    console.log("We're already outside though...");
  }
  this.displayStats();
};

DigitalPal.prototype.goInside = function () {
  if (this.outside) {
    console.log("Do we have to? Fine...");
    this.outside = false;
  } else {
    console.log("I'm already inside...");
  }
  this.displayStats();
};

DigitalPal.prototype.destroyFurniture = function () {
  if (this.houseCondition > 0) {
    this.houseCondition -= 10;
    console.log("MUAHAHAHAHA! TAKE THAT FURNITURE!");
    this.bored = false;
    this.sleepy = true;
    if (this.houseCondition === 0) {
      console.log("House condition is critical! Destroying furniture is no longer allowed.");
    }
  }
  this.displayStats();
};

DigitalPal.prototype.buyNewFurniture = function () {
  this.houseCondition += 50;
  console.log("Are you sure about that?");
  this.displayStats();
};

DigitalPal.prototype.displayStats = function () {
  console.log(`Current stats:
    Age: ${this.age}
    Hunger: ${this.hungry ? 'Hungry' : 'Full'}
    Sleepy: ${this.sleepy ? 'Sleepy' : 'Not tired'}
    Bored: ${this.bored ? 'Bored' : 'Not bored'}
    Outside: ${this.outside ? 'Outside' : 'Inside'}
    House Condition: ${this.houseCondition}`);
};

// Initial prompt to choose between cat and dog
rl.question('Choose a pet (cat/dog): ', (petChoice) => {
  // Create a new DigitalPal instance based on the chosen pet
  const pet = petChoice.toLowerCase() === 'cat' ? new DigitalPal('cat') : new DigitalPal('dog');
  // Start interacting with the pet
  interactWithPet(pet);
});

// Function to interact with the pet, prompting user actions
function interactWithPet(pet) {
  rl.question(`What would you like to do with the pet? (feed/sleep/play/increaseAge/${pet.meow ? 'meow/' : ''}${pet.bark ? 'bark/' : ''}goOutside/goInside/destroyFurniture/buyNewFurniture/exit): `, (answer) => {
    if (answer === 'exit') {
      // Close the readline interface when exiting
      rl.close();
      return;
    }
    if (pet[answer]) {
      // Execute the selected action
      pet[answer]();
    } else {
      console.log("Invalid command");
    }
    // Continue interacting with the pet
    interactWithPet(pet);
  });
}
