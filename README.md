# DigitalMenu

A digital menu for existing restaurants with and without menus. For the admin
user it is possible to change the menus and adjust the prices on the dishes,
as well as their name. A malicious attempt will be redirected to the main page 
with an alert. Bare Node.js server solution with Data Transfer Objects and Validation.

`Hint`: The project is in freeze mode. Further features postponed due to limited time schedule.

<table>
<tr><th>Tech Stack</th></tr>
<tr><td>

 <sub> Angular </sub> |  <sub> NGRX </sub> | <sub> Bootstrap </sub> | <sub> Saas </sub> | <sub> Node.js </sub> | <sub> MongoDB </sub> | <sub> Mongoose </sub> |  <sub> TypeScript </sub> 
|--|--|--|--|--|--|--|--
[<img src="https://github.com/nik-neg/digital-menu/blob//main/techstack_images/angular-icon.svg" alt="drawing" width="50"/>](https://angular.io/) | [<img src="https://github.com/nik-neg/digital-menu/blob//main/techstack_images/ngrx.png" alt="drawing" width="50"/>](https://ngrx.io/) | [<img src="https://github.com/nik-neg/digital-menu/blob//main/techstack_images/bootstrap.svg" alt="drawing" width="50"/>](https://getbootstrap.com/) |  [<img src="https://github.com/nik-neg/digital-menu/blob//main/techstack_images/sass.svg" alt="drawing" width="50"/>](https://sass-lang.com/) | [<img src="https://github.com/nik-neg/digital-menu/blob//main/techstack_images/nodejs.svg" alt="drawing" width="50"/>](https://nodejs.org/en/) |  [<img src="https://github.com/nik-neg/digital-menu/blob//main/techstack_images/mongodb.svg" alt="drawing" width="50"/>](https://www.mongodb.com/) |  [<img src="https://github.com/nik-neg/digital-menu/blob//main/techstack_images/mongoose.png" alt="drawing" width="50"/>](https://mongoosejs.com/) |  [<img src="https://github.com/nik-neg/digital-menu/blob//main/techstack_images/typescript-icon.svg" alt="drawing" width="50"/>](https://www.typescriptlang.org/) </td></tr> </table> 

 </table> 
 
 # Register page
![alt text](https://github.com/nik-neg/digital-menu/blob/login/app_images/0_register_page.png)
 
 # Main page
![alt text](https://github.com/nik-neg/digital-menu/blob/main/app_images/1_main_page.png)
![alt text](https://github.com/nik-neg/digital-menu/blob/main/app_images/2_main_page_carousel.png)

# Restaurant Details Page
![alt text](https://github.com/nik-neg/digital-menu/blob/main/app_images/3_restaurant_details_page.png)

# Menu / Dish Edit Page
![alt text](https://github.com/nik-neg/digital-menu/blob/main/app_images/4_menu_edit_page.png)

# Getting started

run `npm i` in the server & client folder

run `mongorestore --db your_db_name dump/digitalMenuDB` in the db folder 

run `sudo mongod` for the db server and type your password if neccessary (used db version: db version v4.2.6)
  
run `nodemon index.ts` in the server folder

run `ng serve` in the client folder

# USE CASES:
You can click on the restaurants cards to get to the restaurant details page.
It's also possible to click on the restaurants in the carousel.
For now only 2 restaurants are supported with logic, because of the local images and the
amount to create the menus. Others are clickable, but there are no menus.

`Hint`: This will be refactored in the future with a login/register page.

Restaurant Cuba Life (admin version)
Restaurant Burger Bar (customer version)

# EDIT MODE:
1.) to edit a menu please click on "edit"
2.) if you want to add a dish to a menu A, choose a dish from Menu B
and copy the name of menu A, e.g. Main Course to the menu name of the dish,
which should be updated. Then click update.You can also update the name and
the prices, but let the $ sign untouched.
Then please click the back button.

`Hint`: This will be refactored in the future with a junction table, checkboxes
and a price slider or so.

# MALICIOUS ATTEMPT ALERT:
If you go to the Burger Bar and change the parameter in the URL isAdmin=false to isAdmin=true,
you will be redirected to the main page with an alert.
