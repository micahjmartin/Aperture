---
---
const documents = [
{% for repo in site.configs %}{"id": "{{ repo.name | slugify }}", "topics": "{{ repo.topics | join: " " }}", "language": "{{ repo.language }}", "description": `{{ repo.description  }}`, "writeup": `{{ repo.writeup }}`},
{% endfor %}]