let helpMsg = `<div class="gh_name">Searching</div>
<p>Github repository text is indexed on the following pieces of information:
  <ul>
    <li>The repository name</li>
    <li>The repository description</li>
    <li>Topics assigned to the repository</li>
    <li>Any custom data added at load time</li>
    <li>The README file (optional)</li>
  </ul>
</p>
<p>A few search modifiers are provided. To use a search modifier, simply prepend the modifer to the query.

  Modifiers:
  <ul>
    <li>
      <div class="gh_hearts">ALL:</div>
      <p>By default a repository matches if ANY of the words in the search term match text.
         This modifer requires all search terms to match the repository text.
      </p>
    </li>
    <li>
      <div class="gh_hearts">WORD:</div>
      <p>By default words can partially match off the beginning.
         This modifer requires all search terms to exactly match a word.
      </p>
    </li>
    <li>
      <div class="gh_hearts">README:</div>
      <p>Include the contents of the README in the search.
      </p>
    </li>
    <li>
      <div class="gh_hearts">FIELDS [field]...:</div>
      <p>Only search within the given fields. The possible options for fields are 'description', 'name', 'owner', 'topics', 'language', 'readme'
      </p>
    </li>
  </ul>
</p>
<div class="gh_hearts">Examples</div>
<p>
Find all the golang projects:
<div class="gh_hearts">WORD: FIELDS language: go</div>
<div></div>
Find python projects involving redteam:
<div class="gh_hearts">ALL: python red team</div>
</p>`

const helpTemplate = `<div class="listItem">
<div class="group header clickable">
  <div onclick=window.open("https://github.com/micahjmartin/aperture")><a class="gh_name">micahjmartin/aperture</a></div><div class="gh_hearts"></div>
</div>
<div class="group body  clickable">
  <div class="gh_description">
    <p>Aperture provides a simple tool for managing and searching Github repositories. Instead of searching all of Github, however,
    Aperture only looks at repositories that you load. A best case scenario for this tool is managing starred repositories.</p>

    ${helpMsg}
  </div>
</div>
<div class="group tags"></div>
</div>`

const noResultsTemplate = `<li>
<div class="listItem">
  <div class="gh_hearts group body"><div class="gh_name">No results found.</div><div></div></div>
</div>
</li>`


// Render the result field for an item
function makeItemResult(item) {
    var tags = ""
    for (i = 0; i < item.topics.length; i++) {
        tags += newTag(item.topics[i])
    }
    return `<li><div class="listItem">
                <div class="group header clickable">
                <div><a class="gh_name" onclick="window.show("https://github.com/"${item.full_name})">${item.full_name}</a></div>
                <div class="gh_hearts">${item.language}</div>
                </div>
                <div class="group body  clickable">
                <div class="gh_description">${item.description}</div>
                </div>
                <div class="group tags">${tags}</div>
            </div></li>`
}


const tag_colors_options = ["yellow", "red", "blue", "aqua", "green", "purple", "pink"]
var tag_colors = {} // Keep track of tag colors so they dont change once assigned

// Return a new tag structure
function newTag(tag) {
    var color
    color = tag_colors[tag]
    if (color == null) {
        color = tag_colors_options[Math.floor(tag_colors_options.length * Math.random())]
        tag_colors[tag] = color
    }
    return `<div class="tag" style="border-color: ${color}">${tag}</div>`
}

function errorResult(err) {
    return `<li>
    <div class="listItem">
      <div class="gh_hearts group body"><div class="gh_name">${err.name}</div><div>${err.message}</div><div></div></div>
    </div>
    </li>`
}