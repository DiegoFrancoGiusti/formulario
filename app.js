const form = document.querySelector('.c-form')
const inputs = document.querySelectorAll('.c-form__input')
const messageErrorContent = document.querySelectorAll('.error-menssage')

form.addEventListener('submit', event => {
  event.preventDefault()

  inputs.forEach((input,index) => {
    if(input.value === ''){
      messageErrorContent[index].style.display = 'block'
      messageErrorContent[index].classList.add
      messageErrorContent[index].textContent = 'Campo obrigatório!'
    }
  })
})