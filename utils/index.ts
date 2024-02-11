export const checkImageURL = (url: string) => {
  if (!url) return false;
  else {
    const pattern = new RegExp(
      "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
      "i"
    );
    return pattern.test(url);
  }
};

export const fetchImage = async (uri: string, cb: any) => {
  try {
    const res = await fetch(uri);
    const data = await res.blob();
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(data);
    fileReaderInstance.onload = () => {
      let base64data = fileReaderInstance.result;
      cb(base64data);
      // resolve(base64data);
    };
    fileReaderInstance.onerror = () => {};
  } catch (error) {
    return "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg";
  }
};
