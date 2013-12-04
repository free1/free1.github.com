function getPos(ev)
{
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

	return {x: ev.clientX + scrollLeft, y: ev.clientY + scrollTop};
}

document.onmousemove = function (ev)
{
	var aDiv = document.getElemnetsByName('mousemove');
	var oEvent = ev || event;

	var pos = getPos(oEvent);

	for (var i = aDiv.length-1; i > 0; i--) 
	{
		aDiv[i].style.left = aDiv[i-1].offsetLeft + 'px';
		aDiv[i].style.top = aDiv[i-1].offsetTop + 'px';
	}

	aDiv[0].style.left = pos.x + 'px';
	aDiv[0].style.top = pos.y + 'px';
}