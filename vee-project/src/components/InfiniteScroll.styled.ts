import styled from "styled-components";

export const InfiniteSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    height: 100%;
  }

  @media (max-width: 375px) {
    height: 100%;
  }
`;

export const InfiniteImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  img {
    height: 300px;
    border-radius: 10px;
  }
  @media (max-width: 1024px) {
    height: 100%;
  }

  @media (max-width: 375px) {
    height: 100%;
  }
`;

export const InfiniteBreedSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  letter-spacing: 5px;

  @media (max-width: 1024px) {
    height: 100%;
  }

  @media (max-width: 375px) {
    height: 100%;
  }
`;

export const InfiniteSingleBreed = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;
  /* font-size: 40px; */
  font-weight: bold;
  text-transform: capitalize;
  letter-spacing: 5px;

  @media (max-width: 1024px) {
    height: 100%;
  }

  @media (max-width: 375px) {
    height: 100%;
  }
`;
