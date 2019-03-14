import random


def DomainAddr():
        domains = [ 'hotmail.com', 'gmail.com', 'aol.com', 'mail.com' , 'mail.kz', 'yahoo.com']
        return domains[random.randint( 0, len(domains)-1)]


def String(length=0):
    email_name = ''
    if(length==0):
        length= random.randint(5,10)
    for i in range(length):
        email_name = email_name + chr(ord('a')+random.randint(0,25))
    return email_name

def Name():
        name = ''
        for i in range(random.randint(1,3)):
                name = name +' '+ String(random.randint(3,13))
                
def Email():
        one_name = str(String(random.randint(6,12)))
        one_domain = str(DomainAddr())         
        random_email = one_name  + '@' + one_domain
        return random_email
        
