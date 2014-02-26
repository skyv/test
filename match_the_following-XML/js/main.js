
if (window.XMLHttpRequest) {
  xmlhttp = new XMLHttpRequest();
}
else {
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","xml/content_list.xml",false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML; 

var x = xmlDoc.getElementsByTagName("PAIR");
var left = document.getElementById("left_half");
var right = document.getElementById("right_half");
var a = "";
var b = "";
var ar = new Array();
var flag = false;
var i, y, rand, l;
var dragSrcEl = null;
var count = 0;
var totalMatches = x.length;

for (i = 0,y = 0; y<x.length; i++) {
  var rand = Math.ceil( Math.random() * x.length-1 );
  if( ar.indexOf(rand) == -1 && ar.indexOf(rand) != rand ) {
    ar[y] = rand;
    y++;
  }
}

for(i = 0; i<x.length; i++) {  
  l = ar[i];
  b = b + "<section class='selection_list'><section class='list_item canDrag' draggable='true'><span>";
  b = b + x[l].getElementsByTagName("COLUMN1")[0].childNodes[0].nodeValue;
  b = b + "</span></section></section>";

  a = a + "<section class='option'><section class='list_item hidden'><span>";
  a = a + x[i].getElementsByTagName("COLUMN1")[0].childNodes[0].nodeValue;
  a = a + "</span></section><section class='list_item_nodrag'><span>";
  a = a + x[i].getElementsByTagName("COLUMN2")[0].childNodes[0].nodeValue;
  a = a + "</span></section></section>";
}

right.innerHTML = right.innerHTML+a;
left.innerHTML = left.innerHTML+b;

function handleDragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move'; 
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl.innerHTML == this.innerHTML && dragSrcEl!=this ) {
    dragSrcEl.style.color = '#777';
	  this.classList.add('visible');
    dragSrcEl.setAttribute('draggable', false);
	  count++;
	  if ( totalMatches == count ) {
	  	document.getElementById("success_msg").style.display="block";
      document.getElementById("play_again").style.display="block";
	  }
  }
  return false;
}

function handleDragEnd(e) {
  this.style.opacity = '1';
  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });  
}

var cols = document.querySelectorAll('.list_item');
[].forEach.call(cols, function(col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false)
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
  col.addEventListener('dragend', handleDragEnd, false);
});








