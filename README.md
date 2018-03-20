# hackathon4.0-server

Problem : 

1. Overcharging done by the kiosks operator. 
2. Kiosks operator don’t provide receiving token to the customer.
3. Kiosks operator don’t process customer’s service timely.
4. Kiosks operator sometimes don’t behave properly with customer.

Solution:

1. Lock System : Added a new feature in the existing e-wallet called lock facility. In this feature, the overall amount (actual bill + service charge) will be added to the kiosk’s wallet from customer’s account via Bhamashah Card, Aadhar Card, RuPay card, UPI. The service charge which is supposed to go into the kiosk’s bank account, will remain in the e-wallet until unless he processes the customer’s service. As soon as the kiosk processes the customer’s request the respective service charge will automatically be transferred to the kiosk’s bank account. But if he doesn’t process the request timely, then the total amount will be refunded back in customer’s account. Moreover, an automatic complaint against that kiosk will be noted.
2. Feedback : A feedback system via SMS/android app is also made through which the user can provide rating to kiosks and after a certain ratio the government will be automatically informed regarding too many negative feedbacks.


Instruction to use :
1. Install Node version 8.3.0 on your system.
2. Install mongodb version 3.4 or above on your system.
3. Download the zipped form of the repo and then unzip it.
4. Go to the directory (hackathon4.0-server).
5. run command - npm install (to install node-modules).
6. run the command to start the app - "node app.js" (without quotes).
7. open browser and open site "localhost:8080".
8. Check all the features of the site from there now.
