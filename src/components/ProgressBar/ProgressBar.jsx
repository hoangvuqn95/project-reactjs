import { makeStyles } from '@material-ui/core';
import useStorage from 'hooks/useStorage';
import React, { useEffect } from 'react';

ProgressBar.propTypes = {};

const useStyles = makeStyles((theme) => ({}));

function ProgressBar({ file, setFile }) {
  // get url and progress from hooks: useStorage
  const { url, progress } = useStorage(file);
  // console.log(url);
  console.log(progress);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <div className="progress-bar" style={{ width: progress + '%' }}>
      Progress
    </div>
  );
}

export default ProgressBar;
