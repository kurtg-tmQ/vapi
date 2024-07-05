from trafilatura import fetch_url, extract, extract_metadata
import requests
import sys
import json
import time

def metadata(filecontent):
    return extract_metadata(filecontent).as_dict()

def fetch_html(url):
    try:
        response = requests.get(url)
        html = response.text
        return html
    except requests.exceptions.RequestException as e:
        sys.exit(1)

def compose_final_output(markdown, metadata):
    outputstring = ""
    if meta["title"]:
        outputstring += f"Title: {meta['title']}\n\n"
    if meta["url"]:
        outputstring += f"URL Source:({meta['url']})\n\n"
    if meta["date"]:
        outputstring += f"Published Time: {meta['date']}\n\n"
    if(markdown):
        outputstring += f"Markdown Content:\n{markdown}"

    return outputstring

if __name__ == "__main__":
    url = sys.argv[1] 

    downloaded = fetch_html(url)
    meta = metadata(downloaded)
    output = extract(downloaded, output_format="markdown", include_links=True, include_images=True, max_tree_size=10000)

    final_string = compose_final_output(output, meta)

    print(final_string)
