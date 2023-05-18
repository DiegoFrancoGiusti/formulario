const form = document.querySelector('.c-form')
const messageContent = document.querySelectorAll('small')
const passwordRrequiredsItems = document.querySelectorAll('.c-required__item')
const button = document.querySelector('.c-form__button')
const z = document.createElement('p')
let regexResult = null
let x = null
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
  expressions[1] ? passwordRrequiredsItems[0].style.listStyleImage = 'url(../../img/correct_icon.png)' : passwordRrequiredsItems[0].style.listStyleImage = 'url(../../img/incorrect_icon.png)' 
  expressions[2] ? passwordRrequiredsItems[1].style.listStyleImage = 'url(../../img/correct_icon.png)' : passwordRrequiredsItems[1].style.listStyleImage = 'url(../../img/incorrect_icon.png)'
  expressions[3] ? passwordRrequiredsItems[2].style.listStyleImage = 'url(../../img/correct_icon.png)' : passwordRrequiredsItems[2].style.listStyleImage = 'url(../../img/incorrect_icon.png)'
  expressions[4] ? passwordRrequiredsItems[3].style.listStyleImage = 'url(../../img/correct_icon.png)' : passwordRrequiredsItems[3].style.listStyleImage = 'url(../../img/incorrect_icon.png)'
  expressions[5] ? passwordRrequiredsItems[4].style.listStyleImage = 'url(../../img/correct_icon.png)' : passwordRrequiredsItems[4].style.listStyleImage = 'url(../../img/incorrect_icon.png)'

  x = expressions
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

  if(inputs[0]){
    const regexName = /[a-záãéêíóõçñ]+$/i
    regexResult = regexName.test(inputs[0].value)
    
    if(regexResult === false){
      showMessageError(inputs[0],0,'Nome inválido')
      return
    }
    hiddenMessageError(inputs[0],0)
  }

  if(inputs[1]){
    const regexEmail = /\S+@\S+\.\S+/
    regexResult = regexEmail.test(inputs[1].value)

    if(regexResult === false){
      showMessageError(inputs[1],1,'Email inválido')
      return
    }

    hiddenMessageError(inputs[1],1)
  }

  if(inputs[2]){
    const telRegex = /(\(?\d{2}\)?\s)?[ ]?(\d{4,5}\-?\d{4})/g
    regexResult = telRegex.test(inputs[2].value)

    if(regexResult === false){
      showMessageError(inputs[2],2,'Telefone inválido')
      return
    }

    hiddenMessageError(inputs[2],2)
  }

  if(inputs[4]){
    if(x.some(item => item === false)){
      showMessageError(inputs[4],4,'Senha inválida')
      return
    }

    hiddenMessageError(inputs[4],4)
  }

  if(inputs[5]){
    if(inputs[5].value !== inputs[4].value){
      showMessageError(inputs[5],5,'Senha inválida')
      return
    }

    hiddenMessageError(inputs[5],5)
  }

    z.innerText = 'Cadastro realizado!'
    z.classList.add('message-success')
    button.insertAdjacentElement('afterend',z)

  inputs.forEach(input => {
    input.value = ''
  })

  x = null

  passwordRrequiredsItems.forEach(requiredItem => {
    requiredItem.style.listStyleImage = 'url(../../img/incorrect_icon.png)'
  })

  setTimeout(() => {
    z.remove()
  },2000)
})


