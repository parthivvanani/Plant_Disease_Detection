import re

def getcsv():
    str = []
    with open("data/tomato.csv", 'r') as tomato:
        str = tomato.readlines()
    tomato.close()
    return str

def validate(s):
    return "VALIDATE," + s

def train(s):
    return "TRAIN," + s

def test(s):
    return "TEST," + s

def searchAndReplace(s, name, counter, count):
    if( re.search(name, s)):
        if(count < 0):
            s = test(s)
            s = s[:-1] + "," + "tomato_leaf" + "," + s.split(",")[1].split("/")[-2] + "\n"
        else:
            if(counter < count) :
                s = train(s)
                counter = counter + 1
            else:
                s = validate(s)
                counter = 0
            s = s[:-1] + "," + "tomato_leaf" + "," + name.split("/")[-1] + "\n"
    return s, counter

def changeData(str):
    bacterial_spot = 0
    black_mold = 0
    gray_spot = 0
    health = 0
    late_blight = 0
    powdery_mildew = 0
    for i in range(len(str)):
        # if (re.search("^gs://tomato_disease_uwin/train/bacterial_spot", str[i])):
        #     str[i] = "VALIDATE," + str[i]
        
        str[i], temp = searchAndReplace(str[i], "^gs://tomato_disease_uwin/test/", -1, -1)

        str[i], bacterial_spot = searchAndReplace(str[i], "^gs://tomato_disease_uwin/train/bacterial_spot", bacterial_spot, 8)

        str[i], black_mold = searchAndReplace(str[i], "^gs://tomato_disease_uwin/train/black_mold", black_mold, 7)
        
        str[i], gray_spot = searchAndReplace(str[i], "^gs://tomato_disease_uwin/train/gray_spot", gray_spot, 8)

        str[i], health = searchAndReplace(str[i], "^gs://tomato_disease_uwin/train/health", health, 8)

        str[i], late_blight = searchAndReplace(str[i], "^gs://tomato_disease_uwin/train/late_blight", late_blight, 8)

        str[i], powdery_mildew = searchAndReplace(str[i], "^gs://tomato_disease_uwin/train/powdery_mildew", powdery_mildew, 8)

    return str

def updateCSV(str):
    with open("data/tomato1.csv", 'w') as tomato:
        tomato.writelines(str)
    tomato.close()

def run():
    str = getcsv()
    str = changeData(str)
    updateCSV(str)
    # with open("data/tomato.csv", 'r') as tomato:
    #     str = tomato.readlines()
    #     for s in str:
    #         x = re.search("jpg", s)
    #         if(x):
    #             pass
    #         else:
    #             print(s)
            
                

run()