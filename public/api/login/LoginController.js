
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const studentLogin = async (studentId, password) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/login`, {
        body: JSON.stringify({
            studentId: studentId,
            password: password
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};


const teacherLogin = async (teacherId, password) => {
    const apiResult = await fetch(`${SIS_API_URL}/teacher/login`, {
        body: JSON.stringify({
            teacherId: teacherId,
            password: password
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};

const officerLogin = async (officerId, password) => {
    const apiResult = await fetch(`${SIS_API_URL}/officer/login`, {
        body: JSON.stringify({
            officerId: officerId,
            password: password
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};


const LoginController = {
    studentLogin,
    teacherLogin,
    officerLogin
};

export default LoginController;