const validateTitle = (title) => {
    if (!title) {
      return 'Please enter a title';
    }
  };

  const validateCategory = (Category) => {
    if (!Category) {
      return 'Please enter a Category';
    }
  };
  

    const validateContent = (content) => {
    if (!content) {
      return 'Please enter a content';
    }
    };

    const validateCreator = (creator) => {
    if (!creator) {
      return 'Please enter a creator';
    }
    };

    const validateImagePath = (imagePath) => {
      if (!imagePath) {
        return 'Please enter an image';
      }
    
      const allowedTypes = ['image/jpeg', 'image/png'];
    
      if (!allowedTypes.includes(imagePath.type)) {
        return 'Invalid file type! Please enter a valid image (JPEG or PNG)';
      }
    };
    

    export  {
    validateTitle,
    validateCategory,
    validateContent,
    validateCreator,
    validateImagePath,
    };