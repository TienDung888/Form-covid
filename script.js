const submitBtn = document.querySelector('button');

// regex email
const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;

// Lấy tất cả các input radio 
const nganhRadio = document.getElementsByName('nganh');
const phuongRadio = document.getElementsByName('phuong');

// Lấy các phần tử hiển thị lỗi cho radio (Sử dụng ID mới)
const nganhErrorDisplay = document.getElementById('nganh-error-display');
const phuongErrorDisplay = document.getElementById('phuong-error-display');

//input bắt buộc
const requiredInputs = [
    document.getElementById('ten-don-vi'),
    document.getElementById('ma-so-thue'),
    document.getElementById('dia-chi'),
    document.getElementById('tong'),
    document.getElementById('so-nguoi'),
    document.getElementById('so-nguoi-dt'),
    document.getElementById('sdt'),
    document.getElementById('email'),
];

function setError(element, message) {
    // Thêm viền đỏ 
    element.classList.add('error-border');
    
    let errorDisplay = element.nextElementSibling;
    
    // Kiểm tra xem phần tử kế tiếp có phải là thông báo lỗi không
    if (!errorDisplay || !errorDisplay.classList.contains('error-message')) {
        errorDisplay = document.createElement('span');
        errorDisplay.classList.add('error-message');
        element.parentNode.insertBefore(errorDisplay, element.nextSibling);
    }
    errorDisplay.textContent = message;
}

function setRadioError(errorElement, message) {
    errorElement.textContent = message;
}

// Xóa thông báo lỗi
function clearError(element) {
    element.classList.remove('error-border');
    let errorDisplay = element.nextElementSibling;
    if (errorDisplay && errorDisplay.classList.contains('error-message')) {
        errorDisplay.textContent = '';
    }
}

// Vòng lặp check radio
function isRadioChecked(radio){
    for(let i=0; i<radio.length; i++){
        if(radio[i].checked){
            return true;
        }
    }
    return false;
}

// Hàm check chính
function validateForm(event){
    let isValid = true;

    requiredInputs.forEach(input =>{
        const formGroupDiv = input.closest('.form_group');
        const label = formGroupDiv.querySelector('label');
        const labelText = label.textContent;

        clearError(input);
    
        if(input.value.trim() === ""){
            setError(input, `"${labelText.replace(':', '').trim()}" là bắt buộc.`);
            isValid = false;
        }
    });

    //Check email
    const email = document.getElementById('email');
    if(email.value.trim() !== ""){
        if(!emailRegex.test(email.value.trim())){
            setError(email, 'Địa chỉ email k hợp lệ');
            isValid = false;
        }else{
            clearError(email);
        }
    }

    //Check ngành
    const nganhGroupContainer = nganhRadio[0].closest('.form_group'); 
    if (!isRadioChecked(nganhRadio)) {
        setRadioError(nganhErrorDisplay, 'Vui lòng chọn một Ngành nghề.');
        isValid = false;
    } else {
        clearError(nganhGroupContainer.querySelector('label'));
    }

    //Check phường
    const phuongGroupContainer = phuongRadio[0].closest('.form_group');
    if(!isRadioChecked(phuongRadio)){
        setRadioError(phuongErrorDisplay, 'Vui lòng chọn phường.');
        isValid = false;
    }else{
        clearError(phuongGroupContainer.querySelector('label'));
    }
}
submitBtn.addEventListener('click', validateForm);

requiredInputs.forEach(input => {
    input.addEventListener('input', function() {
        clearError(this); 
    });
});


//---------------------------------

// const submitBtn = document.querySelector('button');

// // regex email
// const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// // Lấy các nhóm radio
// const nganhRadio = document.getElementsByName('nganh');
// const phuongRadio = document.getElementsByName('phuong');

// // Lấy các phần tử hiển thị lỗi cho radio (Sử dụng ID mới)
// const nganhErrorDisplay = document.getElementById('nganh-error-display');
// const phuongErrorDisplay = document.getElementById('phuong-error-display');

// // Input bắt buộc
// const requiredInputs = [
//     document.getElementById('ten-don-vi'),
//     document.getElementById('ma-so-thue'),
//     document.getElementById('dia-chi'),
//     document.getElementById('ho-ten'),
//     document.getElementById('sdt'),
//     document.getElementById('email'),
// ];

// // --- HÀM HỖ TRỢ (Đã đơn giản hóa) ---

// // Hàm kiểm tra radio: Trả về true nếu ít nhất một tùy chọn được chọn
// function isRadioChecked(radio){
//     for(let i=0; i<radio.length; i++){
//         if(radio[i].checked){
//             return true;
//         }
//     }
//     return false; // Đã sửa lỗi cú pháp
// }

// // Hàm hiển thị lỗi đơn giản cho Input/Textarea
// function setError(element, message) {
//     // 1. Thêm viền đỏ cho Input/Textarea
//     if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
//         element.classList.add('error-border');
//     }
    
//     // 2. Hiển thị thông báo lỗi (sử dụng element.nextElementSibling cho input)
//     let errorDisplay = element.nextElementSibling;
    
//     if (!errorDisplay || !errorDisplay.classList.contains('error-message')) {
//         errorDisplay = document.createElement('span');
//         errorDisplay.classList.add('error-message');
//         element.parentNode.insertBefore(errorDisplay, element.nextSibling);
//     }
//     errorDisplay.textContent = message;
// }

// // Hàm hiển thị lỗi cho Radio/Checkbox (Dùng cho Span placeholder)
// function setRadioError(errorElement, message) {
//     errorElement.textContent = message;
// }

// // Xóa thông báo lỗi
// function clearError(element) {
//     element.classList.remove('error-border');
//     let errorDisplay = element.nextElementSibling;
//     if (errorDisplay && errorDisplay.classList.contains('error-message')) {
//         errorDisplay.textContent = '';
//     }
// }


// // --- HÀM CHECK CHÍNH (MAIN VALIDATION FUNCTION) ---
// function validateForm(event){
//     event.preventDefault(); 
//     let isValid = true;
    
//     // Xóa lỗi radio/checkbox cũ trước
//     setRadioError(nganhErrorDisplay, '');
//     setRadioError(phuongErrorDisplay, '');

//     // 1. Check Input/Textarea Bắt buộc
//     requiredInputs.forEach(input =>{
//         const formGroupDiv = input.closest('.form_group');
//         const label = formGroupDiv.querySelector('label');
//         const labelText = label ? label.textContent : ''; 
        
//         clearError(input);
    
//         if(input.value.trim() === ""){
//             setError(input, `Trường "${labelText.replace(':', '').trim()}" là bắt buộc.`);
//             isValid = false;
//         }
//     });

//     // 2. Check Email (Định dạng)
//     const emailInput = document.getElementById('email');
//     if(emailInput.value.trim() !== ""){
//         if(!emailRegex.test(emailInput.value.trim())){
//             setError(emailInput, 'Địa chỉ email không hợp lệ.');
//             isValid = false;
//         }else{
//             clearError(emailInput);
//         }
//     }

//     // 3. Check Ngành nghề (RADIO)
//     if (!isRadioChecked(nganhRadio)) {
//         setRadioError(nganhErrorDisplay, 'Vui lòng chọn một Ngành nghề.');
//         isValid = false;
//     }

//     // 4. Check Phường (RADIO)
//     if(!isRadioChecked(phuongRadio)){
//         setRadioError(phuongErrorDisplay, 'Vui lòng chọn Phường.');
//         isValid = false;
//     }
    
//     if(isValid){
//         alert("Đăng ký thành công!");
//     }
// }

// // GẮN SỰ KIỆN
// submitBtn.addEventListener('click', validateForm);

// requiredInputs.forEach(input => {
//     input.addEventListener('input', function() {
//         clearError(this); 
//     });
// });