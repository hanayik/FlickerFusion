var math = require('mathjs')
var color1Val = 120
var color2Val = 120
var color1L = 45
var color2L = 50
var flicker = document.getElementById('flicker')
flicker.style =+ 'overflow:hidden; margin:0px;'
var colorBox1 = document.getElementById('colorBox1')
var colorBox2 = document.getElementById('colorBox2')
var slider1 = document.getElementById('slider1')
var slider2 = document.getElementById('slider2')
slider1.value = color1Val
slider2.value = color2Val
document.getElementById("sliderVal1").innerHTML = color1Val
document.getElementById("sliderVal2").innerHTML = color2Val
slider1.oninput = function () {
  document.getElementById("sliderVal1").innerHTML = this.value
  setColor1Color(this.value)
}

slider2.oninput = function () {
  document.getElementById("sliderVal2").innerHTML = this.value
  setColor2Color(this.value)
}
var two = new Two({ width: window.innerWidth, height: window.innerHeight }).appendTo(flicker)
// width and height for all rects
var W = two.width / 2
var H = two.height / 2
var color1 = 'hsl(' + color1Val + ' , 100%, ' + color1L.toString() + '%)'
var color2 = 'hsl(' + color2Val + ' , 100%, ' + color2L.toString() + '%)'
// rect 1
var rect1X = two.width / 4
var rect1Y = two.height / 4
// rect 2
var rect2X = rect1X * 3
var rect2Y = rect1Y
// rect 3
var rect3X = rect1X
var rect3Y = rect1Y * 3
//rect 4
var rect4X = rect1X * 3
var rect4Y = rect1Y * 3

var rect1 = two.makeRectangle(rect1X, rect1Y, W, H)
rect1.noStroke()
var rect2 = two.makeRectangle(rect2X, rect2Y, W, H)
rect2.noStroke()
var rect3 = two.makeRectangle(rect3X, rect3Y, W, H)
rect3.noStroke()
var rect4 = two.makeRectangle(rect4X, rect4Y, W, H)
rect4.noStroke()
rect1.fill = color1
rect2.fill = color2
rect3.fill = color2
rect4.fill = color1
var container = two.makeGroup(rect1, rect2, rect3, rect4)
//var circle = two.makeCircle(two.width/2, two.height/2, 10)
//circle.noStroke().fill = 'white'

//Fovea
// var maskArea = two.makeCircle(two.width/2, two.height/2, 100)
// container.mask = maskArea
// var circle = two.makeCircle(two.width/2, two.height/2, 10)
// circle.noStroke().fill = 'black'

//Periphery
var clipArea = two.makeRectangle(two.width/2, two.height/2, two.width-100, two.height)
clipArea.noStroke().fill = 'white'
container.clip = clipArea
var circle = two.makeCircle(two.width/2, two.height/2, 10)
circle.noStroke().fill = 'black'

a = []

function startAnimation () {
  two.bind('update', function (frameCount) {
    //console.log(rect2.fill)
    //console.log(two.timeDelta)
    //console.log(frameCount)
    if (frameCount > 500) {
      a.push(two.timeDelta)
      if (a[0] == null) {
        a = []
      }
      //console.log(math.mean(a))
    }

    if (rect1.fill == color1) {
      rect1.fill = color2
    } else {
      rect1.fill = color1
    }
    // rect 2
    if (rect2.fill == color1) {
      rect2.fill = color2
    } else {
      rect2.fill = color1
    }
    // rect 3
    if (rect3.fill == color1) {
      rect3.fill = color2
    } else {
      rect3.fill = color1
    }
    // rect 4
    if (rect4.fill == color1) {
      rect4.fill = color2
    } else {
      rect4.fill = color1
    }
    colorBox1.style.backgroundColor = color1
    colorBox2.style.backgroundColor = color2
  }).play()
}

function setRed (shift) {
  change = redVal + shift
  redVal = change
  if (redVal < 0) {
    redVal = 0
  } else if (redVal > 100) {
    redVal = 100
  }
  red = 'hsl(0, 100%, ' + redVal.toString() + '%)'
  console.log('red: ', red)
}

function setColor1Color(val) {
  color1Val = val
  color1 = 'hsl(' + color1Val + ', 100%, ' + color1L.toString() + '%)'
  colorBox1.style.backgroundColor = color1
  rect1.fill = color1
  rect2.fill = color2
  rect3.fill = color2
  rect4.fill = color1
}


function setColor2Color(val) {
  color2Val = val
  color2 = 'hsl(' + color2Val + ', 100%, ' + color2L.toString() + '%)'
  colorBox2.style.backgroundColor = color2
  rect1.fill = color1
  rect2.fill = color2
  rect3.fill = color2
  rect4.fill = color1
}


function setColor1Luminance (shift) {
  color1L += shift
  color1 = 'hsl(' + color1Val + ', 100%, ' + color1L.toString() + '%)'
  rect1.fill = color1
  rect2.fill = color2
  rect3.fill = color2
  rect4.fill = color1
}


function setColor2Luminance (shift) {
  color2L += shift
  color2 = 'hsl(' + color2Val + ', 100%, ' + color2L.toString() + '%)'
  rect1.fill = color1
  rect2.fill = color2
  rect3.fill = color2
  rect4.fill = color1
}


function setGreen (shift) {
  change = greenVal + shift
  greenVal = change
  if (greenVal < 0) {
    greenVal = 0
  } else if (greenVal > 100) {
    greenVal = 100
  }
  green = 'hsl(120, 100%, ' + greenVal.toString() + '%)'
  console.log('green: ', green)
}

function showColorVals () {
  //alert ("Green value is: " +  green)
  // console.log("mean refresh: ", math.mean(a))
  // console.log("std refresh: ", math.std(a))
  document.title = 'Flicker Fusion: Color 1: ' + color1 + ', Color 2: ' + color2 + ', Avg Refresh: ' + math.round(math.mean(a),2).toString() + ', Std: ' + math.round(math.std(a),2).toString()
}

document.onkeypress = function (e) {
  code = e.charCode
  //key = String.fromCharCode(code)
  key = e.key
  console.log(key)
  if (key == '1') {
    if (!two.playing) {
      two.play()
    }
    console.log(key)
    setColor2Luminance(1)
  } else if (key == '2') {
    if (!two.playing) {
      two.play()
    }
    console.log(key)
    setColor2Luminance(-1)
  } else if (key == '3') {
    //console.log(key)
    showColorVals()
    two.pause()
    //showColorVals()
    a = []
    //console.log("mean refresh: ", math.mean(a))
    //console.log("std refresh: ", math.std(a))
  } else if (key == 'Enter') {
    startAnimation()
    showColorVals()
    a = []
  }
};
