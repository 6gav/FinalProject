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

browser = Bots.Navigator()

#region Write Tests Here
def testRegistration():
    email = RandomSets.Email()
    username=RandomSets.String()
    password=RandomSets.String()
    time.sleep(1)
    browser.loadPage("localhost:3000")
    time.sleep(1)
    browser.click("btn_sign_in")
    time.sleep(0.7)

    #fill out email, username, and password
    browser.fillByName('reg_email',email)
    browser.fillByName('reg_username',username)
    browser.fillByName('reg_pass',password)
    #reveal and hide password
    browser.click('cbx_toggle_pass')
    browser.click('cbx_toggle_pass')
    #confirm password
    browser.fillByName('reg_pass_check',password)

    #reveal and hide password
    browser.click('cbx_toggle_pass')
    browser.click('cbx_toggle_pass')
    #submit form
    browser.click("reg_submit")
#endregion

def run():
    #call tests here
    testRegistration()
    #close browser after 60 seconds.
    browser.close()


run()





