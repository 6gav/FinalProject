from Login import LoginManager
from Register import RegistrationManager
from UserAccount import Account
from Tools.RandomSets import String as RanStr
import time
import Tools.Bots as Bots
reg = RegistrationManager()
log = LoginManager(reg.browser)

print("continue 2")
reg.run(close=False)
print("continue 1")
log.run(close=False)
account = log.acc
print("continue 0")
browser = reg.browser
browser.loadPage("localhost:3000/simulation_editor")
browser.click("cell_color_4")
browser.click("cell_face_3")
browser.fillByName("cell_name","Bot_{}_{}".format(account.username,RanStr(5)))
browser.click("cell_form_submit")
browser.loadPage("localhost:3000")
browser.click("btn_singleplayer")
time.sleep(10)