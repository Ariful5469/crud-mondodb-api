<template>
    <div>
      <h1>Customer Management</h1>
      <!-- Customer Form -->
      <form @submit.prevent="handleSubmit">
        <label>
          First Name:
          <input type="text" v-model="newCustomer.fname" required />
        </label>
        <label>
          Last Name:
          <input type="text" v-model="newCustomer.lname" required />
        </label>
        <label>
          Email:
          <input type="email" v-model="newCustomer.email" required />
        </label>
        <label>
          Phone:
          <input type="tel" v-model="newCustomer.phone" required />
        </label>
        <button type="submit">Add Customer</button>
      </form>
  
      <!-- Customer Table -->
      <table v-if="customers.length">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer._id">
            <td>{{ customer.fname }}</td>
            <td>{{ customer.lname }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>
              <button @click="editCustomer(customer._id)">Edit</button>
              <button @click="deleteCustomer(customer._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No customers found.</p>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        customers: [],
        newCustomer: {
          fname: '',
          lname: '',
          email: '',
          phone: '',
        },
      };
    },
    async mounted() {
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) throw new Error('Failed to fetch customers');
        this.customers = await response.json();
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await fetch('/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.newCustomer),
          });
          if (!response.ok) throw new Error('Failed to create customer');
          const customer = await response.json();
          this.customers.push(customer);
  
          // Clear the form after successful submission
          this.newCustomer = {
            fname: '',
            lname: '',
            email: '',
            phone: '',
          };
        } catch (error) {
          console.error('Error creating customer:', error);
        }
      },
      async deleteCustomer(id) {
        try {
          const response = await fetch(`/api/customers/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete customer');
          this.customers = this.customers.filter((c) => c._id !== id);
        } catch (error) {
          console.error('Error deleting customer:', error);
        }
      },
    },
  };
  </script>
  
  