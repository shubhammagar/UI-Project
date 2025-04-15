"use strict";

  function initDefaultUsers() {
    if (!sessionStorage.getItem('users')) {
      const defaultUsers = {
        "hello@test.com": ['test'],
        "john.doe@test.com": ['hello','john']
 
      };
      sessionStorage.setItem('users', JSON.stringify(defaultUsers));
      console.log("Default users added to sessionStorage");
    }
  }
  
  initDefaultUsers();


  function getStoredUsers(){
    const users= sessionStorage.getItem('users');
    return users ? JSON.parse(users):{};
  }
function login(e){
   e.preventDefault();
        const email= document.getElementById('email').value.trim();
        const password= document.getElementById('password').value.trim();
        const error = document.getElementById('error');
        const validCredentials= getStoredUsers();
        const isValid = Array.isArray(validCredentials[email])
      ? validCredentials[email].includes(password)
      : validCredentials[email] === password;
       if(isValid){
        sessionStorage.setItem('email',email);
        window.location.href='table.html';
       } else if(!email || !password ){
        error.style.color = 'red';
        error.textContent = 'Please fill in all fields.';
        setTimeout(()=>{
          error.textContent = '';
        },1500)
       }
       else {
        error.style.color = 'red';
        error.textContent = 'Invalid credentials';
        setTimeout(()=>{
          error.textContent = '';
        },1500)

       } 
}

function register(e){
    
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirm = document.getElementById('confirm').value.trim();
        const errorElement = document.getElementById('error');
        
        if (!email || !password || !confirm) {
            errorElement.style.color = 'red';
            errorElement.textContent = 'Please fill in all fields.';
            setTimeout(()=>{
              
              errorElement.textContent = '';
            },1500)
            return;
          }
        if (password !== confirm) {
            errorElement.style.color = 'red';
          errorElement.textContent = 'Passwords do not match.';
          setTimeout(()=>{
            errorElement.textContent = '';
          },1500)
          return;
        }
      
        const users = getStoredUsers();
      
        if (users[email]) {
            errorElement.style.color = 'red';
          errorElement.textContent = 'Email already registered.';
          setTimeout(()=>{
            errorElement.textContent = '';
          },1500)
          return;
        }
      
        
        users[email] = [password];
        sessionStorage.setItem('users', JSON.stringify(users));
      
        errorElement.style.color = 'green';
        errorElement.textContent = 'Registration successful! Redirecting...';
      
        
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
}


function displayUserEmail() {
  const userEmail = sessionStorage.getItem('email');
  const emailElement = document.getElementById('userEmail');
  
  if (!emailElement) return; 

  emailElement.textContent = userEmail || 'User';
}

  displayUserEmail();

  function colorFirstRow(){
    const rows = document.querySelectorAll('#dataTable tbody tr');
    if(rows.length) rows[0].classList.add('red-row');
  }

    function colorLastRow(){
        const rows = document.querySelectorAll('#dataTable tbody tr');
        if(rows.length) rows[rows.length - 1].classList.add('red-row');
    }

    function resetRowColor(){
        document.querySelectorAll('#dataTable tbody tr').forEach(row => row.classList.remove('red-row'));
    }


    function sendResetLink(e){
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim();
    const successElement = document.getElementById('success');
    if(!email){
      successElement.style.color = 'red';
      successElement.textContent = 'Please enter your email.';
      setTimeout(()=>{
        successElement.textContent = '';
      },1500)
    }
    if (email) {
        successElement.style.color = 'green';
        successElement.textContent = 'Reset link sent to ' + email;
        setTimeout(() => {
            window.location.href = 'login.html';
        },1500)
      }
}


