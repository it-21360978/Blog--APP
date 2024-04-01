const validateEmail = (email) => {
    if (!email) {
      return 'Please enter  Email';
    }
  };

    const validatePassword = (password) => {
    if (!password) {
      return 'Please enter Password';
    }
    if(password.length < 8){
        return 'Password must be at least 8 characters long';
    }
    if(!/[A-Z]/.test(password)){
        return 'Password must contain at least one uppercase letter';
    }
    if(!/[a-z]/.test(password)){
        return 'Password must contain at least one lowercase letter';
    }
    if(!/[@$!%*?&#]/.test(password)){
        return 'Password must contain at least one special character';
    }
    return null;
    };


    const ValidateUser = (username) =>{
        if(!username){
            return 'Please enter  Username';
        }
    };

    const ValidateName = (name) =>{
        if(!name){
            return 'Please enter  Name';
        }
    };

    const validateContent = (content) =>{
        if(!content){
            return 'Please enter  Content';
        }
    };

    const ImageValidation = (imagePath)=>{
        if(!imagePath){
            return 'Please input an Image';
        }
        const allowedTypes = ['image/jpeg', 'image/png'];
        if(!allowedTypes.includes(imagePath.type)){
            return 'Invalid file type! Please enter a valid image (JPEG or PNG)';
        }
    }

    const SubjectValidation = (subject) =>{
        if(!subject){
            return 'Please enter Subject';
        }
    }

    const MessageValidation = (message) =>{
        if(!message){
            return 'Please enter  Message';
        }
    }

    const validateText = (text) =>{
        if(!text){
            return 'Please enter Text';
        }
    
    };

    const PasswordValidate = (password) =>{
        if(!password){
            return 'Please enter a Valid Password';
        }
    
    }


    export{
        validateEmail,
        validatePassword,
        ValidateUser,
        ValidateName,
        validateContent,
        ImageValidation,
        SubjectValidation,
        MessageValidation,
        validateText,
        PasswordValidate
    };