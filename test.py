from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Khởi tạo trình duyệt
driver = webdriver.Chrome()

the_url = "http://127.0.0.1:5501/index.html"
driver.get(the_url)

# Chờ trang web tải hoàn thành
time.sleep(2)

# Tạo danh sách các trường hợp kiểm tra
test_cases = [
    # Kiểm tra dữ liệu hợp lệ
    {
        "name": "John Doe",
        "age": "30",
        "email": "john.doe@example.com",
        "phone": "0987654321",
        "birthdate": "10/01/1990",
        "expected_result": "success"
    },
    # Kiểm tra tên quá ngắn
    {
        "name": "A",
        "age": "30",
        "email": "alice@example.com",
        "phone": "0987654321",
        "birthdate": "10/01/1990",
        "expected_result": "fail"
    },
    # Kiểm tra tuổi âm
    {
        "name": "Alice",
        "age": "-10",
        "email": "alice@example.com",
        "phone": "0987654321",
        "birthdate": "10/01/1990",
        "expected_result": "fail"
    },
    # Kiểm tra email không hợp lệ
    {
        "name": "Eve",
        "age": "25",
        "email": "eve.com",
        "phone": "0987654321",
        "birthdate": "10/01/1990",
        "expected_result": "fail"
    },
    # Kiểm tra số điện thoại không hợp lệ
    {
        "name": "Bob",
        "age": "40",
        "email": "bob@example.com",
        "phone": "12345",
        "birthdate": "10/01/1990",
        "expected_result": "fail"
    },
    # Kiểm tra ngày sinh không hợp lệ
    {
        "name": "Charlie",
        "age": "35",
        "email": "charlie@example.com",
        "phone": "0987654321",
        "birthdate": "01-10-1990",
        "expected_result": "fail"
    },
]

import os 
os.system("cls")
index = 1
for test_case in test_cases:
    name_input = driver.find_element(By.ID, "name")
    age_input = driver.find_element(By.ID, "age")
    email_input = driver.find_element(By.ID, "email")
    phone_input = driver.find_element(By.ID, "phone")
    birthdate_input = driver.find_element(By.ID, "birthdate")
    add_button = driver.find_element(By.ID, "add-button")

    name_input.send_keys(test_case["name"])
    age_input.send_keys(test_case["age"])
    email_input.send_keys(test_case["email"])
    phone_input.send_keys(test_case["phone"])
    birthdate_input.send_keys(test_case["birthdate"])
    add_button.click()

    time.sleep(1)

    startPass = "\x1b[38;2;0;255;0m"
    endPass = "\x1b[0m"

    startFail = "\x1b[38;2;255;0;0m"
    endFail = "\x1b[0m"

    user_list = driver.find_element(By.ID, "customer-list")
    added_user_info = user_list.find_elements(By.TAG_NAME, "tr")[-1].text
    if test_case["expected_result"] == "success":
        expected_user_info = f'{test_case["age"]} {test_case["email"]} {test_case["phone"]} {test_case["birthdate"]}'
        print(f'{startPass}Test case {index}{endPass}: {startPass}passed{endPass}: Successful addition')
    elif test_case["expected_result"] == "fail":
        error_messages = driver.find_elements(By.CLASS_NAME, "error-message")
        displayed_errors = [error.text for error in error_messages if error.is_displayed()]
        print(f'{startPass}Test case {index}{endPass}: {startFail}failed{endFail} {", ".join(displayed_errors)}')
    index += 1
print("---Kiểm thử thành công---")

# Đóng trình duyệt
driver.quit()
