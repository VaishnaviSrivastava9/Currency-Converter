
const BaseURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies'


const dropdown = document.querySelectorAll('.dropdown select')
const button = document.querySelector('.btn')
const fromCurr = document.querySelector('.from select')
const toCurr = document.querySelector('.to select')
const msg = document.querySelector('.msg')


for(let select of dropdown)
{
    for(let currCode in countryList)
    {
        let newOption = document.createElement('option')
        newOption.innerText = currCode
        newOption.value = currCode
        if(select.name==='from' && currCode==='USD')
        {
            newOption.selected = 'selected'
        }
        else if(select.name==='to' && currCode==='INR')
        {
            newOption.selected = 'selected'
        }
        select.append(newOption)
    }
    select.addEventListener('change',(event)=>
    {
        updateFlag(event.target)
    })
}

const updateFlag = (element)=>
{
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector('img')
    img.src = newSrc
}

button.addEventListener('click',async (event)=>
{
event.preventDefault()
let amount = document.querySelector('.amount')
amountValue = amount.value

const URL = `${BaseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
let response = await fetch(URL)
let data = await response.json()
let rate = data[toCurr.value.toLowerCase()]
let finalAmount = rate * amountValue

msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `
msg.style.backgroundColor = 'lavender'

})
