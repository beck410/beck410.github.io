---
title: The Trick to Problem Solving in Programming
layout: post
---
Recently, we have been given a few assignments with little direction as to how to structure our code. While this was daunting to start off with it is essential to become a good or even adequate programmer. Being spoonfed the answer each day does nobody any good. To wrap your head around a new programming language and coding in general you kind of need to just dive (or be pushed) into the deep end. Don't get me wrong a little help here and there is a great thing and often needed but there is a line between receiving a push in the right direction and having somebody else find the solution for you. Ok, lets dive into some points on how you can approach a problem that for the moment seems impossible.

##Problem Solving Tips

###Believe in yourself
This one may seem obvious but many people (including myself) often cease up and have that first thought of "i don't know enough to solve this" or "There's no way ill be able to do that". It's more than acceptable to admit when you're beat but to give in to these thoughts as soon as a problem is presented to you is not even giving yourself a chance. Sit down first, push those thoughts aside and try to hash it out before admitting defeat.

###Break It Down
The best problems are always those that scare you a little when presented to you. Solving them always leads to the greatest satisfaction. Often, the only way to solve them is to break the problem down into smaller segments. A great example of this is [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life). Within our fourth week of class we were given the assignment to create this amazing program. For those not familiar with Game of Life, it is a cellular automaton based on a number of mathematical rules that dictate each cell's next state in regards to its neighbors. [Google's search page for game of life](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=conways+game+of+life) has an excellent example which will have you mesmerized for hours.

When first presented it seemed very daunting and the goal unreachable. Infinite grids? Two dimensional arrays? Counting the neighbours of a cell? Overhearing others who actually had an idea where to start and were off to a flying start did not help the ego. After stepping back and writing the problem out step by step the end point seemed more attainable. Always start with the basics. For this assignment creating a table and filling it with an array and then array within that would produce my grid. I had that aha moment once i realized this is what a two-dimensional array was and it actually acted like a graph. The first arrays were the rows and the array within those were the columns. Taking it step by step after that and not becoming overwhelmed by the bigger picture really allowed me to push through and reach that feeling of accomplishment once it was all done.

###Don't compare yourself to others
This one was hard for me. I wouldn't say i have a competitive nature when it comes to other people. It's more that i'm competitive with myself. Those thoughts of "Why can't you do that?" and "why don't you know that yet?" start creeping in. Being in a class environment again really brings the self beratings out. By the first day into our Game of Life assignment i felt so defeated. There was no reason for me to though. I had finished what was required for that day but i hadn't been able to go beyond that where others had. What i'm learning is that the only person i should be judging myself against is the me of yesterday. Have i learned something today and am i a better programmer than i was yesterday? Once you start having this mindset the part of your brain that was taken up with meaningless comparisons will be free to focus more on actually learning.

###Write Pseudo Code
Pseudo code is awesome. It really helps you break down a problem and keep tabs on what you have already done. i write my pseudo code within my file and then put that part of code underneath it. Later on i might go back and delete the comments that are obvious from reading the code.
 <pre><code>
function calculateNextState(currentState){
 //create empty array for new grid values
  var nextState = [];
  //generate new rows
  currentState.forEach(function(currentRow, x){
    //empty array for new rows
    var nextRow = [];
    //generate new cols(cells)
    currentRow.forEach(function(currentCell, y){
      //call function to find neighbors
      var neighborCount = livingNeighborCount(currentState, currentRow, x, iy);
      //var to hold cell
      var newCell;
      //test cell for neigbor rules
      if(neighborCount < 2){
      // Rule 1. Less than 2 neighbors = die of loneliness
          newCell = 0;
      } else if(neighborCount > 3){
      // Rule 3. More than 3 neighbors = death by overpopulation
        newCell = 0;
      } else if(neighborCount === 3){
      // Rule 4. Exactly 3 neighbors = birth
        newCell = 1;
      }//cell's state is same as current
      else {
        newCell = currentCell;
      }
      //push cell to row
      nextRow.push(newCell);
    });
    //push row ro grid
    nextState.push(nextRow);
  });
  //return new grid
  return nextState;
}</code></pre>

As you can see from above i am quite verbose when commenting but it really helps to break down a problem and organize your thoughts. For readability sake i would probably go back and remove the more obvious comments in there.

##Final Thoughts

Learning how to problem solve comes with patience, time and a lot of self belief. Whether its learning to code, play guitar or anything you do in life learning how to problem solve for that specific skill comes with practice. Keep at it and remember to always break down a problem before jumping ship and labeling it as too hard.
