const translations = {
    en: {
        app_title: "Identity Finder",
        hero_title: "Help Find Missing Persons",
        hero_desc: "Upload a photo or capture a live image to search our real-time database and live web sources.",
        drag_drop: "Drag & drop an image here",
        or: "or",
        upload_btn: "Upload Image",
        camera_btn: "Take Photo",
        capture_photo: "Capture Live Photo",
        snap_btn: "Snap",
        analyzing: "Analyzing Image...",
        results_title: "Search Results",
        match_found: "Match Found",
        reg_no: "Reg No:",
        relation: "Relation:",
        missing_since: "Missing Since:",
        last_seen: "Last Seen:",
        contact: "Contact:",
        age: "Age:",
        district: "District:",
        confidence: "Confidence Score:",
        new_search: "New Search",
        no_match: "No Match Found",
        reg_prompt: "This person is not in our database or live web sources. Please register their details.",
        submit_reg: "Register Missing Person",
        cancel: "Cancel"
    },
    hi: {
        app_title: "पहचान खोजक",
        hero_title: "लापता लोगों को खोजने में मदद करें",
        hero_desc: "हमारे रीयल-टाइम डेटाबेस और लाइव वेब स्रोतों को खोजने के लिए एक फोटो अपलोड करें या एक लाइव छवि कैप्चर करें।",
        drag_drop: "यहां एक छवि खींचें और छोड़ें",
        or: "या",
        upload_btn: "छवि अपलोड करें",
        camera_btn: "फोटो खींचें",
        capture_photo: "लाइव फोटो कैप्चर करें",
        snap_btn: "क्लिक करें",
        analyzing: "छवि का विश्लेषण हो रहा है...",
        results_title: "खोज परिणाम",
        match_found: "मैच मिला",
        reg_no: "पंजीकरण संख्या:",
        relation: "संबंध:",
        missing_since: "लापता होने की तारीख:",
        last_seen: "अंतिम बार देखा गया:",
        contact: "संपर्क:",
        age: "आयु:",
        district: "ज़िला:",
        confidence: "विश्वास स्कोर:",
        new_search: "नई खोज",
        no_match: "कोई मैच नहीं मिला",
        reg_prompt: "यह व्यक्ति हमारे डेटाबेस या लाइव वेब स्रोतों में नहीं है। कृपया उनका विवरण दर्ज करें।",
        submit_reg: "लापता व्यक्ति को पंजीकृत करें",
        cancel: "रद्द करें"
    },
    te: {
        app_title: "గుర్తింపు ఫైండర్",
        hero_title: "తప్పిపోయిన వ్యక్తులను కనుగొనడంలో సహాయం చేయండి",
        hero_desc: "మా నిజ-సమయ డేటాబేస్ మరియు లైవ్ వెబ్ మూలాలను శోధించడానికి ఫోటోను అప్‌లోడ్ చేయండి లేదా లైవ్ చిత్రాన్ని తీయండి.",
        drag_drop: "చిత్రాన్ని ఇక్కడ లాగి వదలండి",
        or: "లేదా",
        upload_btn: "చిత్రాన్ని అప్‌లోడ్ చేయండి",
        camera_btn: "ఫోటో తీయండి",
        capture_photo: "లైవ్ ఫోటో తీయండి",
        snap_btn: "స్నాప్",
        analyzing: "చిత్రాన్ని విశ్లేషిస్తోంది...",
        results_title: "శోధన ఫలితాలు",
        match_found: "సరిపోలిక కనుగొనబడింది",
        reg_no: "రిజిస్ట్రేషన్ నం:",
        relation: "సంబంధం:",
        missing_since: "తప్పిపోయిన తేదీ:",
        last_seen: "చివరిగా చూసినది:",
        contact: "సంప్రదింపు:",
        age: "వయస్సు:",
        district: "జిల్లా:",
        confidence: "విశ్వాస స్కోరు:",
        new_search: "కొత్త శోధన",
        no_match: "సరిపోలిక కనుగొనబడలేదు",
        reg_prompt: "ఈ వ్యక్తి మా డేటాబేస్ లేదా లైవ్ వెబ్ మూలాల్లో లేరు. దయచేసి వారి వివరాలను నమోదు చేయండి.",
        submit_reg: "తప్పిపోయిన వ్యక్తిని నమోదు చేయండి",
        cancel: "రద్దు చేయి"
    }
};

function changeLanguage() {
    const lang = document.getElementById("language-select").value;
    const elements = document.querySelectorAll("[data-i18n]");
    
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
    
    // Fallbacks for placeholders
    if (lang === 'en') {
        document.getElementById("reg-name").placeholder = "Full Name (Required)";
        document.getElementById("reg-relation").placeholder = "Relation";
    } else if (lang === 'hi') {
        document.getElementById("reg-name").placeholder = "पूरा नाम (आवश्यक)";
        document.getElementById("reg-relation").placeholder = "संबंध";
    } else if (lang === 'te') {
        document.getElementById("reg-name").placeholder = "పూర్తి పేరు (తప్పనిసరి)";
        document.getElementById("reg-relation").placeholder = "సంబంధం";
    }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
    changeLanguage(); // set default based on select box (English)
});
