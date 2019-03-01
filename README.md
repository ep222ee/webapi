# ep222ee-examination-2

# Report

## 1. Explain and defend your implementation of HATEOAS in your solution.
The api works similarly to what a client app would, where there's one entry point where a user can log in. after a succesful login the user can access the catches, which is a list of catches. the catches are paginated where one can browse through hateoas next/previous/first/last page. One can also access each individual resource + actions through the list. And if one were to GET a specific resourse, one can browse back to the list of catches through hateoas in addition to managing that specific resource. The webhook setup is also accesible through the catches list hateoas, where one can post to the webhook and receive a hateoas link back to catches. The login is not accesible through hateoas post-login, my reasoning behind this was that once you're logged in, you're not interested in loggin in, and would rather log in again once a 401 is received.

A 204 No content is received on deleting a resource which means i couldn't send a response with a message/hateoas links. I preferred responding with the correct status code rather than maybe responding with a 200 and a message, and let the user(s) of the api work around 
the statuscode instead. 

i followed the conventions of the "express hateoas links" library, where you offer a link for each available method. this helped with some input information.

## 2. If your solution should implement multiple representations of the resources. How would you do it?
I would probably check the Accept header or Content-Type header and base the response on what format the request is asking for. If they support multiple/all formats i'd have a default format(application/json). I would also set my Accept header to support the given formats.

## 3. Motivate and defend your authentication solution.
The api is using JSON web tokens for authentication purposes, which helps to preserve the stateless server nature of the REST constraints since there's no session being maintained.

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

# Instructions
Api url : https://134.209.94.122/
* 1 Download content of the "postman" folder from the repo
* 2 Import collection and environment
* 3 set postman environment to api_ep222ee
* 4 run the postman suite from top to bottom

# Webhook
a registered webhook can be seen at : https://webhook.site/#/87a2f01f-8afd-4536-b970-5f31ec2bbd48/92d37a35-673d-433a-9c97-3f8d8d95a010/1

to test the webhook. Either change the "hookUrl" param in the json body in postman to a prefered url.
or perform a post to https://134.209.94.122/hooks with a json/application body with the following format. 

{
	"hookUrl": "http://webhook.site/87a2f01f-8afd-4536-b970-5f31ec2bbd48",
	"options": {
		"events":["created", "updated", "deleted"]
	}
}
