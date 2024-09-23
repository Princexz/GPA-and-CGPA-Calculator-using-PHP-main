 // cgp
 function addSubject() {
    const subjectsDiv = document.getElementById('gpaSubjects');
    const subjectCount = subjectsDiv.children.length + 1;
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'gpa-subject';

    let subjectHeading;
    switch (subjectCount) {
        case 1: subjectHeading = '1st Subject'; break;
        case 2: subjectHeading = '2nd Subject'; break;
        case 3: subjectHeading = '3rd Subject'; break;
        default: subjectHeading = `${subjectCount}th Subject`;
    }

    subjectDiv.innerHTML = `
        <h2>${subjectHeading}</h2>
        <input type="text" placeholder="Enter Subject Name" name="subject[]" required>
        <div class="gpa-grade-credit">
            <input type="number" step="0.01" placeholder="Enter Grade in Points" name="grade[]" required>
            <input type="number" step="0.01" placeholder="Enter Credit Hours" name="credit[]" required>
        </div>
    `;
    subjectsDiv.appendChild(subjectDiv);
}

function deleteSubject() {
    const subjectsDiv = document.getElementById('gpaSubjects');
    if (subjectsDiv.children.length > 1) {
        subjectsDiv.removeChild(subjectsDiv.lastChild);
    }
}

document.getElementById('gpaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'calculate_gpa.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('gpaResult').innerText = `Your GPA is: ${xhr.responseText}`;
        }
    };
    xhr.send(formData);
});

// <!-- cgpa -->
  function addSemester() {
const semestersDiv = document.getElementById('semesters');
const semesterCount = semestersDiv.children.length + 1;
const semesterDiv = document.createElement('div');
semesterDiv.className = 'semester';

let semesterHeading;
switch (semesterCount) {
case 1: semesterHeading = '1st Semester'; break;
case 2: semesterHeading = '2nd Semester'; break;
case 3: semesterHeading = '3rd Semester'; break;
default: semesterHeading = `${semesterCount}th Semester`;
}

semesterDiv.innerHTML = `<h2>${semesterHeading}</h2><input type="number" step="0.01" required placeholder="Enter GPA" name="gpa[]" class="gpa">`;
semestersDiv.appendChild(semesterDiv);
}

function deleteSemester() {
const semestersDiv = document.getElementById('semesters');
if (semestersDiv.children.length > 1) {
semestersDiv.removeChild(semestersDiv.lastChild);
}
}

document.getElementById('cgpaForm').addEventListener('submit', function(event) {
event.preventDefault();
const formData = new FormData(this);

const xhr = new XMLHttpRequest();
xhr.open('POST', 'assets/php/calculate_cgpa.php', true);
xhr.onload = function() {
if (xhr.status === 200) {
  document.getElementById('result').innerText = `Your CGPA is: ${xhr.responseText}`;
}
};
xhr.send(formData);
});


//  cgpa to %
document.getElementById('cgpa_form').addEventListener('submit', function(e) {
    e.preventDefault();
    var cgpa = document.getElementById('cgpa_input_new').value;
    var formula = document.getElementById('cgpa_formula_new').value;

    if (cgpa === '') {
        alert('Please enter your CGPA');
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'calculate.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('cgpa_result_new').innerText = xhr.responseText;
        }
    };
    xhr.send('cgpa=' + cgpa + '&formula=' + formula);
});
// percntage to cgpa
document.getElementById('percentage_form').addEventListener('submit', function(e) {
    e.preventDefault();
    var percentage = document.getElementById('percentage_input_new').value;
    var formula = document.getElementById('percentage_formula_new').value;

    if (percentage === '') {
        alert('Please enter your percentage');
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'calculate_percentage.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('percentage_result_new').innerText = xhr.responseText;
        }
    };
    xhr.send('percentage=' + percentage + '&formula=' + formula);
});