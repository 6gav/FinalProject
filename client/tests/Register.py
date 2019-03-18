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
import random

import Tools.RandomSets as RandomSets
import Tools.Bots as Bots
import UserAccount
#endregion



browser = Bots.Navigator()
acc = UserAccount.Account()
acc.randomAccount()

#region Write Tests Here
def testRegistration():
    time.sleep(1)
    browser.loadPage("localhost:3000")
    time.sleep(1)
    browser.click("btn_sign_in")
    time.sleep(0.7)

    #fill out email, username, and password
    browser.fillByName('reg_email',acc.email)
    browser.fillByName('reg_username',acc.username)
    browser.fillByName('reg_pass',acc.password)
    #reveal and hide password
    browser.click('reg_cbx_toggle_pass')
    browser.click('reg_cbx_toggle_pass')
    #confirm password
    browser.fillByName('reg_pass_check',acc.password)

    #reveal and hide password
    browser.click('reg_cbx_toggle_pass')
    browser.click('reg_cbx_toggle_pass')
    #submit form
    browser.click("reg_submit")
    acc.SaveAccount()
        
#endregion


def run():
    #call tests here
    testRegistration()
    #close browser after 60 seconds.
    browser.close()


if __name__ == "__main__":
   # stuff only to run when not called via 'import' here
   run()



