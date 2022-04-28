
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllLessonRegistrationByStatus = async (status) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/registration?status=${status}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getStudentLessonRegistrationByRegistrationId = async (registrationId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/registration/${registrationId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getStudentLessonRegistrationIdByStudentId = async (studentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/registration/${studentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const saveStudentLessonRegistration = async (operationUserId, lessonIds, studentId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/registration/save`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            operationInfoRequest: {
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


const approvedLessonRegistration = async (operationUserId, registrationId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/registration/approve`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            registrationId: registrationId
        }),
    });
    return await apiResult.json();
};

const rejectedLessonRegistration = async (operationUserId, registrationId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/registration/reject`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            registrationId: registrationId
        }),
    });
    return await apiResult.json();
};

const StudentLessonRegistrationController = {
    getAllLessonRegistrationByStatus,
    getStudentLessonRegistrationByRegistrationId,
    getStudentLessonRegistrationIdByStudentId,
    saveStudentLessonRegistration,
    approvedLessonRegistration,
    rejectedLessonRegistration
};

export default StudentLessonRegistrationController;