import { pipe } from "rxjs";
import { Color, Coords, FENChar, SafeSquares } from "./models";
import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { Piece } from "./pieces/piece";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";
import { ParseError } from "@angular/compiler";
import { tick } from "@angular/core/testing";

export class ChessBoard {

    private chessBoard: (Piece | null) [][];
    private readonly chessBoardSize: number = 8;
    private _playerColor = Color.White;
    private _safeSquares: SafeSquares;

    constructor() {
        this.chessBoard = [
            [
                new Rook(Color.White), new Knight(Color.White), new Bishop(Color.White), new Queen(Color.White),
                new King(Color.White), new Bishop(Color.White), new Knight(Color.White), new Rook(Color.White)
            ],
            [
                new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White),
                new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White)
            ],
            [ null, null, null, null, null, null, null, null ],
            [ null, null, null, null, null, null, null, null ],
            [ null, null, null, null, null, null, null, null ],
            [ null, null, null, null, null, null, null, null ],
            [
                new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black),
                new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black)
            ],
            [
                new Rook(Color.Black), new Knight(Color.Black), new Bishop(Color.Black), new Queen(Color.Black),
                new King(Color.Black), new Bishop(Color.Black), new Knight(Color.Black), new Rook(Color.Black)
            ]
        ];
        this._safeSquares =this.findSafeSquare();        
    }

    public get playerColor(): Color {
        return this._playerColor;
    }

    public get chessBoardView(): (FENChar | null)[][] {
        return this.chessBoard.map(row => {
            return row.map(piece => piece instanceof Piece ? piece.FENChar : null);
        })
    }

    public get safeSquares(): SafeSquares {
        return this._safeSquares;
    }

    public static isSquareDark(x: number, y: number): boolean {
        return x % 2 === 0 && y % 2 === 0 || x % 2 === 1 && y % 2 === 1;
    }

    private areCoordsValid(x: number, y: number): boolean {
        return x >= 0 && y >= 0 && x < this.chessBoardSize && y < this.chessBoardSize;
    }

    public isInCheck(playerColor: Color): boolean {
        for(let x = 0; x < this.chessBoardSize; x++) {
            for(let y = 0; y < this.chessBoardSize; y++) {
                const piece: Piece | null = this.chessBoard[x][y];
                if(!piece || piece.color === playerColor) {
                    continue;
                }
                for(const { x: dx, y: dy } of piece.directions) {
                    let newX: number = x + dx;
                    let newY: number = y + dy;

                    if(!this.areCoordsValid(newX, newY)) {
                        continue;
                    }

                    if(piece instanceof Pawn || piece instanceof Knight || piece instanceof King) {

                        //pawns are only attacking diagonally
                        if(piece instanceof Pawn && dy === 0) {
                            continue;
                        }

                        const attackedPiece: Piece | null = this.chessBoard[newX][newY];
                        if(attackedPiece instanceof King && attackedPiece.color === playerColor) {
                            return false;
                        }
                    }
                    else {
                        while(this.areCoordsValid(newX, newY)) {
                            const attackedPiece: Piece | null = this.chessBoard[newX][newY];
                            if(attackedPiece instanceof King && attackedPiece.color === playerColor) {
                                return false;
                            }

                            if(attackedPiece !== null) {
                                break;
                            }

                            newX += dx;
                            newY += dy;
                        }
                    }
                }
            }
        }
        return false;
    }

    private isPositionSafeAfterMove(piece: Piece, prevX: number, prevY: number, newX: number, newY: number): boolean {
        const newPiece: Piece | null = this.chessBoard[newX][newY];

        //we cant put piece on a square that already conatins piece of the same color
        if(newPiece && newPiece.color === piece.color) {
            return false;
        }

        //simulate new position
        this.chessBoard[prevX][prevY] = null;
        this.chessBoard[newX][newY] = piece;

        const isPositionSafe: boolean = !this.isInCheck(piece.color);

        //restore position back
        this.chessBoard[prevX][prevY] = piece;
        this.chessBoard[newX][newY] = newPiece;

        return isPositionSafe;
    }

    private findSafeSquare(): SafeSquares {
        const safeSquares: SafeSquares = new Map<string, Coords[]>();
        
        for(let x = 0; x < this.chessBoardSize; x++) {
            for(let y = 0; y < this.chessBoardSize; y++) {
                const piece: Piece | null = this.chessBoard[x][y];

                if(!piece || piece.color !== this._playerColor) {
                    continue;
                }

                const pieceSafeSquares: Coords[] =[];

                for(const {x: dx, y: dy} of piece.directions) {
                    let newX: number = x + dx;
                    let newY: number = y + dy;

                    if(!this.areCoordsValid(newX, newY)) {
                        continue;
                    }

                    let newPiece: Piece | null =  this.chessBoard[newX][newY];
                    if(newPiece && newPiece.color === piece.color) {
                        continue;
                    }

                    //need to restrict pawn moves in certain directions
                    if(piece instanceof Pawn) {
                        //cant move pawn two squares straight if there is piece infront of him
                        if(dx === 2 || dx === -2) {
                            if(newPiece) continue;
                            if(this.chessBoard[newX + (dx === 2 ? -1 : 1)][newY]) continue;
                        }

                        //cant move pawn one square straight if piece is infront of him
                        if((dx === 1 || dx === -1) && dy===0 && newPiece) continue;

                        //cant move pawn diagonally if there is no piece or piece has same color as pawn
                        if((dy === 1 || dy === -1) && (!newPiece || newPiece.color)) continue;
                    }

                    if(piece instanceof Pawn || piece instanceof Knight || piece instanceof King) {
                        if(this.isPositionSafeAfterMove(piece, x, y, newX, newY)) {
                            pieceSafeSquares.push({x: newX, y: newY});
                        }
                    }
                    else {
                        while(this.areCoordsValid(newX, newY)) {
                            newPiece = this.chessBoard[newX][newY];

                            if(newPiece && newPiece.color === piece.color) {
                                break;
                            }

                            if(this.isPositionSafeAfterMove(piece, x, y, newX, newY)) {
                                pieceSafeSquares.push({x: newX, y: newY});
                            }

                            if(newPiece !== null) break;

                            newX += dx;
                            newY += dy;
                        }
                    }
                }

                if(pieceSafeSquares.length) {
                    safeSquares.set(x + "," + y, pieceSafeSquares);
                }
            }
        }

        return safeSquares;
    }
}