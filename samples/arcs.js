
function circle()
{
  $A($R(1,360)).each(function() {
      fd(1)
      rt(1)
  })
}

function arcr(r, deg)
{
    deg.times(function() {
        fd(r)
        rt(1)
    })
}
function arcl(r, deg)
{
    deg.times(function() {
        fd(r)
        lt(1)
    })
}
function circles (angle)
{
    var totalangle = 0
    do
    {
        arcr(1, 360)
        rt(angle)
        totalangle += angle
    }
    while (totalangle % 360 != 0)
 }

clean()
setPenColor("#0000ff")
circles(30)


