import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type DogData = {
  id: string;
  title?: string;
  breed?: string;
  //   subBreed?: string;
  img?: string;
  description?: string;
};

export const InfiniteScroll = () => {
  const [data, setData] = useState<DogData[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchData = async () => {
    try {
      const breedListResponse = await fetch(
        "https://dog.ceo/api/breeds/list/all"
      );
      const breedListResult = await breedListResponse.json();

      const breedNames = Object.keys(breedListResult.message);

      const randomBreedIndex = Math.floor(Math.random() * breedNames.length);
      const randomBreed = breedNames[randomBreedIndex];

      //   const subBreedListResponse = await fetch(
      //     `https://dog.ceo/api/breed/${randomBreed}/list`
      //   );
      //   const subBreedListResult = await subBreedListResponse.json();

      //   const randomSubBreedIndex = Math.floor(
      //     Math.random() * subBreedListResult.message.length
      //   );
      //   const randomSubBreed = subBreedListResult.message[randomSubBreedIndex];

      const randomBreedImagesResponse = await fetch(
        `https://dog.ceo/api/breed/${randomBreed}/images`
      );
      const randomBreedImagesResult = await randomBreedImagesResponse.json();

      const randomBreedImageIndex = Math.floor(
        Math.random() * randomBreedImagesResult.message.length
      );
      const randomBreedImage =
        randomBreedImagesResult.message[randomBreedImageIndex];

      //   const response = await fetch(
      //     "https://dog.ceo/api/breeds/image/random/10"
      //   );

      //   const result = await response.json();

      //   const newData = result.message.map((url: string, index: number) => ({
      //     id: index + 1 + (page - 1) * 10,
      //     img: url,
      //     description: `Dog ${index + 1 + (page - 1) * 10}`,
      //   }));

      const newData = [
        {
          id: uuidv4(),
          //   id: (page - 1) * 10 + 1,
          breed: randomBreed,
          //   subBreed: randomSubBreed,
          img: randomBreedImage,
          description: `Breed: ${randomBreed}`,
          //   Sub-breed: ${randomSubBreed || "-"}`,
        },
      ];

      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      setPage((prevPage) => prevPage + 1);
      fetchData();
    }
  };

  //     const newData = generateRandomData();
  //     setData((prevData) => [...prevData, ...newData]);
  //   };

  //   const generateRandomData = () => {
  //     const newData = Array.from({ length: 10 }, (_, index) => ({
  //       id: index + 1 + (page - 1) * 10,
  //       title: `Item ${index + 1 + (page - 1) * 10}`,
  //     }));
  //     return newData;
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, [fetchData]);

  //   const handleLoadMore = () => {
  //     setPage((prevPage) => prevPage + 1);
  //     fetchData();
  //   };

  const renderList = () => {
    return data.map((item) => (
      <div
        key={item.id}
        style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
        {/* {item.title} */}{" "}
        <img
          src={item.img}
          //   alt={item.description}
          style={{ maxWidth: "100%" }}
        />
        <p>{item.description}</p>
      </div>
    ));
  };

  return (
    <div>
      {renderList()}
      {/* <button
        onClick={handleLoadMore}
        style={{ padding: "20px", marginTop: "10px" }}>
        Load More
      </button> */}
    </div>
  );
};
