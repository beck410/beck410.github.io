---
layout: post
title:	'Markup vs Markdown in Jekyll: Which? Why? When?' 	 
---

This topic has been bothering me for the last few days. Having just learnt markdown existed and required less coding i was excited to include it in my new jekyll site. So off i went changing all my p tags and headings to markdown format. Started up my jekyll server, refreshed the page .... and found hashes, brackets and arrows all over my page. But didn't markdown promise less work with the same returns as markup? 

My first thought was to call liar and never look at markdown again pushing it into a dark corner under the stairs. Then the rational coding side took over and i started to breathe again. What i had done was include the file as an include tag within a html file. 

Confused yet? So was I. Apparently this is a big no no. I'm getting ahead of myself here. Let's back up and explain what markup is, its uses and where to use it on jekyll.   

##What exactly is markdown?
To put it in simple terms, markdown is a formatting langauge that takes plain text and transforms it into HTML (or XHTML) when the page is rendered. Think of how you write a normal email and add a few symbols to the page. 

For a better understanding of the markdown i strongly recommend taking a few minutes (or hours) to browse [Daring Fireball](http://daringfireball.net/projects/markdown/).

For those looking for a quick cheatsheet look no further than [here](http://daringfireball.net/projects/markdown/).

##Why should i use it?
If you google this question in google the first response on every site you visit poretty much be 'because it's easy and quick'. It's pretty much as simple as that. For those who blog often it is a godsend. No closing tags to worry about and less tags to misspell. 

Another reason to love and use markdown is it's simple readability. Rather than squinting at a screen deciphering where a paragraph ends markup speeds up workflow and makes creating content slightly less painful (this doesn't come easy, folks).
    
##Where should i use it?
Ok Beck, so you've told us what markup is and why you like it. Now why can't i use it everywhere if it's so fantastic? Really, if i could i would incorporate it into all my content. The problem lies in file types. 

Markdown can only be used within markdown files (file.md). Now before i start receiving hatemail i'm sure there's a way around this through plugins or whatnot but for a beginner we don't want to be confused anymore than we are. Let's take this learning code thing nice and easy. 

So i got that through my head and reverted all my markdown within my html files to markup. But wait! my include tags that are written in markdown on jekyll are not parsing. Their file types are md and i haven't included any html within them. Problem is when they are included the code snippet is pulled from the tag into the html file without first being converted into HTML.  
 
Let's go over what we have learnt. Markdown is awesome but our uses are limited in using it in our code. I have decided to write my blog posts in markdown and the remainder of my site in HTML. There may be other ways to include markdown and if i find one i promise i will update this post to inform other beginners. 

Remember, one line at a time friends.   
