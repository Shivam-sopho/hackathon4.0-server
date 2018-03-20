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

P.S:-
As we have not being provided with the actually database so we have created our own local database with all the details of bills and payments

Test Case(For e-wallet):-

Steps to try out the functionality:-

1.visit http://localhost:8080 if you are running locally or visit http://winning-journey.herokuapp.com/

2.You will be prompt to the login panel.Enter the test case as username:-"lalrishav" and password:-"lalrishav";

3.Now you have been successfully logged in and now you are on dashboard.If you want to start the new service just click on "New service" option and you will be redirected to another page.

4.From this page select the type of service(For this test case select "bill payment" which is the first option).You will get the list of sub-service 
list now select the first option i.e "electric bill" and click proceed.

5.Now the page will ask you for the Knumber.Enter the proper Knumber(for this test case enter EL67813) and then checkStatus button.

6.You will now see the total details related to that Knumber.

7.Now it turn to add the money to the wallet.So click "Add money" and you will be redirected to the payment option

8.Select the UPI method to proceed and then enter your UPI address and you will being instructed.Wait for 5 minutes and your payment will be verified.

9.Go to dashboard and then wallet and you can see the updated amount and pending tasks.Visit every options and see the status and logs there.

10.Thank you.Please stick with the test cases 

Test Case(Feedback System):-

Just send message in the format EM <kios key> <rating> <feedback>.
  And we will detect your message and update it in database.
  Or the second option is our android app for feedback system.Download the android app and give rating through the app.
  
