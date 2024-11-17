 // Variables 
 const calendarElement = document.getElementById('calendar');
 const appointmentForm = document.getElementById('appointmentForm');
 const addAppointmentBtn = document.getElementById('addAppointmentBtn');
 const cancelBtn = document.getElementById('cancelBtn');
 const form = document.getElementById('form');
 const appointmentsContainer = document.getElementById('appointmentsContainer');

 // Appointment list
 let appointments = [];

 // calendar generation
 function generateCalendar() {
     const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
     const currentDate = new Date();
     const currentMonth = currentDate.getMonth();
     const currentYear = currentDate.getFullYear();

     calendarElement.innerHTML = '';
     daysOfWeek.forEach(day => {
         const dayElement = document.createElement('div');
         dayElement.textContent = day;
         calendarElement.appendChild(dayElement);
     });

     const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
     const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0);
     const totalDaysInMonth = lastDateOfMonth.getDate();
     const firstDay = firstDayOfMonth.getDay();

     for (let i = 0; i < firstDay; i++) {
         calendarElement.appendChild(document.createElement('div'));
     }

     for (let day = 1; day <= totalDaysInMonth; day++) {
         const dayElement = document.createElement('div');
         dayElement.textContent = day;
         dayElement.addEventListener('click', () => openAppointmentForm(day));
         calendarElement.appendChild(dayElement);
     }
 }

 function openAppointmentForm(day) {
     appointmentForm.style.display = 'block';
     document.getElementById('date').value = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
 }

 cancelBtn.addEventListener('click', () => {
     appointmentForm.style.display = 'none';
 });

 form.addEventListener('submit', (e) => {
     e.preventDefault();
     const title = document.getElementById('title').value;
     const date = document.getElementById('date').value;
     const time = document.getElementById('time').value;

     const appointment = {
         id: Date.now(),
         title,
         date,
         time
     };
     appointments.push(appointment);
     updateAppointmentList();
     form.reset();
     appointmentForm.style.display = 'none';
 });

function updateAppointmentList() {
    appointmentsContainer.innerHTML = '';
    appointments.forEach(appointment => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>${appointment.title}</td>
            <td>
                <button class="btn btn-primary mt-3" onclick="editAppointment(${appointment.id})">Edit</button>
                <button class="btn btn-primary mt-3" onclick="deleteAppointment(${appointment.id})">Delete</button>
            </td>
        `;
        appointmentsContainer.appendChild(tr);
    });
}

 function deleteAppointment(id) {
     appointments = appointments.filter(appointment => appointment.id !== id);
     updateAppointmentList();
 }

 function editAppointment(id) {
     const appointment = appointments.find(appointment => appointment.id === id);
     if (appointment) {
         document.getElementById('title').value = appointment.title;
         document.getElementById('date').value = appointment.date;
         document.getElementById('time').value = appointment.time;
         deleteAppointment(id);
         appointmentForm.style.display = 'block';
     }
 }

 generateCalendar();