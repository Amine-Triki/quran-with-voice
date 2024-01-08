import ReactPlayer from "react-player";
import "./VideoPlayer.css";
import PropTypes from 'prop-types';

const VideoPlayer = ({ url }) => {
  return (
    <ReactPlayer
      url={url}
      controls
    />
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
};
export default VideoPlayer;
