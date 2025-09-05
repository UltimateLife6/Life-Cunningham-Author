// EmailOctopus Configuration
// You need to get the actual embedded form code from your EmailOctopus dashboard
// Go to Lists > [Your List] > Settings > Forms > Embedded Forms

const EMAILOCTOPUS_CONFIG = {
  // This should be the actual form action URL from EmailOctopus
  // Get this from: Lists > [Your List] > Settings > Forms > Embedded Forms
  ACTION_URL: 'https://emailoctopus.com/lists/e9516f04-89ee-11f0-a241-43698dd08940/members/embedded/1.1/add',
  
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