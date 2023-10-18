const apiUrl = "https://jsonplaceholder.typicode.com";

// Function to fetch data from the JSONPlaceholder API
async function fetchData(endpoint) {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

// Fetch the list of posts
fetchData("posts")
    .then(posts => {
        // Problem 1: List all post titles with more than six words
        const longPostTitles = posts

            // to select posts with titles longer than 6 words
            .filter(post => post.title.split(' ').length > 6)

            //to extract the titles of filtered posts
            .map(post => post.title);
        console.log("Post Titles with More Than Six Words:");
        console.log(longPostTitles);

        // Problem 2: Show a word frequency map for all post body contents
        const allPostBodies = posts.flatMap(post => post.body); // Use flatMap to flatten the body contents
        const wordFrequencyMap = WordFrequencyMap(allPostBodies);
        console.log("Word Frequency Map for Post Bodies:");
        console.log(wordFrequencyMap);
    })
    .catch(error => console.error(error));

// Function to generate a word frequency map from text data
function WordFrequencyMap(textArray) {
    const words = textArray
        .join(" ")
        .toLowerCase()
        .match(/\w+/g); // Extract words using regex
    return words.reduce((map, word) => {
        map[word] = (map[word] || 0) + 1;
        return map;
    }, {});
}