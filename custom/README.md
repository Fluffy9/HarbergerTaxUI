# Instructions
How to use this code. Should be simple enough

## Getting Started
Simply get the website running as I've built it

1. Make sure Docker is installed

2. Run command `docker build . -t harberger-tax`

3. Run command `docker run -it --rm -p 8080:8080 harberger-tax`

4. You should the website available at http://localhost:8080/

## Modifications
I have left space in the design for modification of the documentation, the header images in the documentation, CSS overrides, menu names/links, and lastly a byline in the footer. To make these modifications, you need to provide a folder that will override the "custom" folder in the code. 

1. Copy the folder at ./app/src/assets/custom into the root directory (same level as the Dockerfile)

2. Make any changes you want to this custom folder

4. Run command `docker run -it --rm -v ${PWD}/custom:/custom -p 8080:8080 harberger-tax` 

5. You should see your changes available at http://localhost:8080/

## Notes

Most things should be pretty self explanatory I think... I'm kinda brain dead at this point lol

The design is built off of Bootstrap 4 so certain variables are easy to override. In particular `primary`, `secondary`, `light`, `info`, etc. These are the main things that dictate button colors and the other colors are generated based on that 

I didn't get to do much editing on the original design at all. I'll work on that later though