function poly(size, angle)
{
  var totalangle = 0
  do
  {
    fd(size)
    rt(angle)
    totalangle += angle
  }
  while (totalangle % 360 != 0)
}


function newpoly(side, angle)
{
  var totalangle = 0;
  do
  {
    fd(side)
    rt(angle)
    fd(side)
    rt(2*angle)
    totalangle += 3*angle
  }
  while (totalangle % 360 != 0)
}

clean()
setPenColor("#ff0000")
setPenSize(2)
setPos(0,-100)
poly(200, 156)
setPenColor("#0000ff")
setPos(-40, 85) // eyeballed..
newpoly(30,125)


