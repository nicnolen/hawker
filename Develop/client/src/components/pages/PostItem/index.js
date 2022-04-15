import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../../../utils/mutations';
import Auth from '../../../utils/auth';

function PostItem() {
  const [postForm, setPostForm] = useState('');
  // const[category, setCategory] = useState('');
  const [addItem] = useMutation(ADD_ITEM);
  
  const categories = [
    { name: 'Outdoor', id: '6256096b98fc0602b12202fb' },
    { name: 'Transportation', id: '6256096b98fc0602b12202fc' },
    { name: 'Tech', id: '6256096b98fc0602b12202fd' },
    { name: 'Sports', id: '6256096b98fc0602b12202fe' }
  ];
  
  console.info(postForm.itemImage);
  console.log(postForm.itemTitle)
  console.info(postForm.Quantity);
  console.log(postForm.price)
  console.info(postForm.description);
  console.log(postForm.itemTitle)
  console.log(postForm.categoryId)
  // console.log(postForm);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
   console.log(postForm)
    const mutationResponse = await addItem({
      variables: {
        'title': postForm.itemTitle,
        'description': postForm.description,
        'image': postForm.itemImage,
        'price': postForm.price,
        'quantity': postForm.Quantity,
        'category': postForm.categoryId

      }
    });
    // console.log(mutationResponse)
    // const token = mutationResponse.data.addPost.token;
    // console.info(token);
    // Auth.login(token);
  };

  const handleChange = (event) => {
    // console.log(event.target.value)
    const { name, value } = event.target;
    setPostForm({
      ...postForm,
      [name]: value
    });
    
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="itemImage">Insert Image </label>
        <input type="file" name="itemImage" onChange={handleChange}></input>

        <label htmlFor="itemTitle">Item Title</label>
        <input type="text" name="itemTitle" placeholder="Title" onChange={handleChange}></input>

        <label htmlFor="price">Price</label>
        <input type="text" name="price" placeholder="Price of Item" onChange={handleChange}></input>

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        ></input>

        <label htmlFor="description">Quantity</label>
        <input type="Number" name="Quantity" placeholder="Quantity" onChange={handleChange}></input>

        <label htmlFor="categoryId">Quantity</label>
       <select  name='categoryId' onChange={handleChange}> {categories.map((category) => { return <option  value={category.id} key={category.id}>{category.name + ' - ' +  category.id}</option>})}</select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostItem;
