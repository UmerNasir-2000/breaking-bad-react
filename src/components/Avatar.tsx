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
    <section>
      {characters.map((character) => (
        <article key={character.char_id}>
          <h3>{character.name}</h3>
          <img src={character.img} alt={character.name} />
          <p>{character.nickname}</p>
        </article>
      ))}
    </section>
  );

  return <>{characters && charactersList}</>;
};

export default Avatar;
