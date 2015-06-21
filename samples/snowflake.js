
function side(size, level) {
    if (level==0) {
        fd(size);
        return;
    }
    side(size/3, level-1);
    lt(60);
    side(size/3, level-1);
    rt(120);
    side(size/3, level-1);
    lt(60);
    side(size/3, level-1);
}

function snowflake(size, level) {
    (3).times(function() {
        side(size, level);
        rt(120);
    });
}


clean();
lt(30);
setPos(0,-100);
snowflake(250, 4);
