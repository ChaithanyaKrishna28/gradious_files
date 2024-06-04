document.addEventListener("DOMContentLoaded",()=>{

    const showFormButton = document.getElementById("showformbutton");
    const appointmentForm = document.getElementById("appointmentform");
    const appointmentTable = document.getElementById("appointmenttable");
    const appointmentIdField = document.getElementById("appointmentId");
    const dateField = document.getElementById("date");
    const timeField = document.getElementById("time");
    const clientNameField = document.getElementById("clientname");
    const popUp = document.querySelector(".popup");
    const popUpDeleteConfirm = document.querySelector(".delete")
    const popUpCancelConfirm = document.querySelector(".cancel")
//popup
    function confirmPopUp(appointmentId,clientName){
        popUp.style.display="block";
        const message = document.getElementById("popupmessage")
        message.textContent = `Deleting user - ${clientName}`
        popUpDeleteConfirm.addEventListener('click',()=>{
            deleteAppointment(appointmentId)
            popUp.style.display="none"
        });
        popUpCancelConfirm.addEventListener("click",()=>{
            loadAppointmentTable();
            popUp.style.display="none"
        })
    }
    showFormButton.addEventListener("click",()=>{
        console.log("add user")
        appointmentForm.reset()
        appointmentForm.style.display = "flex";
        showFormButton.style.display = "none";
        appointmentTable.style.display = "none";
    })

    function validDate(date) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!date.match(dateRegex)) return false;
        const dateObj = new Date(date);
        return dateObj && dateObj.toISOString().startsWith(date);
    }
    function validTime(time) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timeRegex.test(time);
    }

    function validForm() {
        const date = dateField.value;
        const time = timeField.value;

        if (!validDate(date)) {
            alert('Invalid date format. Please use YYYY-MM-DD.');
            return false;
        }

        if (!validTime(time)) {
            alert('Invalid time format. Please use HH:MM in 24-hour format.');
            return false;
        }

        return true;
    }

    appointmentForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        console.log("form submit")
        //form validation
        if(validForm()){
            const appointment = {

                // id: appointmentIdField.value,
                date: dateField.value,
                time: timeField.value,
                clientName: clientNameField.value
                
            }
            appointmentForm.style.display = "none";
            showFormButton.style.display = "block";
            appointmentTable.style.display = "flex";
            saveAppointment(appointment)
            
        }
    })

    function fetchData(callback){
        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
            if(this.readyState===4 && this.status===200){
                const appointments = JSON.parse(this.responseText);
                console.log(appointments)
            }
        }
        xhr.open("GET","https://665afd16003609eda45f7d83.mockapi.io/appointment",true);
        xhr.send();
        
    }

    //saving
    function saveAppointment(appointment){
        const xhr = new XMLHttpRequest();
        xhr.open("POST","https://665afd16003609eda45f7d83.mockapi.io/appointment",true);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200 || xhr.status === 201) { // Treat both 200 and 201 as success
                    console.log("Appointment saved successfully.");
                    loadAppointmentTable(); // Call loadAppointmentTable after saving
                } else {
                    console.error("Failed to save appointment. Error: " + xhr.statusText);
                }
            }
        }
        xhr.send(JSON.stringify(appointment))
        
    }

    //updation
    function updateAppointment(appointmentId,appointment){
        const xhr = new XMLHttpRequest();
        xhr.open("PUT",`https://665afd16003609eda45f7d83.mockapi.io/appointment/${appointmentId}`,true)
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onreadystatechange = function(){
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    console.log("Appointment updated successfully")
                    loadAppointmentTable()
                }
                else{
                    console.log("Failed to update appointment")
                }
            }
        }
        xhr.send(JSON.stringify(appointment))

    }

    function loadAppointmentTable(){
        fetchData()
    }
    //getting
    function fetchData(callback) {
        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const appointments = JSON.parse(this.responseText);
                callback(appointments); // Call the callback function with the fetched appointments
            }
        };
        
        xhr.open("GET", "https://665afd16003609eda45f7d83.mockapi.io/appointment", true);
        xhr.send();
    }

    //deleting
    function deleteAppointment(appointmentId){
        // openPopup()
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE",`https://665afd16003609eda45f7d83.mockapi.io/appointment/${appointmentId}`,true)
        xhr.onreadystatechange = function(){
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    console.log("Appointment deleted successfully")
                    loadAppointmentTable()
                }
                else{
                    console.log("failed to delet appointment. Error"+xhr.statusText);
                }
            }
        }
        xhr.send()
    }
    
     function loadAppointmentTable() {
        fetchData(function (appointments) {
            // Clear existing rows except for the header
            appointmentTable.innerHTML = `
                <div class="row header">
                    <span class="cell">Appointment ID</span>
                    <span class="cell">Date</span>
                    <span class="cell">Time</span>
                    <span class="cell">Client Name</span>
                    <span class="cell">Actions</span>
                </div>`;

            appointments.forEach(function (appointment) {
                const row = document.createElement("div");
                row.classList.add("row");
                row.innerHTML = `
                    <span class="cell">${appointment.id}</span>
                    <span class="cell" data-field="date">${appointment.date}</span>
                    <span class="cell" data-field="time">${appointment.time}</span>
                    <span class="cell" data-field="clientName">${appointment.clientName}</span>
                    <span class="cell">
                    <div class="actionbuttons">
                        <button class="edit-button" data-id="${appointment.id}">Update</button>
                        <button class="delete-button" data-id="${appointment.id}" data-name="${appointment.clientName}">Delete</button>
                    </div>
                        
                    </span>

                `;
                appointmentTable.appendChild(row);
            });
            //edit
            document.querySelectorAll('.edit-button').forEach(function(button){
                button.addEventListener('click',function(){
                    const appointmentId = button.dataset.id;
                    editAppointment(appointmentId)
                });
            });
            document.querySelectorAll('.delete-button').forEach(function(button){
                button.addEventListener('click',function(){
                    const appointmentId = button.dataset.id;
                    const clientName = button.dataset.name;
                    confirmPopUp(appointmentId,clientName)
                })
            })
        });
    }

    function editAppointment(appointmentId){
        document.querySelectorAll('.row').forEach(function(row){
            row.classList.remove('highlight');
        });
        const appointmentRow = document.querySelector(`.edit-button[data-id="${appointmentId}"]`).closest('.row');
        appointmentRow.classList.add('highlight');
        const fields = appointmentRow.querySelectorAll('[data-field]')
        //-----------------
        const originalValues ={}//storing the before edit values
        fields.forEach(function (field, index) {
            if (field.querySelector('input')) {
                originalValues[index] = field.querySelector('input').value; // Store original value
                return;
            }
            const value = field.textContent.trim();
            originalValues[index] = value; // Store original value
            const input = document.createElement('input');
            input.value = value;
            field.textContent = '';
            field.appendChild(input);
        });
        const actionsCell = appointmentRow.querySelector('.cell:last-child');
        actionsCell.innerHTML = '';
        actionsCell.classList.add("actions")

        // add save button
        const saveButton = document.createElement('button');
        saveButton.textContent="Save"
        saveButton.classList.add("save-button")
        saveButton.addEventListener('click',function(){
            const updatedAppointment = {
                id:appointmentId,
                date:fields[0].querySelector('input').value,
                time:fields[1].querySelector('input').value,
                clientName:fields[2].querySelector('input').value
            }
            updateAppointment(appointmentId,updatedAppointment)
        });
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add("cancel-button")
        cancelButton.addEventListener('click', function () {
            //reset to original values 
            fields.forEach(function(field,index){
                if(field.querySelector('input')){
                    field.querySelector('input').value = originalValues[index];
                }
            })
            loadAppointmentTable(); // Reload the table to cancel the edit
        });
        actionsCell.appendChild(saveButton);
        actionsCell.appendChild(cancelButton);
    }
    
    //
    loadAppointmentTable();


    

})
