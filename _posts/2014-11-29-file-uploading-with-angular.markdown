---
layout: post
title:  File Uploading to Amazon S3 With Angular
date:   2014-11-29 14:00:45
categories: Nashville Software School

---

While building an Angular app in class I was faced with the challenge of adding a way for users to upload images to reuse. At first i thought this shouldn't be too bad. I was using in [Firebase](https://www.firebase.com/) at the time for my database and was sure there was a way to use this for my image storage as well. Turns out images take up a lot of space and as a poor web developer I was not about to upgrade my firebase account. Luckily for me a number of my classmates had already tackled this problem and [Amazon S3](https://aws.amazon.com/s3/) seemed to hold the answers I was desperately seeking. So without further ado here is a step-by-step guide on Angular file uploading to Amazon s3.

##Sign Up For an Amazon S3 Account and Create a Bucket
Navigate to [Amazon S3](https://aws.amazon.com/s3/) and click Create An AWS Account. From your console go to S3 (under Storage and Content Delivery). You should see an empty list under All Buckets. Create a new bucket. Make sure the name has no spaces as you'll need to hard code it into your Angular project.

##Set Permissions
Click the magnifying glass next to your bucket name. This should bring up configuration settings for your bucket to the right of the bucket list. Click Permissions to pull up permission settings. Then click add more permissions. In the grantee dropdown choose everyone and check upload/delete and view permissions. You should also have another grantee with your username and all boxes checked. Your permission settings may vary depending on your type of app and needs.

##Generate Encoded Policy And Signature
For S3 to allow uploading of images into your bucket you will need to know our access key. In your bucket list you should see your name at the top of the screen. Click it to see a dropdown of options. Choose Security Credentials. Then Click Access Keys. If there are no access keys click Create New Access Key. Run irb in console and input the following:

<pre><code>
require 'base 64'
require 'openss1'
require 'digest/sha1'
aws_secret_key = "XXXXXXXXXXX"
policy_json = '{"expiration":"2020-01-01T00:00:00Z","conditions":[{"bucket":"yourbucketname"},{"acl": "public-read"},["starts-with","$Content-Type",""],["starts-with","$key",""]]}'
encoded_policy = Base64.strict_encode64(policy_json).gsub('\n','')
signature = Base64.strict_encode64(OpenSSL::HMAC.digest(OpenSSL::Digest::Digest.new('sha1'),aws_secret_key,encoded_policy)).gsub('\n','')
</code></pre>

Make sure you change the XXXXX to your secret access key and insert your back name in encoded_policy. Save the encoded_policy string and signature that is given.

##Change Bucket Permissions
Next you'll need to add CORS configuration to your bucket permissions. Under permissions click edit CORS configuration near add more permissions. Add the following to the CORS configuration editor.
<pre><code>
<xmp>
  <?xml version="1.0" encoding="UTF-8"?>
  <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
</xmp>
</code></pre>

This solves the cross-origin issue your bound to have if you don't add the right Allowed Methods.If you do find yourself with a cross origin error revisit this step.

##Set Bucket Policy
Also under permissions you will find Add bucket policy. This also helps stop cross-origin issues. Add the following and save.
<pre><code>
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1418963950000",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::yourbucketname/*"
      ]
    }
  ]
}
</code></pre>

Remember to add your bucket name to the Resource object. Great! Now you are all set with Amazon. Now on to the Angular side of things.

##Add Angular-File-Upload As A Dependency
There are a few file upload libraries for Angular but this is the one i found to have exactly what I was after and the easiest to implement. If using bower run the following code in your console.
<pre><code>
	bower install ng-file-upload --save
</code></pre>
This will save Angular-file-upload as a dependency. Make sure you use ng-file-upload. There is also an angular-file-upload not associated with this library. Trust me. You do not want to make that mistake. If adding it manually to your project you can find it [here](https://github.com/danialfarid/angular-file-upload-bower/releases).

Once you have included it in your project add the following to your scripts after the angular script.
<pre><code>
&lt;script src="angular-file-upload-shim.js"&gt;&lt;/script&gt;<!-- for no html5 browsers support -->
&lt;script src="angular-file-upload.js"&gt;&lt;/script&gt;
</code></pre>

Make sure you add the folder it is at the start of the src.

##Setting Up File Uploading In Angular
I'm one of those people that creates a factory or service for everything so of course i put file uploading in its own factory. You can include it in your controller instead. Here is my code for setting up my upload factory. For a more indepth look please see the usage section on the [angular-file-upload docs](https://github.com/danialfarid/angular-file-upload#usage).

<pre><code>
.factory('uploadImage',function($upload){

    function uploadToS3(filesArray,userID,fileName,cb){
      var file = filesArray[0];
      var numID = userID.match(/[0-9]+/);

// Make sure to put in your aws access key id, your policy string from irb output and yur signature from irb output
      $upload.upload({
        url: 'https://rescuemeimages.s3.amazonaws.com',
        method: 'POST',
        data: {
          'Content-Type': file.type,
          key: numID + '/' + fileName,
          acl: 'public-read',
          awsaccesskeyid: 'XXXXXXXXXXXXXX',
          policy: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX13aXRoIiwiJGtleSIsIiJdXX0=',
        signature: 'XXXXXXXXXXXXXXXX4evSQ='
        },
        //this is the image you want to upload (must have been through base 64 encoding first)
        file: file
      })
      .success(function(data,status,headers,config){
        //the link where photo can be accessed
        var filelink ='https://s3-us-west-2.amazonaws.com/rescuemeimages/' + numID + '/' + config.file.name;

        //function that sends file link to database
        cb(filelink);
      })
      .error(function(err){
        console.log('upload to S3 error: ' + err);
      });
    }

  function setThumbnail(file,cb){
    _imageToBase64(file,function(base64){
      var fileName = file.name;
      cb(fileName,base64);
    });
  }

  //turns image into Base 64 file type to allow uploading
  function _imageToBase64(file,cb){
    if(file && file.type.indexOf('image') > -1){
      var fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = function(e){
        cb(e.target.result);
      };
    }
  }

  return {
    uploadToS3: uploadToS3,
    setThumbnail: setThumbnail,
    };
  });
</code></pre>

##Connect File-Upload to View

Now all that's left to do is tie the controller to the view. This is where angular-file-upload does its magic. Make sure you have included ng-file-select and ng-file-change.

<pre><code>
&lt;div class="form-group dog-form-img"&gt;
    &lt;label&gt;Upload Dog Photo&lt;/label&gt;
    &lt;img ng-show="dogList.files[0].dataUrl" ng-src="{{dogList.files[0].dataUrl}}" /&gt;
    &lt;input type="file" ng-model="dogList.files" ng-file-select ng-file-change="dogList.fileSelected($event)" accept="images/*"&gt;
  &lt;/div&gt;
</code></pre>

##Final Thoughts
This is a lot of information to take in and might require some more scouring the internet to get Amazon to play nice with your project. The [docs](https://github.com/danialfarid/angular-file-upload) for angular-file-upload are pretty good and should lead in the right direction. Just remember try try and try again.
