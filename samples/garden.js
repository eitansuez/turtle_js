
/* garden */

function arcr(size, angle)
{
    angle.times(function() {
        fd(size/25);
        rt(1);
    });
}
function arcl(size, angle)
{
    angle.times(function() {
        fd(size/25);
        lt(1);
    });
}

function qcircle(size)
{
    arcr(size, 90);
}


function petal(size)
{
  qcircle(size/7);
  rt(90);
  qcircle(size/7);
  rt(90);
}
function randomcolor()
{
    var red = Math.round(Math.random()*255);
    var green = Math.round(Math.random()*255);
    var  blue = Math.round(Math.random() * 255);
    return "rgb("+red+", "+green+", "+blue+")";
}
function flowerhead(size, numpetals)
{
    setPenColor(randomcolor());
    var angle = 360.0/numpetals;
    numpetals.times(function() {
        petal(size);
        rt(angle);
    });
}

function pickrandompos()
{
    var x = Math.random() * 400 - 200;
    var y = Math.random() * 200 - 250;
    setPos(x,y);
}
function flower(size, numpetals)
{
    pickrandompos();
    var randnum = Math.round(Math.random() * 2);
    if (randnum % 2 ==0)
    {
      stemr(size);
    }
    else
    {
      steml(size);
    }

    setPenSize(Math.random() * 1.5 + 0.5);
    flowerhead(size, numpetals);
    setHeading(90);
}

function shadeofgreen()
{
    var g = Math.round(Math.random() * 155) + 100;
    return "rgb(0, "+g+", 0)";
}

function steml(size)
{
    setPenColor(shadeofgreen());
    setPenSize(3);
    arcl(size, 30);
    rt(30);
}
function stemr(size)
{
    setPenColor(shadeofgreen())
    setPenSize(3);
    arcr(size, 30);
    lt(30);
}

function garden(numflowers)
{
  numflowers.times(function() {
    var size = Math.random() * 180 + 20;
    var numpetals = Math.round(Math.random() * 15) + 3;
    flower(size, numpetals);
  });
}

clean();
garden(6);
setPos(0,0);
