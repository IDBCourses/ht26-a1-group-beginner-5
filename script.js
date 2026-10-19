/*
 * IDB Programming: A1 Modelling — a musical instrument
 *
 * All of the code for your instrument goes in this file. It's split into sections:
 *   settings — the "fixed" parts of your program
 *   state    — the parts of your program that change over time
 *   sound    — the Tone.js instruments and effects
 *   update   — updates the state every 100ms, if necessary
 *   use      — applies the state to make sound every 100ms, if necessary
 *   controls — what happens when a key goes down or comes up
 *   setup    — starts everything
 *
 * There is no loop in this assignment. Nothing happens until the player presses
 * a key, and every key event follows the same two steps:
 *   1. update: change the state, based on which key it was
 *   2. use:    make sound from the state
 *
 * Tone.js documentation: https://tonejs.github.io/docs/15.1.22/
 */

// ---------- Settings ----------
// Settings variables should contain all of the "fixed" parts of your programs
// For example: which key does what, which notes you can play, the tempo.
const exampleKey = "a";
const exampleKey2 = "s"; // the key that plays the example note
const exampleNote = "A4"; // the note it plays
const exampleNote2 = "A4";


const monoKey = ["z", "x", "c", "v", "b", "n", "m"]
const monoNote = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"]

// am8013 My keyboard
const myKeys = ["d", "f", "g", "h", "j"];
const myNotes = ["C4", "D4", "E4", "G4", "A4"];


// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.
let echo = true;
let storeOfTheNotes = [];

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once
const metal = new Tone.MetalSynth().toDestination();
const mono = new Tone.MonoSynth().toDestination();

// am8013 My sound
let myEchoEnabled = false;
const myDelay = new Tone.FeedbackDelay("8n", 0.3).toDestination();
const myDrySynth = new Tone.PolySynth(Tone.Synth).toDestination();
const myEchoSynth = new Tone.PolySynth(Tone.Synth).connect(myDelay);

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  // Example: replace this with your own instrument.

  setTimeout(playStoredNotes, 100); // call update() again in 100 milliseconds
}

// ---------- Use ----------
// Use the state to make sound. This is called every 100ms.
function use() {
  setTimeout(use, 100); // call use() again in 100 milliseconds
}

// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.
// Aurthor: Am8013 My keyboard controls
function myKeyboardDown(event) {
  Tone.start();

  const key = event.key.toLowerCase();

  if (event.repeat) return;

  if (key === "shift") {
    myEchoEnabled = true;
    return;
  }

  const index = myKeys.indexOf(key);

  if (index === -1) return;

  const note = myNotes[index];

  if (myEchoEnabled) {
    myEchoSynth.triggerAttackRelease(note, "8n");
  } else {
    myDrySynth.triggerAttackRelease(note, "8n");
  }
}

function myKeyboardUp(event) {
  if (event.key === "Shift") {
    myEchoEnabled = false;
  }
}

function keyDown(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something

  // Holding a key down sends keydown again and again. Only react to the first one.
  if (event.repeat === false) {
    console.log("Key down:", event.key);

    // Conditions that determine whether the note should just play or play and be stored in the array named storeOfTheNotes
    if (event.key === exampleKey && echo === false) {
      console.log("Note A4 has been added to the array");
      storeOfTheNotes.push("A4"); // pushes a note to the storage and plays it
      synth.triggerAttackRelease("A4", "10n");
    } else if (event.key === exampleKey && echo === true) {
      synth.triggerAttack(exampleNote2, Tone.now()); // just plays a note until the key is up
    } else if (event.key === exampleKey2 && echo === false) {
      console.log("A4 has been added to the array");
      storeOfTheNotes.push("A4"); //
    } else if (event.key === exampleKey2 && echo === true) {
      metal.triggerAttack(exampleNote2, Tone.now()); // just plays a sound util triggerRelease
    } else if (event.key === "Shift" && echo === false) {
      echo = true; //Enables us to use echo as we want to, is essential part of a few statements
    } else if (event.key === "Shift" && echo === true) {
      echo = false;
    }
  }
}

function monoKeyDown(event) {

   for (let i = 0; i < monoKey.length; i++) {
    if (event.key === monoKey[i]) {
    mono.triggerAttack(monoNote[i], Tone.now());
    }
   }
  }

function monoKeyUp(event) {

 for (let i = 0; i < monoKey.length; i++) {
    if (event.key === monoKey[i]) {
    mono.triggerRelease();
    }
  }
}


//A range of if statements that push notes to the array
function storeNotes(event) {
  let key = event.key;
  if (key === "p" && echo === false) {
    console.log("Note E4 has been added to the array");
    storeOfTheNotes.push("E4"); // plays and pushes the note
    synth.triggerAttackRelease("E4", "10n");
  } else if (key === "o" && echo === false) {
    console.log("Note A2 has been added to the array");
    storeOfTheNotes.push("A2"); // plays and pushes the note
    synth.triggerAttackRelease("A2", "10n");
  } else if (key === "l" && echo === false) {
    console.log("Note E3 has been added to the array");
    storeOfTheNotes.push("E3"); // plays and pushes the note
    synth.triggerAttackRelease("E3", "10n");
  } else if (key === "k" && echo === false) {
    console.log("Note B3 has been added to the array");
    storeOfTheNotes.push("B3"); // plays and pushes the note
    synth.triggerAttackRelease("B3", "10n");
  } else if (key === "u" && echo === false) {
    console.log("Note C5 has been added to the array");
    storeOfTheNotes.push("C5"); // plays and pushes the note
    synth.triggerAttackRelease("C5", "10n");
  } else if (key === "+") {
    console.log("You have removed a note at the end of the array"); // if you press + it pops the last note
    storeOfTheNotes.pop(); // that you have added to the array
  } else if (key === "-") {
    console.log("You have removed a note at the front of the array"); // if you press - you remove
    storeOfTheNotes.shift(); // note at the front
  } else if (key === "p" && echo === true) {
    synth.triggerAttackRelease("E4", "10n"); //if you do not press shift after opening html file then
  } else if (key === "o" && echo === true) {
    //all notes just play and will not be stored
    synth.triggerAttackRelease("A2", "10n");
  } else if (key === "l" && echo === true) {
    synth.triggerAttackRelease("E3", "10n");
  } else if (key === "k" && echo === true) {
    synth.triggerAttackRelease("B3", "10n");
  } else if (key === "u" && echo === true) {
    synth.triggerAttackRelease("C5", "10n");
  }
}

//This function enables us playing all notes in the array, approximately after 0.5 second, * 0.4 is more convinient
function playStoredNotes(event) {
  // because parameter grows just as the number of the note that is playing.
  let key = event.key;
  if (key === "i") {
    console.log("The notes you have stored are now playing");
    console.log(storeOfTheNotes);
    for (parameter = 0; parameter < storeOfTheNotes.length - 1; parameter++) {
      synth.triggerAttackRelease(
        storeOfTheNotes[parameter],
        "10n",
        Tone.now() + parameter * 0.4,
      );
    }
  } else if (key === "y") {
    console.log("Double quick stored notes are now playing");
    console.log(storeOfTheNotes);
    for (parameter = 0; parameter < storeOfTheNotes.length - 1; parameter++) {
      synth.triggerAttackRelease(
        storeOfTheNotes[parameter],
        "20n",
        Tone.now() + parameter * 0.2,
      );
    }
  }
}

//This function plays metal sounds
function readyToPlay(event) {
  Tone.start();
  key = event.key;
  if (key === "e") {
    metal.frequency.value = 100;
    metal.envelope.decay = 0.4;
    metal.resonance = 10000;
    metal.triggerAttackRelease("D3");
  } else if (key === "w") {
    metal.frequency.value = 160;
    metal.envelope.decay = 0.6;
    metal.resonance = 9000;
    metal.triggerAttackRelease("A4");
  } else if (key === "r") {
    metal.frequency.value = 710;
    metal.envelope.decay = 0.6;
    metal.resonance = 12000;
    metal.triggerAttackRelease("B4");
  } else if (key === "f") {
    metal.frequency.value = 100;
    metal.envelope.decay = 1;
    metal.resonance = 8500;
    metal.triggerAttackRelease("G6");
  }
}
// Runs every time a key comes up.
//Makes sure that keys as examplekey1/2 and exampleNote1/2 stop playing when the key is up.
function keyUp(event) {
  console.log("Key up:", event.key);

  // Example: replace this with your own instrument.
  if (event.key === exampleKey && echo === false) {
    synth.triggerRelease(exampleNote, Tone.now()); // keeps sounding until triggerRelease
  } else if (event.key === exampleKey && echo === true) {
    synth.triggerRelease(exampleNote2, Tone.now()); // keeps sounding until triggerRelease
  }

  if (event.key === exampleKey2 && echo === false) {
    metal.triggerRelease(exampleNote, Tone.now()); // keeps sounding until triggerRelease
  } else if (event.key === exampleKey2 && echo === true) {
    metal.triggerRelease(exampleNote2, Tone.now()); // keeps sounding until triggerRelease
  }
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  //
  update(); // start the update loop
  use(); // start the use loop

  // Put your event listener code here
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
  window.addEventListener("keydown", myKeyboardDown);
  window.addEventListener("keyup", myKeyboardUp);
  document.addEventListener("keydown", readyToPlay);
  document.addEventListener("keydown", storeNotes);
  document.addEventListener("keydown", playStoredNotes);
}
document.addEventListener("keydown", readyToPlay);
document.addEventListener("keydown", storeNotes);
document.addEventListener("keydown", playStoredNotes);
document.addEventListener("keydown", monoKeyDown);
document.addEventListener("keyup", monoKeyUp);

setup(); // Always remember to call setup()!
