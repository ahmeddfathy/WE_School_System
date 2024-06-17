import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [accounts, setAccounts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // استدعاء ال API عند تحميل المكون
        axios.get('http://localhost:8080/api/get/accounts')
            .then(response => {
                // تحديث حالة المكون بالبيانات المستلمة من ال API
                setAccounts(response.data.accounts);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const [loading, setLoading] = useState(true);
    let [StudentsData, SetMydata] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/get/students')
            .then(response => {
                SetMydata(response.data.students);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error retrieving student information:', error);
                setLoading(false);
            });
    }, []);


    const handleSubmit = async (event) => {
        const accountFound = accounts.find(account => account.email === email && account.password === password);

        if (!accountFound) {
            // If account is not found in 'accounts', search in 'StudentsData'
            const studentAccount = StudentsData.find(student => student.email === email && student.student_id === password);

            if (studentAccount) {
                navigate(`/profile/${studentAccount.student_id}`)
            } else {
                setError(true);
                event.preventDefault();
            }
        } else {
            // Perform actions for other account types (e.g., studentaffairs, admin)
            const values = { email: email, password: password };
            try {
                axios.post('http://localhost:8080/api/login', values);

                event.preventDefault();

                if (accountFound.role === "admin") {
                    navigate('/Information');
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        }

        handleLogin();
    };


    console.log('error', error);

    const handleLogin = () => {

        const isLoginSuccessful = false;

        if (!isLoginSuccessful) {
            setError(true);


            setTimeout(() => {
                setError(false);
            }, 5000);
        }
    };

    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className='p-4 form rounded w-50 border-1'>
                    <h2 className="mb-4">Log-In</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            {error && <div className="alert alert-danger">email or password is wrong</div>}

                        </div>
                        <div className='mb-3 inp'>
                            <label htmlFor="email" className="form-label"><b>Email</b></label>
                            <input type="email" className="form-control" placeholder='Enter Email' name="email"
                                onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="password" className="form-label mt-2"><b>Password</b></label>
                            <input type="password" className="form-control" placeholder='Enter Password' name="password"
                                onChange={(e) => setPassword(e.target.value)} />


                        </div>
                        <div className="Links mt-4">
                            <button type='submit' className="btn btn-primary"><b>Login</b></button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}

export default Login;
