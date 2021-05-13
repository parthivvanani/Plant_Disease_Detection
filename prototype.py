import cv2
import sys

if(len(sys.argv) <= 1) :
    print("Usage: py test.py [IMAGE PATH]")

def localize_objects(path):
    from google.cloud import vision
    client = vision.ImageAnnotatorClient()

    with open(path, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content = content)


    objects = client.object_localization(image = image).localized_object_annotations
    
    image = cv2.imread(path)
    h , w, c = image.shape
    red = (250, 0, 0)
    
    objects = [object_ for object_ in objects if object_.score > 0.5 and object_.name == 'Tomato']
    if(len(objects) == 0):
        print("Given image has no tomatoes")
    else:
        print("Tomatoes found : {} ".format(len(objects)))
        
    for object_ in objects:
        print('\n{} (confidence:{})'.format(object_.name, object_.score))
        # print('NOrmalized boudding polygon vertices: ' )
        corners = []
        for vertix in object_.bounding_poly.normalized_vertices:
            if(vertix is not None):
                # print(' - ({}, {})'.format(vertix.x, vertix.y))
                corners.append( ( int(vertix.x * w), int(vertix.y * h) ) )
            else:
                print("None")
        image = cv2.rectangle(image, corners[0], corners[2], red, 2)

    windowName = 'Image'
    cv2.imshow(windowName, image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


localize_objects(sys.argv[1])
# from PIL import Image

# image = Image.open('res/tomato.jpg')
# image.show()