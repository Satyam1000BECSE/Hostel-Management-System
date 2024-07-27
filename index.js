// Toggle menu for all form s
// Toggle visibility of a specific popup menu
function toggleMenu(menuId, sectionId) {
    var menu = document.getElementById(menuId);
    var section = document.getElementById(sectionId);
    var menus = document.getElementsByClassName('popup-menu');

    // Hide all other popup menus
    for (var i = 0; i < menus.length; i++) {
        if (menus[i] !== menu) {
            menus[i].style.display = 'none';
        }
    }

    // Toggle the current menu
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';

    // Show the related section and hide others
    if (!section.classList.contains('hidden')) {
        hideAllSections();
    } else {
        hideAllSections();
        section.classList.remove('hidden');
    }
}

// Open a specific form section and hide others
function openForm(formId) {
    hideAllForms();
    document.getElementById(formId).style.display = 'block';
}

// Hide all sections
function hideAllSections() {
    var sections = document.querySelectorAll('section');
    sections.forEach(function (section) {
        if (section.id !== 'Home') {
            section.classList.add('hidden');
        }
    });
}

// Hide all form sections
function hideAllForms() {
    var forms = document.getElementsByClassName("form-section");
    for (var i = 0; i < forms.length; i++) {
        forms[i].style.display = 'none';
    }
}

// Hide all menus when clicking outside
window.onclick = function (event) {
    var menus = document.getElementsByClassName('popup-menu');
    for (var i = 0; i < menus.length; i++) {
        var menu = menus[i];
        // Check if the click was outside the menu and its button
        if (!event.target.closest('.popup-button') && menu.style.display === 'block') {
            menu.style.display = 'none';
        }
    }
}


//print fee receipt and check application status
document.querySelector('label[for="option1"]').addEventListener('click', function () {
    document.getElementById('content1').style.display = 'block';
    document.getElementById('content2').style.display = 'none';
    document.getElementById('printFeeReceiptCheckbox').checked = true;
    document.getElementById('checkApplicationStatusCheckbox').checked = false;
    document.getElementById('printFeeReceiptCheckbox').disabled = false;
    document.getElementById('checkApplicationStatusCheckbox').disabled = true;
    checkFormValidity();
});

document.querySelector('label[for="option2"]').addEventListener('click', function () {
    document.getElementById('content1').style.display = 'none';
    document.getElementById('content2').style.display = 'block';
    document.getElementById('printFeeReceiptCheckbox').checked = false;
    document.getElementById('checkApplicationStatusCheckbox').checked = true;
    document.getElementById('printFeeReceiptCheckbox').disabled = true;
    document.getElementById('checkApplicationStatusCheckbox').disabled = false;
    checkFormValidity();
});

const inputs = document.querySelectorAll('#mainForm input');
inputs.forEach(input => {
    input.addEventListener('input', checkFormValidity);
});

function checkFormValidity() {
    const content1Visible = document.getElementById('content1').style.display === 'block';
    const content2Visible = document.getElementById('content2').style.display === 'block';

    let allFilled = false;
    if (content1Visible) {
        const inputs = document.querySelectorAll('#content1 input');
        allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    } else if (content2Visible) {
        const inputs = document.querySelectorAll('#content2 input');
        allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    }

    const checkbox1 = document.getElementById('printFeeReceiptCheckbox').checked;
    const checkbox2 = document.getElementById('checkApplicationStatusCheckbox').checked;

    const checkboxesValid = checkbox1 || checkbox2;
    document.getElementById('submitButton').disabled = !(allFilled && checkboxesValid);
}


//Room overview section
const roomContainer = document.getElementById('room-container');

const totalRooms = 180;
const floors = ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor'];
const roomsPerFloor = totalRooms / floors.length;

// Sample data for rooms
const rooms = Array.from({ length: totalRooms }, (_, i) => ({
    number: i + 1,
    floor: Math.floor(i / roomsPerFloor),
    type: i % 2 === 0 ? 'single' : 'double', // alternate between single and double for demo
    status: Math.random() > 0.5 ? 'available' : 'booked' // random status for demo
}));

// Add guest rooms
floors.forEach((_, index) => {
    rooms.push({
        number: `G${index + 1}`,
        floor: index,
        type: 'guest',
        status: Math.random() > 0.5 ? 'available' : 'booked' // random status for demo
    });
});

function createRoomElement(room) {
    const roomElement = document.createElement('div');
    roomElement.className = `room ${room.status} ${room.type}`;
    roomElement.textContent = room.number;
    roomElement.dataset.floor = room.floor;
    roomElement.dataset.type = room.type;
    roomElement.dataset.status = room.status;
    return roomElement;
}

rooms.forEach(room => {
    const roomElement = createRoomElement(room);
    roomContainer.appendChild(roomElement);
});

function showFilters(filter) {
    const filtersDiv = document.getElementById('filters');
    filtersDiv.style.display = 'flex';
    filterRooms(filter);
}

function filterRooms(filter = 'all') {
    const selectedFloor = document.getElementById('floorFilter').value;
    const selectedType = document.getElementById('typeFilter').value;
    const roomElements = roomContainer.children;

    for (let i = 0; i < roomElements.length; i++) {
        const roomElement = roomElements[i];
        const status = roomElement.dataset.status;
        const floor = roomElement.dataset.floor;
        const type = roomElement.dataset.type;

        if (
            (filter === 'all' || filter === status) &&
            (selectedFloor === 'all' || selectedFloor == floor) &&
            (selectedType === 'all' || selectedType === type)
        ) {
            roomElement.style.display = 'flex';
        } else {
            roomElement.style.display = 'none';
        }
    }
}

// Function to simulate updating room statuses
function updateRoomStatus(roomNumber, newStatus) {
    const room = rooms.find(r => r.number === roomNumber);
    if (room) {
        room.status = newStatus;
        const roomElement = roomContainer.querySelector(`[data-floor="${room.floor}"][data-type="${room.type}"]`);
        roomElement.className = `room ${room.status} ${room.type}`;
        roomElement.dataset.status = room.status;
    }
}

// Example: Update room 1 to 'booked'
updateRoomStatus(1, 'booked');

//help box help center
const topics = {
    'How to create an Account': 'Detail about Topic 1',
    'How to Reset your password': 'Detail about Topic 2',
    'How to Update your profile Information': 'Detail about Topic 3',
    'Payment Methods and Security': 'Detail about Topic 4',
    'Account Deletion': 'Detail about Topic 5',
    'How to leave a review': 'Detail about Topic 6',
    'Privacy Policy Overview': 'Detail about Topic 7',
    'Terms of Service': 'Detail about Topic 8',
    'Technical Support for Website Issues': 'Detail about Topic 9',
    'Website Navigation': 'Detail about Topic 10',
    'How to Logging In Account': 'Detail about Topic 4',
    'Managing Your Account': 'Detail about Topic 5',
    'How to print fee recipt': 'Detail about Topic 6',
    'How to Check Application Status': 'Detail about Topic 7',
    'How to Apply For Admission Process': 'Detail about Topic 8',
    'How to Check Rooms Conditions': 'Detail about Topic 9',
    'Contacting Customer Support': 'Detail about Topic 10'
};

function searchTopics() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const ul = document.getElementById('helpTopics');
    const li = ul.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
        const topic = li[i].innerText.toLowerCase();
        if (topic.includes(input)) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function showTopicDetail(topic) {
    document.getElementById('topicDetail').innerText = topics[topic];
}
//home page slideshaw
let currentIndex = 0;

function showNextSlide() {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    currentIndex = (currentIndex + 1) % totalSlides;
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

setInterval(showNextSlide, 3000);
