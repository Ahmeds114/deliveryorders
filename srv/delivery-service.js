const cds = require('@sap/cds');
const axios = require('axios');

const API_BASE_URL =
    'https://sandbox.api.sap.com:443/OrderandDeliveryScheduling/DeliveryTemplateService/';
const API_KEY = 'XbBwaTo5RIsiFVh13OgyRfW8j0MxOyMq';

module.exports = cds.service.impl(async function () {
    const { DeliveryTemplateAssignments } = this.entities;

    // 1. Handle READ for DeliveryTemplateAssignments
    this.on('READ', DeliveryTemplateAssignments, async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}DeliveryTemplateAssignments?$top=50`, {
                headers: {
                    APIKey: API_KEY,
                    Accept: 'application/json',
                },
            });
            return response.data.value;
        } catch (error) {
            console.error('Error fetching DeliveryTemplateAssignments:', error.message);
            throw new Error('Failed to fetch DeliveryTemplateAssignments.');
        }
    });

    // 2. Handle POST (Create DeliveryTemplateAssignment)
    this.on('CreateDeliveryTemplateAssignment', async (req) => {
        console.log('CreateDeliveryTemplateAssignment action triggered with payload:', req.data);

        // Extract the actual data payload to avoid nesting
        const { data } = req.data;

        const response = {
            message: 'DeliveryTemplateAssignment created successfully',
            data, // Use extracted `data` object directly
        };

        console.log('Response sent back:', response);

        return response;
    });




    // 3. Handle DELETE (Delete DeliveryTemplateAssignment by ID)
    this.on('DeleteDeliveryTemplateAssignment', async (req) => {
        const { ID } = req.data;
        try {
            await axios.delete(`${API_BASE_URL}DeliveryTemplateAssignments(${ID})`, {
                headers: {
                    APIKey: API_KEY,
                    Accept: '*/*',
                },
            });
            return { message: `DeliveryTemplateAssignment with ID ${ID} deleted successfully.` };
        } catch (error) {
            console.error('Error deleting DeliveryTemplateAssignment:', error.message);
            throw new Error('Failed to delete DeliveryTemplateAssignment.');
        }
    });

    // 4. Handle GET DeliveryTemplate by ID
    this.on('GetDeliveryTemplateByID', async (req) => {
        const { ID } = req.data;
        try {
            const response = await axios.get(
                `${API_BASE_URL}DeliveryTemplateAssignments(${ID})/deliveryTemplate`,
                {
                    headers: {
                        APIKey: API_KEY,
                        Accept: 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching DeliveryTemplate:', error.message);
            throw new Error('Failed to fetch DeliveryTemplate.');
        }
    });

    // 5. Handle GET Assignments for a DeliveryTemplate by Template ID
    this.on('GetAssignmentsByTemplateID', async (req) => {
        const { ID } = req.data;
        try {
            const response = await axios.get(
                `${API_BASE_URL}DeliveryTemplates(${ID})/assignments?$top=50`,
                {
                    headers: {
                        APIKey: API_KEY,
                        Accept: 'application/json',
                    },
                }
            );
            return response.data.value;
        } catch (error) {
            console.error('Error fetching assignments:', error.message);
            throw new Error('Failed to fetch assignments.');
        }
    });
});