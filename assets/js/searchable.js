---
---
const documents = [
{% for repo in site.repos %}{"id": "{{ repo.name | slugify }}", "topics": "{{ repo.topics | join: " " }}", "language": "{{ repo.language }}", "description": `{{ repo.description  }}`, "writeup": `{{ repo.writeup }}`, "readme": `{{ repo.readme | escape }}`},
{% endfor %}]