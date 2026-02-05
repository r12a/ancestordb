var here = 'HERE!'
var enter = '\u23F5\u23F5\u23F5'
var exit = '\u23F4\u23F4\u23F4'

var data = {}
var events = {}
var debug = true
var trace = false
var traceutils = false
var narrative = ''
var counter
var thisPage = {} // contains useful data relating to the person this page is associated with
// in the main function, event collects information about relatives of this person, or events

var showHelpPopups = false





function init () {
	// make a list of related people who have json data
	// console.log(enter,'init()')
    
	//var relatives = findRelatives(thisPerson)
	//relatives.push(thisPerson)
	if (debug) console.log('Init: thisPerson is ',thisPerson)
	//if (debug) console.log('Init: relatives is ',relatives)
	
	// read in the json data for relatives
	//for (var r=0;r<relatives.length;r++) getRelatives(relatives[r])
    
    // add the timeline sequence to a hidden div
    document.getElementById('in').textContent = db[thisPerson].timeline
    
    setUpPage(thisPerson)
    
    assignHelpText()
    
    makeEventsSummary()

    // event handler for help popup toggle
    document.getElementById('helpToggleIcon').addEventListener('click', toggleHelpPopups)
    // console.log(exit, 'init')
    
    
    // show the event summary if there's no narrative
    //ehNode = document.querySelector('#esummary_button input')
    
    //if (narrative === '' || typeof narrative === 'undefined' || narrative === false || narrative.length < 500) 
    //    document.getElementById('life_summary').innerHTML += `<p>&nbsp;</p> ${ makeEventTable(window.eventSummaryList) }`
    if (narrative.length < 500) document.getElementById('life_summary').innerHTML = makeEventTable(window.eventSummaryList)
    }




function assignHelpText () {
    // Clear existing popups by hiding the popup element
    var popup = document.getElementById('helpPopup')
    if (popup) popup.style.display = 'none'

    // If help popups are disabled, do not attach any listeners
    if (!showHelpPopups) return

    // Otherwise attach help text
    if (document.getElementById('helpToggleIcon')) attachHelpPopup( document.getElementById('helpToggleIcon'),
    "After clicking on this icon, mousing over various parts of the page will produce popup text that explains how that feature work. To turn that off again, click this icon once more." )
    
    //if (document.getElementById('summaryToggle')) attachHelpPopup( document.getElementById('summaryToggle'),
    //"Click to switch between the narrative life summary and the location-based breadcrumb table. The table shows events in chronological order where a location can be attached. The location may be explicit, or may be assumed (such as when another child is born in the same family home). Life events that don't provide evidence of location (such as a grandfather dying in thier own home) are not shown.  For the full list of events, see lower down this page." )
    
    if (document.getElementById('summaryToggle')) attachHelpPopup( document.getElementById('summaryToggle'),
    `NARRATIVE: Display a narrative life summary for the person, if one exists. If not, this shows a brief set of facts for that person.<br><br>
    EVENTS: Display a list of all the events described on this page. To jump to the detailed information for that event, click on the age of the person (far left of the table). Clicking on highlighted names takes you to the page for that person.<br><br>
    BREADCRUMBS: Display location-based breadcrumbs for this person. The table shows events in chronological order where a location is known. Some locations may be assumed (such as when another child is born in the same family home). Life events that don't provide evidence of location (such as a grandfather dying in thier own home) are not shown. This list can help to identify locations of events that don't have explicit or detailed information (such as when a child is born and only the registration district is mentioned, but children born before and after live at the same, specific address.)` )
        

    
    if (document.getElementById('location_summary')) attachHelpPopup( document.getElementById('location_summary'),
    "Click to show places this person lived, on a map." )
    
    attachHelpPopup( document.getElementById('sideIcon_index'),
    "Go to the index for this project." )
    
    attachHelpPopup( document.getElementById('gotoTree'),
    "Show two generations of ancestors for this person, and this person's wife/wives and children." )
    
    attachHelpPopup( document.getElementById('sideIcon_ancestors'),
    "Show all known ancestors for this person." )
    
    attachHelpPopup( document.getElementById('sideIcon_descendants'),
    "Show all known descendants of this person." )
    
    if (document.getElementById('sideIcon_ancestry')) attachHelpPopup( document.getElementById('sideIcon_ancestry'),
    "Find this person in an Ancestry.com family tree." )
    
    attachHelpPopup( document.getElementById('sideIcon_family'),
    "Show ancestors of this person laid out like a family tree." )
    
    attachHelpPopup( document.getElementById('sideIcon_search'),
    "Search for places, occupations, or events." )
    
    attachHelpPopup( document.getElementById('sideIcon_copy'),
    "Copy the id of this person to the clipboard." )
    
    attachHelpPopup( document.getElementById('sideIcon_edit'),
    "Open a Person Record entry form." )
    
    attachHelpPopup( document.getElementById('tagIndicator'),
    "Click to toggle whether this person is tagged. You can tag people for any reason. Tags will be remembered across sessions, but only for this browser on this machine. If you want to use the tags while viewing these pages on another browser, go to the index page and select List All Tagged People from the pulldown. Then copy the list produced to the index in the other browser and select Set Tags for These People from the pulldown." )
    
    attachHelpPopup( document.getElementById('mapLinkTH'),
    "Links to Google Maps. Each link has a label to indicate the level of precision for the pin. An \u{1F4CC}exact label indicates that the pin points directly to the building or location referred to. The \u{1F4CC}approx label is used when a building or location no longer exists, but research indicates that this was close to the original location.  Other labels, such as \u{1F4CC}settlement, \u{1F4CC}village, \u{1F4CC}town, \u{1F4CC}district, etc. indicate that the precise location is unknown, but the general area is indicated at the level described by the label. Note that \u{1F4CC}\u00A0reg.\u00A0district labels are very imprecise, since registration districts can cover large areas, including typically several towns." )
    
    attachHelpPopup( document.getElementById('eventTH'),
    "The only events listed are those that explicitly indicate a location where this person was, or where the person is expected to be living (eg. when a sibling is born in the family home). For example, the death of a sibling or grandparent in a different location are not listed. For the full list of events associated with this person see the timeline lower down the page." )
    
    }



function removeUppercaseRuns(str) {
    // used to remove county or state abbreviations, esp in sidebar locations list
    return str.replace(/\s?(?:[A-Z]{3,}|[A-Z]{2})\b/g, '');
    }



function toggleHelpPopups() {
    showHelpPopups = !showHelpPopups

    const icon = document.getElementById('helpToggleIcon')
    if (!icon) return

    icon.src = showHelpPopups ? "lib/i/startHelp.png" : "lib/i/stopHelp.png"

    // Reassign help text so attachHelpPopup only binds when enabled
    assignHelpText()
    }



function replaceNames (note, event) {
	var out = note
	var namelist = note.match(/\{[^\}]+\}/g)
	if (namelist) {
		for (var i=0;i<namelist.length;i++) {
			namelist[i] = namelist[i].replace(/\{|\}/g,'')
			var name = namelist[i].split(':')
			out = out.replace('{'+namelist[i]+'}', getName('',name[0],name[1],true, event))
			}
		return out
		}
	return note
	}



function toggleMinimal (node) {
	var i
	//var ps = document.querySelectorAll('.record p, pre, details, .figure')
	var ps = document.querySelectorAll('.record p, .figure')
	if (node.textContent === 'Minimise') {
		for (i=0;i<ps.length;i++) if (ps[i].className !== 'recordTitle' && ps[i].parentNode.id !== 'summary') ps[i].style.display = 'none'
		node.textContent = 'Normal'
		localStorage.ancestryMinimise = 'yes'
		} 
	else {
		for (i=0;i<ps.length;i++) ps[i].style.display = 'block'
		node.textContent = 'Minimise'
		localStorage.ancestryMinimise = 'no'
		}
	}



function upperCaseFirst (str) { 
	if (str !== '') return str[0].toUpperCase()+str.substr(1)
	else return ''
	}



function copyThis (personID) {
    navigator.clipboard.writeText(personID)
    document.getElementById('copyNotice').style.display = 'block'
    setTimeout(() => { document.getElementById('copyNotice').style.display = 'none' }, '500')
    }


 




function summarise (node, thisPerson) {

    const win = document.getElementById('summaryWin')
    const backdrop = document.getElementById('summaryBackdrop')

    // Toggle modal visibility
    const isOpen = win.style.display === 'block'
    if (isOpen) {
        win.style.display = 'none'
        backdrop.style.display = 'none'
        return
        }
    else {
        win.style.display = 'block'
        backdrop.style.display = 'block'
        }

    let out = ''
    let occ, places, placeSet = new Set(), occSet = new Set()

    // -----------------------------
    // GET THE DATA
    // -----------------------------
    var records = document.querySelectorAll('.dateAndRecord')
    for (var i = 0; i < records.length; i++) {
        if (records[i].querySelector('.selfRelation') && records[i].querySelector('.keypoints')) {
            occ = records[i].querySelector('.occ')
            if (occ) occSet.add(upperCaseFirst(occ.textContent))

            places = records[i].querySelectorAll('.place')
            for (p = 0; p < places.length; p++)
                placeSet.add(places[p].textContent.replace(/res: /, ''))
            }
        else {
            occ = records[i].querySelector('.occ')
            if (occ) occSet.add(upperCaseFirst(occ.textContent))

            places = records[i].querySelectorAll('.place')
            for (p = 0; p < places.length; p++) {
                if (places[p].dataset.athome &&
                    places[p].dataset.athome.includes(thisPerson))
                    placeSet.add(places[p].textContent.replace(/res: /, ''))
                }
            }
        }

    // -----------------------------
    // BUILD THE SUMMARY HTML 
    // -----------------------------
    out += '<h4>BMD</h4><ul>'
    if (db[thisPerson].b) {
        out += `<li style="font-size: 1.4em;">${db[thisPerson].b}`
        if (db[thisPerson].bplace) out += ` ${db[thisPerson].bplace}`
        }
    out += ' \u2014 '
    if (db[thisPerson].d) {
        out += `${db[thisPerson].d}`
        if (db[thisPerson].dplace) out += ` ${db[thisPerson].dplace}`
        out += `</li>`
        }

    if (db[thisPerson].fg) {
        for (i = 0; i < db[thisPerson].fg.length; i++) {
            out += `<li>${db[thisPerson].fg[i][0]} ${getName('', db[thisPerson].fg[i][1], 'kf', true, false)}</li>`
            out += `<ol>`;
            for (j = 2; j < db[thisPerson].fg[i].length; j++)
                out += `<li>${getName('', db[thisPerson].fg[i][j], 'k', true, false)}</li>`
            out += `</ol>`;
            }
        }

    out += '</ul>'
    
    
    
    // Copy events summary
    out += '<p>Summary event list: '

    out += `<button id="copyEventList" onclick="">Copy to clipboard</button>`
    out += '</p>'

    
    


    // Places
    out += '<h4>Places</h4><ul>'
    var placeArray = [...placeSet]
    for (var i = 0; i < placeArray.length; i++)
        if (placeArray[i] !== '')
            out += `<li><a href="search.html?project=${project}&place=${placeArray[i].trim()}" target="_blank">${placeArray[i].trim()}</a>`
    out += '</ul>'

    // GPS links
    out += '<p>Detailed .csv data: '
    
    
    
    gps = document.querySelectorAll('.gpslink')
    gpsSet = new Set([])
    for (g = 0; g < gps.length; g++) {
        if (gps[g].closest('.dateAndRecord').style.display !== 'none')
            coord = `${gps[g].textContent.trim()}�${gps[g].href}`
        if (typeof coord !== 'undefined') gpsSet.add(coord)
        }
    gpsArray = [...gpsSet]

    let gpsLinks = '<p>\n';
    for (g = 0; g < gpsArray.length; g++) {
        temp = gpsArray[g].split('�')
        gpsLinks += `<a target="_blank" href="${temp[1]}">${temp[0]}</a>`
        if (g < gpsArray.length - 1) gpsLinks += ' �\n'
    }
    gpsLinks += '\n</p>'


    // Detailed CSV
    entries = document.querySelectorAll('.dateAndRecord')
    let csvText = 'Age,Name,Latitude,Longitude,Precision\n'
    for (g = 1; g < entries.length; g++) {
        let age = entries[g].querySelector('.recordTitleAge') ? entries[g].querySelector('.recordTitleAge').textContent.trim() : '—'
        year = entries[g].querySelector('.theYear') ? entries[g].querySelector('.theYear').textContent.trim() : ''
        locn = entries[g].querySelector('.place') ? entries[g].querySelector('.place').textContent.trim() : ''
        title = entries[g].querySelector('.recordTitle') ? entries[g].querySelector('.recordTitle').textContent.trim() : ''
        occupation = entries[g].querySelector('.occ') && entries[g].querySelector('.occ').textContent !== '' ?
            ' \u2022 ' + entries[g].querySelector('.occ').textContent.trim() : ''

        
       // create a line for each gps link, including the above information and the GPS-specific info
        coords = '\u2014'
        precision = 'undefined'
        
        const gpsLinkData = entries[g].querySelectorAll('a.gpslink')

        if (gpsLinkData.length > 0) {
            var lines = ''
            for (l=0;l<gpsLinkData.length;l++) {
                // Extract coords from href
                const href = gpsLinkData[l].getAttribute('href')
                const qIndex = href.indexOf('q=')

                if (qIndex !== -1) {
                    coords = href.slice(qIndex + 2).split('&')[0]
                    }

                // Extract precision from title
                const anchortitle = gpsLinkData[l].querySelector('img').getAttribute('title')
                const colonIndex = anchortitle.indexOf('\u00A7')

                if (colonIndex !== -1) {
                    precision = anchortitle.slice(colonIndex + 1).trim()
                    }

                locn = gpsLinkData[l].textContent

                csvText += `${ age },"${ year } ${ locn }: ${ title }${ occupation }",${ coords },\u{1F4CC} ${ precision }\n`
                }
            }
        else csvText += `${ age },"${ year } ${ locn }: ${ title }${ occupation }",\u2014,\u{1F4CC} undefined\n`
        }

    out += `<button id="copyCsvBtn">Copy to clipboard</button>`
    out += '</p>'

    // Occupations
    out += '<h4>Occupations</h4><ul>'
    var occArray = [...occSet]
    for (var i = 0; i < occArray.length; i++)
        if (occArray[i] !== '' && occArray[i] !== 'Child')
            out += `<li><a href="search.html?project=${project}&occupation=${occArray[i].trim()}" target="_blank">${occArray[i].trim()}</a>`
    out += '</ul>'

    // Witnesses, mentions, etc.
    out += showWitnesses(thisPerson)
    out += showAppearsIn(thisPerson)
    out += showInformants(thisPerson)
    out += showProbates(thisPerson)
    out += showCensusEntries(thisPerson)

    out += '<div class="summaryClose" onclick="document.getElementById(\'summaryWin\').style.display=\'none\';document.getElementById(\'summaryBackdrop\').style.display=\'none\'">X</div>'

    win.innerHTML = out

    document.getElementById("copyCsvBtn").addEventListener("click", () => {
        navigator.clipboard.writeText(csvText)
        const notice = document.getElementById("copyNotice")
        notice.style.display = "block"
        setTimeout(() => { notice.style.display = "none" }, 500)
        })
    
    document.getElementById("copyEventList").addEventListener("click", () => {
        navigator.clipboard.writeText(eventSummaryList)
        const notice = document.getElementById("copyNotice")
        notice.style.display = "block"
        setTimeout(() => { notice.style.display = "none" }, 500)
        })
    
    document.getElementById('summaryBackdrop').addEventListener('click', () => {
    document.getElementById('summaryWin').style.display = 'none'
    document.getElementById('summaryBackdrop').style.display = 'none'
    })

    }




    

function hideNotes () {
	var ps = document.querySelectorAll('.record p, .figure')
	for (var i=0;i<ps.length;i++) {
		if (ps[i].className !== 'recordTitle' && ps[i].parentNode.id !== 'summary') ps[i].style.display = 'none'
		}
	}



function unHideNotes () {
	var ps = document.querySelectorAll('.record p, pre, details')
	for (var i=0;i<ps.length;i++) {
		ps[i].style.display = 'block'
		}
	}



function addFIcon (text, type) {
    //console.log('addFIcon', text, type)
	var parts, out
	if (text) {
		if (type === 'gps') {
            const urlStart = text.indexOf("http")
            if (urlStart === -1) return null // no URL found
            let label = text.slice(0, urlStart).trim()
            const urlAndFlag = text.slice(urlStart)
            let [url, flag] = urlAndFlag.split("\u00A7")
            if (label.includes('(outline)')) {
                flag = 'outline'
                label = label.replace('(outline)','')
                }
            if (typeof flag === 'undefined') flag = '\u2014'
			out = `<p class="floatedIconText"><a target="_blank" class="gpslink" href="${ url }"><img src="lib/i/map.png" alt="" title="${ label }\u00A7${ flag }"> ${ label }</a> <i>${ flag }</i></p>`
			return out.trim()
			}
		if (type === 'record') {
			if (text.match(/url:/)) {
                parts = text.split('url:')
                out = `<p class="floatedIconText"><a target="_blank" href="${ window.project }/${ parts[1] }"><img src="lib/i/record.png" alt="${ parts[0] }" title="${ parts[0] }"> ${ parts[0] }</a></p>`
                return out
                }
            else {
                parts = text.split('https:')
                out = `<p class="floatedIconText"><a target="_blank" href="https:${ parts[1] }"><img src="lib/i/record.png" alt="${ parts[0] }" title="${ parts[0] }"> ${ parts[0] }</a></p>`
                return out
                }
			}
		if (type === 'link') {
			if (text.match(/url:/)) {
				parts = text.split('url:')
				out = '<p class="floatedIconText"><a target="_blank" href="'+window.project+'/'+parts[1]+'"><img src="lib/i/info.png" alt="'+parts[0]+'" title="'+parts[0]+'"> '+parts[0]+'</a></p>'
				}
			else if (text.match(/https:/)) { 
				parts = text.split('https:')
				out = '<p class="floatedIconText"><a target="_blank" href="https:'+parts[1]+'"><img src="lib/i/info.png" alt="'+parts[0]+'" title="'+parts[0]+'"> '+parts[0]+'</a></p>'
				}
			else { 
				parts = text.split('http:')
				out = '<p class="floatedIconText"><a target="_blank" href="http:'+parts[1]+'"><img src="lib/i/info.png" alt="'+parts[0]+'" title="'+parts[0]+'"> '+parts[0]+'</a></p>'
				}
			return out
			}
		}
	}



function getDatePhrase (date, year, options) {
    if (trace) console.log('getDatePhrase(', date, year, options,')')
    if (trace) console.log('getDatePhrase(', date, year, options,')')
    // return a date with suitable preposition before, and taking into account ~,<,>, etc
    // options are for Date object
    var prefix = ''
    
	if (!date) date = ''
    date = date.replace('*','')
    year = year.replace('*','')
    
    // get prefix & store for later
    if (year.match(/abt|~/)) {
        prefix = 'around '
        year = year.replace(/abt|~/,'')
        }
    else if (year.match(/bef|\</)) {
        prefix = 'before '
        year = year.replace(/bef|\</,'')
        }
    else if (year.match(/aft|\>/)) {
        prefix = 'after '
        year = year.replace(/aft|\>/,'')
        }
    else prefix = ' in '
    
	if (date.match(/by/)) return date+' '+year
	if (date.match(/onob|ca/)) {
		if (date.match(/\d/)) return date.replace(/onob|ca/,'on or before')+' '+year
		else return date.replace(/onob|ca/,'in or before')+' '+year
		}
	if (date.match(/abt|~/)) return date.replace(/abt|~/,'around ')+' '+year
	if (date.match(/bef|</)) return date.replace(/bef|</,'before')+' '+year
	if (date.match(/aft|>/)) return date.replace(/aft|>/,'after')+' '+year

	if (date && year) {
		if (date.match(/\d/)) {
            // bring the options into play only if there's a clear date
            if (options) {
                var ts = new Date(date+' '+year)
                return ' on '+new Intl.DateTimeFormat('en-GB', options).format(ts)
                }
            else return ' on '+date+' '+year
            }
		else return ' in '+date+' '+year
		}
	else if (year) {
		return prefix+year
		}
	}



function getTimestamp (date, year) {
    //console.log('>>> getTimestamp(', date, year,')')

    if (year.trim() === '?' || year.trim() === '') return ''
	
	if (date === '?' || date === '') date = '1 Jul'
    
    switch (date) {
        case 'jan': date = '15 Jan'; break
        case 'feb': date = '15 Feb'; break
        case 'mar': date = '15 Mar'; break
        case 'apr': date = '15 Apr'; break
        case 'jun': date = '15 Jun'; break
        case 'jul': date = '15 Jul'; break
        case 'aug': date = '15 Aug'; break
        case 'sep': date = '15 Sep'; break
        case 'oct': date = '15 Oct'; break
        case 'nov': date = '15 Nov'; break
        case 'dec': date = '15 Dec'; break
        case 'Jan-Mar': date = '1 Feb'; break
        case 'Apr-Jun': date = '1 May'; break
        case 'Jul-Sep': date = '1 Aug'; break
        case 'Oct-Dec': date = '1 Nov'; break
        }

	if (! date.match(/[0-9]/)) date = '1 '+date
	
	date = date.replace(/by|bef|aft|abt|onob|~|\*|\<|\>|,/, '')
	year = year.replace(/by|bef|aft|abt|onob|~|\*|\<|\>|,/, '')
	
	date = date.replace(/\-.../, '')
    
    var dateObj = new Date(date.trim() +' '+ year.trim())

    if (traceutils) console.log(exit+'getTimestamp:', dateObj.getFullYear()+'-'+eval(dateObj.getMonth()+1).toString().padStart(2, '0')+'-'+dateObj.getDate().toString().padStart(2, '0'))
	return dateObj.getFullYear()+'-'+eval(dateObj.getMonth()+1).toString().padStart(2, '0')+'-'+dateObj.getDate().toString().padStart(2, '0')
	}



function getBirthTS (bDate, bYear) {  //    DON'T USE THIS - USE GETTIMESTAMP INSTEAD
    if (traceutils) console.log(enter, 'getBirthTS(', bDate, bYear,')')

    if (bYear.trim() === '?' || bYear.trim() === '') return ''
	
	if (bDate === '?' || bDate === '') bDate = '1 Jul'
    
    switch (bDate) {
        case 'Jan-Mar': bDate = '1 Feb'; break
        case 'Apr-Jun': bDate = '1 May'; break
        case 'Jul-Sep': bDate = '1 Aug'; break
        case 'Oct-Dec': bDate = '1 Nov'; break
        }

	if (! bDate.match(/[0-9]/)) bDate = '1 '+bDate
	
	bDate = bDate.replace(/by|bef|aft|abt|onob|~|\*|\<|\>|,/, '')
	bYear = bYear.replace(/by|bef|aft|abt|onob|~|\*|\<|\>|,/, '')
	
	bDate = bDate.replace(/\-.../, '')
    
    birthDate = new Date(bDate.trim() +' '+ bYear.trim())

    if (traceutils) console.log(exit, 'getBirthTS returns:', birthDate.getFullYear()+'-'+eval(birthDate.getMonth()+1)+'-'+birthDate.getDate())
	return birthDate.getFullYear()+'-'+eval(birthDate.getMonth()+1)+'-'+birthDate.getDate()
	}



function getAge (phrase1, eDate, eYear, bDate, bYear, phrase2) {
    if (traceutils) console.log(enter, 'getAge(',phrase1, eDate, eYear, bDate, bYear, phrase2,')')

    if (eYear.trim() === '' || bYear.trim() === '?' || bYear.trim() === '') return ''
	
	if (bDate === '?' || bDate === '') bDate = '1 Jul'
	if (eDate === '?' || eDate === '') eDate = '1 Jul'

	if (! eDate.match(/[0-9]/)) eDate = '1 '+eDate
	if (! bDate.match(/[0-9]/)) bDate = '1 '+bDate
	
	eDate = eDate.replace(/by|bef|aft|abt|onob|~|\*|\<|\>|,/, '')
	bDate = bDate.replace(/by|bef|aft|abt|onob|~|\*|\<|\>|,/, '')
	eYear = eYear.replace(/by|bef|aft|abt|onob|~|\*|\<|\>|,/, '')
	bYear = bYear.replace(/by|bef|aft|abt|onob|~|\*|\<|\>|,/, '')
	
	eDate = eDate.replace(/\-.../, '')
	bDate = bDate.replace(/\-.../, '')
	
	var age = parseInt(eYear) - parseInt(bYear)
	if (age < 0) return phrase1+age+phrase2
	var eTime = new Date( eDate + ' 2000' )
	var bTime = new Date( bDate + ' 2000' )
	if (eTime < bTime) age--
	if (age < 0) age = 0
	
    if (traceutils) console.log(exit, 'getAge returns:',phrase1+age+phrase2)
	return phrase1+age+phrase2
	}



function getAgeTS (phrase1, event, birth, phrase2) {
    // get someone's age by comparing timestamps, with optional text around
    if (traceutils) console.log(enter, 'getAgeTS(',phrase1, event, birth, phrase2,')')

    if (typeof event === 'undefined' || typeof birth === 'undefined') {
        alert('Event or birth undefined in getAgeTS')
        return phrase1+'???'+phrase2
        }
    if (event.trim() === '' || birth.trim() === '?' || birth.trim() === '') return ''

    var eTime = new Date( event )
	var bTime = new Date( birth )
    
    // check whether the person is deceased, in which case we'll return 'dec'
    //if ()
    
    // get a rough estimate from the year comparison
    age = eTime.getFullYear() - bTime.getFullYear()
	if (age < 0) return phrase1+age+phrase2
    
    // refine it to see whether a birthday was passed
	var eDate = new Date( '2000-' + eval(eTime.getMonth()+1) + '-' + eTime.getDate() )
	var bDate = new Date( '2000-' + eval(bTime.getMonth()+1) + '-' + bTime.getDate() )
    if (eDate < bDate) age--
	if (age < 0) age = 0
	
    if (traceutils) console.log(exit, 'getAgeTS returns:',phrase1+age+phrase2)
	return phrase1+age+phrase2
	}







function getName (phrase, id, part, uselink, addage) {
    if (traceutils) console.log('getName(',phrase, id, part, uselink, addage)
	// part identifies the format of the name: g, given; k, knownas; f,family, mX,married where X indicates which married name
    // a 0 in the part variable suppresses the addition of the person's age � this tends to be used when you want something like "Mary's sister"
    // addage is a time stamp for the event
	if (! db[id]) return id

    // check for age cancellation flag
    if (part && part.match('0')) {
        addage = false
        part = part.replace(/0/,'')
        }
    
	if (part && part.match('x')) { part=part.replace('x',''); uselink = false }  // shortcut for in page names
	var person = db[id]
	if (part === 'given') part = 'g'; if (part === 'both') part = 'gf'; // legacy code
	var startTag, endTag, givenname, g, k, f, m
	g = k = f = m = ''
	startTag = endTag = ''
    //if (part.match('a')) addage = true 
    //else addage = false
	if (uselink && person) { 
		//if (person.p) startTag = '<a href="person.html?+'&project='+project+'"'
		if (person.p) startTag = `<a href="person.html?project=${ project }&person=${ id }"`
		//else startTag = '<a href="tree.html?person='+id+'&project='+project+'" class="treeLink" '
		else startTag = `<a href="tree.html?project=${ project }&person=${ id }" class="treeLink" `
		startTag += '>'; endTag = '</a>' 
		}
    // add age automatically
    if (addage) endTag += '<sup class="ageTag">'+getAgeTS('', addage, getTimestamp(db[id].bdate, db[id].b), '')+'</sup>'
    
	if (person.k) k = person.k
	else k = person.g
	g = person.g
	f = person.f
	m = person.m

	if (part === 'g') return startTag+g+endTag
	if (part === 'gf') return startTag+g+' '+f+endTag
	if (part === 'k') return startTag+k+endTag
	if (part === 'kf') return startTag+k+' '+f+endTag
	if (part === 'kg') {
		if (g === k) return startTag+g+endTag
		else return startTag+k+' ('+g+') '+endTag
		}
	if (part === 'gkf') {
		if (g === k) return startTag+g+' '+f+endTag
		else return startTag+g+' ('+k+') '+f+endTag
		}
    var allSurnames = ''
	if (part === 'gfm' || part === 'kfm') {
        if (person.f) allSurnames = person.f
        else allSurnames = '(?)'
		if (person.m) {
			for (var i=0;i<person.m.length;i++) allSurnames += '&#x23F5;&#x2009;'+person.m[i]
			}
        if (part === 'gfm') return startTag+g+' '+allSurnames+endTag
        if (part === 'kfm') return startTag+k+' '+allSurnames+endTag
		}
	if (part === 'gf+' || part === 'kf+') {
		if (person.m && person.m.length > 0) {
            allSurnames = person.m[0]
			}
        else allSurnames = ''
        if (part === 'gf+') return startTag+g+' '+allSurnames+endTag
        if (part === 'kf+') return startTag+k+' '+allSurnames+endTag
		}
	if (part === 'gf++') {
		if (person.m && person.m.length > 1) {
            allSurnames = person.m[1]
			}
        else allSurnames = ''
        if (part === 'gf++') return startTag+g+' '+allSurnames+endTag
        if (part === 'kf++') return startTag+k+' '+allSurnames+endTag
		}
	if (part === 'gf+++') {
		if (person.m && person.m.length > 2) {
            allSurnames = person.m[2]
			}
        else allSurnames = ''
        if (part === 'gf+++') return startTag+g+' '+allSurnames+endTag
        if (part === 'kf+++') return startTag+k+' '+allSurnames+endTag
		}
	else return ' '+id+' '
	}





function getParents (phrase, info) {
	var out = ''
	if (info.fid || info.mid) out += phrase
	if (info.mid) out += getName('',info.mid,'k',true)
	if (info.fid && info.mid) out += ' &amp; '
	if (info.fid) out += getName('',info.fid,'gkf',true)
	return out
	}


function getDBParents (phrase, person) { 
	var out = ''
	if (db[person].father || db[person].mother) out += phrase
	if (db[person].mother && db[db[person].mother]) out += getName('',db[person].mother,'k',true)
	else if (db[person].mother) out += db[person].mother
	if (db[person].father || db[person].mother) out += ' &amp; '
	if (db[person].father && db[db[person].father]) out += getName('',db[person].father,'gkf',true)
	else if (db[person].father) out += db[person].father
	return out
	}


function toggleDetails (node) {
	var i
	var details = document.querySelectorAll('details')
	if (node.textContent === 'Show sources') {
		for (i=0;i<details.length;i++) details[i].open = 'open'
		node.textContent = 'Hide sources'
		localStorage.ancestryExpandDetail = 'yes'
		}
	else {
		for (i=0;i<details.length;i++) details[i].open = ''
		node.textContent = 'Show sources'
		localStorage.ancestryExpandDetail = 'no'
		}
	}


function toggleRelatives (node) {
	var i
	var details = document.querySelectorAll('.otherRelative')
	if (node.textContent === 'Hide relatives') {
		for (i=0;i<details.length;i++) details[i].parentNode.style.display = 'none'
		node.textContent = 'Show relatives'
		localStorage.ancestryHideRelatives = 'yes'
		}
	else {
		for (i=0;i<details.length;i++) details[i].parentNode.style.display = 'flex'
		node.textContent = 'Hide relatives'
		localStorage.ancestryHideRelatives = 'no'
		}
	}


function terse () {
    // function to be called from the inspector to show only records relating to self
    var rels, self
    
    rels = document.querySelectorAll('.closeRelation')
    for (i=0;i<rels.length;i++) rels[i].parentNode.style.display = 'none'
    
    self =document.querySelectorAll('.selfRelation')
    
    for (i=0;i<self.length;i++) {
        if (self[i].parentNode.classList.contains('census')) self[i].parentNode.style.display = 'flex'
        }
    
    for (i=0;i<self.length;i++) {
        if (self[i].parentNode.classList.contains('note')) self[i].parentNode.style.display = 'flex'
        }
    
    for (i=0;i<self.length;i++) {
        if (self[i].parentNode.classList.contains('born')) self[i].parentNode.style.display = 'flex'
        }
    
    for (i=0;i<self.length;i++) {
        if (self[i].parentNode.classList.contains('dies')) self[i].parentNode.style.display = 'flex'
        }
    
    for (i=0;i<self.length;i++) {
        if (self[i].parentNode.classList.contains('marries')) self[i].parentNode.style.display = 'flex'
        }
    }




function toggleEvents (node) {
	var i
	var details = document.querySelectorAll('.event')
	if (node.textContent === 'Hide events') {
		for (i=0;i<details.length;i++) details[i].parentNode.style.display = 'none'
		node.textContent = 'Show events'
		localStorage.ancestryHideHistory = 'yes'
		}
	else {
		for (i=0;i<details.length;i++) details[i].parentNode.style.display = 'flex'
		node.textContent = 'Hide events'
		localStorage.ancestryHideHistory = 'no'
		}
	}



function toggleHistory (node, dob) {
	//console.log(node, dob, years.length,'years')
	var records, years, theYear, nextYear, i
	
	if (node.textContent === 'Hide history') {
		years = document.querySelectorAll('.history')
		for (i=0;i<years.length;i++) years[i].outerHTML = ''
		node.textContent = 'Show history'
		localStorage.ancestryHideHistory = 'yes'
		}
	else {
		var ptr = dob
		years = document.querySelectorAll('.dateAndRecord')
		for (i=1;i<years.length;i++) {
			//console.log(ptr, years[i].querySelector('.theYear'))
			if (years[i].querySelector('.theYear') === null) continue
			theYear = parseInt(years[i].querySelector('.theYear').textContent.replace('~',''))
			if (years[i+1] && years[i+1].querySelector('.theYear') !== null) nextYear = parseInt(years[i+1].querySelector('.theYear').textContent.replace('~',''))
			else  nextYear = theYear
			if (nextYear === theYear) continue
			//console.log('year',theYear,'ptr',ptr)
			while (ptr !== theYear && ptr < theYear) {
				//console.log('in ptr sub: year',theYear,'ptr',ptr)
				var age = ptr-parseInt(dob)
				if (h[ptr]) {
					insertedNode = years[i].parentNode.insertBefore(document.createElement('div'), years[i])
					insertedNode.outerHTML = '<div class="dateAndRecord history"><div><div class="recordDate"><span class="theYear">'+ptr+'</span></div></div><div class="record  event"><div class="titleEtc"><p class="recordTitleAge">'+age+'</p><p class="recordTitle"></p></div><div class="descriptionText"><p>'+h[ptr]+'</p></div><pre>&nbsp;</pre></div><div class="keypoints kpevent"><div></div></div></div>'
					}
				ptr++
				}
			var age = theYear-parseInt(dob)
			if (h[theYear]) years[i].outerHTML += '<div class="dateAndRecord history"><div><div class="recordDate"><span class="theYear">'+theYear+'</span></div></div><div class="record  event"><div class="titleEtc"><p class="recordTitleAge">'+age+'</p><p class="recordTitle"></p></div><div class="descriptionText"><p>'+h[theYear]+'</p></div><pre>&nbsp;</pre></div><div class="keypoints kpevent"><div></div></div></div>'
			ptr = theYear+1
			}
		node.textContent = 'Hide history'
		localStorage.ancestryHideHistory = 'no'
		}
	}



function formatSource (sources, discussion) {
    // wrap source lines in link markup
    if (traceutils) console.log(enter, 'formatSource(',sources,')')

    if (typeof sources === 'undefined') return ''
    
    var lines = sources.split('\n')
    for (var i=0;i<lines.length;i++) {
        if (lines[i].match('SOURCE') && lines[i].match('http')) {
            lines[i] = lines[i].replace('<br>','')
            parts = lines[i].split('http')
            parts[0] = parts[0].replace(/SOURCE: /,'')
            lines[i] = `<img src="lib/i/source.png" alt="Source link" title="Source link"><a target="_blank" href="http${ parts[1] }">${ parts[0] }</a>`
            }
        else if (lines[i].match('SOURCE') && lines[i].match('url:')) {
            parts = lines[i].split('url:')
            parts[0] = parts[0].replace(/SOURCE: /,'')
            lines[i] = `<img src="lib/i/source.png" alt="Source link" title="Source link"><a target="_blank" href="${ window.project }/${ parts[1] }">${ parts[0] }</a>`
            }
        else if (lines[i].match('SOURCE')) {
            lines[i] = lines[i].replace('<br>','')
            lines[i] = '<img src="lib/i/source.png" alt="Source link" title="Source link">'+lines[i].replace(/SOURCE: /,'')
            }
        }
    
    sources = lines.join('\n').replace(/\[|\]/g,'')
    
    if (discussion) sources += '\n<img src="lib/i/discn.png" alt="Commentary" title="Commentary">'+discussion
    
    if (traceutils) console.log(exit,'formatSource:',sources)
    return sources
    }




function getSiblings (person, event) {
    // returns a string containing previously born siblings of person
    if (trace) console.log('getSiblings(',person,')')
    
    siblings = ''
    // get the id of the parent
    if (db[person].father && db[db[person].father]) parent = db[db[person].father]
    else if (db[person].mother && db[db[person].mother]) parent =db[db[person].mother]
    
    if (parent && parent.fg) {
        // go through the list of families for the parent
        for (i=0;i<parent.fg.length;i++) {
            // go through the children in each family
            for (j=2;j<parent.fg[i].length;j++) {
                if ((s = parent.fg[i][j]) !== person && db[s]) {
                    
                   // check whether sibling already died
                    if (db[s].d && db[person].b && db[s].d < db[person].b) {
                        siblings += getName('', s, 'given', true) + '<sup class="ageTag">(dec)</sup>, '
                        continue
                        }
                    // skip anyone older
                    if (db[s].b && db[person].b && db[s].b > db[person].b) {
                        continue
                        }
                    siblings += getName('', s, 'given', true, event)+ ', '
                    }
                else { break }
                }
            }
        }
    if (trace) console.log('returns',siblings.substring(0,siblings.length-2))
    return siblings.substring(0,siblings.length-2)
    }



function getAllSiblings(person) {

    // Ensure the person exists
    if (!db[person]) return '<ul><li>—</li></ul>'

    let parent = null

    // Prefer father if valid, otherwise mother
    if (db[person].father && db[db[person].father]) parent = db[db[person].father]
    else if (db[person].mother && db[db[person].mother]) parent = db[db[person].mother]

    // If no valid parent or no family groups, no siblings exist
    if (!parent || !parent.fg) return '<ul><li>—</li></ul>'

    // Collect children in birth order from all family groups
    const ordered = []

    for (let i = 0; i < parent.fg.length; i++) {
        const fam = parent.fg[i]
        for (let j = 2; j < fam.length; j++) {
            const s = fam[j]
            if (!ordered.includes(s)) ordered.push(s)
            }
        }

    // If the only child is the person, then no siblings exist
    if (ordered.length === 1 && ordered[0] === person) return '<ul><li>—</li></ul>'

    // Build the HTML list
    let siblings = '<ul>'

    for (const s of ordered) {

        // Person themself → no link
        if (s === person) {
            siblings += `<li style="text-transform:uppercase; color:#648200; font-size:.8rem; font-weight:bold;"><img src="lib/i/copytiny.svg" style="height:1em; width:1em" onclick="copyThis('${ person }')"> ${ getName('', person, 'given', false, '') }</li>`
            continue
            }

        // Known sibling in db → linked name
        if (db[s]) 
            siblings += `<li><img src="lib/i/copytiny.svg" style="height:1em; width:1em" onclick="copyThis('${ s }')"> ${ getName('', s, 'given', true, '') }</li>`
        
        // Unknown ID → uppercase fallback
        else 
            siblings += `<li style="text-transform:uppercase;"><img src="lib/i/copytiny.svg" style="height:1em; width:1em" onclick="copyThis('${ s }')"> ${ s }</li>`
        }

    siblings += '</ul>'
    return siblings
    }





function toggleTag(spanEl, personID) {
    const isChecked = spanEl.textContent.trim() === "\u2713"

    // Toggle the visual state
    spanEl.textContent = isChecked ? "\u25A1" : "\u2713"

    // Update the db record
    db[personID].tagged = !isChecked

    // Rebuild the list of all tagged people
    const taggedList = Object.keys(db).filter(id => db[id].tagged === true)

    // Save to localStorage
    localStorage[project+'tags'] = JSON.stringify(taggedList)
    }





function makeIntro (id, person) {
        // automatically builds a summary of a person's key life events
    
        let lifeSummary = ''
        lifeSummary += getName('', id, 'gfm', false)
        if (person.k) lifeSummary += ', known as '+person.k+', '
        if (person.b) {
            if (person.b.includes('*')) lifeSummary += ` is likely to have been born around <strong>${ person.b }</strong>`
            else lifeSummary += ` was born in <strong>${ person.b }</strong>`
            }
        if (person.bplace) lifeSummary += ` at <strong>${ expandChapmanCodes(　person.bplace ) }</strong>`
        lifeSummary += '. '
        if (person.fg) {
            for (i=0;i<person.fg.length;i++) {
                // deal with no date partnerships (ie. no marriage)
                if ((person.fg[i][0] === '' || person.fg[i][1] === '?') && person.fg[i].length > 2) {
                    lifeSummary += person.pron+' had '
                    if (person.fg[i].length === 3) lifeSummary += ' one child'
                    else lifeSummary += person.fg[i].length-2+' children'
                    if (person.fg[i][1] !== '' && person.fg[i][1] !== '?') lifeSummary += ` with ${ getName('', person.fg[i][1], 'gf', false) }`
                    lifeSummary += '. '
                    }                  
          
                else {
                    lifeSummary += `${ person.pron } married <strong>${ getName('', person.fg[i][1], 'gf', false) }</strong> in <strong>${ person.fg[i][0].substr(0,4) }</strong>`
                    if (person.fg[i].length > 2) {
                        lifeSummary += ' and we know of '
                        if (person.fg[i].length === 3) lifeSummary += ' one child'
                        else lifeSummary += person.fg[i].length-2+' children'
                        }
                    else if (person.cstatus) lifeSummary += ` but they had no children`
                    else lifeSummary += ` but we have not found any children`
                    lifeSummary += '. '
                    }
                }
            }
        if (person.occ) {
            var occupations = person.occ.split(',')
            lifeSummary += person.posspron+' occupations included '
            for (i=0;i<occupations.length;i++) {
                if (i === occupations.length-1 && i>0) lifeSummary += ' and '
                else if (i>0) lifeSummary += ', ' 
                lifeSummary += occupations[i]
                }
            lifeSummary += '. '
            }
        if (person.d) {
            if (person.d.includes('*')) lifeSummary += person.pron+' is likely to have died around '+person.d
            else lifeSummary += `${ person.pron } died in <strong>${ person.d }</strong>`
            if (person.dplace) lifeSummary += ` at <strong>${ expandChapmanCodes( person.dplace ) }</strong>`
            var ed = ey = bd = by = '?'
            if (person.b) {
                var age = getAge('', person.ddate, person.d, person.bdate, person.b, '')
                if (age === '0') lifeSummary += ', less than a year old'
                else lifeSummary += ' aged ' + getAge('', person.ddate, person.d, person.bdate, person.b, '')
                }
            lifeSummary += '. '
            lifeSummary = lifeSummary.replace('~',' about ')
            }
        
        if (person.b.includes('*') || person.d.includes('*') || person.bplace.includes('*') || person.dplace.includes('*')) lifeSummary += `<p style="font-size:small; line-height:1.4em; margin-block-start:2rem;"><span style="font-size:150%;">* </span> When an asterisk appears we don't actually know the date, place or name; this is just a guess or an undocumented suggestion from someone. When used with a birth year, ages below are based on that guess, and so may be incorrect.</p>`
        
        //narrative = lifeSummary
        
        return lifeSummary
        }
    



// ===================================================
// ================== MAIN FUNCTION ================
// ======================================================
// redisplay(document.getElementById('in').textContent,thisPerson,document.getElementById('summaryIn'))

function redisplay (researchNotes, id, summary ) { 
    if (trace) console.log(enter, 'redisplay(researchNotes='+researchNotes+' id='+id+' summary='+summary+'['+summary.textContent+']'+')')
    //researchNotes: text read in from individual's txt file 
    //id: same as the global variable thisPerson (should eliminate it)
    //summary: ?
    //global.thisPerson: the id of the person this page is about
    

    var person
    
    person = db[thisPerson]  // points to the node in the db for thisPerson, will have other properties bound to it
    var p = db[thisPerson]  // obsolete this in favour of person
    var o = {} // contains data for a relative described by an event
    
    personID = id // this is to test the buttons at the bottom
    
	var out = ''
	var thumb = ''
	var thumbLegend = ''
	var gps = []

    console.log(here, person)

	// establish some basic information about the person the page is about
	person.given = getName('', id, 'k', false)
	person.fullname = getName('', id, 'gkf', false)
	if (person.male) { person.pron = 'He'; person.refpron = 'himself'; person.posspron = 'His'; }
	else  { person.pron = 'She'; person.refpron = 'herself'; person.posspron = "Her"; }
	temp = thumb.split(',')
	if (temp.length>1) { thumb = temp[0]; thumbLegend = temp[1]; }
	else thumbLegend = person.fullname






	// CREATE THE TOP BOILERPLATE +++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
    // make the controls on the bottom line
	var dob = id.split('_')
	out += '<div id="topMenu">'
	out += '<span id="summarise" onclick="summarise(this, thisPerson)">Show lists</span>'
	out += '<span id="copyprep" onclick="prepCopy()">Copy prep</span>'
	out += '<span id="toggleDetails" onclick="toggleDetails(this)">Show sources</span>'
	out += '<span id="toggleEvents" onclick="toggleHistory(this, '+dob[dob.length-1]+')">Show history</span>'
	out += '<span id="toggleRelatives" onclick="toggleRelatives(this)" title="Hide/show relatives other than the nuclear family.">Hide relatives</span>'
	out += '<span id="applyTerse" onclick="terse()" title="Remove all relatives other than spouse\'s death.">Hide more</span>'
    out += `<label  style="float: right; color:gray; margin-inline-end: 5rem; margin-block: 0; display:inline-block;" title="Bring up an input form to create or modify data.">EDIT 
    <select id="editSelect" style="font-size: 90%; font-style:italic; line-height:1; margin-inline:.5rem; background-color:#eee;"
    onchange="if (this.value !== '' && this.value !== 'personentry') openWindow(\'lib/forms/'+this.value+'.html?project=${ project }&person=${ thisPerson }'); else if (this.value === 'personentry') openWindow(\'lib/forms/personentry.html?project=${ project }'); this.value=''">
        <option value="">&nbsp;</option>
        <option value="personentry">New person</option>
        <option value="birthentry">Birth</option>
        <option value="dthentry">Death</option>
        <option value="marriageentry">Marriage</option>
        <option value="evententry">Event</option>
        <option value="censusentry">New census</option>
        </select></label>`
    if (db[id].tagged) out += `<span style="float: right; color:gray; display:inline-block;" 
                                title="This person has been tagged.">TAGGED <span style="font-size: 140%; line-height:1; margin-inline:.5rem;">\u2713</span></span>`
    out += '</div>'


    helpDialog = document.getElementById('helpMessage')

    // do the floating links
    out += '<div id="floatingLinks">'
	out += `<a id="sideIcon_index" title="Go to the Index." target="_blank" href="index.html?project=${ project }"
                >&#x1F4C7;</a>`

    out += `<a id="gotoTree" target="_blank" title="Show Relationships" href="tree.html?project=${ project }&person=${ id }"                >&#x23F3;</a>`
     
	out += `<a id="sideIcon_ancestors" title="Show Ancestors" target="_blank" style="opacity:80%;" href="precedents.html?project=${ project }&person=${ id }"
                >&#x23EB;</a>`
   
	out += `<a id="sideIcon_descendants" title="Show Descendants." target="_blank" style="opacity:80%;" href="descendants.html?project=${ project }&person=${ id }"
                >&#x23EC;</a>`
    
	if (db[id].a) out += `<a id="sideIcon_ancestry" title="Show in Ancestry.com family tree." style="opacity:80%;" href="javascript:void(0)" onclick="ancestry = '${ db[id].a }'.split(','); openWindow(\'https://www.ancestry.co.uk/family-tree/tree/'+ancestry[0]+'/family?cfpid='+ancestry[1])"><img 
                src="lib/i/chart.png" 
                style="height:1.4em; width:1.4em;"
                ></a>`
    
	out += `<a id="sideIcon_family" title="Show Family Tree" target="_blank" href="ancestors.html?project=${ project }&person=${ id }"
                >&#x1F333;</a>`
    
	out += `<a id="sideIcon_search" title="Search for entries" target="searchWindow" href="search.html?project=${ project }&person=${ id }"
                >&#x1F50D;</a>`
    
	out += `<a id="sideIcon_copy" title="Copy id to clipboard" style="opacity:80%;" href="javascript:void(0)"><img 
                src="lib/i/copytiny.svg" 
                style="height:1em; width:1em;" onclick="navigator.clipboard.writeText('${ id }'); document.getElementById('copyNotice').style.display = 'block'; setTimeout(() => { document.getElementById('copyNotice').style.display = 'none' }, '500')"
                ></a> `
    
	out += `<img id="sideIcon_edit"
                src="lib/i/edit.svg" 
                style="margin-block: 1rem; height:1em; width:1em;" onclick="openWindow(\'lib/forms/personentry.html?project=${ project }&person=${ thisPerson }')"
                >`

        
    // read in which people are tagged
    const saved = JSON.parse(localStorage[project+'tags'] || "[]")
    saved.forEach(id => {
        if (db[id]) db[id].tagged = true
        })
    

    out += `<span id="tagIndicator" 
                title="Toggle the tag for this person." onclick="toggleTag(this, '${ id }')" 
                style="font-size: 100%; line-height:1; color:brown; cursor:pointer;margin-block: 1rem;"
                >`
    if (db[id].tagged)  out += `\u{2713}`
    else                out += `\u{25A1}`
    out += `</span>`
    

    out += `<span id="toggleHelp" 
                title="Toggle help popups." style="margin-block-start:1rem;"><img id="helpToggleIcon" src="lib/i/stopHelp.png" alt="Toggle help popups" style="height:2rem; cursor:pointer;"></span>`

    out += '</div>'


    out += '<div id="top"></div>'
	
	
	// popup window for summary
	out += `<div id="summaryBackdrop"></div><div id="summaryWin"></div>`




    // SET THE PAGE TITLE & BARS BELOW +++++++++++++++++++++++++++++++++++++++++++
    
	// set the page title
	document.querySelector('title').textContent = getName('', thisPerson, 'gf', false)
	
	// draw top banner
	out += '<div id="pageicon">📄</div><div id="banner"><div id="pagetitle">'+getName('', thisPerson, 'gfm', false)+'<br><span id="bannerdates">'+person.b+'\u2013'+person.d
	if (person.occ) out += ' \u2022 '+person.occ
	out += '</span></div></div>'

    // gather data
    var sid = []  // list of spouse ids
	var cid = []  // list of child ids
	if (person.fg) {
		for (i=0;i<person.fg.length;i++) {
			sid.push(person.fg[i][1])
			}
		for (i=0;i<person.fg.length;i++) {
			for (j=2;j<person.fg[i].length;j++) {
				cid.push(person.fg[i][j])
				}
			}
		}

    // make up the set of people connected to the root, if any
    makeMarkList()

    // list parents
	out += '<div id="subbanner"><div>Parents: &nbsp; '
	if (person.father) {
        if (markList.has(person.father)) rootConnected = ` class="rootConnected"`
        else rootConnected = ''
        out += `<span ${ rootConnected }><img src="lib/i/copytiny.svg" style="height:1em; width:1em;" onclick="copyThis('${ person.father }')"> ${ getName('', person.father, 'both', true) }</span>`
        }
	if (person.mother && person.father ) out += ' \u00A0 '
	//if (person.mother && person.father ) out += ' \u2022 '
	if (person.mother) {
        if (markList.has(person.mother)) rootConnected = ` class="rootConnected"`
        else rootConnected = ''
        out += `<span ${ rootConnected }><img src="lib/i/copytiny.svg" style="height:1em; width:1em;" onclick="copyThis('${ person.mother }')"> ${ getName('', person.mother, 'both', true) }</span>`
        }
	if (!person.mother && !person.father) out += 'Unknown'
	out += ' </div></div>'

	// list spouses
	out += '<div id="subsubbanner"><div>Spouse: &nbsp; '
	if (sid.length > 0) {
		for (c=0;c<sid.length;c++) {
            if (markList.has(sid[c])) rootConnected = ` class="rootConnected"`
            else rootConnected = ''
			out += `<span ${ rootConnected }><img src="lib/i/copytiny.svg" style="height:1em; width:1em;" onclick="copyThis('${ sid[c] }')"> ${ getName('', sid[c], 'both', true) }</span>`
			if (c<sid.length-1) out += ' \u00A0 '
			//if (c<sid.length-1) out += ' \u2022 '
			}
		}
    else if (typeof person.cstatus !== 'undefined') out += 'None'
    else out += 'TBC'
	out += '</div></div>'
    sid = ''

	// list children
    console.log('CID',cid.length)
	if (cid.length === 1) out += `<div id="subsubsubbanner"><div>${ cid.length } Child: &nbsp; `
	else if (typeof person.cstatus !== 'undefined' && cid.length === 0) out += `<div id="subsubsubbanner"><div>Children: &nbsp; `
	else if (typeof person.cstatus === 'undefined' && cid.length === 0) out += `<div id="subsubsubbanner"><div>Children: &nbsp; `
	else out += `<div id="subsubsubbanner"><div>${ cid.length } Children: &nbsp; `
	temp = []
	if (cid.length > 0) {
		for (c=0;c<cid.length;c++) {
			if (cid[c] === 'a_child') {
				temp.push('<span>Private</span>')
				}
			else if (cid[c] === 'noissue') {}
			else {
                if (markList.has(cid[c])) rootConnected = ` class="rootConnected"`
                else rootConnected = ''
				temp.push(`<span ${ rootConnected }><img src="lib/i/copytiny.svg" style="height:1em; width:1em;" onclick="copyThis('${ cid[c] }')"> ${ getName('', cid[c], 'given', true) }</span>`)
				}
			}
		}
	for (i=0;i<temp.length;i++) {
		out += temp[i]
		if (i<temp.length-1) out += ' \u00A0 '
		//if (i<temp.length-1) out += ' \u2022 '
		}

	if (temp.length === 0) {
        if (typeof person.cstatus !== 'undefined') out += 'None'
        else out += 'TBC'
        }
	out += '</div></div>'
    cid = ''







    // DISPLAY THE GENERAL INFORMATION  +++++++++++++++++++++++++++++++++++++++++++
    
	out += '<div id="main">'
    if (person.cstatus) out += '<p style="color:#aaa; text-align:center;margin-top:0.2em; font-size:1.2rem;">&#x2014; '+person.cstatus+' &#x2014;</p>'
    
    
    
	out += '<div class="dateAndRecord">'
	
    
    out += `<div id="summary" class="record" style="background-color:transparent;">`
    out += `<div><p>` // the extra div keeps all together, and vertical

    // add the thumbnail
    if (person.thumb) out += '<img class="portrait" src="'+project+'/thumbs/'+id+'.jpg" alt="'+thumbLegend+'" title="'+thumbLegend+'">'
	else if (person.male) out += '<img class="portrait" src="lib/i/man_pic.png" alt="'+thumbLegend+'" title="'+thumbLegend+'">'
	else  out += '<img class="portrait" src="lib/i/woman_pic.png" alt="'+thumbLegend+'" title="'+thumbLegend+'">'
    
    
    const narrativeAvailable = narrative && narrative !== '' ? true : false
    if (! narrativeAvailable) narrative = makeIntro(id, person)


    // add the radio buttons for narrative, etc
    out += '<p id="summaryToggle">'
    
    // Narrative radio button
    out += '<span id="narrative_button">'
    out += `<label><input type="radio" name="summaryMode" ${ narrativeAvailable ? 'checked' : '' } onclick="document.getElementById('life_summary').innerHTML = narrative"><span>Narrative</span></label>`
    out += '</span> &nbsp;\u2022&nbsp; '

    // Event summary radio button
    out += '<span id="esummary_button">'
    out += `<label><input type="radio" name="summaryMode"  ${ narrativeAvailable ? '' : 'checked' }  onclick="document.getElementById('life_summary').innerHTML = makeEventTable(window.eventSummaryList)"><span>Events</span></label>`
    out += '</span>'

    // Breadcrumb radio button (only if places exists)
    if (typeof places !== 'undefined' && places !== '') {
        out += ' &nbsp;\u2022&nbsp; <span id="breadcrumb_button">'
        out += `<label><input type="radio" name="summaryMode" onclick="showBreadcrumbs()"><span>Breadcrumbs</span></label>`
        out += '</span>'
        }
    out += `</p>`

    
    // add the life summary narrative
    out += `<section id="life_summary" class="life_summary">`

    out += narrative

    out  += `</section>`

    out += '<p></p>\n'


    // add warnings for provisional data
    if (person.provisional && person.warning) out += `<img style="float:left; margin-inline-end:1rem; margin-block:.5rem;" src="lib/i/caution.png" alt="Caution" title="Cautionary notes."><p style="font-style:italic; font-size: 80%; font-family: serif;"> ${ person.warning }</p>`
    
    
    out += '</div></div>'   // ends .summary & internal plain div




    out += '<div class="keypoints" style="margin-block-start:4rem;">'
    
    // add birth & death dates
    out += `<div style="line-height:1.2rem; margin-block-end:1rem;">`
    birthNote = person.bdate+' '+person.b
    if (birthNote !== '') out += `<div id="headsup_born">Born: ${ birthNote }</div>`
	
    deathNote = person.ddate+' '+person.d
    if (deathNote !== '') out += `<div id="headsup_died">Died: ${ deathNote } (${ getAge("",person.ddate,person.d,person.bdate,person.b,"") })</div>`
	
    out += `</div>`
	
	// add the general links
	if (data[id] && data[id].links) {
		for (i=0;i<data[id].links.length;i++) {
			out += '<p><a href="'+data[id].links[i].url+'" target="_blank">'+data[id].links[i].title+'</a></p>'
			}
		}
	else out += ''

    // add the list of locations
    const locationAvailable = typeof location_summary !== 'undefined' && typeof location_summary.list !== 'undefined' && location_summary.list !== 'comma_separated_list_goes_here' ? true : false
    const locURLAvailable = typeof location_summary !== 'undefined' && typeof location_summary.url !== 'undefined' && location_summary.url !== 'url_goes_here' ? true : false
    
    out +=  `<div><img src="lib/i/map_pin.png" alt="Click to see on a map" style='height:1rem; margin-block-start:.5rem;'></div><p id="location_summary" style="color: black;">`
    
    if ( locationAvailable && locURLAvailable ) out += `<a target="_blank" href="${ location_summary.url }">${ location_summary.list.replace(/,/g,'<br>').replace(/\u2022/g,'<br>') }</a>`
    
    else if ( locationAvailable && ! locURLAvailable ) out += `${ removeUppercaseRuns( location_summary.list.replace(/,/g,'<br>').replace(/\u2022/g,'<br>')) }`
    
    else out += `${ removeUppercaseRuns(person.bplace) } <br> ${ removeUppercaseRuns(person.dplace) }`
    out +=  `</p>`
    
    /*out +=  `<div><img src="lib/i/map_pin.png" alt="Click to see on a map" style='height:1rem; margin-block-start:.5rem;'></div><p id="location_summary" style="color: black;">`
    
    if (typeof location_summary !== 'undefined' && location_summary.url !== 'url_goes_here') out += `<a target="_blank" href="${ location_summary.url }">${ location_summary.list.replace(/,/g,'<br>').replace(/\u2022/g,'<br>') }</a>`
    
    else if (typeof location_summary !== 'undefined' && location_summary.url === 'url_goes_here' ) out += `${ location_summary.list.replace(/,/g,'<br>').replace(/\u2022/g,'<br>') }`
    
    else out += `${ person.bplace } <br> ${ person.dplace }`
    out +=  `</p>`*/

    // list siblings
    out += `<div id="allSiblings"><span style="font-size: 80%; display:inline-block;margin-block-end:.2rem;">SIBLINGS:</span>`
    siblingList = getAllSiblings(thisPerson)
    if (siblingList !== '<ul></ul>') out += siblingList+'</div>'
    else out += '<br>\u2014'+'</div>'



    
	out += '</div></div>\n'



	
	// ESTABLISH A LIST OF EVENTS & TIME PERIOD FOR SELECTING THEM  ++++++++++++++++++++++++++++++++++++++
        
    var isoDate
    var dateOptions = { weekday:'long', day:'numeric', month:'short' }
    var withWeekday = { weekday:'long', day:'numeric', month:'short', year:'numeric' }


    // start with the list generated by checkBMD
    events = records
    
    // add the local events to the event list
    if (person.events) {
        keys = Object.keys(person.events)
        for (i=0;i<keys.length;i++) {
            events.push(keys[i]+'\tevent\t@\t'+person.events[keys[i]].type)
            }
        }
    
    events.sort()
    
    console.log('EVENTS',events)
    
    
    
    // establish a window of time for inclusion of events
    var periodStart = getTimestamp(person.bdate, person.b)
    if (periodStart == '') { // ie. no birth date found
        for (i=0;i<events.length;i++) { // check the ordered events list for a sign of life
            if (events[i].match('event\t|\tmarriage|\tson|\tdaughter|self\tdies')) {
                var temp = events[i].split(' ')
                periodStart = temp[0]
                break
                }
            }
        }
    var periodEnd = getTimestamp(person.ddate, person.d)
    if (periodEnd == '') { // ie. no birth date found
        if (person.upto) periodEnd = person.upto
        else {
            for (i=events.length-1;i>-1;i--) { // check the reverse-ordered events list for a sign of life
                if (events[i].match('event\t|\tmarriage|\tson|\tdaughter|\thusband|self\tborn')) {
                    var temp = events[i].split(' ')
                    periodEnd = temp[0]
                    break
                    }
                }
            }
        }





// THESE MAY NEED TO BE CHANGED TO birthTS and deathTS respectively, if actually used
    var birth = getTimestamp(person.bdate, person.b)
    var death = getTimestamp(person.ddate, person.d)







 	// WORK THROUGH EACH EVENT +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    for (var e=0;e < events.length; e++) {
        var record = ''
        //var info = events[e]
        var details = ''
        
        // event carries information about the person the event relates to
        var event = {}
        parts = events[e].split('\t')
        event.timestamp = parts[0]
        event.dateObj = new Date(parts[0].replace(/-/g, '\/'))
        event.person = parts[1]
        event.relation = parts[2]
        event.type = parts[3]
       
        //event.year = event.timestamp.substr(0,4)
        event.year = event.dateObj.getFullYear().toString()
        
        event.title = ''
        event.background = ''
        event.border = ''
        event.useGPS = true

        if (trace) console.log('>>>> Loading event:', events[e])

        if (db[event.person] && event.person !== 'event' && ! event.person.includes('^')) {
            event.bdate = db[event.person].bdate
            event.b = db[event.person].b
            event.ddate = db[event.person].ddate
            event.d = db[event.person].d
            event.male = db[event.person].male
            }
        event.relative = ''

        if (event.male) { event.pron = 'He'; event.refpron = 'himself'; event.posspron = 'His'; }
        else  { event.pron = 'She'; event.refpron = 'herself'; event.posspron = "Her"; }

        if (trace) console.log('EVENT',event)
        
        
        // check whether we have the data, and whether the dates fall within the person's lifespan
        if (event.person !== 'event' && typeof db[event.person] === 'undefined' && ! event.person.includes('^') && ! event.relation.includes('spouse')) { 
            console.log(exit,'redisplay: Person undefined.', event.relation)
            continue 
            }
        if (event.timestamp < periodStart || event.timestamp > periodEnd) { 
            console.log(exit,'redisplay: Outside lifespan (periodStart,death=',periodStart,periodEnd,')')
            continue
            }






        if (event.type === 'census') {
            // add the census details to event
            console.log('redisplay: Census ',person, person.events[event.timestamp])
            for (x in person.events[event.timestamp]) event[x] = person.events[event.timestamp][x]
            for (x in censi[event.census]) event[x] = censi[event.census][x]

            //console.log(here,here,'EVENT after census merge',event)

            isoDate = new Date(event.timestamp)
            event.date = new Intl.DateTimeFormat('en-GB', dateOptions).format(isoDate)
            event.date = new Intl.DateTimeFormat('en-GB', dateOptions).format(event.dateObj)
    
            if (event.discussion) {
                record += '<img class="commentaryIcon" src="lib/i/discn.png" alt="Commentary" title="Commentary notes for this event." onclick="alert(`' + event.discussion + '`)">'
                }
            if (event.caution) {
                record += '<img class="commentaryIcon" src="lib/i/caution.png" alt="Caution" title="Cautionary notes for this event." onclick="alert(`' + event.caution + '`)">'
                }

           
            // create a summary
            record += `<div class="censusSummary">`
            if (event.head) {
                summaryname = event.head.split(';')[1]
                if (typeof db[event.head.split(';')[0]] !== 'undefined') headSurname = new RegExp(db[event.head.split(';')[0]].f)
                else headSurname = ''
                record += summaryname
                }
            if (event.wife) {
                record += ` & `
                summaryname = event.wife.split(';')[1].replace(headSurname,'')
                record += summaryname
                }
            if (event.children) {
                record += `<br>`
                for (i=0;i<event.children.length;i++) {
                    if (i>0) record += ' \u2022 '
                    summaryname = event.children[i].split(';')[1].replace(headSurname,'')
                    record += summaryname
                    }
                }
            if (event.others || event.serv || event.visitors) record += `<p style="margin-block:-.5em">`
            if (event.others) {
                record += `<br><span title="Others">+</span> `
                for (i=0;i<event.others.length;i++) {
                    if (i>0) record += ' \u2022 '
                    summaryname = event.others[i].split(';')[1]
                    record += summaryname
                    }
                }
            if (event.serv) {
            record += `<br><span title="Servants">\u{1F182}</span> `
                for (i=0;i<event.serv.length;i++) {
                    if (i>0) record += ' \u2022 '
                    summaryname = event.serv[i].split(';')[1]
                    record += summaryname
                    }
                }
            if (event.visitors) {
                record += `<br><span title="Visitors/Boarders">\u{1F185}</span> `
                for (i=0;i<event.visitors.length;i++) {
                    if (i>0) record += ' \u2022 '
                    summaryname = event.visitors[i].split(';')[1]
                    record += summaryname
                    }
                }
            if (event.others || event.serv || event.visitors) record += `</p>`
            record += `</div>`

           
            
            
            record += '<p>On '+event.date+' '+event.year+', '+person.given
            age = getAge('', event.date, event.year, person.bdate, person.b, '')
            if (age === '0') record += ' (aged less than a year)'
            else record += ' (aged '+age+')'
            //record += ' was at '+event.place.split('http')[0].trim()+'. '
            record += ` was at ${ expandChapmanCodes( event.place.split('http')[0].trim() ) }. `


            if (event.head) event.head = event.head.split(';')[0]
            if (event.wife) event.wife = event.wife.split(';')[0]
            event.childnames = new Set([])
            if (event.children) for (i=0;i<event.children.length;i++) event.childnames.add(event.children[i].split(';')[0])


            record += ' The household included '
            if (event.head === thisPerson) {
                record += ' '+person.refpron
                }
            else if (event.wife === thisPerson) record += ' her husband '+getName('',event.head,'kf',true, event.timestamp)
            else record += getName('',event.head,'kfm',true, event.timestamp)
            
            if (event.wife == null && event.children == null && event.visitors == null && event.others == null && event.serv == null) record += ' alone'
            
            if (event.wife && event.children) record += ', '
            else if (event.wife) record += ' and '
            
            if (event.wife) {
                if (thisPerson === event.wife) record += ' '+person.refpron
                else record += ' his wife '+getName('',event.wife,'k',true, event.timestamp)
                }
            
            if (event.children) {
                if (event.children.length === 1) record += ' and 1 child'
                else record += ' and '+event.children.length+' children'
                if (event.childnames.has(thisPerson)) record += ' (including '+person.given+')'
                }
            record += '. '
            
            if (event.others || event.visitors) {
                record += ' There '
                if (event.others) {
                    if (event.others.length === 1) { record += ' was also 1 other'; if (event.relation === 'other') record += ' ('+person.given+')' }
                    else if (event.others) { record += ' were '+event.others.length+' others'; if (event.relation === 'other') record += ' (including '+person.given+')' }
                    }
                if (event.others && event.visitors) record += ' and there '
                if (event.visitors) {
                    if (event.visitors.length === 1) { record += ' was also 1 visitor'; if (event.relation === 'visitor') record += ' ('+person.given+')' }
                    else if (event.visitors) { record += ' were also '+event.visitors.length+' visitors'; if (event.relation === 'visitor') record += ' (including '+person.given+')' }
                    }
                record += '.'
                }

            if (event.serv) { console.log(event.serv, event.relation)
                record += ' There '
                if (event.serv.length === 1) { 
                    record += ' was also 1 servant'
                    if (event.relation === 'serv') record += ' ('+person.given+')' }
                else if (event.serv) { 
                    record += ' were '+event.serv.length+' servants'
                    if (event.relation === 'serv') record += ' (including '+person.given+')' 
                    }
                record += '.'
                }
            record += '</p>'
            // get source data
            details = JSON.stringify(censi[event.census], ['source','place','head','wife','married','children','others','serv','visitors','cparish','details'], '\u200B').replace(/\{|\}/g,'').replace(/"/g,'')
            details = details.replace(/\u200B/g,'')
            var lines = details.split('\n')
            for (i=0;i<lines.length;i++) {
                if (lines[i].startsWith('source:') && lines[i].match('http')) {
                    parts = lines[i].split('http')
                    parts[0] = parts[0].replace(/source: /,'')
                    lines[i] = `<img src="lib/i/source.png" alt="Source link" title="Source link"><a target="_blank" href="http${ parts[1].replace(/,/g,'') }">${ parts[0] }</a>`
                    }
                if (lines[i].startsWith('place:') && lines[i].match('http')) {
                    parts = lines[i].split('http')
                    lines[i] = `${ parts[0] }`
                    }
                if (lines[i].startsWith('details:')) {
                    lines[i] = lines[i].replace(/\\n/g,' &nbsp; ').replace(/\\t/g,' ')
                    }
                }
            details = lines.join('\n')


            if (event.notes) record += getNotes(event.notes, event.timestamp)
            if (event.fnotes) record += getFNotes(event.fnotes, event.timestamp)
            //event.notes = event.notes.split('\n')
            //for (n=0;n<event.notes.length;n++) if (event.notes[n] !== '') record += `<p>${ replaceNames(event.notes[n], event.timestamp) }</p>`
            if (event.discussion) {
                details += '<img src="lib/i/discn.png" alt="Commentary" title="Commentary notes for this event.">'+formatSource('',event.discussion)
                }
       
            event.useGPS = true
            event.title = 'Census'
            }
            



        if (event.type === 'born' && event.relation === 'self') {
            for (x in db[event.person].birth) event[x] = db[event.person].birth[x]
          
            siblingList = getSiblings(thisPerson, event.timestamp)

            // set date to bdate (which means no need to define date here)
            if (person && person.bdate) event.date = person.bdate
            else event.date = ''
            
            // check whether the birth date is based on the baptism date
            var goingByBap = false
            if (event.date && event.bapdate && event.date.match('~') && event.date.replace('~','') === event.bapdate) {
                goingByBap = true
                event.date = event.date.replace('~','onob ')
                }
            if (event.discussion) {
                record += '<img class="commentaryIcon" src="lib/i/discn.png" alt="Commentary" title="Commentary notes for this event." onclick="alert(`' + event.discussion + '`)">'
                }
            if (event.caution) {
                record += '<img class="commentaryIcon" src="lib/i/caution.png" alt="Caution" title="Cautionary notes for this event." onclick="alert(`' + event.caution + '`)">'
                }
            
            if (person.b.includes('*')) record += `<p>${ person.fullname } is likely to have been born around ${ person.b }`
            else record += '<p>'+person.fullname+' was born '+getDatePhrase(event.date,event.b,withWeekday)
            if (goingByBap) {
                record += ' (the date of '+person.posspron.toLowerCase()+' baptism)'
                }
            record += getDBParents(', to ', thisPerson)
            if (event.place) record += ` when the family resided at <span class="space">${ expandChapmanCodes( event.place.split('http')[0].trim() ) }</span>`
            record += '.'

            if (person.mother && db[person.mother]  && db[person.mother].f) {
                record += ' '+person.posspron+' mother\'s maiden name was '+db[person.mother].f+'.' 
                }
            if (event.informant) {
                informantText = replaceNames(event.informant)
                record += '<p>The informant on the birth certificate was '+informantText+'.</p>'
                }
            if (event.focc) {
                record += ' '+person.posspron+' father\'s occupation was '+event.focc+'.' 
                }
            record += '</p>'

            if (siblingList) {
                // get the number of siblings by checking the markup
                siblingLinks = siblingList.split('<a')
                if (siblingLinks.length === 1) record += '<p>'+person.pron+' had an elder sibling, '+getName('', siblingList[0].trim(), 'given', true)+'.</p>'
                else {
                    siblingCount = eval(siblingLinks.length-1)
                    if (siblingCount === 1) record += `<p>${ person.pron } had 1 elder sibling: ${ siblingList }`
                    else record += `<p>${ person.pron } had ${ siblingCount } elder siblings: ${ siblingList}`
                    record += '.</p>'
                    }
                }

            if (event.bapdate) {
                record += '<p>'+person.given+' was baptised '
                if (! goingByBap) {
                    if (event.bapyear) record += getDatePhrase(event.bapdate,event.bapyear)
                    else record += getDatePhrase(event.bapdate,year)
                    }
                if (event.bapplace) record += ' at '+expandChapmanCodes( event.bapplace.split('http')[0].trim() )+'.'
                record += '</p>'
                }
            if (event.notes) record += getNotes(event.notes, event.timestamp)
            if (event.fnotes) record += getFNotes(event.fnotes, event.timestamp)


            // settings for outside the main text
            event.title = 'Birth'
            
            event.useGPS = true
            
            details = formatSource(event.sources, event.discussion)
            
            if (typeof event.occ === 'undefined') event.occ = ''
           }




        else if (event.type === 'born') {
            // this is the birth of a relative
            if (trace && person[events]) console.log('redisplay: Birth ',person, person.events[event.timestamp])
            for (x in db[event.person].birth) event[x] = db[event.person].birth[x]

            if (event.discussion) {
                record += '<img class="commentaryIcon" src="lib/i/discn.png" alt="Commentary" title="Commentary notes for this event." onclick="alert(`' + event.discussion + '`)">'
                }
            if (event.caution) {
                record += '<img class="commentaryIcon" src="lib/i/caution.png" alt="Caution" title="Cautionary notes for this event." onclick="alert(`' + event.caution + '`)">'
                }
            record += '<p>'
            record += upperCaseFirst(event.relation) +' '
            record += getName('', event.person, 'kg', true)
            record += ' was born '
            
            record += getDatePhrase(event.bdate,event.b,withWeekday)
            
            if (event.place) record += ' at '+event.place.split('http')[0].trim() 
            if (birth) record += getAgeTS(', when '+person.given+' was ', event.timestamp, birth, ' years old')
            record += '.</p>'
            if (event.focc) {
                if (person.male) record += '<p>'+person.given+'\'s '
                else record += '<p>'+getName('', event.person, 'kx', true)+'\'s father\'s '
                record += ' occupation at the time was '+event.focc+'.</p>'
                }
            if (event.notes) record += getNotes(event.notes, event.timestamp)
            if (event.fnotes) record += getFNotes(event.fnotes, event.timestamp)


            // prepare other settings           
            if (db[event.person] && db[event.person].birth) details = db[event.person].birth.sources

            if (event.relation.match('son|daughter|father|mother')) {}
            else event.background = 'other'

            if (event.relation.match('sister|brother')) {
                if (db[event.person].male) event.title = 'Brother '
                else event.title = 'Sister '
                }
            else if (event.relation.match('son|daughter')) {
                if (db[event.person].male) event.title = 'Son '
                else event.title = 'Daughter '
                }
            else event.title = ''

            event.title += `${ getName('', event.person, 'kg', true) } ${ event.type }`

            
            event.useGPS = true
            
            details = formatSource(event.sources, event.discussion)
            
            if (event.focc && db[event.person].father === thisPerson) event.occ = event.focc
            }






        if (event.type === 'dies' && event.relation === 'self') {
            if (trace && person.events) console.log('redisplay: Death (self) ',person, person.events[event.timestamp])
            for (x in db[event.person].death) event[x] = db[event.person].death[x]

            event.useGPS = true
            event.title = 'Death'
            timestamp = new Date(event.timestamp)
            year = timestamp.getFullYear().toString()

            if (event.discussion) {
                record += '<img class="commentaryIcon" src="lib/i/discn.png" alt="Commentary" title="Commentary notes for this event." onclick="alert(`' + event.discussion + '`)">'
                }
            if (event.caution) {
                record += '<img class="commentaryIcon" src="lib/i/caution.png" alt="Caution" title="Cautionary notes for this event." onclick="alert(`' + event.caution + '`)">'
                }

            // overwrite event.date with thisPerson.ddate
            if (person.ddate) event.date = person.ddate
            else event.date = ''

            // check whether this is the burial date
            var goingByBur = false
            if (event.date && event.burdate && event.date.match('~') && event.date.replace('~','') === event.burdate) {
                goingByBur = true
                event.date = event.date.replace('~','onob ')
                }
            record += '<p>'+getName('', id, 'kfm', false)
            record += ' died '+getDatePhrase(event.date,year)
            if (goingByBur) {
                record += ' (the date of '+person.posspron.toLowerCase()+' burial)'
                }
            age = getAge('', event.date, year, person.bdate, person.b, '')
            if (age === '0') record += ' when '+person.pron.toLowerCase()+' was less than a year old'
            else record += ' when '+person.pron.toLowerCase()+' was '+age+' years old'
            record += '. '
            if (event.cause) record += ' The cause was '+event.cause+'. '

            if (event.of) record += ' '+person.pron+' resided at '+expandChapmanCodes( event.of.split('http')[0].trim() )
            if (event.of && event.place && event.place !== event.of) record += ', and '+person.pron.toLowerCase()+' died at '+expandChapmanCodes( event.place.split('http')[0].trim() )
            else if (event.place) record += ' '+person.pron+' died at '+expandChapmanCodes( event.place.split('http')[0].trim() )
            record += '.'
            
            if (event.occ) {
                if (person.male) record += ' His '; else record += ' Her '
                record += ' occupation at the time was '+event.occ.toLowerCase()+'. '
                }
            record += '</p>'
            if (event.informant) {
                informantText = replaceNames(event.informant)
                record += '<p>The informant was '+informantText+'.</p>'
                }

            if (event.burdate || event.burplace) {
                if (person.male) record += '<p>He '; else record += '<p>She '
                record += ' was buried at '+expandChapmanCodes( event.burplace.split('http')[0].trim() )
                if (! goingByBur && event.burdate) record += getDatePhrase(event.burdate,year)
                record += '.</p>'
                }
            if (event.gravestone) {
                if (person.male) record += '<p>His '; else record += '<p>Her '
                record += ' gravestone reads: <q>'+event.gravestone+'</q>.</p>'
                }
            if (event.probate) record += '<p>The probate index says: <q>'+event.probate+'</q>.</p>'
            if (event.namedInProbate) {
                var pnames = event.namedInProbate.split(',')
                var probatenames = ''
                for (w=0;w<pnames.length;w++) {
                    if (w>0) probatenames += ', '
                    if (w===pnames.length-1 && w>0) probatenames += 'and '
                    if (db[pnames[w].trim()]) probatenames += `${ getName('', pnames[w].trim(), 'kf', true) }` 
                    else  probatenames += `${ pnames[w].trim() }`
                    }
                record += `<p>Named in probate: ${ probatenames }.</p>`
                }
            if (event.notes) record += getNotes(event.notes, event.timestamp)
            if (event.obit) record += `<p class="obitIntro" style="text-align:center; margin-block:2rem;">Obituary & death notices</p>${ getNotes(event.obit,'') }`
            if (event.fnotes) record += getFNotes(event.fnotes)
 
            details = formatSource(event.sources, event.discussion)
            event.border = 'death'
            event.titleColour = 'black'

            // clarify occupation for right panel
            if (typeof event.occ === 'undefined') event.occ = ''
            if (typeof event.of !== 'undefined') event.place = event.of
            if (typeof event.place === 'undefined') event.place = ''
           }






        // relative dies
        else if (event.type === 'dies') {
            if (trace && person.events) console.log('redisplay: Death ',person, person.events[event.timestamp])
            for (x in db[event.person].death) event[x] = db[event.person].death[x]

            if (event.discussion) {
                record += '<img class="commentaryIcon" src="lib/i/discn.png" alt="Commentary" title="Commentary notes for this event." onclick="alert(`' + event.discussion + '`)">'
                }
            if (event.caution) {
                record += '<img class="commentaryIcon" src="lib/i/caution.png" alt="Caution" title="Cautionary notes for this event." onclick="alert(`' + event.caution + '`)">'
                }

            record += '<p>'
            record += upperCaseFirst(event.relation) +' '
            switch (event.relation.toLowerCase()) {
                case 'grandfather':
                case 'grandmother': record += getName('', event.person, 'kfm', true, event.timestamp); break
                default: record += getName('', event.person, 'k', true, event.timestamp)
                }
            if (event.cause && event.cause.match(/killed/i)) record += ' was killed '
            else record += ' passed away '
            if (data[event.person] && data[event.person].death && data[event.person].death.date) record+= getDatePhrase(data[event.person].death.date,event.year)
            else if (db[event.person] && db[event.person].ddate) record+= getDatePhrase(db[event.person].ddate,event.year)
            else record+= getDatePhrase('',event.year)
            if (event.age) record += ', aged '+event.age+', '
    
            age = getAgeTS('', event.timestamp, birth, '')
            if (age === '0') record += ' when '+person.given+' was less than a year old.'
            else record += ' when '+person.given+' was '+age+' years old.'
            
            if (event.of && event.place) record += ' '+getName('', event.person, 'kx', true)+' was living at '+event.of.split('http')[0].trim()+', and died at '+expandChapmanCodes( event.place.split('http')[0].trim() )+'.'
            else if (event.of) record += ' '+getName('', event.person, 'kx', true)+' was living at '+expandChapmanCodes( event.of.split('http')[0].trim() )+'.'
            else if (event.place) record += ' '+getName('', event.person, 'kx', true)+' died at '+expandChapmanCodes( event.place.split('http')[0].trim() )+'.'

            if (event.occ) record += ' '+event.posspron+' occupation was '+event.occ+'. '
            if (event.cause) record += ' '+getName('', event.person, 'given', true)+'\'s cause of death was '+event.cause+'. '
            record += '</p>'
            
            if (event.relation.match('father|mother') && event.burplace) record += `<p>${ getName('', event.person, 'kx', true) } was buried at ${ event.burplace.split('http')[0].trim() }</p>`
            
            if (event.informant) {
                informantText = replaceNames(event.informant)
                record += '<p>The informant was '+informantText+'.</p>'
                }
            if (event.probate && event.relation === 'husband') record += `The probate record has: <q>${ event.probate }</q>.`
            if (event.notes) record += getNotes(event.notes, event.timestamp)
            if (event.fnotes) record += getFNotes(event.fnotes, event.timestamp)


            // prepare information for elsewhere
            if (db[event.person] && db[event.person].death) details = formatSource(event.sources, event.discussion)

            event.title = ''
            console.log(event.relation)
            if (event.relation.match('grandfather|grandmother')) {
                console.log(here, event.relation)
                event.title += event.relation + ' ' + getName('', event.person, 'k', false) + ' dies'
                event.titleColour = '#444'
                }
            else if (event.relation.match('father|mother')) {
                event.title += event.relation+' dies'
                event.titleColour = 'black'
                }
            else if (event.relation.match('brother|sister')) {
                event.title += event.relation + ' ' + getName('', event.person, 'k', false) + ' dies'
                event.titleColour = '#444'
                }
            else {
                event.title = getName('', event.person, 'k', false) + ' ' + event.type
                event.titleColour = ''
                }
            
            if (event.relation.match('son|daughter|father|mother')) event.background = 'familydeath'
            else event.background = 'other'
            
            if (event.relation.match('wife|husband')) {
                event.title = getName('', event.person, 'k', false) + ' ' + event.type
                event.border = 'death'
                event.titleColour = 'black'
                event.background = 'familydeath'
                }
            
            event.place = ''
            event.occ = ''
            }







        if (event.type === 'marriage' && event.relation === 'spouse') {
            if (trace && person.events) console.log('REDISPLAY: Marriage ',person, person.events[event.timestamp])
            
            // find any data in person marriages (either in current or spouse record)
            var nodata = false
            
            if (person && person.marriages && person.marriages[event.person]) event = person.marriages[event.person]
            else if (db[event.person] && db[event.person].marriages && db[event.person].marriages[thisPerson]) event = db[event.person].marriages[thisPerson]
            else nodata = true
            
            if (nodata) {
                console.log(person)
                record += '<p>'+person.given+' married '
                if (event.person === '?' || event.person === '') record += 'an unknown person'
                else if (db[event.person]) record += getName('', event.person, 'gkf', true, event.timestamp)
                else record += event.person
                
                if (event.date) record+= getDatePhrase(event.date,year)
                record += ' when '+person.pron.toLowerCase()+' was '+getAgeTS('', event.timestamp, birth, '')+' years old'
                record += '. '
                console.log(record)

                event.title = 'Marriage to '+getName('', event.person, 'gkf', true, '')
                }
            
            else {
            year = event.timestamp.substr(0,4)
        
            if (event.discussion) {
                record += '<img class="commentaryIcon" src="lib/i/discn.png" alt="Commentary" title="Commentary notes for this event." onclick="alert(`' + event.discussion + '`)">'
                }
            if (event.caution) {
                record += '<img class="commentaryIcon" src="lib/i/caution.png" alt="Caution" title="Cautionary notes for this event." onclick="alert(`' + event.caution + '`)">'
                }
            
            // we should deprecate use of marriagetype
            // if there was no marriage, the fg list should start with a comma
            // and a note should be added to indicate the start of the relationship
            if (event.marriagetype === 'unmarried') {
                record += '<p>'+person.given+' began a relationship with '
                if (person.male) record += getName('', event.bid, 'gkf', true, event.timestamp)
                else record += getName('', event.gid, 'both', true, event.timestamp)
                record += ' at '+event.place.split('http')[0].trim()+', '
                if (event.date) record+= getDatePhrase(event.date,year)
                //if (person.male) pron = 'he'; else pron = 'she'
                record += ' when '+person.pron.toLowerCase()+' was '+getAgeTS('', event.timestamp, birth, '')+' years old'
                record += '. '
                }
            else {
                record += '<p>'+person.given+' married '
                if (person.male) record += getName('', event.bid, 'gkf', true, event.timestamp)
                else record += getName('', event.gid, 'gf', true, event.timestamp)

                if (event.place) record += ' at '+ expandChapmanCodes( event.place.split('http')[0].trim() )+', '
                if (event.date) record+= getDatePhrase(event.date,year)
                record += ' when '+person.pron.toLowerCase()+' was '+getAgeTS('', event.timestamp, birth, '')+' years old'
                record += '. '
                }

            if (event.bage || event.bstatus || event.gocc || event.bocc || event.bparish || event.gparish) record += '<p>'
            if (person.male) {
                if (event.bage) record += 'The bride was '+event.bage+' years old'
                if (event.bage && event.bstatus) record += ' and a '+event.bstatus
                else if (event.bstatus) record += ' The bride was a '+event.bstatus
                if (event.bage || event.bstatus) record += '. '
                }
            else {	
                if (event.gage) record += ' The groom was '+event.gage+' years old'
                if (event.gage && event.gstatus) record += ' and a '+event.gstatus
                else if (event.gstatus) record += ' The groom was a '+event.gstatus
                if (event.gage || event.gstatus) record += '. '
                }

            if (event.gocc) record += getName('', event.gid, 'k', true)+'\'s occupation was '+event.gocc+'. '
            if (event.bocc) record += getName('', event.bid, 'k', true)+'\'s occupation was '+event.bocc+'. '

            if (event.bparish && event.bparish === event.gparish) {
                if (event.gparish==='otp') record += ' Both were of this parish. '
                else record += ' Both were living at '+expandChapmanCodes( event.bparish.split('http')[0].trim())+'. '
                }
            else {
                if (event.bparish) {
                    if (event.bparish==='otp') record += ' The bride was of this parish'
                    else record += ' The bride was from '+expandChapmanCodes( event.bparish.split('http')[0].trim() )
                    }
                if (event.gparish && event.bparish) record += ' and the '
                else if (event.gparish) record += '. The '
                if (event.gparish) {
                    if (event.gparish==='otp') record += ' groom was of this parish'
                    else record += ' groom was from '+expandChapmanCodes( event.gparish.split('http')[0].trim() )
                    }
                if (event.bparish || event.gparish) record += '. '
                }
            if (event.bage || event.bstatus || event.gocc || event.bocc || event.bparish || event.gparish) record += '</p>'
            if (event.bfid || event.gfid) record += '<p>'
            if (person.male) {
                if (event.bfid) record += ' The bride\'s father was '+getName('', event.bfid, 'gf', true)
                else if (event.bfather) record += ' The bride\'s father was '+event.bfather
                if (event.bfocc) record += ', and his occupation '+event.bfocc
                if (event.bfid || event.bfather) record += '. '
                if (event.gfocc) record += person.given+'\'s father\'s occupation was '+event.gfocc+'. '
                }
            else {
                if (event.gfid) record += ' The groom\'s father was '+getName('', event.gfid, 'gf', true)
                else if (event.gfather) record += ' The groom\'s father was '+event.gfather
                if (event.gfocc) record += ', and his occupation '+event.gfocc
                if (event.gfid || event.gfather) record += '. '
                if (event.bfocc) record += person.given+'\'s father\'s occupation was '+event.bfocc+'. '
                }
            if (event.bfid || event.gfid) record += '</p>'

            if (event.witnesses) {
                var wits = event.witnesses.split(',')
                var witnesses = ''
                for (var w=0;w<wits.length;w++) {
                    if (w>0) witnesses += ', '
                    if (w===wits.length-1) witnesses += 'and '
                    if (db[wits[w].trim()]) witnesses += `${ getName('', wits[w].trim(), 'kf', true) }` 
                    else  witnesses += `${ wits[w].trim() }`
                    }
                }
            if (event.by && event.witnesses) record += '<p>They were married by '+event.by+' and the witnesses were '+witnesses+'.<p>'
            else { 
                if (event.by) record += '<p>They were married by '+event.by+'.<p>'
                if (event.witnesses) record += '<p>Witnesses were '+witnesses+'.<p>'
                }

            if (db[event.bid] && db[event.gid] && db[event.bid].d && db[event.gid].d) {
                var marrLength = Math.min(db[event.bid].d, db[event.gid].d) - parseInt(event.timestamp.substr(0,4))
                if (marrLength < 1) record += '<p>They were to be married for less than a year.</p>'
                else if (marrLength === 1) record += '<p>They were to be married for about a year.</p>'
                else {
                    if (event.marriagetype === 'unmarried') record += '<p>They were together for around '+marrLength+' years.</p>'
                    else record += '<p>They were to be married for around '+marrLength+' years.</p>'
                    }
                }
            if (event.notes) record += getNotes(event.notes, event.timestamp)
            if (event.fnotes) record += getFNotes(event.fnotes, event.timestamp)


            // stuff for display alongside the main text
            details = formatSource(event.sources, event.discussion)

            event.useGPS = true
  
            if (event.marriagetype === 'unmarried') {
                if (person.male) event.title = `Relationship with ${ event.bride }`
                else event.title = 'Relationship with '+event.groom
                }
            else {
                if (person.male) event.title = `Marriage to ${ getName('', event.bid, 'kf', true) }` 
                else event.title = `Marriage to ${ getName('', event.gid, 'kf', true) }`
                }
            }

            // get occupation for display in right panel
            if (person.male && event.gocc) event.occ = event.gocc
            else if (event.bocc) event.occ = event.bocc
            else event.occ = ''
            event.border = 'marriage'
            event.type = 'marriage'
            event.relation = 'self'
            }





        // RELATIVE MARRIES
        else if (event.type == 'marriage') {
            console.log('RELATIVE MARRIES', event)
            // find the event data
            var ptr = null
            var sourceDataNotFound = false
            var couple = event.person.split('^')
            if (db[couple[0]] && db[couple[0]].marriages && db[couple[0]].marriages[couple[1]]) ptr = db[couple[0]].marriages[couple[1]]
            else if (db[couple[1]] && db[couple[1]].marriages && db[couple[1]].marriages[couple[0]]) ptr = db[couple[1]].marriages[couple[0]]
            else sourceDataNotFound = true
            
            for (x in ptr) event[x] = ptr[x]
            
            if (sourceDataNotFound) {
                console.log('%cCouple data not found!','color:red; font-weight:bold;',couple[0],'+',couple[1])
                record += `<p>${ getName('', couple[0], 'kg', true, event.timestamp) } marries ${ getName('', couple[1], 'kg', true, event.timestamp) }. <span style="font-size:small;font-style:italic;">(Source needed.)</span></p>`
                }
            
            else {
                if (event.discussion) {
                    record += '<img class="commentaryIcon" src="lib/i/discn.png" alt="Commentary" title="Commentary notes for this event." onclick="alert(`' + event.discussion + '`)">'
                    }
                if (event.caution) {
                    record += '<img class="commentaryIcon" src="lib/i/caution.png" alt="Caution" title="Cautionary notes for this event." onclick="alert(`' + event.caution + '`)">'
                    }

                record += '<p>'
                if (event.relation === 'daughter') { 
                    record += person.given+'\'s daughter '+getName('', event.bid, 'kg', true, event.timestamp)+' married '+getName('', event.gid, 'gkf', true)+getDatePhrase(event.date,event.timestamp.substr(0,4))
                    if (event.place) record += ' at '+event.place.split('http')[0].trim()
                    record += '.</p>'
                    }
                if (event.relation.toLowerCase() === 'son') {
                    record += person.given+'\'s '+event.relation.toLowerCase()+' '+getName('', event.gid, 'given', true, event.timestamp)+' married '+getName('', event.bid, 'both', true)+getDatePhrase(event.date,event.timestamp.substr(0,4))
                    if (event.place) record += ' at '+event.place.split('http')[0].trim()
                    record += '.</p>'
                    }
                if (event.relation.toLowerCase() === 'father') {
                    record += person.given+'\'s '+event.relation.toLowerCase()+' '+getName('', event.gid, 'given', true, event.timestamp)+' married '+getName('', event.bid, 'both', true)+getDatePhrase(event.date,event.timestamp.substr(0,4))
                    if (event.place) record += ' at '+event.place.split('http')[0].trim()
                    record += '.</p>'
                    }
                if (event.relation.toLowerCase() === 'mother') {
                    record += person.given+'\'s '+event.relation.toLowerCase()+' '+getName('', event.bid, 'given', true, event.timestamp)+' married '+getName('', event.gid, 'both', true)+getDatePhrase(event.date,event.timestamp.substr(0,4))
                    if (event.place) record += ' at '+event.place.split('http')[0].trim()
                    record += '.</p>'
                    }

                if (event.relation.toLowerCase() === 'daughter' && event.gfid) {
                    record += '<p>The father of the groom was '+getName('', event.gfid, 'both', true)
                    if (event.gfocc) record += ', '+event.gfocc
                    record += '. '
                    if (event.bfocc) record += ' The occupation of '+getName('', event.bfid, 'both', true)+' was '+event.bfocc+'. '
                    record += '</p>'
                    }
                if (event.relation.toLowerCase() === 'son' && event.bfid) {
                    record += '<p>The father of the bride was '+getName('', event.bfid, 'both', true)
                    if (event.bfocc) record += ', '+event.bfocc
                    record += '. '
                    if (event.gfocc) record += ' The occupation of '+getName('', event.gfid, 'both', true)+' was '+event.gfocc+'. '
                    record += '</p>'
                    }
                else if (event.relation === 'son' && event.bfather) {
                    record += '<p>The father of the bride was '+event.bfather
                    if (event.bfocc) record += ', '+event.bfocc
                    record += '. '
                    if (event.gfocc) record += ' The occupation of '+getName('', event.gfid, 'both', true)+' was '+event.gfocc+'. '
                    record += '</p>'
                    }
                if (event.notes) record += getNotes(event.notes, event.timestamp)
                if (event.fnotes) record += getFNotes(event.fnotes, event.timestamp)
                event.background = 'other'


                // prepare information for elsewhere
                if (event.sources) details = formatSource(event.sources, event.discussion)

                if (event.relation === 'son') event.title = `<span style="font-size:90%; white-space: normal;">${ getName('', event.gid, 'k', true) } marries ${ getName('', event.bid, 'kf', true) }</span>`
                else event.title = `<span style="font-size:90%; white-space: normal;">${ getName('', event.bid, 'k', true) } marries ${ getName('', event.gid, 'kf', true) }</span>`


                // get the parent's occupation, checking gender
                if (event.relation === 'son' && event.gfocc && person.male) event.occ = event.gfocc
                if (event.relation === 'daughter' && event.bfocc && person.male) event.occ = event.bfocc
                event.place = ''
                }
            }





        if (event.type === 'note') {
            // add the census details to event
            if (trace) console.log('redisplay: Note ',person, person.events[event.timestamp])
            for (x in person.events[event.timestamp]) event[x] = person.events[event.timestamp][x]
            if (event.sharednote) for (x in notae[event.sharednote]) event[x] = notae[event.sharednote][x]

            console.log(here,here,'EVENT after notes merge',event)

            isoDate = new Date(event.timestamp)
            event.date = new Intl.DateTimeFormat('en-GB', dateOptions).format(isoDate)
            event.date = new Intl.DateTimeFormat('en-GB', dateOptions).format(event.dateObj)
    
            if (event.notes) record += getNotes(event.notes, event.timestamp)
            if (event.fnotes) record += getFNotes(event.fnotes, event.timestamp)
            
            details = formatSource(event.sources, event.discussion)



            // prepare information for elsewhere
            if (db[event.person] && db[event.person].death) details = formatSource(event.sources, event.discussion)

            event.useGPS = true
            }




        if (event.type === 'figure') {
            // add the details to event
            for (x in person.events[event.timestamp]) event[x] = person.events[event.timestamp][x]
            console.log(here,here, here,events)
            record += `<figure><p><a href="${ project}/${ event.img }" target="_blank"><img src="${ window.project}/${ event.img }" alt=""/></a></p>`
            record += `<figcaption>${ event.caption}</figcaption></figure>`
            details = formatSource(event.sources, "")
            title = ''
            }





//. ****** NOTE THAT THE DETAILS PANEL USED TO INCLUDE LOTS OF LINKS TO IMAGES, GPS, ETC AND DISCUSSION TEXT. NOW THAT'S ONLY DISPLAYED VIA ICONS IN THE RIGHT SIDE PANEL. ALSO, DISPLAY DATA KEY-VALUE PAIRS ARE NO LONGER SHOWN.

// info needed coming into this section: event.title, details, event.type/occ/place


        // clarify occupation for right panel
        if (typeof event.occ === 'undefined') event.occ = ''
        //if (typeof event.of !== 'undefined') event.place = event.of
        if (typeof event.place === 'undefined') event.place = ''
        if (typeof event.timestamp === 'undefined') alert('event.timestamp undefined for '+events[e])


        // draw age + year 
		//out += '<div class="dateAndRecord">'
        if (event.type === 'marriage') out += `<div class="dateAndRecord marries" id="${ event.timestamp }">`
		else out += `<div class="dateAndRecord ${ event.type }" id="${ event.timestamp }">`
        out += '<div><div class="recordDate"'
		if (event.type === 'background' || event.type === 'figure') out += ' style="background-color:transparent;">'
		else out += '><span class="recordDateAge">'+getAgeTS('', event.timestamp, birth, '')+'</span><span class="recordDateAge" style="font-size:1px;line-height:1px;"> &bull; </span><span class="theYear">'+event.timestamp.substr(0,4)+'</span>'
        out += '</div>'
        out += '</div>'
         
        relationType = 'otherRelative'
        
        if (event.relation === 'son' || event.relation === 'daughter' || event.relation === 'husband' || event.relation === 'wife' || event.relation === 'father' || event.relation === 'mother' || event.relation === '@') relationType = 'closeRelation'
        
        if (event.relation === 'self' || event.type === 'census' || event.type === 'note') relationType = 'closeRelation selfRelation'
        
        out += '<div class="record '+relationType+' '+event.border+' '+event.background+'">'
      
		// add the record title and any floating icons
		out += '<div class="titleEtc">\n'
		if (event.type !== 'background' && event.type !== 'figure') out += '<p class="recordTitleAge">'+getAgeTS('', event.timestamp, birth, '')+'</p>'
		out += '<p class="recordTitle"'
        if (event.titleColour) out += ` style="color:${ event.titleColour }"`
        out += '>'+event.title+'</p>'
        
        out += '</div>\n'
        
        out += '<div class="descriptionText">' + record + '</div>'
        
        if (event.type !== 'background' && event.type !== 'figure') out += '<details><summary></summary><pre>'+details+'</pre></details>'
        out += '</div>\n' // close record
        
        //keypoints here
        out += '<div class="keypoints kp'+event.type+'">'
		out += '<div class="occ">'+event.occ+'</div>'
        if (event.of) {
            out += `<div class="place"`
            if (event.athome) out += ` data-athome="${ event.athome }"`
            out += `>${ event.of.split('http')[0].trim() }</div>`
            }
        else if (event.place) {
            out += `<div class="place"`
            if (event.athome) out += ` data-athome="${ event.athome }"`
            out += `>${ event.place.split('http')[0].trim() }</div>`
            }
        if (person.male && event.gparish) out += '<div class="place">res: '+event.gparish.split('http')[0].trim()+'</div>'
        else if (event.bparish)  out += '<div class="place">res: '+event.bparish.split('http')[0].trim()+'</div>'
        
        // create the floated icon links
        floatedIcons = ''
        if (event.images) {
            for (j=0;j<event.images.length;j++) {
                floatedIcons += addFIcon(event.images[j],'record')
                }
            }
        
        //console.log(event)
        if (event.of && event.of.split('http')[1]) floatedIcons += addFIcon(event.of,'gps')
        else if (event.place && event.place.split('http')[1]) floatedIcons += addFIcon(event.place,'gps')
        if (person.male && event.gparish && event.gparish.split('http')[1]) floatedIcons += addFIcon(event.gparish,'gps')
        else if (event.bparish && event.bparish.split('http')[1]) floatedIcons += addFIcon(event.bparish,'gps')
        if (event.bapplace && event.bapplace.split('http')[1]) floatedIcons += addFIcon(event.bapplace,'gps')
        if (event.burplace && event.burplace.split('http')[1]) floatedIcons += addFIcon(event.burplace,'gps')
        
        if (event.gps) {
            for (j=0;j<event.gps.length;j++) {
                floatedIcons += addFIcon(event.gps[j],'gps')
                }
            }

        if (event.links) {
            for (j=0;j<event.links.length;j++) {
                floatedIcons += addFIcon(event.links[j],'link')
                }
            }
        out += `<div class="floatedIcons">${ floatedIcons }</div>`
        out += '<div style="font-size:60%">'+event.timestamp+'</div>'
        if (event.relation === 'self' || (event.type === 'marriage' && event.relation === 'self')) {
            // find the one with the marriage data
            if (event.bid || event.gid || event.person) {
                spouse = ''
                if (event.bid === id) spouse = event.gid
                else if (event.gid) spouse = event.bid
                else if (event.person) spouse = event.person
                href = `?project=${ project }&person=${ id }&spouse=${ spouse }`
                }
            else 
            href = `?project=${ project }&person=${ id }`
            switch (event.type) {
                case 'born': href = 'lib/forms/birthentry.html'+href; break
                case 'dies': href = 'lib/forms/dthentry.html'+href; break 
                case 'marriage': href = 'lib/forms/marriageentry.html'+href; break 
                default: href='neither'
                }
            out += `<div><a target="_blank" href="${ href }"><img src="lib/i/edit.svg" style="height:1.4rem;"></a></div>`
            }
        if (event.type === 'note') {
            href = `lib/forms/evententry.html?project=${ project }&person=${ id }&timestamp=${ event.timestamp }`
            out += `<div><a target="_blank" href="${ href }"><img src="lib/i/edit.svg" style="height:1.4rem;"></a></div>`
            }
        out += '</div>'
        out += '</div>\n'
        
        
        }





        // add research notes, if there are any
        if (researchNotes && researchNotes.trim() !== '') {
            researchNotes = researchNotes.replace(/(http(s)?:\/\/[^\s]+)/g, '<a href="$&" target="_blank">link</a>')
            out += '<details'
            if (localStorage.ancestryShowResearch == 'yes') out += ' open'
            out += '><summary '
            out += ' onclick="if (parentNode.open) {localStorage.ancestryShowResearch = \'no\';} else {localStorage.ancestryShowResearch = \'yes\';}"'
            out += ' style="text-align:center; margin-inline-end: 3em; margin-top: 2em; text-transform: uppercase; font-family: \'Source Sans Pro\', \'Helvetica Neue\', Arial, sans-serif; font-size: 100%; color:#666;">Notes &amp; research</summary>\n<p style="white-space: pre-wrap; font-size:90%;margin-inline:9rem;">'
            out += researchNotes
            out += '</p>\n</details>'
            }



    out += '<div id="places">'

    if (person.places) {
        placeRecords = person.places.split(',')
        console.log(placeRecords)
        placesOut = ''
        for (p=0;p<placeRecords.length;p++) {
            console.log(placesDB[placeRecords[p]])
            record = placeRecords[p].trim()
            if (typeof placesDB[record] === 'undefined') {
                console.log('Couldnt find:'+placeRecords[p])
                continue
                }
            if (placesDB[record].gps || placesDB[record].desc) {
                console.log("Going forward with:"+placeRecords[p])
                 placesOut += `<span class="placesRecord">${ placesDB[record].p }`
                 if (placesDB[record].desc) placesOut += `<a target="_blank" href="${ placesDB[record].desc }"><img src="lib/i/info.png" alt="Info"></a>`
                 if (placesDB[record].gps) placesOut += `<a target="_blank" href="${ placesDB[record].gps }"><img src="lib/i/map.png" alt="GPS"></a>`
                 placesOut += "</span>"
                 }
            }
        out += `<details open><summary>Places</summary><p>${ placesOut }</p></details>`
        }




    // show all events
    out += '<details id="networkList" style="display:none;"><summary>FAMILY NETWORK DATA</summary>'
    for (e=0;e<events.length;e++) {
        var eventfields = events[e].split('\t')
        out += `<p>${ eventfields[0] } ${ eventfields[2] } ${ eventfields[3] } ${ eventfields[1] } </p>`
        }
    out += '</details>'
    
    

    out += '</div>'
    
    
    
    
    out += '</div>' 

    if (trace) console.log(exit,'redisplay')
	return out
    }




function getNotes (notes, timestamp) {
    var record = ''
    notes = notes.split('\n')
    for (n=0;n<notes.length;n++) {
        if (notes[n] !== '') {
            if (notes[n].startsWith('intro:')) record += `<p class="noteIntro">${ replaceNames(notes[n].replace('intro: ',''), timestamp) }</p>`
            else if (notes[n].startsWith('title:')) record += `<p style="font-weight:bold">${ replaceNames(notes[n].replace('title: ',''), timestamp) }</p>`
            else if (notes[n].startsWith('note:')) record += `<p>${ replaceNames(notes[n].replace('note: ',''), timestamp) }</p>`
            else if (notes[n].startsWith('quote:')) record += `<p><q>${ replaceNames(notes[n].replace('quote: ',''), timestamp) }</q></p>`
            else record += `<p>${ replaceNames(notes[n], timestamp) }</p>`
            }
        }
    return record
    }



function getFNotes (notes) {
    var record = ''
    if (notes.length > 0) {
        record += '<div class="footnotes"><p>Notes</p><ol>'
        for (n=0;n<notes.length;n++) record += '<li>'+notes[n]+'</li>'
        record += '</ol></div>'
        return record
        }
    }



function showProbates (person) {
    var out, allNames
    out = '<h4>Named in probate:</h4><ul>'
    allNames = Object.keys(db)
    allNames.forEach(name => { 
        if (db[name].death && db[name].death.namedInProbate && db[name].death.namedInProbate.includes(person)) out += 
        `<li>${ db[name].death.timestamp.substr(0,4) } <a href="person.html?project=${ project }&person=${ name }" target="_blank">${ getName('',name,'kf',false) }</a></li>`
        })
    out += '</ul>'

    return out
    }



function showAppearsIn (person) {
    out = '<h4>Mentioned in:</h4><ul>'
    allNames = Object.keys(db)
    allNames.forEach(name => { 
        if (db[name].marriages) {
            var spouses = Object.keys(db[name].marriages)
            for (var i=0;i<spouses.length;i++) {
                if (db[name].marriages[spouses[i]].mentioned && db[name].marriages[spouses[i]].mentioned.includes(person)) out += 
                `<li>Marriage record: ${ db[name].marriages[spouses[i]].timestamp.substr(0,4)} <a href="person.html?project=${ project }&person=${ name }">${ getName('',name,'kf',false) }</a></li>`
                
                if (db[name].death && db[name].death.mentioned && db[name].death.mentioned.includes(person)) out += 
                `<li>Death record: ${ db[name].death.timestamp.substr(0,4) } <a href="person.html?project=${ project }&person=${ name }" target="_blank">${ getName('',name,'kf',false) }</a></li>`
                
                if (db[name].birth && db[name].birth.mentioned && db[name].birth.mentioned.includes(person)) out += 
                `<li>Death record: ${ db[name].birth.timestamp.substr(0,4) } <a href="person.html?project=${ project }&person=${ name }" target="_blank">${ getName('',name,'kf',false) }</a></li>`
                }
            }
        })
    out += '</ul>'

    return out
    }




function showInformants (person) {
    out = '<h4>Named as an informant:</h4><ul>'
    allNames = Object.keys(db)
    allNames.forEach(name => { 
        if (db[name].birth) {
            if (db[name].birth.informant && db[name].birth.informant.includes(person)) out += `<li>${ db[name].birth.timestamp.substr(0,4) } <a href="person.html?project=${ project }&person=${ name }">${ getName('',name,'kf',false) }</a> birth</li>`
            }
        })
    allNames.forEach(name => { 
        if (db[name].death) {
            if (db[name].death.informant && db[name].death.informant.includes(person)) out += `<li>${ db[name].death.timestamp.substr(0,4) } <a href="person.html?project=${ project }&person=${ name }">${ getName('',name,'kf',false) }</a> death</li>`
            }
        })
    out += '</ul>'
    
    return out
    }



function showWitnesses (person) {
    out = '<h4>Named as witness:</h4><ul>'
    allNames = Object.keys(db)
    allNames.forEach(name => { 
        if (db[name].marriages) {
            var spouses = Object.keys(db[name].marriages)
            for (var i=0;i<spouses.length;i++) {
                //if (db[name].marriages[spouses[i]].witnesses && db[name].marriages[spouses[i]].witnesses.includes(person)) out += '<li>'+db[name].marriages[spouses[i]].timestamp.substr(0,4) + ' '+getName('',name,'kf',false)+' '+name+'</li>'
                if (db[name].marriages[spouses[i]].witnesses && db[name].marriages[spouses[i]].witnesses.includes(person)) out += 
                `<li>${ db[name].marriages[spouses[i]].timestamp.substr(0,4)} <a href="person.html?project=${ project }&person=${ name }">${ getName('',name,'kf',false) }</a></li>`
                }
            }
        })
    out += '</ul>'

    return out
    }




function showCensusEntries(person) {

    // Output buffer
    let out = '<h4>Census entries:</h4><ul>'

    // Indices within the semicolon‑separated census string
    const AGE_INDEX = 2
    const BIRTHPLACE_INDEX = 5

    // Roles to check, mapped to the property name in censi
    const ROLES = {
        head: 'head',
        wife: 'wife',
        child: 'children',
        other: 'others',
        servant: 'serv',
        visitor: 'visitors'
        }

    // Loop through each census household
    Object.keys(censi).forEach(name => {

        // Extract the census year from the household key (first 4 chars)
        const censusYear = parseInt(name.substr(0, 4), 10)

        // Check each role type
        for (const [label, key] of Object.entries(ROLES)) {

            const entry = censi[name][key]
            if (!entry) continue

            // Normalise to array (head/wife are strings, others are arrays)
            const entries = Array.isArray(entry) ? entry : [entry]

            entries.forEach(record => {

                // Only process if this record contains the target person
                if (!record.includes(person)) return

                const parts = record.split(';')
                const birthplace = parts[BIRTHPLACE_INDEX]
                const age = parseInt(parts[AGE_INDEX], 10)

                // Estimate birth year if age is valid
                const estBirthYear = Number.isFinite(age)
                    ? censusYear - age
                    : 'unknown'

                out += `<li>${censusYear} ${label}, <i>born at</i> ${birthplace} <i>age</i> ${age} <i>est. birth year</i> ${estBirthYear}</li>`
                })
            }
        })

    out += '</ul>'
    return out
    }





function cleanYear (year) {
	if (year.trim() === '' || year.trim() === '?') return ''
	year = year.replace(/by|bef|aft|abt|~|\*|,/g, '')
	return year.trim()
	}




function checkBMD (individual) {
    if (trace) console.log('checkBMD('+individual+')')
    
	var person = db[individual]
	var out = ''
	var i, j, k, parent
	
	
	// initialise list of records
	records = []
	var sibling, siblingType, year, spouse, marriageList, child, childType, byear, dyear
	
	
	// get birth & death
	if (person.b) { records.push(getTimestamp(person.bdate, person.b)+'\t'+thisPerson+'\tself\tborn'); birth = getTimestamp(person.bdate, person.b) }
    //if (person.upto) { records.push(getTimestamp('31 Dec', person.upto.toString())+' '+thisPerson+' self upto'); death = getTimestamp('31 Dec', person.upto.toString()) }
	if (person.d) { records.push(getTimestamp(person.ddate, person.d)+'\t'+thisPerson+'\tself\tdies'); death = getTimestamp(person.ddate, person.d) }
	
		
	// get siblings
	if (db[person.father]) parent = db[person.father]
	else if (db[person.mother]) parent = db[person.mother]
	if (parent && parent.fg) { 
		for (var i=0;i<parent.fg.length;i++) {
			for (var j=2;j<parent.fg[i].length;j++) {
				if (db[parent.fg[i][j]]) {
					sibling = parent.fg[i][j]
					if (db[sibling].male) type = 'brother'
					else type = 'sister'
                    if (db[parent.fg[i][j]].b !== '' && parent.fg[i][j] !== thisPerson) records.push(getTimestamp(db[parent.fg[i][j]].bdate, db[parent.fg[i][j]].b)+'\t'+parent.fg[i][j]+'\t'+type+'\tborn')
                    if (db[parent.fg[i][j]].d !== '' && parent.fg[i][j] !== thisPerson) records.push(getTimestamp(db[parent.fg[i][j]].ddate, db[parent.fg[i][j]].d)+'\t'+parent.fg[i][j]+'\t'+type+'\tdies')
					}
				}
			}
		}

	// get marriage
	if (person.fg) {
		for (i=0;i<person.fg.length;i++) {
            // get the timestamp
            marriageTimestamp = person.fg[i][0]
            if (person.marriages && person.marriages[person.fg[i][1]]) marriageTimestamp = person.marriages[person.fg[i][1]].timestamp
            else if (db[person.fg[i][1]] && db[person.fg[i][1]].marriages && db[person.fg[i][1]].marriages[individual]) marriageTimestamp = db[person.fg[i][1]].marriages[individual].timestamp
            else {
                console.log('Couldnt find partner marriage.')
                //console.log('Was looking for ', individual)
                //console.log('Was looking for ', db[person.fg[i][1]])
                //console.log('Was looking for ', db[person.fg[i][1]].marriages)
                //console.log('Was looking for ', db[person.fg[i][1]].marriages[individual])
                }
            
            records.push(marriageTimestamp+'\t'+person.fg[i][1]+'\tspouse\tmarriage')
            //records.push(person.fg[i][0]+'\t'+person.fg[i][1]+'\tspouse\tmarriage')
			}
		}

	// get spouse death
	if (person.fg) {
		for (i=0;i<person.fg.length;i++) {
			var spouse = person.fg[i][1]
			if (db[spouse] && db[spouse].d) {
				if (db[spouse].male) type = 'husband'
				else type = 'wife'
				records.push(getTimestamp(db[spouse].ddate, db[spouse].d)+'\t'+spouse+'\t'+type+'\tdies')
				}
			}
		}

	// get children
	if (person.fg) { 
		for (i=0;i<person.fg.length;i++) {
			for (j=2;j<person.fg[i].length;j++) {
				if (db[person.fg[i][j]]) {
					child = person.fg[i][j]
					if (db[child].male) type = 'son'
					else type = 'daughter'
					if (db[child].b) records.push(getTimestamp(db[child].bdate, db[child].b)+'\t'+child+'\t'+type+'\tborn')
					if (db[child].d) records.push(getTimestamp(db[child].ddate, db[child].d)+'\t'+child+'\t'+type+'\tdies')
					}
				}
			}
		}

	// get parents death
	if (db[person.father]) { 
        if (db[person.father].d) {
			records.push(getTimestamp(db[person.father].ddate, db[person.father].d)+'\t'+person.father+'\tfather\tdies')
			}
		}
	if (db[person.mother]) { 
		if (db[person.mother].d) {
			records.push(getTimestamp(db[person.mother].ddate, db[person.mother].d)+'\t'+person.mother+'\tmother\tdies')
			}
		}


	// get grandparents death
	var gparent
	if (db[person.father]) { 
		if (db[person.father].father && db[db[person.father].father] && db[db[person.father].father].d) {
            records.push(getTimestamp(db[db[person.father].father].ddate, db[db[person.father].father].d)+'\t'+db[person.father].father+'\tgrandfather\tdies')
			}
		if (db[person.father].mother && db[db[person.father].mother] && db[db[person.father].mother].d) {
            records.push(getTimestamp(db[db[person.father].mother].ddate, db[db[person.father].mother].d)+'\t'+db[person.father].mother+'\tgrandmother\tdies')
			}
		}
	if (db[person.mother]) { 
		if (db[person.mother].father && db[db[person.mother].father] && db[db[person.mother].father].d) {
            records.push(getTimestamp(db[db[person.mother].father].ddate, db[db[person.mother].father].d)+'\t'+db[person.mother].father+'\tgrandfather\tdies')
			}
		if (db[person.mother].mother && db[db[person.mother].mother] && db[db[person.mother].mother].d) {
            records.push(getTimestamp(db[db[person.mother].mother].ddate, db[db[person.mother].mother].d)+'\t'+db[person.mother].mother+'\tgrandmother\tdies')
			}
		}


	// get child marriages
	if (person.fg) { 
		for (i=0;i<person.fg.length;i++) {
			for (j=2;j<person.fg[i].length;j++) {
				if (db[person.fg[i][j]]) {
					child = person.fg[i][j]
					if (db[child].male) type = 'son'
					else type = 'daughter'
					if (db[child].fg) {
						for (k=0;k<db[child].fg.length;k++) {
							 records.push(db[child].fg[k][0]+'\t'+child+'^'+db[child].fg[k][1]+'\t'+type+'\tmarriage')
							}
						}
					}
				}
			}
		}


	// get parent marriages
	if (db[person.father]) { 
        if (db[person.father].fg) {
            parentFG = db[person.father].fg
            for (i=0;i<parentFG.length;i++) {
                console.log('PARENT MARRIAGE ', `${ parentFG[i][0] }\t'${ person.father }^${ parentFG[i][1] }\tfather\tmarriage`)
                records.push(`${ parentFG[i][0] }\t${ person.father }^${ parentFG[i][1] }\tfather\tmarriage`)
                }
			}
		}

	if (db[person.mother]) { 
        if (db[person.mother].fg) {
            parentFG = db[person.mother].fg
            for (i=0;i<parentFG.length;i++){
                console.log('PARENT MARRIAGE ', `${ parentFG[i][0] }\t'${ person.mother }^${ parentFG[i][1] }\tmother\tmarriage`)
                records.push(`${ parentFG[i][0] }\t${ person.mother }^${ parentFG[i][1] }\tmother\tmarriage`)
                }
			}
		}
	}







function getPersonData (relative) {
	if (trace) console.log('getPersonData(', relative,',')

    document.getElementById('in').textContent = relative.timeline
    counter--
	}



function setUpPage (thisPerson) {
    // console.log(enter,'setUpPage('+thisPerson+')')

    // set tagged flags from localstorage
    projectFlags= project+'flags'
    if (localStorage[projectFlags]) {
        flagList = localStorage[projectFlags].split('\n')
        for (i=0;i<flagList.length;i++) if (db[flagList[i]]) db[flagList[i]].tagged = true 
        }
    
	checkBMD(thisPerson)
	document.getElementById('out').innerHTML = redisplay(document.getElementById('in').textContent,thisPerson,document.getElementById('summaryIn'))

	var dob = thisPerson.split('_')
	if (localStorage.ancestryHideRelatives === 'yes') toggleRelatives(document.getElementById('toggleRelatives'))
	if (localStorage.ancestryHideHistory === 'no') toggleHistory(document.getElementById('toggleEvents'), dob[dob.length-1])
	if (localStorage.ancestryExpandDetail === 'yes') toggleDetails(document.getElementById('toggleDetails'))
	
    if (trace) console.log(exit, 'setUpPage')
	}



function prepCopy () {
    // blanks out various parts of the page so that the basic data can be copied, eg. to CoPilot
    
    keypoints = document.querySelectorAll('.keypoints')
    for (i=1;i<keypoints.length;i++) {
        keypoints[i].style.display = 'none'
        }
    
    document.getElementById('floatingLinks').style.visibility = 'hidden'
    
    ls = document.querySelector('.life_summary')
    //const ls = document.getElementById('life_summary')
    console.log('ls',ls)
    if (ls !== null) ls.style.display = 'none'
    
    //document.getElementById('#life_summary').style.display = 'none'
    const lsSwitch = document.getElementById('summaryToggle')
    console.log(lsSwitch)
    if (lsSwitch !== null) lsSwitch.style.display = 'none'
    
    ages = document.querySelectorAll('.recordTitleAge')
    for (i=0;i<ages.length;i++) {
        ages[i].innerHTML = '<span style="font-size: 1rem;">Aged</span> '+ages[i].textContent
        }
    
    ages = document.querySelectorAll('.ageTag')
    for (i=0;i<ages.length;i++) {
        ages[i].innerHTML = ` aged ${ ages[i].textContent }`
        }
    
    titles = document.querySelectorAll('.recordTitle')
    for (i=0;i<titles.length;i++) {
        titles[i].style.display = 'none'
        }
    
    censusSummary = document.querySelectorAll('.censusSummary')
    for (i=0;i<censusSummary.length;i++) {
        censusSummary[i].style.display = 'none'
        }
    }









function showBreadcrumbs () {
    // displays places list or narrative in summary 
    
    //const summaryNode = document.querySelectorAll('.life_summary')
    const summaryNode = document.getElementById('life_summary')
    if (summaryNode === null) return

    placeLines = places.split('\n')
    
    out = `<p style="margin-block-end: 2rem; font-size: 90%;">Breadcrumbs are events that indicate where a person was living. (Unless contradictory evidence is available, it is assumed that a child lived in the same place that brothers and sisters are born.) For some people, a link in the box under the <img src="lib/i/map_pin.png" alt="Click to see on a map" style="height:.8rem; vertical-align: middle;"> icon to the right opens a map that plots all locations.</p>`
    
    out += '<table id="lifeSummaryTable" style="font-size:80%; margin-inline:5rem;">'
    out += '<tr><th>Age</th><th>Year</th><th style="text-align:start; padding-inline:1em;">Location</th><th id="eventTH" style="text-align:start; padding-inline:1em;">Event</th><th id="mapLinkTH" colspan="2" style="text-align:end; white-space:pre;">Map link</th></tr>'

    lastBeforeColon = null;   // reset location for previous line

    for (i=2;i<placeLines.length;i++) {
        if (placeLines[i].trim() === '') continue
        out += `<tr>${ convertLineToRow(placeLines[i]) }</td></tr>`
        }
    out += '</table>'
    //narrative = summaryNode.innerHTML
    summaryNode.innerHTML = out
    
    assignHelpText()
    }






/*
function toggleLifeSummary () {
    // displays places list or narrative in summary 
    
    //const summaryNode = document.querySelectorAll('.life_summary')[1]
    const summaryNode = document.getElementById('#life_summary')
    const summaryToggle = document.getElementById('summaryToggle')
    
    if (summaryNode === null) return

    if (summaryToggle.textContent.trim() === '\u2190 Show location breadcrumbs') {
        placeLines = places.split('\n')
        out = '<table id="lifeSummaryTable" style="font-size:80%; margin-inline:5rem;">'
        out += '<tr><th>Age</th><th>Year</th><th style="text-align:start; padding-inline:1em;">Location</th><th id="eventTH" style="text-align:start; padding-inline:1em;">Event</th><th id="mapLinkTH" colspan="2" style="text-align:end; white-space:pre;">Map link</th></tr>'

        lastBeforeColon = null   // reset location for previous line

        for (i=2;i<placeLines.length;i++) {
            if (placeLines[i].trim() === '') continue
            //placeCells = 
            out += `<tr>${ convertLineToRow(placeLines[i]) }</td></tr>`
            }
        out += '</table>'
        narrative = summaryNode.innerHTML
        summaryNode.innerHTML = out
        document.getElementById('summaryToggle').textContent = '\u2190 Show narrative description'
        }
        
    else {
        summaryNode.innerHTML = narrative
        document.getElementById('summaryToggle').textContent = '\u2190 Show location breadcrumbs'
        }
    
    assignHelpText()
    }

*/


let lastBeforeColon = null  // captures location value for previous table row


function convertLineToRow (line) {
    // 0. Extract the age at the start (digits before the first comma)
    const ageMatch = line.match(/^(\d+),/)
    const age = ageMatch ? ageMatch[1] : ''
    const lineWithoutAge = ageMatch ? line.slice(ageMatch[0].length) : line

    // 1. Extract the quoted section (which may contain commas)
    const quotedMatch = lineWithoutAge.match(/^"([^"]*)"/)
    if (!quotedMatch) return ''

    const quoted = quotedMatch[1]

    // Remove the quoted part + following comma from the line
    const remainder = lineWithoutAge.slice(quotedMatch[0].length + 1)

    // 2. Extract the year (first token inside the quoted text)
    const yearMatch = quoted.match(/^(\d{4})\s+(.*)$/)
    const year = yearMatch ? yearMatch[1] : ''
    const afterYear = yearMatch ? yearMatch[2] : quoted

    // 3. Split the remaining quoted text at the first colon
    const colonIndex = afterYear.indexOf(':')
    const beforeColon = colonIndex !== -1 ? afterYear.slice(0, colonIndex).trim() : afterYear
    const afterColon = colonIndex !== -1 ? afterYear.slice(colonIndex + 1).trim() : ''

    // Ditto logic
    let displayBeforeColon = beforeColon;
    if (lastBeforeColon !== null && beforeColon === lastBeforeColon) {
        //displayBeforeColon = '\u00A0 \u3003'
        displayBeforeColon = '\u00A0 \u2033'
        }
    lastBeforeColon = beforeColon

    // 4. Split the remainder by commas → GPS1, GPS2, final value
    const parts = remainder.split(',')
    const lat = parts[0]
    const lon = parts[1]
    const finalVal = parts.slice(2).join(',').trim()

    // 5. Build the link around finalVal instead of "GO"
    let linkedFinalVal = `<a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank">${finalVal}</a>`

    // --- NEW RULE: if ditto, blank out the last column ---
    if (displayBeforeColon.includes('\u2033')) {
        linkedFinalVal = '&nbsp;'
        }

    // 6. Build the <tr> with <td> cells (GO column removed)
    return `
<tr>
  <td style="color:#FFDEAF; font-size:1.4em;background:gray; padding-block:0; padding-inline:0.25em; text-align:center; border-radius:0.5em; vertical-align:middle;">${age}</td>
  <td>${year}</td>
  <td>${displayBeforeColon}</td>
  <td>${afterColon}</td>
  <td style="white-space:pre; padding-inline:0.2em; font-size:90%; text-align:end;">${linkedFinalVal}</td>
</tr>`
}










function attachHelpPopup(element, message) {
    const popup = document.getElementById('helpPopup')
    if (!element || !popup) return

    element.addEventListener('mouseover', () => {
        if (!showHelpPopups) return
        popup.innerHTML = message
        popup.style.display = 'block'

        const rect = element.getBoundingClientRect()
        const popupRect = popup.getBoundingClientRect()

        let top = rect.top - popupRect.height - 8
        let left = rect.left + (rect.width - popupRect.width) / 2

        if (top < 0) top = rect.bottom + 8
        if (left < 0) left = 8
        if (left + popupRect.width > window.innerWidth) {
            left = window.innerWidth - popupRect.width - 8
            }

        popup.style.top = `${top + window.scrollY}px`
        popup.style.left = `${left + window.scrollX}px`
        })

    element.addEventListener('mouseout', () => {
        if (!showHelpPopups) return
        popup.style.display = 'none'
        })
    }









function makeEventTable (str) {
	// Split input into lines
	const lines = str.trim().split('\n')
	
	// Extract header row and data rows
	const header = lines[0].split('\t')
	const rows = lines.slice(1)
	
	// Track previous values for blanking / ditto logic
	let prevAge = ''
	let prevYear = ''
	let prevLocation = ''
	let out = ''
    
	// Begin table with class and inline style
	/*if (typeof intro !== 'undefined') out += `<p style="margin-block-end: 2rem; font-size:90%;">${ intro }</p>`
    else out += `<p style="margin-block-end: 2rem; font-size:90%;">${ makeIntro(personID, db[personID])}</p>`*/
    
	out += `<p style="margin-block-end: 2rem; font-size:90%;">${ makeIntro(personID, db[personID])}</p>`
    
    out += '<table class="listTable" style="font-size: 80%; margin-inline: 5rem;">'
	
	// Add header row
	out += '<tr>'
	for (let i = 0; i < header.length; i++)
		out += `<th>${ header[i] }</th>`
	out += '</tr>'
	
	// Process each data row
	for (let i = 0; i < rows.length; i++) {
		// Split row into fields
		const parts = rows[i].split('\t')
		
		// Extract fields
		let age = parts[0]
		let year = parts[1]
		let event = parts[2]
		let occupation = parts[3]
		let location = parts[4]
		
		// Uppercase first letter of event if present
		if (event) event = event.charAt(0).toUpperCase() + event.slice(1)
		
		// Blank age if same as previous
		if (age === prevAge) age = ''
		
		// Blank year if same as previous AND age is blank
		if (age === '' && year === prevYear) year = ''
		
		// Replace location with ditto mark if same as previous non-empty location
		if (location && location === prevLocation && prevLocation !== '') location = '&nbsp; &nbsp; ″'
		
		// Begin row
		out += '<tr>'
		
		// Add cells
		if (age !== '') out += `<td><span class="list_age">${ age }</span></td>`
		else out += `<td>${ age }</td>`
		out += `<td>${ year }</td>`
		if (event.includes('dies')) out += `<td style="color:gray; padding-inline-start:2rem;">${ event }</td>`
		else if (event.includes('Marriage')) out += `<td style="border-inline-start:2px solid red; padding-inline-start:.5rem">${ event }</td>`
		else if (event.includes('marries')) out += `<td style="padding-inline-start:2rem;">${ event }</td>`
		else out += `<td>${ event }</td>`
		out += `<td style="font-size:90%;">${ occupation }</td>`
		out += `<td style="font-size:80%;">${ location }</td>`
		
		// Close row
		out += '</tr>'
		
		// Update previous trackers using original parts (not transformed values)
		if (parts[0]) prevAge = parts[0]
		if (parts[1]) prevYear = parts[1]
		if (parts[4]) prevLocation = parts[4]
	    }
	
	// Close table
	out += '</table>'
	
	// Return completed HTML
	return out
    }    
    


function makeEventsSummary () {
    // set the global variable eventSummaryList to a set of records of tab separated items
    // Copy events summary
    const entries = document.querySelectorAll('.dateAndRecord')
    
    window.eventSummaryList = 'Age\tYear\tEvent\tOccupation\tLocation\n'
    for (g = 1; g < entries.length; g++) {
        if (entries[g].classList.contains('history')) continue
    
        let age = entries[g].querySelector('.recordTitleAge') ? entries[g].querySelector('.recordTitleAge').textContent.trim() : '—'
        if (age === '—') continue
        age = `<a href="#${ entries[g].id }">${ age }</a>`

        const year = entries[g].querySelector('.theYear') ? entries[g].querySelector('.theYear').textContent.trim() : ''

        const locn = entries[g].querySelector('.place') ? entries[g].querySelector('.place').textContent.trim() : ''

        const title = entries[g].querySelector('.recordTitle') ? entries[g].querySelector('.recordTitle').innerHTML.trim() : ''

        const occupation = entries[g].querySelector('.occ') && entries[g].querySelector('.occ').textContent !== '' ?
            entries[g].querySelector('.occ').textContent.trim() : ''

        eventSummaryList += `${ age }\t${ year }\t${ title }\t${ occupation }\t${ locn }\n`
        }
    }






function expandChapmanCodes(str) {
  // Build lookup map
  const map = Object.fromEntries(
    chapmanData.map(entry => [entry.code, entry.name])
    )

  // Build regex: match either " CODE" or ", CODE"
  // Longest codes first to avoid partial matches
  const pattern = new RegExp(
    "(?: |, )(" +
      chapmanData
        .map(e => e.code)
        .sort((a, b) => b.length - a.length)
        .join("|") +
    ")\\b",
    "g"
    )

  // Replace with ", Full Name"
  return str.replace(pattern, (_, code) => `, ${map[code]}`)
  }





var scriptFileLoaded = true
