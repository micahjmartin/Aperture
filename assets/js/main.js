var helpMenuActive = true
resultsUl = document.getElementById("results");

AddResult(helpTemplate)

function ClearResults() {
    while (resultsUl.firstChild) {
        resultsUl.removeChild(resultsUl.firstChild);
    }
}

function AddResult(result) {
    resultsUl.innerHTML += result
}


// Call back for searching. Gets called everytime the input bar changes
function OnSearch() {
    // Declare variables
    helpMenuActive = false
    var input, i, results, resultsUl;
    input = document.getElementById('search').value;
    ClearResults()
    if (input != "") {
        try {
            results = search(input)
        } catch (e) {
            console.error(e.name + ': ' + e.message)
            AddResult(errorResult(e))
            return
        }
    } else {
        results = []
    }
    
    if (results.length == 0) {
        if (input == "") {
            AddResult(helpTemplate)
            helpMenuActive = true
            return
        }
        AddResult(noResultsTemplate)
        return
    }

    for (i = 0; i < results.length; i++) {
        item = documents[results[i].id];
        console.log(item)
        AddResult(makeItemResult(item))
    }
}

// The fields that we are allowed to search in
const searchFieldsDefault = ['description', 'name', "owner", 'topics_string', "language", "writeup"]
const searchFieldsAll = ['description', 'name', "owner", 'topics_string', "language", "writeup", "readme"]
const searchFieldsAlias = {
    "topics": "topics_string",
}

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
                    break
                default:
                    if (terms[i].split(" ")[0] == "" ) {
                        break
                    }
                    throw new SyntaxError(`Invlid modifier: ${terms[i].split(" ")[0]}:`)
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
    //storeFields: ['id', 'fullname'],
    searchOptions: {
        prefix: true,
        boost: {description: 10}
    },
})

// Index all documents
miniSearch.addAll(documents)