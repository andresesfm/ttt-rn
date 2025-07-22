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
      <TouchableOpacity style={styles.cell} onPress={() => handlePress(index)}>
        <Text style={styles.cellText}>{board[index]}</Text>
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
      } else {
        move = findRandomMove(board);
      }

      if (move !== null) {
        handlePress(move);
      }
    }
  }, [player, board, winner, handlePress, strategy]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.strategyContainer}>
        <TouchableOpacity style={[styles.strategyButton, strategy === "random" && styles.activeStrategy]} onPress={() => setStrategy("random")}>
          <Text style={styles.strategyButtonText}>Random</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.strategyButton, strategy === "winning" && styles.activeStrategy]} onPress={() => setStrategy("winning")}>
          <Text style={styles.strategyButtonText}>Winning</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.board}>{Array.from({ length: 9 }).map((_, index) => renderCell(index))}</View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 3,
    borderColor: "#333",
  },
  cell: {
    width: "33.333%",
    height: "33.333%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  cellText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resetButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  strategyContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  strategyButton: {
    backgroundColor: "#DDD",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  activeStrategy: {
    backgroundColor: "#333",
  },
  strategyButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TicTacToe;
