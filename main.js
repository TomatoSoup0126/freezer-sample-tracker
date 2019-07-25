const BASE_URL = 'https://spreadsheets.google.com/feeds/cells/'
const key = '1J19Q-C_KGpNqEqJVYkR0-CH1aOgBZh-LPkQOvSSOYNk/'
const page = '1'
const josnURL = '/public/values?alt=json'

const dataPanel = document.getElementById('data-panel')
const colNumber = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
console.log(colNumber)

const data = []
const itemArray = []
const boxLaction = []
const itemInBox = []

defaultBoxItem()

axios.get(BASE_URL + key + page + josnURL)
  .then((response) => {
    console.log(response)
    data.push(...response.data.feed.entry)
    console.log(data)
    //將name和location分別組成陣列
    data.forEach(item => {
      if (item.gs$cell.col === '1') {
        itemArray.push(item.gs$cell.$t)
      } else if (item.gs$cell.col === '2') {
        boxLaction.push(item.gs$cell.$t)
      }

    })
    console.log(itemArray)
    console.log(boxLaction)
    //將兩個陣列以物件方式結合
    arrangeItem(itemArray, boxLaction)
    putItemInBox(itemInBox)
    //displayBoxItem(data)
  })
  .catch((err) => {
    console.log(err)
  })

//基本盒子元件
function defaultBoxItem() {
  let htmlContent = `
    <button type="button" class="btn btn-light">1</button>
    <button type="button" class="btn btn-light">2</button>
    <button type="button" class="btn btn-light">3</button>
    <button type="button" class="btn btn-light">4</button>
    <button type="button" class="btn btn-light">5</button>
    <button type="button" class="btn btn-light">6</button>
    <button type="button" class="btn btn-light">7</button>
    <button type="button" class="btn btn-light">8</button>
    <button type="button" class="btn btn-light">9</button>
  `
  for (let x = 0; x < colNumber.length; x++) { //col
    for (let y = 1; y < 10; y++) {
      htmlContent += `
      <button type="button" class="btn btn-outline-primary" id="${colNumber[x]}${y}">${colNumber[x]}${y}</button>
    `
    }
  }
  dataPanel.innerHTML = htmlContent
}

//組合兩個陣列為物件
function arrangeItem(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    itemInBox.push({ name: array1[i], location: array2[i] })
  }
  delete itemInBox[0]
  console.log(itemInBox)
}

//將物件依照位置覆寫盒子元件
function putItemInBox(array) {
  array.forEach(item => {
    const boxTarget = document.getElementById(item.location)
    console.log(boxTarget)
    boxTarget.classList.add('active')
    boxTarget.innerText = item.name
  });
}