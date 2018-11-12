(function () {
  let data = [
    { position: 1, clubName: 'Lechia Gdańsk', points: 31, wins: 9, draws: 4, loses: 2, },
    { position: 2, clubName: 'Jagiellonia Białystok', points: 28, wins: 8, draws: 4, loses: 3, },
    { position: 3, clubName: 'Legia Warszawa', points: 26, wins: 7, draws: 5, loses: 3, },
    { position: 4, clubName: 'Wisła Kraków', points: 25, wins: 7, draws: 4, loses: 4, },
    { position: 5, clubName: 'Piast Gliwice', points: 25, wins: 7, draws: 4, loses: 4, },
    { position: 6, clubName: 'Korona Kielce', points: 25, wins: 7, draws: 4, loses: 4, },
    { position: 7, clubName: 'Pogoń Szczecin', points: 22, wins: 6, draws: 4, loses: 5, },
    { position: 8, clubName: 'Lech Poznań', points: 21, wins: 6, draws: 3, loses: 6, },
    { position: 9, clubName: 'Arka Gdynia', points: 20, wins: 5, draws: 5, loses: 5, },
    { position: 10, clubName: 'Wisła Płock', points: 18, wins: 4, draws: 6, loses: 5, },
    { position: 11, clubName: 'Zagłębie Lubin', points: 17, wins: 5, draws: 2, loses: 8, },
    { position: 12, clubName: 'Śląsk Wrocław', points: 16, wins: 4, draws: 4, loses: 7, },
    { position: 13, clubName: 'KS Cracovia', points: 14, wins: 3, draws: 5, loses: 7, },
    { position: 14, clubName: 'Górnik Zabrze', points: 13, wins: 2, draws: 7, loses: 6, },
    { position: 15, clubName: 'Miedź Legnica', points: 13, wins: 3, draws: 4, loses: 8, },
    { position: 16, clubName: 'Zagłębie Sosnowiec', points: 11, wins: 2, draws: 5, loses: 8, }
  ]

  function sortData(key = 'position') {
    const sorted_data = Array.from(data).sort((a, b) => {
      a = a[key]
      b = b[key]
      return isNaN(a - b) ? a.localeCompare(b) : a - b
    })
    return sorted_data
  }

  function renderTableRow(item) {
    const table_row = document.createElement('tr')
    for (prop in item) {
      const cell = document.createElement('td')
      cell.innerHTML = item[prop]
      table_row.appendChild(cell)
    }
    return table_row
  }

  function renderTableBody(sorted_data) {
    const tbody = document.createElement('tbody')
    sorted_data.forEach(item => tbody.appendChild(renderTableRow(item)))
    return tbody
  }

  function renderTableHeadOnInit() {
    const thead = document.createElement('thead')
    const thead_row = document.createElement('tr')
    for (prop in data[0]) {
      const thead_cell = document.createElement('th')
      thead_cell.dataset.sortProperty = prop
      switch (prop) {
        case 'position':
          thead_cell.innerHTML = 'Poz.'
          break;
        case 'clubName':
          thead_cell.innerHTML = 'Drużyna'
          break;
        case 'points':
          thead_cell.innerHTML = 'Pkt.'
          break;
        case 'wins':
          thead_cell.innerHTML = 'Z'
          break;
        case 'draws':
          thead_cell.innerHTML = 'R'
          break;
        case 'loses':
          thead_cell.innerHTML = 'P'
          break;
        default:
          break;
      }
      thead_row.appendChild(thead_cell)
    }
    thead.appendChild(thead_row)
    return thead
  }

  function onInit() {
    const wrapper = document.querySelector('.wrapper')
    const table = document.createElement('table')
    const thead = renderTableHeadOnInit()
    const tbody = renderTableBody(data)
    table.appendChild(thead)
    table.appendChild(tbody)
    wrapper.appendChild(table)
  }

  onInit()

  window.addEventListener('click', function () {
    if (event.target.tagName === 'TH') {
      const column_header = event.target
      const table = column_header.offsetParent
      const key = column_header.dataset['sortProperty']
      const sorted_array = sortData(key)
      const previously_sorted = document.getElementsByClassName('sorted')[0]

      table.tBodies[0].outerHTML = ''

      if (previously_sorted
        && (previously_sorted.innerText !== column_header.innerText)) {
        previously_sorted.removeAttribute('data-sorting-order')
        previously_sorted.classList.remove('sorted')
      }

      if (column_header.dataset['sortingOrder']
        && column_header.dataset['sortingOrder'] === 'ascending') {
        const newTBody = renderTableBody(sorted_array.reverse())
        table.appendChild(newTBody)
        column_header.dataset['sortingOrder'] = 'descending'
      } else {
        const newTBody = renderTableBody(sorted_array)
        table.appendChild(newTBody)
        column_header.dataset['sortingOrder'] = 'ascending'
      }
      column_header.classList.add('sorted')
    }
  })
})()