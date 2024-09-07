import axios from 'axios';

export const handleSubmitLogin = async (e, formData, navigate) => {
  e.preventDefault();

  const { email, password } = formData;

  console.log(formData); 

  if (!email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await axios.post("http://localhost:4444/auth/login", formData);

    if (res.status !== 201) {
      console.log("Unexpected response status:", res.status);

    } else {
      console.log("Login successful:");
      alert("Login successful:");

      console.log(res.data)
      localStorage.setItem('token', res.data.token)

      navigate('/logbooks')
    }
  } catch (error) {
    console.log(`Fetch error: ${error}`);
  }
};

export const handleSubmitSignUp = async (e, formData, navigate) => {
    e.preventDefault();

    const {fname, lname, email, password} = formData

    console.log(formData);

    if (!fname || !lname || !email || !password) {
      alert('All fields are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:4444/auth/signup', formData)
        


      if (res.status !== 201) {
        console.log('Unexpected response status:', res.status);
      } else {
        console.log('Signup successful:', res.data);
        alert('Signup successful:', res.data)
        navigate('/login')
      }
    } catch (error) {
      console.log(`Fetch error: ${error}`)
    }
  }