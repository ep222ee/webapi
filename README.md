# ep222ee-examination-2

## Data

* The user which catches the fish
* The position (longitude and latitude) of the catch
* Species of the fish
* Weight
* Length
* Image-url
* Timestamp of the catch

the API must have some kind of Authentication/Authorization. A user should be able to sign in through the API in a safe way.

## Requirements

* The API should at least support representations with application/json
* The API should try to follow the constraints for Restful APIs
* The API should embrace the idea of HATEOAS. The API should have one entry point and use HATEOAS for making the API browsable.
* The API should give the client possibilities to create, read, update and delete resources.
* Unsafe HTTP methods and data about users in the system should require authentication done through the API with implementation of JWT-tokens.
* The API should give some ability to register a web hook which will trigger on some, of you chosen, event.
* Postman collection that showcases api calls, Don´t forget to make calls that shows your error handling like bad requests, bad credentials and so on.
