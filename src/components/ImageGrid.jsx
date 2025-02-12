import { Col, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function ImageGrid() {
  const posts = useSelector((state) => state.posts);

  const renderImages = () => {
    return posts.map((post) => (
      <Col md={4} key={post.id} className="mb-4">
        <Image src={post.image} fluid />
      </Col>
    ));
  };

  return <Row>{renderImages()}</Row>;
}
