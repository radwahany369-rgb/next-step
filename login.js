document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signinForm'); // تأكدي أن id الفورم في HTML هو signinForm

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault(); 
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // استخدام نفس طريقة المسار التي نجحت في الـ Register
                const response = await fetch('http://localhost/Gradution%20Project/api/auth/login.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                const data = await response.json();
                
               if (data.status === true) {
    alert("Sign-in successful! ✅");
    
    // 1. حفظ اسم المستخدم (للعرض في الموقع)
    localStorage.setItem('user_name', data.name);
    
    // 2. حفظ رقم الطالب (ضروري جداً لعملية الدفع والربط مع الداتابيز)
    localStorage.setItem('student_id', data.student_id); 
    
    // التوجيه لصفحة الهوم
    window.location.href = "Home.html"; 

                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                console.error(error);
                alert("Connection error! Check if XAMPP is running.");
            }
        });
    }
});