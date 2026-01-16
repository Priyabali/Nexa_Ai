let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice= document.querySelector("#voice");

// Speak function
function speak(text, lang = "en-US") {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = lang;

    // Show text in content while speaking
    if (content) content.innerText = text;

    // Clear content after speaking ends
    utterance.onend = () => {
        setTimeout(() => {
            if (content) content.innerText = "";
        }, 1000);
    };

    window.speechSynthesis.speak(utterance);
}

// Wish based on time
function wishMe() {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) speak("Good Morning Sir");
    else if (hours >= 12 && hours < 16) speak("Good Afternoon Sir");
    else speak("Good Evening Sir");
}

// Call wishMe on page load
window.addEventListener('load', () => {
    wishMe();
});








// Command handling function
function takeCommand(message) {
    btn.style.display="flex"
    voice.style.display ="none"
    const msg = message.toLowerCase().trim();

    if (msg.includes("hello") || msg.includes("hi")) {
        speak("Hello sir, what can I help you with?");
        return true;
    } 
    else if (msg.includes("who are you")) {
        speak("I am your virtual assistant, created by Priya.");
        return true;
    } 
    else if (msg.includes("time")) {
        const now = new Date();
        speak(`The current time is ${now.getHours()} hours and ${now.getMinutes()} minutes`);
        return true;
    }
    else if (msg.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com", "_blank");
        return true;
    }
    else if (msg.includes("how are you") || msg.includes("how are nexa")) {
    speak("I'm fine, how can I help you?");
    return true;
}

    else if (msg.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com", "_blank");
        return true;
    }

     else if (msg.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com", "_blank");
        return true;
    }
     else if (msg.includes("open instagram")) {
        speak("Opening Instagram....");
        window.open("https://www.instagram.com", "_blank");
        return true;
    }
     else if (msg.includes("open whatsapp")) {
        speak("Opening Whatsapp....");
        window.open("https://www.whatsapp.com", "_blank");
        return true;
    }
     else if (msg.includes("open calcultor")) {
        speak("Opening Calcultor....");
        window.open("calcultor://");
        return true;
    }


    else {
       let final = "this is what i found on internet regarding " + message.replace("nexa", "")|| message.replace("nexa", "")

        speak(final)
        window.open(`https://www.google.com/search?q=${message.replace("nexa", "")}`,"_blank")
    }

    

    // No command matched
    return false;
}







// Speech recognition setup
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition!");
} else {
    let recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        let transcript = event.results[0][0].transcript;
        console.log("You said:", transcript);

        if (content) content.innerText = transcript;

        // Execute command
        takeCommand(transcript);
    };

    recognition.onerror = (event) => {
        console.error("Recognition error:", event.error);
    };

    // Start recognition when button is clicked
    btn.addEventListener("click", () => {
        recognition.start();
        btn.style.display="none"
        voice.style.display ="block"
    });
}











