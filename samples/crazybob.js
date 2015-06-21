

function crazybob(size)
{
  var green = "#00ff00";
  var blue = "#0000ff";
  var red = "#ff0000";
  var yellow = "#ffff30";
  var orange = "#ffaa00";
  var colors = [green, blue, red, yellow, orange];
  setPos(-150,-130);
  setPenSize(65);
  (18).times(function(i) {
      setPenColor(colors[i % colors.length]);
      fd(size);
      rt(100);
  })
}

clean();
crazybob(300);
