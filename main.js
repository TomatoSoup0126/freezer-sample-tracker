const BASE_URL = 'https://spreadsheets.google.com/feeds/cells/1J19Q-C_KGpNqEqJVYkR0-CH1aOgBZh-LPkQOvSSOYNk/1/public/values?alt=json'

const dataPanel = document.getElementById('data-panel')

const data = []

axios.get(BASE_URL)
  .then((response) => {
    console.log(response)
    data.push(...response.data.feed.entry)
    console.log(data)
    console.log(data[0].gs$cell.$t)
    displayBoxItem(data)
  })
  .catch((err) => {
    console.log(err)
  })

function displayBoxItem(data) {
  let htmlContent = `
    <button type="button" class="btn btn-light">A</button>
    <button type="button" class="btn btn-light">B</button>
    <button type="button" class="btn btn-light">C</button>
    <button type="button" class="btn btn-light">D</button>
    <button type="button" class="btn btn-light">E</button>
    <button type="button" class="btn btn-light">F</button>
    <button type="button" class="btn btn-light">G</button>
    <button type="button" class="btn btn-light">H</button>
    <button type="button" class="btn btn-light">I</button>
  `

  data.forEach(item => {
    htmlContent += `
      <button type="button" class="btn btn-outline-primary">${item.gs$cell.$t}</button>
    `
  })
  dataPanel.innerHTML = htmlContent

}