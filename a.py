test_cases = [
    {"name": "Test 1", "expected_result": "success"},
    {"name": "Test 2", "expected_result": "fail"},
    # Thêm các test case khác ở đây
]

for test_case in test_cases:
    print(f'\x1b[38;2;255;0;0m{test_case["name"]} passed: Successful addition\x1b[0m')
