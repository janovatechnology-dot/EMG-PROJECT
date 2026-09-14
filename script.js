/* =========================================
   JANOVA TECHNOLOGIES
   PATIENT CARE ASSISTANT
   Frontend Demo
========================================= */


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



/* COMMAND INFORMATION */

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



/* UPDATE TIME */

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



/* SHOW COMMAND */

function showCommand(command) {

    const data =
        commands[command];

    if (!data) return;


    messageElement.textContent =
        data.title;

    descriptionElement.textContent =
        data.description;

    iconElement.textContent =
        data.icon;

    timeElement.textContent =
        getTime();


    /* Animation */

    alertCard.style.transform =
        "scale(0.98)";

    setTimeout(() => {

        alertCard.style.transform =
            "scale(1)";

    }, 150);


    /* Notification */

    showNotification(
        command,
        data.description
    );

}



/* NOTIFICATION */

function showNotification(
    title,
    text
) {

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



/* DEMO BUTTON */

function simulateCommand(command) {

    console.log(
        "JANOVA COMMAND:",
        command
    );

    showCommand(command);

}



/* INITIAL STATUS */

window.addEventListener(
    "load",
    () => {

        console.log(
            "JANOVA Patient Care System Started"
        );

    }
);



/*
==================================================
FUTURE FIREBASE FUNCTION
==================================================

Firebase connect பண்ணும்போது
இந்த function-ஐ பயன்படுத்துவோம்.

Example:

listenForPatientCommand(command)

command = HELP
command = WATER
command = FOOD
command = YES
command = NO

==================================================
*/


function receiveESP32Command(command) {

    command =
        String(command)
        .trim()
        .toUpperCase();


    if (
        commands[command]
    ) {

        showCommand(command);

    }

}
