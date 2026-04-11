// State Management
let staff = JSON.parse(localStorage.getItem('softline_staff')) || [
    { id: 1, name: "M.F.M.Siyan", nic: "200012300862" },
    { id: 2, name: "W.M.P.Salinda", nic: "198628503490" },
    { id: 3, name: "Bimasara Kaveesha", nic: "200434905149" },
    { id: 4, name: "K.M.Imesh Piyumal Jayathissa", nic: "200309910828" },
    { id: 5, name: "J.G.Rawidhu Sathsara", nic: "200409612539" },
    { id: 6, name: "K.R.A.D. Sasindu Nethmina", nic: "200517701724" }
];

let vehicles = JSON.parse(localStorage.getItem('softline_vehicles')) || [
    { id: 1, number: "PS-0915", type: "Van" }
];

let companyInfo = JSON.parse(localStorage.getItem('softline_company')) || {
    name: "Softline Advertising Services (Pvt) Ltd",
    tel: "071 7300000",
    hotline: "071 4660560",
    contactPerson: "Mahesh Wijesekara",
    contactNIC: "198212401782",
    address: "No.142/B, Makola Road, Kiribathgoda."
};

let currentPage = 'home';

// Save to LocalStorage
const saveStaff = () => localStorage.setItem('softline_staff', JSON.stringify(staff));
const saveVehicles = () => localStorage.setItem('softline_vehicles', JSON.stringify(vehicles));
const saveCompany = () => localStorage.setItem('softline_company', JSON.stringify(companyInfo));

// DOM Elements
const contentArea = document.getElementById('content-area');
const pageTitle = document.getElementById('page-title');
const navItems = document.querySelectorAll('nav li');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const itemForm = document.getElementById('item-form');
const closeModal = document.querySelector('.close-modal');

// Navigation Logic
const switchPage = (page) => {
    currentPage = page;
    navItems.forEach(i => {
        i.classList.remove('active');
        if (i.getAttribute('data-page') === page) i.classList.add('active');
    });

    switch(page) {
        case 'home': renderDashboard(); pageTitle.innerText = "Dashboard"; break;
        case 'staff': renderStaff(); pageTitle.innerText = "Manage Laborers"; break;
        case 'vehicles': renderVehicles(); pageTitle.innerText = "Manage Vehicles"; break;
        case 'generator': renderGenerator(); pageTitle.innerText = "Generate Team Pass"; break;
        case 'settings': renderSettings(); pageTitle.innerText = "System Settings"; break;
    }
};

navItems.forEach(item => {
    item.addEventListener('click', () => switchPage(item.getAttribute('data-page')));
});

// Rendering Functions
const renderDashboard = () => {
    contentArea.innerHTML = `
        <div class="grid-2">
            <div class="card" style="border-left: 4px solid #3b82f6;">
                <p style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Total Team Members</p>
                <p style="font-size: 2.5rem; font-weight: 800; color: #0f172a;">${staff.length}</p>
            </div>
            <div class="card" style="border-left: 4px solid #10b981;">
                <p style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Active Vehicles</p>
                <p style="font-size: 2.5rem; font-weight: 800; color: #0f172a;">${vehicles.length}</p>
            </div>
        </div>
        <div class="card">
            <h3>Quick Actions</h3>
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                <button class="btn btn-primary" onclick="switchPage('generator')"><i class="fas fa-id-card"></i> Create Security Pass</button>
                <button class="btn" style="background: #f1f5f9; color: #0f172a;" onclick="switchPage('staff')"><i class="fas fa-plus"></i> Add Laborer</button>
            </div>
        </div>
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button class="btn" style="background: #f1f5f9; color: var(--text-main); font-size: 0.8rem;" onclick="switchPage('settings')"><i class="fas fa-edit"></i> Edit Profile</button>
                <div style="text-align: right;">
                    <h3 style="color: var(--primary);">Company Profile</h3>
                    <p style="color: var(--text-muted); margin-top: 0.5rem; font-weight: 700;">${companyInfo.name}</p>
                    <p style="color: var(--text-muted); font-size: 0.85rem;">Coordinator: ${companyInfo.contactPerson} | ${companyInfo.hotline}</p>
                </div>
            </div>
        </div>
    `;
};

const renderStaff = () => {
    contentArea.innerHTML = `
        <div class="section-header">
            <h3>Laborers Directory</h3>
            <button class="btn btn-primary" onclick="showAddStaffModal()"><i class="fas fa-plus"></i> Add New Member</button>
        </div>
        <div class="table-container shadow-sm">
            <table>
                <thead>
                    <tr>
                        <th style="width: 80px;">ID</th>
                        <th>Full Name</th>
                        <th>NIC Number</th>
                        <th style="text-align: right;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${staff.map((s, index) => `
                        <tr>
                            <td style="font-weight: 700;">${index + 1}</td>
                            <td style="font-weight: 500;">${s.name}</td>
                            <td style="font-family: monospace;">${s.nic}</td>
                            <td style="text-align: right;">
                                <button class="btn" onclick="deleteStaff(${s.id})" style="color: #ef4444; background: transparent;"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
};

const renderVehicles = () => {
    contentArea.innerHTML = `
        <div class="section-header">
            <h3>Vehicle Management</h3>
            <button class="btn btn-primary" onclick="showAddVehicleModal()"><i class="fas fa-plus"></i> Add Vehicle</button>
        </div>
        <div class="table-container shadow-sm">
            <table>
                <thead>
                    <tr>
                        <th style="width: 80px;">ID</th>
                        <th>Vehicle Number</th>
                        <th style="text-align: right;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${vehicles.map((v, index) => `
                        <tr>
                            <td style="font-weight: 700;">${index + 1}</td>
                            <td style="font-weight: 600;">${v.number}</td>
                            <td style="text-align: right;">
                                <button class="btn" onclick="deleteVehicle(${v.id})" style="color: #ef4444; background: transparent;"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
};

const renderGenerator = () => {
    contentArea.innerHTML = `
        <div class="grid-2">
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h3>1. Select Personnel</h3>
                    <div style="position: relative; width: 200px;">
                        <input type="text" id="staff-search" placeholder="Search name..." oninput="filterStaffSelection(this.value)" 
                               style="padding: 0.5rem 0.5rem 0.5rem 1.8rem; font-size: 0.8rem; width: 100%; border-radius: 6px; border: 1px solid #e2e8f0;">
                        <i class="fas fa-search" style="position: absolute; left: 0.6rem; top: 0.7rem; font-size: 0.8rem; color: #94a3b8;"></i>
                    </div>
                </div>
                <div class="selection-box" id="staff-selection-list" style="border-radius: 8px;">
                    ${renderStaffSelectionItems(staff)}
                </div>
            </div>
            <div>
                <div class="card">
                    <h3>2. Transport Details</h3>
                    <div class="selection-box" id="vehicle-selection-list" style="margin-top: 1rem; border-radius: 8px; max-height: 200px;">
                        ${vehicles.map(v => `
                            <label class="selection-item">
                                <input type="checkbox" name="vehicle-select" value="${v.id}">
                                <div style="font-weight: 600;">${v.number}</div>
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="card" style="background: #0f172a; color: white; overflow: hidden; position: relative;">
                    <i class="fas fa-shield-alt" style="position: absolute; right: -20px; bottom: -20px; font-size: 110px; opacity: 0.1;"></i>
                    <h3 style="color: white; margin-bottom: 0.5rem;">3. Finalize Pass</h3>
                    <p style="font-size: 0.85rem; opacity: 0.7; margin-bottom: 1.5rem;">Generate an encrypted, professional security clearance document.</p>
                    <button class="btn" style="width: 100%; background: #3b82f6; color: white; border: none; padding: 1rem; font-weight: 700;" onclick="generatePass()">
                        <i class="fas fa-print"></i> Generate Premium Pass
                    </button>
                </div>
            </div>
        </div>
    `;
};

const renderSettings = () => {
    contentArea.innerHTML = `
        <div class="card shadow-sm" style="max-width: 800px;">
            <h3>Company Configuration</h3>
            <form id="company-form" onsubmit="saveCompanyDetails(event)" style="margin-top: 1.5rem;">
                <div class="grid-2">
                    <div class="form-group">
                        <label>Official Firm Name</label>
                        <input type="text" id="comp-name" value="${companyInfo.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Primary Office Address</label>
                        <input type="text" id="comp-address" value="${companyInfo.address}" required>
                    </div>
                    <div class="form-group">
                        <label>Telephone</label>
                        <input type="text" id="comp-tel" value="${companyInfo.tel}">
                    </div>
                    <div class="form-group">
                        <label>Corporate Hotline</label>
                        <input type="text" id="comp-hotline" value="${companyInfo.hotline}">
                    </div>
                    <div class="form-group">
                        <label>Operations Contact Person</label>
                        <input type="text" id="comp-person" value="${companyInfo.contactPerson}">
                    </div>
                    <div class="form-group">
                        <label>Coordinator NIC</label>
                        <input type="text" id="comp-nic" value="${companyInfo.contactNIC}">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" style="margin-top: 1rem;"><i class="fas fa-save"></i> Save Global Configuration</button>
            </form>
        </div>
    `;
};

// Logic Functions
const showAddStaffModal = () => {
    modalTitle.innerText = "Register New Personnel";
    itemForm.innerHTML = `
        <div class="form-group">
            <label>Legal Full Name</label>
            <input type="text" id="staff-name" required placeholder="Full Name">
        </div>
        <div class="form-group">
            <label>NIC Number (New or Old)</label>
            <input type="text" id="staff-nic" required placeholder="Identity Card No">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%">Register Member</button>
    `;
    itemForm.onsubmit = (e) => {
        e.preventDefault();
        const nic = document.getElementById('staff-nic').value.trim();
        
        // Duplicate Check
        if (staff.some(s => s.nic === nic)) {
            alert("Error: A member with this NIC number already exists!");
            return;
        }

        const id = staff.length > 0 ? Math.max(...staff.map(s => s.id)) + 1 : 1;
        staff.push({ id, name: document.getElementById('staff-name').value, nic });
        saveStaff(); renderStaff(); closeModalFunc();
    };
    modal.style.display = "block";
};

const showAddVehicleModal = () => {
    modalTitle.innerText = "Register New Vehicle";
    itemForm.innerHTML = `
        <div class="form-group">
            <label>Vehicle License Plate</label>
            <input type="text" id="vehicle-number" required placeholder="e.g. WP PS-0915">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%">Register Transport</button>
    `;
    itemForm.onsubmit = (e) => {
        e.preventDefault();
        const id = vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 1;
        vehicles.push({ id, number: document.getElementById('vehicle-number').value });
        saveVehicles(); renderVehicles(); closeModalFunc();
    };
    modal.style.display = "block";
};

const deleteStaff = (id) => { if(confirm("Confirm removal of this team member?")) { staff = staff.filter(s => s.id !== id); saveStaff(); renderStaff(); } };
const deleteVehicle = (id) => { if(confirm("Confirm removal of this vehicle record?")) { vehicles = vehicles.filter(v => v.id !== id); saveVehicles(); renderVehicles(); } };

const closeModalFunc = () => modal.style.display = "none";
closeModal.onclick = closeModalFunc;
window.onclick = (e) => { if (e.target == modal) closeModalFunc(); };

const saveCompanyDetails = (e) => {
    e.preventDefault();
    companyInfo = {
        name: document.getElementById('comp-name').value,
        address: document.getElementById('comp-address').value,
        tel: document.getElementById('comp-tel').value,
        hotline: document.getElementById('comp-hotline').value,
        contactPerson: document.getElementById('comp-person').value,
        contactNIC: document.getElementById('comp-nic').value
    };
    saveCompany(); alert("Global configuration updated."); switchPage('home');
};

// Utils for Generator
const renderStaffSelectionItems = (list) => {
    if (list.length === 0) return `<div style="padding: 1rem; color: #94a3b8; text-align: center;">No results found.</div>`;
    return list.map(s => `
        <label class="selection-item">
            <input type="checkbox" name="staff-select" value="${s.id}">
            <div>
                <div style="font-weight: 600;">${s.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${s.nic}</div>
            </div>
        </label>
    `).join('');
};

const filterStaffSelection = (query) => {
    const filtered = staff.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
    document.getElementById('staff-selection-list').innerHTML = renderStaffSelectionItems(filtered);
};

// GENERATOR LOGIC - OVERLAY VERSION (USIGN Letter head.png)
const generatePass = () => {
    const selectedStaffIds = Array.from(document.querySelectorAll('input[name="staff-select"]:checked')).map(cb => parseInt(cb.value));
    const selectedVehicleIds = Array.from(document.querySelectorAll('input[name="vehicle-select"]:checked')).map(cb => parseInt(cb.value));
    
    const selectedStaff = staff.filter(s => selectedStaffIds.includes(s.id));
    const selectedVehicles = vehicles.filter(v => selectedVehicleIds.includes(v.id));

    if (selectedStaffIds.length === 0) { alert("Please select personnel first."); return; }
    
    const vehicleNumbers = selectedVehicles.length > 0 
        ? selectedVehicles.map(v => v.number).join(', ') 
        : "Not Specified";

    const passHTML = `
        <div class="doc-container" id="printable-pass">
             <!-- Info Data Overlay with Professional Labels -->
            <div class="info-overlay">
                <div class="info-row"><span class="info-label">Corporate Entity</span><span class="info-value">: ${companyInfo.name}</span></div>
                <div class="info-row"><span class="info-label">Primary Contact</span><span class="info-value">: ${companyInfo.tel}</span></div>
                <div class="info-row"><span class="info-label">Service Hotline</span><span class="info-value">: ${companyInfo.hotline}</span></div>
                <div class="info-row"><span class="info-label">Site Liaison</span><span class="info-value">: ${companyInfo.contactPerson} (${companyInfo.contactNIC || ''})</span></div>
                <div class="info-row"><span class="info-label">Registered Office</span><span class="info-value">: ${companyInfo.address}</span></div>
                <div class="info-row"><span class="info-label">Transport Fleet</span><span class="info-value">: ${vehicleNumbers}</span></div>
            </div>

            <!-- Table Data Overlay -->
            <div class="table-overlay">
                <table class="print-table">
                    <thead>
                        <tr>
                            <th style="width: 53px;">NO</th>
                            <th style="text-align: left; padding-left: 20px;">NAME</th>
                            <th style="width: 185px;">NIC</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${selectedStaff.map((s, index) => `
                            <tr>
                                <td style="text-align: center;">${(index + 1).toString().padStart(2, '0')}</td>
                                <td style="text-align: left; padding-left: 20px;">${s.name}</td>
                                <td style="text-align: center;">${s.nic}</td>
                            </tr>
                        `).join('')}
                        ${selectedStaff.length < 6 ? Array(6 - selectedStaff.length).fill(0).map(() => `
                            <tr><td>&nbsp;</td><td></td><td></td></tr>
                        `).join('') : ''}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('print-template').innerHTML = passHTML;
    document.getElementById('preview-container').innerHTML = passHTML;
    document.getElementById('preview-modal').style.display = 'block';
};

const downloadPassAsImage = () => {
    const element = document.getElementById('printable-pass');
    html2canvas(element, { useCORS: true, scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `softline outdoor Crew list.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
};

document.querySelector('.close-preview').onclick = () => {
    document.getElementById('preview-modal').style.display = 'none';
};

// Initial Load
switchPage('home');
