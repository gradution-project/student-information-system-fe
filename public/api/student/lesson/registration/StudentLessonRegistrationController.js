
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;
const SIS_FE_URL = process.env.NEXT_PUBLIC_SIS_FE_URL;


const saveStudentLessonRegistration = async (operationUserId, lessonIds, studentId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/registration/save`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            operationInfoRequest: {
                feUrl: "",
                userId: operationUserId
            },
            studentLessonRegistrationInfoRequest: {
                lessonsIds: lessonIds,
                studentId: studentId
            }
        })
    });
    return await apiResult.json();
};

const getAllLessonRegistrationByStatus = async (status) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/registration/get?status=${status}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getAllStudentsLessonRegistrationByRegistrationId = async (registrationId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/registration/get/${registrationId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};


const StudentLessonRegistrationController = {
    saveStudentLessonRegistration,
    getAllLessonRegistrationByStatus,
    getAllStudentsLessonRegistrationByRegistrationId
};

export default StudentLessonRegistrationController;