import React, { useState } from 'react';
import './style.css';
import Layout from '../ui/Layout';
import { Button, Container } from '@mui/material';

const HomeDefault = () => {
  const [inputs, setInputs] = useState({
    title: '',
    date: '',
  });

  const [data, setData] = useState([]);

  const [editClick, setEditClick] = useState(false);

  const [editIndex, setEditIndex] = useState('');

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (editClick) {
      let tempTableData = data;
      Object.assign(tempTableData[editIndex], inputs);
      setData([...tempTableData]);
      setEditClick(false);
      setInputs({
        title: '',
        date: '',
      });
    } else {
      setData([inputs, ...data]);
      setInputs({
        title: '',
        date: '',
      });
    }
  };

  const deletHandler = (index) => {
    let finlaData = data.filter((item, i) => i !== index);
    setData(finlaData);
  };

  const editHandler = (index) => {
    let tempData = data[index];

    setInputs({
      title: tempData.title,

      date: tempData.date,
    });
    setEditClick(true);

    setEditIndex(index);
  };
  return (
    <>
      <Layout />
      <Container className="page">
        <h1>List Your Todos Below</h1>
      </Container>
      <Container className="form-div page formBox">
        <form className="form" onSubmit={submitHandler}>
          <label htmlFor="title">Todo</label>
          <br />
          <input
            required
            className="input"
            type="text"
            name="title"
            id="title"
            placeholder="todo"
            value={inputs.title}
            onChange={handleChange}
          />
          <br />
          <br />

          <label htmlFor="date">Date</label>
          <br />
          <input
            required
            min="2010-01-02"
            max={new Date()}
            className="input"
            type="date"
            name="date"
            id="date"
            placeholder="date"
            value={inputs.date}
            onChange={handleChange}
          />
          <br />
          <br />
          <Button variant="contained" type="submit" className="button">
            {editClick ? 'Update' : 'Add'}
          </Button>
        </form>
      </Container>

      <Container>
        {data.map((item, index) => (
          <ul className="list" key={item.title}>
            <li className="list-item">
              <h4 className="subHeaders">TITLE: </h4>
              {item.title}
            </li>

            <li className="list-item">
              <h4 className="subHeaders">DATE:</h4>
              {item.date}
            </li>
            <div className="buttons">
              <Button
                sx={{ mx: '10px' }}
                className="funcbtn"
                variant="contained"
                onClick={() => deletHandler(index)}
                color="error"
              >
                Delete
              </Button>
              <Button
                sx={{ mx: '10px' }}
                className="funcbtn"
                variant="contained"
                onClick={() => editHandler(index)}
              >
                Edit
              </Button>
            </div>
          </ul>
        ))}
      </Container>
      <div className="display"></div>
    </>
  );
};

export default HomeDefault;
