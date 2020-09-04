import { JWT, file } from '../environment';

/************ Get file path *****************/
export const getFile = path => {
  if (path.includes('http', 'https')) {
    return path;
  } else {
    return `${file}public/uploads/${path}`;
  }
};

export const getGalleryFile = path => {
    if (path.includes('http', 'https')) {
        return path;
    } else {
        return `${file}public/uploads/user_img/thumbnail/${path}`;
    }
};
export const getMFile = path => {
    if (path.includes('http', 'https')) {
        return path;
    } else {
        return `${file}public/uploads/chat/${path}`;
    }
};
{/*http://54.190.192.105:6037/public/uploads/user_img/thumbnail/1593674244969-tulips.jpg
Original > http://54.190.192.105:6037/public/uploads/user_img/1593674244969-tulips.jpg */}



