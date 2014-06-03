STICKY SAUCE
============

A spin-off of the bootstrap affix component. Headings will stick to the top
of the window when they reach the point of attachment. Headings will stay
'affixed' until the come in contact with the next sticky header, at which
point it will be pushed out of view and the next heading will take its
place.

Works with a persistant fixed main header.

[DEMO](http://thomfoolery.github.io/sticky-sauce/)

USE
---

Apply the class 'affix-top' to elements you want to stick when the top of
the window scrolls past it.

Apply the class 'affix affix-top' to any elements that are permanently
affixed to the top of the screen. Such as permantely affixed header
navigation.

For fancier styles and placement, use style the element or its children
accordingly.

```html
<html>
<head>
  ...
  <link rel="stylesheet" href="/styles/bootstrap.css">
  <!-- OR -->
  <link rel="stylesheet" href="/styles/sticky-sauce.css">
</head>
<body>
  <!-- (!) optional fixed header -->
  <header class="affix affix-top">
    This is a persistant fixed header
  </header>
  <!-- / optional fixed header -->
  ...
  <div class="affix-top">
    Heading
  </div>
  ...
  <div class="affix-top">
    Heading
  </div>
  ...
  <script src="sticky-sauce.min.js"></script>
</body>
<html>
```

&copy; 2014 Thomas Yuill
