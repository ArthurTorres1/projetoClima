//Variáveis
const apikey = "14e327f0adcfbaf46d8aad744ca3276f";

const cidadeInput = document.querySelector("#cidade-input")
const searchBtn = document.querySelector("#search")
const backspaceBtn = document.querySelector("#backspace")

const cidadeElement = document.querySelector("#cidade")
const tempElement = document.querySelector("#temperatura span")
const descClimaElement = document.querySelector("#descricao")
const iconCondicoesElement = document.querySelector("#clima-icon")
const umidadeElement = document.querySelector("#umidade span")
const ventoElement = document.querySelector("#vento span")

const climaContainer = document.querySelector("#dadosClima")

//Funções
const pegarDadosMeterologicos = async (cidade) => {
    const apiClimaUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apikey}&lang=pt_br`;
    const resposta = await fetch(apiClimaUrl)
    const data = await resposta.json()

    return data
}
const mostrarDadosMeteorologicos = async (cidade) => {
    const data = await pegarDadosMeterologicos(cidade)

    cidadeElement.innerText = data.name
    tempElement.innerText = parseInt(data.main.temp)
    descClimaElement.innerText = data.weather[0].description
    iconCondicoesElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    umidadeElement.innerText = `${data.main.humidity}%`
    ventoElement.innerText = `${data.wind.speed}km/h`

    climaContainer.classList.remove("hide")
}

//Eventos
searchBtn.addEventListener("click", (e) => {
    // e.preventDefault();

    const cidade = cidadeInput.value

    mostrarDadosMeteorologicos(cidade)

})

cidadeInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const cidade = e.target.value

        mostrarDadosMeteorologicos(cidade)
    }
})

backspaceBtn.addEventListener("click", (e) => {
    // e.preventDefault()
    const cidade = cidadeInput.value = ""
    climaContainer.classList.add("hide")

    mostrarDadosMeteorologicos(climaContainer, cidade)
})
