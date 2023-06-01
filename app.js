const body = document.body
const form = document.querySelector('.c-form')
const inputs = document.querySelectorAll('.c-form__input')
const messageErrorContent = document.querySelectorAll('.error-menssage')
const passwordRequiredContent = document.querySelectorAll('.c-required__item')
const passwordInput = inputs[4]
let regexResult = null
let modal = null
let x = null

const showModal = (nome,email,phone,data) => {
  const modalTemplate = `
  <div class="whrapper-modal">
    <div class="modal-content">
      <div class="c-modal">
        <h2 class="c-modal__title">Cadastro Realizado com Sucesso!</h2>
        <section>
          <section class="c-modal__user-info-content">
            <p>Nome:</p>
            <p class="c-modal__user-info">${nome.value}</p>
          </section>

          <section class="c-modal__user-info-content">
            <p>E-mail:</p>
            <p class="c-modal__user-info">${email.value}</p>
          </section>

          <section class="c-modal__user-info-content">
            <p>Telefone:</p>
            <p class="c-modal__user-info">${phone.value}</p>
          </section>

          <section class="c-modal__user-info-content">
            <p>Data de nascimento:</p>
            <p class="c-modal__user-info">${data.value}</p>
          </section>
        </section>

        <div class="c-form__btn-container">
          <button class="c-form__button">OK</button>
        </div>
      </div>
    </div>
  </div>
`
  body.innerHTML += modalTemplate
}

const hiddenModal =  event => {
  if(event.target.classList[0] === 'modal-content' || event.target.classList[0] === 'c-form__button'){
    modal.style.display = 'none'
    reset()
  }
}

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

const isRepeatPasswordValid = (input,index) => {
  if(input.value === inputs[4].value){
    hiddenInputError(input,index)
    return true
  }

  return false
}

const reset = () => {
  passwordRequiredContent.forEach((item,index) => {
   passwordRequiredContent[index].style.listStyleImage = 'url(img/incorrect_icon.png)'
  })
  inputs.forEach(input => {
    console.log(input.value)
  })
  regexResult = null
}


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

  showModal(inputs[0],inputs[1],inputs[2],inputs[3])

  modal = document.querySelector('.whrapper-modal')
  modal.addEventListener('click',hiddenModal)
})
