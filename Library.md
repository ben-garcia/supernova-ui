# Component Library

supernova-ui

## The Plan

> My plan is to develop a component library, based on [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/), that I can publish to [npm](https://www.npmjs.com/) for my future projects. The component library will have all the necessary components I need to complete Postit.

theme options from [chakra-ui](https://chakra-ui.com/) to start.

### Features

- Theme that can be customized to fit any project.

### Components

    - atoms
    		- Button
    		- renders tags button(default), a
    		- render with icon
    	- Checkbox
    		- renders input of type checkbox
    	- Heading
    		- renders h1...h6
    	- Paragraph
    			- renders p tag
    		- Icon
    			- wrapper for the individual icons
    	- Radio
    		- renders input of type radio
    			- used to select one options of the multiple that are available
    		- Spinner
    			- renders simple loader
    			- used to indicate a loading state
    		- Switch
    			- renders input of type checkbox
    			- different variant of the checkbox
    		- Text
    		- renders tags span(default)
    		- Textarea
    			- renders textarea
    		- TextInput
    			- renders input tag

    - molecules
    		- Modal
    			- with a11y in mind
