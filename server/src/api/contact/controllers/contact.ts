/**
 * contact controller
 */

import { factories } from '@strapi/strapi'



export default factories.createCoreController('api::contact.contact',({strapi})=>({

    async create(ctx) {
        const data = ctx.request.body;
        console.log(data.data.phone_Number);
        // Check if the phone number is provided
        if (data.data.phone_Number) {
            // Regular expression for validating phone number (simple example for basic validation)
            const phoneRegex = /^[0-9]{10}$/; // Example: 10 digit phone number (you can adjust this based on your requirements)
    
            // Check if the phone number matches the regex
            if (!phoneRegex.test(data.data.phone_Number)) {
                // If invalid, throw an error with a 400 status code and a custom message
                ctx.throw(400, "Invalid phone number. Please enter a valid 10-digit phone number.");
            }
        }
    
        // If the phone number is valid or not provided, create the contact
        const contact = await strapi.documents("api::contact.contact").create(data);
        return contact
    }
    
}));
