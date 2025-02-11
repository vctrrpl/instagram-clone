import { useContext, useState } from 'react';
import { ProfileContext } from '../App';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';

export default function AddPostModal({ show, handleClose }) {
  const { image, name } = useContext(ProfileContext);

  // HOOKS AND STATE: imageUrl is used to store the URL of an image the user wishes to post and description captures user's text input for the post's caption. invalidUrl is used to signal whether a provided image URL has caused an error, providing a way to give feedback to the user about the validity of their image URL input.
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [invalidUrl, setInvalidUrl] = useState(false);

  // HANDLES FORM SUBMISSION: Accepts an event(e), runs preventDefault to stop the page from refreshing, checks if image URL is not empty and if it is, it resets the image URL, description fields and calls the handleClose function provided as prop.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageUrl) {
      setImageUrl('');
      setDescription('');
      handleClose();
    } else {
      setInvalidUrl(true);
    }
  };

  // HANDLES IMAGE ERROR: handleImageError sets the invalidUrl state to true when there is an error with the image under consideration(likely due to an incorrect URL).
  const handleImageError = () => {
    setInvalidUrl(true);
  };

  // HANDLES IMAGE LOAD: handleImageLoad is meant to be run when the image has loaded successfully, where it sets invalidURL state back to false.
  const handleImageLoad = () => {
    setInvalidUrl(false);
  };

  return (
    // MODAL COMPONENT: Modal component from react-bootstrap is given 3 props: (i) 'show' conditionally displays the modal. (2) 'onHide' executes the handleClose function when the modal is requested to be closed. (3) 'size' sets the size of the modal to large.
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>Create new post</Modal.Title>
      </Modal.Header>
      {/* FORM COMPONENT: This is the form component, where we set the onSubmit function to handleSubmit which will be called when user attempts to submit this form. This whole modal is a form  */}
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col sm={7} style={{ margin: `0px` }}>
              <Image
                src={imageUrl ? imageUrl : 'https://sig1.co/img-placeholder-1'}
                alt="uploaded content"
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{ width: '100%' }}
              />
            </Col>
            <Col sm={5}>
              <Image
                src={image}
                alt="uploader"
                style={{ width: '32px' }}
                roundedCircle
              />
              <span className="ms-3">{name}</span>
              {/* FORM CONTROL: The Form.Control binds to 'imageUrl and 'caption', permitting user input for image URL and post caption, synchronizing with application state. To enhance user interaction, invalid URL entries trigger error messages via the 'invalidUrl state. */}
              <Form.Control
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="my-3"
                placeholder="Add image url"
              />
              {invalidUrl && (
                <div className="text-danger">
                  Invalid URL or failed to load image
                </div>
              )}
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="my-3"
                as="textarea"
                rows={3}
                placeholder="Write a caption..."
              />
              <Button type="submit" style={{ width: '100%' }}>
                Share
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
