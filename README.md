# node-red-contrib-openalpr-cloud
A Node Red node for license plate recognition (using the [OpenAlpr](http://www.openalpr.com/) cloud service)

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-openalpr-cloud
```

***To use this node, you need to create an OpenAlpr account!  See instructions below.***

## Usage
This node can be used to recognize license plates in images.  Optionally it can be used to recognize vehicles (e.g. Ford Mustang ...).
Remark: The cloud service expects a ***base64*** encoded image, so the image (get from a specified URL) should be encoded in advance:

Example flow:
![openalpr 1](https://raw.githubusercontent.com/bartbutenaers/node-red-contrib-openalpr/master/images/openalpr1.png)
```
[{"id":"8a9fe6aa.0c27c8","type":"openalpr-cloud","z":"6beebf75.ed0b5","country":["eu"],"secretKey":"your_key","limit":"20","recognizeVehicle":true,"name":"","x":649.5589714050293,"y":2438.295090675354,"wires":[["9856d781.8a4538"]]},{"id":"9856d781.8a4538","type":"debug","z":"6beebf75.ed0b5","name":"","active":true,"console":"false","complete":"true","x":816.559024810791,"y":2438.6285877227783,"wires":[]},{"id":"d59140ec.2c5b","type":"inject","z":"6beebf75.ed0b5","name":"Start","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":152.72559356689453,"y":2437.961980819702,"wires":[["cfcffa11.770968"]]},{"id":"c508004d.b66bc","type":"base64","z":"6beebf75.ed0b5","name":"","x":473.00390625,"y":2438.1015625,"wires":[["8a9fe6aa.0c27c8"]]},{"id":"cfcffa11.770968","type":"http request","z":"6beebf75.ed0b5","name":"Get image","method":"GET","ret":"bin","url":"http://www.autofans.be/sites/default/files/styles/artikel_body/public/media/varia/nummerplaat-06.jpg","tls":"","delay":0,"x":306.00782012939453,"y":2438.027442932129,"wires":[["c508004d.b66bc"]]}]
```

```json
{
    "data_type": "alpr_results",
    "epoch_time": 1448299357883,
    "img_height": 480,
    "img_width": 640,
    "results": [
        {
            "plate": "AKS4329",
            "confidence": 86.457352,
            "region_confidence": 95,
            "region": "ga",
            "plate_index": 0,
            "processing_time_ms": 84.982811,
            "candidates": [
                {
                    "matches_template": 0,
                    "plate": "AKS43Z9",
                    "confidence": 88.429092
                },
                {
                    "matches_template": 1,
                    "plate": "AKS4329",
                    "confidence": 86.457352
                },
                {
                    "matches_template": 0,
                    "plate": "AKS3Z9",
                    "confidence": 79.028625
                },
                {
                    "matches_template": 0,
                    "plate": "AKS329",
                    "confidence": 77.056877
                }
            ],
            "coordinates": [
                {
                    "y": 128,
                    "x": 286
                },
                {
                    "y": 129,
                    "x": 360
                },
                {
                    "y": 159,
                    "x": 360
                },
                {
                    "y": 157,
                    "x": 286
                }
            ],
            "matches_template": 1,
            "requested_topn": 20
        }
    ],
    "version": 2,
    "processing_time_ms": 172.226624,
    "regions_of_interest": []
}
```

## Node configuration

### Country
Each country or region has it's own license plate styles (e.g. margin between the characters and the border).

Watch out: One or more countries can be selected.  However when multiple countries are selected, the cloud service returns an error message. 

### Secret key
This secret key is required to identify yourself on the cloud service.  The secret key is available on your [account](https://cloud.openalpr.com/cloudapi/): see instructions below.  

### Limit
Limit the number of license plates we want to receive.  Indeed a license plate cannot be recognized with 100% certainty: therefore a number of possible license plate texts will be returned (with descending certainty). A value of `0` means no limit.

### Vehicle recognition
By enabling this option, the vehicle will also be recognized (e.g. 'white Ford Focus).  
Watch out: a license plate recognition will use one credit and vehicle recognition will use an extra credit!

## OpenAlpr 

### The project
OpenAlpr is a magnificent open source [project](https://github.com/openalpr/openalpr) written in C++ by Matthew Hill.  The platform can be used in two different ways:
- Install the project ***locally***.  Then you could access it in Node-Red via their NodeJs [bindings](https://www.npmjs.com/package/node-openalpr).  
- Call the ***cloud service***.

Since the project depends on a series of other C++ projects, it seemed to be very difficult to install it e.g. on a Raspberry Pi platform.  Moreover the recognition uses a lot of CPU.  Therefore I started using their cloud service ... 

### Account
Before this node can be used, one should sign up to create an account.  A free account includes 2000 recognitions.  
When more recognitions are required, multiple <a href="http://www.openalpr.com/cloud-api.html">payment plans</a> are available.

### Online demo
To test the cloud service, an [online demo](http://www.openalpr.com/cloud-api.html) is available.  You can upload a picture manually, which will be used as input for the recognition service.

## Troubleshooting
When the result of the recognition doesn't meet your expectations, following tips might perhaps be a little help:
- Make sure your camera is placed correctly: see Openalpr [documentation](http://doc.openalpr.com/camera_placement.html).
- Do some tests with the online demo (see above).  Place your camera at different places, and repeat the online test.
- Get feedback from the Openalpr [forum](https://groups.google.com/forum/#!forum/openalpr).
- Get feedback from the Openalpr [issue list](https://github.com/openalpr/openalpr/issues)

Please don't create issues in this repository related to incorrect recognitions.  This node is only a thin wrapper around the cloud service...
