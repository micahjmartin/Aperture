#!/usr/bin/env python3
import requests
import yaml
import json
import copy
import os
import sys
import datetime

headers = {
    "Accept":"application/vnd.github.v3+json, application/vnd.github.mercy-preview+json"
}

outfile = "_data/results.jsonl"
outfile2 = "_data/repos.txt"

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

"""subs = data.split("\n```")
        subs = " ".join([" ".join(s.strip().split()) for s in subs[::2]])
        return subs"""

def GetReadme(url):
    data = GithubGet(url+"/readme")
    if data.get("download_url"):
        r = requests.get(data.get("download_url"))
        if r.status_code != 200:
            return ""
        return r.text
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

def SubCommandInit():
    if len(sys.argv) < 3:
        print("USAGE:", sys.argv[0], "init <user/repository>")
        quit(1)
    repo = sys.argv[2]
    # Make the directories
    base_path = os.path.join(BASEPATH, repo)
    os.makedirs(base_path)
    data = {
        "name": repo,
        "url": os.path.join("https://github.com/", repo),
        "scrape": True,
        "ignoredescription": False,
        "tags": [],
        "writeup": "",
    }

    fname = os.path.join(base_path, "repo.yaml")
    with open(fname, "w") as fil:
        yaml.dump(data, fil)
        print("Initialized Repository file at '{}'".format(fname))
    
    quit(0)

# Scrape a repo configuration file
def ScrapeFile(repoConfig):
    if not os.path.exists(repoConfig):
        raise ValueError("File does not exist: "+repoConfig)
    with open(repoConfig) as fil:
        data = yaml.safe_load(fil)
    repo = data.get("name")
    if not repo:
        raise ValueError("Invalid repo file: "+repoConfig+", repository name not specified")
    scrape = data.get("scrape", False)
    if not scrape:
        raise ValueError("Repo file not marked for scraping: "+repoConfig)
    basepath, _ = os.path.split(repoConfig)    
    needsReadme = False
    if not os.path.exists(os.path.join(basepath, "README.md")):
        needsReadme = True
    needsRepoDetails = False
    if not os.path.exists(os.path.join(basepath, "info.json")):
        needsRepoDetails = True
    if not needsReadme and not needsRepoDetails:
        raise ValueError("Repo file does not need scraped: "+ repoConfig)
    if needsRepoDetails:
        data = GithubGet("repos/"+repo)
        with open(os.path.join(basepath, "info.json"), "w") as ofil:
            if data:
                json.dump(data, ofil)
        print("[+] Saved repository information for", repo)

    if needsReadme:
        data = GetReadme("repos/"+repo)
        with open(os.path.join(basepath, "README.md"), "w") as ofil:
            if data:
                json.dump(data, ofil)
                print("[+] Saved README for", repo)
    return

def SubCommandScrape():
    if len(sys.argv) < 3:
        print("USAGE:", sys.argv[0], "scrape <user/repository>")
        quit(1)
    repo = sys.argv[2]
    ScrapeFile(os.path.join(BASEPATH, repo, "repo.yaml"))

BASEPATH = ""
def main():
    if len(sys.argv) < 2:
        print("USAGE:", sys.argv[0], "init|scrape|build")
        quit()
    global BASEPATH
    if os.path.isdir("_data"):
        BASEPATH = "_data"
    if os.path.isdir("../_data"):
        BASEPATH = "../_data"
    if not BASEPATH:
        print("[!] ERROR: aperture.py needs to be run from the aperture directory. Cannot find '_data/'")
        quit(1)
    
    commands = {
        "init": SubCommandInit,
        "scrape": SubCommandScrape
    }

    fn = commands.get(sys.argv[1])
    if fn:
        fn()
        quit(0)

    print("USAGE:", sys.argv[0], "init|scrape|build")
    quit(1)
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