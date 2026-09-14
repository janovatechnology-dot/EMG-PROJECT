// ======================================================
// JANOVA TECHNOLOGIES
// PATIENT CARE ASSISTANT
// Firebase Realtime Database + UI
// ======================================================


// ======================================================
// FIREBASE IMPORTS
// ======================================================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue
}
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";


// ======================================================
// FIREBASE CONFIGURATION
// ======================================================

const firebaseConfig = {

    apiKey: "AIzaSyDP5wgQ7TK5m_PTZKLEnVzTJpVmiN52w04",

    authDomain: "janova-care.firebaseapp.com",

    // 🔴 IMPORTANT:
    // Replace this with your Firebase Realtime Database URL
    databaseURL: "https://janova-care-default-rtdb.firebaseio.com",

    projectId: "janova-care",

    storageBucket: "janova-care.firebasestorage.app",

    messagingSenderId: "393749596699",

    appId: "1:393749596699:web:1ec79c92f83976e02a06be"
};


// ======================================================
// INITIALIZE FIREBASE
// ======================================================

const app = initializeApp(firebaseConfig);


// ======================================================
// INITIALIZE REALTIME DATABASE
// ======================================================

const db = getDatabase(app);


// ======================================================
// HTML ELEMENTS
// ======================================================

const messageElement =
    document.getElementById("message");

const descriptionElement =
    document.getElementById("messageDescription");

const iconElement =
    document.getElementById("alertIcon");

const timeElement =
    document.getElementById("alertTime");

const alertCard =
    document.getElementById("alertCard");

const notification =
    document.getElementById("notification");

const notificationTitle =
    document.getElementById("notificationTitle");

const notificationText =
    document.getElementById("notificationText");

const connectionText =
    document.getElementById("connectionText");

const networkStatus =
    document.getElementById("networkStatus");


// ======================================================
// COMMAND INFORMATION
// ======================================================

const commands = {

    HELP: {

        icon: "🆘",

        title: "HELP",

        description:
            "Patient requires immediate assistance."

    },


    WATER: {

        icon: "💧",

        title: "WATER",

        description:
            "Patient needs water."

    },


    FOOD: {

        icon: "🍽️",

        title: "FOOD",

        description:
            "Patient needs food."

    },


    YES: {

        icon: "✅",

        title: "YES",

        description:
            "Patient responded YES."

    },


    NO: {

        icon: "❌",

        title: "NO",

        description:
            "Patient responded NO."

    }

};


// ======================================================
// GET CURRENT TIME
// ======================================================

function getTime() {

    const now = new Date();

    return now.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


// ======================================================
// SHOW COMMAND ON SCREEN
// ======================================================

function showCommand(command) {

    const data =
        commands[command];

    if (!data) {

        console.log(
            "Unknown command:",
            command
        );

        return;

    }


    // Update main alert

    messageElement.textContent =
        data.title;

    descriptionElement.textContent =
        data.description;

    iconElement.textContent =
        data.icon;

    timeElement.textContent =
        getTime();


    // Small animation

    if (alertCard) {

        alertCard.style.transform =
            "scale(0.97)";

        setTimeout(() => {

            alertCard.style.transform =
                "scale(1)";

        }, 150);

    }


    // Show notification

    showNotification(
        command,
        data.description
    );


    console.log(
        "JANOVA PATIENT COMMAND:",
        command
    );

}


// ======================================================
// SHOW APP NOTIFICATION
// ======================================================

function showNotification(
    title,
    text
) {

    if (!notification) return;


    notificationTitle.textContent =
        "Patient Alert";


    notificationText.textContent =
        `${title} — ${text}`;


    notification.classList.add(
        "show"
    );


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    }, 4500);

}


// ======================================================
// DEMO BUTTON
// ======================================================

function simulateCommand(command) {

    console.log(
        "DEMO COMMAND:",
        command
    );


    showCommand(
        command
    );

}


// ======================================================
// RECEIVE ESP32 COMMAND
// ======================================================

function receiveESP32Command(command) {

    if (!command) return;


    command =
        String(command)
        .trim()
        .toUpperCase();


    console.log(
        "ESP32 → Firebase → JANOVA APP:",
        command
    );


    if (
        commands[command]
    ) {

        showCommand(
            command
        );

    }

}


// ======================================================
// FIREBASE REALTIME DATABASE
// PATIENT PATH
// ======================================================
//
// ESP32 will eventually write:
//
// janova
// └── patient01
// ├── command: "WATER"
// ├── timestamp: ...
// └── device: "ESP32-01"
//
// ======================================================

const patientRef =
    ref(
        db,
        "janova/patient01"
    );


// ======================================================
// LISTEN FOR REALTIME DATA
// ======================================================

onValue(

    patientRef,

    (snapshot) => {

        const data =
            snapshot.val();


        console.log(
            "Firebase data received:",
            data
        );


        // Firebase connection successful

        if (connectionText) {

            connectionText.textContent =
                "ESP32 / CLOUD ONLINE";

        }


        if (networkStatus) {

            networkStatus.textContent =
                "ONLINE";

        }


        // No data yet

        if (!data) {

            console.log(
                "Waiting for patient data..."
            );

            return;

        }


        // Get command

        if (data.command) {

            receiveESP32Command(
                data.command
            );

        }

    },


    (error) => {

        console.error(
            "Firebase error:",
            error
        );


        if (connectionText) {

            connectionText.textContent =
                "DATABASE ERROR";

        }


        if (networkStatus) {

            networkStatus.textContent =
                "OFFLINE";

        }

    }

);


// ======================================================
// PAGE START
// ======================================================

window.addEventListener(
    "load",
    () => {

        console.log(
            "================================"
        );

        console.log(
            "JANOVA TECHNOLOGIES"
        );

        console.log(
            "Patient Care Assistant Started"
        );

        console.log(
            "Firebase Realtime Database Ready"
        );

        console.log(
            "================================"
        );

    }
);


// ======================================================
// TEST COMMANDS
// ======================================================
//
// Browser console-ல்:
//
// simulateCommand("HELP")
// simulateCommand("WATER")
// simulateCommand("FOOD")
// simulateCommand("YES")
// simulateCommand("NO")
//
// ======================================================
