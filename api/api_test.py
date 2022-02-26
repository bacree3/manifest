""" imports """
import requests
from base64 import b64encode
from requests.structures import CaseInsensitiveDict

query_string = "select * from test;"

headers = {
    'query' : query_string,
}

URL = "https://ivbz5omkn7.execute-api.us-east-1.amazonaws.com/ManifestRDSGeneric"

r = requests.get(URL, verify=True, headers=headers)
print(r)
print(r.content)
