resultsUl = document.getElementById("results");
resultsCounter = document.getElementById("resultCounter");
resultsCounter.innerHTML = `0/${documents.length} shown`

function ClearResults() {
    for (i = 0; i < resultsUl.children.length; i++) {
        resultsUl.children[i].classList.add("disappear")
    }
}

function ShowHelp() {
    document.getElementById("helpItem").classList.remove("disappear")
}

function ShowMessage(msg) {
    var item = document.getElementById("messageItem")
    item.classList.remove("disappear")
    item.getElementsByClassName("listItem")[0].innerHTML = `<div class="gh_hearts group body">${msg}</div>`
}

// Call back for searching. Gets called everytime the input bar changes
function OnSearch() {
    // Declare variables
    var input, i, results;
    input = document.getElementById('search').value;
    ClearResults()
    if (input != "") {
        try {
            results = search(input)
        } catch (e) {
            console.error(e)
            ShowMessage(e.message)
            return
        }
    } else {
        results = []
    }
    
    if (results.length == 0) {
        if (input == "") {
            ShowHelp()
            return
        }
        //AddResult(noResultsTemplate)
        ShowMessage("No results found.")
        return
    }

    for (i = 0; i < results.length; i++) {
        var id = results[i].id;
        var item = document.getElementById(id)
        item.classList.remove("disappear")
    }
    resultsCounter.innerHTML = `${results.length}/${documents.length} shown`
}

// The fields that we are allowed to search in
const searchFieldsDefault = ['description', 'topics', "id", "language", "writeup"]
const searchFieldsAll = ['description', 'topics', "id", "language", "writeup", "readme"]

// Parse the flags and build an options file
function search(qry) {
    var options, terms
    options = {
        fields: searchFieldsDefault
    }
    terms = qry.split(":")
    if (terms.length > 1) {
        for (i = 0; i < terms.length; i++) {
            switch (terms[i].split(" ")[0]) {
                case "EVERY":
                    return documents
                case "ALL":
                    options.combineWith = "AND"
                    break
                case "WORD":
                    options.prefix = false
                    break
                case "README":
                    options.fields.push("readme")
                    break
                case "FIELDS":
                    /*
                    var _fields = terms[i].split(" ").slice(1)
                    options.fields = []
                    for (j = 0; j < _fields.length; j++) {
                        if (searchFieldsAll.includes(_fields[j])) {
                            options.fields.push(_fields[i])
                            continue
                        } else {
                            if (searchFieldsAlias[_fields[i]] != undefined) {
                                options.fields.push(searchFieldsAlias[_fields[i]])
                                continue
                            }
                            throw new SyntaxError("Invalid search field: " + options.fields[i])
                        }
                    }
                    */
                    break
                default:
                    if (terms[i].split(" ")[0] == "" ) {
                        break
                    }
                    throw new SyntaxError(`Invalid modifier: ${terms[i].split(" ")[0]}:`)
            }
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
    searchOptions: {
        prefix: true,
        boost: {description: 10}
    },
})

// Index all documents
miniSearch.addAll(documents)