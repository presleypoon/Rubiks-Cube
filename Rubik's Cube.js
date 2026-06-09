const c = document.getElementById("Rubik's Cube");
const ctx = c.getContext("2d");
const height = c.height;
const width = c.width;
const CubeSize = (height > width ? height : width) * 0.45;

class coord {
	constructor() {
		this.x = [];
		this.y = [];
	}
}
const Coord = new coord();

let colour = [];

class quadCoord {
	constructor() {
		this.x1 = [];
		this.x2 = [];
		this.x3 = [];
		this.x4 = [];
		this.y1 = [];
		this.y2 = [];
		this.y3 = [];
		this.y4 = [];
	}
}
const QuadCoord = new quadCoord();

class faces {
	constructor() {
		this.U = [];
		this.F = [];
		this.L = [];
		this.B = [];
		this.R = [];
		this.D = [];
	}
}
const Faces = new faces();

let dev = false;

ctx.translate(width / 2, height / 2 * 1.25);
ctx.fillStyle = "#fff";
ctx.strokeStyle = "#000";

function GetXY1To4() {
	AddToXYCoord(0, -1 / 2);
	AddToXYCoord(-1 / 6, -5 / 12);
	AddToXYCoord(1 / 6, -5 / 12);
	AddToXYCoord(-1 / 3, -1 / 3);
	AddToXYCoord(0, -1 / 3);
	AddToXYCoord(1 / 3, -1 / 3);
	AddToXYCoord(-1 / 2, -1 / 4);
	AddToXYCoord(-1 / 6, -1 / 4);
	AddToXYCoord(1 / 6, -1 / 4);
	AddToXYCoord(1 / 2, -1 / 4);
	AddToXYCoord(-1 / 2, -1 / 6);
	AddToXYCoord(-1 / 3, -1 / 6);
	AddToXYCoord(0, -1 / 6);
	AddToXYCoord(1 / 3, -1 / 6);
	AddToXYCoord(1 / 2, -1 / 6);
	AddToXYCoord(-1 / 2, -1 / 12);
	AddToXYCoord(-1 / 3, -1 / 12);
	AddToXYCoord(-1 / 6, -1 / 12);
	AddToXYCoord(1 / 6, -1 / 12);
	AddToXYCoord(1 / 3, -1 / 12);
	AddToXYCoord(1 / 2, -1 / 12);
	AddToXYCoord(-1 / 2, 0);
	AddToXYCoord(-1 / 3, 0);
	AddToXYCoord(-1 / 6, 0);
	AddToXYCoord(0, 0);
	AddToXYCoord(1 / 6, 0);
	AddToXYCoord(1 / 3, 0);
	AddToXYCoord(1 / 2, 0);
	AddToXYCoord(-1 / 3, 1 / 12);
	AddToXYCoord(-1 / 6, 1 / 12);
	AddToXYCoord(0, 1 / 12);
	AddToXYCoord(1 / 6, 1 / 12);
	AddToXYCoord(1 / 3, 1 / 12);
	AddToXYCoord(-1 / 6, 1 / 6);
	AddToXYCoord(0, 1 / 6);
	AddToXYCoord(1 / 6, 1 / 6);
	AddToXYCoord(0, 1 / 4);
}

function AddToXYCoord(x, y) {
	if (!(Number.isFinite(x) && Number.isFinite(y))) return;
	Coord.x.push(x);
	Coord.y.push(y);
}

function GetQuad() {
	SaveQuad(0, 2, 4, 1);
	SaveQuad(1, 4, 7, 3);
	SaveQuad(2, 5, 8, 4);
	SaveQuad(3, 7, 11, 6);
	SaveQuad(4, 8, 12, 7);
	SaveQuad(5, 9, 13, 8);
	SaveQuad(6, 11, 16, 10);
	SaveQuad(7, 12, 17, 11);
	SaveQuad(8, 13, 18, 12);
	SaveQuad(9, 14, 19, 13);
	SaveQuad(10, 16, 22, 15);
	SaveQuad(11, 17, 23, 16);
	SaveQuad(12, 18, 24, 17);
	SaveQuad(13, 19, 25, 18);
	SaveQuad(14, 20, 26, 19);
	SaveQuad(15, 22, 28, 21);
	SaveQuad(16, 23, 29, 22);
	SaveQuad(17, 24, 30, 23);
	SaveQuad(18, 25, 30, 24);
	SaveQuad(19, 26, 31, 25);
	SaveQuad(20, 27, 32, 26);
	SaveQuad(22, 29, 33, 28);
	SaveQuad(23, 30, 34, 29);
	SaveQuad(25, 31, 34, 30);
	SaveQuad(26, 32, 35, 31);
	SaveQuad(29, 34, 36, 33);
	SaveQuad(31, 35, 36, 34);
}

function SaveQuad(i1, i2, i3, i4) {
	if (!(Number.isFinite(i1) && Number.isFinite(i2) && Number.isFinite(i3) && Number.isFinite(i4))) return;
	QuadCoord.x1.push(Coord.x[i1] * CubeSize);
	QuadCoord.y1.push(Coord.y[i1] * CubeSize);
	QuadCoord.x2.push(Coord.x[i2] * CubeSize);
	QuadCoord.y2.push(Coord.y[i2] * CubeSize);
	QuadCoord.x3.push(Coord.x[i3] * CubeSize);
	QuadCoord.y3.push(Coord.y[i3] * CubeSize);
	QuadCoord.x4.push(Coord.x[i4] * CubeSize);
	QuadCoord.y4.push(Coord.y[i4] * CubeSize);
}

function ResetCube() {
	Faces.U = Array(9).fill("w");
	Faces.F = Array(9).fill("g");
	Faces.L = Array(9).fill("o");
	Faces.B = Array(9).fill("b");
	Faces.R = Array(9).fill("r");
	Faces.D = Array(9).fill("y");
	DrawCube();
}

function Move(moves) {
	if (moves.length === 0) return;
	for (let i = 0; i < moves.length; i++) {
		Turn(moves[i], i);
		if (moves.length == 7) {
			console.log("Breakpoint here");
		}
	}
}

function Turn(move, IdForError) {
	if (move.includes("'")) {
		Move([move[0], move[0], move[0]]);
	} else if (move.includes("2")) {
		Move([move[0], move[0]]);
	} else if (move === "F") {
		TurnF();
	} else if (move === "U") {
		TurnU();
	} else if (move === "x") {
		TurnX();
	} else if (move === "y") {
		TurnY();
	} else if (move === "z") {
		TurnZ();
	} else if (move === "R") {
		Move(["y", "F", "y'"]);
	} else if (move === "L") {
		Move(["y'", "F", "y"]);
	} else if (move === "D") {
		Move(["x", "F", "x'"]);
	} else if (move === "B") {
		Move(["x'", "U", "x"]);
	} else if (move === "M") {
		Move(["x'", "R", "L'"]);
	} else if (move === "E") {
		Move(["y'", "U", "D'"]);
	} else if (move === "S") {
		Move(["z'", "F", "B'"]);
	} else if (move === "f") {
		Move(["z", "B'"]);
	} else if (move === "u") {
		Move(["y", "D'"]);
	} else if (move === "d") {
		Move(["y'", "U'"]);
	} else if (move === "b") {
		Move(["z'", "F'"]);
	} else if (move === "r") {
		Move(["x", "L'"]);
	} else if (move === "l") {
		Move(["x'", "R'"]);
	} else {
		throw new Error(`Move '${move}' at index ${IdForError} not a valid move`);
	}
	DrawCube();
}

function TurnF() {
	let temp = [];
	temp = [Faces.L[8], Faces.L[5], Faces.L[2], Faces.D[0], Faces.D[1], Faces.D[2], Faces.R[6], Faces.R[3], Faces.R[0], Faces.U[8], Faces.U[7], Faces.U[6]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.L[8] = temp[0];
	Faces.L[5] = temp[1];
	Faces.L[2] = temp[2];
	Faces.D[0] = temp[3];
	Faces.D[1] = temp[4];
	Faces.D[2] = temp[5];
	Faces.R[6] = temp[6];
	Faces.R[3] = temp[7];
	Faces.R[0] = temp[8];
	Faces.U[8] = temp[9];
	Faces.U[7] = temp[10];
	Faces.U[6] = temp[11];
	temp = [Faces.F[0], Faces.F[1], Faces.F[2], Faces.F[5], Faces.F[8], Faces.F[7], Faces.F[6], Faces.F[3]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.F[0] = temp[0];
	Faces.F[1] = temp[1];
	Faces.F[2] = temp[2];
	Faces.F[5] = temp[3];
	Faces.F[8] = temp[4];
	Faces.F[7] = temp[5];
	Faces.F[6] = temp[6];
	Faces.F[3] = temp[7];
}

function TurnU() {
	let temp = [];
	temp = [Faces.L[0], Faces.L[1], Faces.L[2], Faces.F[0], Faces.F[1], Faces.F[2], Faces.R[0], Faces.R[1], Faces.R[2], Faces.B[0], Faces.B[1], Faces.B[2]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.L[0] = temp[0];
	Faces.L[1] = temp[1];
	Faces.L[2] = temp[2];
	Faces.F[0] = temp[3];
	Faces.F[1] = temp[4];
	Faces.F[2] = temp[5];
	Faces.R[0] = temp[6];
	Faces.R[1] = temp[7];
	Faces.R[2] = temp[8];
	Faces.B[0] = temp[9];
	Faces.B[1] = temp[10];
	Faces.B[2] = temp[11];
	temp = [Faces.U[0], Faces.U[3], Faces.U[6], Faces.U[7], Faces.U[8], Faces.U[5], Faces.U[2], Faces.U[1]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.U[0] = temp[0];
	Faces.U[3] = temp[1];
	Faces.U[6] = temp[2];
	Faces.U[7] = temp[3];
	Faces.U[8] = temp[4];
	Faces.U[5] = temp[5];
	Faces.U[2] = temp[6];
	Faces.U[1] = temp[7];
}

function TurnX() {
	let temp = [Faces.U[2], Faces.U[5], Faces.U[8], Faces.F[2], Faces.F[5], Faces.F[8], Faces.D[2], Faces.D[5], Faces.D[8], Faces.B[6], Faces.B[3], Faces.B[0]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.U[2] = temp[0];
	Faces.U[5] = temp[1];
	Faces.U[8] = temp[2];
	Faces.F[2] = temp[3];
	Faces.F[5] = temp[4];
	Faces.F[8] = temp[5];
	Faces.D[2] = temp[6];
	Faces.D[5] = temp[7];
	Faces.D[8] = temp[8];
	Faces.B[6] = temp[9];
	Faces.B[3] = temp[10];
	Faces.B[0] = temp[11];
	temp = [Faces.U[1], Faces.U[4], Faces.U[7], Faces.F[1], Faces.F[4], Faces.F[7], Faces.D[1], Faces.D[4], Faces.D[7], Faces.B[7], Faces.B[4], Faces.B[1]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.U[1] = temp[0];
	Faces.U[4] = temp[1];
	Faces.U[7] = temp[2];
	Faces.F[1] = temp[3];
	Faces.F[4] = temp[4];
	Faces.F[7] = temp[5];
	Faces.D[1] = temp[6];
	Faces.D[4] = temp[7];
	Faces.D[7] = temp[8];
	Faces.B[7] = temp[9];
	Faces.B[4] = temp[10];
	Faces.B[1] = temp[11];
	temp = [Faces.U[0], Faces.U[3], Faces.U[6], Faces.F[0], Faces.F[3], Faces.F[6], Faces.D[0], Faces.D[3], Faces.D[6], Faces.B[8], Faces.B[5], Faces.B[2]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.U[0] = temp[0];
	Faces.U[3] = temp[1];
	Faces.U[6] = temp[2];
	Faces.F[0] = temp[3];
	Faces.F[3] = temp[4];
	Faces.F[6] = temp[5];
	Faces.D[0] = temp[6];
	Faces.D[3] = temp[7];
	Faces.D[6] = temp[8];
	Faces.B[8] = temp[9];
	Faces.B[5] = temp[10];
	Faces.B[2] = temp[11];
	temp = [Faces.R[0], Faces.R[3], Faces.R[6], Faces.R[7], Faces.R[8], Faces.R[5], Faces.R[2], Faces.R[1]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.R[0] = temp[0];
	Faces.R[3] = temp[1];
	Faces.R[6] = temp[2];
	Faces.R[7] = temp[3];
	Faces.R[8] = temp[4];
	Faces.R[5] = temp[5];
	Faces.R[2] = temp[6];
	Faces.R[1] = temp[7];
	temp = [Faces.L[0], Faces.L[1], Faces.L[2], Faces.L[5], Faces.L[8], Faces.L[7], Faces.L[6], Faces.L[3]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.L[0] = temp[0];
	Faces.L[1] = temp[1];
	Faces.L[2] = temp[2];
	Faces.L[5] = temp[3];
	Faces.L[8] = temp[4];
	Faces.L[7] = temp[5];
	Faces.L[6] = temp[6];
	Faces.L[3] = temp[7];
}

function TurnY() {
	let temp = [Faces.F[0], Faces.F[1], Faces.F[2], Faces.R[0], Faces.R[1], Faces.R[2], Faces.B[0], Faces.B[1], Faces.B[2], Faces.L[0], Faces.L[1], Faces.L[2]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.F[0] = temp[0];
	Faces.F[1] = temp[1];
	Faces.F[2] = temp[2];
	Faces.R[0] = temp[3];
	Faces.R[1] = temp[4];
	Faces.R[2] = temp[5];
	Faces.B[0] = temp[6];
	Faces.B[1] = temp[7];
	Faces.B[2] = temp[8];
	Faces.L[0] = temp[9];
	Faces.L[1] = temp[10];
	Faces.L[2] = temp[11];
	temp = [Faces.F[3], Faces.F[4], Faces.F[5], Faces.R[3], Faces.R[4], Faces.R[5], Faces.B[3], Faces.B[4], Faces.B[5], Faces.L[3], Faces.L[4], Faces.L[5]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.F[3] = temp[0];
	Faces.F[4] = temp[1];
	Faces.F[5] = temp[2];
	Faces.R[3] = temp[3];
	Faces.R[4] = temp[4];
	Faces.R[5] = temp[5];
	Faces.B[3] = temp[6];
	Faces.B[4] = temp[7];
	Faces.B[5] = temp[8];
	Faces.L[3] = temp[9];
	Faces.L[4] = temp[10];
	Faces.L[5] = temp[11];
	temp = [Faces.F[6], Faces.F[7], Faces.F[8], Faces.R[6], Faces.R[7], Faces.R[8], Faces.B[6], Faces.B[7], Faces.B[8], Faces.L[6], Faces.L[7], Faces.L[8]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.F[6] = temp[0];
	Faces.F[7] = temp[1];
	Faces.F[8] = temp[2];
	Faces.R[6] = temp[3];
	Faces.R[7] = temp[4];
	Faces.R[8] = temp[5];
	Faces.B[6] = temp[6];
	Faces.B[8] = temp[8];
	Faces.L[6] = temp[9];
	Faces.L[7] = temp[10];
	Faces.L[8] = temp[11];
	temp = [Faces.U[0], Faces.U[3], Faces.U[6], Faces.U[7], Faces.U[8], Faces.U[5], Faces.U[2], Faces.U[1]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.U[0] = temp[0];
	Faces.U[3] = temp[1];
	Faces.U[6] = temp[2];
	Faces.U[7] = temp[3];
	Faces.U[8] = temp[4];
	Faces.U[5] = temp[5];
	Faces.U[2] = temp[6];
	Faces.U[1] = temp[7];
	temp = [Faces.D[0], Faces.D[1], Faces.D[2], Faces.D[5], Faces.D[8], Faces.D[7], Faces.D[6], Faces.D[3]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.D[0] = temp[0];
	Faces.D[1] = temp[1];
	Faces.D[2] = temp[2];
	Faces.D[5] = temp[3];
	Faces.D[8] = temp[4];
	Faces.D[7] = temp[5];
	Faces.D[6] = temp[6];
	Faces.D[3] = temp[7];
}

function TurnZ() {
	let temp = [Faces.U[2], Faces.U[1], Faces.U[0], Faces.L[0], Faces.L[3], Faces.L[6], Faces.D[6], Faces.D[7], Faces.D[8], Faces.R[8], Faces.R[5], Faces.R[2]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.U[2] = temp[0];
	Faces.U[1] = temp[1];
	Faces.U[0] = temp[2];
	Faces.L[0] = temp[3];
	Faces.L[3] = temp[4];
	Faces.L[6] = temp[5];
	Faces.D[6] = temp[6];
	Faces.D[7] = temp[7];
	Faces.D[8] = temp[8];
	Faces.R[8] = temp[9];
	Faces.R[5] = temp[10];
	Faces.R[2] = temp[11];
	temp = [Faces.U[5], Faces.U[4], Faces.U[3], Faces.L[1], Faces.L[4], Faces.L[7], Faces.D[3], Faces.D[4], Faces.D[5], Faces.R[7], Faces.R[4], Faces.R[1]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.U[5] = temp[0];
	Faces.U[4] = temp[1];
	Faces.U[3] = temp[2];
	Faces.L[1] = temp[3];
	Faces.L[4] = temp[4];
	Faces.L[7] = temp[5];
	Faces.D[3] = temp[6];
	Faces.D[4] = temp[7];
	Faces.D[5] = temp[8];
	Faces.R[7] = temp[9];
	Faces.R[4] = temp[10];
	Faces.R[1] = temp[11];
	temp = [Faces.U[8], Faces.U[7], Faces.U[6], Faces.L[2], Faces.L[5], Faces.L[8], Faces.D[0], Faces.D[1], Faces.D[2], Faces.R[6], Faces.R[3], Faces.R[0]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.U[8] = temp[0];
	Faces.U[7] = temp[1];
	Faces.U[6] = temp[2];
	Faces.L[2] = temp[3];
	Faces.L[5] = temp[4];
	Faces.L[8] = temp[5];
	Faces.D[0] = temp[6];
	Faces.D[1] = temp[7];
	Faces.D[2] = temp[8];
	Faces.R[6] = temp[9];
	Faces.R[3] = temp[10];
	Faces.R[0] = temp[11];
	temp = [Faces.F[0], Faces.F[3], Faces.F[6], Faces.F[7], Faces.F[8], Faces.F[5], Faces.F[2], Faces.F[1]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.F[0] = temp[0];
	Faces.F[3] = temp[1];
	Faces.F[6] = temp[2];
	Faces.F[7] = temp[3];
	Faces.F[8] = temp[4];
	Faces.F[5] = temp[5];
	Faces.F[2] = temp[6];
	Faces.F[1] = temp[7];
	temp = [Faces.B[0], Faces.B[1], Faces.B[2], Faces.B[3], Faces.B[5], Faces.B[6], Faces.B[7], Faces.B[8]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	Faces.B[0] = temp[0];
	Faces.B[1] = temp[1];
	Faces.B[2] = temp[2];
	Faces.B[3] = temp[3];
	Faces.B[4] = temp[4];
	Faces.B[5] = temp[5];
	Faces.B[6] = temp[6];
	Faces.B[7] = temp[7];
	Faces.B[8] = temp[8];
}

function FirstToEnd(array) {
	let First = array[0];
	array.shift();
	array.push(First);
	return array;
}

function GetColour() {
	let SingleLetterColour = [Faces.U[0], Faces.U[3], Faces.U[1], Faces.U[6], Faces.U[4], Faces.U[2], Faces.F[0], Faces.U[7], Faces.U[5], Faces.R[2], Faces.F[3], Faces.F[1], Faces.U[8], Faces.R[1], Faces.R[5], Faces.F[6], Faces.F[4], Faces.F[2], Faces.R[0], Faces.R[4], Faces.R[8], Faces.F[7], Faces.F[5], Faces.R[3], Faces.R[7], Faces.F[8], Faces.R[6]];
	colour = [];
	for (let i = 0; i < SingleLetterColour.length; i++) {
		let temp = SingleLetterColour[i];
		if (temp === "w") {
			colour.push("white");
		} else if (temp === "g") {
			colour.push("green");
		} else if (temp === "o") {
			colour.push("orange");
		} else if (temp === "b") {
			colour.push("blue");
		} else if (temp === "r") {
			colour.push("red");
		} else if (temp === "y") {
			colour.push("yellow");
		} else {
			if (dev) {
				colour.push("");
			} else {
				throw new Error(`Invalid decoding at index ${i} and character ${temp}`);
			}
		}
	}
}

function DrawFullCube() {
	ctx.clearRect(-width, -height, width * 2, height * 2);
	for (let i = 0; i < QuadCoord.x1.length; i++) {
		let Quad = [QuadCoord.x1[i], QuadCoord.y1[i], QuadCoord.x2[i], QuadCoord.y2[i], QuadCoord.x3[i], QuadCoord.y3[i], QuadCoord.x4[i], QuadCoord.y4[i]];
		DrawQuad(Quad, colour[i]);
	}
}

function DrawQuad(Sides, Colour) {
	if (Number.isFinite(Sides[0]) || Number.isFinite(Sides[1]) || Number.isFinite(Sides[2]) || Number.isFinite(Sides[3]) || Number.isFinite(Sides[4]) || Number.isFinite(Sides[5]) || Number.isFinite(Sides[6]) || Number.isFinite(Sides[7])) return;
	ctx.fillStyle = Colour;
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;

	ctx.beginPath();
	ctx.moveTo(Sides[0], Sides[1]);
	ctx.lineTo(Sides[2], Sides[3]);
	ctx.lineTo(Sides[4], Sides[5]);
	ctx.lineTo(Sides[6], Sides[7]);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

function DrawCube() {
	GetColour();
	DrawFullCube();
}

GetXY1To4();
GetQuad();
ResetCube();
