import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCharacters } from "../features/characters/characters.slice";

const Avatar = () => {
  const characters = useAppSelector((state) => state.characters.characters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCharactersThunk = async () => {
      await dispatch(fetchCharacters());
    };

    fetchCharactersThunk();
  }, [dispatch]);

  const charactersList = (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        border: "1px solid red",
        justifyContent: "center",
      }}
    >
      {characters.map((character) => (
        <article
          style={{
            width: "150px",
            height: "180px",
            margin: "10px",
            border: "1px solid black",
            padding: "5px",
            borderRadius: "5px",
          }}
          className="center"
          key={character.char_id}
        >
          <h3 style={{ marginBottom: "10px" }}>{character.name}</h3>
          <img
            src={character.img}
            alt={character.name}
            width={140}
            height={120}
            style={{ objectFit: "fill" }}
          />
          <p style={{ marginTop: "10px", fontStyle: "italic" }}>
            {character.nickname}
          </p>
        </article>
      ))}
    </section>
  );

  return <>{characters && charactersList}</>;
};

export default Avatar;
