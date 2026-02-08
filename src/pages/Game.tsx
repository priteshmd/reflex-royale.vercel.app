import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";

interface Player {
  id: string;
  name: string;
  score: number;
}

function Game() {
  const { roomId } = useParams();

  const [countdown, setCountdown] = useState<number | null>(null);
  const [isGreen, setIsGreen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    socket.on("countdown", (num: number) => {
      setCountdown(num);
      setIsGreen(false);
      setWinner(null);
    });

    socket.on("go_green", () => {
      setCountdown(null);
      setIsGreen(true);
    });

    socket.on("round_winner", ({ winnerId, players }) => {
      setIsGreen(false);
      setWinner(winnerId);
      setPlayers(players);
    });

    socket.on("false_start", ({ players }) => {
      setPlayers(players);
    });

    socket.on("game_over", (finalPlayers: Player[]) => {
      alert("Game Over!");
      setPlayers(finalPlayers);
    });

    return () => {
      socket.off("countdown");
      socket.off("go_green");
      socket.off("round_winner");
      socket.off("false_start");
      socket.off("game_over");
    };
  }, []);

  const handleClick = () => {
    socket.emit("player_click", { roomId });
  };

  return (
    <div
      onClick={handleClick}
      className={`min-h-screen flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
        isGreen ? "bg-green-500" : "bg-red-600"
      }`}
    >
      {countdown && (
        <h1 className="text-white text-8xl font-extrabold">
          {countdown}
        </h1>
      )}

      {!countdown && !isGreen && (
        <h1 className="text-white text-4xl font-bold">
          Wait for GREEN...
        </h1>
      )}

      {isGreen && (
        <h1 className="text-white text-6xl font-extrabold animate-pulse">
          CLICK!!!
        </h1>
      )}

      <div className="absolute top-5 text-white text-lg">
        {players.map((player) => (
          <div key={player.id}>
            {player.name}: {player.score}
          </div>
        ))}
      </div>

      {winner && (
        <div className="absolute bottom-10 text-white text-3xl font-bold">
          Round Winner!
        </div>
      )}
    </div>
  );
}

export default Game;
