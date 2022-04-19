import './ImageModal.css';

const ImageModal = (props) => {
  const { imgURL, onHide } = props;

  return (
    <div className="image-modal-background" onClick={() => onHide()}>
      <img alt="focusing" src={imgURL} />
    </div>
  );
};

export default ImageModal;
