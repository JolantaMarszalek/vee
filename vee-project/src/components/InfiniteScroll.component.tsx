import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  InfiniteBreedSection,
  InfiniteImage,
  InfiniteSection,
  InfiniteSingleBreed,
} from "./InfiniteScroll.styled";

type DogData = {
  id: string;
  breed?: string;
  img?: string;
};

export const InfiniteScroll = () => {
  const [data, setData] = useState<DogData[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     fetchData();
  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  const fetchData = useCallback(async () => {
    try {
      const breedListResponse = await fetch(
        "https://dog.ceo/api/breeds/list/all"
      );
      const breedListResult = await breedListResponse.json();

      const breedNames = Object.keys(breedListResult.message);

      const randomBreedIndex = Math.floor(Math.random() * breedNames.length);
      const randomBreed = breedNames[randomBreedIndex];

      const randomBreedImagesResponse = await fetch(
        `https://dog.ceo/api/breed/${randomBreed}/images`
      );
      const randomBreedImagesResult = await randomBreedImagesResponse.json();

      const randomBreedImageIndex = Math.floor(
        Math.random() * randomBreedImagesResult.message.length
      );
      const randomBreedImage =
        randomBreedImagesResult.message[randomBreedImageIndex];

      const newData = [
        {
          id: uuidv4(),
          breed: randomBreed,
          img: randomBreedImage,
        },
      ];

      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      setPage((prevPage) => prevPage + 1);
      fetchData();
    }
  }, [isLoading, setPage, fetchData]);

  useEffect(() => {
    const fetchDataAndHandleScroll = async () => {
      await fetchData();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);

    fetchDataAndHandleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData, handleScroll, page]);

  const renderList = () => {
    return data.map((item) => (
      <InfiniteSection key={item.id}>
        <InfiniteImage>
          <img src={item.img} alt="No image" style={{ maxWidth: "100%" }} />
        </InfiniteImage>
        <InfiniteBreedSection>
          Breed: <InfiniteSingleBreed>{item.breed}</InfiniteSingleBreed>
        </InfiniteBreedSection>
      </InfiniteSection>
    ));
  };

  return <div>{renderList()}</div>;
};
