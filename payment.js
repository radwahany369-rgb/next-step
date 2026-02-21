// ====================== Payment Methods Logic ======================
const methods = document.querySelectorAll('.method');
const wallet = document.getElementById('walletBox');
const insta = document.getElementById('instaBox');
const card = document.getElementById('cardBox');
const payBtn = document.getElementById('payBtn');

function hideAll() {
    [wallet, insta, card].forEach(box => box?.classList.add('hidden'));
    methods.forEach(m => m.classList.remove('active'));
}

methods.forEach(method => {
    method.addEventListener('click', () => {
        hideAll();
        method.classList.add('active');
        const type = method.dataset.method;
        document.getElementById(`${type}Box`)?.classList.remove('hidden');
    });
});

// ====================== Pay Button Logic ======================
payBtn?.addEventListener('click', async () => {
    const activeMethod = document.querySelector('.method.active');
    const amountInput = document.querySelector('.amount-input');
    
    // سحب ID الطالب الذي تم تخزينه أثناء الـ Login
    const studentId = localStorage.getItem('student_id'); 

    if (!activeMethod) return alert('Please select a payment method');
    if (!amountInput.value || amountInput.value <= 0) return alert('Please enter a valid amount');
    if (!studentId) return alert('Please Login first to complete payment!');

    const paymentData = {
        method: activeMethod.dataset.method,
        amount: amountInput.value,
        student_id: studentId
    };

    try {
        const response = await fetch('http://localhost/Gradution%20Project/api/payment/create.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData)
        });

        const data = await response.json();

        if (data.status) {
            alert(data.message);
            window.location.href = 'print.html';
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error(error);
        alert('Connection error! Check XAMPP and URL.');
    }
});