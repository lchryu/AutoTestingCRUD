from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Khởi tạo trình duyệt
driver = webdriver.Chrome()

the_url = "http://127.0.0.1:5500/index.html"
driver.get(the_url)

# Chờ trang web tải hoàn thành
time.sleep(5)

# Tạo danh sách các trường hợp kiểm tra
test_cases = [
    # Kiểm tra dữ liệu hợp lệ
    {
        "customer_id": "123",
        "book_id": "456",
        "quantity": "3",
        "expected_result": "success"
    },
    # Kiểm tra ID khách hàng bị thiếu
    {
        "customer_id": "",
        "book_id": "456",
        "quantity": "3",
        "expected_result": "fail"
    },
    # Thêm nhiều hóa đơn
    {
        "customer_id": "123",
        "book_id": "456",
        "quantity": "3",
        "expected_result": "success"
    },
]

index = 1
for test_case in test_cases:
    customer_id_input = driver.find_element(By.ID, "customer-id")
    book_id_input = driver.find_element(By.ID, "book-id")
    quantity_input = driver.find_element(By.ID, "quantity")
    add_button = driver.find_element(By.ID, "add-button")

    customer_id_input.clear()
    book_id_input.clear()
    quantity_input.clear()

    customer_id_input.send_keys(test_case["customer_id"])
    book_id_input.send_keys(test_case["book_id"])
    quantity_input.send_keys(test_case["quantity"])
    add_button.click()

    time.sleep(1)

    startPass = "\x1b[38;2;0;255;0m"
    endPass = "\x1b[0m"

    startFail = "\x1b[38;2;255;0;0m"
    endFail = "\x1b[0m"

    error_messages = driver.find_elements(By.CLASS_NAME, "error-message")
    displayed_errors = [error.text for error in error_messages if error.is_displayed()]
    
    if test_case["expected_result"] == "success":
        print(f'{startPass}Test case {index}{endPass}: {startPass}passed{endPass}: Successful addition')
    elif test_case["expected_result"] == "fail":
        print(f'{startPass}Test case {index}{endPass}: {startFail}failed{endFail} {", ".join(displayed_errors)}')
    
    index += 1

print("---Kiểm thử thành công---")

from time import sleep
sleep(5)

# Đóng trình duyệt
driver.quit()
