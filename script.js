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
const exampleKey = "a"; // the key that plays the example note
const exampleNote = "C4"; // the note it plays
let storeOfTheNotes = [];
let metalStoreNotes = [];
// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once
const metal = new Tone.MetalSynth().toDestination();

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  // Example: replace this with your own instrument.

  setTimeout(update, 100); // call update() again in 100 milliseconds
}

// ---------- Use ----------
// Use the state to make sound. This is called every 100ms.
function use() {
  setTimeout(use, 100); // call use() again in 100 milliseconds
}

// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.
function keyDown(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something

  // Holding a key down sends keydown again and again. Only react to the first one.
  if (event.repeat === false) {
    console.log("Key down:", event.key);



    // Example: replace this with your own instrument.
    if (event.key === exampleKey) {
      synth.triggerAttack(exampleNote, Tone.now()); // keeps sounding until triggerRelease
    }
  }
}

function storeNotes(event) {
  let key = event.key;
  if (key === "p") {
    console.log("Letter P has been added to the array");
    storeOfTheNotes.push("E4");
  } else if (key === "o") {
    console.log("Letter O has been added to the array");
    storeOfTheNotes.push("A2");
  } else if (key === "l") {
    console.log("Letter L has been added to the array");
    storeOfTheNotes.push("E3");
  } else if (key === "k") {
    console.log("Letter K has been added to the array");
    storeOfTheNotes.push("B3");
  } else if (key === "m") {
    console.log("Letter M has been added to the array");
    storeOfTheNotes.push("D4");
  } else if (key === "j") {
    console.log("Letter J has been added to the array");
    storeOfTheNotes.push("F4");
  } else if (key === "+") {
    console.log("You have removed a note at the end of the array");
    storeOfTheNotes.pop();
  } else if (key === "-") {
    console.log("You have removed a note at the front of the array");
    storeOfTheNotes.shift();
  }
}

function playStoredNotes(event) {
  let key = event.key;
  if (key === "i") {
    console.log("The notes you have stored are now playing");
    console.log(storeOfTheNotes);
    for (parameter = 0; parameter < storeOfTheNotes.length; parameter++) {
      synth.triggerAttackRelease(
        storeOfTheNotes[parameter],
        "8n",
        Tone.now() + parameter * 0.5,
      );
    }
  }
}

function storeNotesMetal(event) {
  let key = event.key;
  if (key === "e") {
    console.log("Letter E has been added to the array");
    metalStoreNotes.push("F1");
  } else if (key === "w") {
    console.log("Letter W has been added to the array");
    metalStoreNotes.push("G2");
  } else if (key === "r") {
    console.log("Letter R has been added to the array");
    metalStoreNotes.push("E1");
  } else if (key === "k") {
    console.log("Letter K has been added to the array");
    metalStoreNotes.push("D1");
  }else if (key === "l") {
    console.log("Letter L has been added to the array");
    metalStoreNotes.push("A1");
}
}
function readyToPlay(event) {
  Tone.start();
  key = event.key;
  if (key === "e") {
    metal.triggerAttackRelease("F1");
  } else if (key === "w") {
    metal.triggerAttackRelease("G2");
  } else if (key === "r") {
    metal.triggerAttackRelease("E1");
  } else if (key === "k") {
    metal.triggerAttackRelease("D1");
  } else if (key === "l"){
    metal.triggerAttackRelease("A1");
  }
 }

function playStoredNotesMetal(event) {
  let key = event.key;
  if (key === "q") {
    console.log("The notes you have stored are now playing");
    console.log(metalStoreNotes);
    for (parameter = 0; parameter < metalStoreNotes.length; parameter++) {
      metal.triggerAttackRelease(
        metalStoreNotes[parameter],
        "8n",
        Tone.now() + parameter * 0.27,
      );
    }
  }
}

// Runs every time a key comes up.
function keyUp(event) {
  console.log("Key up:", event.key);

  // Example: replace this with your own instrument.
  if (event.key === exampleKey) {
    synth.triggerRelease(exampleNote, Tone.now());
  }
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Put your event listener code here
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
}
document.addEventListener("keydown", readyToPlay);
document.addEventListener("keydown", storeNotes);
document.addEventListener("keydown", playStoredNotes);
document.addEventListener("keydown", storeNotesMetal);
document.addEventListener("keydown", playStoredNotesMetal);
setup(); // Always remember to call setup()!
