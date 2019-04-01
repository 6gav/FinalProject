from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from os import path
import time

class Navigator:
    def __init__(self):
        self.browser = webdriver.Chrome(executable_path=path.dirname(__file__)+'./chromedriver.exe')

    def loadPage(self,url,wait=0.5):
        self.browser.get(url)
        time.sleep(wait)
        
    def fillByName(self,name,text,wait=0.25,submit=False):
        self.browser.find_element_by_name(name).send_keys(text)
        if(submit):
            self.browser.find_element_by_name(name).submit()
        time.sleep(wait)
        
    def click(self,name,wait=0.7):
        self.browser.find_element_by_name(name).click()
        time.sleep(wait)
        
    def close(self):
        print("Finished. closing in 60 seconds")
        time.sleep(50)
        print('closing soon. . .')
        time.sleep(10)
        self.browser.quit()
