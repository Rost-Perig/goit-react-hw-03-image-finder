import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import imgApiService from '../../services/api-img-service';
import ImageGalleryItem from './ImageGalleryItem';
import HomeLink from './HomeLink';
import Spinner from '../Spinner'
import Button from './Button';
import Modal from '../Modal';
import { imgOpen, changeModalImg } from '../../services/modal-service';

class ImageGallery extends Component {
    state = {
        searchQuery: null,
        imgObjArr: [],
        page: 1,
        totalImg: 0,
        status: 'idle',
        showModal: false,
        largeImageURL: '',
        tags: '',
        imgId: 0,
    };

    async componentDidUpdate(prevProps, prevState) {
        if ((prevProps.searchQuery !== this.props.searchQuery)) {
            this.setState({
                status: 'pending',
            })
            let newRequest;
            try {
                newRequest = await imgApiService.fetchImages(this.props.searchQuery, 1);
            }
            catch (error) {
                console.log('Error: request failed');
                return this.setState({status: 'failed'})
            };

            if (newRequest.data.totalHits === 0) {
                return this.setState({status: 'rejected'})
            }

            this.setState({
                searchQuery: this.props.searchQuery,
                imgObjArr: [ ...newRequest.data.hits],
                page: 1,
                totalImg: newRequest.data.totalHits,
                status: 'resolved',
            });  
        };
        
    };


    loadMore = async () => {
        
        const { searchQuery, page } = this.state;
        if (searchQuery === this.props.searchQuery) {
            let newRequest;
            let newPage = page + 1;
            try {
                newRequest = await imgApiService.fetchImages(searchQuery, newPage);
            }
            catch (error) {
                console.log('Error: request failed');
                return this.setState({status: 'failed'})
            };

            this.setState(prevState => {
                return ({
                    imgObjArr: [...prevState.imgObjArr, ...newRequest.data.hits],
                    page: newPage,
                    totalImg: newRequest.data.totalHits,
                })
            });
            
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            }); 
        };
    };

    closeModalClick = (data) => {
       data && this.toggleModal()
    };

    toggleModal = () => {
        this.setState(({ showModal }) => (
            {showModal: !showModal}
        ))
    };

    openModal = (imageId) => {
        const { largeImageURL, tags, imgId } = imgOpen(imageId, this.state.imgObjArr);
        this.setState(({ showModal }) => ({
            showModal: !showModal,
            imgId,
            largeImageURL,
            tags
        }))
    };

    moveImg = value => {
        const { largeImageURL, tags, imgId } = changeModalImg(value, this.state.imgId, this.state.imgObjArr);
        this.setState({
            imgId,
            largeImageURL,
            tags
        })
    };

    render() {
        // console.log('state: ', this.state)
        const { searchQuery, imgObjArr, status, totalImg, showModal, largeImageURL, tags,  page } = this.state;
        const { openModal, loadMore, closeModalClick, toggleModal, moveImg } = this;

        if (status === 'idle') {
            return <h2 className={s.galleryTitle}>Введите запрос</h2>
        } 

        if (status === 'pending') {
            return <Spinner/>
        }

        if (status === 'rejected') {
            return <h2 className={s.galleryTitle}>По запросу "{this.props.searchQuery.toUpperCase()}" ничего не найдено</h2>
        }

        if (status === 'failed') {
            return <h2 className={s.galleryTitle}>Error: request failed. Нет соединения с интернетом или сервером</h2>
        }

        if (status === 'resolved') {
            return (
            <>
                <div className={s.galleryContainer} id="events" >
                        <h2 className={s.galleryTitle}>Найдено {totalImg} изображений по запросу "{searchQuery.toUpperCase()}":</h2>
                    <ul className={s.ImageGallery} >
                        {imgObjArr.map(item => {
                            const { id } = item;
                            return (
                                <li key={id} className={s.ImageGalleryItem}>
                                    <ImageGalleryItem arr={item} imgIdToUp={openModal}/>
                                    <HomeLink arr={item}/>
                                </li>
                            );
                        })}
                    </ul>
                        
                    {(page * 12 < totalImg) && <Button buttonClick={loadMore}/>}
                    {(page * 12 >= totalImg) && <h2 className={s.galleryTitle}>Запрос "{searchQuery.toUpperCase()}" успешно выполнен</h2>}  
                </div>
                    
                {showModal &&
                <Modal closeModalClick={closeModalClick} closeModalEsc={toggleModal} changeImg={moveImg}>
                    <img src={largeImageURL} alt={tags} className={s.modalImg} onClick={e => moveImg(e.clientX)}/>
                </Modal>}
                </>
            )
        };
    };
};

ImageGallery.propTypes = {
    id: PropTypes.number,
};

export default ImageGallery;