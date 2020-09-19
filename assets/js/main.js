

var listDiv =`<div class="listItem">
<div class="group header">
  <div><a class="gh_name">tidwall/json</a></div><div class="gh_hearts"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span> </div>
</div>
<div class="group body">
  <div class="gh_description">JSON Stream editor</div><div class="tag">topics</div>
</div>
</div>`

function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

}

getJSONP('http://soundcloud.com/oembed?url=http%3A//soundcloud.com/forss/flickermood&format=js&callback=?', function(data){
    console.log(data);
});

function makeResult(data) {
    // <li><a href="#">Adele</a></li>
    var item, a, li;
    item = documents[data.id];
    li = document.createElement("li");
    a = document.createElement("a");
    a.href = "https://github.com/" + item.full_name;
    a.innerHTML = item.full_name +"  " + item.description;
    console.log(a, li)
    li.innerHTML = listDiv
    li.getElementsByClassName("gh_name")[0].innerHTML = item.full_name
    li.getElementsByClassName("gh_description")[0].innerHTML = item.description
    a = li.getElementsByClassName("gh_hearts")[0]
    a.innerHTML = item.stargazers +" " + a.innerHTML

    
    return li;
}

function updateSuggestions() {
    // Declare variables
    var input, a, i, results, resultsUl;
    input = document.getElementById('search').value;
    results = miniSearch.search(input)
    resultsUl = document.getElementById("results");

    while (resultsUl.firstChild) {
        resultsUl.removeChild(resultsUl.firstChild);
    }

    for (i = 0; i < results.length; i++) {
        console.log(results[i])
        a = makeResult(results[i])
        resultsUl.appendChild(a)
    }
}

let miniSearch = new MiniSearch({
    fields: ['description', 'fullname', 'readme', 'topics_string'], // fields to index for full-text search
    storeFields: ['id', 'fullname'],

})

// Index all documents
miniSearch.addAll(documents)