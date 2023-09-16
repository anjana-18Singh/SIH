document.addEventListener("DOMContentLoaded", function() {
    const dataDisplay = document.getElementById("dataDisplay");
    const dataParagraph = document.getElementById("data");
    const nextButton = document.getElementById("nextButton");

    let currentIndex = 0;
    let data = [];

    // Function to fetch CSV data using Fetch API
    async function fetchCSV() {
        const response = await fetch("NumberPlate_on_2023-09-16 (1).csv");
        const text = await response.text();
        data = parseCSV(text);
    }

    // Function to parse CSV data into an array of objects
    function parseCSV(csvText) {
        const lines = csvText.split("\n");
        const headers = lines[0].split(",");
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].split(",");
            const obj = {};

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = line[j];
            }

            result.push(obj);
        }

        return result;
    }

    // Function to format time into 24-hour format
    function formatTime(time) {
        const timeParts = time.split(" ");
        const timeValue = timeParts[0];
        const ampm = timeParts[1].toLowerCase();

        if (ampm === "pm") {
            const [hours, minutes] = timeValue.split(":");
            const formattedHours = (parseInt(hours, 10) + 12).toString().padStart(2, "0");
            return `${formattedHours}:${minutes}`;
        } else {
            return timeValue;
        }
    }

    // Function to display data at the current index
    function displayData() {
        if (currentIndex < data.length) {
            const item = data[currentIndex];
            const formattedTime = formatTime(item["Time"]);
            const displayText = `Result: ${item["Result"]}, Date: ${item["Date"]}, Time: ${formattedTime}`;
            dataParagraph.textContent = displayText;
        } else {
            dataParagraph.textContent = "No more data.";
            nextButton.disabled = true;
        }
    }

    // Event listener for the "Next" button
    nextButton.addEventListener("click", function() {
        currentIndex++;
        displayData();
    });

    // Load CSV data when the page is loaded
    fetchCSV().then(() => {
        displayData();
    });
});
