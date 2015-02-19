---
layout: post
title:	'MVC Design Patterns and Frameworks in JavaScript'
---

This topic took me a while to get my head around. If your looking to work with Angular.js, Babkbone.js or any other similar framework it is worth spending a little extra time learning the principles and theory behind MVC design patterns. For me I didn't get a good grasp of the whole picture of MVC until I started creating my project in Angular. Having that knowledge of why I was using an MVC framework helped a lot with knowing when to separate features and why.

##MV* Patterns Explained
The MVC Pattern is just one of many Javascript patterns that allow similar problems to be solved in a logical and efficient manner.There are many different JavaScript patterns with their critics and admirers. Think of a pattern as a blueprint for your for software and applications. Some focus more on performance while others focus on separation of code. There are many reasons to research and learn JavaScript patterns but that is for another time.

The MVC patterns falls under the design pattern category of MV* patterns. Taken from classic software design this take on organizing code has been adapted to JavaScript and web development. MV* patterns focus on the programming principles of encapsulation and abstraction. It's all about providing separation and cutting down on duplication.

The three most popular MV* patterns are:
- MVC (model-view-controller)
- MVVM (model-view-view-model)
- MVP (model-view-presenter)

Each pattern strives to separate its logic from its view. Where they differ is just how much separation there is and the structure for achieving it.

##MVC Architecture
MVC has three components to its architecture:
- Model
- View
- Controller
Each component deals with different functionality which does not overlap into other components. This leads to maintainable code that is easy to test, write and understand. Let's delve a bit deeper into each component.

###Model
In a nutshell the model is your data. Whether it is simply an array, object or database your model should be separate from the rest of your code and should not interact with the view(user interface) directly. When the model changes it notifies the view through the controller. Similarly, the view changes the model via the controller. That way if you ever need to swap models you do not need to change the view - only the business logic. See where this separation business comes in handy. Separating your model from your view also stops useless duplication of code as a model can be used by multiple views.

Let's Look at an example. Let's imagine I have a shopping list object as my model

<pre><code>

	var shoppingList = {
		items: [ {food: "bread",cost: 3.00},{food: "eggs",cost: 4.00},{food:"milk", cost: 2.00}];
	}

</code></pre>

One view may want to to list all items while another may want to add up the cost of all items. Now the view is in one place with no need to duplicate the list. Both views would simply call shoppingList.items through their controllers and manipulate them separately from the model. Less duplicate equals more maintainable code.

###View
Views are the user interface of an application. It represents the model after it has been manipulated by the view's controller. It is notified of changes to the model by its controller and adjusts itself to represent those changes on the user interface. Users can change the model through the view by clicking, filling in forms and by other user interactions.

Let's loop back to our shopping list analogy. A view allowing users to add a new item to the shopping list may look like this.

<pre><code>
	&lt;form&gt;
		&lt;label&gt;Add New Item&lt;/label&gt;
		&lt;input type="text" id="newItem"&gt;
		&lt;iput type="number" id="cost"&gt;
		&lt;button id="addItem"&gt;&lt;/button&gt;
	&lt;/form&gt;

</code></pre>
When addItem is clicked a function within the controller will pull the data from newItem and cost and add it to the shoppingList array. On the same page you could have the following code displaying the list (lets pretend the elements were added dynamically through the controller).
<pre><code>
	&lt;ul id="viewShoppingList"&gt;
		&lt;li&gt;bread: 3.00&lt;/li&gt;
		&lt;li&gt;eggs: 4.00&lt;/li&gt;
		&lt;li&gt;milk: 2.00&lt;/li&gt;
	&lt;/ul&gt;

</code></pre>

If we were to input apple into newItem and 1.00 into cost and click addItem a function within the controller would notify the model of a change and then the model would notify the controller to update the view. Lets assume the controller has a function that populates viewShoppingList with items. We would now see:

<pre><code>
	&lt;ul id="viewShoppingList"&gt;
		&lt;li&gt;bread: 3.00&lt;/li&gt;
		&lt;li&gt;eggs: 4.00&lt;/li&gt;
		&lt;li&gt;milk: 2.00&lt;/li&gt;
		&lt;li&gt;apple: 1.00&lt;/li&gt;
	&lt;/ul&gt;

</code></pre>

This is a very simple analogy and that requires a lot more work in the controller. Good MVC frameworks handle the hard yards by providing functions that automatically hook up the view to the controller.

##Controller
While you should of got a sense the controller's role already I'll break it down a bit more. In basic terms the controller is the middle man. It handles validation between the view and model and the manipulation of the data before displaying it to the user. Lets look at how the controller might handle showing the shopping list.

<pre><code>
	var shoppingListController = {
		var shoppingListModel = shoppingList.items;
		var shoppingListView = $('#viewShoppingList');
		var updateShoppingList = $('#addItem');
		var newItem = $('#newItem');
		var cost = $('#cost');

		updateShoppingList.onclick = addItemToShoppingListModel(populateShoppingListView);

		var addItemToShoppingListModel = function(cb){
			shoppingListModel.push({food: newItem, cost: cost});
			cb();
		}

		var populateShoppingListView = function(){
			ShoppingListView.Val("");
			shoppingListModel.forEach(function(item){
				var food = item.food;
				var cost = item.cost;

				shoppingListView.append(
					$('&lt;li&gt;' + food + ': ' + cost + '&lt;/li&gt;')
		)})}}
</code></pre>

Now I'm not advocating you use this code. It is purely just to show how the view, model and controller interact. What is happening here is once the user clicks the addItem button the item object is added to the model and then through a callback function the model is updated to reflect the changes. The controller is handling changing the model and updating the view.

##Popular MVC Frameworks
MVC frameworks have made their mark in the JavaScript world. While each have their own unique eccentricities and coding styles they all follow the same ideals for creating better abstraction and encapsulation of code. Here are a few of the big players in today's JavaScript MVC scene.

* [AngularJS](https://angularjs.org/)
* [EmberJS](http://emberjs.com/)
* [Spine](http://spinejs.com/)
* [Backbone](http://backbonejs.org/)
* [Knockout](http://knockoutjs.com/)

##I Want More!
Play around with Angular, Ember or Backbone. All three are very well documented and there are a plethora of tutorials and articles on each MVC framework. Start with a todo app or wishlist app. These frameworks are great for CRUD apps and cut development time immensely. For more on the theory side of pattern design you can;t go past [Learning JavaScript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/) by Addy Osmani. It is full of design patterns to implement and goes into the history of MVC frameworks back to its SmallTalk days. Still want more? Look at the references of Learning JavaScript Design Patterns. It lists a ton of articles and books about design patterns in general.

##Final Thoughts
While the MVC pattern has been around since the late 1970's, it wasn't until the mid 90's that it found traction in object-oriented programming. While it has been tweaked to suit JavaScript its principles still ring true. I strongly recommend reading more not just MVC patterns but design patterns in general. It is what separates good coders from great programmers.
