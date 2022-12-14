import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const LeftSideNav = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://edutech-server-ebon.vercel.app/courses-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  });
  return (
    <div className="sticky-top">
      <h4>Course Category : {categories.length}</h4>
      {categories.map((category) => (
        <p key={category.id}>
          <div className="shadow p-3 mb-4 bg-body rounded">
            <h5>
              {" "}
              <Link
                className="text-decoration-none"
                to={`/category/${category.id}`}
              >
                {category.name}
              </Link>
            </h5>
          </div>
        </p>
      ))}
    </div>
  );
};

export default LeftSideNav;
