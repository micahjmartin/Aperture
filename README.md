# Aperture
_A window into the world of your Github repositories_

Aperture provides a simple tool for managing and searching Github repositories. Instead of searching all of Github, however, Aperture only looks at repositories that you load. A best case scenario for this tool is managing starred repositories.
Searching

Github repository text is indexed on the following pieces of information:

* The repository name
* The repository description
* Topics assigned to the repository
* The README file
* Custom meta data that can be added at build time!

![Aperture](https://raw.githubusercontent.com/micahjmartin/Aperture/master/assets/img/aperture.png)

## Adding a repository

Repositories to be scraped are configure by writing simple YAML files. You may init a new repository by running the folloying command:
```
aperture.py init micahjmartin/aperture

>> Initialized Repository file at '~/_data/micahjmartin/aperture/repo.yaml'
```

We now are free to add tags and information to the repository. Once we feel we have a thorough set of information, 
we can scrape the rest of the details off of Github.
> NOTE: The github API does ratelimit, that is why I cache the results here. Data can be easily rebuilt without requerying
github.

```
aperture.py scrape micahjmartin/aperture
>> Scraped results from Github. Saving to ~/_data/micahjmartin/aperture/
```

If the repo has already been scraped, a warning message will be displayed, and no requests will be made.
```
aperture.py scrape micahjmartin/aperture
>> Warning: ~/_data/micahjmartin/aperture/ is already scraped. Ignoring
```

## Bulding the application
When we have all of our repositories ready to go, we may build the application for deployment. This process will automatically scrape any
repos that are missing files.

> NOTE: It is better to scrape applications whenever they are added so the API isn't maxed out all at once.

```
aperture.py build

>> [*] Building application...
>> [*] Discovered 103 repositories...
>> [*] Scraping micahjmartin/aperture... DONE
>> [+] Results saved to 'assets/js/documents.js'
```
