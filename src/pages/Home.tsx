import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

function Home() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!name) return alert("Enter your name first!");

    socket.connect();

    socket.emit("create_room", { name }, (response: any) => {
      if (response.roomId) {
        navigate(`/room/${response.roomId}`, { state: { name } });
      }
    });
  };

  const handleJoinRoom = () => {
    if (!name || !roomId) return alert("Enter name and room code!");

    socket.connect();

    socket.emit("join_room", { roomId, name }, (response: any) => {
      if (response.success) {
        navigate(`/room/${roomId}`, { state: { name } });
      } else {
        alert(response.error);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 p-6">
      <div className="bg-black/30 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">
        
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wider">
          🎮 Reflex Royale
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />

        <button
          onClick={handleCreateRoom}
          className="w-full py-3 mb-4 rounded-lg bg-green-500 hover:bg-green-600 transition-all duration-200 font-bold text-lg shadow-lg"
        >
          Create Room
        </button>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Room Code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <button
            onClick={handleJoinRoom}
            className="px-4 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-200 font-bold shadow-lg"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
