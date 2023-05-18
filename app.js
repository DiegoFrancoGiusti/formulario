const form = document.querySelector('.c-form')
const messageContent = document.querySelectorAll('small')
const passwordRrequiredsItems = document.querySelectorAll('.c-required__item')
const button = document.querySelector('.c-form__button')
const paragraph = document.createElement('p')
let regexResult = null
let expressionsResults = null
const voidRegex = /[ ]/
const inputs = [
  form.inputName,
  form.inputEmail,
  form.inputTel,
  form.inputData,
  form.inputpassword,
  form.inputpasswordConf
]

const showMessageError = (input,index,menssage) => {
  input.classList.add('input--error')
  messageContent[index].classList.add('message-error')
  messageContent[index].textContent = menssage
}

const hiddenMessageError = (input,index) => {
  input.classList.remove('input--error')
  messageContent[index].classList.remove('message-error')
}

const isNameValid = name => {
  const regexName = /^[a-záãéêíóõçñ ]+$/i
  regexResult = regexName.test(name.value)

  if(regexResult) {
    hiddenMessageError(name,0)
    return true
  }

  return false
}

const isEmailValid = email => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
  regexResult = emailRegex.test(email.value)

  if(regexResult){
    hiddenMessageError(email,1)
    return true
  }

  return false
}

const isPhoneValid = phone => {
  const phoneRegex = /(\(?\d{2}\)?\s)?[ ]?(\d{4,5}\-?\d{4})/g
  regexResult = phoneRegex.test(phone.value)

  if(regexResult){
    hiddenMessageError(phone,2)
    return true
  }

  return false
}

const isPasswordvalid = password => {
  const x = expressionsResults.some(item => item === false)

  if(!x){
    hiddenMessageError(password,2)
    return true
  }

 return false
}

const isPasswordSame = repeatpassword => {

  if(repeatpassword.value === inputs[4].value){
    hiddenMessageError(repeatpassword,5)
    return true
  }

  return false
}

const successSubmit = () => {
  paragraph.innerText = 'Cadastro realizado!'
  paragraph.classList.add('message-success')
  button.insertAdjacentElement('afterend',paragraph)
}

const hiddenSuccessSubmit = () => {
  setTimeout(() => {
    paragraph.remove()
  },2000)
}

const resetValues = () => {
  inputs.forEach(input => {
    input.value = ''
  })

  passwordRrequiredsItems.forEach(requiredItem => {
    requiredItem.style.listStyleImage = 'url(../../img/incorrect_icon.png)'
  })

  expressionsResults = null
}

const setIconsPasswordRequired = expressions => {
  for(let i = 1;i <= 5;i++){
    expressions[i] ? passwordRrequiredsItems[i-1].style.listStyleImage = 'url(../../img/correct_icon.png)' : passwordRrequiredsItems[i-1].style.listStyleImage = 'url(../../img/incorrect_icon.png)'
  }
}

inputs[4].addEventListener('input', () => {
  const lowerCaseRegex = /(?=.*[a-z])/
  const upperCaseRegex = /(?=.*[A-Z])/
  const numberRegex = /(?=.*[0-9])/
  const symbolRegex = /(?=.*[!@#$%&~^()])/
  let passwordInputValue = inputs[4].value
  const expressions = [
    !voidRegex.test(passwordInputValue),
    passwordInputValue.length >= 6,
    lowerCaseRegex.test(passwordInputValue),
    upperCaseRegex.test(passwordInputValue),
    numberRegex.test(passwordInputValue),
    symbolRegex.test(passwordInputValue)
  ]

  expressions[0] ? hiddenMessageError(inputs[4],4) : showMessageError(inputs[4],4,'A senha não pode conter espaços em branco')
  setIconsPasswordRequired(expressions)

  expressionsResults = expressions
})

form.addEventListener('submit', event => {
  event.preventDefault()

  inputs.forEach((input,index) => {
    if(input.value === ''){
      showMessageError(input,index,'Campo obrigatório')
      return
    }

    if(voidRegex.test(input.value)){
      showMessageError(input,index,'Valor do campo inválido')
      return
    }
  })

  if(!isNameValid(inputs[0])){
    showMessageError(inputs[0],0,'Nome inválido')
    return
  }

  if(!isEmailValid(inputs[1])){
    showMessageError(inputs[1],1,'Email inválido')
    return
  }

  if(!isPhoneValid(inputs[2])){
    showMessageError(inputs[2],2,'Telefone inválido')
    return
  }
  
  if(!isPasswordvalid(inputs[4])){
    showMessageError(inputs[4],4,'Senha inválida')
    return
  }

  if(!isPasswordSame(inputs[5])){
    showMessageError(inputs[5],5,'Senha inválida')
    return
  }

  successSubmit()
  resetValues()
  hiddenSuccessSubmit()
})