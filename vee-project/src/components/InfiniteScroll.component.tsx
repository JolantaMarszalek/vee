import { useState, useEffect } from "react";

export const InfiniteScroll = () => {
  const [data, setData] = useState<Array<{ id: number; title: string }>>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const newData = generateRandomData();
    setData((prevData) => [...prevData, ...newData]);
  };

  const generateRandomData = () => {
    const newData = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1 + (page - 1) * 10,
      title: `Item ${index + 1 + (page - 1) * 10}`,
    }));
    return newData;
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchData();
  };

  const renderList = () => {
    return data.map((item) => (
      <div
        key={item.id}
        style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
        {item.title}
      </div>
    ));
  };

  return (
    <div>
      {renderList()}
      <button
        onClick={handleLoadMore}
        style={{ padding: "20px", marginTop: "10px" }}>
        Load More
      </button>
    </div>
  );
};
