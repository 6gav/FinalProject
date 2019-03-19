import Tools.RandomSets as RandomSets
import random
from os import path
import base64

class Account:

    def randomAccount(self):
        self.email = RandomSets.Email()
        self.username=RandomSets.String()
        self.password=RandomSets.String()
        
    def __init__(self):
        self.randomAccount()

    def randomFromDummmies(self):
        lines = []
        line = ' '
        with open(path.dirname(__file__)+"/dummies.txt",'r') as f:
            for line in f:
                lines.append(line)
        account = random.choice(lines)
        account = str(base64.b64decode(account))[2:]
        account = account.split('|')
        self.email = account[0]
        self.username = account[1]
        self.password = account[2]

    def SaveAccount(self):
        f = open(path.dirname(__file__)+"/dummies.txt",'a')
        decodedAccount = "{}|{}|{}".format(self.email,self.username,self.password)
        
        encodedAccount = str(base64.b64encode(decodedAccount.encode('utf-8')))
        encodedAccount = encodedAccount[2:]

        f.write(encodedAccount+'\n')
        f.close()
