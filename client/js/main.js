function setupCtrlEnterSubmit(formId, submitFunction) {
    const form = document.getElementById(formId);
  
    form.addEventListener('keypress', function (event) {
      if (event.ctrlKey && event.code === 'Enter') {
        event.preventDefault(); // Prevent the default form submission
        submitFunction(); // Call the provided submit function
      }
    });
  }