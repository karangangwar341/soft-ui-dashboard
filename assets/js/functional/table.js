const apiUrl = "https://jsonplaceholder.typicode.com/users"; // Demo API

let users = []; // Store users fetched from API

// Fetch users from API
async function fetchUsers() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    users = data.map(user => ({
      name: user.name,
      email: user.email,
      role: "User", // Default role as API doesn't provide roles
      status: "Active", // Default status
      date: new Date().toLocaleDateString() // Default current date
    }));
    loadTable();
    console.log("Fetched users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
    alert("Failed to fetch users.");
  }
}

// Load users into the table
function loadTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ""; // Clear existing table content

  users.forEach((user, index) => {
    const row = `
      <tr>
        <td>
          <div class="d-flex px-2 py-1">
            <div>
              <img src="../assets/img/team-4.jpg" class="avatar avatar-sm me-3" alt="user">
            </div>
            <div class="d-flex flex-column justify-content-center">
              <h6 class="mb-0 text-sm">${user.name}</h6>
              <p class="text-xs text-secondary mb-0">${user.email}</p>
            </div>
          </div>
        </td>
        <td>
          <p class="text-xs font-weight-bold mb-0">${user.role}</p>
          <p class="text-xs text-secondary mb-0">Projects</p>
        </td>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm bg-gradient-success">${user.status}</span>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${user.date}</span>
        </td>
        <td class="align-middle">
          <a href="javascript:;" class="text-secondary font-weight-bold text-xs" onclick="openEditModal(${index})">
            Edit
          </a>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Open modal for editing user
function openEditModal(index) {
  const user = users[index];
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("role").value = user.role;
  document.getElementById("status").value = user.status;
  document.getElementById("date").value = user.date;

  const modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();

  // Store the index in the modal data for later use
  document.getElementById("edit-form").setAttribute("data-index", index);
}

// Save changes to the user data
function saveChanges() {
  const index = document.getElementById("edit-form").getAttribute("data-index");

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;
  const status = document.getElementById("status").value;
  const date = document.getElementById("date").value;

  // Update the user data in the array
  users[index] = { name, email, role, status, date };

  // Reload the table to reflect the changes
  loadTable();

  // Hide the modal after saving changes
  const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
  modal.hide();
}

// Initialize the table and fetch users on page load
document.addEventListener("DOMContentLoaded", fetchUsers);
