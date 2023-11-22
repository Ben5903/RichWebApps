// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Get the start button element
    const startButton = document.getElementById('startButton');
    // Attach a click event listener to the start button, triggering the startCountdown function
    startButton.addEventListener('click', startCountdown);
});

// Declare a variable to store the countdown timer observable
let countdownTimer$;

// Function to start the countdown
function startCountdown() {
    // Get input elements for hours, minutes, seconds, and the timer display
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const timerDisplay = document.getElementById('timer');

    // Parse user input for hours, minutes, and seconds
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    // Calculate total seconds based on user input
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Check if the totalSeconds is not a valid input
    if (totalSeconds <= 0) {
        alert('Please enter a valid time.');
        return;
    }

    // If there is an existing countdown timer, unsubscribe to clear previous subscriptions
    if (countdownTimer$) {
        countdownTimer$.unsubscribe();
    }

    // Create a new countdown timer observable
    countdownTimer$ = rxjs.interval(1000)
        .pipe(
            // Take the emissions for the specified totalSeconds
            rxjs.operators.take(totalSeconds + 1),
            // Map the emitted values to the remaining seconds
            rxjs.operators.map(value => totalSeconds - value)
        )
        // Subscribe to the observable
        .subscribe(
            // onNext handler - executed on each emitted value
            value => {
                // Calculate hours, minutes, and seconds to display
                const displayHours = Math.floor(value / 3600);
                const displayMinutes = Math.floor((value % 3600) / 60);
                const displaySeconds = value % 60;

                // Construct the timer display based on user input
                let timerDisplayText = '';
                if (hours > 0) {
                    timerDisplayText += `${displayHours.toString().padStart(2, '0')}:`;
                }
                if (minutes > 0 || hours > 0) {
                    timerDisplayText += `${displayMinutes.toString().padStart(2, '0')}:`;
                }
                timerDisplayText += `${displaySeconds.toString().padStart(2, '0')}`;

                // Update the timer display in the HTML
                timerDisplay.innerHTML = timerDisplayText;
            },
            // onError handler - not used here (null)
            null,
            // onCompleted handler - executed when the countdown completes
            () => {
                // Set the timer display to '00' when the countdown completes
                timerDisplay.innerHTML = '00';
                // Show an alert indicating the countdown is complete
                alert('Countdown Complete!');
            }
        );
}