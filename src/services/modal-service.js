/* ===== опредилени данных предстоящей картинки ===== */

export function imgOpen(id, arr) {
    const soughtIndex = arr.findIndex(item => item.id === Number.parseInt(id) );
    const largeImageURL = arr[soughtIndex].largeImageURL;
    const tags = arr[soughtIndex].tags;
    const imgId = arr[soughtIndex].id;
    return {largeImageURL, tags, imgId}
};

/* ===== изменение данных картинки ===== */
 
export function modalImageRun(direction, id, arr) {

    const curImgIndex = arr.findIndex(item => item.id === id);

    let nextImgIndex = 0;

    if (direction === 'right') {
        curImgIndex === arr.length - 1 ?
        nextImgIndex = 0 :
        nextImgIndex = curImgIndex + 1; 
    } else {
        curImgIndex === 0 ?
        nextImgIndex = arr.length - 1 :
        nextImgIndex = curImgIndex - 1;
    };

    let largeImageURL = arr[nextImgIndex].largeImageURL;
    let tags = arr[nextImgIndex].tags;
    let imgId = arr[nextImgIndex].id;
    
    return { largeImageURL, tags, imgId };
};

/* ===== перелистывание картинок в модальном окне клиом мыши или клавишами "влево-вправо"===== */

export function changeModalImg(value, id, arr) {
    
    let direction = '';

    if (value === "ArrowRight" || value >= (window.innerWidth / 2)) {
        direction = 'right';
    };

    if (value === "ArrowLeft" || value < (window.innerWidth / 2)) {
        direction = 'left';
    };

    return modalImageRun(direction, id, arr);
};