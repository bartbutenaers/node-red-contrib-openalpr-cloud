# node-red-contrib-openalpr-cloud
A Node Red node for license plate recognition (using the [OpenAlpr](http://www.openalpr.com/) cloud service).  It also allows to recognize the vehicle itself: brand, model, color and type.

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-openalpr-cloud
```

***To use this node, you need to create an OpenAlpr account!  See instructions below.***

## Usage
This node can be used to recognize license plates in images (which costs 1 credit).  Optionally it can be used to recognize vehicles (which costs 1 extra credit): e.g. Ford Mustang ...

Caution: The cloud service expects a ***base64 encoded*** image!

### Example flow 
Don't forget to specify your own secret key...

![openalpr flow](https://raw.githubusercontent.com/bartbutenaers/node-red-contrib-openalpr-cloud/master/images/openalpr_2.png)
```
[{"id":"27cc34d6.6037bc","type":"openalpr-cloud","z":"6beebf75.ed0b5","country":["eu","fr"],"secretKey":"your_secret_key","limit":"20","recognizeVehicle":true,"skipEmpty":true,"passImage":false,"name":"","x":742.7933101654053,"y":2713,"wires":[["a2ece2f.f60ee2","3a8b24b9.a7728c"]]},{"id":"ef2d9eca.21a75","type":"inject","z":"6beebf75.ed0b5","name":"Wife car","topic":"","payload":"https://static.autoblog.nl/images/wp2015/fiat-500-roze-wimpers.jpg","payloadType":"str","repeat":"","crontab":"","once":false,"x":105.95996284484863,"y":2619.66668844223,"wires":[["1d2a7510.65967b"]]},{"id":"aa342c40.0f3e6","type":"base64","z":"6beebf75.ed0b5","name":"","x":586.2382869720459,"y":2712.806315422058,"wires":[["27cc34d6.6037bc"]]},{"id":"1d3c06bb.a09509","type":"http request","z":"6beebf75.ed0b5","name":"Grab image","method":"GET","ret":"bin","url":"","tls":"","delay":0,"x":428.24220085144043,"y":2712.732195854187,"wires":[["aa342c40.0f3e6"]]},{"id":"c3292525.bb8a08","type":"switch","z":"6beebf75.ed0b5","name":"Match plate","property":"payload","propertyType":"msg","rules":[{"t":"cont","v":"WV10LYP","vt":"str"},{"t":"cont","v":"AW852","vt":"str"},{"t":"else"}],"checkall":"true","outputs":3,"x":1076.0677471160889,"y":2713.038344860077,"wires":[["1d16491b.0c06d7"],["78eed963.394bd8"],["754c7830.abf038"]]},{"id":"1d2a7510.65967b","type":"change","z":"6beebf75.ed0b5","name":"Set url","rules":[{"t":"set","p":"url","pt":"msg","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":281.73438453674316,"y":2713.0381903648376,"wires":[["1d3c06bb.a09509"]]},{"id":"8e74de1e.aef8","type":"inject","z":"6beebf75.ed0b5","name":"Daddy car","topic":"","payload":"https://nbocdn.akamaized.net/Assets/Images_Upload/2015/05/24/patton_drivers_2015_1.jpg","payloadType":"str","repeat":"","crontab":"","once":false,"x":105.90105628967285,"y":2666.371522426605,"wires":[["1d2a7510.65967b"]]},{"id":"156b8eca.8e9321","type":"debug","z":"6beebf75.ed0b5","name":"Result","active":true,"console":"false","complete":"payload","x":1412.9014263153076,"y":2713.371953010559,"wires":[]},{"id":"1d16491b.0c06d7","type":"change","z":"6beebf75.ed0b5","name":"Wife home","rules":[{"t":"set","p":"payload","pt":"msg","to":"Wife home.  Hide girlfriend quickly ...","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":1254.734525680542,"y":2671.0384702682495,"wires":[["156b8eca.8e9321"]]},{"id":"78eed963.394bd8","type":"change","z":"6beebf75.ed0b5","name":"Daddy home","rules":[{"t":"set","p":"payload","pt":"msg","to":"Daddy arrived in his favorite vehicle...","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":1253.9011211395264,"y":2713.371735572815,"wires":[["156b8eca.8e9321"]]},{"id":"754c7830.abf038","type":"change","z":"6beebf75.ed0b5","name":"Unknown","rules":[{"t":"set","p":"payload","pt":"msg","to":"Unknown car.  Investigate !!!!!","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":1244.9011211395264,"y":2755.371735572815,"wires":[["156b8eca.8e9321"]]},{"id":"875ce10c.f3812","type":"inject","z":"6beebf75.ed0b5","name":"Unknown car","topic":"","payload":"https://static.autoblog.nl/images/wp2013/kimgun.jpg","payloadType":"str","repeat":"","crontab":"","once":false,"x":114.90102577209473,"y":2713.371455669403,"wires":[["1d2a7510.65967b"]]},{"id":"a2ece2f.f60ee2","type":"jsonpath","z":"6beebf75.ed0b5","expression":"vehicles[0].plate[0].plate","split":false,"name":"Extract plate","x":911.0677318572998,"y":2712.705122947693,"wires":[["c3292525.bb8a08"]]},{"id":"b7dea916.9a1e78","type":"inject","z":"6beebf75.ed0b5","name":"No car","topic":"","payload":"http://www.dirkvanhullebus.be/nl/images/phocagallery/werken/kasseien/thumbs/phoca_thumb_l_Aanleg%20oprit%20plavuizen%20-%20plattinen%20(3).JPG","payloadType":"str","repeat":"","crontab":"","once":false,"x":97,"y":2758.704647064209,"wires":[["1d2a7510.65967b"]]},{"id":"3a8b24b9.a7728c","type":"debug","z":"6beebf75.ed0b5","name":"Plate test","active":true,"console":"false","complete":"true","x":902.0678691864014,"y":2762.3713941574097,"wires":[]}]
```
In this flow, one of the following test images is being send to the cloud service:

![openalpr images](https://raw.githubusercontent.com/bartbutenaers/node-red-contrib-openalpr-cloud/master/images/openalpr_1.png)

The flow will try to recognize the license plate, and match the plate to a list of known plates (wife, daddy, ...).  If the plate is not available in the list of known plates, a warning will be displayed.

Since the number of (free) recognitions per month is rather limited, you might want to pay for extra credits.  If you are limited to the free credits, it is adviced to ***restrict the number of required recognitions*** to a minimum.  For example only capture images from your driveway camera, as soon as motion is detected (by camera, pir sensor, laser beam, photovoltaic cell, ...).  When the recognized license *plate* is unknown, you could do a second recognition to recognize the *vehicle* itself (color, brand ...).

*Remark: since all above photographs used are freely available on the internet, I assume there is no copyright protection required to use them.*

### Output message
The output message contains following fields (example for image containing 1 single vehicle):
```
{
   "payload":{
      "vehicles":[                              --> One element in this list for every vehicle in the input image
         {
            "plate":[
               {
                  "plate":"WV10LYP",            --> The plate number that has the highest confidence
                  "confidence":94.989456,       --> The algorithm is 94,98% sure that "WV10LYP" is the correct plate number
                  "matches_template":0
               },
               {
                  "plate":"WV1LYP",             --> The plate number that has the a bit less confidence
                  "confidence":81.562553,       --> The algorithm is only 81% sure that "WV1LYP" is the correct plate number
                  "matches_template":0
               },
               ...                              --> Other plate numbers that have even lesser confidence ...
            ],
            "brand":[                           --> The vehicle brand is optionally available (when vehicle recognition is activated)
               {
                  "name":"fiat",                --> The vehicle brand that has the highest confidence
                  "confidence":99.999466        --> The algorithm is 99,99% sure that "fiat" is the correct vehicle brand
               },
               {
                  "name":"smart",               --> The vehicle brand that has the a bit less confidence
                  "confidence":0.000316         --> The algorithm is only 0,0003% sure that "smart" is the correct vehicle brand
               },
               ...                              --> Other vehicle brands that have even lesser confidence ...
            ],
            "model":[                           --> The vehicle model is optionally available (when vehicle recognition is activated)
               {
                  "name":"fiat_500",            --> The vehicle model that has the highest confidence
                  "confidence":99.998962        --> The algorithm is 99,99% sure that "fiat 500" is the correct vehicle model
               },
               {
                  "name":"smart_fortwo",        --> The vehicle model that has the a bit less confidence
                  "confidence":0.000543         --> The algorithm is only 0,0005% sure that "smart fortwo" is the correct vehicle model
               },
               ...                              --> Other vehicle models that have even lesser confidence ...
            ],
            "color":[                           --> The vehicle color is optionally available (when vehicle recognition is activated)
               {
                  "name":"red",                 --> The vehicle color that has the highest confidence
                  "confidence":99.145378        --> The algorithm is 99,14% sure that "red" is the correct vehicle color
               },
               {
                  "name":"blue",                --> The vehicle color that has the a bit less confidence
                  "confidence":0.737528         --> The algorithm is only 0,73% sure that "blue" is the correct vehicle color
               },
               ...                              --> Other vehicle colors that have even lesser confidence ...
            ],
            "type":[                            --> The vehicle type is optionally available (when vehicle recognition is activated)
               {
                  "name":"sedan-compact",       --> The vehicle type that has the highest confidence
                  "confidence":99.996887        --> The algorithm is 99,99% sure that "sedan-compact" is the correct vehicle type
               },
               {
                  "name":"sedan-convertible",   --> The vehicle type that has the a bit less confidence
                  "confidence":0.002865         --> The algorithm is only 0,002% sure that "convertible" is the correct vehicle type
               },
               ...
            ],
            "plate_coordinates":[               --> Coordinates of the 4 rectangle points, for the number plate area
               {
                  "x":93,
                  "y":270
               },
               {
                  "x":188,
                  "y":293
               },
               {
                  "x":183,
                  "y":319
               },
               {
                  "x":88,
                  "y":296
               }
            ]
         }
      ]
   },
   "credits":{
      "monthly_total":1500,                     --> The number of credits you can use every month
      "monthly_used":187,                       --> The number of credtis you have already used this month
      "cost":2                                  --> The number of credits used for this recognition (1 for plate + 1 for vehicle)
   }
   "image": ...                                 --> Optional the (base64 encoded) input image, if 'pass image to output' is selected
}
```
So all data (plate, color, brand ...) will be returned N times, accompanied by a ***confidence percentage***.

It might be a good idea to ***monitor*** whether monthly_used < monthly_total in a Node-Red flow, and give a warning when the monthly credits have been exceeded!

## Node configuration

### Country
Each country or region has it's own license plate styles (e.g. margin between the characters and the border), which is defined in it's training set.  Multiple countries can be selected: in that case the recognition will take into account all these training sets. 

### Secret key
This secret key is required to identify yourself on the cloud service.  The secret key is available on your [account](https://cloud.openalpr.com/cloudapi/): see instructions below.  

### Limit
Limit the number of license plate *candidate*s we want to receive.  Since a license plate cannot be recognized with 100% certainty, this node will return an entire list of possible license plates (with descending certainty).  In most cases it should be sufficient to get only a single plate (color, brand, ...) instead of a list: in those cases a value of `1` should be enough.   Remark: A value of `0` means no limit.

### Recognize vehicle
By enabling this option, the vehicle will also be recognized.  This means the vehicle brand, model, color and type.
Watch out: a license plate recognition will use one credit and vehicle recognition will use an extra credit!

### Only send output msg when plates found
By enabling this option, the output msg will only be send when the input image contains number plates. When no plates are recognized in the input message, no message will be send on the output.  When disabling this option, the output can contain an empty ```msg.payload.vehicles``` list (when no license plates have been recongized).
 
### Pass image to output msg
By enabling this option, the input image will also be passed in the output ```msg.image```.  This could be useful e.g. to draw afterwards a border around each license plate in the image (based on the ```coordinates``` property, available in each element of ```msg.payload.vehicles```).  Remark: the *output image is identical to the input image* (e.g. ***no rectangle*** is drawn around the plate).

## OpenAlpr 

### The project
OpenAlpr is a magnificent open source [project](https://github.com/openalpr/openalpr) written in C++ by Matthew Hill.  The platform can be used in two different ways:
- Install the project ***locally***.  Then you could access it in Node-Red via their NodeJs [bindings](https://www.npmjs.com/package/node-openalpr).  
- Call the ***cloud service***.

Since the project depends on a series of other C++ projects, it seemed to be very difficult to install it e.g. on a Raspberry Pi platform.  Moreover the recognition uses a lot of CPU.  Therefore I started using their cloud service ... 

### Create account
Before this node can be used, one should sign up to create an account.  A free account includes 2000 recognitions.  
When more recognitions are required, multiple <a href="http://www.openalpr.com/cloud-api.html">payment plans</a> are available.

- Navigate to www.openalpr.com
- Start creating a new account via the menu button:
![openalpr menu](https://raw.githubusercontent.com/bartbutenaers/node-red-contrib-openalpr-cloud/master/images/openalpr_3.png)
- Fill in all the required information
- Once finished, the ***secret key*** will be displayed (which you need to copy to your node properties):
![openalpr secretkey](https://raw.githubusercontent.com/bartbutenaers/node-red-contrib-openalpr-cloud/master/images/openalpr_4.png)

### Online demo
To test the cloud service, an [online demo](http://www.openalpr.com/cloud-api.html) is available.  You can upload a picture manually, which will be used as input for the recognition service.

## Troubleshooting
When the result of the recognition doesn't meet your expectations, following tips might perhaps be a little help:
- Make sure your camera is placed correctly: see Openalpr [documentation](http://doc.openalpr.com/camera_placement.html).
- Do some tests with the online demo (see above).  Place your camera at different places, and repeat the online test.
- Get feedback from the Openalpr [forum](https://groups.google.com/forum/#!forum/openalpr).
- Get feedback from the Openalpr [issue list](https://github.com/openalpr/openalpr/issues)

Please don't create issues in this repository related to incorrect recognitions.  This node is only a thin wrapper around the cloud service...
