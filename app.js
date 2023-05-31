const form = document.querySelector('.c-form')
const inputs = document.querySelectorAll('.c-form__input')
const messageErrorContent = document.querySelectorAll('.error-menssage')
const passwordRequiredContent = document.querySelectorAll('.c-required__item')
const passwordInput = inputs[4]
//const password = []
let regexResult = null

console.log(inputs, messageErrorContent, passwordRequiredContent)

const showInputError = (input,index,menssage) => {
  messageErrorContent[index].style.display = 'block'
  messageErrorContent[index].classList.add('message-error')
  input.classList.add('input--error')
  messageErrorContent[index].textContent = menssage
}

const hiddenInputError = (input,index) => {
  messageErrorContent[index].style.display = 'none'
  messageErrorContent[index].classList.remove('message-error')
  input.classList.remove('input--error')
  messageErrorContent[index].textContent = ''
}

const isNameValid = input => {
  const nameRegex = /^[a-záàãâéêíóõôçñ ]+$/i
  regexResult = nameRegex.test(input.value) 

  if(regexResult){
    hiddenInputError(input,0)
    return true
  }

  return false
}

const isEmailValid = input => {
  const emailRegex = /^[a-z0-9.-_]+@[a-z0-9.-_]+\.[a-z]{2,}$/i
  regexResult = emailRegex.test(input.value)

  if(regexResult){
    hiddenInputError(input,1)
    return true
  }

  return false
}

const isPhoneValid = input => {
  const phoneRegex = /(\(?\d{2}\)?\s)?(\d{4,5}\-?\d{4})/g
  regexResult = phoneRegex.test(input.value)

  if(regexResult){
    hiddenInputError(input,2)
    return true
  }

  return false
}

const isPassworItemsValid = expressions => {
  for(let i = 1;i <= 5;i++){
    expressions[i] ? passwordRequiredContent[i-1].style.listStyleImage = 'url(img/correct_icon.png)' : passwordRequiredContent[i-1].style.listStyleImage = 'url(img/incorrect_icon.png)'
  }
}

const isPassworValid = (input,index) => {
  const isAllTrue = x.some(item => item === false)

  if(!isAllTrue){
    hiddenInputError(input,index)
    return true
  }

  return false
}

let x = null

passwordInput.addEventListener('input', event => {
  const lowerCaseRegex = /(?=.*[a-z])/
  const upperCaseRegex = /(?=.*[A-Z])/
  const numberRegex = /(?=.*[0-9])/
  const symbolRegex = /(?=.*[!@#$%&*^~+])/
  const voidRegex = /[ ]/
  const expressions = [
    !voidRegex.test(passwordInput.value),
    passwordInput.value.length >= 6,
    lowerCaseRegex.test(passwordInput.value),
    upperCaseRegex.test(passwordInput.value),
    numberRegex.test(passwordInput.value),
    symbolRegex.test(passwordInput.value)
  ]

  expressions[0]?hiddenInputError(inputs[4],4):showInputError(inputs[4],4,'A senha não deve conter espaços em branco')
  isPassworItemsValid(expressions)

  x = expressions
})

const isRepeatPasswordValid = (input,index) => {
  if(input.value === inputs[4].value){
    hiddenInputError(input,index)
    return true
  }

  return false
}

form.addEventListener('submit', event => {
  event.preventDefault()

  inputs.forEach((input,index) => {
    if(input.value === ''){
      showInputError(input,index,'Campo Obrigatório!')
      return
    }
      hiddenInputError(input,index)
  })
  
  if(!isNameValid(inputs[0])){
    showInputError(inputs[0],0,'Nome Inválido')
    return
  }

  if(!isEmailValid(inputs[1],1)){
    showInputError(inputs[1],1,'Email Inválido')
    return
  }

  if(!isPhoneValid(inputs[2],2)){
    showInputError(inputs[2],2,'Telefone Inválido')
    return
  }

  if(!isPassworValid(inputs[4],4)){
    showInputError(inputs[4],4,'Senha Inválida')
    return
  }

  if(!isRepeatPasswordValid(inputs[5],5)){
    showInputError(inputs[5],5,'Senha Inválida')
    return
  }

  

  regexResult = null
})