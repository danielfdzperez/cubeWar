function endLevelPointAnimation(ctx, 	position, distance_to_player){
	var size = endLevelPointAnimation.size
    color = 'purple'
    ctx.beginPath()
    ctx.fillStyle  = color
    ctx.arc( position.x, position.y + distance_to_player, size, 0, (Math.PI/180)*360, false)
    ctx.fill()
    ctx.closePath()


    if(endLevelPointAnimation.step == 0)
       endLevelPointAnimation.size = ++endLevelPointAnimation.size % 10
    endLevelPointAnimation.step = ++endLevelPointAnimation.step % 5
}

endLevelPointAnimation.size = 0
endLevelPointAnimation.step = 0
