// import twilio from 'twilio'

const optCard = document.querySelector(".otp-card")
const phoneCard = document.querySelector(".phone-number-card")
const yourNumber = document.getElementById('yourNumber')
const message = document.querySelector(".code")
const messageAlert = document.querySelector(".messageAlert")


const inputCode = document.getElementById('inputCodeForm')
const inputs = document.querySelectorAll(".otp-card-inputs input")
const button = document.querySelector(".otp-card button")
const send = document.getElementById("send")
const check = document.getElementById("check")
const phoneInp = document.getElementById("phoneNum")
const board = document.querySelector("body")
const codeArray = ["23344", "97654", "57913", "83367", "64790", "23242", "23451"]
let randMess = codeArray[Math.floor(Math.random() * codeArray.length)]

let messageSound = document.createElement("audio")
messageSound.src = "../Music/messageSound.mp3"
board.appendChild(messageSound)


// Message animation function
function messageAlertFunc() {
    setTimeout(() => {
        messageAlert.style.bottom = "80%"
        messageSound.play()
        message.innerText = randMess
        // console.log(randMess)

        setTimeout(() => {
            messageAlert.style.bottom = "100%"
        }, 2500)
    }, 2000)
}

function errorMessage() {
    Swal.fire({
        icon: 'error',
        title: 'OTP Service',
        text: 'The code is invalid, try again'
      })
}

function sendFunc() {
    let value = phoneInp.value
    if(value !== "" && value.includes("+995")) {
        if(parseInt(value) && value.includes(" ")) {
            optCard.style.display = "block"
            phoneCard.style.display = "none"

            // Split input value
            let numberValue = value.split("")

            numberValue[9] = "*"
            numberValue[10] = "*"
            numberValue[12] = "*"
            numberValue[13] = "*"

            let newValue = numberValue.join("")
            yourNumber.innerText = newValue

            messageAlertFunc()
        }else {
            console.log("Error")
        }
    }
}

function checkFunc() {
    let newArr = []
    inputs.forEach((items, id) => {
        newArr.push(items.value)
        if(items.value !== "") {
            if(newArr[id] == randMess[id]) {
                Swal.fire(
                    'OTP Service',
                    'Your account has been verified',
                    'success'
                  )
                // board.appendChild(messageChecked)
                  
                setTimeout(() => {
                    location.reload()
                }, 2000)
                
            }else {
                errorMessage()
                newArr = []
                items.value = ""
                setTimeout(() => {
                    messageAlertFunc()
                }, 1500)
            }
        }
    })
}

inputs.forEach(input => {
    let lastInputStatus = 0
    input.onkeyup = (e) => {
        const currentElement = e.target
        const nextElement = input.nextElementSibling
        const prevElement = input.previousElementSibling

        if(prevElement && e.keyCode === 8) {
            if(lastInputStatus === 1) {
                prevElement.value = ""
                prevElement.focus()
            }
            button.setAttribute('disabled', true)
            lastInputStatus = 1

        } else {
            const reg = /^[0-9]+$/
            if(!reg.test(currentElement.value)) {
                currentElement.value = currentElement.value.replace(/\D/g, "")
            } else if (currentElement.value) {
                if(nextElement) {
                    nextElement.focus()
                }else {
                    button.removeAttribute('disabled')
                    lastInputStatus = 0
                }
            }
        }
    }
})




phoneInp.addEventListener("keydown", (e) => {
    let value = e.target.value
    if(e.key !== "Backspace") {
        if(value !== "") {
            if(value.length == 4 || value.length == 8 || value.length == 11 || value.length == 14) {
                 e.target.value += " "
                 
            }
            if(value.length == 16) {
                send.removeAttribute("disabled")
            }
        }
    }
})

send.addEventListener("click", sendFunc)
check.addEventListener("click", checkFunc)
