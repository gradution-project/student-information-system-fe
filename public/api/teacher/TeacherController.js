
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;
const SIS_FE_URL = process.env.NEXT_PUBLIC_SIS_FE_URL;

const getTeacherDetailByTeacherId = async (teacherId) => {
    const apiResult = await fetch(`${SIS_API_URL}/teacher/${teacherId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};


const TeacherController = {
    getTeacherDetailByTeacherId
};

export default TeacherController;