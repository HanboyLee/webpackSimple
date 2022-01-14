import image from './image1.png';
import styles from './index.scss';
export const createAvatar = function () {
    const img = new Image();
    img.src = image;
    console.log(123);
    img.className = styles.avatar;
    document.getElementById('app').appendChild(img);
};

export const test = function (arg) {
    let newarg = [];

    for (let i = 0; i < arg.length; i++) {
        if (Array.isArray(arg[i])) {
            newarg = newarg.concat(test(arg[i]));
        } else {
            newarg.push(arg[i]);
        }
    }

    return newarg;
};
createAvatar();
console.log(test([1, [2], [3, [4], 6], 63355, 22]));
