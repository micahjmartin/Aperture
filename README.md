# Aperture
_A window into the world of your Github repositories_

Aperture provides a simple tool for managing and searching Github repositories. Instead of searching all of Github, however, Aperture only looks at repositories that you load. A best case scenario for this tool is managing starred repositories.
Searching

Github repository text is indexed on the following pieces of information:

* The repository name
* The repository description
* Topics assigned to the repository
* Any custom data added at load time
* The README file (optional)

A few search modifiers are provided. To use a search modifier, simply prepend the modifer to the query. Modifiers:

* _ALL:_  
    By default a repository matches if ANY of the words in the search term match text. This modifer requires all search terms to match the repository text.
    
* _WORD:_  
    By default words can partially match off the beginning. This modifer requires all search terms to exactly match a word.
    
* _README:_  
    Include the contents of the README in the search. By default, it is omitted.

* _FIELDS [field]...:_  
    Only search within the given fields. The possible options for fields are `description`, `name`, `owner`, `topics`, `language`, `readme`

Examples

Find all the golang projects:
```
WORD: FIELDS language: go
```

Find python projects involving redteam:
```
ALL: python red team
```