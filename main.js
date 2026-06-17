class coord {
  constructor() {
    this.x = [];
    this.y = [];
  }
}

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

  GetXY1To4() {
    this.AddToXYCoord(0, -1 / 2);
    this.AddToXYCoord(-1 / 6, -5 / 12);
    this.AddToXYCoord(1 / 6, -5 / 12);
    this.AddToXYCoord(-1 / 3, -1 / 3);
    this.AddToXYCoord(0, -1 / 3);
    this.AddToXYCoord(1 / 3, -1 / 3);
    this.AddToXYCoord(-1 / 2, -1 / 4);
    this.AddToXYCoord(-1 / 6, -1 / 4);
    this.AddToXYCoord(1 / 6, -1 / 4);
    this.AddToXYCoord(1 / 2, -1 / 4);
    this.AddToXYCoord(-1 / 2, -1 / 6);
    this.AddToXYCoord(-1 / 3, -1 / 6);
    this.AddToXYCoord(0, -1 / 6);
    this.AddToXYCoord(1 / 3, -1 / 6);
    this.AddToXYCoord(1 / 2, -1 / 6);
    this.AddToXYCoord(-1 / 2, -1 / 12);
    this.AddToXYCoord(-1 / 3, -1 / 12);
    this.AddToXYCoord(-1 / 6, -1 / 12);
    this.AddToXYCoord(1 / 6, -1 / 12);
    this.AddToXYCoord(1 / 3, -1 / 12);
    this.AddToXYCoord(1 / 2, -1 / 12);
    this.AddToXYCoord(-1 / 2, 0);
    this.AddToXYCoord(-1 / 3, 0);
    this.AddToXYCoord(-1 / 6, 0);
    this.AddToXYCoord(0, 0);
    this.AddToXYCoord(1 / 6, 0);
    this.AddToXYCoord(1 / 3, 0);
    this.AddToXYCoord(1 / 2, 0);
    this.AddToXYCoord(-1 / 3, 1 / 12);
    this.AddToXYCoord(-1 / 6, 1 / 12);
    this.AddToXYCoord(0, 1 / 12);
    this.AddToXYCoord(1 / 6, 1 / 12);
    this.AddToXYCoord(1 / 3, 1 / 12);
    this.AddToXYCoord(-1 / 6, 1 / 6);
    this.AddToXYCoord(0, 1 / 6);
    this.AddToXYCoord(1 / 6, 1 / 6);
    this.AddToXYCoord(0, 1 / 4);
  }

  AddToXYCoord(x, y) {
    if (!(Number.isFinite(x) && Number.isFinite(y))) return;
    Coord.x.push(x);
    Coord.y.push(y);
  }

  GetQuad() {
    this.SaveQuad(0, 2, 4, 1);
    this.SaveQuad(1, 4, 7, 3);
    this.SaveQuad(2, 5, 8, 4);
    this.SaveQuad(3, 7, 11, 6);
    this.SaveQuad(4, 8, 12, 7);
    this.SaveQuad(5, 9, 13, 8);
    this.SaveQuad(6, 11, 16, 10);
    this.SaveQuad(7, 12, 17, 11);
    this.SaveQuad(8, 13, 18, 12);
    this.SaveQuad(9, 14, 19, 13);
    this.SaveQuad(10, 16, 22, 15);
    this.SaveQuad(11, 17, 23, 16);
    this.SaveQuad(12, 18, 24, 17);
    this.SaveQuad(13, 19, 25, 18);
    this.SaveQuad(14, 20, 26, 19);
    this.SaveQuad(15, 22, 28, 21);
    this.SaveQuad(16, 23, 29, 22);
    this.SaveQuad(17, 24, 30, 23);
    this.SaveQuad(18, 25, 30, 24);
    this.SaveQuad(19, 26, 31, 25);
    this.SaveQuad(20, 27, 32, 26);
    this.SaveQuad(22, 29, 33, 28);
    this.SaveQuad(23, 30, 34, 29);
    this.SaveQuad(25, 31, 34, 30);
    this.SaveQuad(26, 32, 35, 31);
    this.SaveQuad(29, 34, 36, 33);
    this.SaveQuad(31, 35, 36, 34);
  }

  SaveQuad(i1, i2, i3, i4) {
    if (
      !(
        Number.isFinite(i1) &&
        Number.isFinite(i2) &&
        Number.isFinite(i3) &&
        Number.isFinite(i4)
      )
    )
      return;
    this.x1.push(Coord.x[i1] * CubeSize);
    this.y1.push(Coord.y[i1] * CubeSize);
    this.x2.push(Coord.x[i2] * CubeSize);
    this.y2.push(Coord.y[i2] * CubeSize);
    this.x3.push(Coord.x[i3] * CubeSize);
    this.y3.push(Coord.y[i3] * CubeSize);
    this.x4.push(Coord.x[i4] * CubeSize);
    this.y4.push(Coord.y[i4] * CubeSize);
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

  ResetCube() {
    this.U = Array(9).fill("w");
    this.F = Array(9).fill("g");
    this.L = Array(9).fill("o");
    this.B = Array(9).fill("b");
    this.R = Array(9).fill("r");
    this.D = Array(9).fill("y");
    this.DrawCube();
  }

  Move(moves) {
    for (let i = 0; i < moves.length; i++) this.Turn(moves[i], i);
  }

  Turn(move, IdForError = -1) {
    if (move.includes("'")) {
      this.Turn(move[0], IdForError);
      this.Turn(move[0], IdForError);
      this.Turn(move[0], IdForError);
      this.DrawCube();
      return;
    } else if (move.includes("2")) {
      this.Turn(move[0], IdForError);
      this.Turn(move[0], IdForError);
      this.DrawCube();
      return;
    }

    switch (move) {
      case "F": {
        this.TurnF();
        break;
      }
      case "U": {
        this.TurnU();
        break;
      }
      case "x": {
        this.TurnX();
        break;
      }
      case "y": {
        this.TurnY();
        break;
      }
      case "z": {
        this.TurnZ();
        break;
      }
      case "R": {
        this.TurnY();
        this.TurnF();
        this.TurnY();
        this.TurnY();
        this.TurnY();
        break;
      }
      case "L": {
        this.TurnY();
        this.TurnY();
        this.TurnY();
        this.TurnF();
        this.TurnY();
        break;
      }
      case "B": {
        this.TurnX();
        this.TurnX();
        this.TurnF();
        this.TurnX();
        this.TurnX();
        break;
      }
      case "D": {
        this.TurnX();
        this.TurnF();
        this.TurnX();
        this.TurnX();
        this.TurnX();
        break;
      }
      case "M": {
        this.TurnX();
        this.TurnX();
        this.TurnX();
        this.TurnY();
        this.TurnF();
        this.TurnY();
        this.TurnY();
        this.TurnF();
        this.TurnF();
        this.TurnF();
        this.TurnY();
        break;
      }
      case "E": {
        this.TurnY();
        this.TurnU();
        this.TurnU();
        this.TurnU();
        this.TurnX();
        this.TurnF();
        this.TurnX();
        this.TurnX();
        this.TurnX();
        break;
      }
      case "S": {
        this.TurnZ();
        this.TurnZ();
        this.TurnZ();
        this.TurnF();
        this.TurnX();
        this.TurnX();
        this.TurnX();
        this.TurnU();
        this.TurnU();
        this.TurnU();
        this.TurnX();
        break;
      }
      case "f": {
        this.TurnZ();
        this.TurnX();
        this.TurnX();
        this.TurnX();
        this.TurnU();
        this.TurnU();
        this.TurnU();
        this.TurnX();
        break;
      }
      case "u": {
        this.TurnF();
        this.TurnF();
        this.TurnF();
        this.TurnY();
        break;
      }
      case "d": {
        this.TurnY();
        this.TurnY();
        this.TurnY();
        this.TurnU();
        this.TurnU();
        this.TurnU();
        break;
      }
      case "b": {
        this.TurnZ();
        this.TurnZ();
        this.TurnZ();
        this.TurnF();
        this.TurnF();
        this.TurnF();
        break;
      }
      case "r": {
        this.TurnX();
        this.TurnY();
        this.TurnY();
        this.TurnY();
        this.TurnF();
        this.TurnF();
        this.TurnF();
        this.TurnY();
        break;
      }
      case "l": {
        this.TurnX();
        this.TurnX();
        this.TurnX();
        this.TurnY();
        this.TurnF();
        this.TurnF();
        this.TurnF();
        this.TurnY();
        this.TurnY();
        this.TurnY();
        break;
      }
      default: {
        throw new Error(
          `Move '${move} at index ${IdForError} not a valid move`,
        );
        break;
      }
    }
  }

  TurnF() {
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    this.F[0] = temp[0];
    this.F[1] = temp[1];
    this.F[2] = temp[2];
    this.F[5] = temp[3];
    this.F[8] = temp[4];
    this.F[7] = temp[5];
    this.F[6] = temp[6];
    this.F[3] = temp[7];
  }

  TurnU() {
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    this.U[0] = temp[0];
    this.U[3] = temp[1];
    this.U[6] = temp[2];
    this.U[7] = temp[3];
    this.U[8] = temp[4];
    this.U[5] = temp[5];
    this.U[2] = temp[6];
    this.U[1] = temp[7];
  }

  TurnX() {
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    this.L[0] = temp[0];
    this.L[1] = temp[1];
    this.L[2] = temp[2];
    this.L[5] = temp[3];
    this.L[8] = temp[4];
    this.L[7] = temp[5];
    this.L[6] = temp[6];
    this.L[3] = temp[7];
  }

  TurnY() {
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    this.D[0] = temp[0];
    this.D[1] = temp[1];
    this.D[2] = temp[2];
    this.D[5] = temp[3];
    this.D[8] = temp[4];
    this.D[7] = temp[5];
    this.D[6] = temp[6];
    this.D[3] = temp[7];
  }

  TurnZ() {
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
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
    temp = this.FirstToEnd(temp);
    temp = this.FirstToEnd(temp);
    this.B[0] = temp[0];
    this.B[1] = temp[1];
    this.B[2] = temp[2];
    this.B[5] = temp[3];
    this.B[8] = temp[4];
    this.B[7] = temp[5];
    this.B[6] = temp[6];
    this.B[3] = temp[7];
  }

  FirstToEnd(array) {
    let First = array[0];
    array.shift();
    array.push(First);
    return array;
  }

  GetColour() {
    let SingleLetterColour = [
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
    for (let i = 0; i < SingleLetterColour.length; i++) {
      let temp = SingleLetterColour[i][0];

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

  DrawFullCube() {
    ctx.clearRect(-width, -height, width * 2, height * 2);
    for (let i = 0; i < QuadCoord.x1.length; i++) {
      let Quad = [
        QuadCoord.x1[i],
        QuadCoord.y1[i],
        QuadCoord.x2[i],
        QuadCoord.y2[i],
        QuadCoord.x3[i],
        QuadCoord.y3[i],
        QuadCoord.x4[i],
        QuadCoord.y4[i],
      ];
      this.DrawQuad(Quad, colour[i]);
    }
  }

  DrawQuad(Sides, Colour) {
    if (
      !(
        Number.isFinite(Sides[0]) ||
        Number.isFinite(Sides[1]) ||
        Number.isFinite(Sides[2]) ||
        Number.isFinite(Sides[3]) ||
        Number.isFinite(Sides[4]) ||
        Number.isFinite(Sides[5]) ||
        Number.isFinite(Sides[6]) ||
        Number.isFinite(Sides[7])
      )
    )
      return;
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

  DrawCube() {
    this.GetColour();
    this.DrawFullCube();
  }
}

function Submit() {
  let MoveArray = Input.value.split(" ").filter((move) => move !== "");
  const AllowMoves = /^[FBLRUDxyzMESfblrud]['2']?$/;

  for (let i = 0; i < MoveArray.length; i++) {
    if (!AllowMoves.test(MoveArray[i])) {
      throw new Error(
        `Invalid syntax at index ${i} with the move '${MoveArray[i]}'`,
      );
    }
  }

  Faces.Move(MoveArray);
}

const c = document.getElementById("Rubik's Cube");
const Input = document.getElementById("Input");
const Move = document.getElementsByClassName("Move");
const SubmitBtn = document.getElementsByClassName("Submit");
c.width = window.innerWidth * 0.5;
c.height = window.innerHeight * 0.8;
const ctx = c.getContext("2d");
const height = c.height;
const width = c.width;
const CubeSize = (height > width ? height : width) * 0.45;

const Coord = new coord();
const QuadCoord = new quadCoord();
const Faces = new faces();

let dev = false;
let colour = [];

ctx.translate(width / 2, (height / 2) * 1.25);
ctx.fillStyle = "#fff";
ctx.strokeStyle = "#000";

QuadCoord.GetXY1To4();
QuadCoord.GetQuad();
Faces.ResetCube();

window.onerror = (message, source, lineno, colno, error) => {
  if (Input) {
    Input.value = `Runtime Error: ${message}\nLine: ${lineno}, Col: ${colno}\n${error ? error.stack : ""}`;
    Input.readOnly = true;
    Input.style.color = "#ff0000";
  }

  for (let i = 0; i < Move.length; i++) Move[i].disabled = true;
  SubmitBtn[0].disabled = true;

  return true;
};
