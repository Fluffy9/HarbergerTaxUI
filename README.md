# Installation

1. Make sure you have docker installed
2. Run `docker run -it --rm -p 8080:8080 --pull=always -v ${pwd}/custom:/custom ghcr.io/fluffy9/harbergertaxui:master`

3. You should see your changes available at http://localhost:8080/

# Customizing the Documentation (Important!)
I have left space in the design for modification of the documentation, the header images in the documentation, CSS overrides, menu names/links, and lastly a byline in the footer. To make these modifications, you need to provide a folder that will override the "custom" folder in the code. 

1. Follow the notes listed here: https://github.com/Fluffy9/HarbergerTaxUI/tree/master/custom

2. Run `docker run -it --rm -p 8080:8080 --pull=always -v ${pwd}/custom:/custom ghcr.io/fluffy9/harbergertaxui:master`

3. You should see your changes available at http://localhost:8080/
