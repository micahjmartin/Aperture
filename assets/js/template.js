let helpMsg = `<dev class="gh_name">Searching</dev>
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
  </ul>
  
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
</li>
<li>
<div class="listItem">
  <div class="gh_hearts group body">${helpMsg}</div>
</div>
</li>`