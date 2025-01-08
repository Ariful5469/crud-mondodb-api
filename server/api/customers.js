import connectDB from './db'; // MongoDB connection
import Customer from './customerModel'; // Mongoose model

export default defineEventHandler(async (event) => {
  await connectDB(); // Ensure DB connection
  const method = event.node.req.method;

  if (method === 'GET') {
    const id = event.context.params?.id; // Check if an ID is provided
    if (id) {
      // Fetch a single customer by ID
      const customer = await Customer.findById(id);
      if (!customer) throw createError({ statusCode: 404, statusMessage: 'Customer not found' });
      return customer;
    }
    // Fetch all customers
    const customers = await Customer.find();
    return customers;
  }

  if (method === 'POST') {
    // Create a new customer
    const body = await readBody(event);
    const newCustomer = new Customer(body);
    await newCustomer.save();
    return newCustomer;
  }

  if (method === 'PUT') {
    // Update an existing customer
    const id = event.context.params?.id;
    const body = await readBody(event);
    const updatedCustomer = await Customer.findByIdAndUpdate(id, body, { new: true });
    if (!updatedCustomer) throw createError({ statusCode: 404, statusMessage: 'Customer not found' });
    return updatedCustomer;
  }

  if (method === 'DELETE') {
    // Delete a customer
    const id = event.context.params?.id;
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) throw createError({ statusCode: 404, statusMessage: 'Customer not found' });
    return { message: 'Customer deleted successfully' };
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
});
