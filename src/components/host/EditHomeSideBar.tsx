import React from "react";
import { Link } from "react-router-dom";

function EditHomeSideBar() {
  return (
    <div>
      <ul>
        <Link to="selectType">
          <li>Type</li>
        </Link>
        <Link to="selectRoomType">
          <li>Room type</li>
        </Link>
        <Link to="selectLocation">
          <li>Location</li>
        </Link>
        <Link to="floorPlan">
          <li>Floor plan</li>
        </Link>
        <Link to="amenities">
          <li>Ameneties</li>
        </Link>
        <Link to="addPhotos">
          <li>Add photos</li>
        </Link>
        <Link to="addTitle">
          <li>Add title</li>
        </Link>
        <Link to="addDescription">
          <li>Add description</li>
        </Link>
        <Link to="bookType">
          <li>BookType</li>
        </Link>
        <Link to="addPrice">
          <li>Add price</li>
        </Link>
      </ul>
    </div>
  );
}

export default EditHomeSideBar;
