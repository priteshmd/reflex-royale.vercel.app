import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { socket } from "../socket";

interface Player {
  id: string;
  name: string;
  score: number;
}

function Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name;

  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!roomId) return;

    socket.on("players_update", (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers);
    });

    socket.on("round_start", () => {
      navigate(`/game/${roomId}`);
    });

    return () => {
      socket.off("players_update");
      socket.off("round_start");
    };
  }, [roomId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-10 text-white w-full max-w-md text-center shadow-2xl">
        
        <h2 className="text-3xl font-bold mb-4">Room Code</h2>
        <div className="text-4xl font-extrabold tracking-widest mb-6 text-yellow-300">
          {roomId}
        </div>

        <h3 className="text-xl mb-4">Players</h3>

        <div className="space-y-2">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-white/20 rounded-lg py-2 px-4"
            >
              {player.name}
            </div>
          ))}
        </div>

        {players.length < 2 && (
          <p className="mt-6 text-pink-200 animate-pulse">
            Waiting for another player...
          </p>
        )}
      </div>
    </div>
  );
}

export default Room;
