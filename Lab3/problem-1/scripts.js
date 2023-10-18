
// To store the contact information
let contacts = [];

// Validate input fields
function validateInput() {
    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;

    // Validation conditions
    const namePattern = /^[A-Za-z ]{1,20}$/;
    const mobilePattern = /^[0-9]{10}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // check if input fields match the validation patterns
    const isValid = namePattern.test(name) && mobilePattern.test(mobile) && emailPattern.test(email);

    // display error message if input is invalid
    if (!isValid) {
        document.getElementById("error").style.display = "block";
        return null;
    }

    // Hide message if input is valid and return contact information
    document.getElementById("error").style.display = "none";
    return { name, mobile, email };
}

// function to add a contact
function addContact() {
    const contact = validateInput();
    if (contact) {
        contacts.push(contact);
        updateContactList();
        document.getElementById("name").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("email").value = "";
    }
}

// function to update the contact list in the table
function updateContactList() {
    const contactList = document.getElementById("contactList");
    contactList.innerHTML = "";

    // iterate through contacts and add them to the table
    for (const contact of contacts) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${contact.name}</td><td>${contact.mobile}</td><td>${contact.email}</td>`;
        contactList.appendChild(row);
    }
}

// variable to trach the sorting order
let ascending = true;

// to sort the table by column
function sortTable(column) {
    contacts.sort((a, b) => {
        const valueA = a[Object.keys(a)[column]];
        const valueB = b[Object.keys(b)[column]];
        // sort in ascending or descending order based on the variable 'ascending
        return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });

    // toggles the sorting order for the next click
    ascending = !ascending;

    // updated the sorted contact list
    updateContactList();
}


// Filter the table based on the search input
function filterTable() {
    const searchTerm = document.getElementById("search").value;

    // Filter contacts based on the mobile number search term
    const filteredContacts = contacts.filter(contact => contact.mobile.includes(searchTerm));
    updateContactList(filteredContacts);


    // Show a message if no matching contacts are found
    if (filteredContacts.length === 0) {
        document.getElementById("noResult").style.display = "block";
    } else {
        document.getElementById("noResult").style.display = "none";
    }
}