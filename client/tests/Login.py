#region imports
from selenium import webdriver
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
import UserAccount as UserAccount

#endregion
browser = Bots.Navigator()
acc = UserAccount.Account()
acc.randomFromDummmies()

def testLogin():
    #Register.testRegistration()

    
    browser.loadPage("localhost:3000")

    browser.click('btn_home')
    browser.click("btn_sign_in",wait=1)
    browser.fillByName('log_email',acc.email)
    browser.fillByName('log_pass',acc.password)


def run():
    testLogin()
    browser.close()

if __name__ == "__main__":
   # stuff only to run when not called via 'import' here
   run()