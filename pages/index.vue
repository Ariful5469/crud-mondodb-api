<template>
    <div>
      <h1>Welcome to the Customer Management System</h1>
      <p>Click below to view and manage customers:</p>
      <nuxt-link to="/customers">
        <button>Manage Customers</button>
      </nuxt-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "IndexPage",
  };
  </script>
  
  <style scoped>
  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  