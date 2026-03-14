const c = document.getElementById("Rubik's Cube"); const ctx = c.getContext("2d"); const height = c.height; const width = c.width; const CubeSize = (height > width ? height : width) * 0.45;
let XCoord = []; let YCoord = [];
let colour = [];
let x1 = []; let x2 = []; let x3 = []; let x4 = []; let y1 = []; let y2 = []; let y3 = []; let y4 = [];
let U = []; let F = []; let L = []; let B = []; let R = []; let D = [];
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
	XCoord.push(x);
	YCoord.push(y);
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
	x1.push(XCoord[i1] * CubeSize);
	y1.push(YCoord[i1] * CubeSize);
	x2.push(XCoord[i2] * CubeSize);
	y2.push(YCoord[i2] * CubeSize);
	x3.push(XCoord[i3] * CubeSize);
	y3.push(YCoord[i3] * CubeSize);
	x4.push(XCoord[i4] * CubeSize);
	y4.push(YCoord[i4] * CubeSize);
}
function ResetCube() {
	U = Array(9).fill("w");
	F = Array(9).fill("g");
	L = Array(9).fill("o");
	B = Array(9).fill("b");
	R = Array(9).fill("r");
	D = Array(9).fill("y");
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
	temp = [L[8], L[5], L[2], D[0], D[1], D[2], R[6], R[3], R[0], U[8], U[7], U[6]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	L[8] = temp[0];
	L[5] = temp[1];
	L[2] = temp[2];
	D[0] = temp[3];
	D[1] = temp[4];
	D[2] = temp[5];
	R[6] = temp[6];
	R[3] = temp[7];
	R[0] = temp[8];
	U[8] = temp[9];
	U[7] = temp[10];
	U[6] = temp[11];
	temp = [F[0], F[1], F[2], F[5], F[8], F[7], F[6], F[3]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	F[0] = temp[0];
	F[1] = temp[1];
	F[2] = temp[2];
	F[5] = temp[3];
	F[8] = temp[4];
	F[7] = temp[5];
	F[6] = temp[6];
	F[3] = temp[7];
}
function TurnU() {
	let temp = [];
	temp = [L[0], L[1], L[2], F[0], F[1], F[2], R[0], R[1], R[2], B[0], B[1], B[2]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	L[0] = temp[0];
	L[1] = temp[1];
	L[2] = temp[2];
	F[0] = temp[3];
	F[1] = temp[4];
	F[2] = temp[5];
	R[0] = temp[6];
	R[1] = temp[7];
	R[2] = temp[8];
	B[0] = temp[9];
	B[1] = temp[10];
	B[2] = temp[11];
	temp = [U[0], U[3], U[6], U[7], U[8], U[5], U[2], U[1]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	U[0] = temp[0];
	U[3] = temp[1];
	U[6] = temp[2];
	U[7] = temp[3];
	U[8] = temp[4];
	U[5] = temp[5];
	U[2] = temp[6];
	U[1] = temp[7];
}
function TurnX() {
	let temp = [U[2], U[5], U[8], F[2], F[5], F[8], D[2], D[5], D[8], B[6], B[3], B[0]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	U[2] = temp[0];
	U[5] = temp[1];
	U[8] = temp[2];
	F[2] = temp[3];
	F[5] = temp[4];
	F[8] = temp[5];
	D[2] = temp[6];
	D[5] = temp[7];
	D[8] = temp[8];
	B[6] = temp[9];
	B[3] = temp[10];
	B[0] = temp[11];
	temp = [U[1], U[4], U[7], F[1], F[4], F[7], D[1], D[4], D[7], B[7], B[4], B[1]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	U[1] = temp[0];
	U[4] = temp[1];
	U[7] = temp[2];
	F[1] = temp[3];
	F[4] = temp[4];
	F[7] = temp[5];
	D[1] = temp[6];
	D[4] = temp[7];
	D[7] = temp[8];
	B[7] = temp[9];
	B[4] = temp[10];
	B[1] = temp[11];
	temp = [U[0], U[3], U[6], F[0], F[3], F[6], D[0], D[3], D[6], B[8], B[5], B[2]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	U[0] = temp[0];
	U[3] = temp[1];
	U[6] = temp[2];
	F[0] = temp[3];
	F[3] = temp[4];
	F[6] = temp[5];
	D[0] = temp[6];
	D[3] = temp[7];
	D[6] = temp[8];
	B[8] = temp[9];
	B[5] = temp[10];
	B[2] = temp[11];
	temp = [R[0], R[3], R[6], R[7], R[8], R[5], R[2], R[1]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	R[0] = temp[0];
	R[3] = temp[1];
	R[6] = temp[2];
	R[7] = temp[3];
	R[8] = temp[4];
	R[5] = temp[5];
	R[2] = temp[6];
	R[1] = temp[7];
	temp = [L[0], L[1], L[2], L[5], L[8], L[7], L[6], L[3]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	L[0] = temp[0];
	L[1] = temp[1];
	L[2] = temp[2];
	L[5] = temp[3];
	L[8] = temp[4];
	L[7] = temp[5];
	L[6] = temp[6];
	L[3] = temp[7];
}
function TurnY() {
	let temp = [F[0], F[1], F[2], R[0], R[1], R[2], B[0], B[1], B[2], L[0], L[1], L[2]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	F[0] = temp[0];
	F[1] = temp[1];
	F[2] = temp[2];
	R[0] = temp[3];
	R[1] = temp[4];
	R[2] = temp[5];
	B[0] = temp[6];
	B[1] = temp[7];
	B[2] = temp[8];
	L[0] = temp[9];
	L[1] = temp[10];
	L[2] = temp[11];
	temp = [F[3], F[4], F[5], R[3], R[4], R[5], B[3], B[4], B[5], L[3], L[4], L[5]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	F[3] = temp[0];
	F[4] = temp[1];
	F[5] = temp[2];
	R[3] = temp[3];
	R[4] = temp[4];
	R[5] = temp[5];
	B[3] = temp[6];
	B[4] = temp[7];
	B[5] = temp[8];
	L[3] = temp[9];
	L[4] = temp[10];
	L[5] = temp[11];
	temp = [F[6], F[7], F[8], R[6], R[7], R[8], B[6], B[7], B[8], L[6], L[7], L[8]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	F[6] = temp[0];
	F[7] = temp[1];
	F[8] = temp[2];
	R[6] = temp[3];
	R[7] = temp[4];
	R[8] = temp[5];
	B[6] = temp[6];
	B[7] = temp[7];
	B[8] = temp[8];
	L[6] = temp[9];
	L[7] = temp[10];
	L[8] = temp[11];
	temp = [U[0], U[3], U[6], U[7], U[8], U[5], U[2], U[1]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	U[0] = temp[0];
	U[3] = temp[1];
	U[6] = temp[2];
	U[7] = temp[3];
	U[8] = temp[4];
	U[5] = temp[5];
	U[2] = temp[6];
	U[1] = temp[7];
	temp = [D[0], D[1], D[2], D[5], D[8], D[7], D[6], D[3]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	D[0] = temp[0];
	D[1] = temp[1];
	D[2] = temp[2];
	D[5] = temp[3];
	D[8] = temp[4];
	D[7] = temp[5];
	D[6] = temp[6];
	D[3] = temp[7];
}
function TurnZ() {
	let temp = [U[2], U[1], U[0], L[0], L[3], L[6], D[6], D[7], D[8], R[8], R[5], R[2]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	U[2] = temp[0];
	U[1] = temp[1];
	U[0] = temp[2];
	L[0] = temp[3];
	L[3] = temp[4];
	L[6] = temp[5];
	D[6] = temp[6];
	D[7] = temp[7];
	D[8] = temp[8];
	R[8] = temp[9];
	R[5] = temp[10];
	R[2] = temp[11];
	temp = [U[5], U[4], U[3], L[1], L[4], L[7], D[3], D[4], D[5], R[7], R[4], R[1]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	U[5] = temp[0];
	U[4] = temp[1];
	U[3] = temp[2];
	L[1] = temp[3];
	L[4] = temp[4];
	L[7] = temp[5];
	D[3] = temp[6];
	D[4] = temp[7];
	D[5] = temp[8];
	R[7] = temp[9];
	R[4] = temp[10];
	R[1] = temp[11];
	temp = [U[8], U[7], U[6], L[2], L[5], L[8], D[0], D[1], D[2], R[6], R[3], R[0]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	U[8] = temp[0];
	U[7] = temp[1];
	U[6] = temp[2];
	L[2] = temp[3];
	L[5] = temp[4];
	L[8] = temp[5];
	D[0] = temp[6];
	D[1] = temp[7];
	D[2] = temp[8];
	R[6] = temp[9];
	R[3] = temp[10];
	R[0] = temp[11];
	temp = [F[0], F[3], F[6], F[7], F[8], F[5], F[2], F[1]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	F[0] = temp[0];
	F[3] = temp[1];
	F[6] = temp[2];
	F[7] = temp[3];
	F[8] = temp[4];
	F[5] = temp[5];
	F[2] = temp[6];
	F[1] = temp[7];
	temp = [B[0], B[1], B[2], B[3], B[5], B[6], B[7], B[8]];
	temp = FirstToEnd(temp);
	temp = FirstToEnd(temp);
	B[0] = temp[0];
	B[1] = temp[1];
	B[2] = temp[2];
	B[3] = temp[3];
	B[4] = temp[4];
	B[5] = temp[5];
	B[6] = temp[6];
	B[7] = temp[7];
	B[8] = temp[8];
}
function FirstToEnd(array) {
	let First = array[0];
	array.shift();
	array.push(First);
	return array;
}
function GetColour() {
	let SingleLetterColour = [U[0], U[3], U[1], U[6], U[4], U[2], F[0], U[7], U[5], R[2], F[3], F[1], U[8], R[1], R[5], F[6], F[4], F[2], R[0], R[4], R[8], F[7], F[5], R[3], R[7], F[8], R[6]];
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
	for (let i = 0; i < x1.length; i++) {
		let Quad = [x1[i], y1[i], x2[i], y2[i], x3[i], y3[i], x4[i], y4[i]];
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

function TestCubeWithNumbers() {
	U = ["U0", "U1", "U2", "U3", "U4", "U5", "U6", "U7", "U8"];
	F = ["F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"];
	L = ["L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];
	B = ["B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"];
	R = ["R0", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"];
	D = ["D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"];

}

GetXY1To4();
GetQuad();
ResetCube();
TestCubeWithNumbers();
