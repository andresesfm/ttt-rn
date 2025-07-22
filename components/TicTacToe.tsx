import { colors, spacing, styles } from "@/styles/styles";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Player = "X" | "O" | null;

type Winner = Player | "draw" | null;

const calculateWinner = (squares: Player[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const findWinningMove = (currentBoard: Player[], forPlayer: Player) => {
  for (let i = 0; i < 9; i++) {
    if (currentBoard[i] === null) {
      const tempBoard = [...currentBoard];
      tempBoard[i] = forPlayer;
      if (calculateWinner(tempBoard) === forPlayer) {
        return i;
      }
    }
  }
  return null;
};

const findRandomMove = (currentBoard: Player[]) => {
  const emptyCells = currentBoard.map((cell, index) => (cell === null ? index : null)).filter((val) => val !== null);
  if (emptyCells.length > 0) {
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }
  return null;
};

/** https://www.neverstopbuilding.com/blog/minimax */
const minimax = (newBoard: Player[], player: Player): number => {
  const availSpots = newBoard.map((cell, index) => (cell === null ? index : null)).filter((s) => s !== null);

  if (calculateWinner(newBoard) === "X") {
    return -10;
  } else if (calculateWinner(newBoard) === "O") {
    return 10;
  } else if (availSpots.length === 0) {
    return 0;
  }

  const moves: { index: number; score: number }[] = [];
  for (let i = 0; i < availSpots.length; i++) {
    const move: { index: number; score: number } = { index: 0, score: 0 };
    move.index = availSpots[i]!;
    newBoard[availSpots[i]!] = player;

    if (player === "O") {
      const result = minimax(newBoard, "X");
      move.score = result;
    } else {
      const result = minimax(newBoard, "O");
      move.score = result;
    }

    newBoard[availSpots[i]!] = null;
    moves.push(move);
  }

  let bestMove = 0;
  if (player === "O") {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove].score;
};

const findBestMove = (currentBoard: Player[]) => {
  let bestVal = -1000;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (currentBoard[i] === null) {
      const tempBoard = [...currentBoard];
      tempBoard[i] = "O";
      const moveVal = minimax(tempBoard, "X");
      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }
  return bestMove;
};

const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [player, setPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Winner>(null);
  const [strategy, setStrategy] = useState("random");

  const handlePress = useCallback(
    (index: number) => {
      if (board[index] || winner) {
        return;
      }

      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);

      const newWinner = calculateWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      } else if (newBoard.every((cell) => cell !== null)) {
        setWinner("draw");
      } else {
        setPlayer(player === "X" ? "O" : "X");
      }
    },
    [board, player, winner]
  );

  const renderCell = (index: number) => {
    return (
      <TouchableOpacity key={index} style={componentStyles.cell} onPress={() => handlePress(index)}>
        <Text style={[componentStyles.cellText, board[index] === "X" ? styles.player1 : styles.player2]}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
  };

  useEffect(() => {
    if (winner) {
      Alert.alert("Game Over", winner === "draw" ? "It's a draw!" : `Player ${winner} wins!`, [{ text: "Play Again", onPress: resetGame }]);
    }
  }, [winner]);

  useEffect(() => {
    if (player === "O" && !winner) {
      let move;
      if (strategy === "winning") {
        move = findWinningMove(board, "O") ?? findWinningMove(board, "X") ?? findRandomMove(board);
      } else if (strategy === "minimax") {
        move = findBestMove(board);
      } else {
        move = findRandomMove(board);
      }

      if (move !== null) {
        handlePress(move);
      }
    }
  }, [player, board, winner, handlePress, strategy]);

  return (
    <View style={[styles.container, styles.itemsCenter, styles.justifyCenter]}>
      <Text style={[styles.h1, { color: colors.textPrimary }]}>Tic Tac Toe</Text>
      <View style={[styles.flex, styles.flexRow, styles.mbMd]}>
        <TouchableOpacity style={[styles.btn, styles.btnSecondary, strategy === "random" && styles.btnPrimary]} onPress={() => setStrategy("random")}>
          <Text style={[styles.btnText, strategy === "random" && { color: colors.textPrimary }]}>Random</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary, strategy === "winning" && styles.btnPrimary, { marginHorizontal: spacing.sm }]}
          onPress={() => setStrategy("winning")}
        >
          <Text style={[styles.btnText, strategy === "winning" && { color: colors.textPrimary }]}>Winning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnSecondary, strategy === "minimax" && styles.btnPrimary]} onPress={() => setStrategy("minimax")}>
          <Text style={[styles.btnText, strategy === "minimax" && { color: colors.textPrimary }]}>Minimax</Text>
        </TouchableOpacity>
      </View>
      <View style={componentStyles.board}>{Array.from({ length: 9 }).map((_, index) => renderCell(index))}</View>
      <TouchableOpacity style={[styles.btn, styles.btnPrimary, styles.mtMd]} onPress={resetGame}>
        <Text style={styles.btnText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const componentStyles = StyleSheet.create({
  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 3,
    borderColor: colors.textPrimary,
  },
  cell: {
    width: "33.333%",
    height: "33.333%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.textPrimary,
  },
  cellText: {
    fontSize: 48,
    fontWeight: "bold",
  },
});

export default TicTacToe;
