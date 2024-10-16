db = {

barrow_elizabeth_culliford_1789:{
g:"Elizabeth Culliford", k:"Elizabeth", f:"Barrow", bdate:"21 Dec", b:"1789", ddate:"13 Sep", d:"1863",
bplace:"", dplace:"London", thumb:true, p:false,
father:"Charles Barrow", mother:"Mary Culliford", occ:"", m:['Dickens'],
fg:[["1809-06-13", "dickens_john_1785", "dickens_frances_elizabeth_1810", "dickens_charles_john_huffam_1812", "dickens_alfred_allen_1813", "dickens_letitia_1816", "dickens_harriet_1819", "dickens_frederick_1820", "dickens_alfred_lamert_1822", "dickens_augustus_1827"]]
},

collins_charles_allston_1828:{
g:"Charles Allston", k:"Charles", f:"Collins", bdate:"25 Jan", b:"1828", ddate:"9 Apr", d:"1873",
bplace:"Hampstead", dplace:"London", thumb:true, male:true, p:false,
father:"William Collins", mother:"", occ:"Artist, writer", cstatus:"No children",
fg:[["1860-07-01", "dickens_catherine_elizabeth_macready_1839"]],
},

dickens_alfred_allen_1813:{
g:"Alfred Allen", k:"", f:"Dickens", bdate:"", b:"1813", ddate:"", d:"1813",
bplace:"", dplace:"", thumb:false, male:true, p:false,
father:"dickens_john_1785", mother:"barrow_elizabeth_culliford_1789", occ:"", cstatus:"Died as infant"
},

dickens_alfred_dorsay_tennison_1845:{
g:"Alfred D'Orsay Tennison", k:"", f:"Dickens", bdate:"28 Oct", b:"1845", ddate:"2 Jan", d:"1912",
bplace:"London", dplace:"New York, NY", thumb:true, male:true, p:false,
father:"dickens_charles_john_huffam_1812", mother:"hogarth_catherine_thompson_1815", occ:"Lecturer",
fg:[["~1874", "Augusta Jessie Devlin", "Kathleen Mary", "Violet Georgina"]]
},

dickens_alfred_lamert_1822:{
g:"Alfred Lamert", k:"", f:"Dickens", bdate:"", b:"1822", ddate:"", d:"1860",
bplace:"", dplace:"", thumb:false, male:true, p:false,
father:"dickens_john_1785", mother:"barrow_elizabeth_culliford_1789", occ:"Railway engineer"
},

dickens_augustus_1827:{
g:"Augustus", k:"", f:"Dickens", bdate:"", b:"1827", ddate:"", d:"1866",
bplace:"", dplace:"", thumb:false, male:true, p:false,
father:"dickens_john_1785", mother:"barrow_elizabeth_culliford_1789", occ:"Railway engineer"
},

dickens_catherine_elizabeth_macready_1839:{
g:"Catherine Elizabeth Macready", k:"Kate", f:"Dickens", bdate:"29 Oct", b:"1839", ddate:"9 May", d:"1929",
bplace:"", dplace:"", thumb:true, p:true,
father:"dickens_charles_john_huffam_1812", mother:"hogarth_catherine_thompson_1815", occ:"Painter", m:['Perugini'],
fg:[["1860-07-01", "collins_charles_allston_1828"],
    ["1874", "perugini_charles_edward_1839", "perugini_leonard_ralph_dickens_1876"]],

marriages:{
"collins_charles_allston_1828":{
timestamp: "1860-07-01",
groom: "Charles Allston Collins",
gid: "collins_charles_allston_1828",
bride: "Catherine Elizabeth Macready Dickens",
bid: "dickens_catherine_elizabeth_macready_1839",
}},
},



dickens_charles_culliford_boz_1837:{ 
g:"Charles Culliford Boz", k:"Charley", f:"Dickens",  bdate:"6 Jan", b:"1837", ddate:"20 Jul", d:"1896", 
bplace:"Holborn, London", dplace:"Fulham, London", thumb:true, male:true, p:true,
father:"dickens_charles_john_huffam_1812", mother:"hogarth_catherine_thompson_1815", occ:"writer, editor",
fg: [["1861-07-01", "evans_elizabeth_matilda_moule_18xx"]],

birth: {
timestamp: "1837-01-06",
place: "48 Doughty St, London https://maps.google.co.uk/maps?q=51.523947346057795, -0.11684857767057455",
athome: "dickens_charles_john_huffam_1812 hogarth_catherine_thompson_1815",
focc: "Gentleman",
bapplace: "St Pancras parish, London",
bapyear: "1837",
bapdate: "9 Dec",
images: ["Parish record url:../dickens_records/1837_dickens_charles_culliford_boz_bap.jpg"],
sources: `
SOURCE: London, England, Church of England Births and Baptisms, 1813-1923  https://www.ancestry.co.uk/discoveryui-content/view/1653680:1558,
Name: Charles Culliford Boz Dickens
Baptism Date: 9 Dec 1837
Baptism Place: St Pancras, Camden, England
Father: Charles John Huffam Dickens
Mother: Catherine Thomson Dickens
Abode: Doughty Street
Focc: Gent.
Birth date: 6 Janr

SOURCE: Google maps  
Blue plaque on 48 Doughty St
`,
},//b

death: {
timestamp: "1896-07-20",
of: "43 Fairholme Rd, West Kensington, Middlesex",
athome: "evans_elizabeth_matilda_moule_18xx",
age: "59",
occ: "journalist",
probate: `DICKENS Charles of 43 Fairholme-road West Kensington Middlesex journalist died 20 July 1896 Administration (with Will) London 30 October to Elizabeth Dickens widow Effects £17 5s. 3d.`,
gps: ["43 Fairholme Rd, West Kensington, Middlesex (former site) https://www.google.com/maps?q=51.48793121299158,-0.20868780143436402"],
sources: `
SOURCE: England & Wales, Civil Registration Death Index, 1837-1915  https://www.ancestry.co.uk/discoveryui-content/view/9292525:8914
Name: Charles Dickens
Age: 59
Death Registration Place: Fulham, London
Death Date: Jul-Sep 1896
Volume: 1a p190

SOURCE: England & Wales, National Probate Calendar (Index of Wills and Administrations), 1858-1995  https://www.ancestry.co.uk/discoveryui-content/view/1212044:1904
Name: Charles Dickens
Death Date: 20 Jul 1896
Death Place: Middlesex, England
Probate Date: 30 Oct 1896
Probate Registry: London, England
`
},//d

marriages: {
"evans_elizabeth_matilda_moule_18xx": {
timestamp: "1861-11-19",
year: "1861",
date: "19 Nov",
place: "Saint Marks, Regent's Park, Prince Albert Road, Camden, London",
groom: "Charles Culliford Boz Dickens",
gid: "dickens_charles_culliford_boz_1837",
bride: "Elizabeth Matilda Moule Evans",
bid: "evans_elizabeth_matilda_moule_18xx",
gage: "over 21",
bage: "over 21",
gparish: "70 Gloucester Crescent, Regent's Park, Middlesex https://www.google.com/maps?q=51.53807190514849,-0.14597952630996786",
bparish: "19 Queen's Road West",
gstatus: "bachelor",
bstatus: "spinster",
gocc: "merchant",
gfather: "Charles John Huffam Dickens",
gfid: "dickens_charles_john_huffam_1812",
gfocc: "author",
bfather: "Frederick Mullett Evans",
bfocc: "printer",
witnesses: "Frederick M Evans, Thomas Beard, dickens_catherine_elizabeth_macready_1839, Margaret Orridge, Robert Orridge, ?? Moule Evans",
by: "licence",
images: ["Parish record https://www.ancestry.co.uk/discoveryui-content/view/2644330:1623"],
sources: `
SOURCE: England & Wales, Civil Registration Marriage Index, 1837-1915  https://www.ancestry.co.uk/discoveryui-content/view/7931528:8913,,
Name: Charles Culliford Boz Dickens
Registration Date: Oct-Dec 1861
Registration district: Pancras
Volume: 1b p40
Spouse: Elizabeth Matilda Moule Evans

SOURCE: London, England, Church of England Marriages and Banns, 1754-1938  https://www.ancestry.co.uk/discoveryui-content/view/2644330:1623
Marriage Date: 19 Nov 1861
Marriage Place: Saint Marks, Regent's Park, Prince Albert Road, Camden
Groom: Charles Culliford Boz Dickens
Groom details: full age, bachelor, merchant, of 70 Gloucester Crescent, f Charles John Huffman Dickens, author
Bride: Elizabeth Matilda Moule Evans
Bride details: full age, spinster, of 19 Queen's Road West, f Frederick Mullett Evans, printer
By: licence
Signatures: Charles Culliford Boz Dickens, Elizabeth Matilda Moule Evans
Witnesses: Frederick M Evans, Thomas Beard, Catherine Dickens, Margaret Orridge, Robert Orridge, ?? Moule Evans
`},
},//m

events: {
"1841-06-06": {
type: 'census',
census: '1841_dickens_charles_john_huffam_1812',
relation: "child",
occ: "",
notes: `{dickens_charles_john_huffam_1812:kx} was a gentleman.
The children were {dickens_charles_culliford_boz_1837:k}, {dickens_mary_1838:k}, {dickens_catherine_elizabeth_macready_1839:k}, and {dickens_walter_savage_landor_1841:k} (aged 4 months).`,
},
"1851-03-03": {
type: "census",
census: "1851_dickens_charles_culliford_boz_1837",
relation: "other",
occ: "scholar at Eton School",
},
"1871-04-02": {
type: "census",
census: "1871_dickens_charles_culliford_boz_1837",
relation: "head",
occ: "journal proprietor & editor",
notes: `{dickens_charles_culliford_boz_1837:kx0} was a journal proprietor & editor. 
The children were Ethel Dickens<sup class="ageTag">7</sup>,Charles Dickens<sup class="ageTag">5</sup>, scholar,Sydney Dickens<sup class="ageTag">4</sup>,Gertrude Dickens<sup class="ageTag">3</sup>,Beatrice Dickens<sup class="ageTag">1</sup>, and Cecil Dickens<sup class="ageTag">3mo</sup>.
Also at the house was sister(?) Margaret Orridge(?)<sup class="ageTag">33</sup>, governess.
The servants at the house were Matilda Taylor<sup class="ageTag">32</sup>, nurse, Irene Serca<sup class="ageTag">18</sup>, nurse, Jane Morris<sup class="ageTag">26</sup>, parlour maid, Elizabeth Franklin<sup class="ageTag">32</sup>, cook,  and Margaret Lane<sup class="ageTag">14</sup>, kitchen maid.`,
},
},//e
},//p




evans_elizabeth_matilda_moule_18xx:{
g:"Elizabeth Matilda Moule", k:"", f:"Evans", bdate:"", b:"", ddate:"", d:"",
bplace:"", dplace:"", thumb:true, p:false,
father:"", mother:"", occ:"",
fg:[["1861-07-01", "dickens_charles_culliford_boz_1837"]]
},



dickens_charles_john_huffam_1812:{ 
g:"Charles John Huffam", k:"Charles", f:"Dickens",  bdate:"7 Feb", b:"1812", ddate:"9 Jun", d:"1870", 
bplace:"Landport, Hants", dplace:"Higham, London", thumb:true, male:true, p:true,
father:"dickens_john_1785", mother:"barrow_elizabeth_culliford_1789", occ:"Writer",
fg: [["1836", "hogarth_catherine_thompson_1815", "dickens_charles_culliford_boz_1837", "dickens_mary_1838", "dickens_catherine_elizabeth_macready_1839", "dickens_walter_savage_landor_1841", "dickens_francis_jeffrey_1844", "dickens_alfred_dorsay_tennison_1845", "dickens_sydney_smith_haldimand_1847", "dickens_henry_fielding_1849", "dickens_dora_annie_1850", "dickens_edward_bulwer_lytton_1852"]],

intro: `Charles John Huffam Dickens was an English writer and social critic. He created some of the world's best-known fictional characters and is regarded by many as the greatest novelist of the Victorian era. His works enjoyed unprecedented popularity during his lifetime, and by the twentieth century critics and scholars had recognised him as a literary genius. His novels and short stories enjoy lasting popularity.`,

birth: {
timestamp: "1812-02-07",
place: "Landport, Hampshire https://www.google.co.uk/maps/place/Landport",
athome: "dickens_john_1785 barrow_elizabeth_culliford_1789",
bapplace: "St Marys, Portsea, Hampshire https://www.google.com/maps?q=50.80356204725931,-1.076376740745234",
bapyear: "1812",
bapdate: "4 Mar",
sources: `
SOURCE: Select Births and Christenings, 1538-1975  http://search.ancestry.co.uk/cgi-bin/sse.dll?indiv=try&db=FS1EnglandBirthsandChristenings&h=152229257,
Parish: St Marys, Portsea
WhenBaptised: 4 Mar 1812
Name: Charles John Huffham Dickens
Father: John Dickens
Mother: Elizabeth Dickens

SOURCE: Wikipedia  https://en.wikipedia.org/wiki/Charles_Dickens
`,

},//b

death: {
timestamp: "1870-06-09",
of: "Gads Hill Place, near Rochester",
age: "58",
namedInProbate: "Georgina Hogarth and John Forster of Palace Gate House Kensington in the County of Middlesex Esquire the Executors",
probate: `DICKENS Charles otherwise Charles John Huffham Esq. 19 July. The Will with a Codicil of Charles otherwise Charles John Huffham Dickens late of Gads Hill Place near Rochester in the County of Kent Esquire deceased who died 9 June 1870 at Gads Hill Place aforesaid was proved at the Principal Registry by the oaths of Georgina Hogarth and John Forster of Palace Gate House Kensington in the County of Middlesex Esquire the Executors. Effects under £80,000.`,
images: ["Probate url:records/1870_dickens_charles_probate.jpg"],
gps: ["Gads Hill Place, Higham, Kent https://maps.google.com/maps?q=51.411201,0.457370"],
sources: `
SOURCE: Civil Registration Death Index, 1837-1915  http://search.ancestry.co.uk/cgi-bin/sse.dll?indiv=try&db=FreeBMDDeath&h=9292484
Name: Charles Dickens
Estimatedbirthyear: abt 1812
RegistrationYear: 1870
RegistrationQuarter: Apr-May-Jun
AgeatDeath: 58
Registrationdistrict: North Aylesford

SOURCE: National Probate Calendar (Index of Wills and Administrations), 1858-1966, 1973-1995  http://search.ancestry.co.uk/cgi-bin/sse.dll?indiv=try&db=UKProbateCal&h=5862786`
},//d

marriages: {
"hogarth_catherine_thompson_1815": {
timestamp: "1836-04-02",
year: "1836",
date: "2 Apr",
place: "St Lukes, Chelsea parish, London",
groom: "Charles John Huffam Dickens",
gid: "dickens_charles_john_huffam_1812",
bride: "Catherine Thompson Hogarth",
bid: "hogarth_catherine_thompson_1815",
bage: "less than 21",
gparish: "Furnival's Inn, London https://maps.google.com/maps?q=51.51814694111903,-0.10985003298183434",
bparish: "Chelsea parish",
gstatus: "bachelor",
bstatus: "spinster (minor)",
bfather: "George Hogarth",
witnesses: "George Hogarth(?), Elizabeth Dickens, others (writing illegible)",
by: "licence",
fnotes: ["The consent field on the marriage register says 'George Hogarth the ... and daughter(?) father(?) of the said ...'"],
images: ["Parish record url:records/1836_dickens_charles_catherine_hogarth_m.jpg.jpg"],
gps: ["St Lukes church, Chelsea, London https://maps.google.com/maps?q=51.489569,-0.169524"],
sources: `
SOURCE: Church of England Marriages and Banns, 1754-1921 http://search.ancestry.co.uk/cgi-bin/sse.dll?indiv=try&db=LMAmarriages&h=2187669
Parish: St Lukes, Chelsea parish, London]
Groom: Charles John Huffman Dickens
GroomDetails: of Furnivals Inn, in this County, bachelor
Bride: Catherine Thomson Hogarth
BrideDetails: of this parish, spinster and minor
By: licence
When: 2 April 1836
Witnesses: George Hogarth(?), Elizabeth Dickens, others (writing illegible)
text: with Consent of George Hogarth the ... and daughter(?) father(?) of the said ...`
},
},//m

events: {
"1824-07-01": {
title: "Marshalsea debtor's prison",
type: "note",
notes: `
note: The family had left Kent amidst rapidly mounting debts, and, living beyond his means, {dickens_john_1785:kf} was forced by his creditors into the Marshalsea debtors' prison in Southwark, London in 1824. His wife and youngest children joined him there, as was the practice at the time. {dickens_charles_john_huffam_1812:kx0}, then 12 years old, boarded with Elizabeth Roylance, a family friend, at 112 College Place, Camden Town.
note: On Sundays—with his sister {dickens_frances_elizabeth_1810:k}, free from her studies at the Royal Academy of Music—{dickens_charles_john_huffam_1812:kx0} spent the day at the Marshalsea. He later used the prison as a setting in Little Dorrit. To pay for his board and to help his family, Dickens was forced to leave school and work ten-hour days at Warren's Blacking Warehouse, on Hungerford Stairs, near the present Charing Cross railway station, where he earned six shillings a week pasting labels on pots of boot blacking.`,
place: "112 College Place, Camden Town",
occ: "boot black labeller",
gps: ["Marshalsea Prison location, Southwark https://maps.google.com/maps?q=51.501800,-0.092100", "112 College Place, Camden Town, London https://maps.google.com/maps?q=51.53852983395088,-0.13641449660565133", "Charing Cross Railway Station, London https://maps.google.com/maps?q=51.50811290986514,-0.12469758957022929"],
sources: `
SOURCE: Wikipedia  https://en.wikipedia.org/wiki/Charles_Dickens#Early_years`
},
"1824-07-02": {
type: "figure",
img: "pictures/marshalsea_prison_plan.jpg",
caption: "Plan of the Marshalsea prison (in 1840s)",
sources: `Wikipedia https://en.wikipedia.org/wiki/Marshalsea#/media/File:Plan_of_the_Marshalsea,_1843.jpg`
},
"1841-06-06": {
type: 'census',
census: '1841_dickens_charles_john_huffam_1812',
relation: "head",
occ: "Gentleman",
notes: `{dickens_charles_john_huffam_1812:kx} was a gentleman.
The children were {dickens_charles_culliford_boz_1837:k}, {dickens_mary_1838:k}, {dickens_catherine_elizabeth_macready_1839:k}, and {dickens_walter_savage_landor_1841:k} (aged 4 months).`,
},
"1841-07-01": {
title: "Social setting",
type: "note",
notes: `At a time when Britain was the major economic and political power of the world, Dickens highlighted the life of the forgotten poor and disadvantaged within society. Through his journalism he campaigned on specific issues—such as sanitation and the workhouse—but his fiction probably demonstrated its greatest prowess in changing public opinion in regard to class inequalities. 
He often depicted the exploitation and oppression of the poor and condemned the public officials and institutions that not only allowed such abuses to exist, but flourished as a result. His most strident indictment of this condition is in Hard Times (1854), Dickens's only novel-length treatment of the industrial working class. In this work, he uses vitriol and satire to illustrate how this marginalised social stratum was termed "Hands" by the factory owners; that is, not really "people" but rather only appendages of the machines they operated. His writings inspired others, in particular journalists and political figures, to address such problems of class oppression.`,
sources: `SOURCE: Wikipedia  https://en.wikipedia.org/wiki/Charles_Dickens`
},
"1851-03-30": {
type: 'census',
census: '1851_dickens_charles_john_huffam_1812',
relation: "visitor",
occ: "Author",
notes: `Robert Davey was a 52 year old medical practitioner.
The visitors included {dickens_charles_john_huffam_1812:kx0}'s mother, {barrow_elizabeth_culliford_1789:k},  widowed and living on an annuity, {dickens_charles_john_huffam_1812:kx0}, described as an author, and his brothers {dickens_alfred_allen_1813:k},  an engineer, and {dickens_augustus_1827:k},  a merchant's clerk. Also there were his sister {dickens_letitia_1816:k},  her husband Henry Austin<sup class="ageTag">38</sup>, an engineer, and his mother Elizabeth Austin<sup class="ageTag">64</sup>, an annuitant. Finally there were two visitors born in Jamaica, Elizabeth Dorothy Smithson<sup class="ageTag">40</sup>, and Amelia Thompson<sup class="ageTag">42</sup>, both annuitants.
The servants were Rosanna Green<sup class="ageTag">30</sup>, cook (born in Dublin), Emma Riley<sup class="ageTag">24</sup>, house maid, and Frances Bousfield<sup class="ageTag">43</sup>, a general maid.
His father, {dickens_john_1785:kf}, is not listed at this address, but this is the abode given in his burial record. His date of death is given as the following day, so the family members were presumably gathered together on this account.`
},
"1861-04-07": {
type: 'census',
census: '1861_dickens_charles_john_huffam_1812',
relation: "head",
occ: "Author, novelist, essayist & editor",
notes: `{dickens_charles_john_huffam_1812:kx} is described as an author, novelist, essayist & editor. His wife is not at the house because they had separated three years before.
The children were {dickens_mary_1838:k},  {dickens_francis_jeffrey_1844:k},  a secretary, and {dickens_edward_bulwer_lytton_1852:k}, at school.
The servants included Georgina Hogarth<sup class="ageTag">34</sup>, his wife's sister,  the housekeeper, and Susannah Cooper<sup class="ageTag">51</sup>, the cook, Matilda Bush<sup class="ageTag">29</sup>, a housemaid, and Agnes Garrod<sup class="ageTag">21</sup>, a parlour maid.`
},
"1865-06-09": {
title: "Staplehurst train crash",
type: "note",
notes: `On 9 June 1865, while returning from Paris with Ellen Ternan, Dickens was involved in the Staplehurst rail crash. The train's first seven carriages plunged off a cast iron bridge that was under repair. The only first-class carriage to remain on the track was the one in which Dickens was travelling. Before rescuers arrived, Dickens tended and comforted the wounded and the dying with a flask of brandy and a hat refreshed with water, and saved some lives. Before leaving, he remembered the unfinished manuscript for Our Mutual Friend, and he returned to his carriage to retrieve it.`,
sources: `SOURCE: Wikipedia  https://en.wikipedia.org/wiki/Charles_Dickens#Last_years`
},
"1865-07-02": {
type: "figure",
img: "pictures/staplehurst_rail_crash.jpg",
caption: "Aftermath of the Staplehurst train crash",
sources: `Wikipedia https://en.wikipedia.org/wiki/Charles_Dickens#/media/File:Staplehurst_rail_crash.jpg`
},
},//e
},//p




dickens_dora_annie_1850:{
g:"Dora Annie", k:"", f:"Dickens", bdate:"16 Aug", b:"1850", ddate:"14 Apr", d:"1851",
bplace:"London", dplace:"London", thumb:false, p:true,
father:"dickens_charles_john_huffam_1812", mother:"hogarth_catherine_thompson_1815", occ:"", m:[], cstatus:"Died as infant"
},

dickens_edward_bulwer_lytton_1852:{
g:"Edward Bulwer Lytton", k:"Edward", f:"Dickens", bdate:"13 Mar", b:"1852", ddate:"23 Jan", d:"1902",
bplace:"", dplace:"Moree, NSW", thumb:false, male:true, p:false,
father:"dickens_charles_john_huffam_1812", mother:"hogarth_catherine_thompson_1815", occ:"Politician", cstatus:"Died single"
},

dickens_frances_elizabeth_1810:{
g:"Frances Elizabeth", k:"Fanny", f:"Dickens", bdate:"", b:"1810", ddate:"", d:"1848",
bplace:"", dplace:"", thumb:false, p:false,
father:"dickens_john_1785", mother:"barrow_elizabeth_culliford_1789", occ:"", m:[]
},

dickens_francis_jeffrey_1844:{
g:"Francis Jeffrey", k:"Frank", f:"Dickens", bdate:"15 jan", b:"1844", ddate:"11 Jun", d:"1886",
bplace:"London", dplace:"Moline, IL", thumb:false, male:true, p:false,
father:"dickens_charles_john_huffam_1812", mother:"hogarth_catherine_thompson_1815", occ:"Indian Army Officer", cstatus:"Died single"
},

dickens_frederick_1820:{
g:"Frederick", k:"", f:"Dickens", bdate:"", b:"1820", ddate:"", d:"1868",
bplace:"", dplace:"", thumb:false, male:true, p:false,
father:"dickens_john_1785", mother:"barrow_elizabeth_culliford_1789", occ:""
},

dickens_harriet_1819:{
g:"Harriet", k:"", f:"Dickens", bdate:"", b:"1819", ddate:"", d:"1824",
bplace:"", dplace:"", thumb:false, p:false,
father:"dickens_john_1785", mother:"barrow_elizabeth_culliford_1789", occ:"", cstatus:"Died as child"
},

dickens_henry_fielding_1849:{
g:"Henry Fielding", k:"", f:"Dickens", bdate:"16 Jan", b:"1849", ddate:"21 Dec", d:"1933",
bplace:"London", dplace:"London", thumb:true, male:true, p:false,
father:"dickens_charles_john_huffam_1812", mother:"hogarth_catherine_thompson_1815", occ:"Common Serjeant of London",
fg:[["1876", "Marie Roche"]]
},

dickens_john_1785:{
g:"John", k:"", f:"Dickens", bdate:"21 Aug", b:"1785", ddate:"31 Mar", d:"1851",
bplace:"Landport", dplace:"Higham", thumb:true, male:true, p:true,
father:"William Dickens", mother:"Elizabeth Bal", occ:"Clerk",
fg:[["1809-06-13", "barrow_elizabeth_culliford_1789", "dickens_frances_elizabeth_1810", "dickens_charles_john_huffam_1812", "dickens_alfred_allen_1813", "dickens_letitia_1816", "dickens_harriet_1819", "dickens_frederick_1820", "dickens_alfred_lamert_1822", "dickens_augustus_1827"]],

birth: {
timestamp: "1785-08-21",
bapplace: "St Marylebone, Middlesex",
bapyear: "1785",
bapdate: "20 Nov",
images: ["Baptismal record url:records/1785_dickens_john_bap.jpg"],
sources: `
SOURCE: London Metropolitan Archives, St Marylebone, Westminster, Day book of baptisms, Jan 1779-Nov 1786, P89/MRY1/080  http://search.ancestry.co.uk/cgi-bin/sse.dll?indiv=try&db=LMAearlyparish&h=343265
text: Jno Dickens of Wm & Eliz b 21 Augt 85
Born: 21 Aug 1785
Name: Jno Dickens
BaptismDate: 20 Nov 1785
Parish: St Marylebone
County: Middlesex
Borough: Westminster
Parent(s): Wm
RecordType: Baptism
RegisterType: Parish Register`},

marriages: {
"barrow_elizabeth_culliford_1789": {
timestamp: "1809-06-13",
year: "1809",
date: "13 Jun",
place: "St Mary Le Strand, Westminster",
groom: "John Dickens",
gid: "dickens_john_1785",
bride: "Elizabeth Barrow",
bid: "barrow_elizabeth_culliford_1789",
bage: "<21",
gparish: "St Mary Le Strand parish",
bparish: "St Mary Le Strand parish",
gstatus: "bachelor",
bstatus: "spinster",
witnesses: "Charles Barrow, Mary Barrow, Sarah Barrow",
by: "licence",
images: ["Parish record url:records/1809_dickens_john_barrow_elizabeth_m.jpg"],
sources: `
SOURCE: London Metropolitan Archives, Saint Mary Le Strand: Westminster, Transcript of Baptisms, Marriages and Burials, 1809 Mar-1810 Mar, DL/t Item, 097/009 http://search.ancestry.co.uk/cgi-bin/sse.dll?indiv=try&db=LMAmarriages&h=10103288
Parish: St Mary Le Strand, Westminster]
Groom: John Dickens
GroomDetails: of this parish, bachelor
Bride: Elizabeth Barrow
BrideDetails: of this parish, spinster, minor
By: licence
When: 13 Jun 1809
Signatures: John Dickens, Elizabeth Barrow
Witnesses: Charles Barrow, Mary Barrow, Sarah Barrow
text: by consent of her Father`}
},

death: {
timestamp: "1851-03-31",
of: "34 Keppel St, Russell Square",
age: "66",
buryear: "1851",
burdate: "5 Apr",
burplace: "St James, St Pancras, London",
images: ["Burial record url:records/1851_dickens_john_bur.jpg"],
gps: ["34 Keppel St, London https://maps.google.com/maps?q=51.520668,-0.129617"],
notes: `Davey was John Dickens’s doctor; he had performed a painful operation on his patient’s bladder—without chloroformon 25 March in the Keppel Street house, and this was where John Dickens died, surrounded by family members, on the very night of the census (The Letters of Charles Dickens, vol. 6, 1988) [<a href="http://www.ucl.ac.uk/bloomsbury-project/articles/individuals/dickens_charles.htm">link</a>]`,
sources: `
SOURCE: Civil Registration Death Index, 1837-1915 1 46  http://search.ancestry.co.uk/cgi-bin/sse.dll?indiv=try&db=FreeBMDDeath&h=9293977
Name: John Dickens
RegistrationYear: 1851
RegistrationQuarter: Apr-May-Jun
Registrationdistrict: St Giles

SOURCE: London, England, Church of England Deaths and Burials, 1813-1980  http://search.ancestry.co.uk/cgi-bin/sse.dll?indiv=try&db=LMAdeaths&h=10063916
Abode: 34 Keppel St, Ansell Square
Age: 66
Name: John Dickens
RecordType: Burial
Age: 66
Estimatedbirthyear: abt 1785
DeathDate: abt 1851
BurialDate: 5 Apr 1851
BurialPlace: St James, St Pancras, England
ParishorPoorLawUnion: St James, St Pancras
Borough: Camden
RegisterType: Bishop's Transcript`},

events: {
"1824-07-01": {
title: "Marshalsea debtor's prison",
type: "note",
notes: `
note: The family had left Kent amidst rapidly mounting debts, and, living beyond his means, {dickens_john_1785:kf} was forced by his creditors into the Marshalsea debtors' prison in Southwark, London in 1824. His wife and youngest children joined him there, as was the practice at the time. {dickens_charles_john_huffam_1812:kx}, then 12 years old, boarded with Elizabeth Roylance, a family friend, at 112 College Place, Camden Town.
note: On Sundays—with his sister {dickens_frances_elizabeth_1810:k}, free from her studies at the Royal Academy of Music—{dickens_charles_john_huffam_1812:kx} spent the day at the Marshalsea. He later used the prison as a setting in Little Dorrit. To pay for his board and to help his family, Dickens was forced to leave school and work ten-hour days at Warren's Blacking Warehouse, on Hungerford Stairs, near the present Charing Cross railway station, where he earned six shillings a week pasting labels on pots of boot blacking.`,
place: "112 College Place, Camden Town",
occ: "boot black labeller",
sources: `
SOURCE: Wikipedia  https://en.wikipedia.org/wiki/Charles_Dickens#Early_years`},


"1824-07-02": {
type: "figure",
img: "pictures/marshalsea_prison_plan.jpg",
caption: "Plan of the Marshalsea prison (in 1840s)",
sources: `Wikipedia https://en.wikipedia.org/wiki/Marshalsea#/media/File:Plan_of_the_Marshalsea,_1843.jpg`
},
}
},



hogarth_catherine_thompson_1815:{ 
g:"Catherine Thompson", k:"Kate", f:"Hogarth", m:['Dickens'],  bdate:"19 May", b:"1815", ddate:"22 Nov", d:"1879", 
bplace:"Edinburgh", dplace:"London", thumb:true, male:false, p:false,
father:"George Hogarth", mother:"", occ:"",
fg: [["1836", "dickens_charles_john_huffam_1812", "dickens_charles_culliford_boz_1837", "dickens_mary_1838", "dickens_catherine_elizabeth_macready_1839", "dickens_walter_savage_landor_1841", "dickens_francis_jeffrey_1844", "dickens_alfred_dorsay_tennison_1845", "dickens_sydney_smith_haldimand_1847", "dickens_henry_fielding_1849", "dickens_dora_annie_1850", "dickens_edward_bulwer_lytton_1852"]],

birth: {
// data
},//b

death: {
timestamp: "1879-11-22",
of: "70 Gloucester Crescent, Regent's Park, Middlesex https://www.google.com/maps?q=51.53807190514849,-0.14597952630996786",
age: "64",
namedInProbate: "dickens_henry_fielding_1849",
probate: `DICKENS Catherine. 8 January. The Will of Catherine Dickens late of 70 Gloucester-crescent Regent's Park in the County of Middlesex Widow who died 22 November 1979 at 70 Gloucester-crescent was proved at the Principal Registry by Henry Fielding Dickens of 7 Crown-Office-row Temple in the City of London Barrister-at-Law the Son the sole Executor. Personal Estate under £800.`,
sources: `
SOURCE: England & Wales, Civil Registration Death Index, 1837-1915  https://www.ancestry.co.uk/discoveryui-content/view/9292468:8914
Name: Catherine Thomson Dickens
Age: 64
Death Registration Place: Pancras, London
Death Date: Oct-Dec 1879
Volume: 1b p9

SOURCE: England & Wales, National Probate Calendar (Index of Wills and Administrations), 1858-1995  https://www.ancestry.co.uk/discoveryui-content/view/5080733:1904
Name: Catherine Dickens
Death Date: 22 Nov 1879
Death Place: Middlesex, England
Probate Date: 8 Jan 1880
Probate Registry: Principal Registry
`
},//d

marriages: {
// data
},//m

events: {
// data
},//e
},//p



dickens_letitia_1816:{
g:"Letitia", k:"", f:"Dickens", bdate:"", b:"1816", ddate:"", d:"1893",
bplace:"", dplace:"", thumb:false, p:false,
father:"dickens_john_1785", mother:"barrow_elizabeth_culliford_1789", occ:"", m:['Austin']
},

dickens_mary_1838:{ 
g:"Mary", k:"Mamie", f:"Dickens",  bdate:"6 Mar", b:"1838", ddate:"23 Jul", d:"1896", 
bplace:"London", dplace:"Farnham Royal", thumb:true, male:false, p:true,
father:"dickens_charles_john_huffam_1812", mother:"hogarth_catherine_thompson_1815", occ:"Author",
cstatus:"Died single",

birth: {
timestamp: "1838-03-06",
place: "48 Doughty St, London https://maps.google.co.uk/maps?q=51.523947346057795, -0.11684857767057455",
athome: "dickens_charles_john_huffam_1812 hogarth_catherine_thompson_1815",
bapplace: "Old St Pancras, St Pancras, Camden",
bapyear: "1839",
bapdate: "5 Jan",
images: ["Parish record https://www.ancestry.co.uk/discoveryui-content/view/1862108:1558"],
sources: `
SOURCE: England & Wales, Civil Registration Birth Index, 1837-1915  https://www.ancestry.co.uk/discoveryui-content/view/42454245:8912,
Name: Mary Dickens
Registration Date: Apr-Jun 1838
Registration Place: Lambeth, London, England
Volume: 4 p299

SOURCE: London, England, Church of England Births and Baptisms, 1813-1923  https://www.ancestry.co.uk/discoveryui-content/view/1862108:1558
Parish: Old St Pancras, St Pancras, Camden
When: 5 Jan 1839
Name: Mary Dickens
Parents: Charles John Huffam & Catherine Thomson
Surname: Dickens
Abode: Doughty St
Father occ: ???
SOURCE: Wikipedia  https://en.wikipedia.org/wiki/Mary_Dickens
Birth date: 6 March 1838
`,
},//b

death: {
// data
},//d

marriages: {
// data
},//m

events: {
// data
},//e
},//p


dickens_sydney_smith_haldimand_1847:{
g:"Sydney Smith Haldimand", k:"", f:"Dickens", bdate:"18 Apr", b:"1847", ddate:"2 May", d:"1872",
bplace:"", dplace:"Indian Ocean", thumb:false, male:true, p:false,
father:"dickens_charles_john_huffam_1812", mother:"hogarth_catherine_thompson_1815", occ:"Naval lieutenant", cstatus:"Died single"
},

dickens_walter_savage_landor_1841:{
g:"Walter Savage Landor", k:"Walter", f:"Dickens", bdate:"8 Feb", b:"1841", ddate:"31 Dec", d:"1863",
bplace:"London", dplace:"Calcutta, IN", thumb:false, male:true, p:false,
father:"dickens_charles_john_huffam_1812", mother:"hogarth_catherine_thompson_1815", occ:"Mountie", cstatus:"Died single"
},


perugini_charles_edward_1839:{
g:"Charles Edward", k:"", f:"Perugini", bdate:"1 Sep", b:"1839", ddate:"22 Dec", d:"1918",
bplace:"Naples, IT", dplace:"London", thumb:true, male:true, p:false,
father:"", mother:"", occ:"Artist, writer",
fg:[["1874", "dickens_catherine_elizabeth_macready_1839", "perugini_leonard_ralph_dickens_1876"]]
},

perugini_leonard_ralph_dickens_1876:{
g:"Leonard Ralph Dickens", k:"", f:"Perugini", bdate:"", b:"1876", ddate:"24 Jul", d:"1876",
bplace:"", dplace:"", thumb:false, male:true, p:false,
father:"perugini_charles_edward_1839", mother:"dickens_catherine_elizabeth_macready_1839", occ:"", cstatus:"Died as infant"
},

}