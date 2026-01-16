let timer;
let isFocusing = false;

// 1. The "Focus Police" - Detects Tab Switching
document.addEventListener("visibilitychange", () => {
    if (document.hidden && isFocusing) {
        killPlant("You left the garden! The plant died.");
    }
});

function startFocus() {
    if (isFocusing) return;
    
    const minutes = document.getElementById("time-input").value;
    const duration = minutes * 60; // Convert to seconds
    let timeLeft = duration;
    
    // UI Updates
    isFocusing = true;
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("reset-btn").style.display = "none";
    updatePlant("sprout", "Focusing... Don't switch tabs!");

    // 2. The Timer Logic
    timer = setInterval(() => {
        timeLeft--;

        // Growth Logic based on percentage completion
        const percentDone = 1 - (timeLeft / duration);
        
        if (percentDone > 0.5) updatePlant("growing", "Keep going! It's growing!");
        
        if (timeLeft <= 0) {
            finishFocus();
        }
    }, 1000);
}

function finishFocus() {
    clearInterval(timer);
    isFocusing = false;
    updatePlant("bloomed", "Great job! A beautiful flower!");
    document.getElementById("reset-btn").style.display = "inline-block";
}

function killPlant(reason) {
    clearInterval(timer);
    isFocusing = false;
    
    const plant = document.getElementById("plant");
    plant.className = "dead wither-animation"; // Trigger CSS shake
    document.getElementById("status-message").innerText = reason;
    document.getElementById("reset-btn").style.display = "inline-block";
    
    // Optional: Play a "crunch" sound here
}

function updatePlant(stage, message) {
    const plant = document.getElementById("plant");
    // Only update if the class is different to allow CSS animation to replay if needed
    if (!plant.classList.contains(stage)) {
        plant.className = stage + " grow-animation";
    }
    document.getElementById("status-message").innerText = message;
}

function resetGarden() {
    document.getElementById("plant").className = "seed";
    document.getElementById("status-message").innerText = "Ready to grow?";
    document.getElementById("start-btn").style.display = "inline-block";
    document.getElementById("reset-btn").style.display = "none";
}