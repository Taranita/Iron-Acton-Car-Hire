# iron-acton-vehicle-hire

Iron Acton Vehicle Hire is a simple application intended as an exercise in (mostly) JavaScript. It simulates an application for a vehicle hire company to manage their vehicles, customers and hires.

To keep things simple, it uses .txt files conatining JSON as its data source:


customers.txt           - Contains customer details.

fuelTypes.txt           - Contains the differing fuel types, currently Petrol and Diesel.

hires.txt               - Contains details of current hires. The vehicles and the customers are represendted by their unique IDs.

vehicleCategories.txt   - Contains the differing vehicle categories, currently Small car, Estate car and Van.

vehicles.txt            - Contains details of the hire company's vehicles.


There is one constant value to mention. This is in the constants section of the file js/iavh.js. It as follows:


liveMode                - True/False    - Indicates whether the application is operating in live mode, or in development/test. In live mode, any error causes a user friendly message, while when not in live mode, error details are presented to the user.



In order to use the application, simply open the application's directory, the default index.html page will load. Once in the application you can switch between views of vehicles or customers. You can also click on a hire to see its details.
