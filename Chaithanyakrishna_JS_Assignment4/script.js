function loaddata(){
    const userKey = 'users';
    let users = localStorage.getItem(userKey);
    if(!users){
        users = {
            "abhi@gmail.com": {
                "firstName": "Abhishek",
                "lastName": "Verma",
                "occupation": "Software Engineer",
                "contact": "9012345678",
                "age": 25,
                "city": "Delhi",
                "education": "Bachelor's in Computer Science"
            },
            "babu@gmail.com": {
                "firstName": "Babu",
                "lastName": "Annam",
                "occupation": "Data Analyst",
                "contact": "1012345678",
                "age": 20,
                "city": "Hyderabad",
                "education": "Bachelor's in Statistics"
            },
            "chand@gmail.com": {
                "firstName": "Chand",
                "lastName": "Kumar",
                "occupation": "Marketing Manager",
                "contact": "1212345678",
                "age": 30,
                "city": "Mumbai",
                "education": "Master's in Business Administration"
            },
            "dev@gmail.com": {
                "firstName": "Dev",
                "lastName": "Singh",
                "occupation": "Graphic Designer",
                "contact": "1312345678",
                "age": 28,
                "city": "Pune",
                "education": "Bachelor's in Fine Arts"
            },
            "ella@gmail.com": {
                "firstName": "Ella",
                "lastName": "Sharma",
                "occupation": "Doctor",
                "contact": "1412345678",
                "age": 26,
                "city": "Bangalore",
                "education": "Doctor of Medicine (MD)"
            },
            "farhan@gmail.com": {
                "firstName": "Farhan",
                "lastName": "Ansari",
                "occupation": "Civil Engineer",
                "contact": "1512345678",
                "age": 24,
                "city": "Chennai",
                "education": "Bachelor's in Civil Engineering"
            },
            "gita@gmail.com": {
                "firstName": "Gita",
                "lastName": "Patel",
                "occupation": "Financial Analyst",
                "contact": "1612345678",
                "age": 27,
                "city": "Ahmedabad",
                "education": "Master's in Finance"
            },
            "hari@gmail.com": {
                "firstName": "Hari",
                "lastName": "Nair",
                "occupation": "Chef",
                "contact": "1712345678",
                "age": 23,
                "city": "Kochi",
                "education": "Diploma in Culinary Arts"
            },
            "ishan@gmail.com": {
                "firstName": "Ishan",
                "lastName": "Kapoor",
                "occupation": "Lawyer",
                "contact": "1812345678",
                "age": 29,
                "city": "Chandigarh",
                "education": "Bachelor's in Law"
            },
            "jaya@gmail.com": {
                "firstName": "Jaya",
                "lastName": "Mishra",
                "occupation": "Teacher",
                "contact": "1912345678",
                "age": 22,
                "city": "Lucknow",
                "education": "Bachelor's in Education"
            }
        };
        localStorage.setItem(userKey,JSON.stringify(users));     
    }
    else{
        users = JSON.parse(users)
    }

    renderTableRow(users);
}

function renderTableRow(users){
    const userTable = document.getElementById('usertable');
    Object.keys(users).forEach((email,index)=>{
        const user = users[email];
        const row = document.createElement('div');
        const fullname = user.firstName + ' ' + user.lastName;
        row.className = 'row';
        row.innerHTML=`
            <span class="cell">${fullname}</span>
            <span class="cell">${user.occupation}</span>
            <span class="cell">${user.contact}</span>
            <span class="cell">${user.education}</span>
        `;
        userTable.appendChild(row);
    })
}

function clearLocalStorage() {
    localStorage.removeItem('users');
    const userTable = document.getElementById('usertable');
    userTable.innerHTML = ''; 
    // Re-create the header row
    const headerRow = document.createElement('div');
    headerRow.className = 'row header';
    headerRow.innerHTML = `
        <span class="cell">Name</span>
        <span class="cell">Occupation</span>
        <span class="cell">Contact</span>
        <span class="cell">Education</span>
    `;
    userTable.appendChild(headerRow);

    document.getElementById("clear").textContent="Reload Page";

    
}