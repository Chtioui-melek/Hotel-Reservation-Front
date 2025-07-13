import React, { useEffect, useState } from "react";
import { getRoomById } from "../utils/ApiFunctions";
import { useParams, Link } from "react-router-dom";

const RoomDetails = () => {
  const { roomId } = useParams();

  const [room, setRoom] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
      } catch (error) {
        console.error("Error fetching room:", error);
        setErrorMessage("Failed to load room details.");
      }
    };

    fetchRoom();
  }, [roomId]);

  const getImageSource = () => {
    if (room.photo?.startsWith("http") || room.photo?.startsWith("data:image")) {
      return room.photo;
    }
    return `data:image/jpeg;base64,${room.photo}`;
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center mb-4">Room Details</h3>

      {errorMessage && (
        <div className="alert alert-danger text-center">{errorMessage}</div>
      )}

      {!errorMessage && (
        <div className="card mx-auto" style={{ maxWidth: "500px" }}>
          {room.photo && (
            <img
              src={getImageSource()}
              alt="Room"
              className="card-img-top"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          )}
          <div className="card-body">
            <h5 className="card-title">Room Type</h5>
            <p className="card-text">{room.roomType}</p>

            <h5 className="card-title">Room Price</h5>
            <p className="card-text">${room.roomPrice}</p>

            <Link to="/existing-rooms" className="btn btn-primary mt-3 w-100">
              Back to Room List
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
