/**
 * Copyright 2017 Bart Butenaers
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
 module.exports = function(RED) {
    var settings = RED.settings;  
    var OpenalprApi = require('openalpr_api');

    function OpenAlprCloudNode(n) {
        RED.nodes.createNode(this,n);
        // Join all the countries (to a comma separated string)
        this.countries = n.country.join();
        this.secretKey = n.secretKey;
        this.limit = n.limit;
        this.recognizeVehicle = n.recognizeVehicle;
        this.skipEmpty = n.skipEmpty;
        this.passImage = n.passImage;
        this.name = n.name;
        
        var buffer = null;        
        var node = this;       
        
        var api = new OpenalprApi.DefaultApi();

        node.on("input", function(msg) {         
            // Cannot handle two images simultaneously
            if (buffer != null) {
                return;
            }
          
            node.status({fill: "blue", shape: "dot", text: "Recognizing"});
  
            buffer = msg.payload;
            if (!Buffer.isBuffer(buffer)) {
                buffer = Buffer.from(buffer);
            }    
            
            var options = {};
            options.state = '';
            options.returnImage = 0;
            options.prewarp = '';
            
            if (node.recognizeVehicle) {
                options.recognizeVehicle = 1;
            }
            else {
                options.recognizeVehicle = 0;
            }
            
            if (node.limit > 0) {
                // Only pass the 'topn' number, if a limit has been specified
                options.topn = this.limit;
            }

            // The OpenAlpr-Api NodeJs module wraps the V2 webservice (REST).
            api.recognizeBytes(buffer.toString(), node.secretKey, node.countries, options,  function(error, body, response) {
                if (error || response.statusCode != 200 || body == null) {
                    node.status({fill: "red", shape: "ring", text: "Error"});
                }
                else {          
                    // Clone the JSON body, since it seems to be sealed by the swagger module.  Indeed when the output message is cloned by Node-Red
                    // (to send it over multiple wires), the clone object has no values.  Since the JSON object properties are non-configurable (they
                    // have no setter), the values cannot be copied to it.  By creating a clone, we can 'workaround' this issue.
                    body = JSON.parse(JSON.stringify(body));
                
                    var outputMsg = {};
                    outputMsg.payload = {};
                    outputMsg.payload.vehicles = [];
                    
                    for (var i = 0; i < body.results.length; i++) {
                        var result = body.results[i];
                        var vehicle = {};
                        
                        vehicle.plate = result.candidates;
            
                        if (node.recognizeVehicle) {
                            vehicle.brand = result.vehicle.make;
                            vehicle.model = result.vehicle.make_model;
                            vehicle.color = result.vehicle.color;
                            vehicle.type  = result.vehicle.body_type;
                        }   
                        
                        vehicle.plate_coordinates = result.coordinates;
                        
                        outputMsg.payload.vehicles.push(vehicle);
                    }
                                        
                    outputMsg.credits = {};
                    outputMsg.credits.monthly_total = body.credits_monthly_total;
                    outputMsg.credits.monthly_used = body.credits_monthly_used;
                    outputMsg.credits.cost = body.credit_cost;
                    
                    // Only pass the input image to the output message if required
                    if (node.passImage) {
                        outputMsg.image = buffer;
                    }
                
                    // Only send an msg on the output port if plates have been found, unless the user has 
                    // specified that the list is allowed to be empty.
                    if (outputMsg.payload.vehicles.length > 0 || node.skipEmpty == false) {
                        node.send(outputMsg);
                    }
                
                    node.status({});                 
                }
                
                // Allow the next image to be processed ...
                buffer = null;
            });            
        });
        
        this.on('close', function() {
            // In case of a (re)deploy all previous processing will be closed anyway.
            // Allow the next image to be processed ...
            buffer = null;
        });
    }

    RED.nodes.registerType("openalpr-cloud",OpenAlprCloudNode);
}