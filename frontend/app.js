const API_URL = "http://localhost:8000/api";

let selectedFile = null;

// Theme Toggle
function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    
    const icon = document.querySelector("#theme-btn i");
    if(newTheme === "dark") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

// Set Dark Theme by Default
document.documentElement.setAttribute("data-theme", "dark");
document.querySelector("#theme-btn i").classList.replace("fa-moon", "fa-sun");


// Drag & Drop Handlers
const dropZone = document.getElementById("drop-zone");

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "var(--primary-hover)";
});

dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "var(--primary)";
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "var(--primary)";
    
    if (e.dataTransfer.files.length > 0) {
        processFile(e.dataTransfer.files[0]);
    }
});

// File Upload
function handleFileUpload(event) {
    if (event.target.files.length > 0) {
        processFile(event.target.files[0]);
    }
}

function processFile(file) {
    selectedFile = file;
    
    // Show Preview
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("image-preview").src = e.target.result;
        document.getElementById("preview-area").classList.remove("hidden");
        document.getElementById("upload-section").querySelector(".upload-container").classList.add("hidden");
        document.getElementById("results-section").classList.add("hidden");
        
        // Simulate sending to backend
        sendToAgent(file);
    };
    reader.readAsDataURL(file);
}

// Camera Handling
const cameraModal = document.getElementById("camera-modal");
const cameraFeed = document.getElementById("camera-feed");
let stream = null;

async function openCamera() {
    cameraModal.classList.remove("hidden");
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraFeed.srcObject = stream;
    } catch (err) {
        console.error("Camera access denied:", err);
        alert("Camera access is required to take a live photo.");
        closeCamera();
    }
}

function closeCamera() {
    cameraModal.classList.add("hidden");
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}

function captureSnapshot() {
    const canvas = document.createElement("canvas");
    canvas.width = cameraFeed.videoWidth;
    canvas.height = cameraFeed.videoHeight;
    canvas.getContext("2d").drawImage(cameraFeed, 0, 0);
    
    canvas.toBlob((blob) => {
        const file = new File([blob], "snapshot.jpg", { type: "image/jpeg" });
        closeCamera();
        processFile(file);
    });
}

// API Integration
async function sendToAgent(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${API_URL}/search`, {
            method: "POST",
            body: formData
        });
        
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error("Agent Error:", error);
        // Fallback simulate response for hackathon viewing if backend not running
        setTimeout(() => {
            displayResults({
                workflow: "registration_required",
                message: "Backend offline. Demo simulated Registration."
            });
        }, 1500);
    }
}

function displayResults(data) {
    document.getElementById("preview-area").querySelector(".loader").classList.add("hidden");
    document.getElementById("preview-area").querySelector("h3").innerText = "Analysis Complete";
    
    document.getElementById("results-section").classList.remove("hidden");
    
    const matchCard = document.getElementById("match-card");
    const regCard = document.getElementById("registration-card");
    
    if (data.workflow === "db_search" || data.workflow === "web_search") {
        matchCard.classList.remove("hidden");
        regCard.classList.add("hidden");
        
        const details = data.result.data || data.db_near_match || {};
        
        document.getElementById("match-name").innerText = details["Name"] || "Unknown";
        document.getElementById("match-reg").innerText = details["Registration Number"] || "N/A";
        document.getElementById("match-rel").innerText = details["Relation"] || "N/A";
        document.getElementById("match-date").innerText = details["Date Missing From"] || "N/A";
        document.getElementById("match-last").innerText = details["Last seen"] || "N/A";
        document.getElementById("match-contact").innerText = details["mobile numbers"] || "N/A";
        document.getElementById("match-age").innerText = details["age"] || "N/A";
        document.getElementById("match-district").innerText = details["District"] || "N/A";
        
        if (data.workflow === "db_search") {
            document.getElementById("match-confidence").innerText = `${(data.result.confidence * 100).toFixed(1)}%`;
        } else {
            document.getElementById("match-confidence").innerText = "Web Match Found";
            document.getElementById("match-confidence").style.color = "var(--warning)";
        }
        
        document.getElementById("match-image").src = details["Person Image web Link"] || document.getElementById("image-preview").src;
    } else {
        matchCard.classList.add("hidden");
        regCard.classList.remove("hidden");
    }
}

function resetSearch() {
    selectedFile = null;
    document.getElementById("preview-area").classList.add("hidden");
    document.getElementById("preview-area").querySelector(".loader").classList.remove("hidden");
    document.getElementById("preview-area").querySelector("h3").setAttribute("data-i18n", "analyzing");
    changeLanguage(); // reset translation for Analyzing...
    
    document.getElementById("upload-section").querySelector(".upload-container").classList.remove("hidden");
    document.getElementById("results-section").classList.add("hidden");
    document.getElementById("file-upload").value = "";
    document.getElementById("registration-form").reset();
}

async function submitRegistration(e) {
    e.preventDefault();
    
    const payload = {
        name: document.getElementById("reg-name").value,
        relation: document.getElementById("reg-relation").value,
        date_missing: document.getElementById("reg-date").value,
        last_seen: document.getElementById("reg-lastseen").value,
        mobile: document.getElementById("reg-mobile").value,
        age: document.getElementById("reg-age").value,
        languages: document.getElementById("reg-languages").value,
        district: document.getElementById("reg-district").value,
        mental_health: "Normal",
        image_url: document.getElementById("image-preview").src
    };
    
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            alert("Missing Person Successfully Registered.");
            resetSearch();
        } else {
            alert("Error registering. Is Backend Running?");
        }
    } catch (error) {
        console.error(error);
        alert("Registration Request Sent! (Mock demo Mode)");
        resetSearch();
    }
}
