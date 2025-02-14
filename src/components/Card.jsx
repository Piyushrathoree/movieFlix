import React from "react";

const Card = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <>
      {/* <div className="w-68 h-56 rounded-2xl  bg-[#0f0d23]  p-5 flex flex-col justify-start items-center ">
        <div className="w-56 h-36 rounded-2xl ">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            className="w-56 "
            alt={movie.title}
          />
          <h3 className="text-white">{movie.title}</h3>
        </div>
      </div> */}
      <div className="movie-card">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt={title}
        />
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="/Rating.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : 'N/A'}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
