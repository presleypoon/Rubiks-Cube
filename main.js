class coord {
	constructor() {
		this.x = [];
		this.y = [];
	}
}

class quad_coord {
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

	get_xy_1_to_4() {
		this.add_to_xy_coord(0, -1 / 2);
		this.add_to_xy_coord(-1 / 6, -5 / 12);
		this.add_to_xy_coord(1 / 6, -5 / 12);
		this.add_to_xy_coord(-1 / 3, -1 / 3);
		this.add_to_xy_coord(0, -1 / 3);
		this.add_to_xy_coord(1 / 3, -1 / 3);
		this.add_to_xy_coord(-1 / 2, -1 / 4);
		this.add_to_xy_coord(-1 / 6, -1 / 4);
		this.add_to_xy_coord(1 / 6, -1 / 4);
		this.add_to_xy_coord(1 / 2, -1 / 4);
		this.add_to_xy_coord(-1 / 2, -1 / 6);
		this.add_to_xy_coord(-1 / 3, -1 / 6);
		this.add_to_xy_coord(0, -1 / 6);
		this.add_to_xy_coord(1 / 3, -1 / 6);
		this.add_to_xy_coord(1 / 2, -1 / 6);
		this.add_to_xy_coord(-1 / 2, -1 / 12);
		this.add_to_xy_coord(-1 / 3, -1 / 12);
		this.add_to_xy_coord(-1 / 6, -1 / 12);
		this.add_to_xy_coord(1 / 6, -1 / 12);
		this.add_to_xy_coord(1 / 3, -1 / 12);
		this.add_to_xy_coord(1 / 2, -1 / 12);
		this.add_to_xy_coord(-1 / 2, 0);
		this.add_to_xy_coord(-1 / 3, 0);
		this.add_to_xy_coord(-1 / 6, 0);
		this.add_to_xy_coord(0, 0);
		this.add_to_xy_coord(1 / 6, 0);
		this.add_to_xy_coord(1 / 3, 0);
		this.add_to_xy_coord(1 / 2, 0);
		this.add_to_xy_coord(-1 / 3, 1 / 12);
		this.add_to_xy_coord(-1 / 6, 1 / 12);
		this.add_to_xy_coord(0, 1 / 12);
		this.add_to_xy_coord(1 / 6, 1 / 12);
		this.add_to_xy_coord(1 / 3, 1 / 12);
		this.add_to_xy_coord(-1 / 6, 1 / 6);
		this.add_to_xy_coord(0, 1 / 6);
		this.add_to_xy_coord(1 / 6, 1 / 6);
		this.add_to_xy_coord(0, 1 / 4);
	}

	add_to_xy_coord(x, y) {
		if (!(Number.isFinite(x) && Number.isFinite(y))) return;
		COORD.x.push(x);
		COORD.y.push(y);
	}

	get_quad() {
		this.save_quad(0, 2, 4, 1);
		this.save_quad(1, 4, 7, 3);
		this.save_quad(2, 5, 8, 4);
		this.save_quad(3, 7, 11, 6);
		this.save_quad(4, 8, 12, 7);
		this.save_quad(5, 9, 13, 8);
		this.save_quad(6, 11, 16, 10);
		this.save_quad(7, 12, 17, 11);
		this.save_quad(8, 13, 18, 12);
		this.save_quad(9, 14, 19, 13);
		this.save_quad(10, 16, 22, 15);
		this.save_quad(11, 17, 23, 16);
		this.save_quad(12, 18, 24, 17);
		this.save_quad(13, 19, 25, 18);
		this.save_quad(14, 20, 26, 19);
		this.save_quad(15, 22, 28, 21);
		this.save_quad(16, 23, 29, 22);
		this.save_quad(17, 24, 30, 23);
		this.save_quad(18, 25, 30, 24);
		this.save_quad(19, 26, 31, 25);
		this.save_quad(20, 27, 32, 26);
		this.save_quad(22, 29, 33, 28);
		this.save_quad(23, 30, 34, 29);
		this.save_quad(25, 31, 34, 30);
		this.save_quad(26, 32, 35, 31);
		this.save_quad(29, 34, 36, 33);
		this.save_quad(31, 35, 36, 34);
	}

	save_quad(i1, i2, i3, i4) {
		if (
			!(
				Number.isFinite(i1) &&
				Number.isFinite(i2) &&
				Number.isFinite(i3) &&
				Number.isFinite(i4)
			)
		)
			return;
		this.x1.push(COORD.x[i1] * CUBE_SIZE);
		this.y1.push(COORD.y[i1] * CUBE_SIZE);
		this.x2.push(COORD.x[i2] * CUBE_SIZE);
		this.y2.push(COORD.y[i2] * CUBE_SIZE);
		this.x3.push(COORD.x[i3] * CUBE_SIZE);
		this.y3.push(COORD.y[i3] * CUBE_SIZE);
		this.x4.push(COORD.x[i4] * CUBE_SIZE);
		this.y4.push(COORD.y[i4] * CUBE_SIZE);
	}
}

class faces {
	constructor() {
		this.U = [];
		this.F = [];
		this.L = [];
		this.B = [];
		this.R = [];
		this.D = [];
	}

	reset_cube() {
		this.U = Array(9).fill("w");
		this.F = Array(9).fill("g");
		this.L = Array(9).fill("o");
		this.B = Array(9).fill("b");
		this.R = Array(9).fill("r");
		this.D = Array(9).fill("y");
		this.draw_cube();
	}

	move(moves) {
		for (let i = 0; i < moves.length; i++) this.turn(moves[i], i);
	}

	turn(move, id_for_error = -1) {
		if (move.includes("'")) {
			this.turn(move[0], id_for_error);
			this.turn(move[0], id_for_error);
			this.turn(move[0], id_for_error);
			this.draw_cube();
			return;
		} else if (move.includes("2")) {
			this.turn(move[0], id_for_error);
			this.turn(move[0], id_for_error);
			this.draw_cube();
			return;
		}

		switch (move) {
			case "F": {
				this.turn_f();
				break;
			}
			case "U": {
				this.turn_u();
				break;
			}
			case "x": {
				this.turn_x();
				break;
			}
			case "y": {
				this.turn_y();
				break;
			}
			case "z": {
				this.turn_z();
				break;
			}
			case "R": {
				this.turn_y();
				this.turn_f();
				this.turn_y();
				this.turn_y();
				this.turn_y();
				break;
			}
			case "L": {
				this.turn_y();
				this.turn_y();
				this.turn_y();
				this.turn_f();
				this.turn_y();
				break;
			}
			case "B": {
				this.turn_x();
				this.turn_x();
				this.turn_f();
				this.turn_x();
				this.turn_x();
				break;
			}
			case "D": {
				this.turn_x();
				this.turn_f();
				this.turn_x();
				this.turn_x();
				this.turn_x();
				break;
			}
			case "M": {
				this.turn_x();
				this.turn_x();
				this.turn_x();
				this.turn_y();
				this.turn_f();
				this.turn_y();
				this.turn_y();
				this.turn_f();
				this.turn_f();
				this.turn_f();
				this.turn_y();
				break;
			}
			case "E": {
				this.turn_y();
				this.turn_u();
				this.turn_u();
				this.turn_u();
				this.turn_x();
				this.turn_f();
				this.turn_x();
				this.turn_x();
				this.turn_x();
				break;
			}
			case "S": {
				this.turn_z();
				this.turn_z();
				this.turn_z();
				this.turn_f();
				this.turn_x();
				this.turn_x();
				this.turn_x();
				this.turn_u();
				this.turn_u();
				this.turn_u();
				this.turn_x();
				break;
			}
			case "f": {
				this.turn_z();
				this.turn_x();
				this.turn_x();
				this.turn_x();
				this.turn_u();
				this.turn_u();
				this.turn_u();
				this.turn_x();
				break;
			}
			case "u": {
				this.turn_f();
				this.turn_f();
				this.turn_f();
				this.turn_y();
				break;
			}
			case "d": {
				this.turn_y();
				this.turn_y();
				this.turn_y();
				this.turn_u();
				this.turn_u();
				this.turn_u();
				break;
			}
			case "b": {
				this.turn_z();
				this.turn_z();
				this.turn_z();
				this.turn_f();
				this.turn_f();
				this.turn_f();
				break;
			}
			case "r": {
				this.turn_x();
				this.turn_y();
				this.turn_y();
				this.turn_y();
				this.turn_f();
				this.turn_f();
				this.turn_f();
				this.turn_y();
				break;
			}
			case "l": {
				this.turn_x();
				this.turn_x();
				this.turn_x();
				this.turn_y();
				this.turn_f();
				this.turn_f();
				this.turn_f();
				this.turn_y();
				this.turn_y();
				this.turn_y();
				break;
			}
			default: {
				throw new Error(
					`Move '${move} at index ${id_for_error} not a valid move`,
				);
				break;
			}
		}
	}

	turn_f() {
		let temp = [];
		temp = [
			this.L[8],
			this.L[5],
			this.L[2],
			this.D[0],
			this.D[1],
			this.D[2],
			this.R[0],
			this.R[3],
			this.R[6],
			this.U[8],
			this.U[7],
			this.U[6],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.L[8] = temp[0];
		this.L[5] = temp[1];
		this.L[2] = temp[2];
		this.D[0] = temp[3];
		this.D[1] = temp[4];
		this.D[2] = temp[5];
		this.R[6] = temp[6];
		this.R[3] = temp[7];
		this.R[0] = temp[8];
		this.U[8] = temp[9];
		this.U[7] = temp[10];
		this.U[6] = temp[11];

		temp = [
			this.F[0],
			this.F[1],
			this.F[2],
			this.F[5],
			this.F[8],
			this.F[7],
			this.F[6],
			this.F[3],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.F[0] = temp[0];
		this.F[1] = temp[1];
		this.F[2] = temp[2];
		this.F[5] = temp[3];
		this.F[8] = temp[4];
		this.F[7] = temp[5];
		this.F[6] = temp[6];
		this.F[3] = temp[7];
	}

	turn_u() {
		let temp = [];
		temp = [
			this.L[0],
			this.L[1],
			this.L[2],
			this.F[0],
			this.F[1],
			this.F[2],
			this.R[0],
			this.R[1],
			this.R[2],
			this.B[0],
			this.B[1],
			this.B[2],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.L[0] = temp[0];
		this.L[1] = temp[1];
		this.L[2] = temp[2];
		this.F[0] = temp[3];
		this.F[1] = temp[4];
		this.F[2] = temp[5];
		this.R[0] = temp[6];
		this.R[1] = temp[7];
		this.R[2] = temp[8];
		this.B[0] = temp[9];
		this.B[1] = temp[10];
		this.B[2] = temp[11];

		temp = [
			this.U[0],
			this.U[3],
			this.U[6],
			this.U[7],
			this.U[8],
			this.U[5],
			this.U[2],
			this.U[1],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.U[0] = temp[0];
		this.U[3] = temp[1];
		this.U[6] = temp[2];
		this.U[7] = temp[3];
		this.U[8] = temp[4];
		this.U[5] = temp[5];
		this.U[2] = temp[6];
		this.U[1] = temp[7];
	}

	turn_x() {
		let temp = [
			this.U[2],
			this.U[5],
			this.U[8],
			this.F[2],
			this.F[5],
			this.F[8],
			this.D[2],
			this.D[5],
			this.D[8],
			this.B[6],
			this.B[3],
			this.B[0],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.U[2] = temp[0];
		this.U[5] = temp[1];
		this.U[8] = temp[2];
		this.F[2] = temp[3];
		this.F[5] = temp[4];
		this.F[8] = temp[5];
		this.D[2] = temp[6];
		this.D[5] = temp[7];
		this.D[8] = temp[8];
		this.B[6] = temp[9];
		this.B[3] = temp[10];
		this.B[0] = temp[11];

		temp = [
			this.U[1],
			this.U[4],
			this.U[7],
			this.F[1],
			this.F[4],
			this.F[7],
			this.D[1],
			this.D[4],
			this.D[7],
			this.B[7],
			this.B[4],
			this.B[1],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.U[1] = temp[0];
		this.U[4] = temp[1];
		this.U[7] = temp[2];
		this.F[1] = temp[3];
		this.F[4] = temp[4];
		this.F[7] = temp[5];
		this.D[1] = temp[6];
		this.D[4] = temp[7];
		this.D[7] = temp[8];
		this.B[7] = temp[9];
		this.B[4] = temp[10];
		this.B[1] = temp[11];

		temp = [
			this.U[0],
			this.U[3],
			this.U[6],
			this.F[0],
			this.F[3],
			this.F[6],
			this.D[0],
			this.D[3],
			this.D[6],
			this.B[8],
			this.B[5],
			this.B[2],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.U[0] = temp[0];
		this.U[3] = temp[1];
		this.U[6] = temp[2];
		this.F[0] = temp[3];
		this.F[3] = temp[4];
		this.F[6] = temp[5];
		this.D[0] = temp[6];
		this.D[3] = temp[7];
		this.D[6] = temp[8];
		this.B[8] = temp[9];
		this.B[5] = temp[10];
		this.B[2] = temp[11];

		temp = [
			this.R[0],
			this.R[3],
			this.R[6],
			this.R[7],
			this.R[8],
			this.R[5],
			this.R[2],
			this.R[1],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.R[0] = temp[0];
		this.R[3] = temp[1];
		this.R[6] = temp[2];
		this.R[7] = temp[3];
		this.R[8] = temp[4];
		this.R[5] = temp[5];
		this.R[2] = temp[6];
		this.R[1] = temp[7];

		temp = [
			this.L[0],
			this.L[1],
			this.L[2],
			this.L[5],
			this.L[8],
			this.L[7],
			this.L[6],
			this.L[3],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.L[0] = temp[0];
		this.L[1] = temp[1];
		this.L[2] = temp[2];
		this.L[5] = temp[3];
		this.L[8] = temp[4];
		this.L[7] = temp[5];
		this.L[6] = temp[6];
		this.L[3] = temp[7];
	}

	turn_y() {
		let temp = [
			this.F[0],
			this.F[1],
			this.F[2],
			this.R[0],
			this.R[1],
			this.R[2],
			this.B[0],
			this.B[1],
			this.B[2],
			this.L[0],
			this.L[1],
			this.L[2],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.F[0] = temp[0];
		this.F[1] = temp[1];
		this.F[2] = temp[2];
		this.R[0] = temp[3];
		this.R[1] = temp[4];
		this.R[2] = temp[5];
		this.B[0] = temp[6];
		this.B[1] = temp[7];
		this.B[2] = temp[8];
		this.L[0] = temp[9];
		this.L[1] = temp[10];
		this.L[2] = temp[11];

		temp = [
			this.F[3],
			this.F[4],
			this.F[5],
			this.R[3],
			this.R[4],
			this.R[5],
			this.B[3],
			this.B[4],
			this.B[5],
			this.L[3],
			this.L[4],
			this.L[5],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.F[3] = temp[0];
		this.F[4] = temp[1];
		this.F[5] = temp[2];
		this.R[3] = temp[3];
		this.R[4] = temp[4];
		this.R[5] = temp[5];
		this.B[3] = temp[6];
		this.B[4] = temp[7];
		this.B[5] = temp[8];
		this.L[3] = temp[9];
		this.L[4] = temp[10];
		this.L[5] = temp[11];

		temp = [
			this.F[6],
			this.F[7],
			this.F[8],
			this.R[6],
			this.R[7],
			this.R[8],
			this.B[6],
			this.B[7],
			this.B[8],
			this.L[6],
			this.L[7],
			this.L[8],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.F[6] = temp[0];
		this.F[7] = temp[1];
		this.F[8] = temp[2];
		this.R[6] = temp[3];
		this.R[7] = temp[4];
		this.R[8] = temp[5];
		this.B[6] = temp[6];
		this.B[7] = temp[7];
		this.B[8] = temp[8];
		this.L[6] = temp[9];
		this.L[7] = temp[10];
		this.L[8] = temp[11];

		temp = [
			this.U[0],
			this.U[3],
			this.U[6],
			this.U[7],
			this.U[8],
			this.U[5],
			this.U[2],
			this.U[1],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.U[0] = temp[0];
		this.U[3] = temp[1];
		this.U[6] = temp[2];
		this.U[7] = temp[3];
		this.U[8] = temp[4];
		this.U[5] = temp[5];
		this.U[2] = temp[6];
		this.U[1] = temp[7];

		temp = [
			this.D[0],
			this.D[1],
			this.D[2],
			this.D[5],
			this.D[8],
			this.D[7],
			this.D[6],
			this.D[3],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.D[0] = temp[0];
		this.D[1] = temp[1];
		this.D[2] = temp[2];
		this.D[5] = temp[3];
		this.D[8] = temp[4];
		this.D[7] = temp[5];
		this.D[6] = temp[6];
		this.D[3] = temp[7];
	}

	turn_z() {
		let temp = [
			this.U[2],
			this.U[1],
			this.U[0],
			this.L[0],
			this.L[3],
			this.L[6],
			this.D[6],
			this.D[7],
			this.D[8],
			this.R[8],
			this.R[5],
			this.R[2],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.U[2] = temp[0];
		this.U[1] = temp[1];
		this.U[0] = temp[2];
		this.L[0] = temp[3];
		this.L[3] = temp[4];
		this.L[6] = temp[5];
		this.D[6] = temp[6];
		this.D[7] = temp[7];
		this.D[8] = temp[8];
		this.R[8] = temp[9];
		this.R[5] = temp[10];
		this.R[2] = temp[11];

		temp = [
			this.U[5],
			this.U[4],
			this.U[3],
			this.L[1],
			this.L[4],
			this.L[7],
			this.D[3],
			this.D[4],
			this.D[5],
			this.R[7],
			this.R[4],
			this.R[1],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.U[5] = temp[0];
		this.U[4] = temp[1];
		this.U[3] = temp[2];
		this.L[1] = temp[3];
		this.L[4] = temp[4];
		this.L[7] = temp[5];
		this.D[3] = temp[6];
		this.D[4] = temp[7];
		this.D[5] = temp[8];
		this.R[7] = temp[9];
		this.R[4] = temp[10];
		this.R[1] = temp[11];

		temp = [
			this.U[8],
			this.U[7],
			this.U[6],
			this.L[2],
			this.L[5],
			this.L[8],
			this.D[0],
			this.D[1],
			this.D[2],
			this.R[6],
			this.R[3],
			this.R[0],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.U[8] = temp[0];
		this.U[7] = temp[1];
		this.U[6] = temp[2];
		this.L[2] = temp[3];
		this.L[5] = temp[4];
		this.L[8] = temp[5];
		this.D[0] = temp[6];
		this.D[1] = temp[7];
		this.D[2] = temp[8];
		this.R[6] = temp[9];
		this.R[3] = temp[10];
		this.R[0] = temp[11];

		temp = [
			this.F[0],
			this.F[3],
			this.F[6],
			this.F[7],
			this.F[8],
			this.F[5],
			this.F[2],
			this.F[1],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.F[0] = temp[0];
		this.F[3] = temp[1];
		this.F[6] = temp[2];
		this.F[7] = temp[3];
		this.F[8] = temp[4];
		this.F[5] = temp[5];
		this.F[2] = temp[6];
		this.F[1] = temp[7];

		temp = [
			this.B[0],
			this.B[1],
			this.B[2],
			this.B[5],
			this.B[8],
			this.B[7],
			this.B[6],
			this.B[3],
		];
		temp = this.first_to_end(temp);
		temp = this.first_to_end(temp);
		this.B[0] = temp[0];
		this.B[1] = temp[1];
		this.B[2] = temp[2];
		this.B[5] = temp[3];
		this.B[8] = temp[4];
		this.B[7] = temp[5];
		this.B[6] = temp[6];
		this.B[3] = temp[7];
	}

	first_to_end(array) {
		let First = array[0];
		array.shift();
		array.push(First);
		return array;
	}

	get_colour() {
		let single_letter_colour = [
			this.U[0],
			this.U[3],
			this.U[1],
			this.U[6],
			this.U[4],
			this.U[2],
			this.F[0],
			this.U[7],
			this.U[5],
			this.R[2],
			this.F[3],
			this.F[1],
			this.U[8],
			this.R[1],
			this.R[5],
			this.F[6],
			this.F[4],
			this.F[2],
			this.R[0],
			this.R[4],
			this.R[8],
			this.F[7],
			this.F[5],
			this.R[3],
			this.R[7],
			this.F[8],
			this.R[6],
		];

		colour = [];
		for (let i = 0; i < single_letter_colour.length; i++) {
			let temp = single_letter_colour[i][0];

			switch (temp) {
				case "w": {
					colour.push("white");
					break;
				}
				case "g": {
					colour.push("green");
					break;
				}
				case "o": {
					colour.push("orange");
					break;
				}
				case "b": {
					colour.push("blue");
					break;
				}
				case "r": {
					colour.push("red");
					break;
				}
				case "y": {
					colour.push("yellow");
					break;
				}
				default: {
					if (dev) colour.push("");
					else
						throw new Error(`Invalid decoding at index ${i} and char ${temp}`);
				}
			}
		}
	}

	draw_full_cube() {
		CTX.clearRect(-WIDTH, -HEIGHT, WIDTH * 2, HEIGHT * 2);
		for (let i = 0; i < QUAD_COORD.x1.length; i++) {
			let quad = [
				QUAD_COORD.x1[i],
				QUAD_COORD.y1[i],
				QUAD_COORD.x2[i],
				QUAD_COORD.y2[i],
				QUAD_COORD.x3[i],
				QUAD_COORD.y3[i],
				QUAD_COORD.x4[i],
				QUAD_COORD.y4[i],
			];
			this.draw_quad(quad, colour[i]);
		}
	}

	draw_quad(sides, colour) {
		if (
			!(
				Number.isFinite(sides[0]) ||
				Number.isFinite(sides[1]) ||
				Number.isFinite(sides[2]) ||
				Number.isFinite(sides[3]) ||
				Number.isFinite(sides[4]) ||
				Number.isFinite(sides[5]) ||
				Number.isFinite(sides[6]) ||
				Number.isFinite(sides[7])
			)
		)
			return;
		CTX.fillStyle = colour;
		CTX.strokeStyle = "black";
		CTX.lineWidth = 2;

		CTX.beginPath();
		CTX.moveTo(sides[0], sides[1]);
		CTX.lineTo(sides[2], sides[3]);
		CTX.lineTo(sides[4], sides[5]);
		CTX.lineTo(sides[6], sides[7]);
		CTX.closePath();
		CTX.fill();
		CTX.stroke();
	}

	draw_cube() {
		this.get_colour();
		this.draw_full_cube();
	}
}

function submit() {
	let move_array = INPUT.value.split(" ").filter((move) => move !== "");
	const allowed_moves = /^[FBLRUDxyzMESfblrud]['2']?$/;

	for (let i = 0; i < move_array.length; i++) {
		if (!allowed_moves.test(move_array[i])) {
			throw new Error(
				`Invalid syntax at index ${i} with the move '${move_array[i]}'`,
			);
		}
	}

	FACES.move(move_array);
}

const C = document.getElementById("Rubik's Cube");
const INPUT = document.getElementById("input");
const MOVE = document.getElementsByClassName("move");
const SUBMIT_BUTTOM = document.getElementsByClassName("submit");
C.width = window.innerWidth * 0.5;
C.height = window.innerHeight * 0.8;
const CTX = C.getContext("2d");
const HEIGHT = C.height;
const WIDTH = C.width;
const CUBE_SIZE = (HEIGHT > WIDTH ? HEIGHT : WIDTH) * 0.45;

const COORD = new coord();
const QUAD_COORD = new quad_coord();
const FACES = new faces();

let dev = false;
let colour = [];

CTX.translate(WIDTH / 2, HEIGHT / 2 * 1.25);
CTX.fillStyle = "#fff";
CTX.strokeStyle = "#000";

QUAD_COORD.get_xy_1_to_4();
QUAD_COORD.get_quad();
FACES.reset_cube();

window.onerror = (message, source, lineno, colno, error) => {
	if (input) {
		input.value = `Runtime Error: ${message}\nLine: ${lineno}, Col: ${colno}\n${error ? error.stack : ""}`;
		input.readOnly = true;
		input.style.color = "#ff0000";
	}

	for (let i = 0; i < move.length; i++) move[i].disabled = true;
	SubmitBtn[0].disabled = true;

	return true;
};
