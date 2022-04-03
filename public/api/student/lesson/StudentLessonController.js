
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;
const SIS_FE_URL = process.env.NEXT_PUBLIC_SIS_FE_URL;


const getAllStudentLessonsByStudentId = async (studentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/get/${studentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const StudentLessonController = {
    getAllStudentLessonsByStudentId
};

export default StudentLessonController;