/* smell */

var foodpoint = [-150,-50];

function drawfoodpoint()
{
    setPos(foodpoint[0], foodpoint[1]);
    rt(45);
    fd(30);
    bk(60);
    fd(30);
    rt(90);
    fd(30);
    bk(60);
    fd(30);
}

function distancefromfood()
{
    var w = foodpoint[0] - getPos().x;
    var h = foodpoint[1] - getPos().y;
    return Math.sqrt(w*w + h*h);
}

function strongersmell(lastdistance)
{
    return (distancefromfood() < lastdistance);
}

var step = 1;
var angle = 20;

clean();
drawfoodpoint();
home();

var distance = distancefromfood();
while (distancefromfood() > 10)
{
    fd(step);
    if (!strongersmell(distance))
    {
      rt(angle);
    }
    distance = distancefromfood();
}
