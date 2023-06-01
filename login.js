document.querySelector(".menu").addEventListener("click", animateBars);

let linea1 = document.querySelector(".linea1");
let linea2 = document.querySelector(".linea2");
let linea3 = document.querySelector(".linea3");

function animateBars() {
  linea1.classList.toggle("activa-linea1");
  linea2.classList.toggle("activa-linea2");
  linea3.classList.toggle("activa-linea3");
}

const iconoMenu = document.querySelector("#iconoMenu"),
  menu = document.querySelector("#menuActive");

iconoMenu.addEventListener("click", (e) => {
  menu.classList.toggle("active-menu");
});

const form = document.getElementById('formulario');
const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');

form.addEventListener('submit', e => {
  e.preventDefault();

  validateInputs();
});

const setError = (element,message) =>{
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error')

  errorDisplay.innerText = message;
  inputControl.classList.add('error')
  inputControl.classList.remove('success')
};

const setSuccess = element =>{
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error')

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error')
};

const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.avlue.trim();
  const passwordValue = password.value.trim();


  if(usernameValue === '') {
    setError(username, "El nombre es necesario")
  } else {
    setSuccess(username);
  }

  if(emailValue === ''){
    setError(email, "El emali es necesario")
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Ingrese un email valido")
  }

  if (passwordValue === '') {
    setError(password, "La contraseña es necesaria")
  } else if (passwordValue.length < 8) {
    setError(password, "Deve tener al menos 8 caracteres")
  } else {
    setSuccess(password);
  }
};