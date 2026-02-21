document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // استخراج القيم من المدخلات
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            try {
                // إرسال الطلب إلى ملف PHP المحلي
                const response = await fetch('http://localhost/Gradution%20Project/api/contact/create.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                });

                const data = await response.json();

                if (data.status === true) {
                    alert(data.message); // رسالة النجاح من السيرفر
                    contactForm.reset(); // تفريغ الحقول بعد الإرسال
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                console.error("Error details:", error); 
                alert("Connection error! Check if XAMPP is running and the URL is correct.");
            }
        });
    }
});