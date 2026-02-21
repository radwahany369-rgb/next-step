document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');

    // كود إرسال البيانات
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault(); 
            
            const fullname = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert("Passwords do not match! ❌");
                return;
            }

            try {
             
// هذا المسار سيجعل الجافا سكريبت يبحث عن الملف بالنسبة لموقع الصفحة الحالية
const response = await fetch('http://localhost/Gradution%20Project/api/auth/register.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        fullname: fullname,
        email: email,
        phone: "0102345678", 
        password: password
    })
});

                const data = await response.json();
                if (data.status === true) {
                    alert("Account created successfully! ✅");
                    window.location.href = "Login.html";
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                alert("Connection error! Check if XAMPP is running.");
            }
        });
    }
});