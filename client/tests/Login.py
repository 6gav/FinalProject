#region imports
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

from os import path
from bs4 import BeautifulSoup
import time
import threading
import getpass
import sys

import Tools.RandomSets as RandomSets
import Tools.Bots as Bots
import UserAccount as UserAccount

print("H")
#endregion
class LoginManager():
    def __init__(self,bot=None):
        if(bot == None):
            self.browser = Bots.Navigator()
        else:
            self.browser = bot
        self.acc = UserAccount.Account()
        self.ready = self.acc.randomFromDummmies()
        
                
        
    def testLogin(self):
        #Register.testRegistration()
        print(self.ready)
        if(self.ready != False):
            self.browser.loadPage("localhost:3000")

            self.browser.click('btn_home')
            self.browser.click("btn_sign_in",wait=1)
            self.browser.fillByName('log_email',self.acc.email)
            self.browser.fillByName('log_pass',self.acc.password)
            self.browser.click("log_submit")
        else:
            print("Login Failed.")


    def run(self, close=True):
        self.testLogin()
        if close == True:
            self.browser.close() 
        return True

if __name__ == "__main__":
   # stuff only to run when not called via 'import' here
    login = LoginManager();
    login.run()