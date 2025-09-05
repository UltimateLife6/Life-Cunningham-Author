// EmailOctopus Configuration
// Replace YOUR_LIST_ID with your actual EmailOctopus list ID
// You can find this in your EmailOctopus dashboard under Lists > [Your List] > Settings > Forms

const EMAILOCTOPUS_CONFIG = {
  // Replace 'YOUR_LIST_ID' with your actual list ID from EmailOctopus
  LIST_ID: 'e9516f04-89ee-11f0-a241-43698dd08940',
  
  // The base URL for EmailOctopus embedded forms
  get ACTION_URL() {
    return `https://emailoctopus.com/lists/${this.LIST_ID}/members/embedded/1.1/add`;
  },
  
  // Optional: Add any additional fields you want to collect
  ADDITIONAL_FIELDS: {
    // 'first_name': 'First Name',
    // 'last_name': 'Last Name',
    // Add more fields as needed
  }
};

// Function to update all newsletter forms with the correct action URL
function updateNewsletterForms() {
  const forms = document.querySelectorAll('.newsletter-form, .popup-form');
  forms.forEach(form => {
    form.action = EMAILOCTOPUS_CONFIG.ACTION_URL;
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', updateNewsletterForms);