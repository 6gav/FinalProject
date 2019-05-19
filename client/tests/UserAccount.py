import Tools.RandomSets as RandomSets
import random
from os import path
import base64

class Account:
    def __init__(self):
        print(self.randomAccount())

    def randomAccount(self):
        self.email = RandomSets.Email()
        self.username=RandomSets.String()
        self.password=RandomSets.String()
        return (self.email,self.username,self.password)

    def randomFromDummmies(self):
        lines = []
        line = ' '
        reading = True
        while reading:
            try:
                with open(path.dirname(__file__)+"/dummies.txt",'r') as f:
                    for line in f:
                        lines.append(line)
                    reading=False
                pass
            except FileNotFoundError as err:
                reading=False
                return False
                break
                
        account = random.choice(lines)
        account = str(base64.b64decode(account))[2:]
        
        account = account.split('|')
        self.email = account[0]
        self.username = account[1]
        self.password = account[2]
        return (self.email,self.username,self.password)

    def SaveAccount(self):
        f = open(path.dirname(__file__)+"/dummies.txt",'a')
        decodedAccount = "{}|{}|{}".format(self.email,self.username,self.password)
        
        encodedAccount = str(base64.b64encode(decodedAccount.encode('utf-8')))
        encodedAccount = encodedAccount[2:-1]
        f.write(encodedAccount+'\n')
        f.close()


if(__name__ == "__main__"):
    dummy = Account()
    dummy.SaveAccount()
    dummy.randomFromDummmies()