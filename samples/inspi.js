
function inspi(side, angle, inc, level)
{
    if (level >= 1000)
    {
        return;
    }
    fd(side);
    rt(angle);
    inspi(side, angle+inc, inc, level+1);
}

clean();
setPos(-50,-50);
inspi(20, 0, 7, 0);

