

function poly(n)
{
  var angle = 360/n
  n.times(function() {
    fd(100)
    rt(angle)
  });
}

clean()
var colors = ["#008000", "#800000", "#000080"]
setPenSize(2)

setPos(-150, -100)
for (var i=4; i<=10; i++)
{
  var color = colors[i%colors.length]
  setPenColor(color);
  poly(i);
}
