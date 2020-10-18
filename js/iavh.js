// DECLARATIONS **********************************

let vehiclesObj = [];
let customerObj = [];
let fuelTypesObj = [];
let vehicleDesc = [];
let currentHires = [];

// CONSTANTS **********************************

// test or live mode
const liveMode = false;

// User error message for live mode
const liveErrorMsg = "We are very sorry, but we seem to have experienced a problem. Please try again later."


// CLASSES **********************************

// Class to create HTML for a vehicle
class Vehicle{
    constructor(element){
        this.id = element.id;
        this.registration = element.registration;
        this.categoryId = element.categoryId;
        this.make = element.make;
        this.model = element.model;
        this.fuelId = element.fuelId;
        this.customerHired = '';
        this.dateToHired = '';

        currentHires.forEach(element => {
            if(this.id === element.vehicleId){
                this.customerHired = '<a href="javascript:launchHire(' + element.id + ')">' + element.id + '</a>';
                this.dateToHired = getDateString(element.dateTo);
            }
        });
    }

    // + '</div><div class="vType">' + vehicleDesc[this.categoryId].description
    getHTMLOutput(){
        let newDiv = document.createElement('div');
        newDiv.innerHTML = '<div class=spacer></div><div class="reg">' + this.registration
        + '</div><div class="vType">' + vehicleDesc[this.categoryId].description
        + '</div><div class="make">' + this.make 
        + '</div><div class="model">' + this.model 
        + '</div><div class="fuel">' + fuelTypesObj[this.fuelId]
        + '</div><div class="hires">' + this.customerHired 
        + '</div><div class="toDate">' + this.dateToHired + '</div><div class=spacer></div>';
        
        newDiv.id = "count_" + this.id;
        
        // Add new HTML to DOM element
        document.getElementById("vehicles").appendChild(newDiv);
    }
}

// Class to create HTML for a vehicle
class Customer{
    constructor(element){
        this.id = element.id;
        this.name = element.name;
        this.type = element.type;
        this.postCode = element.postCode;
        this.tel = element.tel;

        let custHires = [];
        let custHiresTo = [];

        currentHires.forEach(element => {
            if(this.id === element.customerId){
                custHires.push('<a href="javascript:launchHire(' + element.id + ')">' + element.id + '</a>');
                custHiresTo.push(getDateString(element.dateTo));
            }
        })
        
        this.hires = custHires.join('<br>');
        this.dateToHired = custHiresTo.join('<br>');
    };

    getHTMLOutput(){
        let newDiv = document.createElement('div');
        newDiv.innerHTML = '<div class="spacer"></div><div class="custHired">' + this.name
        + '</div><div class="cType">' + this.type
        + '</div><div class="postCode">' + this.postCode 
        + '</div><div class="tel">' + this.tel 
        + '</div><div class="hires">' + this.hires
        + '</div><div class="toDate">' + this.dateToHired + '</div><div class="spacer"></div>';
        
        newDiv.id = "count_" + this.categoryID;
        
        // Add new HTML to DOM element
        document.getElementById("customers").appendChild(newDiv);
    }
}


// FUNCTIONS **********************************

// Load the fuel types from the data source
function loadFuelTypes(){
    $.getJSON('data/fuelTypes.txt')
    .done(function(data){
        data.fuelTypes.forEach(function(element){
            fuelTypesObj[element.id] = element.description;
        });
    })
    .fail(function(err){
        if(liveMode){
            alert(liveErrorMsg);
        }else{
            alert(err);
        }  
    })
};

function loadData(){
    loadFuelTypes(); 
    loadHires(); 
    loadVehicleCats();
    loadVehicles(); 
    loadCustomers();
}

// Load the vehicle categories from the data source
function loadVehicleCats(){
    $.getJSON('data/vehicleCategories.txt')
    .done(function(data){
        data.categories.forEach(function(element){
            vehicleDesc[element.id] = element;
        });
    })
    .fail(function(err){
        if(liveMode){
            alert(liveErrorMsg);
        }else{
            alert(err);
        }  
    })
};

// Load the vehicle categories from the data source
function loadHires(){
    $.getJSON('data/hires.txt')
    .done(function(data){
        data.hires.forEach(function(element){
            currentHires[element.id] = element;
        });
    })
    .fail(function(err){
        if(liveMode){
            alert(liveErrorMsg);
        }else{
            alert(err);
        }  
    })
};

// Load the vehicles from the data source
function loadVehicles(){
    let newDiv = document.createElement('div');
    newDiv.innerHTML = '<div class=spacer></div><div class="reg">Registration</div><div class="vType">Type</div><div class="make">Make</div><div class="model">Model</div><div class="fuel">Fuel</div><div class="hires">Hire N&deg;</div><div class="toDate">End of Hire</div><div class=spacer></div>';
    
    newDiv.id = "count_0";
    newDiv.className = "titles";
    
    // Add new HTML to DOM element
    document.getElementById("vehicles").appendChild(newDiv);

     $.getJSON('data/vehicles.txt')
    .done(function(data){
        data.vehicles.forEach(function(element){
            let thisVehicle = new Vehicle(element);
            thisVehicle.getHTMLOutput();
            vehiclesObj[element.id] = element;
        })
    })
    .fail(function(err){
        if(liveMode){
            alert(liveErrorMsg)
        }else{
            alert(err)
        }  
    })
};

// Load the customers from the data source
function loadCustomers(){
    // print title for customer table
    let newDiv = document.createElement('div');
        newDiv.innerHTML = '<div class=spacer></div><div class="custHired">Name</div><div class="cType">Type</div><div class="postCode">Post Code</div><div class="tel">Telephone</div><div class="hires">Hire N&deg;</div><div class="toDate">End of Hire</div><div class=spacer></div>';
        
        newDiv.id = "count_0";
        newDiv.className = "titles";
        
        // Add new HTML to DOM element
        document.getElementById("customers").appendChild(newDiv);

    $.getJSON('data/customers.txt')
    .done(function(data){
        data.customers.forEach(function(element){
            let thisCustomer = new Customer(element);
            thisCustomer.getHTMLOutput();
            customerObj[element.id] = element;
        })
    })
    .fail(function(err){
        if(liveMode){
            alert(liveErrorMsg)
        }else{
            alert(err)
        }  
    })
};

function displayTab(i){
    if (i===0){
        document.getElementById("customers").style.display = "none";
        document.getElementById("vehicles").style.display = "block";
        document.getElementById("vehicleTab").innerHTML = '<div id="vehicleTab" class="tab">Vehicles</div>';
        document.getElementById("customerTab").innerHTML = '<div id="customerTab" class="tab"><a onClick="displayTab(1)">Customers</a></div>';
    }else{
        document.getElementById("customers").style.display = "block";
        document.getElementById("vehicles").style.display = "none";
        document.getElementById("vehicleTab").innerHTML = '<div id="vehicleTab" class="tab"><a onClick="displayTab(0)">Vehicles</a></div>';
        document.getElementById("customerTab").innerHTML = '<div id="customerTab" class="tab">Customers</div>';
    }
}

// Dialogue box for hire details
function launchHire(id){
    //launch dialogue box
    $( function() {
        $( "#dialogHire" ).dialog({
            dialogClass: "no-close",
            modal: true,
            resizable: false,	
            minWidth: 400,
            show: { 
                duration: 500 
            },
            classes: {
                "ui-dialog-titlebar": "myDialogTitleBarClass", "ui-dialog-content": "myDialogContentClass"
            },
            buttons: {
                "OK": function() {
                    $( this ).dialog( "close" );
                }
            },
        });
    });

    // compute cost
    let numDays = 1 + (Date.parse(currentHires[id].dateTo) - Date.parse(currentHires[id].dateFrom)) / 60 / 60 / 24 / 1000;
    let vehicleCat = vehiclesObj[currentHires[id].vehicleId].categoryId;
    let rateForHire = vehicleDesc[vehicleCat].dayRate;
    let cost = rateForHire * numDays;

    

    // write values onto dialogue box
    document.getElementById("dlgHireNum").innerHTML = id;
    document.getElementById("dlgCustomer").innerHTML = customerObj[currentHires[id].customerId].name;
    document.getElementById("dlgReg").innerHTML = vehiclesObj[currentHires[id].vehicleId].registration;
    document.getElementById("dlgStart").innerHTML = getDateString(currentHires[id].dateFrom);
    document.getElementById("dlgEnd").innerHTML = getDateString(currentHires[id].dateTo);
    document.getElementById("dlgCost").innerHTML = '&pound;' + cost;
}

function getDateString(myDate){
    // format dates
    let d = new Date(myDate);
    return d.toDateString();
}