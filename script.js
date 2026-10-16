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
const exampleKey2 = "s" // the key that plays the example note
const exampleNote = "A4"; // the note it plays
const exampleNote2 = "D4";
let echo = false;

// Tara - Start
const monoKey = ["z", "x", "c", "v", "b", "n", "m"]
const monoNote = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"]
// Tara - End

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once
const metal = new Tone.MetalSynth().toDestination();
// Tara - Start
const mono = new Tone.MonoSynth().toDestination();
//Tara - End

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
// Aurthor: Am8013
function keyDown(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something

  // Holding a key down sends keydown again and again. Only react to the first one.
  if (event.repeat === false) {
    console.log("Key down:", event.key);

// Tara - Start
   for (let i = 0; i < monoKey.length; i++) {
    if (event.key === monoKey[i]) {
    mono.triggerAttack(monoNote[i], Tone.now());
  }
// Tara - End
}
    // Example: replace this with your own instrument.
    if (event.key === exampleKey  && echo === false) {
      synth.triggerAttack(exampleNote, Tone.now()); // keeps sounding until triggerRelease
    } else if (event.key === exampleKey  && echo === true) {
      synth.triggerAttack(exampleNote2, Tone.now()); // keeps sounding until triggerRelease

    } else if (event.key === exampleKey2  && echo === false) {
      metal.triggerAttack(exampleNote, Tone.now()); // keeps sounding until triggerRelease
    } else if (event.key === exampleKey2  && echo === true) {
      metal.triggerAttack(exampleNote2, Tone.now()); // keeps sounding until triggerRelease


    } else if (event.key === "Shift" && echo === false) {
      echo = true
    } else if (event.key === "Shift" && echo === true) {
      echo = false
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
    for (parameter = 0; parameter < storeOfTheNotes.length - 1; parameter++) {
      synth.triggerAttackRelease(
        storeOfTheNotes[parameter],
        "8n",
        Tone.now() + parameter * 0.5,
      );
    }
  }
}

function readyToPlay(event) {
  Tone.start();
  key = event.key;
  if (key === "e") {
    metal.frequency.value = 400;
    metal.envelope.decay = 0.3;
    metal.resonance = 2000;
    metal.triggerAttackRelease("8n");
  } else if (key === "w") {
    metal.frequency.value = 200;
    metal.envelope.decay = 0.6;
    metal.resonance = 4000;
    metal.triggerAttackRelease("2n");
  } else if (key === "r") {
    metal.frequency.value = 600;
    metal.envelope.decay = 0.9;
    metal.resonance = 6000;
    metal.triggerAttackRelease("8n");
  } else if (key === "f") {
    metal.frequency.value = 100;
    metal.envelope.decay = 0.3;
    metal.resonance = 1000;
    metal.triggerAttackRelease("8n");
  }
}
// Runs every time a key comes up.
// Aurthor: Am8013
function keyUp(event) {
  console.log("Key up:", event.key);

  // Example: replace this with your own instrument.
  if (event.key === exampleKey  && echo === false) {
      synth.triggerRelease(exampleNote, Tone.now()); // keeps sounding until triggerRelease
    } else if (event.key === exampleKey  && echo === true) {
      synth.triggerRelease(exampleNote2, Tone.now()); // keeps sounding until triggerRelease
    }

  if (event.key === exampleKey2  && echo === false) {
      metal.triggerRelease(exampleNote, Tone.now()); // keeps sounding until triggerRelease
    } else if (event.key === exampleKey2  && echo === true) {
      metal.triggerRelease(exampleNote2, Tone.now()); // keeps sounding until triggerRelease
}
// Tara - Start
   for (let i = 0; i < monoKey.length; i++) {
    if (event.key === monoKey[i]) {
    mono.triggerRelease();
   }
// Tara - End
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

setup(); // Always remember to call setup()!
