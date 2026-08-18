/* =====================================================
   BRIDGEGAP - JAVASCRIPT
   BridgeBot + Voice Assistant + Accessibility
===================================================== */


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let currentLanguage = "en";
let currentFontSize = 18;
let lastAnswer = "";

let speechRecognition = null;


/* =====================================================
   SECTION NAVIGATION
===================================================== */

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    const section = document.getElementById(sectionId);

    if (section) {
        section.classList.add("active");
    }

    document.querySelectorAll(".nav-link").forEach(button => {
        button.classList.remove("active");
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    const menu = document.getElementById("mobileMenu");

    menu.classList.toggle("open");
}


/* =====================================================
   LANGUAGE SYSTEM
===================================================== */

const translations = {

    en: {

        botGreeting:
            "👋 Hello! I am BridgeBot.\n\nI can help you with PhonePe, WhatsApp, video calls, YouTube, online scams and more.\n\nChoose an option above or type your question.",

        phonepe:
            `💳 How to send money using PhonePe:

1️⃣ Open the PhonePe app.
2️⃣ Tap "Send Money".
3️⃣ Select the person or enter their UPI ID.
4️⃣ Enter the amount.
5️⃣ Check the receiver's name carefully.
6️⃣ Tap Pay.
7️⃣ Enter your UPI PIN only when you are making a payment.

✅ Never share your UPI PIN with anyone.`,

        video:
            `📹 How to make a video call:

1️⃣ Open WhatsApp.
2️⃣ Open the person's chat.
3️⃣ Tap the video camera icon 📹.
4️⃣ Allow camera and microphone permissions if asked.
5️⃣ Wait for the person to answer.

✅ Make sure your internet connection is working.`,

        doctor:
            `🏥 How to book a doctor:

1️⃣ Open Practo or your hospital's official website.
2️⃣ Search for the type of doctor you need.
3️⃣ Select a doctor.
4️⃣ Check the available date and time.
5️⃣ Enter your details.
6️⃣ Confirm the appointment.

💡 If you are uncomfortable booking online, ask a trusted family member for help.`,

        scam:
            `⚠️ How to identify a scam:

🚨 Someone asks for your OTP → SCAM WARNING!
🚨 Someone asks for your UPI PIN → SCAM WARNING!
🚨 Someone says you won a lottery → SCAM WARNING!
🚨 Someone asks you to install an unknown app → SCAM WARNING!
🚨 Someone asks for urgent money → VERIFY FIRST!

✅ When in doubt, stop and ask someone you trust.
📞 For cyber financial fraud, call 1930.`,

        youtube:
            `▶️ How to use YouTube:

1️⃣ Open the YouTube app.
2️⃣ Tap the search icon 🔍.
3️⃣ Type what you want to watch.
4️⃣ Select a video.
5️⃣ Tap the video to play or pause.
6️⃣ Use the full-screen button for a larger view.

💡 Never click suspicious links sent by strangers.`,

        whatsapp:
            `💬 How to use WhatsApp:

1️⃣ Open WhatsApp.
2️⃣ Tap the new chat button.
3️⃣ Select a contact.
4️⃣ Type your message.
5️⃣ Press the send button ➤.

🎤 You can also hold the microphone button to send a voice message.`,

        balance:
            `🏦 How to check your bank balance:

1️⃣ Open your official bank application.
2️⃣ Log in securely.
3️⃣ Open "Account Summary" or "My Account".
4️⃣ Your balance will be displayed.

🔐 Never share your banking password or OTP.`,

        safety:
            `🔐 Important Online Safety Rules:

✅ Never share OTP.
✅ Never share UPI PIN.
✅ Never share ATM PIN.
✅ Don't click unknown links.
✅ Don't install unknown apps.
✅ Don't share your screen with strangers.
✅ Verify before sending money.
✅ Contact your bank using its official number.

📞 If you experience financial cyber fraud, call 1930.`

    },


    hi: {

        botGreeting:
            "👋 नमस्ते! मैं BridgeBot हूँ।\n\nमैं PhonePe, WhatsApp, वीडियो कॉल, YouTube और ऑनलाइन धोखाधड़ी के बारे में आपकी मदद कर सकता हूँ।\n\nनीचे दिए गए विकल्प को चुनें या अपना सवाल लिखें।",

        phonepe:
            `💳 PhonePe से पैसे भेजने का तरीका:

1️⃣ PhonePe खोलें।
2️⃣ "Send Money" दबाएं।
3️⃣ व्यक्ति या UPI ID चुनें।
4️⃣ राशि डालें।
5️⃣ प्राप्तकर्ता का नाम ध्यान से देखें।
6️⃣ Pay दबाएं।
7️⃣ भुगतान करते समय ही अपना UPI PIN डालें।

✅ अपना UPI PIN किसी को न बताएं।`,

        video:
            `📹 वीडियो कॉल करने का तरीका:

1️⃣ WhatsApp खोलें।
2️⃣ व्यक्ति की चैट खोलें।
3️⃣ वीडियो कैमरा 📹 दबाएं।
4️⃣ कैमरा और माइक्रोफोन की अनुमति दें।
5️⃣ व्यक्ति के जवाब देने का इंतजार करें।`,

        doctor:
            `🏥 डॉक्टर की अपॉइंटमेंट कैसे लें:

1️⃣ Practo या अस्पताल की आधिकारिक वेबसाइट खोलें।
2️⃣ डॉक्टर का प्रकार खोजें।
3️⃣ डॉक्टर चुनें।
4️⃣ तारीख और समय चुनें।
5️⃣ अपनी जानकारी भरें।
6️⃣ अपॉइंटमेंट की पुष्टि करें।`,

        scam:
            `⚠️ धोखाधड़ी की पहचान कैसे करें:

🚨 OTP मांगना → धोखाधड़ी हो सकती है!
🚨 UPI PIN मांगना → धोखाधड़ी!
🚨 लॉटरी जीतने का संदेश → धोखाधड़ी!
🚨 अज्ञात ऐप डाउनलोड करने को कहना → खतरा!
🚨 तुरंत पैसे भेजने को कहना → पहले जांच करें!

📞 साइबर वित्तीय धोखाधड़ी होने पर 1930 पर कॉल करें।`,

        youtube:
            `▶️ YouTube कैसे इस्तेमाल करें:

1️⃣ YouTube खोलें।
2️⃣ Search 🔍 दबाएं।
3️⃣ वीडियो का नाम लिखें।
4️⃣ वीडियो चुनें।
5️⃣ वीडियो चलाएं।

💡 अज्ञात लिंक पर क्लिक न करें।`,

        whatsapp:
            `💬 WhatsApp कैसे इस्तेमाल करें:

1️⃣ WhatsApp खोलें।
2️⃣ नया चैट दबाएं।
3️⃣ संपर्क चुनें।
4️⃣ संदेश लिखें।
5️⃣ Send ➤ दबाएं।

🎤 माइक्रोफोन दबाकर आवाज़ का संदेश भी भेज सकते हैं।`,

        balance:
            `🏦 बैंक बैलेंस कैसे देखें:

1️⃣ अपने बैंक का आधिकारिक ऐप खोलें।
2️⃣ सुरक्षित रूप से लॉगिन करें।
3️⃣ Account Summary खोलें।
4️⃣ आपका बैलेंस दिखाई देगा।

🔐 अपना पासवर्ड और OTP किसी को न बताएं।`,

        safety:
            `🔐 ऑनलाइन सुरक्षा नियम:

✅ OTP साझा न करें।
✅ UPI PIN साझा न करें।
✅ ATM PIN साझा न करें।
✅ अज्ञात लिंक पर क्लिक न करें।
✅ अज्ञात ऐप इंस्टॉल न करें।
✅ अजनबियों के साथ स्क्रीन शेयर न करें।
✅ पैसे भेजने से पहले जांच करें।

📞 साइबर धोखाधड़ी के लिए 1930 पर कॉल करें।`

    },


    te: {

        botGreeting:
            "👋 నమస్కారం! నేను BridgeBot.\n\nPhonePe, WhatsApp, వీడియో కాల్స్, YouTube మరియు ఆన్‌లైన్ మోసాల గురించి నేను మీకు సహాయం చేస్తాను.\n\nక్రింద ఉన్న ఎంపికను ఎంచుకోండి లేదా మీ ప్రశ్నను టైప్ చేయండి.",

        phonepe:
            `💳 PhonePe ద్వారా డబ్బు పంపడం:

1️⃣ PhonePe యాప్ ఓపెన్ చేయండి.
2️⃣ "Send Money" ఎంచుకోండి.
3️⃣ వ్యక్తిని లేదా UPI ID ఎంచుకోండి.
4️⃣ మొత్తం నమోదు చేయండి.
5️⃣ వ్యక్తి పేరు చెక్ చేయండి.
6️⃣ Pay నొక్కండి.
7️⃣ మీరు చెల్లింపు చేస్తున్నప్పుడు మాత్రమే UPI PIN నమోదు చేయండి.

✅ మీ UPI PIN ఎవరితోనూ పంచుకోవద్దు.`,

        video:
            `📹 వీడియో కాల్ చేయడం:

1️⃣ WhatsApp ఓపెన్ చేయండి.
2️⃣ వ్యక్తి chat ఓపెన్ చేయండి.
3️⃣ వీడియో కెమెరా 📹 నొక్కండి.
4️⃣ Camera మరియు Microphone permission ఇవ్వండి.
5️⃣ వారు కాల్ answer చేసే వరకు వేచి ఉండండి.`,

        doctor:
            `🏥 డాక్టర్ అపాయింట్‌మెంట్:

1️⃣ Practo లేదా ఆసుపత్రి అధికారిక website ఓపెన్ చేయండి.
2️⃣ అవసరమైన doctor కోసం search చేయండి.
3️⃣ Doctor ఎంచుకోండి.
4️⃣ Date మరియు Time ఎంచుకోండి.
5️⃣ మీ వివరాలు నమోదు చేయండి.
6️⃣ Appointment confirm చేయండి.`,

        scam:
            `⚠️ మోసాన్ని ఎలా గుర్తించాలి:

🚨 OTP అడిగితే → మోసం కావచ్చు!
🚨 UPI PIN అడిగితే → మోసం!
🚨 Lottery గెలిచారని చెబితే → మోసం!
🚨 Unknown app install చేయమంటే → ప్రమాదం!
🚨 వెంటనే డబ్బు పంపమంటే → ముందుగా verify చేయండి!

📞 Cyber financial fraud జరిగితే 1930కు కాల్ చేయండి.`,

        youtube:
            `▶️ YouTube ఉపయోగించడం:

1️⃣ YouTube ఓపెన్ చేయండి.
2️⃣ Search 🔍 నొక్కండి.
3️⃣ చూడాలనుకున్న video పేరు టైప్ చేయండి.
4️⃣ Video ఎంచుకోండి.
5️⃣ Video play చేయండి.

💡 Unknown links పై click చేయవద్దు.`,

        whatsapp:
            `💬 WhatsApp ఉపయోగించడం:

1️⃣ WhatsApp ఓపెన్ చేయండి.
2️⃣ New Chat నొక్కండి.
3️⃣ Contact ఎంచుకోండి.
4️⃣ Message టైప్ చేయండి.
5️⃣ Send ➤ నొక్కండి.

🎤 Microphone నొక్కి voice message పంపవచ్చు.`,

        balance:
            `🏦 Bank Balance చూడడం:

1️⃣ మీ Bank official app ఓపెన్ చేయండి.
2️⃣ Secure గా login అవ్వండి.
3️⃣ Account Summary ఎంచుకోండి.
4️⃣ మీ balance కనిపిస్తుంది.

🔐 Password మరియు OTP ఎవరికీ చెప్పవద్దు.`,

        safety:
            `🔐 Online Safety Rules:

✅ OTP share చేయవద్దు.
✅ UPI PIN share చేయవద్దు.
✅ ATM PIN share చేయవద్దు.
✅ Unknown links click చేయవద్దు.
✅ Unknown apps install చేయవద్దు.
✅ Strangers తో screen share చేయవద్దు.
✅ Money పంపే ముందు verify చేయండి.

📞 Cyber fraud కోసం 1930కు కాల్ చేయండి.`

    }

};


/* =====================================================
   CHANGE LANGUAGE
===================================================== */

function setLang(lang) {

    currentLanguage = lang;

    document.querySelectorAll(".lang-btn").forEach(button => {
        button.classList.remove("active");
    });

    const selected = document.getElementById("lang-" + lang);

    if (selected) {
        selected.classList.add("active");
    }

    const greeting = translations[lang].botGreeting;

    clearBotMessages();

    addBotMessage(greeting);

    updateVoiceStatus(
        lang === "en"
            ? "🌐 English selected."
            : lang === "hi"
                ? "🌐 हिंदी चुनी गई।"
                : "🌐 తెలుగు ఎంచుకోబడింది."
    );
}


/* =====================================================
   BRIDGEBOT
===================================================== */

function botOption(option) {

    const answer = translations[currentLanguage][option];

    if (!answer) return;

    addUserMessage(getOptionName(option));

    setTimeout(() => {

        addBotMessage(answer);

        lastAnswer = answer;

    }, 300);
}


function getOptionName(option) {

    const names = {

        phonepe: "💳 PhonePe Payment",
        video: "📹 Video Call",
        doctor: "🏥 Book Doctor",
        scam: "⚠️ Is this a Scam?",
        youtube: "▶️ YouTube Help",
        whatsapp: "💬 WhatsApp Help",
        balance: "🏦 Bank Balance",
        safety: "🔐 Online Safety"

    };

    return names[option] || option;
}


/* =====================================================
   ADD CHAT MESSAGE
===================================================== */

function addBotMessage(text) {

    const chatBox = document.getElementById("chatBox");

    const message = document.createElement("div");

    message.className = "message bot";

    const bubble = document.createElement("div");

    bubble.className = "bubble";

    bubble.textContent = text;

    message.appendChild(bubble);

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;

    lastAnswer = text;
}


function addUserMessage(text) {

    const chatBox = document.getElementById("chatBox");

    const message = document.createElement("div");

    message.className = "message user";

    const bubble = document.createElement("div");

    bubble.className = "bubble";

    bubble.textContent = text;

    message.appendChild(bubble);

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;
}


function clearBotMessages() {

    const chatBox = document.getElementById("chatBox");

    chatBox.innerHTML = "";

}


/* =====================================================
   TEXT CHAT
===================================================== */

function sendMessage() {

    const input = document.getElementById("userInput");

    const question = input.value.trim();

    if (!question) return;

    addUserMessage(question);

    input.value = "";

    const answer = understandQuestion(question);

    setTimeout(() => {

        addBotMessage(answer);

        lastAnswer = answer;

    }, 400);
}


function handleEnter(event) {

    if (event.key === "Enter") {
        sendMessage();
    }
}


/* =====================================================
   SIMPLE QUESTION UNDERSTANDING
===================================================== */

function understandQuestion(question) {

    const q = question.toLowerCase();

    const t = translations[currentLanguage];

    if (
        q.includes("phonepe") ||
        q.includes("upi") ||
        q.includes("payment") ||
        q.includes("pay")
    ) {
        return t.phonepe;
    }

    if (
        q.includes("video") ||
        q.includes("call")
    ) {
        return t.video;
    }

    if (
        q.includes("doctor") ||
        q.includes("hospital") ||
        q.includes("appointment")
    ) {
        return t.doctor;
    }

    if (
        q.includes("scam") ||
        q.includes("fraud") ||
        q.includes("otp") ||
        q.includes("lottery")
    ) {
        return t.scam;
    }

    if (
        q.includes("youtube") ||
        q.includes("video")
    ) {
        return t.youtube;
    }

    if (
        q.includes("whatsapp") ||
        q.includes("message")
    ) {
        return t.whatsapp;
    }

    if (
        q.includes("balance") ||
        q.includes("bank")
    ) {
        return t.balance;
    }

    if (
        q.includes("safe") ||
        q.includes("security") ||
        q.includes("password")
    ) {
        return t.safety;
    }

    return translations[currentLanguage].safety;
}


/* =====================================================
   READ PAGE
===================================================== */

function readPage() {

    stopSpeaking();

    const activeSection = document.querySelector(".section.active");

    if (!activeSection) return;

    const text = activeSection.innerText;

    speak(text);

    updateVoiceStatus("🔊 Reading the page aloud...");

}


/* =====================================================
   READ LAST BRIDGEBOT ANSWER
===================================================== */

function readLastAnswer() {

    if (!lastAnswer) {

        updateVoiceStatus(
            "ℹ️ Please ask BridgeBot a question first."
        );

        return;
    }

    speak(lastAnswer);

    updateVoiceStatus("🔊 Reading BridgeBot's answer...");

}


/* =====================================================
   TEXT TO SPEECH
===================================================== */

function speak(text) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Sorry, voice reading is not supported by this browser."
        );

        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang =
        currentLanguage === "hi"
            ? "hi-IN"
            : currentLanguage === "te"
                ? "te-IN"
                : "en-IN";

    speech.rate = 0.85;

    speech.pitch = 1;

    window.speechSynthesis.speak(speech);

}


function stopSpeaking() {

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    updateVoiceStatus("⏹️ Voice stopped.");
}


/* =====================================================
   VOICE COMMAND
===================================================== */

function startVoiceCommand() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Voice recognition is not supported in this browser. Please try Google Chrome."
        );

        return;
    }


    speechRecognition = new SpeechRecognition();

    speechRecognition.lang =
        currentLanguage === "hi"
            ? "hi-IN"
            : currentLanguage === "te"
                ? "te-IN"
                : "en-IN";

    speechRecognition.interimResults = false;

    speechRecognition.continuous = false;


    updateVoiceStatus(
        "🎤 Listening... Please speak now."
    );


    speechRecognition.start();


    speechRecognition.onresult = function (event) {

        const spokenText =
            event.results[0][0].transcript;

        updateVoiceStatus(
            "🎤 You said: " + spokenText
        );

        document.getElementById("userInput").value =
            spokenText;

        sendMessage();
    };


    speechRecognition.onerror = function () {

        updateVoiceStatus(
            "❌ I couldn't hear you. Please try again."
        );

    };


    speechRecognition.onend = function () {

        setTimeout(() => {

            updateVoiceStatus(
                "🎤 Voice assistant is ready."
            );

        }, 2500);

    };

}


/* =====================================================
   VOICE STATUS
===================================================== */

function updateVoiceStatus(message) {

    const status =
        document.getElementById("voiceStatus");

    if (status) {
        status.textContent = message;
    }
}


/* =====================================================
   TEXT SIZE
===================================================== */

function increaseText() {

    if (currentFontSize >= 28) {
        currentFontSize = 28;
    } else {
        currentFontSize += 2;
    }

    document.body.style.fontSize =
        currentFontSize + "px";

    updateVoiceStatus(
        "🔎 Text size increased."
    );
}


function decreaseText() {

    if (currentFontSize <= 14) {
        currentFontSize = 14;
    } else {
        currentFontSize -= 2;
    }

    document.body.style.fontSize =
        currentFontSize + "px";

    updateVoiceStatus(
        "🔍 Text size decreased."
    );
}


/* =====================================================
   HIGH CONTRAST
===================================================== */

function toggleContrast() {

    document.body.classList.toggle("high-contrast");

    if (
        document.body.classList.contains("high-contrast")
    ) {

        updateVoiceStatus(
            "👓 High contrast mode enabled."
        );

    } else {

        updateVoiceStatus(
            "👓 High contrast mode disabled."
        );

    }
}


/* =====================================================
   SENIOR MODE
===================================================== */

function toggleSeniorMode() {

    document.body.classList.toggle("senior-mode");

    if (
        document.body.classList.contains("senior-mode")
    ) {

        updateVoiceStatus(
            "🧓 Senior Friendly Mode enabled. Text and controls are larger."
        );

    } else {

        updateVoiceStatus(
            "🧓 Senior Friendly Mode disabled."
        );

    }
}


/* =====================================================
   GUIDES
===================================================== */

const guides = {

    whatsapp: {
        title: "💬 How to Use WhatsApp",
        sub: "Send messages, photos and voice notes easily.",
        tip: "💡 WhatsApp requires an internet connection.",
        steps: [
            ["1. Open WhatsApp", "Find the green WhatsApp icon and tap it."],
            ["2. Find a Contact", "Tap the new chat button and select a contact."],
            ["3. Type a Message", "Tap the message box and type your message."],
            ["4. Send the Message", "Press the send button ➤."],
            ["5. Send a Voice Message", "Hold the microphone 🎤 and speak."],
            ["6. Make a Call", "Open a chat and press the phone 📞 or video 📹 icon."]
        ]
    },

    upi: {
        title: "💳 How to Pay with UPI",
        sub: "Send money safely using PhonePe or Google Pay.",
        tip: "🔐 Always check the receiver's name before paying.",
        steps: [
            ["1. Open the UPI App", "Open PhonePe, Google Pay or another trusted UPI application."],
            ["2. Select Send Money", "Tap the option to send or pay."],
            ["3. Enter Details", "Enter the person's mobile number or UPI ID."],
            ["4. Enter Amount", "Enter the amount carefully."],
            ["5. Verify", "Check the receiver's name and amount."],
            ["6. Enter UPI PIN", "Enter your UPI PIN only when making a payment."]
        ]
    },

    netbanking: {
        title: "🏦 How to Use Net Banking",
        sub: "Check your balance and transactions safely.",
        tip: "🔐 Always log out after using net banking.",
        steps: [
            ["1. Open Your Bank App", "Use only the official bank application."],
            ["2. Enter Username", "Enter your Customer ID or username."],
            ["3. Enter Password", "Enter your password privately."],
            ["4. Enter OTP", "Enter the OTP sent to your registered number."],
            ["5. Check Balance", "Open Account Summary or My Account."],
            ["6. Log Out", "Always log out after completing your work."]
        ]
    },

    video: {
        title: "📹 How to Make a Video Call",
        sub: "See and talk to your family face-to-face.",
        tip: "💡 Sit somewhere with good lighting and a stable internet connection.",
        steps: [
            ["1. Open WhatsApp", "Open WhatsApp and select your contact."],
            ["2. Tap Video", "Tap the video camera 📹 icon."],
            ["3. Allow Camera", "Allow camera and microphone permissions."],
            ["4. Wait", "Wait for the other person to answer."],
            ["5. Talk", "Speak naturally during the call."],
            ["6. End Call", "Tap the red phone button to end."]
        ]
    },

    youtube: {
        title: "▶️ How to Watch YouTube",
        sub: "Watch news, devotional songs, education and entertainment.",
        tip: "💡 Avoid suspicious links sent by strangers.",
        steps: [
            ["1. Open YouTube", "Find the YouTube application and open it."],
            ["2. Search", "Tap the magnifying glass 🔍."],
            ["3. Type Your Search", "Type what you want to watch."],
            ["4. Select Video", "Choose the video you want."],
            ["5. Play", "Tap the video to play or pause."],
            ["6. Full Screen", "Use the full-screen button for a bigger view."]
        ]
    },

    doctor: {
        title: "🏥 How to Book a Doctor",
        sub: "Book an appointment online.",
        tip: "💡 If you are uncomfortable booking online, ask a trusted family member for help.",
        steps: [
            ["1. Open Practo", "Open Practo or the hospital's official website."],
            ["2. Search Doctor", "Search for the type of doctor you need."],
            ["3. Select Doctor", "Choose a suitable doctor."],
            ["4. Choose Date", "Select an available date and time."],
            ["5. Enter Details", "Enter your required information."],
            ["6. Confirm", "Confirm your appointment and save the confirmation."]
        ]
    }

};


function openGuide(type) {

    const guide = guides[type];

    if (!guide) return;

    const viewer =
        document.getElementById("guideViewer");

    const content =
        document.getElementById("guideContent");

    let html = `
        <h2 class="guide-title">${guide.title}</h2>

        <p class="guide-sub">
            ${guide.sub}
        </p>

        <div class="guide-tip">
            ${guide.tip}
        </div>
    `;


    guide.steps.forEach(step => {

        html += `
            <div class="step">

                <h3>${step[0]}</h3>

                <p>${step[1]}</p>

            </div>
        `;

    });


    content.innerHTML = html;

    viewer.classList.remove("hidden");

    viewer.scrollIntoView({
        behavior: "smooth"
    });

}


function closeGuide() {

    document
        .getElementById("guideViewer")
        .classList.add("hidden");

}


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "BridgeGap loaded successfully 💙"
    );

});
