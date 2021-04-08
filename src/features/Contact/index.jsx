import { Box, makeStyles } from '@material-ui/core';
import { current } from 'immer';
import React, { useEffect, useState } from 'react';
import ContactForm from './components/Form';
import Information from './components/Info';

ContactFeatures.propTypes = {};

const useStyles = makeStyles((theme) => ({
  form: {
    width: '800px',
    height: '1000px',

    margin: '20px auto',
    padding: '10px',
  },
}));

function ContactFeatures(props) {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const [info, setInfo] = useState(JSON.parse(localStorage.getItem('todo_list')) || []);
  const [selectedInfo, setSelectedInfo] = useState(null);

  useEffect(() => {
    localStorage.getItem('info', JSON.stringify(info));
  }, [info]);

  const handleFormSubmit = async (formValues) => {
    // EDIT MODE
    if (selectedInfo) {
      setInfo((currentInfo) => {
        const newInfo = [...currentInfo];

        return newInfo;
      });

      setSelectedInfo(null);

      return;
    }

    // ADD MODE
    // Push to contact
    setInfo((currentInfo) => {
      // New
      const newContact = {
        id: new Date().getTime().toString(),
        ...formValues,
      };

      return [...currentInfo, newContact];
    });
  };

  const handleEditClick = (info) => {
    setSelectedInfo(info);
  };

  return (
    <div>
      <Box className={classes.form}>
        <ContactForm initialValues={selectedInfo} onSubmit={handleFormSubmit} />
      </Box>

      <Box>
        <Information info={info} onEdit={handleEditClick} />
      </Box>
    </div>
  );
}

export default ContactFeatures;
