/* eslint-disable no-plusplus */
const mockImagesFn = () => {
  const mockImages = [];
  let index = 1;
  for (let i = 1; i <= 20; i++) {
    index = index > 9 ? 1 : index;
    mockImages.push({
      images: {
        original: {
          url: `/mock-images/giphy${index++}.gif`
        }
      },
      id: new Date().getUTCMilliseconds() * Math.random()
    });
  }
  return mockImages;
};

export default mockImagesFn;
