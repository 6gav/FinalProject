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

import Register
#endregion

browser = Register.browser
acc = Register.acc
def testLogin():
    Register.testRegistration()


    browser.click('btn_home')
    browser.click("btn_sign_in",wait=1)
    browser.fillByName('log_email_username',acc.email)
    browser.fillByName('log_pass',acc.password)


def run():
    testLogin()
    browser.close()
if __name__ == "__main__":
   # stuff only to run when not called via 'import' here
   run()