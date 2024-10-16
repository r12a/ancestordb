function uncheckAll () {
    // removes check marks from all names
    persons = document.querySelectorAll('input[type=checkbox]')
    for (var i=0;i<persons.length;i++) persons[i].checked = false
    }


function clearChecks (node) {
    // removes check marks from names below a family head
    persons = node.querySelectorAll('input[type=checkbox]')
    for (var i=0;i<persons.length;i++) persons[i].checked = false
    }


function checkFromList () {
    // removes all checks, then checks people in a list at the top of the page
    uncheckAll()
    checkedNames = document.getElementById('listOfCheckedNames').value.split('\n')
    const checkedNameSet = new Set(checkedNames)
    
    persons = document.querySelectorAll('input[type=checkbox]')
    for (var i=0;i<persons.length;i++) if (checkedNameSet.has(persons[i].title)) persons[i].checked = true
    }


function listChecked () {
    // creates an array of ids for all checked names
    window.checkedNames = []
    persons = document.querySelectorAll('input[type=checkbox]')
    for (var i=0;i<persons.length;i++) if (persons[i].checked) window.checkedNames.push(persons[i].title)
    window.checkedNames.sort()
    
    document.getElementById('listOfCheckedNames').value = window.checkedNames.join('\n') 
    document.getElementById('listOfCheckedNames').style.display = 'block'
    document.getElementById('listOfCheckedNames').select()
    document.getElementById('checkedTotal').textContent = window.checkedNames.length
    }


function uncheck100 () {
    // highlights and unchecks all people who were born less than 100 years ago, and have not died
    var nodes, input, byear
    uncheckAll()
    
    var nodes = document.querySelectorAll('.n, .spousen, .personRow')
    console.log(nodes)
    for (var i=0;i<nodes.length;i++) {
        input = nodes[i].querySelector('input')
        if (input) {
            found = false
            if (db[input.title]) {
                byear = db[input.title].b
                dyear = db[input.title].d
                //console.log(input.title, byear, dyear)
                if (dyear === '' && parseInt(byear) > 1920) {
                    nodes[i].style.color = 'red'
                    nodes[i].style.border = '1px solid red'
                    input.checked = true
                    }
                else if (parseInt(byear) > 1920) {
                    nodes[i].style.color = 'green'
                    nodes[i].style.border = '1px solid green'
                    }
                }
            
            }
        }
    }


function checkVisibleRows () {
    // check all the visible rows
    visibleRows = document.querySelectorAll('.personRow')
    for (i=0;i<visibleRows.length;i++) {
        if (visibleRows[i].style.display === 'none') visibleRows[i].querySelector('input').checked = false
        else visibleRows[i].querySelector('input').checked = true
        }
    }


function swapChecks () {
    // swaps the checkbox status for all persons
    boxes = document.querySelectorAll('input[type=checkbox]')
    for (i=0;i<boxes.length;i++) {
        if (boxes[i].checked === false) boxes[i].checked = true
        else boxes[i].checked = false
        }
    }
