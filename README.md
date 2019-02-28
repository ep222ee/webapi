# ep222ee-examination-2

## Requirements

* The API should embrace the idea of HATEOAS. The API should have one entry point and use HATEOAS for making the API browsable.
* Postman collection that showcases api calls, Don´t forget to make calls that shows your error handling like bad requests, bad credentials and so on.

# Report

## 1. Explain and defend your implementation of HATEOAS in your solution.

the api is browsable, has one entry point..cont..
## 2. If your solution should implement multiple representations of the resources. How would you do it?
I would probably check the Accept header or Content-Type header and base the response on what format the request is asking for. If they support multiple/all formats i'd have a default format(application/json)
## 3. Motivate and defend your authentication solution.
The api is using JSON web tokens for authentication purposes. 


### What other authentication solutions could you implement?
* HTTP Basic Authentication
* HTTP Digest Authentication
* API Keys (not really)
### What pros/cons do these solutions have?
#### Http Basic Authentication
Http basic authentication is widely supported and is included natively in the http standard. It's not encrypted however and the base64encoding can be reversed. This means it's high-risk to use basic auth without https since it's highly prone to man in the middle attacks where the authentication can be hijacked.

#### Http Digest authentication
It is safer than basic authentication, however the hashing algorithm is weak compared to what one could use otherwise.

#### API Keys
Api keys are generally long lived, and not really that suitable to use as authentication. They are better to be used for analyzing and controlling how the api is being used.

## 4. Explain how your web hook works.
A logged in user posts an url + options(which events to sign up for) to the /hooks/ route. The url is saved to a database. Whenever a catch is created/updated/deleted, a payload is posted to each url that has signed up for that event.

## 5. Since this is your first own web API there are probably things you would solve in an other way looking back at this assignment. Write your down thoughts about this.
Envisioning the hateoas structure was pretty hard to do by just looking at code and the api responses. I would have liked to have created a lightweight client application to test the api, to help determine if the hateoas was sensible or not. I was not able to set the www-authenticate headers and send messages on 401 responses due to the way the token verification was implemented. the passport middleware sends a 401 response immediately upon failure and prevents any further route handlers to be invoked. There are other ways i could have implemented this solutions i could have used which would have let me set the www-authenticate header and messages on the 401 responses handled by passport. I would also have liked to have supplied more input information, such as sending the template for creating new catches, subscribing to a webhook. My pagination of the catches could've been more explicit as well in this regard, as the queries now are pagenumbers with no further information about how many catches there will be for each page.

## 6. Did you do something extra besides the fundamental requirements? Explain them.
I'm not sure but in regards to the "The API should give some ability to register a web hook which will trigger on some, of you chosen, event." requirement, i implemented a way for a user to choose which events to take part of..