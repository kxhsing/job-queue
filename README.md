# <img src="/app/img/initial.png">

Job queue app for HTML data. Enter URL to receive a Job ID and check status and results of job.

## Table of Contents
* [Technologies](#technologies)
* [Flow](#flow)
* [Installation](#install)
* [Author](#author)

## <a name="technologies"></a>Technologies

Backend: Node.js, Express, MongoDB
Frontend: JavaScript (AngularJS), HTML5, CSS, Bootstrap<br/>

## <a name="features"></a>Flow

![alt tag](/app/img/url.png)
![alt tag](/app/img/created.png)
![alt tag](/app/img/status.png)
![alt tag](/app/img/final.png)


## <a name="install"></a>Installation

To run the job queue:

Clone or fork this repo:

```
https://github.com/kxhsing/job-queue.git
```

To have this app running on your local computer:
Navigate to project folder and install dependencies.

```
npm init
npm install
```

Create database
```
node create_mongo_db.js
```

Run the database
```
mongod
```

Run the app:

```
node server.js
```

You can now navigate to 'localhost:8080/' to start using the job queue.


## <a name="author"></a>Author
Hi! My name is [Karen Hsing](https://www.linkedin.com/in/karenhsing/) and I'm a software engineer. I graduated from Hackbright Academy's Software Engineering Fellowship Program, an engineering bootcamp for women in San Francisco (graduation: April 2017). 

Prior to Hackbright I was an account manager at a marketing agency where I led our marketing team and worked with 15 different clients from the tech, lifestyle, and hospitality industries to create personalized solutions for their different marketing needs, including branding, digital marketing, event sponsorships, and more.


