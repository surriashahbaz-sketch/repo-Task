// Data Storage
let data = {
    employees: [
        { empID: 101, ename: 'Ali Hassan', gender: 'Male', email: 'ali@corp.com', phone: '0311-111111', depID: 1, joiningdate: '2023-01-10', manID: 1 },
        { empID: 102, ename: 'Sana Khan', gender: 'Female', email: 'sana@corp.com', phone: '0322-222222', depID: 1, joiningdate: '2023-02-15', manID: 1 },
        { empID: 103, ename: 'Raza Malik', gender: 'Male', email: 'raza@corp.com', phone: '0333-333333', depID: 2, joiningdate: '2023-03-20', manID: 2 }
    ],
    managers: [
        { manID: 1, mname: 'Fatima Noor', gender: 'Female', email: 'fatima@corp.com', phone: '0344-444444', depID: 1 },
        { manID: 2, mname: 'Usman Chaudhry', gender: 'Male', email: 'usman@corp.com', phone: '0355-555555', depID: 2 }
    ],
    departments: [
        { deptID: 1, deptName: 'Engineering', manID: 1, totalEmp: 2 },
        { deptID: 2, deptName: 'Marketing', manID: 2, totalEmp: 1 }
    ],
    attendance: [
        { attendID: 1, empID: 101, attendDate: '2026-07-14', checkInTime: '09:00', checkOutTime: '17:30', attendStatus: 'Present', lateMinutes: 0 },
        { attendID: 2, empID: 102, attendDate: '2026-07-14', checkInTime: '09:45', checkOutTime: '17:00', attendStatus: 'Late', lateMinutes: 15 },
        { attendID: 3, empID: 103, attendDate: '2026-07-14', checkInTime: '08:55', checkOutTime: '18:10', attendStatus: 'Present', lateMinutes: 0 }
    ],
    schedules: [
        { SID: 1, empID: 101, manID: 1, shiftType: 'Morning', startTime: '09:00', endTime: '17:00', workingDays: 'Mon-Fri', workingHours: 8 },
        { SID: 2, empID: 102, manID: 1, shiftType: 'Evening', startTime: '12:00', endTime: '20:00', workingDays: 'Mon-Fri', workingHours: 8 }
    ],
    leaves: [
        { LID: 1, empID: 101, manID: 1, leaveType: 'Annual', startDate: '2026-07-20', endDate: '2026-07-22', status: 'Approved', appliedDate: '2026-07-10', reason: 'Family event' }
    ],
    overtime: [
        { otID: 1, attendID: 1, hoursApproved: 2.5, approvedForEmpID: 101, approvedByManID: 1, status: 'Approved' }
    ]
};

let currentModule = '';
let editingId = null;

// Welcome Page
function showMainMenu() {
    document.getElementById('welcomePage').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'block';
    updateStats();
    showModule('employee');
}

// Navigation
function showModule(module) {
    currentModule = module;
    const titles = {
        employee: 'Employee Management',
        manager: 'Manager Management',
        attendance: 'Attendance Management',
        overtime: 'Overtime Management',
        schedule: 'Schedule Management',
        department: 'Department Management',
        leave: 'Leave Management'
    };
    document.getElementById('moduleTitle').textContent = titles[module] || 'Module';
    renderModule(module);
}

function refreshModule() {
    if (currentModule) {
        renderModule(currentModule);
        updateStats();
    }
}

// Render Module Data
function renderModule(module) {
    const area = document.getElementById('moduleContentArea');
    let html = '<div class="table-container fade-in">';
    
    switch(module) {
        case 'employee':
            html += renderEmployeeTable();
            break;
        case 'manager':
            html += renderManagerTable();
            break;
        case 'department':
            html += renderDepartmentTable();
            break;
        case 'attendance':
            html += renderAttendanceTable();
            break;
        case 'schedule':
            html += renderScheduleTable();
            break;
        case 'leave':
            html += renderLeaveTable();
            break;
        case 'overtime':
            html += renderOvertimeTable();
            break;
        default:
            html = '<div class="welcome-message"><i class="fas fa-hand-point-left"></i><p>Please select a module</p></div>';
    }
    
    html += '</div>';
    area.innerHTML = html;
    updateStats();
}

// Render Tables
function renderEmployeeTable() {
    let html = `<table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Manager</th>
                <th>Joining Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;
    
    data.employees.forEach(emp => {
        html += `<tr>
            <td>${emp.empID}</td>
            <td><strong>${emp.ename}</strong></td>
            <td>${emp.gender}</td>
            <td>${emp.email}</td>
            <td>${emp.phone}</td>
            <td>${emp.depID}</td>
            <td>${emp.manID}</td>
            <td>${emp.joiningdate}</td>
            <td>
                <button onclick="editRecord('employee', ${emp.empID})" class="btn btn-secondary" style="padding: 4px 10px; margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteRecord('employee', ${emp.empID})" class="btn btn-danger" style="padding: 4px 10px;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    return html;
}

function renderManagerTable() {
    let html = `<table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;
    
    data.managers.forEach(man => {
        html += `<tr>
            <td>${man.manID}</td>
            <td><strong>${man.mname}</strong></td>
            <td>${man.gender}</td>
            <td>${man.email}</td>
            <td>${man.phone}</td>
            <td>${man.depID}</td>
            <td>
                <button onclick="editRecord('manager', ${man.manID})" class="btn btn-secondary" style="padding: 4px 10px; margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteRecord('manager', ${man.manID})" class="btn btn-danger" style="padding: 4px 10px;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    return html;
}

function renderDepartmentTable() {
    let html = `<table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Manager ID</th>
                <th>Total Employees</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;
    
    data.departments.forEach(dep => {
        html += `<tr>
            <td>${dep.deptID}</td>
            <td><strong>${dep.deptName}</strong></td>
            <td>${dep.manID}</td>
            <td>${dep.totalEmp}</td>
            <td>
                <button onclick="editRecord('department', ${dep.deptID})" class="btn btn-secondary" style="padding: 4px 10px; margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteRecord('department', ${dep.deptID})" class="btn btn-danger" style="padding: 4px 10px;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    return html;
}

function renderAttendanceTable() {
    let html = `<table>
        <thead>
            <tr>
                <th>Attend ID</th>
                <th>Employee ID</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Late Minutes</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;
    
    data.attendance.forEach(att => {
        const statusClass = att.attendStatus.toLowerCase();
        html += `<tr>
            <td>${att.attendID}</td>
            <td>${att.empID}</td>
            <td>${att.attendDate}</td>
            <td>${att.checkInTime}</td>
            <td>${att.checkOutTime}</td>
            <td><span class="status-badge status-${statusClass}">${att.attendStatus}</span></td>
            <td>${att.lateMinutes}</td>
            <td>
                <button onclick="editRecord('attendance', ${att.attendID})" class="btn btn-secondary" style="padding: 4px 10px; margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteRecord('attendance', ${att.attendID})" class="btn btn-danger" style="padding: 4px 10px;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    return html;
}

function renderScheduleTable() {
    let html = `<table>
        <thead>
            <tr>
                <th>Schedule ID</th>
                <th>Employee ID</th>
                <th>Manager ID</th>
                <th>Shift Type</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Working Days</th>
                <th>Hours</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;
    
    data.schedules.forEach(sch => {
        html += `<tr>
            <td>${sch.SID}</td>
            <td>${sch.empID}</td>
            <td>${sch.manID}</td>
            <td>${sch.shiftType}</td>
            <td>${sch.startTime}</td>
            <td>${sch.endTime}</td>
            <td>${sch.workingDays}</td>
            <td>${sch.workingHours}</td>
            <td>
                <button onclick="editRecord('schedule', ${sch.SID})" class="btn btn-secondary" style="padding: 4px 10px; margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteRecord('schedule', ${sch.SID})" class="btn btn-danger" style="padding: 4px 10px;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    return html;
}

function renderLeaveTable() {
    let html = `<table>
        <thead>
            <tr>
                <th>Leave ID</th>
                <th>Employee ID</th>
                <th>Manager ID</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Reason</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;
    
    data.leaves.forEach(leave => {
        const statusClass = leave.status.toLowerCase();
        html += `<tr>
            <td>${leave.LID}</td>
            <td>${leave.empID}</td>
            <td>${leave.manID}</td>
            <td>${leave.leaveType}</td>
            <td>${leave.startDate}</td>
            <td>${leave.endDate}</td>
            <td><span class="status-badge status-${statusClass}">${leave.status}</span></td>
            <td>${leave.reason}</td>
            <td>
                <button onclick="editRecord('leave', ${leave.LID})" class="btn btn-secondary" style="padding: 4px 10px; margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteRecord('leave', ${leave.LID})" class="btn btn-danger" style="padding: 4px 10px;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    return html;
}

function renderOvertimeTable() {
    let html = `<table>
        <thead>
            <tr>
                <th>OT ID</th>
                <th>Attendance ID</th>
                <th>Hours Approved</th>
                <th>Employee ID</th>
                <th>Manager ID</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;
    
    data.overtime.forEach(ot => {
        const statusClass = ot.status.toLowerCase();
        html += `<tr>
            <td>${ot.otID}</td>
            <td>${ot.attendID}</td>
            <td>${ot.hoursApproved}</td>
            <td>${ot.approvedForEmpID}</td>
            <td>${ot.approvedByManID}</td>
            <td><span class="status-badge status-${statusClass}">${ot.status}</span></td>
            <td>
                <button onclick="editRecord('overtime', ${ot.otID})" class="btn btn-secondary" style="padding: 4px 10px; margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteRecord('overtime', ${ot.otID})" class="btn btn-danger" style="padding: 4px 10px;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    return html;
}

// Add/Edit Forms
function showAddForm() {
    editingId = null;
    const title = document.getElementById('moduleTitle').textContent;
    document.getElementById('formTitle').textContent = `Add New ${title}`;
    document.getElementById('formModal').style.display = 'flex';
    document.getElementById('formBody').innerHTML = getFormHTML(currentModule, null);
}

function editRecord(module, id) {
    editingId = id;
    const title = document.getElementById('moduleTitle').textContent;
    document.getElementById('formTitle').textContent = `Edit ${title}`;
    document.getElementById('formModal').style.display = 'flex';
    
    let record = null;
    switch(module) {
        case 'employee': record = data.employees.find(e => e.empID === id); break;
        case 'manager': record = data.managers.find(m => m.manID === id); break;
        case 'department': record = data.departments.find(d => d.deptID === id); break;
        case 'attendance': record = data.attendance.find(a => a.attendID === id); break;
        case 'schedule': record = data.schedules.find(s => s.SID === id); break;
        case 'leave': record = data.leaves.find(l => l.LID === id); break;
        case 'overtime': record = data.overtime.find(o => o.otID === id); break;
    }
    document.getElementById('formBody').innerHTML = getFormHTML(module, record);
}

function closeForm() {
    document.getElementById('formModal').style.display = 'none';
    editingId = null;
}

function getFormHTML(module, record) {
    let html = '';
    switch(module) {
        case 'employee':
            html = `
                <div class="form-group">
                    <label>Employee ID</label>
                    <input type="number" id="empID" value="${record ? record.empID : ''}" ${record ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" id="ename" value="${record ? record.ename : ''}">
                </div>
                <div class="form-group">
                    <label>Gender</label>
                    <select id="gender">
                        <option value="Male" ${record && record.gender === 'Male' ? 'selected' : ''}>Male</option>
                        <option value="Female" ${record && record.gender === 'Female' ? 'selected' : ''}>Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="email" value="${record ? record.email : ''}">
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" id="phone" value="${record ? record.phone : ''}">
                </div>
                <div class="form-group">
                    <label>Department ID</label>
                    <input type="number" id="depID" value="${record ? record.depID : ''}">
                </div>
                <div class="form-group">
                    <label>Joining Date</label>
                    <input type="date" id="joiningdate" value="${record ? record.joiningdate : ''}">
                </div>
                <div class="form-group">
                    <label>Manager ID</label>
                    <input type="number" id="manID" value="${record ? record.manID : ''}">
                </div>
            `;
            break;
        case 'manager':
            html = `
                <div class="form-group">
                    <label>Manager ID</label>
                    <input type="number" id="manID" value="${record ? record.manID : ''}" ${record ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" id="mname" value="${record ? record.mname : ''}">
                </div>
                <div class="form-group">
                    <label>Gender</label>
                    <select id="gender">
                        <option value="Male" ${record && record.gender === 'Male' ? 'selected' : ''}>Male</option>
                        <option value="Female" ${record && record.gender === 'Female' ? 'selected' : ''}>Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="email" value="${record ? record.email : ''}">
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" id="phone" value="${record ? record.phone : ''}">
                </div>
                <div class="form-group">
                    <label>Department ID</label>
                    <input type="number" id="depID" value="${record ? record.depID : ''}">
                </div>
            `;
            break;
        case 'department':
            html = `
                <div class="form-group">
                    <label>Department ID</label>
                    <input type="number" id="deptID" value="${record ? record.deptID : ''}" ${record ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label>Department Name</label>
                    <input type="text" id="deptName" value="${record ? record.deptName : ''}">
                </div>
                <div class="form-group">
                    <label>Manager ID</label>
                    <input type="number" id="manID" value="${record ? record.manID : ''}">
                </div>
                <div class="form-group">
                    <label>Total Employees</label>
                    <input type="number" id="totalEmp" value="${record ? record.totalEmp : ''}">
                </div>
            `;
            break;
        case 'attendance':
            html = `
                <div class="form-group">
                    <label>Attendance ID</label>
                    <input type="number" id="attendID" value="${record ? record.attendID : ''}" ${record ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label>Employee ID</label>
                    <input type="number" id="empID" value="${record ? record.empID : ''}">
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" id="attendDate" value="${record ? record.attendDate : ''}">
                </div>
                <div class="form-group">
                    <label>Check In Time</label>
                    <input type="time" id="checkInTime" value="${record ? record.checkInTime : ''}">
                </div>
                <div class="form-group">
                    <label>Check Out Time</label>
                    <input type="time" id="checkOutTime" value="${record ? record.checkOutTime : ''}">
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select id="attendStatus">
                        <option value="Present" ${record && record.attendStatus === 'Present' ? 'selected' : ''}>Present</option>
                        <option value="Absent" ${record && record.attendStatus === 'Absent' ? 'selected' : ''}>Absent</option>
                        <option value="Late" ${record && record.attendStatus === 'Late' ? 'selected' : ''}>Late</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Late Minutes</label>
                    <input type="number" id="lateMinutes" value="${record ? record.lateMinutes : '0'}">
                </div>
            `;
            break;
        case 'schedule':
            html = `
                <div class="form-group">
                    <label>Schedule ID</label>
                    <input type="number" id="SID" value="${record ? record.SID : ''}" ${record ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label>Employee ID</label>
                    <input type="number" id="empID" value="${record ? record.empID : ''}">
                </div>
                <div class="form-group">
                    <label>Manager ID</label>
                    <input type="number" id="manID" value="${record ? record.manID : ''}">
                </div>
                <div class="form-group">
                    <label>Shift Type</label>
                    <input type="text" id="shiftType" value="${record ? record.shiftType : ''}">
                </div>
                <div class="form-group">
                    <label>Start Time</label>
                    <input type="time" id="startTime" value="${record ? record.startTime : ''}">
                </div>
                <div class="form-group">
                    <label>End Time</label>
                    <input type="time" id="endTime" value="${record ? record.endTime : ''}">
                </div>
                <div class="form-group">
                    <label>Working Days</label>
                    <input type="text" id="workingDays" value="${record ? record.workingDays : ''}">
                </div>
                <div class="form-group">
                    <label>Working Hours</label>
                    <input type="number" id="workingHours" value="${record ? record.workingHours : ''}">
                </div>
            `;
            break;
        case 'leave':
            html = `
                <div class="form-group">
                    <label>Leave ID</label>
                    <input type="number" id="LID" value="${record ? record.LID : ''}" ${record ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label>Employee ID</label>
                    <input type="number" id="empID" value="${record ? record.empID : ''}">
                </div>
                <div class="form-group">
                    <label>Manager ID</label>
                    <input type="number" id="manID" value="${record ? record.manID : ''}">
                </div>
                <div class="form-group">
                    <label>Leave Type</label>
                    <input type="text" id="leaveType" value="${record ? record.leaveType : ''}">
                </div>
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="date" id="startDate" value="${record ? record.startDate : ''}">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="date" id="endDate" value="${record ? record.endDate : ''}">
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select id="status">
                        <option value="Pending" ${record && record.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Approved" ${record && record.status === 'Approved' ? 'selected' : ''}>Approved</option>
                        <option value="Rejected" ${record && record.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Applied Date</label>
                    <input type="date" id="appliedDate" value="${record ? record.appliedDate : ''}">
                </div>
                <div class="form-group">
                    <label>Reason</label>
                    <textarea id="reason" rows="3">${record ? record.reason : ''}</textarea>
                </div>
            `;
            break;
        case 'overtime':
            html = `
                <div class="form-group">
                    <label>Overtime ID</label>
                    <input type="number" id="otID" value="${record ? record.otID : ''}" ${record ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label>Attendance ID</label>
                    <input type="number" id="attendID" value="${record ? record.attendID : ''}">
                </div>
                <div class="form-group">
                    <label>Hours Approved</label>
                    <input type="number" step="0.5" id="hoursApproved" value="${record ? record.hoursApproved : ''}">
                </div>
                <div class="form-group">
                    <label>Employee ID</label>
                    <input type="number" id="approvedForEmpID" value="${record ? record.approvedForEmpID : ''}">
                </div>
                <div class="form-group">
                    <label>Manager ID</label>
                    <input type="number" id="approvedByManID" value="${record ? record.approvedByManID : ''}">
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select id="status">
                        <option value="Pending" ${record && record.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Approved" ${record && record.status === 'Approved' ? 'selected' : ''}>Approved</option>
                        <option value="Rejected" ${record && record.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                    </select>
                </div>
            `;
            break;
    }
    
    html += `
        <div class="form-actions">
            <button onclick="saveRecord()" class="btn btn-primary">
                <i class="fas fa-save"></i> Save
            </button>
            <button onclick="closeForm()" class="btn btn-secondary">
                <i class="fas fa-times"></i> Cancel
            </button>
        </div>
    `;
    
    return html;
}

// Save Record
function saveRecord() {
    const module = currentModule;
    const isEdit = editingId !== null;
    
    let record = {};
    switch(module) {
        case 'employee':
            record = {
                empID: parseInt(document.getElementById('empID').value),
                ename: document.getElementById('ename').value,
                gender: document.getElementById('gender').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                depID: parseInt(document.getElementById('depID').value),
                joiningdate: document.getElementById('joiningdate').value,
                manID: parseInt(document.getElementById('manID').value)
            };
            if (isEdit) {
                const index = data.employees.findIndex(e => e.empID === editingId);
                if (index !== -1) data.employees[index] = record;
            } else {
                data.employees.push(record);
            }
            break;
        case 'manager':
            record = {
                manID: parseInt(document.getElementById('manID').value),
                mname: document.getElementById('mname').value,
                gender: document.getElementById('gender').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                depID: parseInt(document.getElementById('depID').value)
            };
            if (isEdit) {
                const index = data.managers.findIndex(m => m.manID === editingId);
                if (index !== -1) data.managers[index] = record;
            } else {
                data.managers.push(record);
            }
            break;
        case 'department':
            record = {
                deptID: parseInt(document.getElementById('deptID').value),
                deptName: document.getElementById('deptName').value,
                manID: parseInt(document.getElementById('manID').value),
                totalEmp: parseInt(document.getElementById('totalEmp').value)
            };
            if (isEdit) {
                const index = data.departments.findIndex(d => d.deptID === editingId);
                if (index !== -1) data.departments[index] = record;
            } else {
                data.departments.push(record);
            }
            break;
        case 'attendance':
            record = {
                attendID: parseInt(document.getElementById('attendID').value),
                empID: parseInt(document.getElementById('empID').value),
                attendDate: document.getElementById('attendDate').value,
                checkInTime: document.getElementById('checkInTime').value,
                checkOutTime: document.getElementById('checkOutTime').value,
                attendStatus: document.getElementById('attendStatus').value,
                lateMinutes: parseInt(document.getElementById('lateMinutes').value) || 0
            };
            if (isEdit) {
                const index = data.attendance.findIndex(a => a.attendID === editingId);
                if (index !== -1) data.attendance[index] = record;
            } else {
                data.attendance.push(record);
            }
            break;
        case 'schedule':
            record = {
                SID: parseInt(document.getElementById('SID').value),
                empID: parseInt(document.getElementById('empID').value),
                manID: parseInt(document.getElementById('manID').value),
                shiftType: document.getElementById('shiftType').value,
                startTime: document.getElementById('startTime').value,
                endTime: document.getElementById('endTime').value,
                workingDays: document.getElementById('workingDays').value,
                workingHours: parseInt(document.getElementById('workingHours').value)
            };
            if (isEdit) {
                const index = data.schedules.findIndex(s => s.SID === editingId);
                if (index !== -1) data.schedules[index] = record;
            } else {
                data.schedules.push(record);
            }
            break;
        case 'leave':
            record = {
                LID: parseInt(document.getElementById('LID').value),
                empID: parseInt(document.getElementById('empID').value),
                manID: parseInt(document.getElementById('manID').value),
                leaveType: document.getElementById('leaveType').value,
                startDate: document.getElementById('startDate').value,
                endDate: document.getElementById('endDate').value,
                status: document.getElementById('status').value,
                appliedDate: document.getElementById('appliedDate').value,
                reason: document.getElementById('reason').value
            };
            if (isEdit) {
                const index = data.leaves.findIndex(l => l.LID === editingId);
                if (index !== -1) data.leaves[index] = record;
            } else {
                data.leaves.push(record);
            }
            break;
        case 'overtime':
            record = {
                otID: parseInt(document.getElementById('otID').value),
                attendID: parseInt(document.getElementById('attendID').value),
                hoursApproved: parseFloat(document.getElementById('hoursApproved').value),
                approvedForEmpID: parseInt(document.getElementById('approvedForEmpID').value),
                approvedByManID: parseInt(document.getElementById('approvedByManID').value),
                status: document.getElementById('status').value
            };
            if (isEdit) {
                const index = data.overtime.findIndex(o => o.otID === editingId);
                if (index !== -1) data.overtime[index] = record;
            } else {
                data.overtime.push(record);
            }
            break;
    }
    
    closeForm();
    renderModule(module);
    updateStats();
}

// Delete Record
function deleteRecord(module, id) {
    if (!confirm('Are you sure you want to delete this record?')) return;
    
    switch(module) {
        case 'employee':
            data.employees = data.employees.filter(e => e.empID !== id);
            break;
        case 'manager':
            data.managers = data.managers.filter(m => m.manID !== id);
            break;
        case 'department':
            data.departments = data.departments.filter(d => d.deptID !== id);
            break;
        case 'attendance':
            data.attendance = data.attendance.filter(a => a.attendID !== id);
            break;
        case 'schedule':
            data.schedules = data.schedules.filter(s => s.SID !== id);
            break;
        case 'leave':
            data.leaves = data.leaves.filter(l => l.LID !== id);
            break;
        case 'overtime':
            data.overtime = data.overtime.filter(o => o.otID !== id);
            break;
    }
    
    renderModule(module);
    updateStats();
}

// Update Stats
function updateStats() {
    document.getElementById('totalEmployees').textContent = data.employees.length;
    document.getElementById('totalManagers').textContent = data.managers.length;
    document.getElementById('totalDepartments').textContent = data.departments.length;
    document.getElementById('totalAttendance').textContent = data.attendance.length;
}

// Exit System
function exitSystem() {
    if (confirm('Are you sure you want to exit?')) {
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('welcomePage').style.display = 'flex';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome page by default
});