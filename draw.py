import cv2
import numpy as np


def putRect(x1, y1, x2, y2, path):

    image = cv2.imread(path)
    h , w, c = image.shape

    red = (250, 0, 0)
    thickness = 1
    ul = (int(x1 * w), int(y1 * h))
    lr = (int(x2 * w), int(y2 * h))
    print(ul)
    print(lr)
    # image = cv2.line(image, start_point, end_point, green, thickness)
    image = cv2.rectangle(image, lr, ul, red, 2)
    

def drawRect():
    windowName = 'Image'
    cv2.imshow(windowName, image)


    cv2.waitKey(0)
    cv2.destroyAllWindows()

putRect( 0.3685145080089569, 0.6515307426452637, 0.6638963222503662, 0.8781070113182068 ,'F:\Python\Tensorflow\\res\\tomato.jpg')
putRect( 0, 0, 100, 100 ,'F:\Python\Tensorflow\\res\\tomato.jpg')
drawRect()

'''
 - (0.3685145080089569, 0.6515307426452637)
 - (0.6638963222503662, 0.6515307426452637)
 - (0.6638963222503662, 0.8781070113182068)
 - (0.3685145080089569, 0.8781070113182068) 
 '''