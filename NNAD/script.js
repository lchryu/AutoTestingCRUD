// Mảng để lưu trữ danh sách hóa đơn
const invoices = [];

// Sẵn sàng đối tượng trong mảng lưu trữ hóa đơn
invoices.push(
    {
        customerID: "1",
        bookID: "101",
        quantity: 2,
    },
    {
        customerID: "2",
        bookID: "102",
        quantity: 3,
    },
    {
        customerID: "3",
        bookID: "103",
        quantity: 1,
    }
);

const customerIDInput = document.getElementById("customer-id");
const bookIDInput = document.getElementById("book-id");
const quantityInput = document.getElementById("quantity");

const customerIDError = document.getElementById("customer-id-error");
const bookIDError = document.getElementById("book-id-error");
const quantityError = document.getElementById("quantity-error");

const invoiceForm = document.getElementById("invoice-form");
const invoiceTable = document.getElementById("invoice-list");
const addInvoiceButton = document.getElementById("add-invoice-button");

// Tải dữ liệu từ cơ sở dữ liệu và cập nhật bảng
updateTable();

addInvoiceButton.addEventListener("click", () => {
    const customerID = customerIDInput.value;
    const bookID = bookIDInput.value;
    const quantity = quantityInput.value;

    // Kiểm tra dữ liệu đầu vào
    let isValid = true;
    customerIDError.textContent = "";
    bookIDError.textContent = "";
    quantityError.textContent = "";

    // Kiểm tra hợp lệ của customerID, bookID và quantity ở đây

    if (isValid) {
        // Thêm hóa đơn vào danh sách và cập nhật bảng
        invoices.push({ customerID, bookID, quantity });
        updateTable();
    }
    invoiceForm.reset();
});

function updateTable() {
    invoiceTable.innerHTML = "";
    invoices.forEach((invoice, index) => {
        const row = invoiceTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        // Lấy tên sách và tính thành tiền dựa trên bookID và quantity, sau đó hiển thị trong bảng
        const bookName = getBookName(invoice.bookID);
        const totalPrice = calculateTotalPrice(invoice.bookID, invoice.quantity);

        cell1.innerHTML = bookName;
        cell2.innerHTML = invoice.quantity;
        cell3.innerHTML = totalPrice;
        cell4.innerHTML = `<button class="btn btn-danger" onclick="removeInvoice(${index})">Xóa</button>`;
    });
}

// Lấy tên sách dựa trên bookID
function getBookName(bookID) {
    // Sử dụng cơ sở dữ liệu hoặc danh sách sách để lấy tên sách dựa trên bookID
    // Đoạn này bạn cần tự thêm logic để truy vấn dữ liệu sách
    return "Tên Sách"; // Thay bằng tên sách thực tế
}

// Tính tổng thành tiền dựa trên bookID và số lượng
function calculateTotalPrice(bookID, quantity) {
    // Sử dụng cơ sở dữ liệu hoặc danh sách sách để lấy giá và tính tổng thành tiền
    // Đoạn này bạn cần tự thêm logic để tính tổng thành tiền
    return 100 * quantity; // Thay bằng logic tính tổng thực tế
}

// Xóa một hóa đơn
function removeInvoice(index) {
    invoices.splice(index, 1);
    updateTable();
}
