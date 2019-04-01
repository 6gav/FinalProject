from selenium.webdriver.common.keys import Keys

from os import path
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
import time
import threading
import getpass
import sys

import Tools.RandomSets as RandomSets
import Tools.Bots as Bots
import UserAccount

url = "http://localhost:3000/simulation_m"

browser = Bots.Navigator()

browser.loadPage(url)
for i in range(25):
    message = RandomSets.String()
    browser.fillByName("ib_messages",message,submit=True)
