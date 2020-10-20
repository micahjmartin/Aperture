#!/usr/bin/env python3
import requests
import yaml
import json
import copy
import os
import re
import sys
import datetime
from ast import literal_eval

headers = {
    "Accept":"application/vnd.github.v3+json, application/vnd.github.mercy-preview+json"
}

TOPIC_MATCHES = {
    "red-team": "redteam",
    "red": "redteam",
    "red-teaming": "redteam",
    "redteaming": "redteam",
    "recon": "reconnaissance",
    "commandline": "cli",
    "cmdline": "cli",
    "command-line": "cli",
    "protocol-buffers": "protobuf",
    "hacking": "offensive",
    "hack": "offensive",
    "offense": "offensive",
    "defense": "defensive",
    "blue-team": "blueteam",
    "infra": "infrastructure",
    "redvsblue": "competition",
    "competitive": "competition",
    "penetration-testing": "offensive",
    "pentest": "offensive",
    "pentesting": "offensive",
    "information-security": "security",
    "infosec": "security",
    "msf": "metasploit",
    "tui": "ui",
    "gui": "ui",
    "blutooth": "bluetooth",
    "ble": "bluetooth",
    "exploit-dev": "exploit",
    "exploitdev": "exploit",
    "re": "reverse-engineering",
    "ml": "machine-learning",
    "wi-fi": "wifi",
    "command-and-control": "c2",
    "rat": "c2",
    "virus": "malware",
    "digital-forensics": "forensics",
    "dfir": "forensics",
    "elasticsearch": "elastic",
    "elk": "elastic",
    "osinttool": "osint",
    "class": "course"
}

# TODO: Add these to the Web UI
SEARCH_GROUPS = {
    "redteam": ["redteam", "offensive", "competition", "metasploit", "c2"],
    "blueteam": ["blueteam", "defensive", "security"],
    "re": ["reverse-engineering", "exploit"],
    "ham": ["radio", "sdr", "p25", "bluetooth", "wifi"],
    "mobile": ["ios", "android"],
    "tools": ["cli", "utility"],
    "education": ["course", "education", "list", "demo", "training"]
}

language_tags = ["python3", "python27", "python2", "golang", "golang-package", "nodejs", "node", "js", "typescript", "javascript", "cpp"]

def normalizeTopics(data):
    """Normalize all the topic names
    
    data (dict): a dictionary contain information about the repo"""
    actual_tags = set()
    tags = [t.lower() for t in data.get("topics", []) if t]
    repo = data.get("full_name", "")
    l_tags = language_tags.copy() + repo.lower().split("/")
    lang = data.get("language", "")
    if lang:
        l_tags.append(lang.lower())
    
    for tag in tags:
        if not tag:
            continue
        if tag in l_tags:
            continue
        replacement = TOPIC_MATCHES.get(tag, None)
        if replacement == "":
            # Sinkhole tag: Skipping
            continue
        if replacement:
            actual_tags.add(TOPIC_MATCHES[tag])
            continue

        if "-" in tag:
            if tag.split("-")[0] in tags:
                # Skip double tags if needed
                continue
            if len(tags) > 8:
                # skip long winded tags like ["onion-service", "onion-services", "open-source", "hidden-services", "endpoint-security", "data-diode"]
                continue
        actual_tags.add(tag)
    data["topics"] = list(actual_tags)

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
        return r.text
    return ""


# Get a repo, repo should be in form "user/repo"
def __getRepo(repo):
    url = "repos/" + repo
    print("[*] Getting repo:", url)
    data = GithubGet(url)
    print("[*] Getting readme:", url+"/readme")
    readme = GetReadme(url)
    return getData(data, readme)

# Get the info we care about
def _getData(data, readme):
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

def SubCommandInit():
    if len(sys.argv) < 3:
        print("USAGE:", sys.argv[0], "init <user/repository>")
        quit(1)
    repo = sys.argv[2]
    url = ""
    if repo.startswith("https://"):
        try:
            url = repo
            repo = "/".join(repo.split("/")[-2:])
            if repo.count("/") != 1:
                raise ValueError("")
            if "github.com" in repo:
                raise ValueError("")
        except:
            print("Invalid name given:", sys.argv[2])
            return
    # Make the directories
    path = os.path.join("_repos/", "_".join(repo.split("/"))+".yaml").lower()
    if not url:
        url = os.path.join("https://github.com/", repo)
    
    if os.path.exists(path):
        print("Repo already exists. Updating")
        # TODO: Rescrape teh repo here
        return

    if "github.com" not in url:
        print("Not a Github repository. Cannot scrape")
        SaveValues({
            "full_name": repo,
            "url": url,
        })
        return

    # We have a github repo. Scrape it
    print("[*] Scraping Github information")
    data = GithubGet("repos/"+repo)
    data["url"] = url
    try:
        print("[*] Scraping Readme")
        readme = GetReadme("repos/"+repo)
        subs = readme.split("\n```")
        data["readme"] = " ".join([" ".join(s.strip().split()) for s in subs[::2]])
    except:
        print("[!] Readme could not be scraped")
    normalizeTopics(data)
    SaveValues(data)
    # Edit if we are in vscode
    if os.environ.get("TERM_PROGRAM") == "vscode":
        print("[+] Editing in VSCODE")
        os.system("code "+path)

"""Save the dictionary of values to a yaml file for Jekyll"""
def SaveValues(values):
    output = {}
    output["name"] = values.get("full_name", "")
    output["link"] = values.get("url", "")
    output["language"] = values.get("language", "")
    output["topics"] = values.get("topics", [])
    output["description"] = values.get("description", "").strip()
    output["writeup"] = values.get("writeup", "").strip()
    try:
        readme = literal_eval(values.get("readme", ""))
    except:
        readme = values.get("readme", "")

    output["readme"] = " ".join(set([i for i in re.split("[^\w]", readme) if i]))
    
    path = os.path.join("_repos/", "_".join(values.get("full_name", "unknown").split("/"))+".yaml").lower()
    with open(path, "w") as fil:
        fil.write("---\n")
        yaml.dump(output, fil, sort_keys=False)
        fil.write("---\n")
    print("[+] Repository file saved to", path)
    

BASEPATH = ""
def main():
    if len(sys.argv) < 2:
        print("USAGE:", sys.argv[0], "init|scrape|build")
        quit()
    global BASEPATH
    if os.path.isdir("_repos"):
        BASEPATH = "_repos"
    if os.path.isdir("../_repos"):
        BASEPATH = "../_repos"
    if not BASEPATH:
        print("[!] ERROR: aperture.py needs to be run from the aperture directory. Cannot find '_repos/'")
        quit(1)

    commands = {
        "init": SubCommandInit,
    }

    fn = commands.get(sys.argv[1])
    if fn:
        fn()
        quit(0)

    print("USAGE:", sys.argv[0], "init|scrape|build")
    quit(1)

if __name__ == "__main__":
    main()
