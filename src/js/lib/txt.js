//-----------txt.js----------------

//o is an array of options with the following structure:
/*
0: text
1: x
2: y
3: hspacing
4: vspacing
5: halign
6: valign
7: scale
8: color
9: per character offset
*/
function textLine(o) {

	var textLength = o[0].length,
		size = 5;

	for (var i = 0; i < textLength; i++) {

		var letter = [];
		letter = getCharacter( o[0].charAt(i) );

		for (var y = 0; y < size; y++) {
			for (var x = 0; x < size; x++) {
				//if (letter[y][x] == 1) {
				if (letter[y*size+x] == 1){
					if(o[4] == 1){
						pset(
							o[1] + ( x * o[4] ) + ( ( size * o[4] ) + o[3] ) * i,
							o[2] + (y * o[4]),
							o[5]
						);
					}

					else {
						fillRect(
						o[1] + ( x * o[4] ) + ( ( size * o[4] ) + o[3] ) * i,
						o[2] + (y * o[4]),
						o[4],
						o[4],
						o[5]);
					}

				} //end draw routine
			}  //end x loop
		}  //end y loop
	}  //end text loop
}  //end textLine()

function text(o) {
	var size = 5,
	letterSize = size * o[7],
	lines = o[0].split('\n'),
	linesCopy = lines.slice(0),
	lineCount = lines.length,
	longestLine = linesCopy.sort(function (a, b) {
		return b.length - a.length;
	})[0],
	textWidth = ( longestLine.length * letterSize ) + ( ( longestLine.length - 1 ) * o[3] ),
	textHeight = ( lineCount * letterSize ) + ( ( lineCount - 1 ) * o[4] );

	if(!o[5])o[5] = 'left';
	if(!o[6])o[6] = 'bottom';

	var sx = o[1],
		sy = o[2],
		ex = o[1] + textWidth,
		ey = o[2] + textHeight;

	if (o[5] == 'center') {
		sx = o[1] - textWidth / 2;
		ex = o[1] + textWidth / 2;
	} else if (o[5] == 'right') {
		sx = o[1] - textWidth;
		ex = o[1];
	}

	if (o[6] == 'center') {
		sy = o[2] - textHeight / 2;
		ey = o[2] + textHeight / 2;
	} else if (o[6] == 'bottom') {
		sy = o[2] - textHeight;
		ey = o[2];
	}

	var cx = sx + textWidth / 2,
		cy = sy + textHeight / 2;

		for (var i = 0; i < lineCount; i++) {
			var line = lines[i],
				lineWidth = ( line.length * letterSize ) + ( ( line.length - 1 ) * o[3] ),
				x = o[1],
				y = o[2] + ( letterSize + o[4] ) * i;

			if (o[5] == 'center') {
				x = o[1] - lineWidth / 2;
			} else if (o[5] == 'right') {
				x = o[1] - lineWidth;
			}

			if (o[6] == 'center') {
				y = y - textHeight / 2;
			} else if (o[6] == 'bottom') {
				y = y - textHeight;
			}

			textLine([
				line,
				x,
				y,
				o[3] || 0,
				o[7] || 1,
				o[8],
				o[9]
			]);
		}

	return {
		sx: sx,
		sy: sy,
		cx: cx,
		cy: cy,
		ex: ex,
		ey: ey,
		width: textWidth,
		height: textHeight
	}
}

function getCharacter(char){
	index = fontString.indexOf(char);
	return fontBitmap.substring(index * 25, index*25+25).split('') ;
}

//-----------END txt.js----------------
