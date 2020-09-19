

var listDiv =`<div class="listItem">
<div class="group header  clickable">
  <div><a class="gh_name ">tidwall/json</a></div><div class="gh_hearts"><span class="glyphicon glyphicon-circle" aria-hidden="true"></span> </div>
</div>
<div class="group body  clickable">
  <div class="gh_description">JSON Stream editor</div>
</div>
<div class="group tags"></div>
</div>`


const tag_colors_options = ["yellow", "red", "blue", "aqua", "green", "purple", "pink"]
var tag_colors = {} // Keep track of tag colors so they dont change once assigned

function makeClickable(item, href) {
    item.addEventListener("click", function(){window.open(href)})
}

function newTag(tag) {
    var color
    color = tag_colors[tag]
    if (color == null) {
        color = tag_colors_options[Math.floor(tag_colors_options.length * Math.random())]
        tag_colors[tag] = color
    }
    return `<div class="tag" style="border-color: ` +color+`">`+tag+`</div>`
}

function languageTag(language) {
    var color = language_colors[language]
    return `<div class="tag" style="color: white; border-color: ` +color+`">`+language+`</div>`
}

function makeResult(item) {
    // <li><a href="#">Adele</a></li>
    var item, a, li;
    li = document.createElement("li");
    li.innerHTML = listDiv
    a = li.getElementsByClassName("gh_name")[0]
    a.innerHTML = item.full_name
    makeClickable(a, "https://github.com/" + item.full_name)

    a = li.getElementsByClassName("gh_description")[0]
    a.innerHTML = item.description
    makeClickable(a, "https://github.com/" + item.full_name)

    a = li.getElementsByClassName("gh_hearts")[0]
    a.innerHTML = item.language
    a = li.getElementsByClassName("group tags")[0]
    for (i = 0; i < item.topics.length; i++) {
        a.innerHTML += newTag(item.topics[i])
    }
    
    return li;
}

function OnSearch() {
    // Declare variables
    var input, a, i, results, resultsUl;
    input = document.getElementById('search').value;
    results = search(input)
    resultsUl = document.getElementById("results");

    while (resultsUl.firstChild) {
        resultsUl.removeChild(resultsUl.firstChild);
    }

    if (results.length == 0) {
        resultsUl.innerHTML += noResultsTemplate
        return
    }

    for (i = 0; i < results.length; i++) {
        item = documents[results[i].id];
        a = makeResult(item)
        resultsUl.appendChild(a)
    }
}

const searchFieldsAll = ['description', 'fullname', 'readme', 'topics_string', "language"]
const searchFieldsDefault = ['description', 'fullname', 'topics_string', "language"]
function search(qry) {
    var options, terms
    options = {
        fields: searchFieldsDefault
    }
    terms = qry.split(":")
    for (i = 0; i < terms.length; i++) {
        switch (terms[i].split(" ")[0]) {
            case "ALL":
                options.combineWith = "AND"
                break
            case "WORD":
                options.prefix = false
                break
            case "README":
                options.fields.push("readme")
                break
            case "HELP":
                return []
            case "FIELDS":
                options.fields = terms[i].split(" ").slice(1)
                for (j = 0; j < options.fields.length; j++) {
                    if (searchFields.includes(options.fields[j])) {
                        continue
                    } else {
                        console.log("Invalid search field", options.fields[i])
                        return
                    }
                }
            default:
                break
        }
    }
    console.log("Search with:", terms[terms.length-1], options)
    if (options.fields == []) {
        options.fields = searchFieldsDefault
    }
    return miniSearch.search(terms[terms.length-1], options)
}

let miniSearch = new MiniSearch({
    fields: searchFieldsAll, // fields to index for full-text search
    storeFields: ['id', 'fullname'],
    searchOptions: {
        prefix: true,
        boost: {description: 10}
    },
})

// Index all documents
miniSearch.addAll(documents)