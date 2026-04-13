document.addEventListener('DOMContentLoaded', () => {
    // State management
    let staff = JSON.parse(localStorage.getItem('softline_staff')) || [];
    let vehicles = JSON.parse(localStorage.getItem('softline_vehicles')) || [];

    // UI Elements
    const tabs = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.tab-content');
    const staffTableBody = document.getElementById('staff-table-body');
    const vehicleTableBody = document.getElementById('vehicle-table-body');
    const staffSelectionList = document.getElementById('staff-selection-list');
    const vehicleSelectionList = document.getElementById('vehicle-selection-list');

    // Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
            
            if (target === 'create') renderSelectionLists();
        });
    });

    // Staff Management
    function renderStaff() {
        if (staffTableBody) {
            staffTableBody.innerHTML = '';
            staff.forEach((person, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${person.name}</td>
                    <td>${person.nic}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteStaff(${index})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                `;
                staffTableBody.appendChild(row);
            });
        }
        localStorage.setItem('softline_staff', JSON.stringify(staff));
        renderSelectionLists();
    }

    const addStaffBtn = document.getElementById('add-staff-btn');
    if (addStaffBtn) {
        addStaffBtn.addEventListener('click', () => {
            const nameInput = document.getElementById('staff-name');
            const nicInput = document.getElementById('staff-nic');
            if (nameInput.value && nicInput.value) {
                staff.push({ name: nameInput.value, nic: nicInput.value });
                nameInput.value = '';
                nicInput.value = '';
                renderStaff();
            }
        });
    }

    window.deleteStaff = (index) => {
        staff.splice(index, 1);
        renderStaff();
    };

    // Vehicle Management
    function renderVehicles() {
        if (vehicleTableBody) {
            vehicleTableBody.innerHTML = '';
            vehicles.forEach((v, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${v.number}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteVehicle(${index})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                `;
                vehicleTableBody.appendChild(row);
            });
        }
        localStorage.setItem('softline_vehicles', JSON.stringify(vehicles));
        renderSelectionLists();
    }

    const addVehicleBtn = document.getElementById('add-vehicle-btn');
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener('click', () => {
            const vehicleInput = document.getElementById('vehicle-number');
            if (vehicleInput.value) {
                vehicles.push({ number: vehicleInput.value });
                vehicleInput.value = '';
                renderVehicles();
            }
        });
    }

    window.deleteVehicle = (index) => {
        vehicles.splice(index, 1);
        renderVehicles();
    };

    // Rendering Selection Lists
    function renderSelectionLists() {
        if (staffSelectionList) {
            staffSelectionList.innerHTML = '';
            staff.forEach((person, index) => {
                staffSelectionList.innerHTML += `
                    <div class="selection-item">
                        <input type="checkbox" id="staff-${index}" value="${index}" class="staff-checkbox">
                        <label for="staff-${index}" class="details">
                            <span class="name">${person.name}</span>
                            <span class="sub">${person.nic}</span>
                        </label>
                    </div>`;
            });
        }

        if (vehicleSelectionList) {
            vehicleSelectionList.innerHTML = '';
            vehicles.forEach((v, index) => {
                vehicleSelectionList.innerHTML += `
                    <div class="selection-item">
                        <input type="checkbox" id="vehicle-${index}" value="${index}" class="vehicle-checkbox">
                        <label for="vehicle-${index}" class="details">
                            <span class="name">${v.number}</span>
                        </label>
                    </div>`;
            });
        }
    }

    // Filter Logic
    document.querySelectorAll('.filter-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const targetId = e.target.dataset.target;
            const list = document.getElementById(targetId);
            if (!list) return;
            const items = list.querySelectorAll('.selection-item');

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Generate Pass
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const selectedStaffIndices = Array.from(document.querySelectorAll('.staff-checkbox:checked')).map(cb => cb.value);
            const selectedVehicleIndices = Array.from(document.querySelectorAll('.vehicle-checkbox:checked')).map(cb => cb.value);
            
            // Hardcoded contact person as per user request
            const contactPerson = "Mahesh Wijesekara (198212401782)";

            if (selectedStaffIndices.length === 0) {
                alert('Please select at least one staff member.');
                return;
            }

            // Fill Print Preview Info
            document.getElementById('p-contact-person').textContent = contactPerson || 'N/A';
            
            const selectedVehicleNumbers = selectedVehicleIndices.map(idx => vehicles[idx].number);
            document.getElementById('p-vehicle-summary').textContent = selectedVehicleNumbers.join(' / ') || 'None';

            // Fill Print Preview Lists
            const pStaffList = document.getElementById('p-staff-list');
            if (pStaffList) {
                pStaffList.innerHTML = '';
                selectedStaffIndices.forEach((idx, i) => {
                    const person = staff[idx];
                    pStaffList.innerHTML += `<tr><td>${i+1}</td><td>${person.name}</td><td>${person.nic}</td></tr>`;
                });
            }

            const pVehicleList = document.getElementById('p-vehicle-list');
            if (pVehicleList) {
                pVehicleList.innerHTML = '';
                selectedVehicleIndices.forEach((idx, i) => {
                    const v = vehicles[idx];
                    pVehicleList.innerHTML += `<tr><td>${i+1}</td><td>${v.number}</td></tr>`;
                });
            }

            document.getElementById('print-preview').style.display = 'flex';
        });
    }

    window.closePreview = () => {
        document.getElementById('print-preview').style.display = 'none';
    };

    // Initial render
    renderStaff();
    renderVehicles();
});
