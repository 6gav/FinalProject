#region imports
from selenium import webdriver
Keys = webdriver.common.keys.Keys
By = webdriver.common.by.By
from os import path
import time

import Tools.RandomSets as RandomSets
import Tools.Bots as Bots;
import UserAccount

#endregion

class RegistrationManager():
    def __init__(self,bot=None):
        if(bot == None):
            self.browser = Bots.Navigator()
        else:
            self.browser = bot
        self.acc = UserAccount.Account()
        self.acc.randomAccount()
    def testRegistration(self):
        time.sleep(1)
        self.browser.loadPage("localhost:3000")
        time.sleep(1)
        self.browser.click("btn_sign_in")
        time.sleep(0.7)

        #fill out email, username, and password
        self.browser.fillByName('reg_email',self.acc.email)
        self.browser.fillByName('reg_username',self.acc.username)
        self.browser.fillByName('reg_pass',self.acc.password)
        #reveal and hide password
        self.browser.click('reg_cbx_toggle_pass')
        self.browser.click('reg_cbx_toggle_pass')
        #confirm password
        self.browser.fillByName('reg_pass_check',self.acc.password)

        #reveal and hide password
        self.browser.click('reg_cbx_toggle_pass')
        self.browser.click('reg_cbx_toggle_pass')
        #submit form
        self.browser.click("reg_submit")
        self.acc.SaveAccount()
        
    def run(self,close=True):
        #call tests here
        self.testRegistration()
        #close browser after 60 seconds.
        
        if close == True:
            self.browser.close() 


if __name__ == "__main__":
   # stuff only to run when not called via 'import' here
   bot = RegistrationManager()
   bot.run()

