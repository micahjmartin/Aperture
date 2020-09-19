import requests
import json
import copy
import os
import sys
import datetime

headers = {
    "Accept":"application/vnd.github.v3+json, application/vnd.github.mercy-preview+json"
}

outfile = "data/results.jsonl"
outfile2 = "data/repos.txt"

exists = set()
if os.path.exists(outfile2):
    # Check to see if this repo has been gathered already
        with open(outfile2) as fil:
            for line in fil.readlines():
                data = line.split()
                if data and data[0]:
                    exists.add(data[0])

def GithubGet(url):
    url = os.path.join("https://api.github.com", url)
    r = requests.get(url, headers=headers)

    if r.status_code != 200:
        print("Error getting '{}', Response code: {}".format(url, r.status_code))
        print(r.text)
        raise ValueError("Error getting '{}', Response code: {}".format(url, r.status_code))
    
    return r.json()

def GetReadme(url):
    data = GithubGet(url+"/readme")
    if data.get("download_url"):
        r = requests.get(data.get("download_url"))
        if r.status_code != 200:
            return ""
        data = r.text
        subs = data.split("\n```")
        subs = " ".join([" ".join(s.strip().split()) for s in subs[::2]])
        return subs
    return ""


# Get a repo, repo should be in form "user/repo"
def getRepo(repo):
    if repo in exists:
        raise ValueError("Repo has already been scraped. Skipping")

    url = "repos/" + repo
    print("[*] Getting repo:", url)
    data = GithubGet(url)
    print("[*] Getting readme:", url+"/readme")
    readme = GetReadme(url)
    return getData(data, readme)

# Get the info we care about
def getData(data, readme):
    new = {}
    new['owner'] = data.get("owner", {}).get("login")
    new["name"] = data.get("name", "")
    new["full_name"] = data.get("full_name", "")
    new["language"] = data.get("language", "")
    new["forks"] = data.get("forks_count", "")
    new["stargazers"] = data.get("stargazers_count", "")
    new["description"] = data.get("description", "")
    new["topics"] = data.get("topics", [])
    new["topics_string"] = " ".join(new["topics"])
    new["readme"] = readme
    return new

def save(repo, data):
    mode = "a"
    if not os.path.exists(outfile):
        mode = "w"
    with open(outfile, mode) as fil:
        fil.write(json.dumps(data)+"\n")
    mode = "a"
    if not os.path.exists(outfile2):
        mode = "w"
    with open(outfile2, mode) as fil:
        fil.write("{} {}\n".format(repo, datetime.datetime.now()))
    print("Saved", repo)


def main():
    if len(sys.argv) < 2:
        print("USAGE:", sys.argv[0], "[username/repository]....")
        quit()

    if sys.argv[1].startswith("-c"):
        with open(outfile) as fil:
            lines = fil.readlines()
            counter = 0
            with open("assets/js/documents.js", "w") as fil2:
                fil2.write("const documents = [\n")
                for line in lines:
                    data = json.loads(line)
                    data["id"] = counter
                    fil2.write(json.dumps(data) + ",\n")
                    counter += 1
                fil2.write("]")
        print("Converted", outfile, "to documents")
        quit()
    for repo in sys.argv[1:]:
        # Sanity check
        try:
            if repo.count("/") != 1:
                raise ValueError("Not a valid github reposity")
            data = getRepo(repo)
            save(repo, data)
        except Exception as E:
            print("Error Scraping", repo, "-", E)
    

if __name__ == "__main__":
    main()