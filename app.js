const form = document.querySelector('.c-form')
const messageContent = document.querySelectorAll('small')
let regexResult = null
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
  let passwordInputValue = inputs[4].value
  

  //console.log(passwordRegex.test(passwordInputValue))
  for (const match of passwordInputValue.matchAll(passwordRegex)) {
    console.log(match.groups.upperCase)
  }
})

form.addEventListener('submit', event => {
  event.preventDefault()

  inputs.forEach((input,index) => {
    if(input.value === ''){
      showMessageError(input,index,'Campo obrigatório')
      return
    }

    if(input === inputs[0]){
      const regexName = /^[a-záãéêíóõçñ ]+$/i
      regexResult = regexName.test(input.value)
      
      if(regexResult === false){
        showMessageError(input,index,'Nome inválido')
        return
      }
    }

    if(input === inputs[1]){
      const regexEmail = /\S+@\S+\.\S+/
      regexResult = regexEmail.test(input.value)

      if(regexResult === false){
        showMessageError(input,index,'Email inválido')
        return
      }
    }
    hiddenMessageError(input,index)
  })
})

/*const personList = `First_Name: John, Last_Name: Doe
First_Name: Jane, Last_Name: Smith`;

const regexpNames =
  /First_Name: (?<firstname>\w+), Last_Name: (?<lastname>\w+)/gm;
for (const match of personList.matchAll(regexpNames)) {
  console.log(`Hello ${match.groups.firstname} ${match.groups.lastname}`);
}*/
