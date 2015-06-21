
function poly(sides)
{
  var angle = 360/sides;
  sides.times(function() {
    fd(100); rt(angle);
  });
}

function pentagon() { poly(5); }
function square() { poly(4); }

function roll(fn, angle)
{
  var totalangle = 0;
  do
  {
    fn();
    rt(angle);
    totalangle += angle;
  } while (totalangle % 360 != 0)
}

clean();
setPenColor("#ff8000");
roll(pentagon, 35);

