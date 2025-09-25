const questions = document.querySelectorAll('.question');
const progress = document.querySelector('.progress');
let currentIndex = 0;
const answers = {};

// عرض السؤال الحالي
function showQuestion(index){
    questions.forEach(q => q.classList.remove('active'));
    questions[index].classList.add('active');
    progress.style.width = `${((index)/questions.length)*100}%`;
}

// زر Next
document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', ()=>{
        const parent = btn.parentElement;
        const input = parent.querySelector('input');
        if(input && input.value !== ''){
            answers[input.id || 'input'+currentIndex] = input.value;
            currentIndex++;
            if(currentIndex < questions.length) showQuestion(currentIndex);
            else sendEmail();
        } else if(!input){
            currentIndex++;
            if(currentIndex < questions.length) showQuestion(currentIndex);
            else sendEmail();
        } else {
            alert('من فضلك املأ الحقل');
        }
    });
});

// خيارات الأسئلة
document.querySelectorAll('.options button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        const parent = btn.closest('.question');
        answers[parent.dataset.index] = btn.dataset.value;
        currentIndex++;
        if(currentIndex < questions.length) showQuestion(currentIndex);
        else sendEmail();
    });
});

// إرسال الإجابات على Gmail باستخدام EmailJS
function sendEmail(){
    document.getElementById('questions').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    progress.style.width = `100%`;

    // استخدام EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_email: "mohamedmostafa889mo@gmail.com",
        answers: JSON.stringify(answers, null, 2)
    }, "YOUR_PUBLIC_KEY")
    .then(() => {
        alert("تم إرسال الإجابات على الإيميل بنجاح! ✅");
    })
    .catch((err) => {
        console.error(err);
        alert("حصل خطأ أثناء إرسال الإجابات 😢");
    });
}
