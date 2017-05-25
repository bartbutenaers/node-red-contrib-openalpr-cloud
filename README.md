# node-red-contrib-openalpr-cloud
A Node Red node for license plate recognition (using the [OpenAlpr](http://www.openalpr.com/) cloud service)

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-openalpr-cloud
```

***To use this node, create an OpenAlpr account!  See instructions below.***

## Usage
OpenAlpr is a magnificent open source [project](https://github.com/openalpr/openalpr) written in C++ by Matthew Hill.  The platform could be installed ***locally*** (and used in Node-Red via their NodeJs [bindings](https://www.npmjs.com/package/node-openalpr)).  However (since it depends on a series of other C++ projects) it seemed to be very difficult to install it e.g. on a Raspberry Pi platform.  Moreover the recognition uses a lot of CPU.  Therefore I started using their cloud service ... 

Some interesting information is available in the [wiki](https://github.com/openalpr/openalpr/wiki/Camera-Calibration), the [forum](https://groups.google.com/forum/#!forum/openalpr) and [documentation](http://doc.openalpr.com/index.html).  A online [test](http://www.openalpr.com/cloud-api.html) is also available where an image can be uploaded manually. 

## Node configuration

### Country
Each country or region has it's own license plate styles (e.g. margin between the characters and the border).
Select one or more countries in the list.  The recognition will take into account all the selected countries.

### Secret key
This secret key is required to identify yourself on the cloud service.  The secret key is available on your [account](https://cloud.openalpr.com/cloudapi/): see instructions below.  

### Limit
Limit the number of license plates we want to receive.  A value of `0` means no limit.

### Vehicle recognition
By enabling this option, the vehicle will also be recognized (e.g. 'white Ford Focus).  
Watch out: a license plate recognition will use one credit and vehicle recognition will use an extra credit!

## OpenAlpr account

A free account includes 2000 recognitions.  
When more recognitions are required, multiple <a href="http://www.openalpr.com/cloud-api.html">payment plans</a> are available.
