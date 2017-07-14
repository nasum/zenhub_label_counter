$(document).ready(function(){
  let container = $("<div></div>",{
    class: "zenhub_lavel_counter_container",
  })
  let input = $('<input type="text"></input>')
  let button = $("<button></button>", {
    text: "calc label",
    on: {
      click: calcFunc
    }
  })
  let labelList = $('<ul class="label-list"></ul>')

  container.append(input)
  container.append(button)
  container.append(labelList)
  $('body').append(container)
})

function calcFunc () {
  let countMap = new Map()
  let colorMap = new Map()

  searchText = $('.zenhub_lavel_counter_container input').val()

  $target = $('.zhc-pipeline-header__title:contains(' + searchText + ')').closest('.zhc-pipeline')

  $labels = $target.find('.zhc-label')
  $labels.each((index, element) => {
    let key = $(element).text()

    if(countMap.has(key)) {
      let val = countMap.get(key)
      val++
      countMap.set(key, val)
    } else {
      countMap.set(key, 1)
      colorMap.set(key, $(element).css(["color", "background-color"]))
    }
  })

  $labelList = $('.label-list').empty()
  countMap.forEach((val, key) => {
    let $li = $(`<li>${key}:${val}</li>`)
    $li.css(colorMap.get(key))
    $labelList.append($li)
  })
}
