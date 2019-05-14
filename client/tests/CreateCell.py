from Login import LoginManager
from Register import RegistrationManager
import time
import Tools.Bots as Bots
reg = RegistrationManager()
log = LoginManager(reg.browser)

print("continue 2")
#reg.run(close=False)
print("continue 1")
log.run(close=False)
print("continue 0")
browser = reg.browser
browser.loadPage("localhost:3000")
browser.click("btn_home_cell_selection")
browser.click("cell_color_4")
browser.click("cell_face_3")
browser.fillByName("")

time.sleep(10)