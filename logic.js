// Mảng để lưu trữ danh sách Khách hàng
const customers = [];
// Sẵn 3 đối tượng trong mảng lưu trữ khách hàng
customers.push(
    {
        name: "Trần Nguyễn Trung Kiên",
        age: 30,
        email: "kiendeptrai@example.com",
        phone: "0356789123",
        birthdate: "10/10/1990"
    },
    {
        name: "Hồ Ngọc Hà",
        age: 25,
        email: "HaHo@example.com",
        phone: "0798765432",
        birthdate: "05/05/1997"
    },
    {
        name: "Lương Hồng Lan",
        age: 40,
        email: "lan@example.com",
        phone: "0834567890",
        birthdate: "08/08/1983"
    }
);


const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const birthdateInput = document.getElementById("birthdate");

const nameError = document.getElementById("name-error");
const ageError = document.getElementById("age-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const birthdateError = document.getElementById("birthdate-error");

const customerForm = document.getElementById("customer-form");
const customerTable = document.getElementById("customer-list");
const addButton = document.getElementById("add-button");

// init(load data from db)
updateTable()


addButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const age = ageInput.value;
    const email = emailInput.value.trim();
    const phone = phoneInput.value;
    const birthdate = birthdateInput.value;

    // Kiểm tra dữ liệu đầu vào
    let isValid = true;
    nameError.textContent = "";
    ageError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    birthdateError.textContent = "";

    if (name === "" || name.length < 3 || name.length > 25) {
        nameError.textContent = "Vui lòng nhập tên hợp lệ (3-25 ký tự).";
        isValid = false;
    }

    if (isNaN(age) || age <= 0 || age >= 100) {
        ageError.textContent = "Vui lòng nhập tuổi hợp lệ (1-99).";
        isValid = false;
    }

    if (!email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
        emailError.textContent = "Vui lòng nhập email hợp lệ.";
        isValid = false;
    }

    // Kiểm tra email đã tồn tại hay chưa
    if (isEmailExist(email)) {
        emailError.textContent = "Email đã tồn tại trong danh sách.";
        isValid = false;
    }

    if (phone.length !== 10 || !/^(03|05|07|08|09)\d{8}$/.test(phone)) {
        phoneError.textContent = "Vui lòng nhập số điện thoại hợp lệ (03x, 05x, 07x, 08x, 09x).";
        isValid = false;
    }

    if (!isValidDate(birthdate)) {
        birthdateError.textContent = "Vui lòng nhập ngày sinh hợp lệ (DD/MM/YYYY).";
        isValid = false;
    }

    if (isValid) {
        // Thêm Khách hàng vào db và cập nhật bảng
        customers.push({ name, age, email, phone, birthdate });
        updateTable();
    }
    customerForm.reset();
});

function updateTable() {
    customerTable.innerHTML = "";
    customers.forEach((customer, index) => {
        const row = customerTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        cell1.innerHTML = customer.name;
        cell2.innerHTML = customer.age;
        cell3.innerHTML = customer.email;
        cell4.innerHTML = customer.phone;
        cell5.innerHTML = customer.birthdate;
    })
}

// Kiểm tra ngày sinh
function isValidDate(dateString) {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
        return false;
    }

    const parts = dateString.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (year < 1900 || year > new Date().getFullYear()) {
        return false;
    }

    if (month < 1 || month > 12) {
        return false;
    }

    if (day < 1 || day > new Date(year, month, 0).getDate()) {
        return false;
    }

    return true;
}


// Function để kiểm tra email đã tồn tại
function isEmailExist(email) {
    return customers.some(customer => customer.email === email);
}